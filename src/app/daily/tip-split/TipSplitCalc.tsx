'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Mode = 'equal' | 'custom' | 'payer';

export default function TipSplitCalc() {
  const [mode, setMode] = useState<Mode>('equal');
  const [totalAmount, setTotalAmount] = useState('');
  const [personCount, setPersonCount] = useState('4');

  // Mode 2: 차등 분배
  const [customAmounts, setCustomAmounts] = useState<string[]>(['', '', '', '']);

  // Mode 3: 결제자 정산
  const [payerName, setPayerName] = useState('');
  const [payerCount, setPayerCount] = useState('4');

  const total = +totalAmount || 0;
  const count = +personCount || 0;
  const pCount = +payerCount || 0;

  // 균등 분배
  const perPerson = count > 0 ? Math.ceil(total / count) : 0;
  const remainder = count > 0 ? total % count : 0;

  // 차등 분배
  const customNums = customAmounts.map(a => +a || 0);
  const customTotal = customNums.reduce((s, v) => s + v, 0);
  const customDiff = total - customTotal;

  // 결제자 정산
  const payerPerPerson = pCount > 0 ? Math.ceil(total / pCount) : 0;
  const payerSendAmount = pCount > 0 ? Math.ceil(total / pCount) : 0;

  const handlePersonCountChange = (val: string) => {
    setPersonCount(val);
    const n = +val || 0;
    setCustomAmounts(prev => {
      const arr = [...prev];
      while (arr.length < n) arr.push('');
      return arr.slice(0, n);
    });
  };

  const handleCustomAmount = (idx: number, val: string) => {
    setCustomAmounts(prev => {
      const arr = [...prev];
      arr[idx] = val;
      return arr;
    });
  };

  return (
    <>
      {/* 모드 선택 */}
      <Card className="!p-3">
        <div className="flex gap-1">
          {([['equal', '균등 분배'], ['custom', '차등 분배'], ['payer', '결제자 정산']] as [Mode, string][]).map(([m, label]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${mode === m ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      {/* 공통 입력 */}
      <Card>
        <SectionTitle num="1">금액·인원 입력</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">총 금액 (원)</label>
            <input
              type="number"
              inputMode="numeric"
              value={totalAmount}
              onChange={e => setTotalAmount(e.target.value)}
              placeholder="예: 150000"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          {mode !== 'payer' && (
            <div>
              <label className="text-xs font-bold text-[var(--sub)] block mb-1">참석자 수</label>
              <input
                type="number"
                inputMode="numeric"
                value={personCount}
                onChange={e => handlePersonCountChange(e.target.value)}
                min={1}
                placeholder="4"
                className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
              />
            </div>
          )}
          {mode === 'payer' && (
            <>
              <div>
                <label className="text-xs font-bold text-[var(--sub)] block mb-1">결제자 이름</label>
                <input
                  type="text"
                  value={payerName}
                  onChange={e => setPayerName(e.target.value)}
                  placeholder="예: 홍길동"
                  className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--sub)] block mb-1">총 인원 (결제자 포함)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={payerCount}
                  onChange={e => setPayerCount(e.target.value)}
                  min={2}
                  placeholder="4"
                  className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
                />
              </div>
            </>
          )}
        </div>
      </Card>

      {/* 차등 분배 입력 */}
      {mode === 'custom' && count > 0 && (
        <Card>
          <SectionTitle num="2">참석자별 금액 입력</SectionTitle>
          <div className="flex flex-col gap-2">
            {customAmounts.slice(0, count).map((amt, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-xs font-bold text-[var(--sub)] w-16">참석자 {i + 1}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={amt}
                  onChange={e => handleCustomAmount(i, e.target.value)}
                  placeholder="금액"
                  className="flex-1 py-2 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] tabular-nums"
                />
                <span className="text-xs text-[var(--sub)]">원</span>
              </div>
            ))}
          </div>
          <div className={`text-xs font-bold mt-2 ${customDiff === 0 ? 'text-[#10B981]' : 'text-[#E5484D]'}`}>
            {customDiff === 0
              ? '합계가 정확히 일치합니다'
              : customDiff > 0
                ? `${customDiff.toLocaleString()}원 부족합니다`
                : `${Math.abs(customDiff).toLocaleString()}원 초과합니다`}
          </div>
        </Card>
      )}

      {/* 결과 */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">
            {mode === 'equal' ? '1인당 금액' : mode === 'custom' ? '차등 분배 결과' : '인당 송금액'}
          </div>

          {mode === 'equal' && (
            <>
              <div className="text-[40px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
                {perPerson.toLocaleString()}원
              </div>
              {remainder > 0 && (
                <div className="text-xs text-[var(--sub)] mt-2">
                  {count}명 × {perPerson.toLocaleString()}원 = {(perPerson * count).toLocaleString()}원 (차이 {(perPerson * count - total).toLocaleString()}원은 1명이 적게 냄)
                </div>
              )}
              <div className="grid grid-cols-2 gap-1.5 mt-3">
                <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
                  <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{total.toLocaleString()}</div>
                  <div className="text-[9px] text-[var(--sub)] font-bold">총 금액</div>
                </div>
                <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
                  <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{count}명</div>
                  <div className="text-[9px] text-[var(--sub)] font-bold">참석자</div>
                </div>
              </div>
            </>
          )}

          {mode === 'custom' && (
            <div className="flex flex-col gap-1.5 mt-2">
              {customAmounts.slice(0, count).map((amt, i) => (
                <div key={i} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
                  <span className="text-[13px] font-semibold">참석자 {i + 1}</span>
                  <span className="text-[13px] font-bold tabular-nums">{(+amt || 0).toLocaleString()}원</span>
                </div>
              ))}
              <div className="flex justify-between items-center px-3 py-2.5 border-t-2 border-[var(--line)] mt-1">
                <span className="text-[13px] font-bold">합계</span>
                <span className={`text-[13px] font-bold tabular-nums ${customDiff === 0 ? '' : 'text-[#E5484D]'}`}>{customTotal.toLocaleString()}원</span>
              </div>
            </div>
          )}

          {mode === 'payer' && (
            <>
              <div className="text-[40px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
                {payerSendAmount.toLocaleString()}원
              </div>
              <div className="text-xs text-[var(--sub)] mt-2">
                각자 {payerName || '결제자'}에게 보낼 금액
              </div>
              <div className="flex flex-col gap-1.5 mt-3">
                <div className="bg-[var(--primary-weak)] border-2 border-[var(--primary)] rounded-xl px-3 py-2.5 flex justify-between items-center">
                  <span className="text-[13px] font-bold">{payerName || '결제자'} (결제)</span>
                  <span className="text-[13px] font-bold tabular-nums text-[var(--primary-dark)]">{total.toLocaleString()}원 선결제</span>
                </div>
                {Array.from({ length: Math.max(0, pCount - 1) }, (_, i) => (
                  <div key={i} className="bg-[var(--bg)] rounded-xl px-3 py-2.5 flex justify-between items-center">
                    <span className="text-[13px] font-semibold">참석자 {i + 2}</span>
                    <span className="text-[13px] font-bold tabular-nums">→ {payerPerPerson.toLocaleString()}원 송금</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Card>

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 모임 정산 가이드</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>정산 앱 추천:</b> 토스 더치페이 기능은 링크 하나로 각자 자동 정산이 가능합니다. 카카오페이 송금은 카톡 대화방에서 바로 요청할 수 있어 편리합니다. 네이버페이 정산하기도 그룹 정산을 지원합니다.</p>
          <p><b>효율적인 정산 팁:</b> 모임 전 정산 방식을 미리 정하면 불필요한 갈등을 피할 수 있습니다. 금액이 클 경우 각자 카드를 나눠서 결제하는 것도 방법입니다. 10원 단위 이하는 결제자가 부담하는 것이 매끄럽습니다.</p>
          <p><b>차등 정산이 필요한 경우:</b> 술을 마신 사람과 안 마신 사람, 늦게 합류한 사람, 특별 메뉴를 시킨 사람 등 상황에 따라 차등 정산이 합리적일 수 있습니다. 미리 기준을 정하고, 차등 분배 모드로 정확하게 계산하세요.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 균등 분배와 차등 분배의 차이는 무엇인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 균등 분배는 총 금액을 참석자 수로 나누는 N분의1 계산이고, 차등 분배는 각 참석자가 다른 금액을 부담하는 방식입니다. 술을 마신 사람과 안 마신 사람의 금액을 다르게 설정할 수 있습니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 송금 최소화란 무엇인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 한 사람이 먼저 결제했을 때, 나머지 참석자들이 결제자에게 보내야 할 금액을 계산합니다. 송금 횟수를 최소화하여 정산을 간편하게 합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 정산할 때 편리한 앱이 있나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 토스의 더치페이 기능, 카카오페이 송금, 네이버페이 정산하기 등을 활용하면 편리합니다. 링크를 공유하면 각자 자동으로 송금할 수 있습니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          계산 결과는 참고용이며, 10원 단위 이하 차이가 발생할 수 있습니다.
        </div>
      </footer>
    </>
  );
}
