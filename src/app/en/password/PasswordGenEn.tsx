'use client';

import { useState, useCallback } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function PasswordGenEn() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generate = useCallback(() => {
    let chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    const len = length || 8;
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    const pw = Array.from(arr, v => chars[v % chars.length]).join('');
    setPassword(pw);
    setHistory(prev => [pw, ...prev].slice(0, 5));
    setCopied(false);
  }, [length, upper, lower, numbers, symbols]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback not needed for modern browsers */ }
  };

  // Password strength
  const getStrength = (pw: string) => {
    if (!pw) return { label: '-', color: 'text-[var(--sub)]', score: 0 };
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (pw.length >= 16) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 2) return { label: 'Weak', color: 'text-red-500', score };
    if (score <= 4) return { label: 'Fair', color: 'text-orange-500', score };
    if (score <= 5) return { label: 'Strong', color: 'text-blue-500', score };
    return { label: 'Very Strong', color: 'text-green-600', score };
  };

  const strength = getStrength(password);

  // Entropy calculation
  let poolSize = 0;
  if (upper) poolSize += 26;
  if (lower) poolSize += 26;
  if (numbers) poolSize += 10;
  if (symbols) poolSize += 27;
  if (poolSize === 0) poolSize = 26;
  const entropy = Math.round((length || 0) * Math.log2(poolSize));

  const inputClass = "w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center";

  return (
    <>
      <Card>
        <SectionTitle num="1">Settings</SectionTitle>
        <div className="mb-4">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Length: {length}</label>
          <input type="range" min={4} max={64} value={length} onChange={e => setLength(+e.target.value || 8)} className="w-full accent-[var(--primary)]" />
          <div className="flex justify-between text-[10px] text-[var(--sub)]"><span>4</span><span>64</span></div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Uppercase (A-Z)', checked: upper, set: setUpper },
            { label: 'Lowercase (a-z)', checked: lower, set: setLower },
            { label: 'Numbers (0-9)', checked: numbers, set: setNumbers },
            { label: 'Symbols (!@#$)', checked: symbols, set: setSymbols },
          ].map(opt => (
            <button key={opt.label} onClick={() => opt.set(!opt.checked)} className={`py-2.5 px-3 rounded-xl text-xs font-bold border-[1.5px] transition-colors ${opt.checked ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>
              {opt.checked ? '✓ ' : ''}{opt.label}
            </button>
          ))}
        </div>
        <button onClick={generate} className="w-full py-3 rounded-xl text-base font-bold bg-[var(--primary)] text-white hover:opacity-90 transition-opacity">
          Generate Password
        </button>
      </Card>

      {password && (
        <Card className="!p-6">
          <SectionTitle num="2">Your Password</SectionTitle>
          <div className="bg-[var(--bg)] rounded-xl p-4 mb-3">
            <div className="text-center font-mono text-lg font-bold break-all leading-relaxed">{password}</div>
          </div>
          <div className="flex gap-2 mb-3">
            <button onClick={() => copyToClipboard(password)} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${copied ? 'bg-green-500 text-white border-green-500' : 'border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-weak)]'}`}>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button onClick={generate} className="py-2.5 px-4 rounded-xl text-sm font-bold border-[1.5px] border-[var(--line)] text-[var(--sub)] hover:border-[var(--primary)]">
              Refresh
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Strength</div>
              <div className={`text-lg font-extrabold ${strength.color}`}>{strength.label}</div>
            </div>
            <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Entropy</div>
              <div className="text-lg font-extrabold text-[var(--primary-dark)]">{entropy} bits</div>
            </div>
          </div>
        </Card>
      )}

      {history.length > 0 && (
        <Card>
          <SectionTitle num="3">Recent Passwords</SectionTitle>
          <div className="flex flex-col gap-1.5">
            {history.map((pw, i) => (
              <div key={i} className="flex items-center justify-between bg-[var(--bg)] rounded-lg px-3 py-2">
                <span className="font-mono text-xs truncate flex-1 mr-2">{pw}</span>
                <button onClick={() => copyToClipboard(pw)} className="text-xs font-bold text-[var(--primary)] hover:underline flex-none">Copy</button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Password Security Guide</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Why random passwords matter:</b> Most data breaches occur because of weak or reused passwords. A randomly generated password with sufficient length and character variety is practically impossible to guess or crack through brute force. Never use personal information (birthdays, names, pet names) in passwords.</p>
          <p><b>Password entropy explained:</b> Entropy measures password randomness in bits. A password with 40 bits of entropy has 2^40 (about 1 trillion) possible combinations. For good security, aim for at least 60 bits. Each additional character type (uppercase, numbers, symbols) and length increase entropy significantly.</p>
          <p><b>Use a password manager:</b> With unique passwords for every account, you need a reliable way to store them. Password managers like Bitwarden (free, open-source), 1Password, or KeePass encrypt and store all your passwords securely. You only need to remember one master password.</p>
          <p><b>Enable two-factor authentication (2FA):</b> Even the strongest password can be compromised through phishing or data breaches. Always enable 2FA where available. Hardware keys (YubiKey) or authenticator apps (Google Authenticator, Authy) are more secure than SMS codes.</p>
          <p><b>How long to crack?</b> A 8-character password with only lowercase letters can be cracked in seconds. Add uppercase, numbers, and symbols, and it takes hours. At 12 characters with all types, it takes centuries. At 16+ characters, it is practically uncrackable with current technology.</p>
        </div>
      </Card>
    </>
  );
}
