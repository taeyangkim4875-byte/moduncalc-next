'use client';

import { useState, useCallback, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function generatePassword(length: number, upper: boolean, lower: boolean, digits: boolean, special: boolean): string {
  let chars = '';
  if (upper) chars += UPPER;
  if (lower) chars += LOWER;
  if (digits) chars += DIGITS;
  if (special) chars += SPECIAL;
  if (!chars) chars = LOWER;
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => chars[v % chars.length]).join('');
}

function getStrength(pw: string): { label: string; color: string; score: number } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: '약함', color: '#E5484D', score: 1 };
  if (score <= 4) return { label: '보통', color: '#F59E0B', score: 2 };
  if (score <= 5) return { label: '강함', color: '#10B981', score: 3 };
  return { label: '매우 강함', color: '#059669', score: 4 };
}

export default function PasswordGen() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [special, setSpecial] = useState(true);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generatePassword(length, upper, lower, digits, special));
    }
    setPasswords(list);
    setCopied(null);
  }, [length, upper, lower, digits, special, count]);

  useEffect(() => { generate(); }, [generate]);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const strength = passwords.length > 0 ? getStrength(passwords[0]) : { label: '-', color: '#8B95A1', score: 0 };

  return (
    <>
      {/* 생성된 비밀번호 */}
      <Card className="!p-5">
        <div className="flex flex-col gap-2">
          {passwords.map((pw, i) => (
            <div key={i} className="flex items-center gap-2 bg-[var(--bg)] rounded-xl p-3">
              <div className="flex-1 font-mono text-[15px] font-bold text-[var(--ink)] break-all leading-relaxed select-all">
                {pw}
              </div>
              <button
                onClick={() => copyToClipboard(pw, i)}
                className="flex-none px-3 py-1.5 bg-[var(--primary)] text-white text-xs font-bold rounded-lg border-0 cursor-pointer hover:bg-[var(--primary-dark)] transition-colors"
              >
                {copied === i ? '복사됨!' : '복사'}
              </button>
            </div>
          ))}
        </div>

        {/* 강도 표시 */}
        {passwords.length > 0 && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-[var(--sub)]">비밀번호 강도</span>
              <span className="text-xs font-extrabold" style={{ color: strength.color }}>{strength.label}</span>
            </div>
            <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="flex-1 h-full rounded-full transition-all"
                  style={{ backgroundColor: strength.score >= level ? strength.color : 'var(--bg)' }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button onClick={generate} className="flex-1 py-2.5 bg-[var(--primary)] text-white text-sm font-bold rounded-xl border-0 cursor-pointer hover:bg-[var(--primary-dark)] transition-colors">
            새로 생성
          </button>
        </div>
      </Card>

      {/* 옵션 설정 */}
      <Card>
        <SectionTitle num="1">옵션 설정</SectionTitle>

        <div className="flex flex-col gap-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-[var(--ink)]">비밀번호 길이</label>
              <span className="text-sm font-extrabold text-[var(--primary-dark)] tabular-nums">{length}자</span>
            </div>
            <input
              type="range"
              min={8}
              max={64}
              value={length}
              onChange={(e) => setLength(+e.target.value)}
              className="w-full accent-[var(--primary)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--sub)]">
              <span>8</span><span>64</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: '대문자 (A-Z)', value: upper, set: setUpper },
              { label: '소문자 (a-z)', value: lower, set: setLower },
              { label: '숫자 (0-9)', value: digits, set: setDigits },
              { label: '특수문자 (!@#)', value: special, set: setSpecial },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => opt.set(!opt.value)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${opt.value ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div>
            <label className="text-sm font-bold text-[var(--ink)] mb-1 block">한번에 생성할 개수</label>
            <div className="flex gap-2">
              {[1, 3, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${count === n ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
                >
                  {n}개
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">안전한 비밀번호 가이드</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>안전한 비밀번호 기준:</b> 최소 12자 이상, 대소문자 + 숫자 + 특수문자 조합이 권장됩니다. 16자 이상이면 현재 기술로 브루트포스 공격을 통한 해독이 사실상 불가능합니다. 생년월일, 전화번호, &apos;password123&apos; 같은 예측 가능한 비밀번호는 피하세요.</p>
          <p><b>해킹 위험:</b> 8자리 숫자 비밀번호는 즉시 해독됩니다. 8자 소문자 비밀번호도 수초 내 크래킹이 가능합니다. 반면 12자 이상 복합 비밀번호는 수백 년 이상의 해독 시간이 소요됩니다. 데이터 유출 시 같은 비밀번호를 쓰는 모든 계정이 위험해지므로 사이트마다 다른 비밀번호를 사용하세요.</p>
          <p><b>비밀번호 관리 팁:</b> 비밀번호 관리자(1Password, Bitwarden 등)를 사용하면 사이트별로 고유한 강력한 비밀번호를 쉽게 관리할 수 있습니다. 마스터 비밀번호 하나만 기억하면 됩니다. 2단계 인증(2FA)도 반드시 활성화하세요. OTP 앱(Google Authenticator, Authy)이 SMS보다 안전합니다.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 안전한 비밀번호 길이는 최소 몇 자인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 최소 12자 이상이 권장됩니다. 16자 이상이면 브루트포스 공격에 대한 안전성이 크게 높아집니다. 대소문자, 숫자, 특수문자를 모두 포함하는 것이 중요합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 비밀번호를 사이트마다 다르게 써야 하나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 반드시 다르게 사용해야 합니다. 하나의 사이트가 해킹되면 같은 비밀번호를 쓰는 다른 모든 계정이 위험해집니다. 비밀번호 관리자를 사용하면 편리합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 생성된 비밀번호는 안전한가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 이 생성기는 브라우저의 crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 생성합니다. 비밀번호는 서버로 전송되지 않으며 브라우저에서만 처리됩니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          비밀번호는 브라우저에서 생성되며 서버로 전송되지 않습니다. crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 생성합니다.
        </div>
      </footer>
    </>
  );
}
