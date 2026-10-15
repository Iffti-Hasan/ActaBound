import { describe, it, expect } from 'vitest';
import { encryptData, decryptData, sha256Digest, canonicalJsonStringify } from '../lib/crypto';

describe('Cryptographic Isolation and Integrity', () => {
  it('encrypts and decrypts sensitive data using AES-256-GCM', () => {
    const secret = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const encrypted = encryptData(secret, 'account-1');

    expect(encrypted.ciphertext).toBeDefined();
    expect(encrypted.iv).toBeDefined();
    expect(encrypted.tag).toBeDefined();

    const decrypted = decryptData(encrypted, 'account-1');
    expect(decrypted).toBe(secret);
  });

  it('fails decryption if ciphertext has been tampered with', () => {
    const secret = 'private_signing_key_payload';
    const encrypted = encryptData(secret);

    // Tamper with ciphertext
    const tamperedPayload = {
      ...encrypted,
      ciphertext: encrypted.ciphertext.slice(0, -4) + 'AAAA',
    };

    expect(() => decryptData(tamperedPayload)).toThrow();
  });

  it('fails decryption if AAD does not match', () => {
    const secret = 'sensitive_mandate_secret';
    const encrypted = encryptData(secret, 'version-1');

    expect(() => decryptData(encrypted, 'version-2')).toThrow();
  });

  it('generates identical canonical hash regardless of JSON key ordering', () => {
    const objA = { z: 1, a: 'hello', m: { b: 2, a: 1 } };
    const objB = { a: 'hello', m: { a: 1, b: 2 }, z: 1 };

    expect(canonicalJsonStringify(objA)).toBe(canonicalJsonStringify(objB));
    expect(sha256Digest(objA)).toBe(sha256Digest(objB));
  });
});
