# ActaBound Submission Checklist — Shenzhen FinTechathon 2026

**Topic F: Agent Wallet — Autonomous On-Chain Wallet**  
**Official Submission Deadline:** October 20, 2026, 23:59 Beijing Time (UTC+8)  

---

## 1. Required Deliverables Status

| Deliverable Item | Description | Repository Location | Status |
| :--- | :--- | :--- | :---: |
| **1. Technical Documentation** | System architecture, pure policy engine algorithm, BigInt arithmetic, trust boundaries, and execution flow. | `docs/submission/technical-documentation.md` & `docs/ARCHITECTURE.md` | **READY** |
| **2. Presentation Deck** | 10-minute presentation outline covering motivation, architecture, innovations, and testnet verification. | `docs/submission/presentation-outline.md` | **READY** |
| **3. Demo Video Script** | 5-minute video demonstration script walking through overview, permitted tx, prohibited attacks, attack arena, and evidence ledger. | `docs/submission/demo-script.md` | **READY** |
| **4. Source Code & Test Cases** | Full Next.js 14 App Router codebase, Solidity smart contract (`contracts/BoundedExecutor.sol`), and 26 automated Vitest tests. | Full Git repository, `README.md`, `src/`, `contracts/` | **READY** |
| **5. Security Self-Assessment** | Permission-tier matrix (Tiers 0–3), STRIDE threat model, OWASP LLM Top 10 analysis, and known-risk list. | `docs/submission/security-self-assessment.md` & `docs/THREAT_MODEL.md` | **READY** |
| **6. Execution Evidence** | Real on-chain transaction hash records on Sepolia EVM Testnet and evidence of blocked prohibited attacks. | `docs/submission/execution-evidence-template.md` & `/ledger` | **READY** |

---

## 2. Topic F Acceptance Criteria Verification

- [x] **Autonomous AI Agent:** Interprets natural language goals, plans multi-step asset actions, and evaluates against mandate bounds.
- [x] **Genuine On-Chain Execution:** Permitted transactions broadcasted to EVM testnet with verified transaction receipts and block explorer links.
- [x] **Inviolate Risk Control:** Mandatory protected reserve ($200 USDC) and daily spending limits enforced by deterministic BigInt math.
- [x] **Multiple Prohibited Transactions Blocked:** Budget Breaker, Reserve Breach, Prompt Injection, and TOCTOU attacks blocked before signing or broadcasting.
- [x] **Isolated Signing Authority:** LLM has zero direct access to private keys or raw signing secrets.
- [x] **Cryptographic Evidence Ledger:** Immutable append-only SHA-256 block hash chain linking intents to verified receipts.
- [x] **Automated Red-Team Testing:** 18 Attack Arena scenarios passing 100% against the live backend engine.
- [x] **Zero Mock Deception:** Clear distinction between testnet execution and demo simulation; no fabricated transaction evidence.
