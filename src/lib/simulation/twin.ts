import { parseUnits, formatUnits } from '../policy/engine';
import { StructuredPlan } from '../ai/types';

export interface AssetPosition {
  symbol: string;
  name: string;
  address: string;
  balance: string; // decimal string
  priceUsd: number;
  decimals: number;
}

export interface TwinSimulationResult {
  isFeasible: boolean;
  before: {
    totalValueUsd: number;
    availableBalance: string;
    protectedReserve: string;
    dailyBudgetRemaining: string;
    positions: AssetPosition[];
  };
  after: {
    totalValueUsd: number;
    availableBalance: string;
    protectedReserve: string;
    dailyBudgetRemaining: string;
    positions: AssetPosition[];
  };
  estimatedFeeUsd: number;
  reserveBreached: boolean;
  budgetBreached: boolean;
  reserveMargin: string;
  summaryExplanation: string;
  alternativePlan?: string;
}

/**
 * Simulates financial outcome of a proposed transaction.
 * Demonstrates pre-execution balance modeling and reserve guarantees.
 */
export function simulateFinancialTwin(
  currentPositions: AssetPosition[],
  plan: StructuredPlan,
  protectedReserveStr: string,
  dailyBudgetLimitStr: string,
  currentDailySpentStr: string
): TwinSimulationResult {
  const usdcPosition = currentPositions.find((p) => p.symbol === 'USDC') || {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    balance: '500.00',
    priceUsd: 1.0,
    decimals: 6,
  };

  const currentBalUnits = parseUnits(usdcPosition.balance);
  const reserveUnits = parseUnits(protectedReserveStr);
  const dailyLimitUnits = parseUnits(dailyBudgetLimitStr);
  const spentUnits = parseUnits(currentDailySpentStr);
  const planAmountUnits = parseUnits(plan.amount || '0.00');

  // Compute before metrics
  const beforeBudgetRemainingUnits = dailyLimitUnits > spentUnits ? dailyLimitUnits - spentUnits : 0n;
  const beforeTotalValueUsd = currentPositions.reduce(
    (acc, p) => acc + parseFloat(p.balance) * p.priceUsd,
    0
  );

  // Check constraints
  const reserveBreached = currentBalUnits - planAmountUnits < reserveUnits;
  const budgetBreached = spentUnits + planAmountUnits > dailyLimitUnits;
  const isFeasible = !reserveBreached && !budgetBreached && planAmountUnits > 0n;

  // Compute after metrics
  const afterBalUnits = currentBalUnits >= planAmountUnits ? currentBalUnits - planAmountUnits : 0n;
  const afterSpentUnits = spentUnits + planAmountUnits;
  const afterBudgetRemainingUnits = dailyLimitUnits > afterSpentUnits ? dailyLimitUnits - afterSpentUnits : 0n;
  const estimatedFeeUsd = 0.45; // Testnet gas estimate

  const updatedPositions: AssetPosition[] = currentPositions.map((p) => {
    if (p.symbol === 'USDC') {
      return { ...p, balance: formatUnits(afterBalUnits) };
    }
    return p;
  });

  const afterTotalValueUsd = updatedPositions.reduce(
    (acc, p) => acc + parseFloat(p.balance) * p.priceUsd,
    0
  );

  const reserveMarginUnits = afterBalUnits > reserveUnits ? afterBalUnits - reserveUnits : 0n;

  let summaryExplanation = `Executing this plan will transfer ${plan.amount} USDC. The protected reserve of ${protectedReserveStr} USDC remains fully intact with ${formatUnits(reserveMarginUnits)} USDC buffer remaining.`;
  let alternativePlan: string | undefined = undefined;

  if (reserveBreached) {
    summaryExplanation = `CRITICAL: Action blocked by Financial Twin. Transferring ${plan.amount} USDC would leave only ${formatUnits(afterBalUnits)} USDC, breaching the mandatory ${protectedReserveStr} USDC reserve.`;
    const safeMax = currentBalUnits > reserveUnits ? currentBalUnits - reserveUnits : 0n;
    alternativePlan = `Reduce transfer amount to maximum safe amount: ${formatUnits(safeMax)} USDC.`;
  } else if (budgetBreached) {
    summaryExplanation = `CRITICAL: Action blocked by Financial Twin. Cumulative spending would reach ${formatUnits(afterSpentUnits)} USDC, violating the ${dailyBudgetLimitStr} USDC daily cap.`;
    alternativePlan = `Wait for daily limit reset or transfer up to remaining limit: ${formatUnits(beforeBudgetRemainingUnits)} USDC.`;
  }

  return {
    isFeasible,
    before: {
      totalValueUsd: beforeTotalValueUsd,
      availableBalance: usdcPosition.balance,
      protectedReserve: protectedReserveStr,
      dailyBudgetRemaining: formatUnits(beforeBudgetRemainingUnits),
      positions: currentPositions,
    },
    after: {
      totalValueUsd: afterTotalValueUsd,
      availableBalance: formatUnits(afterBalUnits),
      protectedReserve: protectedReserveStr,
      dailyBudgetRemaining: formatUnits(afterBudgetRemainingUnits),
      positions: updatedPositions,
    },
    estimatedFeeUsd,
    reserveBreached,
    budgetBreached,
    reserveMargin: formatUnits(reserveMarginUnits),
    summaryExplanation,
    alternativePlan,
  };
}
