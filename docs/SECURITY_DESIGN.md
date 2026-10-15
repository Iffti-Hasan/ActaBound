# ActaBound Security Design Specification

## 1. Cryptographic Security Standards

ActaBound enforces industry-standard cryptography across data storage, network transport, execution authorization, and audit trails.

---

## 2. Cryptographic Controls

### 2.1 AES-256-GCM (Authenticated Encryption at Rest)
- **Role:** Securing delegated private keys, RPC secrets, and sensitive credentials in local storage or database columns.
- **Specification:**
  - Algorithm: AES-256-GCM (Galois/Counter Mode).
  - Key Length: 256 bits (32 bytes), passed via `DATA_ENCRYPTION_KEY_BASE64`.
  - Initialization Vector (IV): Fresh, cryptographically secure 96-bit (12-byte) random IV per encryption operation generated via `crypto.randomBytes(12)`.
  - Authentication Tag: 128-bit (16-byte) authentication tag validated upon decryption to detect tampering.
  - Additional Authenticated Data (AAD): Account ID and mandate version bound to ciphertext.
  - Failure Mode: Decryption fails closed if authentication tag or ciphertext is tampered with.

### 2.2 SHA-256 & Keccak-256 (Canonical Integrity Digests)
- **Application Digests (SHA-256):**
  - Used for Evidence Ledger block hash chains, state checkpoints, and canonical transaction plan fingerprints.
- **EVM Digests (Keccak-256):**
  - Used for smart-contract function selectors, ABI calldata verification, and EIP-712 typed structured data hashes.

### 2.3 Secp256k1 & EIP-712 Signatures (Execution Authorization)
- Standard EVM elliptic curve cryptography (`secp256k1`).
- Domain-separated EIP-712 signatures enforce chain ID, verifying contract address, and replay nonce.
- The isolated signing adapter signs transactions only when verified against an approved policy engine permit.

### 2.4 Transport Layer Security (TLS 1.3)
- Production deployments strictly mandate HTTPS with TLS 1.3.
- HSTS (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`).

---

## 3. Policy Engine Enforcement & BigInt Arithmetic

### 3.1 Strict BigInt Arithmetic
To prevent IEEE 754 floating-point inaccuracies from compromising financial limits:
- All token amounts, balances, reserves, and budget caps are parsed into integer units (e.g., $10^{18}$ for wei or $10^6$ for USDC units) using native `bigint`.
- Percentage evaluations (e.g. slippage, reserve ratios) use basis points ($1 \text{ bps} = 0.01\%$) with floor/ceil arithmetic:
  $$\text{MaxSlippageAmount} = \frac{\text{Amount} \times \text{SlippageBps}}{10000\text{n}}$$

### 3.2 Fail-Closed Principle
If any dependent input is missing, stale, or ambiguous:
- Policy engine returns `BLOCK`.
- Signing adapter refuses to construct signatures.
- Risk controller elevates state to `CAUTION` or `PAUSED`.

---

## 4. Key Isolation Architecture

```
+--------------------------------------------------------------+
|                     LLM Application Layer                    |
|  - Interprets user instructions into structured JSON plan    |
|  - ZERO access to signing keys, memory dumps, or env secrets |
+--------------------------------------------------------------+
                              |
                     (Structured Plan Only)
                              v
+--------------------------------------------------------------+
|                 Deterministic Policy Engine                  |
|  - Evaluates limits, reserve, budget, allowlists             |
|  - Emits cryptographically signed Policy Permit              |
+--------------------------------------------------------------+
                              |
                    (Permit + Fingerprint)
                              v
+--------------------------------------------------------------+
|             Isolated Signing Enclave (Adapter)               |
|  - Decrypts key using AES-256-GCM                            |
|  - Verifies Permit digest against canonical fingerprint      |
|  - Signs transaction without exposing key to parent context  |
+--------------------------------------------------------------+
```

Private keys never enter LLM prompt contexts, logs, or client-side bundles.
