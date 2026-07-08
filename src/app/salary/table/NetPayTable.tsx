'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import { won, fmtSalary } from '@/utils/format';
import { netPay } from '@/utils/tax';

function buildSalaryList(): number[] {
  const list: number[] = [];
  for (let s = 2000; s <= 6000; s += 100) list.push(s);
  for (let s = 6200; s <= 10000; s += 200) list.push(s);
  for (let s = 10500; s <= 15000; s += 500) list.push(s);
  return list;
}

const SALARY_LIST = buildSalaryList();

// 2024 귀속 기준 (출처: 국세청·통계청, 전체 근로자 기준)
const LANDMARKS: Record<number, string> = {
  2600: '최저임금 연봉(약 2,588만)',
  3200: '20대 평균(267만/월)',
  3400: '전체 중위(3,417만)',
  4500: '전체 평균(4,500만)',
  4800: '30대 평균(400만/월)',
  5900: '40대 평균(492만/월)',
  6100: '50대 평균(508만/월)',
};

export default function NetPayTable() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const rows = useMemo(
    () => SALARY_LIST.map(s => ({ salary: s, result: netPay(s, 1, true) })),
    [],
  );

  return (
    <>
      <Card className="!px-3.5">
        <p className="text-xs text-[var(--sub)] text-center mb-3">각 행을 터치하면 상세 공제 내역을 볼 수 있어요</p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2.5 text-left text-xs text-[var(--sub)] font-bold">연봉(세전)</th>
              <th className="py-2.5 text-right text-xs text-[var(--sub)] font-bold">공제 합계</th>
              <th className="py-2.5 text-right text-xs text-[var(--sub)] font-bold">월 실수령액</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ salary, result }) => {
              const landmark = LANDMARKS[salary] || null;
              const isExpanded = expanded === salary;
              const manFmt = (v: number) => Math.round(v / 10000).toLocaleString('ko-KR') + '만';

              return (
                <tr key={salary} className="contents">
                  <tr
                    onClick={() => setExpanded(isExpanded ? null : salary)}
                    className={`cursor-pointer transition-colors ${landmark ? 'bg-[var(--primary-weak)]' : 'hover:bg-[#F8F9FA]'}`}
                  >
                    <td className="py-2.5 text-left font-extrabold border-b border-[var(--line)]">
                      {fmtSalary(salary)}
                      {landmark && <div className="text-[10px] font-bold text-[var(--primary)] mt-0.5">{landmark}</div>}
                    </td>
                    <td className="py-2.5 text-right text-[var(--sub)] border-b border-[var(--line)]">-{manFmt(result.deductMonth)}</td>
                    <td className="py-2.5 text-right font-extrabold text-[var(--primary-dark)] border-b border-[var(--line)]">{manFmt(result.netMonth)}</td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={3} className="p-3 bg-[var(--bg)] border-b border-[var(--line)]">
                        <div className="grid grid-cols-2 gap-1.5 text-xs">
                          <span className="text-[var(--sub)]">월급(세전)</span><span className="text-right font-bold">{won(salary * 10000 / 12)}</span>
                          <span className="text-[var(--sub)]">국민연금</span><span className="text-right font-bold text-[#E5484D]">-{won(result.np / 12)}</span>
                          <span className="text-[var(--sub)]">건강+장기요양</span><span className="text-right font-bold text-[#E5484D]">-{won(result.hi / 12)}</span>
                          <span className="text-[var(--sub)]">고용보험</span><span className="text-right font-bold text-[#E5484D]">-{won(result.ei / 12)}</span>
                          <span className="text-[var(--sub)]">소득세+지방세</span><span className="text-right font-bold text-[#E5484D]">-{won((result.incomeTax + result.localTax) / 12)}</span>
                          <span className="font-extrabold border-t border-[var(--line)] pt-1.5">공제 합계</span><span className="text-right font-extrabold text-[#E5484D] border-t border-[var(--line)] pt-1.5">-{won(result.deductMonth)}</span>
                          <span className="font-extrabold">월 실수령액</span><span className="text-right font-extrabold text-[var(--primary-dark)]">{won(result.netMonth)}</span>
                          <span className="font-extrabold">연 실수령액</span><span className="text-right font-extrabold text-[var(--primary-dark)]">{won(result.netYear)}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <p className="text-[11px] text-[var(--sub)] text-center px-4 mt-1">부양가족 1명(본인), 비과세 식대 월 20만원 기준 · 2026년 4대보험 요율 적용</p>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <b className="text-[#6B7684]">기준</b><br />
        · 국민연금 4.75%(상한 637만) · 건강 3.595% · 장기요양 13.14% · 고용 0.9%<br />
        · 소득세: 간이세액 기준 · 식대 비과세 월 20만원
        <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          이 표는 일반적인 요율 기준 추정치이며, 실제 급여와 다를 수 있습니다.
        </div>
      </footer>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 연봉 실수령액 표란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">연봉 실수령액 표는 세전 연봉에서 4대보험과 소득세를 공제한 후 실제로 매월 통장에 입금되는 금액을 한눈에 비교할 수 있는 표입니다. 부양가족 1명(본인), 비과세 식대 월 20만원을 기본 조건으로 적용하여 계산됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">2026년 기준 4대보험 요율(국민연금 4.75%, 건강보험 3.595%, 장기요양 13.14%, 고용보험 0.9%)이 적용되며, 연봉이 높아질수록 소득세 누진세율로 인해 공제 비율이 커집니다. 연봉 4,500만원(전체 평균) 기준 월 실수령액은 약 310만원 내외입니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 표에서 내 연봉 구간을 어떻게 찾나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 각 행을 터치하면 해당 연봉의 상세 공제 내역(국민연금, 건강보험, 고용보험, 소득세)을 확인할 수 있습니다. 하이라이트된 행은 전체 근로자 통계 기준의 주요 연봉 구간입니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 부양가족이 많으면 실수령액이 달라지나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 이 표는 부양가족 1명(본인만) 기준입니다. 부양가족이 늘어나면 인적공제로 소득세가 줄어들어 실수령액이 증가합니다. 정확한 계산은 연봉 실수령액 계산기를 이용하세요.</div></div>
        </div>
      </Card>
    </>
  );
}
