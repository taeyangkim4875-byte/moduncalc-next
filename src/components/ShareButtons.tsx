'use client';

import { useState, useCallback } from 'react';

interface ShareButtonsProps {
  title: string;
  resultId?: string;
}

export default function ShareButtons({ title, resultId = 'calc-result' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const saveImage = useCallback(async () => {
    const el = document.getElementById(resultId);
    if (!el) return;
    setSaving(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const watermark = document.createElement('div');
      watermark.style.cssText = 'text-align:center;padding:12px 0 8px;font-size:11px;color:#8B95A1;font-weight:600;';
      watermark.textContent = 'moduncalc.com · 모든 계산기';
      el.appendChild(watermark);
      const canvas = await html2canvas(el, { backgroundColor: '#F2F4F6', scale: 2, useCORS: true, logging: false });
      el.removeChild(watermark);
      const link = document.createElement('a');
      link.download = `모든계산기_${title.replace(/[^가-힣a-zA-Z0-9]/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      alert('이미지 저장에 실패했습니다.');
    }
    setSaving(false);
  }, [resultId, title]);

  return (
    <div className="flex gap-2 mt-3 mb-2">
      <button onClick={copyLink} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] bg-white text-[13px] font-bold text-[var(--ink)] cursor-pointer transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[.97]">
        {copied ? '✓ 복사됨' : '🔗 링크 복사'}
      </button>
      <button onClick={saveImage} disabled={saving} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] bg-white text-[13px] font-bold text-[var(--ink)] cursor-pointer transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[.97] disabled:opacity-50">
        {saving ? '저장 중...' : '📷 이미지 저장'}
      </button>
    </div>
  );
}
