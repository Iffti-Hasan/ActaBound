import { describe, it, expect } from 'vitest';
import { evaluatePolicy, parseUnits, formatUnits } from '../lib/policy/engine';
import { MandateRules, TransactionProposal } from '../lib/policy/types';

describe('Deterministic Policy Engine', () => {
  const baseMandate: MandateRules = {
    id: 'mandate-1',
    version: 1,
    status: 'ACTIVE',
    permissionTier: 'BOUNDED_EXECUTOR',
    chainId: 11155111, // Sepolia
    agentAddress: '0x1111111111111111111111111111111111111111',
    ownerAddress: '0x2222222222222222222222222222222222222222',
    dailyBudgetLimit: '200.00',
    currentDailySpent: '50.00',
    maxTransactionLimit: '100.00',
    protectedReserve: '200.00',
    currentBalance: '500.00',
    maxPriceImpactBps: 100, // 1%
    allowedTokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'], // USDC
    allowedDestinations: ['0x70997970c51812dc3a010c7d01b50e0d17dc79c8'],
    allowedMethods: ['transfer', 'swap'],
    validFrom: '2026-01-01T00:00:00.000Z',
    validUntil: '2026-12-31T23:59:59.000Z',
  };

  const validProposal: TransactionProposal = {
    mandateId: 'mandate-1',
    chainId: 11155111,
    intentType: 'transfer',
    method: 'transfer',
    assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    amount: '40.00',
    destination: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    slippageBps: 20,
    currentTime: '2026-06-01T12:00:00.000Z',
  };

  it('allows a compliant transaction within all bounds', () => {
    const decision = evaluatePolicy(baseMandate, validProposal);
    expect(decision.decision).toBe('ALLOW');
    expect(decision.reasonCodes).toHaveLength(0);
    expect(decision.fingerprint).toBeDefined();
  });

  it('blocks when transaction exceeds max single transaction limit', () => {
    const proposal = { ...validProposal, amount: '120.00' };
    const decision = evaluatePolicy(baseMandate, proposal);
    expect(decision.decision).toBe('BLOCK');
    expect(decision.reasonCodes).toContain('EXCEEDS_TRANSACTION_LIMIT');
  });

  it('blocks when cumulative daily budget would be exceeded', () => {
    // Current spent: 50.00, Limit: 200.00. Asking for 160.00 => 210.00 > 200.00
    const proposal = { ...validProposal, amount: '90.00' };
    // Let's set currentDailySpent to 150.00
    const mandate = { ...baseMandate, currentDailySpent: '150.00' };
    const decision = evaluatePolicy(mandate, proposal);
    expect(decision.decision).toBe('BLOCK');
    expect(decision.reasonCodes).toContain('DAILY_BUDGET_EXCEEDED');
  });

  it('blocks when protected reserve would be breached', () => {
    // Balance: 500.00, Reserve: 200.00. Free balance is 300.00.
    // If balance was 250.00 and asking for 80.00 => remaining 170.00 < 200.00
    const mandate = { ...baseMandate, currentBalance: '250.00' };
    const proposal = { ...validProposal, amount: '80.00' };
    const decision = evaluatePolicy(mandate, proposal);
    expect(decision.decision).toBe('BLOCK');
    expect(decision.reasonCodes).toContain('RESERVE_BREACH');
  });

  it('blocks when mandate is expired', () => {
    const proposal = { ...validProposal, currentTime: '2027-01-01T00:00:00.000Z' };
    const decision = evaluatePolicy(baseMandate, proposal);
    expect(decision.decision).toBe('BLOCK');
    expect(decision.reasonCodes).toContain('MANDATE_EXPIRED');
  });

  it('blocks when mandate is revoked', () => {
    const mandate = { ...baseMandate, status: 'REVOKED' as const };
    const decision = evaluatePolicy(mandate, validProposal);
    expect(decision.decision).toBe('BLOCK');
    expect(decision.reasonCodes).toContain('MANDATE_REVOKED');
  });

  it('blocks unapproved recipient destination in Bounded Executor mode', () => {
    const proposal = { ...validProposal, destination: '0x9999999999999999999999999999999999999999' };
    const decision = evaluatePolicy(baseMandate, proposal);
    expect(decision.decision).toBe('BLOCK');
    expect(decision.reasonCodes).toContain('DESTINATION_NOT_ALLOWLISTED');
  });

  it('blocks unapproved token asset', () => {
    const proposal = { ...validProposal, assetIn: '0x3333333333333333333333333333333333333333' };
    const decision = evaluatePolicy(baseMandate, proposal);
    expect(decision.decision).toBe('BLOCK');
    expect(decision.reasonCodes).toContain('TOKEN_NOT_ALLOWLISTED');
  });

  it('blocks excessive slippage', () => {
    const proposal = { ...validProposal, slippageBps: 250 }; // 2.5% > 1%
    const decision = evaluatePolicy(baseMandate, proposal);
    expect(decision.decision).toBe('BLOCK');
    expect(decision.reasonCodes).toContain('EXCESSIVE_SLIPPAGE');
  });

  it('correctly converts BigInt decimals without float precision drift', () => {
    const units = parseUnits('123.456789');
    expect(units).toBe(123456789n);
    expect(formatUnits(units)).toBe('123.456789');
  });
});
