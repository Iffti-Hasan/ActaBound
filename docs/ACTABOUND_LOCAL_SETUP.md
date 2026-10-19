# ActaBound: Local Setup & Troubleshooting Guide for Beginners

This guide explains how to start, configure, and troubleshoot **ActaBound** on a Windows computer using PowerShell, Node.js, and Docker Compose.

---

## 1. Quick Start in 4 Easy Steps

### Step 1: Open Windows PowerShell
1. Press the **Windows Key** on your keyboard.
2. Type **PowerShell** and click on **Windows PowerShell**.

### Step 2: Navigate to the Project Folder
Type this command and press Enter:
```powershell
cd D:\FinTechathon
```

### Step 3: Start the Development Server
Type this command and press Enter:
```powershell
npm run dev
```

### Step 4: Open in Your Web Browser
Wait until you see this output in your terminal:
```
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 1627ms
```
Once you see `✓ Ready`, open your browser (Chrome, Edge, Brave, or Firefox) and visit:  
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 2. How to Stop or Restart the Server

- **To Stop the Server:** Click inside your PowerShell terminal and press **`Ctrl + C`**. If asked `Terminate batch job (Y/N)?`, type **`Y`** and press Enter.
- **To Restart the Server:** Run `npm run dev` again.

---

## 3. Available npm Commands (From `package.json`)

Here are the exact commands supported by the project:

| Command | What It Does | When to Use It |
| :--- | :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot-reload. | Daily development and local dashboard testing. |
| `npm test` | Runs all 26 automated unit and security tests using Vitest. | Verifying policy engine, crypto, and attack arena integrity. |
| `npm run build` | Compiles the full production application and checks TypeScript types. | Verifying there are zero compilation or type errors. |
| `npm run start` | Starts the compiled production build on port 3000. | Testing production performance. |
| `npm run lint` | Runs the Next.js linter to check for code formatting errors. | Code quality checks. |
| `npm run prisma:generate` | Regenerates the Prisma database client from `prisma/schema.prisma`. | After modifying database models. |

---

## 4. Understanding Environment Configuration (`.env`)

ActaBound reads settings from a `.env` file in the `D:\FinTechathon` folder.

If `.env` is missing, create it by copying `.env.example`:
```powershell
Copy-Item .env.example .env
```

### Key Environment Variables Explained:
- `DEMO_MODE=true`  
  *Meaning:* Tells the application to run in self-contained simulation mode. The AI agent, policy engine, attack arena, and financial twin all function fully without requiring you to pay for external cloud AI tokens or real Ethereum gas!
- `DATA_ENCRYPTION_KEY_BASE64="ebqjd/FScSEeWr0YXuo5ReP5JlmbDHwyZD8S4UNDygM="`  
  *Meaning:* The 32-byte (256-bit) master encryption key used by the isolated signer enclave for AES-256-GCM.
- `EVM_CHAIN_ID=11155111`  
  *Meaning:* The official network identifier for the Ethereum Sepolia Testnet.
- `EVM_RPC_URL="https://rpc.sepolia.org"`  
  *Meaning:* The endpoint used to read blockchain balances and verify receipts.

---

## 5. Optional: Setting Up PostgreSQL with Docker Compose

ActaBound is engineered with an in-memory fallback so you can run the entire application out-of-the-box without Docker. However, if you want local persistent PostgreSQL storage:

1. Launch **Docker Desktop** on Windows.
2. Verify Docker is running:
   ```powershell
   docker ps
   ```
3. Start the PostgreSQL container:
   ```powershell
   docker compose up -d
   ```
4. Verify the container is running:
   ```powershell
   docker compose ps
   ```
   You will see `actabound-postgres` running on port `5432`.
5. To stop the database:
   ```powershell
   docker compose down
   ```

---

## 6. Distinguishing Frontend Success from AI & Blockchain Functionality

As a beginner, it is crucial to understand what is working when you open the page:
1. **Frontend Startup Success:** If `http://localhost:3000` loads in your browser, the Next.js web server and React components are working.
2. **Deterministic Policy Engine:** When you submit a prompt in `/chat`, the pure math engine evaluates rules locally on the server. This does **not** require an external OpenAI or Anthropic API key; it runs deterministically in TypeScript.
3. **Demo vs. Live Testnet Execution:**
   - In **Demo Mode** (`DEMO_MODE=true`), the system generates a mathematically deterministic transaction hash and verifies that all checks passed.
   - In **Live Testnet Mode**, you provide a funded Sepolia testnet private key (`DELEGATED_SIGNER_PRIVATE_KEY`), and the transaction is physically broadcast to the Sepolia blockchain.

---

## 7. Common Beginner Troubleshooting Tips

### Issue 1: `Port 3000 is already in use`
- **Cause:** Another process or previous instance of `npm run dev` is still running.
- **Fix:** In PowerShell, find and stop the process using port 3000:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
  ```
  Then run `npm run dev` again.

### Issue 2: `Cannot find module ...` or `npm command not recognized`
- **Cause:** Node.js dependencies were not installed.
- **Fix:** Run:
  ```powershell
  npm install
  ```

### Issue 3: Tests Fail or Report Stale Data
- **Fix:** Re-run the test suite directly:
  ```powershell
  npm test
  ```
