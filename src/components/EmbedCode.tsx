'use client';

import { useState } from 'react';
import { trackEmbedCopy } from '@/utils/analytics';

const SLUG_MAP: Record<string, string> = {
  '/loan': 'loan',
  '/salary': 'salary',
  '/health/bmi': 'bmi',
  '/health/bmr': 'bmr',
  '/health/bodyfat': 'bodyfat',
  '/pension/nps': 'pension-nps',
  '/pension/jobless': 'pension-jobless',
  '/realestate/acqtax': 'acqtax',
  '/realestate/commission': 'commission',
  '/realestate/convert': 'convert',
  '/tax/income': 'tax-income',
};

export default function EmbedCode({ href }: { href: string }) {
  const [copied, setCopied] = useState(false);
  const slug = SLUG_MAP[href];
  if (!slug) return null;

  const code = `<iframe src="https://moduncalc.com/embed/${slug}" width="100%" height="700" frameborder="0" style="border:none;max-width:560px;border-radius:12px;"></iframe>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const input = document.createElement('textarea');
      input.value = code;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    trackEmbedCopy(slug);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <details className="mt-4 bg-[#F8FAFC] border border-[var(--line)] rounded-xl overflow-hidden">
      <summary className="px-4 py-3 text-sm font-bold cursor-pointer text-[var(--sub)] hover:text-[var(--ink)]">
        📌 내 블로그에 넣기
      </summary>
      <div className="px-4 pb-4">
        <p className="text-xs text-[var(--sub)] mb-2">아래 코드를 블로그 HTML에 붙여넣으세요.</p>
        <pre className="bg-[#191F28] text-[#E8EBED] text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">{code}</pre>
        <button
          onClick={copy}
          className="mt-2 w-full py-2 rounded-lg border-[1.5px] border-[var(--line)] bg-white text-[13px] font-bold cursor-pointer hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
        >
          {copied ? '✓ 복사됨' : '코드 복사'}
        </button>
      </div>
    </details>
  );
}
