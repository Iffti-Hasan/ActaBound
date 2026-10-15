import { NextResponse } from 'next/server';
import { parseIntentFromPrompt } from '@/lib/ai/parser';
import { evaluatePolicy } from '@/lib/policy/engine';
import { MandateRules, TransactionProposal } from '@/lib/policy/types';
import { simulateFinancialTwin, AssetPosition } from '@/lib/simulation/twin';
import { blockchainAdapter } from '@/lib/blockchain/adapter';
import { evidenceLedger } from '@/lib/evidence/ledger';
import { generateCorrelationId } from '@/lib/crypto';
import { riskController } from '@/lib/risk/controller';

// Current session active mandate state (Default demo mandate)
const activeMandate: MandateRules = {
  id: 'mandate-sepolia-primary',
  version: 1,
  status: 'ACTIVE',
  permissionTier: 'BOUNDED_EXECUTOR',
  chainId: 11155111,
  agentAddress: '0x1111111111111111111111111111111111111111',
  ownerAddress: '0x2222222222222222222222222222222222222222',
  dailyBudgetLimit: '200.00',
  currentDailySpent: '50.00',
  maxTransactionLimit: '100.00',
  protectedReserve: '200.00',
  currentBalance: '500.00',
  maxPriceImpactBps: 100,
  allowedTokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
  allowedDestinations: ['0x70997970c51812dc3a010c7d01b50e0d17dc79c8'],
  allowedMethods: ['transfer', 'swap'],
  validFrom: '2026-01-01T00:00:00.000Z',
  validUntil: '2026-12-31T23:59:59.000Z',
};

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
    balance: '0.45',
    priceUsd: 2600.0,
    decimals: 18,
  },
];

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Valid prompt string is required' }, { status: 400 });
    }

    const correlationId = generateCorrelationId();

    // 1. Record incoming user intent in Evidence Ledger
    evidenceLedger.appendEvent('INTENT_RECEIVED', 'USER', correlationId, { prompt });

    // 2. Parse Natural Language into Structured Plan
    const plan = parseIntentFromPrompt(prompt);

    if (plan.isPromptInjection) {
      evidenceLedger.appendEvent(
        'ATTACK_SCENARIO_RUN',
        'SECURITY_SENTINEL',
        correlationId,
        {
          attackType: 'PROMPT_INJECTION',
          explanation: plan.explanation,
        },
        'BLOCKED'
      );

      return NextResponse.json({
        plan,
        policyDecision: {
          decision: 'BLOCK',
          reasonCodes: ['PROMPT_INJECTION_NEUTRALIZED'],
          humanReadableExplanation: 'Instruction blocked: Adversarial prompt injection detected.',
        },
        simulation: null,
        receipt: null,
      });
    }

    // 3. Handle Emergency Stop
    if (plan.intentType === 'emergency_stop') {
      riskController.emergencyPause('Emergency stop command received from user.');
      return NextResponse.json({
        plan,
        policyDecision: {
          decision: 'BLOCK',
          reasonCodes: ['EMERGENCY_STOP_TRIGGERED'],
          humanReadableExplanation: 'Agent operations paused. Risk Controller elevated to PAUSED.',
        },
        simulation: null,
        receipt: null,
      });
    }

    // 4. Construct Transaction Proposal
    const proposal: TransactionProposal = {
      mandateId: activeMandate.id,
      chainId: activeMandate.chainId,
      intentType: plan.intentType,
      method: plan.intentType === 'swap' ? 'swap' : 'transfer',
      assetIn: plan.assetIn,
      amount: plan.amount,
      destination: plan.destination,
      slippageBps: plan.slippageBps,
    };

    // 5. Evaluate Against Deterministic Policy Engine
    const policyDecision = evaluatePolicy(activeMandate, proposal);

    // 6. Record Policy Evaluation in Evidence Ledger
    evidenceLedger.appendEvent(
      'POLICY_EVALUATED',
      'POLICY_ENGINE',
      correlationId,
      {
        decision: policyDecision.decision,
        reasonCodes: policyDecision.reasonCodes,
        fingerprint: policyDecision.fingerprint,
      },
      policyDecision.decision === 'ALLOW' ? 'SUCCESS' : 'BLOCKED'
    );

    // 7. Simulate Financial Twin
    const simulation = simulateFinancialTwin(
      currentPositions,
      plan,
      activeMandate.protectedReserve,
      activeMandate.dailyBudgetLimit,
      activeMandate.currentDailySpent
    );

    evidenceLedger.appendEvent('SIMULATION_PERFORMED', 'POLICY_ENGINE', correlationId, {
      isFeasible: simulation.isFeasible,
      reserveBreached: simulation.reserveBreached,
      budgetBreached: simulation.budgetBreached,
      reserveMargin: simulation.reserveMargin,
    });

    // 8. Execute if ALLOWED
    let receipt = null;
    if (policyDecision.decision === 'ALLOW') {
      receipt = await blockchainAdapter.executePermittedTransaction(
        policyDecision.fingerprint,
        plan.destination,
        plan.amount,
        plan.assetIn
      );

      evidenceLedger.appendEvent(
        'TRANSACTION_BROADCAST',
        'AI_AGENT',
        correlationId,
        {
          txHash: receipt.txHash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed,
          isSimulatedDemo: receipt.isSimulatedDemo,
        },
        'SUCCESS',
        receipt.txHash
      );
    }

    return NextResponse.json({
      plan,
      policyDecision,
      simulation,
      receipt,
      correlationId,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
