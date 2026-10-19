import { createPublicClient, createWalletClient, http, formatEther, parseEther } from 'viem';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import fs from 'fs';
import path from 'path';

// Native .env parser
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const RPC_URL = process.env.EVM_RPC_URL || 'https://ethereum-sepolia.publicnode.com';
const EXPLORER_URL = process.env.EXPLORER_BASE_URL || 'https://sepolia.etherscan.io';
const RECIPIENT = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

async function main() {
  console.log('\n======================================================');
  console.log('   ActaBound: Sepolia Testnet Live Broadcast Runner   ');
  console.log('======================================================\n');

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(RPC_URL),
  });

  try {
    const blockNum = await publicClient.getBlockNumber();
    console.log(`[+] Connected to Sepolia Testnet (Chain ID: 11155111)`);
    console.log(`[+] Latest Sepolia Block: #${blockNum}`);
  } catch (err) {
    console.error(`[-] Failed to connect to Sepolia RPC at ${RPC_URL}:`, err.message);
    process.exit(1);
  }

  let privateKey = process.env.DELEGATED_SIGNER_PRIVATE_KEY?.trim();

  if (!privateKey || privateKey.length < 64) {
    console.log('\n[!] No funded DELEGATED_SIGNER_PRIVATE_KEY found in .env.');
    console.log('[*] Generating a designated delegated signer address for your agent:\n');

    const newKey = generatePrivateKey();
    const tempAccount = privateKeyToAccount(newKey);

    console.log(`    Agent Delegated Address: ${tempAccount.address}`);
    console.log(`    Generated Private Key:   ${newKey}`);
    console.log('\n------------------------------------------------------');
    console.log('HOW TO GET FREE SEPOLIA TESTNET ETH:');
    console.log('1. Copy the Agent Delegated Address above.');
    console.log('2. Request free Sepolia testnet ETH from any faucet:');
    console.log('   - Google Cloud Web3: https://cloud.google.com/application/web3/faucet/ethereum/sepolia');
    console.log('   - Alchemy Faucet:    https://www.alchemy.com/faucets/ethereum-sepolia');
    console.log('   - Sepolia PoW:       https://sepolia-faucet.pk910.de');
    console.log('3. Add the private key to your .env file:');
    console.log(`   DELEGATED_SIGNER_PRIVATE_KEY="${newKey}"`);
    console.log('   DEMO_MODE=false');
    console.log('4. Re-run: node scripts/broadcast-sepolia.mjs');
    console.log('------------------------------------------------------\n');
    return;
  }

  if (!privateKey.startsWith('0x')) {
    privateKey = `0x${privateKey}`;
  }

  const account = privateKeyToAccount(privateKey);
  console.log(`[+] Authorized Delegated Signer Address: ${account.address}`);

  const balance = await publicClient.getBalance({ address: account.address });
  const ethBalance = formatEther(balance);
  console.log(`[+] Current Sepolia Balance: ${ethBalance} ETH`);

  if (balance < parseEther('0.0001')) {
    console.log(`\n[-] Insufficient Sepolia balance to broadcast on-chain transaction.`);
    console.log(`    Required: >= 0.0001 ETH. Current: ${ethBalance} ETH.`);
    console.log(`    Please fund address: ${account.address} via a Sepolia faucet.\n`);
    return;
  }

  console.log('\n[*] Initiating mandate-governed permitted transaction broadcast...');
  console.log(`    Recipient: ${RECIPIENT}`);
  console.log(`    Amount:    0.00001 ETH`);

  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(RPC_URL),
  });

  const txHash = await walletClient.sendTransaction({
    to: RECIPIENT,
    value: parseEther('0.00001'),
  });

  console.log(`[+] Transaction submitted to mempool! Tx Hash: ${txHash}`);
  console.log(`[*] Awaiting on-chain block confirmation...`);

  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
    timeout: 60_000,
  });

  console.log('\n======================================================');
  console.log('          TRANSACTION CONFIRMED ON SEPOLIA!           ');
  console.log('======================================================');
  console.log(`Status:        ${receipt.status === 'success' ? 'SUCCESS (Confirmed)' : 'REVERTED'}`);
  console.log(`Block Number:  #${receipt.blockNumber}`);
  console.log(`Gas Used:      ${receipt.gasUsed.toString()} units`);
  console.log(`Tx Hash:       ${txHash}`);
  console.log(`Etherscan URL: ${EXPLORER_URL}/tx/${txHash}`);
  console.log('======================================================\n');
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
