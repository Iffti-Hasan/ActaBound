# ActaBound 5-Minute Demonstration Video Script

**Topic:** Topic F: Agent Wallet — Autonomous On-Chain Wallet  
**Target Duration:** Exactly 5 Minutes  
**Voiceover & Screen Action Guide:**  

---

### [0:00 - 0:45] Scene 1: Introduction & The Core Problem
- **Visual:** Open on the ActaBound Overview Dashboard (`/`). Show metrics: Total Portfolio Value ($1,670.00), Protected Reserve ($200.00), Remaining Daily Budget ($150.00). Toggle Dark/Light mode to showcase design polish.
- **Voiceover:** *"Welcome to ActaBound, a mandate-governed autonomous on-chain wallet built for the Shenzhen FinTechathon 2026. While autonomous AI agents offer massive potential in Web3, giving an LLM direct signing keys creates extreme vulnerability to prompt injections and budget drains. ActaBound solves this by strictly isolating the AI planner from the deterministic policy engine and private signing enclave."*

---

### [0:45 - 2:00] Scene 2: AI Command Center & Permitted Transaction
- **Visual:** Navigate to `/chat`. Click the quick pill: *"Transfer 40 USDC to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8"*.
- **Visual:** Show AI intent parsing, the Policy Engine card with green `ALLOW` badge, the Financial Twin preview showing reserve margin ($250.00 buffer), and the confirmed on-chain transaction receipt with block number and copyable transaction hash.
- **Voiceover:** *"In the AI Command Center, we instruct the agent to transfer 40 USDC. Notice what happens: the AI parses the goal into a structured plan, but cannot execute it directly. The deterministic policy engine verifies that 40 USDC satisfies the single-tx cap, the daily budget, and preserves our inviolate 200 USDC reserve. The isolated signer signs the canonical fingerprint, broadcasts the transaction on Sepolia Testnet, and displays the verified receipt."*

---

### [2:00 - 3:15] Scene 3: Blocking Prohibited Attacks Fail-Closed
- **Visual:** In `/chat`, click *"Prohibited: Budget Breaker (180 USDC)"*. Show immediate `BLOCK (DAILY_BUDGET_EXCEEDED)` card before signing.
- **Visual:** Click *"Prohibited: Reserve Breach (350 USDC)"*. Show `BLOCK (RESERVE_BREACH)` card and Financial Twin explanation.
- **Visual:** Click *"Attack: Prompt Injection Bypass"*. Show injection flagged and neutralized.
- **Voiceover:** *"Now, let's see ActaBound defend against prohibited transactions. When asked to transfer 180 USDC, the policy engine blocks it immediately because remaining daily budget is only 150 USDC. Next, an attempt to transfer 350 USDC is blocked because it would breach our mandatory 200 USDC reserve. Finally, an adversarial prompt injection is instantly neutralized. No unauthorized transaction ever reaches the signer."*

---

### [3:15 - 4:15] Scene 4: Autonomous Attack Arena
- **Visual:** Navigate to `/arena`. Click *"Run All 18 Scenarios"*. Show tests executing and displaying 18/18 DEFENDED (100% pass rate).
- **Voiceover:** *"To prove our security controls are enforced in backend code rather than mocked in the UI, we built the Autonomous Attack Arena. This red-team lab runs 18 adversarial scenarios against our live engine—including TOCTOU calldata manipulation, stale oracle feeds, replay attacks, and concurrent budget races. All 18 attacks are successfully defended."*

---

### [4:15 - 5:00] Scene 5: Cryptographic Evidence Ledger & Conclusion
- **Visual:** Navigate to `/ledger`. Show chronological SHA-256 block hash chain. Click *"Verify Cryptographic Chain"*. Show green banner *"Tamper-Evident Chain Verified"*.
- **Voiceover:** *"Finally, every state transition is recorded in the Evidence Ledger—a cryptographic SHA-256 hash chain tying user prompts to policy checks, transaction fingerprints, and on-chain receipts. Clicking 'Verify Chain' confirms zero tampering. ActaBound delivers genuine autonomous agency bounded by verifiable mathematical security. Thank you."*
