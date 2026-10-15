# ActaBound Automated Test Results

**Date of Execution:** October 15, 2026  
**Test Framework:** Vitest v2.1.9 (JSDOM Environment)  
**Execution Status:** **100% Passed (26/26 tests, 6 test files)**  

---

## 1. Test Suite Summary Table

| Test Suite File | Domain Covered | Tests Run | Passed | Failed | Duration |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `src/test/policy-engine.test.ts` | Deterministic Policy Engine & BigInt Math | 10 | 10 | 0 | 27ms |
| `src/test/crypto.test.ts` | AES-256-GCM Encryption, AAD & SHA-256 | 4 | 4 | 0 | 26ms |
| `src/test/ai-parser.test.ts` | Zod Intent Parser & Prompt Injection Guard | 4 | 4 | 0 | 29ms |
| `src/test/financial-twin.test.ts` | Balance Sheet Simulation & Reserve Forecast | 2 | 2 | 0 | 13ms |
| `src/test/evidence-ledger.test.ts` | Tamper-Evident SHA-256 Hash Chain Integrity | 2 | 2 | 0 | 8ms |
| `src/test/attack-arena.test.ts` | 18 Adversarial Red-Team Scenarios | 4 | 4 | 0 | 60ms |
| **Total** | **End-to-End System Verification** | **26** | **26** | **0** | **4.56s** |

---

## 2. Detailed Test Outcomes

### A. Deterministic Policy Engine (`policy-engine.test.ts`)
- `allows a compliant transaction within all bounds`: **PASS**
- `blocks when transaction exceeds max single transaction limit`: **PASS** (Reason: `EXCEEDS_TRANSACTION_LIMIT`)
- `blocks when cumulative daily budget would be exceeded`: **PASS** (Reason: `DAILY_BUDGET_EXCEEDED`)
- `blocks when protected reserve would be breached`: **PASS** (Reason: `RESERVE_BREACH`)
- `blocks when mandate is expired`: **PASS** (Reason: `MANDATE_EXPIRED`)
- `blocks when mandate is revoked`: **PASS** (Reason: `MANDATE_REVOKED`)
- `blocks unapproved recipient destination in Bounded Executor mode`: **PASS** (Reason: `DESTINATION_NOT_ALLOWLISTED`)
- `blocks unapproved token asset`: **PASS** (Reason: `TOKEN_NOT_ALLOWLISTED`)
- `blocks excessive slippage`: **PASS** (Reason: `EXCESSIVE_SLIPPAGE`)
- `correctly converts BigInt decimals without float precision drift`: **PASS** (Exact `123456789n` integer comparison)

### B. Cryptographic Isolation (`crypto.test.ts`)
- `encrypts and decrypts sensitive data using AES-256-GCM`: **PASS**
- `fails decryption if ciphertext has been tampered with`: **PASS** (Detects altered auth tag fail-closed)
- `fails decryption if AAD does not match`: **PASS** (Enforces account ID binding)
- `generates identical canonical hash regardless of JSON key ordering`: **PASS** (SHA-256 deterministic serialization)

### C. AI Intent Parser (`ai-parser.test.ts`)
- `parses a valid transfer instruction into structured plan`: **PASS** (Extracts 45.50 USDC, target address, 0% slippage)
- `detects and flags adversarial prompt injection attempting rule bypass`: **PASS** (`isPromptInjection: true`)
- `flags attempts to extract private keys or credentials`: **PASS**
- `correctly maps emergency stop commands to emergency_stop intent`: **PASS**

### D. Financial Twin (`financial-twin.test.ts`)
- `accurately models pre-execution and post-execution balance sheets for a feasible transfer`: **PASS**
- `detects and explains reserve breach when transfer breaches protected reserve`: **PASS**

### E. Evidence Ledger (`evidence-ledger.test.ts`)
- `appends events and verifies unbroken cryptographic integrity`: **PASS** (0 altered blocks)
- `detects tampering immediately if any past event payload is modified`: **PASS** (Identifies exact corrupted block sequence #1)

### F. Autonomous Attack Arena (`attack-arena.test.ts`)
- `has all 18 mandated adversarial attack scenarios defined`: **PASS**
- `successfully executes Budget Breaker scenario and blocks execution`: **PASS**
- `successfully executes Reserve Breach scenario and blocks execution`: **PASS**
- `runs all 18 adversarial scenarios and achieves 100% pass rate against engine`: **PASS** (18/18 scenarios defended)
