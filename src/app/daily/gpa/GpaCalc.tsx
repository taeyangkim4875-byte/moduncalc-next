'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

interface Subject {
  name: string;
  credit: number;
  grade: string;
}

const GRADES: { label: string; value: number }[] = [
  { label: 'A+', value: 4.5 },
  { label: 'A0', value: 4.0 },
  { label: 'B+', value: 3.5 },
  { label: 'B0', value: 3.0 },
  { label: 'C+', value: 2.5 },
  { label: 'C0', value: 2.0 },
  { label: 'D+', value: 1.5 },
  { label: 'D0', value: 1.0 },
  { label: 'F', value: 0 },
];

function gradeValue(g: string): number {
  return GRADES.find(gr => gr.label === g)?.value ?? 0;
}

function defaultSubjects(): Subject[] {
  return Array.from({ length: 5 }, (_, i) => ({ name: `과목 ${i + 1}`, credit: 3, grade: 'A+' }));
}

export default function GpaCalc() {
  const [subjects, setSubjects] = useState<Subject[]>(defaultSubjects);

  const update = (idx: number, field: keyof Subject, val: string | number) => {
    setSubjects(prev => prev.map((s, i) => i === idx ? { ...s, [field]: val } : s));
  };

  const addSubject = () => setSubjects(prev => [...prev, { name: `과목 ${prev.length + 1}`, credit: 3, grade: 'A+' }]);
  const reset = () => setSubjects(defaultSubjects());

  const totalCredits = subjects.reduce((s, sub) => s + sub.credit, 0);
  const weightedSum = subjects.reduce((s, sub) => s + sub.credit * gradeValue(sub.grade), 0);
  const gpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

  return (<>
    <Card>
      <SectionTitle num="1">과목 정보</SectionTitle>
      <div className="flex flex-col gap-3">
        {subjects.map((sub, i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="text" value={sub.name} onChange={e => update(i, 'name', e.target.value)} placeholder="과목명"
              className="flex-[2] py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] min-w-0" />
            <select value={sub.credit} onChange={e => update(i, 'credit', +e.target.value)}
              className="flex-none w-[60px] py-2.5 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none appearance-none bg-white text-center">
              <option value={1}>1학점</option>
              <option value={2}>2학점</option>
              <option value={3}>3학점</option>
            </select>
            <select value={sub.grade} onChange={e => update(i, 'grade', e.target.value)}
              className="flex-none w-[64px] py-2.5 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none appearance-none bg-white text-center">
              {GRADES.map(g => <option key={g.label} value={g.label}>{g.label}</option>)}
            </select>
            {subjects.length > 1 && (
              <button onClick={() => setSubjects(prev => prev.filter((_, j) => j !== i))}
                className="flex-none w-8 h-8 rounded-lg border-0 bg-[#F2F4F6] text-[var(--sub)] text-sm font-bold cursor-pointer hover:bg-[#E5E8EB]">x</button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={addSubject}
          className="flex-1 py-2.5 rounded-xl border-[1.5px] border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)] text-sm font-bold cursor-pointer hover:bg-[var(--primary)] hover:text-white transition-all">
          + 과목 추가
        </button>
        <button onClick={reset}
          className="flex-1 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] bg-white text-[var(--sub)] text-sm font-bold cursor-pointer hover:bg-[#F2F4F6] transition-all">
          초기화
        </button>
      </div>
    </Card>

    <div>
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">계산 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-sm font-bold text-[var(--sub)]">평균 평점 (4.5 만점)</div>
          <div className="text-[48px] font-extrabold text-[var(--primary-dark)] tracking-tight">{gpa.toFixed(2)}</div>
        </div>
        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">총 과목 수</span><span className="font-bold">{subjects.length}과목</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">총 학점</span><span className="font-bold">{totalCredits}학점</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">가중 합계</span><span className="font-bold">{weightedSum.toFixed(1)}</span></div>
        </div>
      </div>
    </div>

    <Card>
      <div className="text-[13px] font-extrabold mb-2">📋 성적 등급표</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">등급</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">평점</th></tr></thead>
        <tbody>
          {GRADES.map(g => (
            <tr key={g.label} className="border-b border-[var(--line)]"><td className="py-2 font-bold">{g.label}</td><td className="text-right py-2 font-bold">{g.value.toFixed(1)}</td></tr>
          ))}
        </tbody>
      </table>
    </Card>

    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <b className="text-[#6B7684]">계산 방법</b><br/>· 평균 평점 = (학점 x 성적값)의 합 / 총 학점
      <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">4.5 만점 기준입니다. 학교별 기준이 다를 수 있으니 참고용으로 활용하세요.</div>
    </footer>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 학점(GPA)이란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">GPA(Grade Point Average)는 대학에서 학업 성취도를 수치로 나타내는 평균 평점입니다. 한국 대학은 주로 4.5 만점(A+~F) 체계를 사용하며, 일부 대학은 4.3 만점(A+를 4.3으로 환산)을 적용합니다. 각 과목의 학점(이수 단위)과 성적 등급을 곱한 가중 합계를 총 학점으로 나누어 산출합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">GPA는 장학금 선발, 대학원 진학, 교환학생 지원, 취업 시 서류 심사 등에 핵심 지표로 활용됩니다. 전공 평점과 전체 평점을 구분하여 관리하는 것이 좋으며, 학기별로 꾸준히 관리해야 졸업 요건과 목표 평점을 달성할 수 있습니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 4.5 만점과 4.3 만점의 차이는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 4.5 만점 체계는 A+를 4.5로, 4.3 만점 체계는 A+를 4.3으로 환산합니다. 대부분의 한국 대학은 4.5 만점을 사용하지만, 서울대 등 일부 대학은 4.3 만점을 적용합니다. 해외 대학원 지원 시에는 4.0 만점으로 변환이 필요한 경우도 있습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 재수강하면 성적이 어떻게 반영되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 대부분의 대학에서 재수강 시 이전 성적이 삭제되고 새 성적으로 대체됩니다. 다만 재수강 성적 상한(예: A0까지만)이 있는 학교가 많고, 성적표에 재수강 표시가 남을 수 있으니 학칙을 확인하세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 졸업에 필요한 최소 평점은?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 학교마다 다르지만 일반적으로 4.5 만점 기준 2.0 이상이 졸업 요건입니다. 일부 학과에서는 전공 평점 기준을 별도로 두기도 합니다. 장학금이나 대학원 진학을 목표로 한다면 3.5 이상을 유지하는 것이 유리합니다.</div></div>
      </div>
    </Card>
  </>);
}
