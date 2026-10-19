# ActaBound: Project Inspection & Reference Review Report

**Date of Inspection:** October 19, 2026  
**Workspace Inspected:** `D:\FinTechathon`  
**Lead Architect & Auditor:** Senior Full-Stack, Security & Blockchain Engineer  

---

## 1. Official Competition Requirements (Source of Truth)

Inspecting `docs/reference/Public file share - Files - OOU Cloud Storage.pdf` (and corroborating with `docs/reference/international-topics-rules-en.docx`), the official competition rules specify the following exact six deliverables for the International Track under the theme *"AI as a Financial Participant"* (Topic F: Agent Wallet — Autonomous On-Chain Wallet):

```
Submission checklist:
01 Technical documentation: system architecture, core algorithm description, security design
02 Presentation deck: final presentation no longer than 10 minutes
03 Demo video: optional, no longer than 5 minutes
04 Source code: with README, GitHub repository link, deployment instructions, and test cases
05 Security self-assessment report: permission-tier implementation and known-risk list
06 Execution evidence: for non-on-chain topics: simulated-account/sandbox operation logs and demo video; for the on-chain topic: real on-chain transaction hashes
```

### Key Scoring Criteria
- **Task Completion (40%):** Completeness of asset management workflow, autonomous planning, and verifiable transaction execution.
- **Security & Compliance (30%):** Deterministic policy controls, permission tiers, private key isolation, replay protection, and audit integrity.
- **Innovation & Interaction (30%):** Financial Twin simulation, Autonomous Attack Arena, and explainable AI interactions.
- **Topic F Challenge Bonus (0–5 points):** Genuine on-chain exploration with real testnet transactions and smart contract vault enforcement.

---

## 2. Actual Implemented Technologies

Inspection of `package.json`, configuration files, and `src/` establishes the following concrete stack:

| Layer | Declared Technology | Implementation File / Config | Status |
| :--- | :--- | :--- | :---: |
| **Frontend Framework** | Next.js 14.2.35 (App Router, Server & Client Components) | `package.json`, `src/app/` | **Genuinely Implemented** |
| **UI & Styling** | React 18.3.1, Tailwind CSS 3.4.15, Lucide React icons | `tailwind.config.js`, `src/app/globals.css` | **Genuinely Implemented** |
| **Validation Engine** | Zod 3.23.8 | `src/lib/ai/types.ts` | **Genuinely Implemented** |
| **Cryptography** | Node.js native `crypto` (AES-256-GCM, SHA-256) | `src/lib/crypto.ts` | **Genuinely Implemented** |
| **Policy Engine** | Pure TypeScript with exact `BigInt` arithmetic (zero float drift) | `src/lib/policy/engine.ts` | **Genuinely Implemented** |
| **Blockchain Adapter** | viem 2.21.45 (Sepolia Testnet RPC + Explorer links) | `src/lib/blockchain/adapter.ts` | **Genuinely Implemented** |
| **Smart Contract** | Solidity 0.8.24 (`BoundedExecutor.sol`) with on-chain limits | `contracts/BoundedExecutor.sol` | **Genuinely Implemented** |
| **Audit Ledger** | SHA-256 Block Hash Chaining & Tamper Verification | `src/lib/evidence/ledger.ts` | **Genuinely Implemented** |
| **Red-Team Suite** | Autonomous Attack Arena (18 adversarial scenarios) | `src/lib/attack-arena/scenarios.ts` | **Genuinely Implemented** |
| **Database ORM** | Prisma ORM 5.22.0 (PostgreSQL client generated) | `prisma/schema.prisma` | **Schema Defined & Generated** |
| **Local DB Container** | Docker Compose with PostgreSQL 16 Alpine container | `docker-compose.yml` | **Configured** |
| **Test Runner** | Vitest 2.1.9 with JSDOM environment | `vitest.config.ts`, `src/test/` | **26/26 Tests Passing** |

---

## 3. Discovered API Endpoints & Routes

The Next.js App Router exposes 12 user interface pages and 3 server API route handlers:

### Server API Endpoints
1. `POST /api/chat` (`src/app/api/chat/route.ts`):
   - Accepts natural-language user prompt.
   - Invokes `parseIntentFromPrompt` (Zod validation & injection filter).
   - Evaluates against active mandate via `evaluatePolicy`.
   - Runs `simulateFinancialTwin` for before/after balance sheet modeling.
   - If permitted, calls `blockchainAdapter.executePermittedTransaction`.
   - Appends all audit events to `evidenceLedger`.
2. `GET` & `POST /api/arena` (`src/app/api/arena/route.ts`):
   - GET: Returns the catalogue of 18 adversarial security scenarios.
   - POST: Runs an individual scenario or runs all 18 scenarios simultaneously.
3. `GET /api/ledger` (`src/app/api/ledger/route.ts`):
   - Returns full chronological list of SHA-256 hash-linked audit blocks.
   - Runs `verifyIntegrity()` to detect any block payload or link tampering.

### User Interface Routes
1. `/` (`src/app/page.tsx`): Overview Dashboard with portfolio metrics, active mandate summary, and quick launch links.
2. `/portfolio` (`src/app/portfolio/page.tsx`): Asset management, token balance breakdown, search filter, and allocation charts.
3. `/chat` (`src/app/chat/page.tsx`): AI Command Center with interactive chatbot, suggested scenario pills, structured plan cards, policy decision badges, Financial Twin preview, and verified receipt drawer.
4. `/mandates` (`src/app/mandates/page.tsx`): Mandate Studio with 4 permission tiers (Observer, Planner, Bounded Executor, Owner Approval), spending caps, and emergency revocation controls.
5. `/twin` (`src/app/twin/page.tsx`): Financial Twin simulation workspace for arbitrary transfer inputs with side-by-side Before vs Projected After balance sheets.
6. `/inspector` (`src/app/inspector/page.tsx`): Transaction Inspector with SHA-256 canonical fingerprint, ABI calldata decoding, and gas estimates.
7. `/arena` (`src/app/arena/page.tsx`): Autonomous Attack Arena red-team laboratory testing live policy enforcement.
8. `/ledger` (`src/app/ledger/page.tsx`): Evidence Ledger with interactive "Verify Cryptographic Chain" integrity audit tool.
9. `/risk` (`src/app/risk/page.tsx`): Risk Center with real-time sentinels and emergency halt circuit breaker.
10. `/security` (`src/app/security/page.tsx`): Security & Compliance Center showing permission tiers and active controls matrix.
11. `/settings` (`src/app/settings/page.tsx`): Settings and RPC / KMS status viewer.
12. `/about` (`src/app/about/page.tsx`): Architecture documentation and technical specifications index.

---

## 4. Genuinely Implemented vs. Simulated Features

To maintain scientific integrity and prevent deceptive demo claims, here is the honest categorization of system features:

### Genuinely Implemented (Real Code Execution)
- **Deterministic Policy Engine (`src/lib/policy/engine.ts`):** 100% genuine pure function. Evaluates 10+ rules using exact `BigInt` integer arithmetic. Never relies on LLM for authorization.
- **Autonomous Attack Arena (`src/lib/attack-arena/`):** 100% genuine. Runs real test logic for all 18 scenarios against `evaluatePolicy`, `riskController`, and `evidenceLedger`.
- **Evidence Ledger Cryptographic Hash Chain (`src/lib/evidence/ledger.ts`):** 100% genuine SHA-256 block hash chaining with tamper verification algorithm.
- **Cryptographic Encryption Enclave (`src/lib/crypto.ts`):** 100% genuine AES-256-GCM encryption, fresh 12-byte IV generation, and authentication tag validation.
- **AI Intent Parsing & Injection Filter (`src/lib/ai/parser.ts`):** 100% genuine regex heuristic and Zod schema validation.
- **Financial Twin Simulation (`src/lib/simulation/twin.ts`):** 100% genuine mathematical modeling of before-and-after balances, reserve margin, and budget limits.
- **Smart Contract Vault (`contracts/BoundedExecutor.sol`):** 100% genuine Solidity 0.8.24 contract with on-chain daily limit, reserve requirement, token allowlists, and pause controls.

### Explicitly Simulated / Demo-Mode Boundary
- **Market Price Feeds:** In the current demo mode, asset prices ($1.00 USDC, $2,600.00 ETH) are sourced from deterministic local fixtures rather than a live external Chainlink/Pyth oracle.
- **Demo Mode Transaction Execution:** When `DEMO_MODE=true` or when no funded testnet private key is supplied in `.env`, `blockchainAdapter.executePermittedTransaction` outputs a deterministic SHA-256 hash formatted as a valid EVM receipt and labels it `isSimulatedDemo: true`.
- **Database Persistence:** The schema is fully compiled with Prisma Client generated. In local mode without Docker Desktop running, the application uses an in-memory service instance to avoid crashing when PostgreSQL is offline.

---

## 5. Automated Test Suite Status

The automated test suite runs via Vitest (`npm test`):
- **Test Files Passed:** 6 / 6
- **Total Tests Passed:** 26 / 26 (100% pass rate)
- **Execution Time:** ~4.5 seconds

```
✓ src/test/crypto.test.ts (4 tests)
✓ src/test/evidence-ledger.test.ts (2 tests)
✓ src/test/financial-twin.test.ts (2 tests)
✓ src/test/policy-engine.test.ts (10 tests)
✓ src/test/ai-parser.test.ts (4 tests)
✓ src/test/attack-arena.test.ts (4 tests)
```
