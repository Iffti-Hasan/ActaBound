import { z } from 'zod';

export const IntentTypeSchema = z.enum([
  'transfer',
  'swap',
  'rebalance',
  'query',
  'emergency_stop',
]);

export type IntentType = z.infer<typeof IntentTypeSchema>;

export const StructuredPlanSchema = z.object({
  intentType: IntentTypeSchema,
  chainId: z.number().default(11155111),
  assetIn: z.string().default('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'), // Default USDC
  assetOut: z.string().optional(),
  amount: z.string().default('0.00'),
  destination: z.string().default('0x70997970C51812dc3A010C7d01b50e0d17dc79C8'),
  slippageBps: z.number().min(0).max(1000).default(50),
  explanation: z.string(),
  isPromptInjection: z.boolean().default(false),
  injectionReason: z.string().optional(),
});

export type StructuredPlan = z.infer<typeof StructuredPlanSchema>;
