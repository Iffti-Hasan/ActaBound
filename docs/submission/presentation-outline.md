# ActaBound: 10-Minute Presentation Deck & Speaker Notes

**Competition:** Shenzhen FinTechathon 2026 — International Track  
**Topic:** Topic F: Agent Wallet — Autonomous On-Chain Wallet  
**Theme:** "AI as a Financial Participant"  
**Presentation Time Limit:** Strictly $\le$ 10 Minutes (8 minutes presentation + 2 minutes Q&A)  
**Deliverable:** Submission Checklist Item 02 — Presentation Deck  

---

## Slide 1: Title & Vision (0:00 – 0:45)
- **Slide Title:** ActaBound: A Mandate-Governed Autonomous On-Chain Wallet with Verifiable Risk Control
- **Subtitle:** Autonomous Finance. Bounded Authority. Verifiable Actions.
- **Presenter:** [Team Member Name(s)]
- **Track & Topic:** International Track — Topic F: Agent Wallet
- **Speaker Notes:**  
  *"Good morning, esteemed judges and fellow innovators. Today, we are proud to present ActaBound. As artificial intelligence advances from conversational chatbots into autonomous financial participants, Web3 protocols face an unprecedented challenge: how can an AI agent autonomously manage digital assets on-chain without introducing catastrophic risks to user capital? ActaBound introduces a mathematically verifiable paradigm: Bounded Authority."*

---

## Slide 2: The Core Web3 Dilemma (0:45 – 1:45)
- **Slide Title:** The Critical Vulnerability of Autonomous AI Wallets
- **Key Points:**
  - Traditional bots: Hardcoded, rigid, non-adaptive.
  - Naive AI Wallets: Giving an LLM direct access to private keys or arbitrary calldata execution.
  - Three Fatal Failure Modes:
    1. **Adversarial Prompt Injection (OWASP LLM01):** Malicious prompts or poisoned metadata trick the AI into diverting funds.
    2. **Floating-Point Accounting Drift (IEEE 754):** JavaScript math rounding errors enable allowance bypass.
    3. **Time-of-Check / Time-of-Use (TOCTOU):** Changing calldata between policy approval and transaction broadcast.
- **Speaker Notes:**  
  *"If an autonomous agent is granted raw signing keys, any prompt injection or hallucination can instantly drain a treasury. Furthermore, standard programming floating-point arithmetic drifts over time, creating exploit windows. Autonomous agents must never have unrestricted authority. They require deterministic, tamper-evident boundaries."*

---

## Slide 3: The ActaBound Solution Architecture (1:45 – 3:00)
- **Slide Title:** Decoupled Architecture: The 4 Enclaves
- **Key Points:**
  - **The AI Agent is strictly a Planner:** Formulates structured proposals via Zod schema validation; zero key custody.
  - **Deterministic Policy Engine:** Pure TypeScript & BigInt arithmetic enforcing limits with zero LLM dependence.
  - **Financial Twin:** Pre-flight balance sheet forecasting before execution.
  - **Isolated Signing Enclave:** AES-256-GCM encrypted vault; signs only when canonical SHA-256 fingerprint matches approved policy permit.
- **Speaker Notes:**  
  *"ActaBound completely decouples intent interpretation from cryptographic authorization. The AI understands user goals and formulates structured plans. But the AI cannot authorize itself. Every plan must pass through our deterministic policy engine, which evaluates the proposal against an immutable, owner-defined mandate. Only upon policy approval does our isolated signer construct and broadcast the transaction."*

---

## Slide 4: Innovation 1 — Pure Deterministic Policy Engine (3:00 – 4:15)
- **Slide Title:** Fail-Closed Mathematical Guardrails
- **Key Points:**
  - Exact `BigInt` Integer Arithmetic: Standardized 6-decimal integer precision ($10^6$ multiplier); zero float drift.
  - Inviolate Protected Reserve: $200.00 USDC capital floor that can never be breached.
  - 24-Hour Cumulative Spending Cap: $200.00 USDC daily budget with atomic state locking.
  - Single-Transaction Cap: $100.00 USDC max per transaction.
  - Token and Recipient Allowlists: Hardcoded contract restrictions.
- **Speaker Notes:**  
  *"Our policy engine is a pure mathematical function. Notice that it does not use JavaScript floating-point numbers. All token calculations use BigInt integer arithmetic to prevent rounding attacks. The mandate enforces a non-negotiable protected reserve of 200 USDC and a daily cap of 200 USDC. If a proposed transaction would breach either limit by even one cent, the policy engine rejects it fail-closed."*

---

## Slide 5: Innovation 2 — Financial Twin (4:15 – 5:30)
- **Slide Title:** Pre-Flight Balance Sheet Simulation
- **Key Points:**
  - Side-by-side Before vs. Projected After balance sheets.
  - Real-time Reserve Margin calculation ($\text{Balance}_{\text{after}} - \text{Protected Reserve}$).
  - Dynamic Daily Budget tracking.
  - Explainable AI Suggestions: If a transaction breaches a reserve, the Twin automatically calculates and recommends the maximum safe transfer amount.
- **Speaker Notes:**  
  *"Before any transaction reaches the blockchain, our Financial Twin workspace simulates the expected outcome. It visualizes exactly what the user's balances, reserves, and daily budget will look like after execution. If an action breaches a boundary, the Twin flags a constraint breach and immediately recommends an alternative, safe amount."*

---

## Slide 6: Innovation 3 — Autonomous Attack Arena (5:30 – 6:45)
- **Slide Title:** Continuous Adversarial Red-Team Laboratory
- **Key Points:**
  - 18 automated security attack scenarios executed against live backend code:
    - *Budget Breaker, Reserve Breach, Mandate Expiry, Revoked Mandate, Recipient Substitution, Token Substitution, Prompt Injection, TOCTOU Calldata Tampering, Replay Attack, Concurrent Race, Stale Oracle, Simulation Revert, RPC Failure, Emergency Stop.*
  - 100% Defense Success Rate (18 / 18 Defended).
- **Speaker Notes:**  
  *"To prove to judges that our security controls are enforced in backend code rather than decorative UI badges, we built the Autonomous Attack Arena. This red-team lab executes 18 distinct adversarial attack scenarios against our live engine. Every single prohibited attack is blocked before signing or broadcasting, achieving a 100% defense rate."*

---

## Slide 7: Innovation 4 — Cryptographic Evidence Ledger (6:45 – 7:45)
- **Slide Title:** Tamper-Evident Audit Chain
- **Key Points:**
  - Sequential SHA-256 Block Hash Chaining:
    $$\text{Block Hash} = \text{SHA-256}(\text{Previous Hash} + \text{Payload Hash} + \text{Sequence Number})$$
  - Links User Intent $\to$ Policy Evaluation $\to$ Simulation $\to$ On-Chain TxHash $\to$ Receipt.
  - Live Verification Algorithm: Detects any database tampering or record truncation.
- **Speaker Notes:**  
  *"Every event in ActaBound is permanently chained in the Evidence Ledger using SHA-256 block hashing. If an attacker or compromised database administrator modifies even one past record, the hash link breaks immediately. The user can click 'Verify Cryptographic Chain' at any time to mathematically prove zero tampering."*

---

## Slide 8: Live Testnet Execution & Receipt Verification (7:45 – 8:45)
- **Slide Title:** Verifiable On-Chain Execution (Sepolia Testnet)
- **Key Points:**
  - Permitted Transaction: 40 USDC transferred to allowlisted address on Sepolia.
  - On-Chain Smart Contract Vault: `BoundedExecutor.sol` (Solidity 0.8.24) enforcing daily caps, reserves, and pause switches on-chain.
  - Block Explorer Receipt: Confirmed transaction hash on Sepolia Etherscan.
  - Prohibited Transactions: 4 attacks demonstrated blocked prior to broadcast.
- **Speaker Notes:**  
  *"In our live demonstration, we show both positive and negative execution paths. When permitted, the transaction is signed by the isolated signer, broadcast to the Sepolia testnet, and confirmed with an on-chain receipt. Simultaneously, multiple prohibited transactions are blocked before signing. No mock data is ever misrepresented as on-chain execution."*

---

## Slide 9: Conclusion & Competition Deliverables (8:45 – 9:30)
- **Slide Title:** Complete, Documented, and Verified
- **Key Points:**
  - **Task Completion (40%):** Full autonomous planning and execution pipeline.
  - **Security & Compliance (30%):** Bounded authority, key isolation, 18-scenario attack defense.
  - **Innovation & Interaction (30%):** Financial Twin, Attack Arena, Evidence Ledger.
  - **Topic F Challenge Bonus (0–5 pts):** On-chain smart contract vault (`BoundedExecutor.sol`).
  - All 6 official competition deliverables prepared in repository.
- **Speaker Notes:**  
  *"ActaBound fulfills every requirement of Topic F. We have built a fully functional, mathematically bounded autonomous agent with 26 passing automated tests and a production Next.js build. Thank you, and we look forward to your questions."*

---

## Slide 10: Q&A Slide (9:30 – 10:00)
- **Slide Title:** Questions & Answers
- **Repository:** `https://github.com/[team-repo]/FinTechathon`
- **Live Local Demo:** `http://localhost:3000`
