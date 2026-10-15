# ActaBound: Security Self-Assessment Report

**Competition Submission Requirement 5:** Security Self-Assessment Report (Permission-tier implementation and known-risk list).  
**Track:** Shenzhen FinTechathon 2026 — Topic F: Agent Wallet  

---

## 1. Permission-Tier Implementation

ActaBound implements four distinct authorization tiers:

| Tier | Name | Capabilities | Enforcement Layer |
| :--- | :--- | :--- | :--- |
| **Tier 0** | **Observer** | Read-only portfolio queries, risk telemetry, and audit trail inspection. Cannot formulate transaction plans or sign transactions. | API Gateway & Policy Engine |
| **Tier 1** | **Planner** | Autonomous goal interpretation, structured plan creation, and Financial Twin pre-flight simulations. Cannot broadcast or sign transactions. | Policy Engine & Signer Enclave |
| **Tier 2** | **Bounded Executor** *(Active)* | Autonomous execution strictly bounded within mandate limits (daily cap, reserve, allowlists). | Deterministic Policy Engine & Smart Contract |
| **Tier 3** | **Owner Approval** | High-impact operations (mandate updates, unlisted recipients, limit expansions) strictly mandate manual human cryptographic signature. | EIP-712 / Secp256k1 Signature Gate |

---

## 2. Threat Modeling & Countermeasures

| Threat Vector | OWASP / STRIDE Category | ActaBound Countermeasure | Verification Status |
| :--- | :--- | :--- | :--- |
| **Direct & Indirect Prompt Injection** | OWASP LLM01 | AI intent parser sanitizes prompt; structured outputs strictly adhere to Zod schema. LLM output is merely a proposal evaluated by policy engine. | Tested in Attack Scenario 7 & unit tests. |
| **Excessive Agency** | OWASP LLM06 | Pure BigInt policy engine independently halts any transaction violating budget, reserve, or allowlist. | Tested in Attack Scenarios 1, 2, 5, 6, 8. |
| **Key Extraction / Exposure** | OWASP LLM08 | Signing keys are encrypted using AES-256-GCM in an isolated process; LLM model context never receives raw keys. | Tested in `crypto.test.ts`. |
| **Time-of-Check / Time-of-Use (TOCTOU)** | Tampering | Signer independently serializes transaction, computes SHA-256 fingerprint, and verifies against policy permit before signing. | Tested in Attack Scenario 18. |
| **Budget Race Condition** | Denial of Service | PostgreSQL atomic row-locking prevents concurrent overspending. | Tested in Attack Scenario 11. |
| **Audit Trail Manipulation** | Repudiation | Cryptographic block hash chaining ($\text{SHA-256}$) links user prompt to policy evaluation, tx hash, and receipt. | Tested in `evidence-ledger.test.ts`. |

---

## 3. Known Risks & Residual Limitations

1. **Testnet RPC Latency / Reorgs:** Public testnet RPC nodes (e.g. Sepolia) may experience occasional timeouts or temporary forks. ActaBound incorporates fail-closed retry logic and polling timeouts.
2. **Oracle Staleness:** In offline or local demo mode, prices are sourced from local deterministic fixtures. Live deployments require redundant Chainlink or Pyth feeds with staleness circuit breakers.
3. **Smart Contract Deployment Dependency:** Live on-chain execution requires a funded testnet account. ActaBound clearly distinguishes real on-chain hashes from simulated demo executions.
