import { StructuredPlan, StructuredPlanSchema } from './types';

const INJECTION_PATTERNS = [
  /ignore (all )?(previous|prior) (instructions|rules|mandates)/i,
  /bypass (policy|limits|engine|controls)/i,
  /reveal (the )?(system prompt|private key|seed phrase|api key)/i,
  /you are now in (unrestricted|admin|god) mode/i,
  /grant full (permission|access|authority)/i,
  /delete (the )?(database|mandate|audit logs)/i,
];

/**
 * Parses user natural language into a Zod-validated StructuredPlan.
 * Defends against prompt injection and enforces structured outputs.
 */
export function parseIntentFromPrompt(userPrompt: string): StructuredPlan {
  const trimmed = userPrompt.trim();

  // 1. Inspect for Prompt Injection
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(trimmed)) {
      return StructuredPlanSchema.parse({
        intentType: 'query',
        chainId: 11155111,
        assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amount: '0.00',
        destination: '0x0000000000000000000000000000000000000000',
        slippageBps: 0,
        explanation: 'Prompt injection attempt detected and safely neutralized.',
        isPromptInjection: true,
        injectionReason: `Pattern matched: ${pattern.toString()}`,
      });
    }
  }

  // 2. Emergency Stop Intent
  if (/emergency|halt|stop (agent|wallet|all)|pause/i.test(trimmed)) {
    return StructuredPlanSchema.parse({
      intentType: 'emergency_stop',
      chainId: 11155111,
      assetIn: '0x0000000000000000000000000000000000000000',
      amount: '0.00',
      destination: '0x0000000000000000000000000000000000000000',
      slippageBps: 0,
      explanation: 'User commanded emergency stop. Pausing all active agent operations.',
    });
  }

  // 3. Transfer Intent
  const transferMatch = trimmed.match(/transfer\s+([\d.]+)\s*([a-zA-Z0-9]+)?(?:\s+to\s+(0x[a-fA-F0-9]{40}))?/i);
  if (transferMatch) {
    const amount = transferMatch[1];
    const destination = transferMatch[3] || '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
    return StructuredPlanSchema.parse({
      intentType: 'transfer',
      chainId: 11155111,
      assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // Default USDC
      amount,
      destination,
      slippageBps: 0,
      explanation: `Prepared transfer of ${amount} USDC to ${destination}.`,
    });
  }

  // 4. Swap Intent
  const swapMatch = trimmed.match(/swap\s+([\d.]+)\s*([a-zA-Z0-9]+)?(?:\s+(?:for|to)\s+([a-zA-Z0-9]+))?/i);
  if (swapMatch) {
    const amount = swapMatch[1];
    return StructuredPlanSchema.parse({
      intentType: 'swap',
      chainId: 11155111,
      assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
      assetOut: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
      amount,
      destination: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      slippageBps: 50,
      explanation: `Prepared swap of ${amount} USDC to USDT with 0.5% max slippage.`,
    });
  }

  // 5. Rebalance Intent
  if (/rebalance|portfolio/i.test(trimmed)) {
    return StructuredPlanSchema.parse({
      intentType: 'rebalance',
      chainId: 11155111,
      assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      amount: '50.00',
      destination: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      slippageBps: 50,
      explanation: 'Autonomous rebalancing plan targeting optimal target allocation while preserving protected reserve.',
    });
  }

  // 6. Read-only Query
  return StructuredPlanSchema.parse({
    intentType: 'query',
    chainId: 11155111,
    assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    amount: '0.00',
    destination: '0x0000000000000000000000000000000000000000',
    slippageBps: 0,
    explanation: `Read-only portfolio query: "${trimmed}"`,
  });
}
