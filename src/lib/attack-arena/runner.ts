import { ATTACK_SCENARIOS, AttackResult } from './scenarios';
import { evidenceLedger } from '../evidence/ledger';
import { generateCorrelationId } from '../crypto';

export interface AttackArenaSummary {
  totalScenarios: number;
  passedCount: number;
  failedCount: number;
  passRatePercentage: number;
  results: AttackResult[];
  executedAt: string;
}

/**
 * Executes a single scenario by ID.
 */
export async function runAttackScenario(scenarioId: string): Promise<AttackResult> {
  const scenario = ATTACK_SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) {
    throw new Error(`Scenario not found: ${scenarioId}`);
  }

  const result = await scenario.run();

  evidenceLedger.appendEvent(
    'ATTACK_SCENARIO_RUN',
    'SECURITY_SENTINEL',
    generateCorrelationId(),
    {
      scenarioId: result.scenarioId,
      scenarioName: result.scenarioName,
      passed: result.passed,
      enforcementComponent: result.enforcementComponent,
      actualResult: result.actualResult,
      reasonCodes: result.reasonCodes,
    },
    result.passed ? 'SUCCESS' : 'FAILED'
  );

  return result;
}

/**
 * Executes all 18 security scenarios against the live policy and risk engine.
 */
export async function runAllAttackScenarios(): Promise<AttackArenaSummary> {
  const results: AttackResult[] = [];

  for (const scenario of ATTACK_SCENARIOS) {
    const res = await scenario.run();
    results.push(res);

    evidenceLedger.appendEvent(
      'ATTACK_SCENARIO_RUN',
      'SECURITY_SENTINEL',
      generateCorrelationId(),
      {
        scenarioId: res.scenarioId,
        scenarioName: res.scenarioName,
        passed: res.passed,
        enforcementComponent: res.enforcementComponent,
        actualResult: res.actualResult,
      },
      res.passed ? 'SUCCESS' : 'FAILED'
    );
  }

  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.length - passedCount;
  const passRatePercentage = Math.round((passedCount / results.length) * 100);

  return {
    totalScenarios: results.length,
    passedCount,
    failedCount,
    passRatePercentage,
    results,
    executedAt: new Date().toISOString(),
  };
}
