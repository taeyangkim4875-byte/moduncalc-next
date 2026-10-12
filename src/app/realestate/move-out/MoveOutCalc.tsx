'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import MoneyInput from '@/components/MoneyInput';
import { won } from '@/utils/format';
import {
  calcMoveOutSettlement,
  emptyMoveOutInput,
  daysInMonth,
  ROUNDING_NOTE,
  type RepairPeriod,
  type NamedAmount,
  type RentPaymentType,
  type SettlementLine,
} from '@/utils/moveOutSettlement';
import SettlementLetter from './SettlementLetter';

/** 공제/수취 항목 한 줄. 계산식이 있으면 펼쳐볼 수 있다. */
function LineRow({ line, sign }: { line: SettlementLine; sign: '+' | '−' }) {
  const [open, setOpen] = useState(false);
  const hasDetail = Boolean(line.formula || line.note);

  return (
    <div className="border-b border-[var(--line)] last:border-0">
      <button
        type="button"
        onClick={() => hasDetail && setOpen(o => !o)}
        className={`w-full flex items-center justify-between gap-3 py-2.5 text-left ${hasDetail ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <span className="text-sm text-[#4E5968] flex items-center gap-1.5 min-w-0">
          <span className="truncate">{line.label}</span>
          {hasDetail && (
            <span className="text-[10px] text-[var(--sub)] flex-none">{open ? '▲' : '▼'}</span>
          )}
        </span>
        <span
          className={`text-sm font-bold flex-none ${sign === '+' ? 'text-[var(--ink)]' : 'text-[#E5484D]'}`}
        >
          {sign} {won(line.amount)}
        </span>
      </button>
      {open && hasDetail && (
        <div className="pb-2.5 -mt-0.5">
          {line.formula && (
            <div className="text-xs text-[var(--sub)] bg-[var(--bg)] rounded-lg px-3 py-2 leading-relaxed">
              {line.formula}
            </div>
          )}
          {line.note && (
            <div className="text-xs text-[#B86E00] bg-[#FFF4E5] rounded-lg px-3 py-2 mt-1.5 leading-relaxed">
              {line.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** 이름 + 금액을 여러 개 추가하는 목록 */
function NamedAmountList({
  items,
  onChange,
  addLabel,
  placeholder,
}: {
  items: NamedAmount[];
  onChange: (next: NamedAmount[]) => void;
  addLabel: string;
  placeholder: string;
}) {
  const update = (i: number, patch: Partial<NamedAmount>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  return (
    <>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 mb-2">
          <input
            type="text"
            value={item.label}
            placeholder={placeholder}
            onChange={e => update(i, { label: e.target.value })}
            className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-[var(--line)] text-sm text-[var(--ink)] outline-none focus:border-[var(--primary)]"
          />
          <div className="w-[9.5rem] flex-none">
            <MoneyInput
              value={item.amount}
              onChange={v => update(i, { amount: v })}
              className=""
            />
          </div>
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            aria-label="삭제"
            className="flex-none w-9 h-[46px] rounded-xl border border-[var(--line)] text-[var(--sub)] text-sm hover:border-[#E5484D] hover:text-[#E5484D]"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { label: '', amount: 0 }])}
        className="w-full py-2.5 rounded-xl border border-dashed border-[var(--line)] text-sm font-bold text-[var(--sub)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        + {addLabel}
      </button>
    </>
  );
}

export default function MoveOutCalc() {
  const [deposit, setDeposit] = useState(0);

  const [repairMode, setRepairMode] = useState<'total' | 'estimate'>('total');
  const [repairTotal, setRepairTotal] = useState(0);
  const [repairPeriods, setRepairPeriods] = useState<RepairPeriod[]>([
    { monthlyAmount: 0, months: 0 },
  ]);

  const [prepaidDeposit, setPrepaidDeposit] = useState(0);

  const [moveOutDate, setMoveOutDate] = useState('');
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [rentType, setRentType] = useState<RentPaymentType>('arrears');
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(0);

  const [unpaidRent, setUnpaidRent] = useState(0);
  const [utilities, setUtilities] = useState<NamedAmount[]>([]);
  const [agreed, setAgreed] = useState<NamedAmount[]>([]);

  const moveOut = useMemo(() => {
    if (!moveOutDate) return null;
    const [y, m, d] = moveOutDate.split('-').map(Number);
    if (!y || !m || !d) return null;
    return { year: y, month: m, moveOutDay: d };
  }, [moveOutDate]);

  const result = useMemo(
    () =>
      calcMoveOutSettlement({
        ...emptyMoveOutInput(),
        deposit,
        longTermRepair:
          repairMode === 'total'
            ? { mode: 'total', total: repairTotal }
            : { mode: 'estimate', periods: repairPeriods },
        prepaidMaintenanceDeposit: prepaidDeposit,
        moveOut,
        monthlyRent,
        rentPaymentType: rentType,
        monthlyMaintenance,
        unpaidRent,
        unpaidUtilities: utilities,
        agreedDeductions: agreed,
      }),
    [
      deposit, repairMode, repairTotal, repairPeriods, prepaidDeposit,
      moveOut, monthlyRent, rentType, monthlyMaintenance,
      unpaidRent, utilities, agreed,
    ],
  );

  const hasAnything = result.receivables.length > 0 || result.deductions.length > 0;
  const monthDays = moveOut ? daysInMonth(moveOut.year, moveOut.month) : 0;

  return (
    <>
      {/* ── 받을 금액 ── */}
      <Card>
        <SectionTitle num="1">받을 금액</SectionTitle>

        <MoneyInput label="임대차 보증금" value={deposit} onChange={setDeposit} />

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">장기수선충당금 대납액</label>
          <div className="flex gap-1.5 mb-3">
            <button
              type="button"
              onClick={() => setRepairMode('total')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                repairMode === 'total' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
              }`}
            >
              납부확인서 총액
            </button>
            <button
              type="button"
              onClick={() => setRepairMode('estimate')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                repairMode === 'estimate' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
              }`}
            >
              월 금액으로 추정
            </button>
          </div>

          {repairMode === 'total' ? (
            <MoneyInput
              value={repairTotal}
              onChange={setRepairTotal}
              hint="관리사무소에 요청하면 납부확인서를 발급해 줍니다. 가장 정확한 방법입니다."
              className=""
            />
          ) : (
            <>
              {repairPeriods.map((p, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <MoneyInput
                      value={p.monthlyAmount}
                      onChange={v =>
                        setRepairPeriods(ps => ps.map((x, idx) => (idx === i ? { ...x, monthlyAmount: v } : x)))
                      }
                      unit="원/월"
                      className=""
                    />
                  </div>
                  <div className="w-24 flex-none flex items-center gap-1.5">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={p.months > 0 ? p.months : ''}
                      placeholder="0"
                      onChange={e => {
                        const v = Number(e.target.value.replace(/[^\d]/g, '')) || 0;
                        setRepairPeriods(ps => ps.map((x, idx) => (idx === i ? { ...x, months: v } : x)));
                      }}
                      className="w-full min-w-0 px-2.5 py-3 rounded-xl border border-[var(--line)] text-base font-bold text-right outline-none focus:border-[var(--primary)]"
                    />
                    <span className="text-sm font-bold text-[var(--sub)] flex-none">개월</span>
                  </div>
                  {repairPeriods.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setRepairPeriods(ps => ps.filter((_, idx) => idx !== i))}
                      aria-label="구간 삭제"
                      className="flex-none w-9 h-[46px] rounded-xl border border-[var(--line)] text-[var(--sub)] text-sm hover:border-[#E5484D] hover:text-[#E5484D]"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setRepairPeriods(ps => [...ps, { monthlyAmount: 0, months: 0 }])}
                className="w-full py-2.5 rounded-xl border border-dashed border-[var(--line)] text-sm font-bold text-[var(--sub)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                + 금액이 바뀐 구간 추가
              </button>
              <p className="text-xs text-[#B86E00] bg-[#FFF4E5] rounded-lg px-3 py-2 mt-2 leading-relaxed">
                추정값입니다. 실제 금액은 관리사무소 납부확인서로 확인하세요.
              </p>
            </>
          )}
        </div>

        <MoneyInput
          label="관리비 예치금(선수관리비) 환급"
          value={prepaidDeposit}
          onChange={setPrepaidDeposit}
          hint="입주할 때 따로 냈다면 입력하세요. 없으면 비워 두세요."
        />
      </Card>

      {/* ── 퇴거월 일할 ── */}
      <Card>
        <SectionTitle num="2">퇴거월 일할 계산</SectionTitle>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">퇴거일</label>
          <input
            type="date"
            value={moveOutDate}
            onChange={e => setMoveOutDate(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl border border-[var(--line)] text-base font-bold text-[var(--ink)] outline-none focus:border-[var(--primary)]"
          />
          <p className="text-xs text-[var(--sub)] mt-1.5 m-0">
            {moveOut
              ? `${moveOut.month}월은 ${monthDays}일이고, 퇴거일 당일까지 거주한 것으로 계산합니다.`
              : '날짜를 넣으면 월세·관리비를 일할로 나눠 계산합니다. 월말 퇴거라면 비워 두어도 됩니다.'}
          </p>
        </div>

        <MoneyInput
          label="월세"
          value={monthlyRent}
          onChange={setMonthlyRent}
          hint="전세라면 비워 두세요."
        />

        {monthlyRent > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">월세 지급 방식</label>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setRentType('arrears')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  rentType === 'arrears' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
                }`}
              >
                후불 (월말 지급)
              </button>
              <button
                type="button"
                onClick={() => setRentType('prepaid')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  rentType === 'prepaid' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
                }`}
              >
                선불 (월초 지급)
              </button>
            </div>
            <p className="text-xs text-[var(--sub)] mt-1.5 m-0">
              {rentType === 'arrears'
                ? '산 날만큼 내야 하므로 공제됩니다.'
                : '이미 한 달치를 냈으므로 살지 않은 날만큼 돌려받습니다.'}
            </p>
          </div>
        )}

        <MoneyInput
          label="월 관리비"
          value={monthlyMaintenance}
          onChange={setMonthlyMaintenance}
          hint="퇴거월 관리비를 일할로 나눠 공제합니다."
        />
      </Card>

      {/* ── 공제 ── */}
      <Card>
        <SectionTitle num="3">공제할 금액</SectionTitle>

        <MoneyInput
          label="미납 월세"
          value={unpaidRent}
          onChange={setUnpaidRent}
          hint="퇴거월 일할분과 별개로 밀린 금액이 있을 때만 입력하세요."
        />

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">미납 공과금</label>
          <NamedAmountList
            items={utilities}
            onChange={setUtilities}
            addLabel="공과금 추가"
            placeholder="전기요금"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">원상복구·수리비 등 합의된 공제</label>
          <NamedAmountList
            items={agreed}
            onChange={setAgreed}
            addLabel="공제 항목 추가"
            placeholder="벽지 교체"
          />
        </div>
      </Card>

      {/* ── 결과 ── */}
      {hasAnything && (
        <Card className="scroll-mt-4" >
          <div id="calc-result">
            <SectionTitle num="4">정산 결과</SectionTitle>

            {result.receivables.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-extrabold text-[var(--primary)] mb-1">받을 금액</div>
                {result.receivables.map(l => (
                  <LineRow key={l.key} line={l} sign="+" />
                ))}
                <div className="flex items-center justify-between pt-2.5 text-sm">
                  <span className="font-bold text-[var(--ink)]">소계</span>
                  <span className="font-extrabold text-[var(--ink)]">{won(result.totalReceivable)}</span>
                </div>
              </div>
            )}

            {result.deductions.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-extrabold text-[#E5484D] mb-1">공제할 금액</div>
                {result.deductions.map(l => (
                  <LineRow key={l.key} line={l} sign="−" />
                ))}
                <div className="flex items-center justify-between pt-2.5 text-sm">
                  <span className="font-bold text-[var(--ink)]">소계</span>
                  <span className="font-extrabold text-[#E5484D]">− {won(result.totalDeduction)}</span>
                </div>
              </div>
            )}

            <div
              className={`rounded-[14px] p-4 text-center ${
                result.tenantOwes ? 'bg-[#FFE5E5]' : 'bg-[var(--primary-weak)]'
              }`}
            >
              <div
                className={`text-xs font-bold ${
                  result.tenantOwes ? 'text-[#E5484D]' : 'text-[var(--primary-dark)]'
                }`}
              >
                {result.tenantOwes ? '추가로 지급해야 할 금액' : '최종 반환받을 금액'}
              </div>
              <div
                className={`text-[32px] font-extrabold tracking-tight ${
                  result.tenantOwes ? 'text-[#E5484D]' : 'text-[var(--primary-dark)]'
                }`}
              >
                {won(Math.abs(result.netAmount))}
              </div>
              {result.tenantOwes && (
                <div className="text-xs text-[#4E5968] mt-1">
                  공제액이 받을 금액보다 많습니다.
                </div>
              )}
            </div>

            <p className="text-xs text-[var(--sub)] leading-relaxed mt-3 m-0">
              {ROUNDING_NOTE} 항목을 눌러 계산식을 펼쳐볼 수 있습니다.
            </p>
          </div>

          {result.longTermRepairEstimated && (
            <div className="bg-[#FFF4E5] rounded-xl p-3.5 mt-3">
              <div className="text-sm font-bold text-[#B86E00] mb-1">장기수선충당금은 추정값입니다</div>
              <p className="text-[13px] text-[#4E5968] leading-relaxed m-0">
                관리사무소에 요청하면 납부확인서를 발급받을 수 있습니다. 정산 전에 실제 금액을 확인하세요.
              </p>
            </div>
          )}
        </Card>
      )}

      {hasAnything && <SettlementLetter result={result} />}

      <div className="bg-[var(--bg)] rounded-xl p-3.5 text-xs text-[var(--sub)] leading-relaxed mb-3.5">
        입력값은 브라우저에서만 계산되며 서버로 전송되지 않습니다.
        이 계산은 <strong>참고용</strong>이며 실제 금액은 관리사무소 납부확인서와 계약 내용에 따라 다를 수 있습니다.
        원상복구 범위처럼 다툼이 생기기 쉬운 항목은 당사자 간 합의가 우선이며,
        합의가 어려우면 대한법률구조공단이나 주택임대차분쟁조정위원회의 도움을 받을 수 있습니다.
      </div>
    </>
  );
}
