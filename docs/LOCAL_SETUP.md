# ActaBound Local Development & Testing Guide

This guide walks you through setting up, running, and testing **ActaBound** on Windows using PowerShell, Docker Compose, PostgreSQL, and Node.js.

---

## 1. Prerequisites Check

Verify your installed tools in PowerShell:

```powershell
node --version       # Expected: v20+ or v24+
npm --version        # Expected: v10+ or v11+
docker --version     # Expected: Docker 24+
docker compose version
```

> **Note on Docker Desktop for Windows:**  
> If Docker Desktop is not running, launch it from the Start Menu or run:
> ```powershell
> Start-Process "C:\Users\iffti\AppData\Local\Programs\DockerDesktop\Docker Desktop.exe"
> ```
> Wait until the whale icon in the Windows taskbar indicates Docker Desktop is running.

---

## 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```
2. The default `.env` is already configured for local Docker PostgreSQL:
   - `DATABASE_URL="postgresql://acta:actabound_secret@localhost:5432/actabound_db?schema=public"`
   - `DATA_ENCRYPTION_KEY_BASE64` has been generated with a cryptographically secure 32-byte key for AES-256-GCM.
   - `DEMO_MODE=true` allows full interactive exploration without external API keys or testnet gas.

---

## 3. Starting PostgreSQL with Docker Compose

1. Start the PostgreSQL service in detached mode:
   ```powershell
   docker compose up -d
   ```
2. Verify container health:
   ```powershell
   docker ps
   ```
   You should see `actabound-postgres` running with `(healthy)` status on port `5432`.

3. Apply Prisma migrations and seed initial demo data:
   ```powershell
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```

---

## 4. Running the Application

To start the Next.js development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 5. Running the Test Suites

ActaBound includes comprehensive unit, policy engine, financial twin, attack scenario, and cryptographic tests:

```powershell
# Run all automated tests
npm test

# Run tests with live watch mode
npm run test:watch
```

---

## 6. Testing Key Features & Workflows

### A. AI Command Center (`/chat`)
- **Permitted Transfer Prompt:**  
  `Transfer 50 USDC to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
  - *Expected result:* Policy engine checks active mandate, validates daily budget and reserve, approves, displays Financial Twin before/after snapshot, and executes.
- **Prohibited Budget Breaker Prompt:**  
  `Transfer 350 USDC to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
  - *Expected result:* Blocked immediately before signing with code `BUDGET_EXCEEDED`.
- **Prohibited Reserve Breach Prompt:**  
  `Transfer 450 USDC`
  - *Expected result:* Blocked with code `RESERVE_BREACH` preserving the mandatory 200 USDC reserve.

### B. Autonomous Attack Arena (`/arena`)
- Navigate to `/arena` to run any of the 18 adversarial attack scenarios against the live policy engine.
- Inspect the enforcement component, policy decision, reason codes, and tamper-evident audit record.

### C. Financial Twin (`/twin`)
- Compare simulated balance sheets before and after proposed transactions.
- Inspect projected slippage, price impact, and daily budget consumption.

### D. Evidence Ledger (`/ledger`)
- View the hash-linked audit chain.
- Click **"Verify Cryptographic Chain"** to confirm zero tampering across all stored state transitions.

---

## 7. Stopping and Resetting Services

- **Stop PostgreSQL:**
  ```powershell
  docker compose down
  ```
- **Reset Database (Clears all volumes & re-migrates):**
  ```powershell
  docker compose down -v
  docker compose up -d
  npx prisma migrate dev --name init
  npm run prisma:seed
  ```
