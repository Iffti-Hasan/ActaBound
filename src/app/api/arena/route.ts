import { NextResponse } from 'next/server';
import { runAllAttackScenarios, runAttackScenario } from '@/lib/attack-arena/runner';
import { ATTACK_SCENARIOS } from '@/lib/attack-arena/scenarios';

export async function GET() {
  const list = ATTACK_SCENARIOS.map((s) => ({
    id: s.id,
    name: s.name,
    threatCategory: s.threatCategory,
    description: s.description,
    expectedResult: s.expectedResult,
  }));
  return NextResponse.json({ scenarios: list });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.scenarioId) {
      const result = await runAttackScenario(body.scenarioId);
      return NextResponse.json({ result });
    }

    const summary = await runAllAttackScenarios();
    return NextResponse.json({ summary });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error executing scenario';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
