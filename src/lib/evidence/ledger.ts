import { sha256Digest } from '../crypto';

export type EvidenceEventType =
  | 'INTENT_RECEIVED'
  | 'PLAN_CONSTRUCTED'
  | 'POLICY_EVALUATED'
  | 'SIMULATION_PERFORMED'
  | 'TRANSACTION_SIGNED'
  | 'TRANSACTION_BROADCAST'
  | 'RECEIPT_CONFIRMED'
  | 'EXECUTION_VERIFIED'
  | 'RISK_TRIGGER_ACTIVATED'
  | 'MANDATE_REVOKED'
  | 'ATTACK_SCENARIO_RUN';

export interface EvidenceRecord {
  sequenceNumber: number;
  timestamp: string;
  eventType: EvidenceEventType;
  actor: 'AI_AGENT' | 'POLICY_ENGINE' | 'USER' | 'SECURITY_SENTINEL';
  correlationId: string;
  payload: Record<string, unknown>;
  payloadHash: string;
  previousHash: string;
  currentHash: string;
  txHash?: string;
  status: 'SUCCESS' | 'BLOCKED' | 'WARNING' | 'FAILED';
}

export interface VerificationReport {
  isValid: boolean;
  totalBlocks: number;
  corruptedBlockSequence?: number;
  message: string;
  verifiedAt: string;
}

const GENESIS_HASH = '0000000000000000000000000000000000000000000000000000000000000000';

class EvidenceLedgerService {
  private chain: EvidenceRecord[] = [];

  constructor() {
    this.initializeGenesis();
  }

  private initializeGenesis() {
    if (this.chain.length === 0) {
      const genesisPayload = { event: 'GENESIS_INITIALIZATION', system: 'ActaBound' };
      const payloadHash = sha256Digest(genesisPayload);
      const currentHash = sha256Digest(`${GENESIS_HASH}:${payloadHash}:0`);
      
      this.chain.push({
        sequenceNumber: 0,
        timestamp: new Date().toISOString(),
        eventType: 'INTENT_RECEIVED',
        actor: 'SECURITY_SENTINEL',
        correlationId: 'genesis',
        payload: genesisPayload,
        payloadHash,
        previousHash: GENESIS_HASH,
        currentHash,
        status: 'SUCCESS',
      });
    }
  }

  public appendEvent(
    eventType: EvidenceEventType,
    actor: EvidenceRecord['actor'],
    correlationId: string,
    payload: Record<string, unknown>,
    status: EvidenceRecord['status'] = 'SUCCESS',
    txHash?: string
  ): EvidenceRecord {
    const lastRecord = this.chain[this.chain.length - 1];
    const sequenceNumber = lastRecord.sequenceNumber + 1;
    const previousHash = lastRecord.currentHash;
    const timestamp = new Date().toISOString();

    const payloadHash = sha256Digest(payload);
    const currentHash = sha256Digest(`${previousHash}:${payloadHash}:${sequenceNumber}`);

    const record: EvidenceRecord = {
      sequenceNumber,
      timestamp,
      eventType,
      actor,
      correlationId,
      payload,
      payloadHash,
      previousHash,
      currentHash,
      txHash,
      status,
    };

    this.chain.push(record);
    return record;
  }

  public getRecords(): EvidenceRecord[] {
    return [...this.chain];
  }

  public verifyIntegrity(): VerificationReport {
    if (this.chain.length === 0) {
      return {
        isValid: false,
        totalBlocks: 0,
        message: 'Evidence Ledger is empty.',
        verifiedAt: new Date().toISOString(),
      };
    }

    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      // 1. Verify previous hash link
      if (current.previousHash !== previous.currentHash) {
        return {
          isValid: false,
          totalBlocks: this.chain.length,
          corruptedBlockSequence: current.sequenceNumber,
          message: `Hash link broken between block #${previous.sequenceNumber} and #${current.sequenceNumber}`,
          verifiedAt: new Date().toISOString(),
        };
      }

      // 2. Verify payload hash integrity
      const expectedPayloadHash = sha256Digest(current.payload);
      if (current.payloadHash !== expectedPayloadHash) {
        return {
          isValid: false,
          totalBlocks: this.chain.length,
          corruptedBlockSequence: current.sequenceNumber,
          message: `Payload hash mismatch on block #${current.sequenceNumber}. Stored data was altered.`,
          verifiedAt: new Date().toISOString(),
        };
      }

      // 3. Verify current block hash
      const expectedBlockHash = sha256Digest(`${current.previousHash}:${current.payloadHash}:${current.sequenceNumber}`);
      if (current.currentHash !== expectedBlockHash) {
        return {
          isValid: false,
          totalBlocks: this.chain.length,
          corruptedBlockSequence: current.sequenceNumber,
          message: `Block digest signature invalid on block #${current.sequenceNumber}`,
          verifiedAt: new Date().toISOString(),
        };
      }
    }

    return {
      isValid: true,
      totalBlocks: this.chain.length,
      message: `Cryptographic audit chain fully verified. All ${this.chain.length} blocks are untampered.`,
      verifiedAt: new Date().toISOString(),
    };
  }

  // Helper for tests to simulate tampering
  public tamperWithBlock(index: number, newPayload: Record<string, unknown>) {
    if (this.chain[index]) {
      this.chain[index].payload = newPayload;
    }
  }
}

export const evidenceLedger = new EvidenceLedgerService();
