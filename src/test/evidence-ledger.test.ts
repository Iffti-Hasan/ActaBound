import { describe, it, expect } from 'vitest';
import { evidenceLedger } from '../lib/evidence/ledger';

describe('Evidence Ledger Cryptographic Hash Chain', () => {
  it('appends events and verifies unbroken cryptographic integrity', () => {
    evidenceLedger.appendEvent('INTENT_RECEIVED', 'USER', 'test-corr-1', { prompt: 'Transfer 50 USDC' });
    evidenceLedger.appendEvent('POLICY_EVALUATED', 'POLICY_ENGINE', 'test-corr-1', { decision: 'ALLOW' });
    evidenceLedger.appendEvent('TRANSACTION_BROADCAST', 'AI_AGENT', 'test-corr-1', { txHash: '0xabc123' });

    const report = evidenceLedger.verifyIntegrity();
    expect(report.isValid).toBe(true);
    expect(report.totalBlocks).toBeGreaterThanOrEqual(4); // Genesis + 3 events
    expect(report.corruptedBlockSequence).toBeUndefined();
  });

  it('detects tampering immediately if any past event payload is modified', () => {
    // Modify block #1 payload
    evidenceLedger.tamperWithBlock(1, { tampered: true });

    const report = evidenceLedger.verifyIntegrity();
    expect(report.isValid).toBe(false);
    expect(report.corruptedBlockSequence).toBe(1);
    expect(report.message).toContain('Payload hash mismatch');
  });
});
