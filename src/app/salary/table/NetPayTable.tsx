'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { won, fmtSalary } from '@/utils/format';
import { netPay, type NetPayResult } from '@/utils/tax';

/* ── 연봉 구간 생성 ── */
function buildSalaryList(): number[] {
  const list: number[] = [];
  for (let s = 2000; s <= 6000; s += 100) list.push(s);
  for (let s = 6200; s <= 10000; s += 200) list.push(s);
  for (let s = 10500; s <= 15000; s += 500) list.push(s);
  return list;
}

const SALARY_LIST = buildSalaryList();
const LANDMARKS = new Set([2400, 3000, 3600, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000]);

const COLS = 3;

export default function NetPayTable() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const rows = useMemo(
    () => SALARY_LIST.map(s => ({ salary: s, result: netPay(s, 1, true) })),
    [],
  );

  const toggle = (salary: number) => setExpanded(prev => (prev === salary ? null : salary));

  /* 3열 분할 */
  const perCol = Math.ceil(rows.length / COLS);
  const columns = Array.from({ length: COLS }, (_, i) => rows.slice(i * perCol, (i + 1) * perCol));

  return (
    <>
      <Card>
        <SectionTitle num="1">연봉 실수령액표</SectionTitle>
        <div className="text-[12.5px] text-[var(--sub)] mb-3.5">
          부양가족 1인(본인) · 비과세 식대 월 20만원 기준
        </div>

        {/* 모바일: 단일 열 */}
        <div className="block lg:hidden">
          <table className="w-full text-[12.5px] border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-1.5 text-left text-[var(--sub)] font-bold border-b border-[var(--line)]">연봉</th>
                <th className="py-2 px-1.5 text-right text-[var(--sub)] font-bold border-b border-[var(--line)]">월 실수령</th>
                <th className="py-2 px-1.5 text-right text-[var(--sub)] font-bold border-b border-[var(--line)]">공제</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ salary, result }) => (
                <Row
                  key={salary}
                  salary={salary}
                  result={result}
                  isLandmark={LANDMARKS.has(salary)}
                  isExpanded={expanded === salary}
                  onToggle={() => toggle(salary)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* 데스크톱: 3열 */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-3">
          {columns.map((col, ci) => (
            <table key={ci} className="w-full text-[12px] border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-1 text-left text-[var(--sub)] font-bold border-b border-[var(--line)]">연봉</th>
                  <th className="py-2 px-1 text-right text-[var(--sub)] font-bold border-b border-[var(--line)]">월 실수령</th>
                  <th className="py-2 px-1 text-right text-[var(--sub)] font-bold border-b border-[var(--line)]">공제</th>
                </tr>
              </thead>
              <tbody>
                {col.map(({ salary, result }) => (
                  <Row
                    key={salary}
                    salary={salary}
                    result={result}
                    isLandmark={LANDMARKS.has(salary)}
                    isExpanded={expanded === salary}
                    onToggle={() => toggle(salary)}
                  />
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <b className="text-[#6B7684]">기준</b><br />
        · 2026년 4대보험 요율 · 근로소득세 간이세액 기준<br />
        · 부양가족 1인(본인), 비과세 식대 월 20만원 적용
        <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1] leading-relaxed">
          실제 급여와 다를 수 있습니다. 참고용으로만 활용하세요.
        </div>
      </footer>
    </>
  );
}

/* ── Row 컴포넌트 ── */
function Row({
  salary,
  result,
  isLandmark,
  isExpanded,
  onToggle,
}: {
  salary: number;
  result: NetPayResult;
  isLandmark: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className={`cursor-pointer transition-colors ${
          isLandmark
            ? 'bg-[var(--primary-weak)] font-extrabold'
            : 'hover:bg-[#F8F9FA]'
        }`}
      >
        <td className="py-2 px-1.5 text-left font-bold border-b border-[var(--line)]">
          {fmtSalary(salary)}
        </td>
        <td className="py-2 px-1.5 text-right font-bold border-b border-[var(--line)]">
          {won(result.netMonth)}
        </td>
        <td className="py-2 px-1.5 text-right text-[#E8344E] font-medium border-b border-[var(--line)]">
          -{won(result.deductMonth)}
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={3} className="border-b border-[var(--line)] bg-[#FBFCFD]">
            <div className="py-2.5 px-2.5 flex flex-col gap-1.5 text-[11.5px]">
              <div className="flex justify-between">
                <span className="text-[var(--sub)]">국민연금</span>
                <span className="font-bold">{won(result.np / 12)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--sub)]">건강+장기요양</span>
                <span className="font-bold">{won(result.hi / 12)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--sub)]">고용보험</span>
                <span className="font-bold">{won(result.ei / 12)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--sub)]">소득세</span>
                <span className="font-bold">{won(result.incomeTax / 12)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--sub)]">지방소득세</span>
                <span className="font-bold">{won(result.localTax / 12)}</span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
