'use client';

import { useState, useMemo, useCallback } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import {
  buildSettlementLetter,
  ROLE_LABELS,
  type MoveOutSettlementResult,
  type SettlementRole,
} from '@/utils/moveOutSettlement';

/**
 * 정산 요청서 생성.
 *
 * PDF 는 라이브러리 대신 window.print() + 인쇄 전용 CSS 를 쓴다.
 * jsPDF 계열은 한글을 쓰려면 폰트를 직접 임베드해야 하는데
 * Pretendard 한 벌이 2.6MB 라, 이사 당일 휴대폰에서 여는 페이지에 싣기엔 과하다.
 * iOS·Android 모두 인쇄 대화상자에서 "PDF로 저장"을 기본 제공한다.
 *
 * 이름·주소는 입력받되 어디에도 저장하지 않고 공유 링크에도 넣지 않는다.
 */

interface Props {
  result: MoveOutSettlementResult;
  role: SettlementRole;
}

export default function SettlementLetter({ result, role }: Props) {
  const isTenant = role === 'tenant';
  const [address, setAddress] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [landlordName, setLandlordName] = useState('');
  const [account, setAccount] = useState('');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const letter = useMemo(
    () => buildSettlementLetter(result, { address, tenantName, landlordName, account }, role),
    [address, tenantName, landlordName, account, result, role],
  );

  const copyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(letter);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = letter;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [letter]);

  const saveImage = useCallback(async () => {
    const el = document.getElementById('settlement-letter');
    if (!el) return;
    setSaving(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const mark = document.createElement('div');
      mark.style.cssText =
        'text-align:center;padding:12px 0 4px;font-size:11px;color:#8B95A1;font-weight:600;';
      mark.textContent = 'moduncalc.com · 모든 계산기';
      el.appendChild(mark);
      const canvas = await html2canvas(el, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      el.removeChild(mark);
      const link = document.createElement('a');
      link.download = isTenant ? '이사정산요청서.png' : '퇴실정산내역서.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      alert('이미지 저장에 실패했습니다.');
    }
    setSaving(false);
  }, [isTenant]);

  const printLetter = useCallback(() => window.print(), []);

  return (
    <Card>
      <SectionTitle num="5">{ROLE_LABELS[role].documentTitle}</SectionTitle>
      <p className="text-sm text-[var(--sub)] leading-relaxed mb-4">
        {isTenant
          ? '집주인이나 중개사에게 보낼 문구를 만들어 드려요.'
          : '세입자에게 보낼 정산 내역 문구를 만들어 드려요.'}{' '}
        이름과 주소는 넣지 않아도 되고, 어디에도 저장되지 않습니다.
      </p>

      <div className="print:hidden">
        <div className="mb-3">
          <label className="block text-sm font-bold mb-2">대상 주택 (선택)</label>
          <input
            type="text"
            value={address}
            placeholder="○○시 ○○구 ○○아파트 101동 1001호"
            onChange={e => setAddress(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl border border-[var(--line)] text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tenantName}
            placeholder="임차인 이름 (선택)"
            onChange={e => setTenantName(e.target.value)}
            className="flex-1 min-w-0 px-3.5 py-3 rounded-xl border border-[var(--line)] text-sm outline-none focus:border-[var(--primary)]"
          />
          <input
            type="text"
            value={landlordName}
            placeholder="임대인 이름 (선택)"
            onChange={e => setLandlordName(e.target.value)}
            className="flex-1 min-w-0 px-3.5 py-3 rounded-xl border border-[var(--line)] text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
        {isTenant && !result.tenantOwes && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">입금 계좌 (선택)</label>
            <input
              type="text"
              value={account}
              placeholder="○○은행 000-0000-0000 예금주"
              onChange={e => setAccount(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-[var(--line)] text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
        )}
      </div>

      {/* 인쇄·이미지 저장 대상 */}
      <div
        id="settlement-letter"
        className="bg-white border border-[var(--line)] rounded-xl p-4 print:border-0 print:p-0"
      >
        <pre className="whitespace-pre-wrap break-words text-[13px] leading-relaxed text-[var(--ink)] font-sans m-0">
          {letter}
        </pre>
      </div>

      <div className="flex gap-2 mt-3 print:hidden">
        <button
          onClick={copyText}
          className="flex-1 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] bg-white text-[13px] font-bold text-[var(--ink)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[.97]"
        >
          {copied ? '✓ 복사됨' : '📋 텍스트 복사'}
        </button>
        <button
          onClick={saveImage}
          disabled={saving}
          className="flex-1 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] bg-white text-[13px] font-bold text-[var(--ink)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[.97] disabled:opacity-50"
        >
          {saving ? '저장 중...' : '📷 이미지'}
        </button>
        <button
          onClick={printLetter}
          className="flex-1 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] bg-white text-[13px] font-bold text-[var(--ink)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[.97]"
        >
          🖨 PDF·인쇄
        </button>
      </div>

      <p className="text-xs text-[var(--sub)] leading-relaxed mt-3 m-0 print:hidden">
        PDF 로 저장하려면 인쇄 대화상자에서 대상을 &lsquo;PDF로 저장&rsquo;으로 바꾸세요.
        휴대폰에서도 같은 방식으로 저장됩니다.
      </p>
    </Card>
  );
}
