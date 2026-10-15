# ActaBound Presentation Deck Outline (10 Minutes)

**Competition:** Shenzhen FinTechathon 2026 — International Track  
**Topic:** Topic F: Agent Wallet — Autonomous On-Chain Wallet  
**Target Duration:** 10 Minutes Total (8 mins presentation + 2 mins Q&A)  

---

## Slide 1: Title Slide (0:00 - 0:45)
- **Title:** ActaBound: A Mandate-Governed Autonomous On-Chain Wallet with Verifiable Risk Control
- **Subtitle:** Autonomous Finance. Bounded Authority. Verifiable Actions.
- **Theme:** AI as a Financial Participant
- **Team:** [Team Name & Members]

## Slide 2: The Core Web3 AI Problem (0:45 - 2:00)
- **The Dilemma:** Giving an LLM direct access to wallet signing keys creates catastrophic vulnerabilities:
  - Prompt injection can hijack execution goals.
  - LLM hallucinations can transfer incorrect amounts.
  - Floating-point calculations drift, compromising accounting limits.
- **The ActaBound Paradigm:** Decouple intent planning from cryptographic authorization. AI is the Planner; Deterministic Math is the Enforcer.

## Slide 3: System Architecture (2:00 - 3:30)
- High-level workflow diagram (Mermaid flow):
  - User Goal $\to$ Intent Parser $\to$ Structured Plan $\to$ Deterministic Policy Engine $\to$ Financial Twin $\to$ Isolated Signer Enclave $\to$ EVM Testnet $\to$ Evidence Ledger.
- Four-Tier Permission Model (Observer, Planner, Bounded Executor, Owner Approval).

## Slide 4: Innovation 1 — Pure Deterministic Policy Engine (3:30 - 4:45)
- Pure function with zero LLM dependency.
- Strict BigInt arithmetic: zero floating-point imprecision.
- Inviolate Protected Reserve: Capital cannot be drained past user-defined minimum.
- 24-Hour Cumulative Budget Caps with atomic state locking.

## Slide 5: Innovation 2 — Financial Twin (4:45 - 6:00)
- Pre-flight balance sheet modeling *before* transaction signing.
- Compares before/after balances, fee projections, and reserve margins.
- Explainable AI feedback: Suggests safe alternatives when limits are breached.

## Slide 6: Innovation 3 — Autonomous Attack Arena (6:00 - 7:15)
- Interactive red-team laboratory featuring 18 adversarial scenarios:
  - Budget Breaker, Reserve Breach, Prompt Injection, Recipient Substitution, Replay Attack, TOCTOU.
- 100% defense rate against the live backend engine.

## Slide 7: Innovation 4 — Cryptographic Evidence Ledger (7:15 - 8:15)
- Append-only SHA-256 block hash chain linking user intent to on-chain receipt.
- Independent verification tool to detect tampering.

## Slide 8: Live Demonstration & Testnet Verification (8:15 - 9:15)
- Demonstration of permitted transfer on Sepolia EVM Testnet.
- Demonstration of multiple prohibited transactions blocked fail-closed before signing.
- Verified transaction receipt and block explorer link.

## Slide 9: Conclusion & Scoring Alignment (9:15 - 10:00)
- Task Completion (40%): End-to-end autonomous agent workflow.
- Security & Compliance (30%): Bounded authority, isolated keys, STRIDE threat model.
- Innovation & Interaction (30%): Financial Twin, Attack Arena, Evidence Ledger.
- Challenge Bonus (0–5 pts): On-chain smart contract vault (`BoundedExecutor.sol`).
