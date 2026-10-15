import { describe, it, expect } from 'vitest';
import { simulateFinancialTwin, AssetPosition } from '../lib/simulation/twin';
import { StructuredPlan } from '../lib/ai/types';

describe('Financial Twin Simulation Engine', () => {
  const currentPositions: AssetPosition[] = [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      balance: '500.00',
      priceUsd: 1.0,
      decimals: 6,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0x0000000000000000000000000000000000000000',
      balance: '0.50',
      priceUsd: 2500.0,
      decimals: 18,
    },
  ];

  it('accurately models pre-execution and post-execution balance sheets for a feasible transfer', () => {
    const plan: StructuredPlan = {
      intentType: 'transfer',
      chainId: 11155111,
      assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      amount: '50.00',
      destination: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      slippageBps: 0,
      explanation: 'Transfer 50 USDC',
      isPromptInjection: false,
    };

    const res = simulateFinancialTwin(currentPositions, plan, '200.00', '200.00', '50.00');

    expect(res.isFeasible).toBe(true);
    expect(res.reserveBreached).toBe(false);
    expect(res.budgetBreached).toBe(false);
    expect(res.before.availableBalance).toBe('500.00');
    expect(res.after.availableBalance).toBe('450.000000');
    expect(res.reserveMargin).toBe('250.000000'); // 450 - 200 = 250
  });

  it('detects and explains reserve breach when transfer breaches protected reserve', () => {
    const plan: StructuredPlan = {
      intentType: 'transfer',
      chainId: 11155111,
      assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      amount: '350.00', // 500 - 350 = 150 < 200 reserve!
      destination: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      slippageBps: 0,
      explanation: 'Transfer 350 USDC',
      isPromptInjection: false,
    };

    const res = simulateFinancialTwin(currentPositions, plan, '200.00', '500.00', '0.00');

    expect(res.isFeasible).toBe(false);
    expect(res.reserveBreached).toBe(true);
    expect(res.summaryExplanation).toContain('breaching the mandatory 200.00 USDC reserve');
    expect(res.alternativePlan).toBeDefined();
  });
});
