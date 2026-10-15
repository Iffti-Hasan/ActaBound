export type PermissionTier = 'OBSERVER' | 'PLANNER' | 'BOUNDED_EXECUTOR' | 'OWNER_APPROVAL';

export type MandateStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'PAUSED';

export type PolicyDecisionType = 'ALLOW' | 'BLOCK' | 'REQUIRE_OWNER_APPROVAL';

export interface MandateRules {
  id: string;
  version: number;
  status: MandateStatus;
  permissionTier: PermissionTier;
  chainId: number;
  agentAddress: string;
  ownerAddress: string;
  
  // Stored as decimal strings with up to 6 decimal precision
  dailyBudgetLimit: string;
  currentDailySpent: string;
  maxTransactionLimit: string;
  protectedReserve: string;
  currentBalance: string;
  maxPriceImpactBps: number; // e.g., 100 bps = 1.0%

  allowedTokens: string[];
  allowedDestinations: string[];
  allowedMethods: string[];

  validFrom: string;  // ISO timestamp
  validUntil: string; // ISO timestamp
}

export interface TransactionProposal {
  mandateId: string;
  chainId: number;
  intentType: 'transfer' | 'swap' | 'rebalance' | 'query' | 'emergency_stop';
  method: string;
  assetIn: string;
  assetOut?: string;
  amount: string; // Decimal string e.g. "50.00"
  destination: string;
  slippageBps?: number;
  calldata?: string;
  nonce?: number;
  currentTime?: string; // Optional override for deterministic testing
}

export interface PolicyDecision {
  decision: PolicyDecisionType;
  reasonCodes: string[];
  humanReadableExplanation: string;
  mandateId: string;
  mandateVersion: number;
  policyVersion: string;
  checkedAt: string;
  fingerprint: string;
}
