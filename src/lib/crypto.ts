import crypto from 'crypto';

/**
 * Key Management and Cryptography Utilities for ActaBound
 * Enforces AES-256-GCM authenticated encryption, SHA-256, and Keccak-256.
 */

const DEFAULT_DEV_KEY = 'ebqjd/FScSEeWr0YXuo5ReP5JlmbDHwyZD8S4UNDygM=';

/**
 * Retrieves the 32-byte encryption key from environment.
 * Reverts safely if key length is not exactly 32 bytes.
 */
export function getEncryptionKey(): Buffer {
  const base64Key = process.env.DATA_ENCRYPTION_KEY_BASE64 || DEFAULT_DEV_KEY;
  const key = Buffer.from(base64Key, 'base64');
  if (key.length !== 32) {
    throw new Error(`Invalid encryption key length: expected 32 bytes, got ${key.length}`);
  }
  return key;
}

export interface EncryptedPayload {
  ciphertext: string; // Base64
  iv: string;         // Base64 (12 bytes)
  tag: string;        // Base64 (16 bytes)
  version: number;
}

/**
 * Encrypts plaintext using AES-256-GCM with a fresh 12-byte IV per invocation.
 */
export function encryptData(plaintext: string, aad?: string): EncryptedPayload {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // Fresh 96-bit IV
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  if (aad) {
    cipher.setAAD(Buffer.from(aad, 'utf-8'));
  }

  let encrypted = cipher.update(plaintext, 'utf-8', 'base64');
  encrypted += cipher.final('base64');
  const tag = cipher.getAuthTag();

  return {
    ciphertext: encrypted,
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    version: 1,
  };
}

/**
 * Decrypts an AES-256-GCM payload.
 * Throws an error if ciphertext or authentication tag has been tampered with.
 */
export function decryptData(payload: EncryptedPayload, aad?: string): string {
  const key = getEncryptionKey();
  const iv = Buffer.from(payload.iv, 'base64');
  const tag = Buffer.from(payload.tag, 'base64');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  if (aad) {
    decipher.setAAD(Buffer.from(aad, 'utf-8'));
  }

  let decrypted = decipher.update(payload.ciphertext, 'base64', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

/**
 * Canonical JSON serialization to guarantee consistent SHA-256 hashing.
 */
export function canonicalJsonStringify(obj: unknown): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    return `[${obj.map(canonicalJsonStringify).join(',')}]`;
  }

  const keys = Object.keys(obj as Record<string, unknown>).sort();
  const parts = keys.map(
    (key) => `${JSON.stringify(key)}:${canonicalJsonStringify((obj as Record<string, unknown>)[key])}`
  );
  return `{${parts.join(',')}}`;
}

/**
 * Computes canonical SHA-256 digest of any payload.
 */
export function sha256Digest(data: unknown): string {
  const serialized = typeof data === 'string' ? data : canonicalJsonStringify(data);
  return crypto.createHash('sha256').update(serialized).digest('hex');
}

/**
 * Generate a cryptographically random correlation ID.
 */
export function generateCorrelationId(): string {
  return `acta_${crypto.randomBytes(8).toString('hex')}`;
}
