import { MandateRules, TransactionProposal, PolicyDecision } from './types';
import { sha256Digest } from '../crypto';

const POLICY_VERSION = '1.0.0';
const DECIMAL_PRECISION = 6n;
const MULTIPLIER = 10n ** DECIMAL_PRECISION;

/**
 * Converts a decimal string (e.g. "50.25") to exact BigInt with 6 decimals.
 * Never uses floating-point arithmetic.
 */
export function parseUnits(amountStr: string): bigint {
  const clean = amountStr.trim();
  if (!clean || isNaN(Number(clean))) {
    throw new Error(`Invalid decimal amount string: "${amountStr}"`);
  }

  const [integerPart, fractionalPart = ''] = clean.split('.');
  const paddedFraction = fractionalPart.padEnd(Number(DECIMAL_PRECISION), '0').slice(0, Number(DECIMAL_PRECISION));
  return BigInt(integerPart) * MULTIPLIER + BigInt(paddedFraction);
}

/**
 * Formats a BigInt with 6 decimals back to a human-readable decimal string.
 */
export function formatUnits(value: bigint): string {
  const isNegative = value < 0n;
  const absVal = isNegative ? -value : value;
  const integerPart = absVal / MULTIPLIER;
  const fractionalPart = (absVal % MULTIPLIER).toString().padStart(Number(DECIMAL_PRECISION), '0');
  const formatted = `${integerPart}.${fractionalPart}`;
  return isNegative ? `-${formatted}` : formatted;
}

/**
 * Evaluates a proposed transaction against an active mandate.
 * Pure deterministic function with zero external network or LLM dependencies.
 */
export function evaluatePolicy(
  mandate: MandateRules,
  proposal: TransactionProposal
): PolicyDecision {
  const reasons: string[] = [];
  const now = proposal.currentTime ? new Date(proposal.currentTime) : new Date();

  // 1. Mandate Status & Revocation Check
  if (mandate.status === 'REVOKED') {
    reasons.push('MANDATE_REVOKED');
  }
  if (mandate.status === 'PAUSED') {
    reasons.push('MANDATE_PAUSED');
  }

  // 2. Expiry Check
  const validUntil = new Date(mandate.validUntil);
  const validFrom = new Date(mandate.validFrom);
  if (now > validUntil) {
    reasons.push('MANDATE_EXPIRED');
  }
  if (now < validFrom) {
    reasons.push('MANDATE_NOT_YET_ACTIVE');
  }

  // 3. Permission Tier Check
  if (mandate.permissionTier === 'OBSERVER') {
    reasons.push('OBSERVER_TIER_NO_EXECUTION');
  } else if (mandate.permissionTier === 'PLANNER') {
    reasons.push('PLANNER_TIER_NO_EXECUTION');
  }

  // 4. Chain ID Verification
  if (proposal.chainId !== mandate.chainId) {
    reasons.push('CHAIN_ID_MISMATCH');
  }

  // 5. Method Allowlist
  const allowedMethodsLower = mandate.allowedMethods.map((m) => m.toLowerCase());
  if (!allowedMethodsLower.includes(proposal.method.toLowerCase())) {
    reasons.push('METHOD_NOT_PERMITTED');
  }

  // 6. Token Allowlist (Case-insensitive)
  const allowedTokensLower = mandate.allowedTokens.map((t) => t.toLowerCase());
  if (!allowedTokensLower.includes(proposal.assetIn.toLowerCase())) {
    reasons.push('TOKEN_NOT_ALLOWLISTED');
  }

  // 7. Destination Allowlist
  let destinationRequiresApproval = false;
  const allowedDestinationsLower = mandate.allowedDestinations.map((d) => d.toLowerCase());
  if (!allowedDestinationsLower.includes(proposal.destination.toLowerCase())) {
    if (mandate.permissionTier === 'OWNER_APPROVAL') {
      destinationRequiresApproval = true;
    } else {
      reasons.push('DESTINATION_NOT_ALLOWLISTED');
    }
  }

  // 8. Numerical Limits & Protected Reserve (Strict BigInt Arithmetic)
  try {
    const proposalAmount = parseUnits(proposal.amount);
    const maxTxLimit = parseUnits(mandate.maxTransactionLimit);
    const dailyBudgetLimit = parseUnits(mandate.dailyBudgetLimit);
    const currentDailySpent = parseUnits(mandate.currentDailySpent);
    const protectedReserve = parseUnits(mandate.protectedReserve);
    const currentBalance = parseUnits(mandate.currentBalance);

    // Negative or zero amount check
    if (proposalAmount <= 0n) {
      reasons.push('INVALID_AMOUNT_NON_POSITIVE');
    }

    // Per-transaction limit
    if (proposalAmount > maxTxLimit) {
      reasons.push('EXCEEDS_TRANSACTION_LIMIT');
    }

    // Cumulative daily budget limit
    if (currentDailySpent + proposalAmount > dailyBudgetLimit) {
      reasons.push('DAILY_BUDGET_EXCEEDED');
    }

    // Protected reserve preservation
    if (currentBalance - proposalAmount < protectedReserve) {
      reasons.push('RESERVE_BREACH');
    }
  } catch (err: unknown) {
    reasons.push('ARITHMETIC_PARSING_ERROR');
  }

  // 9. Slippage / Price Impact Limit
  if (proposal.slippageBps !== undefined && proposal.slippageBps > mandate.maxPriceImpactBps) {
    reasons.push('EXCESSIVE_SLIPPAGE');
  }

  // 10. Canonical Fingerprint
  const canonicalPayload = {
    mandateId: mandate.id,
    mandateVersion: mandate.version,
    chainId: proposal.chainId,
    assetIn: proposal.assetIn.toLowerCase(),
    amount: proposal.amount,
    destination: proposal.destination.toLowerCase(),
    method: proposal.method.toLowerCase(),
    nonce: proposal.nonce ?? 0,
  };
  const fingerprint = sha256Digest(canonicalPayload);

  // 11. Determine Final Decision
  let decision: PolicyDecision['decision'] = 'ALLOW';
  let humanReadableExplanation = 'Transaction satisfies all mandate bounds and reserve constraints.';

  if (reasons.length > 0) {
    decision = 'BLOCK';
    humanReadableExplanation = `Transaction blocked by policy engine: ${reasons.join(', ')}`;
  } else if (mandate.permissionTier === 'OWNER_APPROVAL' || destinationRequiresApproval) {
    decision = 'REQUIRE_OWNER_APPROVAL';
    humanReadableExplanation = 'Transaction is within quantitative limits but requires explicit owner approval.';
  }

  return {
    decision,
    reasonCodes: reasons,
    humanReadableExplanation,
    mandateId: mandate.id,
    mandateVersion: mandate.version,
    policyVersion: POLICY_VERSION,
    checkedAt: now.toISOString(),
    fingerprint,
  };
}
