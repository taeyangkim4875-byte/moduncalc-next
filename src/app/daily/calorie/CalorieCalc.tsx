'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';

export default function CalorieCalc() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(1.55);

  const bmr = gender === 'male'
    ? 10 * (weight || 0) + 6.25 * (height || 0) - 5 * (age || 0) + 5
    : 10 * (weight || 0) + 6.25 * (height || 0) - 5 * (age || 0) - 161;
  const tdee = bmr * (activity || 0);
  const lose = tdee - 500;
  const gain = tdee + 500;

  const breakfastRatio = 0.3;
  const lunchRatio = 0.4;
  const dinnerRatio = 0.3;

  const fmt = (n: number) => Math.round(n).toLocaleString();

  const activityOptions = [
    { value: 1.2, label: '비활동적 (사무직, 운동 안 함)' },
    { value: 1.375, label: '가벼운 활동 (주 1~3회 운동)' },
    { value: 1.55, label: '보통 활동 (주 3~5회 운동)' },
    { value: 1.725, label: '활발한 활동 (주 6~7회 운동)' },
    { value: 1.9, label: '매우 활발 (육체노동, 운동선수)' },
  ];

  return (
    <>
      <Card>
        <SectionTitle num="1">기본 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">성별</label>
          <div className="flex gap-2">
            <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl text-sm font-bold border-[1.5px] ${gender === 'male' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>남성</button>
            <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl text-sm font-bold border-[1.5px] ${gender === 'female' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>여성</button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">나이 <span className="text-xs text-[var(--sub)] font-medium ml-1">{age}세</span></label>
          <input type="range" min={15} max={80} step={1} value={age} onChange={e => setAge(+e.target.value)} className="w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">키</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">cm</span>
          </div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">체중</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">kg</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">활동량</SectionTitle>
        <div className="flex flex-col gap-2">
          {activityOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setActivity(opt.value)}
              className={`text-left py-3 px-3.5 rounded-xl text-sm font-bold border-[1.5px] ${activity === opt.value ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]' : 'bg-white border-[var(--line)] text-[var(--sub)]'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      <div className="text-lg font-extrabold mt-4 mb-3 px-1">🔥 칼로리 계산 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-sm font-bold text-[var(--sub)]">일일 총 소비 칼로리 (TDEE)</div>
          <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{fmt(tdee)}</div>
          <div className="text-sm text-[var(--sub)]">kcal / 일</div>
        </div>

        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">기초대사량 (BMR)</span><span className="font-bold">{fmt(bmr)} kcal</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">활동계수</span><span className="font-bold">x{activity}</span></div>
        </div>

        <div className="mt-4 border-t border-[var(--line)] pt-3.5">
          <div className="text-xs font-bold text-[var(--sub)] mb-2">목표별 권장 칼로리</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#E8F5E9] rounded-[14px] p-3 text-center">
              <div className="text-[18px] font-extrabold text-[#2E7D32]">{fmt(lose)}</div>
              <div className="text-[10px] text-[#4CAF50] mt-0.5 font-medium">감량 (-500)</div>
            </div>
            <div className="bg-[var(--primary-weak)] rounded-[14px] p-3 text-center">
              <div className="text-[18px] font-extrabold text-[var(--primary-dark)]">{fmt(tdee)}</div>
              <div className="text-[10px] text-[var(--primary)] mt-0.5 font-medium">유지</div>
            </div>
            <div className="bg-[#FFF3E0] rounded-[14px] p-3 text-center">
              <div className="text-[18px] font-extrabold text-[#E65100]">{fmt(gain)}</div>
              <div className="text-[10px] text-[#FF9800] mt-0.5 font-medium">증량 (+500)</div>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-[var(--line)] pt-3.5">
          <div className="text-xs font-bold text-[var(--sub)] mb-2">식사별 칼로리 배분 (유지 기준)</div>
          <div className="flex flex-col gap-1.5 text-[13px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">아침 (30%)</span><span className="font-bold">{fmt(tdee * breakfastRatio)} kcal</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">점심 (40%)</span><span className="font-bold">{fmt(tdee * lunchRatio)} kcal</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">저녁 (30%)</span><span className="font-bold">{fmt(tdee * dinnerRatio)} kcal</span></div>
          </div>
        </div>
      </div>

      <ShareButtons title="칼로리 계산 결과" />

      <Card>
        <SectionTitle num="📋">칼로리 높은 음식 vs 낮은 음식</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">고칼로리 음식</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">kcal</th>
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold pl-4">저칼로리 음식</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">kcal</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['치킨 1마리', '1,800', '샐러드 1접시', '150'],
              ['짜장면 1그릇', '700', '두부 반모', '80'],
              ['삼겹살 200g', '590', '닭가슴살 100g', '110'],
              ['피자 1판', '2,000', '계란 1개', '80'],
              ['라면 1봉지', '500', '고구마 1개', '130'],
              ['햄버거 세트', '1,100', '바나나 1개', '90'],
            ].map(([food1, cal1, food2, cal2]) => (
              <tr key={food1} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{food1}</td>
                <td className="py-2 text-right">{cal1}</td>
                <td className="py-2 font-bold pl-4">{food2}</td>
                <td className="py-2 text-right">{cal2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <SectionTitle num="📋">운동별 소모 칼로리 (30분 기준, 70kg)</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">운동</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">소모 칼로리</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['걷기 (보통 속도)', '약 130 kcal'],
              ['조깅', '약 250 kcal'],
              ['달리기 (시속 10km)', '약 350 kcal'],
              ['자전거', '약 210 kcal'],
              ['수영', '약 250 kcal'],
              ['등산', '약 280 kcal'],
              ['줄넘기', '약 370 kcal'],
              ['웨이트 트레이닝', '약 180 kcal'],
            ].map(([exercise, cal]) => (
              <tr key={exercise} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{exercise}</td>
                <td className="py-2 text-right">{cal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">다이어트 시작하려면 내가 하루에 몇 칼로리 먹어야 하는지부터 알아야 해요. Mifflin-St Jeor 공식으로 기초대사량과 일일 소비 칼로리를 계산해드려요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 하루 1,200kcal만 먹어도 괜찮나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 성인 여성 최소 1,200kcal, 남성 1,500kcal이 권장돼요. 이보다 적으면 영양 결핍 위험이 있어요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 운동 없이 식단만으로 감량 가능한가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 가능하지만 근손실이 동반될 수 있어요. 근력 운동을 병행하면 더 효과적입니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          계산 결과는 참고용이며, 정확한 영양 상담은 전문가와 상의하세요. Mifflin-St Jeor 공식 기반.
        </div>
      </footer>
    </>
  );
}
