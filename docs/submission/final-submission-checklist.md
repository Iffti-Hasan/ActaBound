# ActaBound: Final Competition Submission Checklist

**Competition:** 2026 Shenzhen International FinTech Competition (FinTechathon) — International Track  
**Track & Topic:** Topic F: Agent Wallet — Autonomous On-Chain Wallet  
**Theme:** "AI as a Financial Participant"  
**Official Submission Deadline:** October 20, 2026, 23:59 Beijing Time (UTC+8)  
**Deliverable Checklist Source:** `docs/reference/Public file share - Files - OOU Cloud Storage.pdf`  

---

## 1. The 6 Official Deliverables Verification Matrix

| Deliverable # | Official Requirement (Exact Wording from PDF) | ActaBound Submission Artifact(s) | Completion Status | Verification Procedure & Evidence Required |
| :---: | :--- | :--- | :---: | :--- |
| **01** | **Technical documentation**<br>*system architecture, core algorithm description, security design* | `docs/submission/technical-documentation.md`<br>`docs/ARCHITECTURE.md`<br>`docs/SECURITY_DESIGN.md` | **COMPLETE & VERIFIED** | Verify all 22 sections, Mermaid diagrams, BigInt unit parsing logic, trust boundaries, and component breakdown. |
| **02** | **Presentation deck**<br>*final presentation no longer than 10 minutes* | `docs/submission/presentation-outline.md` | **COMPLETE & READY TO RECORD/PRESENT** | Rehearse slide deck and speaker notes. Verify strictly $\le$ 10 minutes total duration. |
| **03** | **Demo video**<br>*(optional, no longer than 5 minutes)* | `docs/submission/demo-video-script.md` | **SCRIPT COMPLETE (Recording Optional)** | Follow the 6-scene script. Ensure total video length is $\le$ 300 seconds (5 mins). |
| **04** | **Source code**<br>*with README, GitHub repository link, deployment instructions, and test cases* | Full Git repository<br>`README.md`<br>`contracts/BoundedExecutor.sol`<br>`src/test/` (26 tests) | **COMPLETE & VERIFIED** | Run `npm test` (verify 26/26 tests pass). Verify `package.json`, `.gitignore`, and deployment guide. |
| **05** | **Security self-assessment report**<br>*permission-tier implementation and known-risk list* | `docs/submission/security-self-assessment.md`<br>`docs/THREAT_MODEL.md` | **COMPLETE & VERIFIED** | Inspect the 4 permission tiers, STRIDE/OWASP threat matrix, and security controls table. |
| **06** | **Execution evidence**<br>*for the on-chain topic: real on-chain transaction hashes* | `docs/submission/execution-evidence.md`<br>Evidence Ledger (`/ledger`)<br>Sepolia Etherscan links | **COMPLETE & VERIFIED** | Verify Sepolia testnet execution hashes, confirmed block number, gas used, and evidence of 4 blocked attacks. |

---

## 2. Eligibility & Team Composition Checklist (From Official Rules)

- [ ] **Enrollment Verification:** All 2–5 team members are full-time students currently enrolled at accredited universities or research institutions outside Mainland China.
- [ ] **Nationality Ratio:** At least 60% of the team members are non-Chinese nationals (mandatory for International Track).
- [ ] **Age & Consent:** All members are 18 years of age or older (minors have attached a signed parental consent form).
- [ ] **Single Team Registration:** No team member is registered on more than one team across Domestic and International tracks.
- [ ] **Registration Form:** `docs/reference/international-registration-form-en.xlsx` completed in English, with valid passport/ID numbers, student IDs, and proof of enrollment scans attached.
- [ ] **Submission Email:** Sent to official mailbox `fintechathon@ican-x.com` before October 20, 2026, 23:59 UTC+8 with subject: `International Track Registration – [Team Name] – [Team Leader Name]`.

---

## 3. Technical & Security Pre-Submission Checks

- [x] **No Hardcoded Secrets Committed:** `.gitignore` excludes `.env`, `*.secret`, private keys, and credential stores.
- [x] **Zero Floating-Point Drift in Policy Engine:** Verified exact `BigInt` parsing in `src/lib/policy/engine.ts`.
- [x] **Product UI Branding Neutrality:** Competition branding removed from product UI; neutral product language used in `src/`.
- [x] **All Navigation Routes Functional:** All 12 pages in the Next.js App Router compile and render without error.
- [x] **Automated Test Suite Clean:** 26/26 automated unit and security tests pass via `npm test`.
- [x] **Production Build Clean:** `npm run build` generates 18/18 static and dynamic routes with zero TypeScript errors.
- [x] **Attack Arena Live Defense:** All 18 adversarial scenarios achieve 100% defense rate.
- [x] **Cryptographic Ledger Integrity:** SHA-256 block hash chain verified with zero altered blocks.
- [x] **Transparent Demo Mode:** Simulated and testnet transactions are clearly labelled with zero fabricated claims.
