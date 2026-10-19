# ActaBound: Security Self-Assessment Report

**Competition:** Shenzhen FinTechathon 2026 — International Track  
**Topic:** Topic F: Agent Wallet — Autonomous On-Chain Wallet  
**Theme:** "AI as a Financial Participant"  
**Deliverable:** Submission Checklist Item 05 — Security Self-Assessment Report  
**Date of Assessment:** October 19, 2026  

---

## 1. System Scope & Architecture

ActaBound provides bounded execution authority for autonomous on-chain agents interacting with EVM smart contracts. The scope of this security self-assessment covers:
- The natural-language intent parsing interface and prompt injection defenses.
- The pure, deterministic policy engine enforcing spending caps, reserve preservation, and allowlists.
- The isolated signing enclave handling delegated cryptographic credentials.
- The on-chain smart contract vault (`BoundedExecutor.sol`).
- The tamper-evident, append-only Evidence Ledger.
- The Autonomous Attack Arena red-team laboratory.

---

## 2. Threat Modeling Methodology

ActaBound applies **STRIDE** methodology (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) combined with the **OWASP Top 10 for Large Language Model Applications**:

| STRIDE / OWASP Vector | Specific Attack Threat in Autonomous Web3 Agents | Potential Impact | ActaBound Countermeasure |
| :--- | :--- | :--- | :--- |
| **LLM01 / Tampering** | Adversarial prompt injection instructing agent to bypass policy or redirect recipient. | Complete treasury drain to attacker address. | Two-stage parsing: regex heuristic sanitizer + strict Zod schema. LLM proposal must pass pure deterministic policy check. |
| **LLM06 / Elevation** | Autonomous agent exceeding its authorized spending mandate or granting itself permissions. | Excessive capital loss beyond user intent. | Four-tier permission matrix. High-impact operations strictly require Tier 3 Owner Approval. |
| **LLM08 / Disclosure** | Prompt extraction techniques attempting to reveal private keys or API credentials. | Private key leakage and total account compromise. | Signing keys encrypted via AES-256-GCM in an isolated process; LLM model context never receives raw keys. |
| **Tampering (TOCTOU)** | Changing transaction calldata, amount, or recipient between policy evaluation and signing. | Unauthorized transaction execution. | Canonical SHA-256 fingerprinting. Signer verifies digest against policy permit before signing. |
| **Spoofing / Replay** | Re-broadcasting a previously executed signed transaction on the network. | Duplicate balance deductions. | Monotonic execution nonces and duplicate fingerprint rejection. |
| **Denial of Service** | Concurrent spending race conditions exploiting latency before balance updates. | Cumulative daily budget overspending. | Atomic state reservation and PostgreSQL row locking. |
| **Repudiation** | Malicious agent or user claiming a transaction was unauthorized or logs were modified. | Undetectable audit failure. | SHA-256 block hash chaining in the Evidence Ledger with live tamper detection. |

---

## 3. Trust Boundaries

```
[ UNTRUSTED ZONE ]
- Browser client / User input text
- External RPC node responses
- Third-party contract metadata
------------------------------------------------------ Trust Boundary 1
[ APPLICATION GATEWAY ]
- Next.js Route Handlers & Zod Schema Validation
- Input Sanitizer (Neutralizes prompt injection)
------------------------------------------------------ Trust Boundary 2
[ DETERMINISTIC ENFORCEMENT ZONE ]
- Pure Policy Engine (Strict BigInt math)
- Financial Twin Simulator
- Evidence Ledger (Cryptographic hash chaining)
------------------------------------------------------ Trust Boundary 3
[ ISOLATED SECRET ENCLAVE ]
- AES-256-GCM Key Vault
- viem Delegated Signer (Zero LLM Access)
```

---

## 4. Permission-Tier Implementation

ActaBound enforces four strict authorization tiers:

| Tier | Name | Capabilities | Enforcement Mechanism | Status |
| :---: | :--- | :--- | :--- | :---: |
| **0** | **Observer** | Read-only portfolio queries, risk telemetry, and audit inspection. Cannot formulate plans or sign transactions. | Policy Engine rejects any execution request with `OBSERVER_TIER_NO_EXECUTION`. | **IMPLEMENTED & TESTED** |
| **1** | **Planner** | Autonomous goal interpretation, structured plan creation, and Financial Twin simulation. Cannot sign or broadcast. | Policy Engine rejects broadcast requests with `PLANNER_TIER_NO_EXECUTION`. | **IMPLEMENTED & TESTED** |
| **2** | **Bounded Executor** *(Active Default)* | Autonomous on-chain execution strictly bounded within mandate limits (daily cap, reserve, allowlists). | Deterministic Policy Engine & Smart Contract Vault. | **IMPLEMENTED & TESTED** |
| **3** | **Owner Approval** | Required for mandate modifications, unallowlisted destinations, or limit increases. Requires explicit human signature. | Secp256k1 signature validation gate. | **IMPLEMENTED & TESTED** |

---

## 5. Security Controls & Verification Matrix

The following table details the implementation, test cases, and actual results for all security controls:

| Security Control | Threat Addressed | Implementation File | Verification Test | Actual Test Result | Status | Limitations |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **LLM Key Isolation Enclave** | Key Extraction (LLM08) | `src/lib/crypto.ts` | `src/test/crypto.test.ts` | **PASSED (4/4)** | **IMPLEMENTED & TESTED** | Requires secure environment variable provisioning. |
| **AES-256-GCM Encryption** | Data at Rest Tampering | `src/lib/crypto.ts` | `src/test/crypto.test.ts` | **PASSED (4/4)** | **IMPLEMENTED & TESTED** | Encryption key must be managed securely outside Git. |
| **Deterministic Policy Engine** | Excessive Agency (LLM06) | `src/lib/policy/engine.ts` | `src/test/policy-engine.test.ts` | **PASSED (10/10)** | **IMPLEMENTED & TESTED** | Rules apply only to operations routed through the engine. |
| **Exact BigInt Arithmetic** | Float Precision Drift | `src/lib/policy/engine.ts` | `src/test/policy-engine.test.ts` | **PASSED** (Exact integer match) | **IMPLEMENTED & TESTED** | Standardized to 6 decimal precision for USD/USDC units. |
| **Protected Capital Reserve** | Treasury Depletion | `src/lib/policy/engine.ts` | `src/test/financial-twin.test.ts` | **PASSED** (`RESERVE_BREACH`) | **IMPLEMENTED & TESTED** | Gas fees on-chain must be accounted for separately. |
| **Cumulative Daily Spending Cap** | Rapid Fund Draining | `src/lib/policy/engine.ts` | `src/test/policy-engine.test.ts` | **PASSED** (`DAILY_BUDGET_EXCEEDED`) | **IMPLEMENTED & TESTED** | 24-hour window resets daily. |
| **AI Prompt Injection Guard** | Prompt Injection (LLM01) | `src/lib/ai/parser.ts` | `src/test/ai-parser.test.ts` | **PASSED** (`isPromptInjection: true`) | **IMPLEMENTED & TESTED** | Heuristics cover known direct injection patterns. |
| **Canonical SHA-256 Fingerprint** | TOCTOU Calldata Tampering | `src/lib/crypto.ts` | `src/test/attack-arena.test.ts` | **PASSED** (Fingerprint mismatch detected) | **IMPLEMENTED & TESTED** | Canonical serialization must be strictly deterministic. |
| **Monotonic Nonce Replay Guard** | Replay Attacks | `contracts/BoundedExecutor.sol` | `src/test/attack-arena.test.ts` | **PASSED** (`REPLAY_FINGERPRINT_VERIFIED`) | **IMPLEMENTED & TESTED** | Nonce must increment monotonically. |
| **Evidence Ledger Hash Chain** | Log Repudiation / Tampering | `src/lib/evidence/ledger.ts` | `src/test/evidence-ledger.test.ts` | **PASSED** (Detects modified block) | **IMPLEMENTED & TESTED** | Local hash chain is tamper-evident; anchoring to L1 adds immutability. |
| **Risk Controller Circuit Breaker** | Cascading Failures | `src/lib/risk/controller.ts` | `src/test/attack-arena.test.ts` | **PASSED** (Transitions to PAUSED) | **IMPLEMENTED & TESTED** | Emergency stop requires manual operator reset. |
| **Smart Contract Vault** | Compromised Server Bypass | `contracts/BoundedExecutor.sol` | Contract unit tests | **IMPLEMENTED** | **IMPLEMENTED** | Requires deployment to target EVM network. |

---

## 6. Known Risks & Mitigations

1. **Testnet RPC Unreliability:** Public RPC providers can experience rate limits or downtime.
   - *Mitigation:* The blockchain adapter implements fail-closed error handling. If the RPC fails, transactions are halted rather than optimistically assuming success.
2. **Oracle Price Staleness:** External decentralized feeds can halt during network congestion.
   - *Mitigation:* The Risk Sentinel continuously tracks feed timestamps; if staleness exceeds 300 seconds, the system automatically elevates to `BLOCKED`.
3. **Smart Contract Gas Spikes:** Extreme gas price volatility could cause transactions to remain pending.
   - *Mitigation:* Transaction Inspector estimates network gas fees pre-flight; policy engine incorporates gas allowance limits.
