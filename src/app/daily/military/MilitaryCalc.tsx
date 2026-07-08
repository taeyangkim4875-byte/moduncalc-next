'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const BRANCHES = [
  { label: '육군', months: 18, icon: '🪖' },
  { label: '해군', months: 20, icon: '⚓' },
  { label: '공군', months: 21, icon: '✈️' },
  { label: '해병대', months: 18, icon: '🦅' },
  { label: '사회복무요원', months: 21, icon: '🏥' },
  { label: '대체복무요원', months: 36, icon: '📋' },
];
const DAYS = ['일','월','화','수','목','금','토'];

export default function MilitaryCalc() {
  const [branch, setBranch] = useState(0);
  const [enlistDate, setEnlistDate] = useState('');

  const calc = () => {
    if (!enlistDate) return null;
    const enlist = new Date(enlistDate + 'T00:00:00');
    const discharge = new Date(enlist);
    discharge.setMonth(discharge.getMonth() + BRANCHES[branch].months);
    discharge.setDate(discharge.getDate() - 1); // 입대일 포함

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const totalDays = Math.round((discharge.getTime() - enlist.getTime()) / 864e5);
    const remainDays = Math.round((discharge.getTime() - now.getTime()) / 864e5);
    const servedDays = totalDays - Math.max(0, remainDays);
    const progress = totalDays > 0 ? Math.min(100, Math.max(0, (servedDays / totalDays) * 100)) : 0;

    const isDischarged = remainDays <= 0;
    return { discharge, totalDays, remainDays: Math.max(0, remainDays), servedDays: Math.min(servedDays, totalDays), progress, isDischarged };
  };

  const r = calc();
  const fmtDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  return (
    <>
      <Card>
        <SectionTitle num="1">입대 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">군별</label>
          <div className="grid grid-cols-3 gap-1.5">
            {BRANCHES.map((b, i) => (
              <button key={i} onClick={() => setBranch(i)} className={`py-2.5 px-1 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-all ${branch === i ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]' : 'bg-white border-[var(--line)] text-[var(--sub)]'}`}>
                <span className="text-base">{b.icon}</span><br />{b.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">입대일</label>
          <input type="date" value={enlistDate} onChange={e => setEnlistDate(e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-[15px] font-bold outline-none focus:border-[var(--primary)]" />
          <div className="text-xs text-[var(--sub)] mt-1">{BRANCHES[branch].label}: 복무기간 {BRANCHES[branch].months}개월</div>
        </div>
      </Card>

      {r && (
        <Card>
          <div className="text-center py-2">
            {r.isDischarged ? (
              <>
                <div className="text-5xl mb-2">🎉</div>
                <div className="text-2xl font-extrabold text-[var(--primary-dark)]">전역 완료!</div>
                <div className="text-sm text-[var(--sub)] mt-1">{fmtDate(r.discharge)} ({DAYS[r.discharge.getDay()]}요일) 전역</div>
              </>
            ) : (
              <>
                <div className="text-sm font-bold text-[var(--sub)]">전역일</div>
                <div className="text-[32px] font-extrabold text-[var(--primary-dark)] tracking-tight">{fmtDate(r.discharge)}</div>
                <div className="text-sm text-[var(--sub)]">{DAYS[r.discharge.getDay()]}요일</div>
              </>
            )}
          </div>

          {!r.isDischarged && (
            <>
              <div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3">
                <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">D-{r.remainDays}</div>
                <div className="text-xs text-[var(--sub)]">전역까지 {Math.floor(r.remainDays / 30)}개월 {r.remainDays % 30}일</div>
              </div>

              {/* 진행률 바 */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-bold text-[var(--sub)] mb-1">
                  <span>복무 진행률</span>
                  <span>{r.progress.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-[var(--line)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--primary)] rounded-full transition-all" style={{ width: `${r.progress}%` }} />
                </div>
              </div>
            </>
          )}

          <div className="mt-4 flex flex-col gap-2 text-[13.5px]">
            <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2"><span className="text-[var(--sub)] font-semibold">총 복무일수</span><span className="font-bold">{r.totalDays}일</span></div>
            <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2"><span className="text-[var(--sub)] font-semibold">복무한 일수</span><span className="font-bold">{r.servedDays}일</span></div>
            {!r.isDischarged && <div className="flex justify-between bg-[var(--bg)] rounded-lg px-3 py-2"><span className="text-[var(--sub)] font-semibold">남은 일수</span><span className="font-bold text-[var(--primary-dark)]">{r.remainDays}일</span></div>}
          </div>
        </Card>
      )}

      {/* 복무기간 비교표 */}
      <Card>
        <SectionTitle num="📋">군별 복무기간</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">군별</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">복무기간</th></tr></thead>
          <tbody>
            {BRANCHES.map((b, i) => (
              <tr key={i} className={`border-b border-[var(--line)] ${branch === i ? 'bg-[var(--primary-weak)] font-extrabold' : ''}`}>
                <td className="py-2">{b.icon} {b.label}</td><td className="py-2 text-right">{b.months}개월</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 군 복무기간이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">대한민국 남성은 병역법에 따라 현역, 사회복무요원, 대체복무요원 등의 형태로 군 복무를 이행합니다. 2020년 6월 이후 입대자 기준으로 육군·해병대 18개월, 해군 20개월, 공군·사회복무요원 21개월, 대체복무요원 36개월의 복무기간이 적용됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">전역일은 입대일로부터 복무기간을 더한 날짜의 전날입니다. 모범복무자 조기전역, 특별휴가 미사용 등에 따라 실제 전역일이 1~2일 달라질 수 있습니다.</p>
      </Card>
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 전역일은 정확한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 복무기간 기준으로 계산한 예상 전역일입니다. 실제 전역일은 부대 사정, 휴가 미사용 등에 따라 1~2일 달라질 수 있습니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 복무 단축이 적용되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 2020년 6월 이후 입대자 기준 단축된 복무기간이 적용되어 있습니다. 모범병사 조기전역 등 추가 단축은 반영되지 않습니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">예상 전역일이며, 실제 전역일은 병무청에서 확인하세요.</div>
      </footer>
    </>
  );
}
