# ActaBound Data Flow Specification

## 1. Primary Data Lifecycles

This document specifies the exact flow of data, state transformations, and persistence mechanisms across ActaBound's subsystems.

---

## 2. Intent-to-Execution Data Pipeline

```mermaid
flowchart TD
    A[User Natural Language Input] -->|HTTPS POST| B[Route Handler /api/chat]
    B -->|Sanitized Prompt| C[AI Intent Parser]
    C -->|Structured JSON| D{Zod Schema Validation}
    
    D -->|Invalid Schema| E[Return 400 Validation Error]
    D -->|Valid Intent| F[Financial Planner Orchestrator]
    
    F -->|Query Mandate| G[(PostgreSQL: Mandates Table)]
    G -->|Active Mandate Object| H[Deterministic Policy Engine]
    
    F -->|Construct Canonical Tx Plan| H
    H -->|Pure Mathematical Evaluation| I{Policy Decision}
    
    I -->|BLOCK| J[Record Blocked Event in Evidence Ledger]
    J -->|Audit Hash Generated| K[(PostgreSQL: Evidence Table)]
    J -->|Return Structured Block| B
    
    I -->|ALLOW| L[Financial Twin Simulator]
    L -->|Before/After Balance Modeling| M[Construct Canonical Fingerprint SHA-256]
    M -->|Record Planned Event| K
    
    M -->|Send Canonical Payload| N[Isolated Signer Adapter]
    N -->|Decrypt Private Key via AES-256-GCM| O[Sign Secp256k1 Payload]
    O -->|Broadcast Raw Tx| P[EVM RPC Node]
    
    P -->|Return Tx Hash| Q[Receipt Poller Service]
    Q -->|Transaction Receipt Confirmed| R[Post-Execution Verification]
    R -->|Verify Logs & Balance Diffs| S[Record Execution in Evidence Ledger]
    S -->|Update Hash Chain| K
    S -->|Update Budget Consumption Atomically| G
    S -->|Return 200 OK with TxHash & Receipt| B
```

---

## 3. Data Structures & Schemas

### 3.1 Parsed Intent Schema (`IntentPayload`)
```typescript
{
  intentType: 'transfer' | 'swap' | 'rebalance' | 'query' | 'emergency_stop';
  chainId: number;
  recipient?: `0x${string}`;
  assetIn?: `0x${string}`;
  assetOut?: `0x${string}`;
  amountInUnits?: string; // Decimal string (e.g. "50.00")
  maxSlippageBps?: number;
  explanation: string;
}
```

### 3.2 Canonical Transaction Fingerprint
To guarantee that the exact transaction evaluated by the policy engine is identical to the payload signed by the wallet, a deterministic digest is computed:

$$\text{Fingerprint} = \text{SHA-256}\left(\text{CanonicalSerialize}\left(\text{chainId}, \text{mandateId}, \text{target}, \text{amount}, \text{calldata}, \text{nonce}\right)\right)$$

### 3.3 Evidence Ledger Event Structure
Each audit event contains:
- `id`: UUIDv4
- `sequenceNumber`: Auto-incrementing 64-bit integer
- `timestamp`: ISO-8601 UTC timestamp
- `eventType`: `INTENT_RECEIVED` | `POLICY_EVALUATION` | `TRANSACTION_BROADCAST` | `RECEIPT_CONFIRMED` | `RISK_HALT` | `ATTACK_SCENARIO_RUN`
- `correlationId`: Traces a single user intent through execution
- `payloadHash`: SHA-256 of the canonical event payload
- `previousBlockHash`: Digest of the preceding record (cryptographic link)
- `currentBlockHash`: $\text{SHA-256}(\text{previousBlockHash} \parallel \text{payloadHash} \parallel \text{sequenceNumber})$
