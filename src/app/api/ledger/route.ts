import { NextResponse } from 'next/server';
import { evidenceLedger } from '@/lib/evidence/ledger';

export async function GET() {
  const records = evidenceLedger.getRecords();
  const integrity = evidenceLedger.verifyIntegrity();
  return NextResponse.json({ records, integrity });
}
