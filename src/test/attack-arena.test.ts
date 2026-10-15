import { describe, it, expect } from 'vitest';
import { runAllAttackScenarios, runAttackScenario } from '../lib/attack-arena/runner';
import { ATTACK_SCENARIOS } from '../lib/attack-arena/scenarios';

describe('Autonomous Attack Arena Red-Team Suite', () => {
  it('has all 18 mandated adversarial attack scenarios defined', () => {
    expect(ATTACK_SCENARIOS).toHaveLength(18);
  });

  it('successfully executes Budget Breaker scenario and blocks execution', async () => {
    const res = await runAttackScenario('budget-breaker');
    expect(res.passed).toBe(true);
    expect(res.enforcementComponent).toBe('Deterministic Policy Engine');
    expect(res.reasonCodes).toContain('DAILY_BUDGET_EXCEEDED');
  });

  it('successfully executes Reserve Breach scenario and blocks execution', async () => {
    const res = await runAttackScenario('reserve-breach');
    expect(res.passed).toBe(true);
    expect(res.reasonCodes).toContain('RESERVE_BREACH');
  });

  it('runs all 18 adversarial scenarios and achieves 100% pass rate against engine', async () => {
    const summary = await runAllAttackScenarios();
    expect(summary.totalScenarios).toBe(18);
    expect(summary.failedCount).toBe(0);
    expect(summary.passedCount).toBe(18);
    expect(summary.passRatePercentage).toBe(100);
  });
});
