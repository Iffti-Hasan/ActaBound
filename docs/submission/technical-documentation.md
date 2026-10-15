# ActaBound: Technical Documentation

**Competition:** Shenzhen FinTechathon 2026 — International Track  
**Topic:** Topic F: Agent Wallet — Autonomous On-Chain Wallet  
**Theme:** "AI as a Financial Participant"  
**Project:** ActaBound (A Mandate-Governed Autonomous On-Chain Wallet with Verifiable Risk Control)  

---

## 1. System Architecture & Core Concept

ActaBound establishes a robust paradigm for AI as a financial participant. Autonomous agents cannot be permitted to directly control raw private keys or execute unverified calldata. Instead, ActaBound enforces **bounded agency**:
- The AI Agent is strictly a natural-language interpreter and financial planner.
- A standalone, pure, deterministic policy engine evaluates all plans against an immutable mandate using exact integer arithmetic.
- The Financial Twin provides pre-flight balance sheet forecasting.
- The signing enclave is isolated and signs transactions only when verified against an approved policy permit.
- Every state transition is cryptographically chained in the Evidence Ledger.

```
User Prompt -> AI Intent Parser -> Structured Plan -> Policy Engine -> Financial Twin -> Isolated Signer -> Testnet EVM -> Evidence Ledger
```

---

## 2. Core Subsystems

### 2.1 AI Intent Parser & Schema Validation
- Inputs: Natural language prompts from the user or automated signals.
- Processing: Sanitizes input against prompt injection patterns (LLM01). Validates structured plans against strict Zod schemas (`StructuredPlanSchema`).
- Safety Boundary: Disallows code execution; emits typed intent objects only.

### 2.2 Deterministic Policy Engine
- Pure function with zero LLM or network dependency (`evaluatePolicy(mandate, proposal)`).
- Strict BigInt arithmetic (6 decimal places for USDC/USD: 1 USDC = `1000000n`). Prevents floating-point rounding attacks.
- Rules checked:
  1. Mandate active status and expiry timestamps.
  2. Permission tier boundaries (Observer, Planner, Bounded Executor, Owner Approval).
  3. Single-transaction spending caps.
  4. Cumulative 24-hour daily budget caps.
  5. Inviolable protected reserve preservation.
  6. Token and recipient destination allowlists.
  7. Maximum slippage / price-impact tolerance (basis points).
  8. Nonce and canonical fingerprint matching.

### 2.3 Financial Twin Simulation
- Reconstructs the portfolio balance sheet *before* and *after* execution.
- Evaluates capital reserves and budget margins.
- Explains constraints and provides actionable alternatives if an action is blocked.

### 2.4 Cryptographic Evidence Ledger
- Append-only hash chain linking user intents, policy decisions, canonical fingerprints, and on-chain receipts.
- Block digest: $\text{SHA-256}(\text{previousBlockHash} \parallel \text{payloadHash} \parallel \text{sequenceNumber})$.
- Live verification algorithm detects payload tampering or chain link truncation.

### 2.5 Autonomous Attack Arena
- Interactive laboratory containing 18 adversarial scenarios:
  - Budget Breaker, Reserve Breach, Mandate Expiry, Revoked Mandate, Recipient Substitution, Token Substitution, Prompt Injection, Unauthorized Contract, Malicious Unlimited Approval, Replay Attack, Concurrent Budget Race, Stale Price Feed, Simulation Revert, RPC Failure, Missing Receipt, Permission Escalation, Emergency Stop, and Changed Transaction After Approval (TOCTOU).

---

## 3. Deployment & Execution Stack
- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode, Tailwind CSS.
- **Persistence:** PostgreSQL 16 via Prisma ORM, Docker Compose.
- **Web3 Engine:** viem connecting to Sepolia EVM Testnet (Chain ID: 11155111).
- **Smart Contract:** `BoundedExecutor.sol` (Solidity 0.8.24) with on-chain daily limits, reserves, and pause switches.
- **Testing:** Vitest test suite achieving 100% pass rate (26/26 tests).
