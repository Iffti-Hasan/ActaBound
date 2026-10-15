# Reference Review — Shenzhen FinTechathon 2026 (International Track)

**Date of Review:** October 15, 2026  
**Project:** ActaBound (Mandate-Governed Autonomous On-Chain Wallet with Verifiable Risk Control)  
**Topic:** Topic F: Agent Wallet — Autonomous On-Chain Wallet  
**Theme:** "AI as a Financial Participant"  

---

## 1. Files Inspected

The following reference documents located in `docs/reference/` were inspected in full:

1. **`international-topics-rules-en.docx`**  
   - Official track topics, evaluation criteria, eligibility rules, and submission requirements.
2. **`FinTechathon 2026 _ Shenzhen International FinTech Competition.pdf`**  
   - Comprehensive competition overview, organizational structure (Tsinghua PBCSF, WeBank, Shenzhen University, Shenzhen Municipal Local Financial Administration), schedules, awards, and advisory board.
3. **`Shenzhen FinTech Competition 2026 in China (Fully Funded).pdf`**  
   - Program details, timeline, international travel/accommodation coverage, and awards breakdown.
4. **`international-registration-form-en.xlsx`**  
   - Formal team registration sheet, member info schema (2–5 members, $\ge 60\%$ non-Chinese nationals for international track), declaration, and verification terms.
5. **`Public file share - Files - OOU Cloud Storage.pdf`**  
   - Documented file share export from cloud storage.

---

## 2. Competition Requirements Extracted from Official Documents

### 2.1 Theme & Topic Scope
- **Theme:** *"AI as a Financial Participant"* — teams design and build an AI agent capable of completing real tasks in a financial scenario.
- **Topic F Definition:** *"Topic F | Agent Wallet — Autonomous On-chain Wallet: The track's original on-chain topic — build an AI wallet agent that autonomously executes on-chain operations (asset management, transaction execution, risk control). Ambitious ideas are encouraged, with a 0–5 point challenge bonus."*

### 2.2 Scoring Criteria
| Dimension | Weight | Notes |
| :--- | :--- | :--- |
| **Task Completion** | **40%** | End-to-end functionality, agent autonomous planning, asset management workflows, real on-chain transaction execution and verification. |
| **Security & Compliance** | **30%** | Mandate enforcement, deterministic risk controls, permission tiers, private key isolation, replay/front-running protection, audit trail. |
| **Innovation & Interaction** | **30%** | Financial Twin simulation, Autonomous Attack Arena, interactive intent comprehension, explainability, premium fintech UI/UX. |
| **Challenge Bonus (On-Chain Exploration)** | **0–5 pts** | Genuine on-chain exploration, smart contract mandate enforcement, verifiable execution on testnet with verified transaction receipts. |

### 2.3 Required Deliverables (Submission Checklist)
According to Section 5 of `international-topics-rules-en.docx`:
1. **Technical Documentation**: System architecture, core algorithm description, security design.
2. **Presentation Deck**: Final presentation slides (maximum 10 minutes presentation duration).
3. **Demo Video**: Video demonstrating the system in action (optional, maximum 5 minutes).
4. **Source Code**: Full source code repository with comprehensive `README.md`, GitHub repository link, deployment instructions, and test cases.
5. **Security Self-Assessment Report**: Permission-tier implementation details, threat model, and known-risk list.
6. **Execution Evidence**: For Topic F: **real on-chain transaction hashes** and verified receipts (distinguishing real on-chain hashes from simulated accounts/sandbox logs).

### 2.4 Timeline & Deadlines
- **Submission Deadline:** October 20, 2026, 23:59 Beijing Time (UTC+8) / 16:00 UTC / 17:00 London (BST) / 09:00 US Pacific (PDT).
- **Online Review:** Late October 2026 by panel of WeBank industry experts & university scholars.
- **Finalists Announced:** By October 31, 2026.
- **Grand Final & WeBank HQ Visit (Shenzhen):** November 20–23, 2026.

---

## 3. Design References & Usability Principles

To deliver a high-grade fintech user experience without copying proprietary assets:
- **Operational Clarity (Stripe Dashboard reference):** Clear data-dense tables, explicit status badges, filterable ledgers, transparent audit event logs.
- **Structured Financial Trading (Coinbase Advanced reference):** Clear asset allocation visualizations, balance breakdowns (total, available, protected reserve), real-time gas/fee estimates, execution parameters.
- **Verifiable Autonomous Controls (Reputable Web3 Wallets):** Explicit mandate boundaries, permission tiers (Observer, Planner, Bounded Executor, Owner Approval), transaction simulation before broadcast, fail-closed policy enforcement.

---

## 4. Key Uncertainties & Assumptions

### Facts Established from Documents:
1. Topic F specifically requires on-chain operations and rewards on-chain exploration with a 0–5 point bonus.
2. The submission requires **real on-chain transaction hashes** for Topic F.
3. English is the official language for documentation, source code, and presentations.
4. Security and compliance account for 30% of total score, emphasizing permission tiers and bounded authority.

### Inquiries / Confirmations for Organizers:
1. **Network Acceptance:** Does the organizing committee accept public EVM testnets (e.g., Ethereum Sepolia, Arbitrum Sepolia, Polygon Amoy) or local testnets (Anvil/Hardhat) as sufficient for "real on-chain transaction hashes"?  
   *Working Assumption:* ActaBound configures standard EVM testnet (Sepolia/Amoy) with real RPC, real funded test account, real contract deployment, and verifiable block explorer receipts, while also supporting an offline local demo mode.
2. **DEX Liquidity on Testnet:** Since public testnets often have illiquid or deprecated Uniswap pools, how should token swap slippage be validated?  
   *Working Assumption:* Provide real on-chain token transfer/deposit/approval workflows on testnet, and provide deterministic simulated swaps with exact mathematical pricing in the Financial Twin, clearly labelling simulated quotes as such.

---

## 5. External Libraries, Frameworks & License Compliance

All third-party libraries used in ActaBound are standard, permissive open-source packages (MIT / Apache 2.0 / BSD):

| Component | Library / Framework | License | Role |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js 15+ (App Router), React 19 | MIT | High-performance SSR and client application |
| **Language** | TypeScript 5+ | Apache 2.0 | Type safety, strict domain modeling |
| **Styling & UI** | Tailwind CSS, Lucide React, Radix UI Primitives | MIT | Accessible, responsive fintech interface |
| **Charts** | Recharts | MIT | Financial and security visualizations |
| **Validation** | Zod | MIT | Schema enforcement at runtime (AI inputs & policy rules) |
| **Persistence** | Prisma ORM, PostgreSQL | Apache 2.0 | Relational storage for mandates, events, evidence |
| **Web3 / Blockchain** | viem | MIT | EVM interaction, typed RPC, contract execution |
| **Smart Contracts** | OpenZeppelin Contracts, Foundry (Solidity 0.8.24+) | MIT / Apache 2.0 | Bounded execution vault, role enforcement |
| **Cryptography** | Node.js native `crypto` (AES-256-GCM, SHA-256) | Node.js | Key isolation, digest computation, tamper evidence |
| **Testing** | Vitest | MIT | Unit, policy, security, and integration test suite |
