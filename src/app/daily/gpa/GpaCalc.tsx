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
  </>);
}
