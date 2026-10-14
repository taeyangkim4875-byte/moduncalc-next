'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackShareClick } from '@/utils/analytics';
import { isEnPath } from '@/utils/locale';

interface ShareButtonsProps {
  title: string;
  resultId?: string;
}

export default function ShareButtons({ title, resultId = 'calc-result' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const isEn = isEnPath(usePathname());

  const getShareUrl = useCallback(() => window.location.href, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
    } catch {
      const input = document.createElement('input');
      input.value = getShareUrl();
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    trackShareClick('copy_link', title);
    setTimeout(() => setCopied(false), 2000);
  }, [getShareUrl, title]);

  const nativeShare = useCallback(async () => {
    try {
      trackShareClick('native_share', title);
      await navigator.share({
        title: isEn ? `${title} | moduncalc` : `${title} | 모든 계산기`,
        url: getShareUrl(),
      });
    } catch {
      /* user cancelled or not supported */
    }
  }, [title, getShareUrl, isEn]);

  const saveImage = useCallback(async () => {
    const el = document.getElementById(resultId);
    if (!el) return;
    setSaving(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const watermark = document.createElement('div');
      watermark.style.cssText = 'text-align:center;padding:12px 0 8px;font-size:11px;color:#8B95A1;font-weight:600;';
      watermark.textContent = isEn ? 'moduncalc.com' : 'moduncalc.com · 모든 계산기';
      el.appendChild(watermark);
      const canvas = await html2canvas(el, { backgroundColor: '#F2F4F6', scale: 2, useCORS: true, logging: false });
      el.removeChild(watermark);
      const link = document.createElement('a');
      const slug = title.replace(/[^가-힣a-zA-Z0-9]/g, '_');
      link.download = isEn ? `moduncalc_${slug}.png` : `모든계산기_${slug}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      trackShareClick('save_image', title);
    } catch {
      alert(isEn ? 'Could not save the image.' : '이미지 저장에 실패했습니다.');
    }
    setSaving(false);
  }, [resultId, title, isEn]);

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="flex gap-2 mt-3 mb-2">
      <button onClick={copyLink} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] bg-white text-[13px] font-bold text-[var(--ink)] cursor-pointer transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[.97]">
        {copied ? (isEn ? '✓ Copied' : '✓ 복사됨') : isEn ? '🔗 Copy link' : '🔗 링크 복사'}
      </button>
      <button onClick={saveImage} disabled={saving} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] bg-white text-[13px] font-bold text-[var(--ink)] cursor-pointer transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[.97] disabled:opacity-50">
        {saving ? (isEn ? 'Saving…' : '저장 중...') : isEn ? '📷 Save image' : '📷 이미지 저장'}
      </button>
      {hasNativeShare && (
        <button onClick={nativeShare} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] bg-white text-[13px] font-bold text-[var(--ink)] cursor-pointer transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[.97]">
          {isEn ? '📤 Share' : '📤 공유'}
        </button>
      )}
    </div>
  );
}
