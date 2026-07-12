'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const ITEMS = [
  { name: '아메리카노 1잔', price: 5000, emoji: '☕' },
  { name: '에어팟 프로', price: 359000, emoji: '🎧' },
  { name: '아이폰 16 Pro', price: 1550000, emoji: '📱' },
  { name: '닌텐도 스위치 2', price: 499000, emoji: '🎮' },
  { name: '맥북 프로 16인치', price: 3490000, emoji: '💻' },
  { name: '유럽 여행 2주', price: 5000000, emoji: '✈️' },
  { name: '테슬라 모델 3', price: 52990000, emoji: '🚗' },
  { name: '서울 아파트 (중위)', price: 900000000, emoji: '🏠' },
  { name: '결혼 비용 (평균)', price: 300000000, emoji: '💒' },
  { name: '치킨 100마리', price: 2200000, emoji: '🍗' },
];

export default function SalaryConverter() {
  const [salary, setSalary] = useState(4500);

  const workSecondsPerYear = 252 * 8 * 3600;
  const perSecond = (salary * 10000) / workSecondsPerYear;

  const fmtWorkTime = (price: number) => {
    const totalSec = price / perSecond;
    const workDaySeconds = 8 * 3600;
    const days = Math.floor(totalSec / workDaySeconds);
    const remainSec = totalSec % workDaySeconds;
    const hours = Math.floor(remainSec / 3600);
    const minutes = Math.floor((remainSec % 3600) / 60);

    const years = Math.floor(days / 252);
    const months = Math.floor((days % 252) / 21);
    const remainDays = days % 21;

    if (years > 0) {
      if (months > 0) return `${years}년 ${months}개월`;
      return `${years}년`;
    }
    if (months > 0) {
      if (remainDays > 0) return `${months}개월 ${remainDays}일`;
      return `${months}개월`;
    }
    if (days > 0) {
      if (hours > 0) return `${days}일 ${hours}시간`;
      return `${days}일`;
    }
    if (hours > 0) {
      if (minutes > 0) return `${hours}시간 ${minutes}분`;
      return `${hours}시간`;
    }
    return `${minutes}분`;
  };

  const shareText = () => {
    const lines = ITEMS.slice(0, 5).map(item => `${item.emoji} ${item.name}: ${fmtWorkTime(item.price)}`);
    const text = `연봉 ${salary.toLocaleString()}만원 기준\n${lines.join('\n')}\n\n👉 moduncalc.com/salary/convert`;

    if (navigator.share) {
      navigator.share({ title: '연봉 환산기', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다!');
    }
  };

  return (
    <>
      <Card>
        <SectionTitle num="💰">연봉 입력</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            세전 연봉 <span className="text-xs text-[var(--sub)] font-medium ml-1">{salary.toLocaleString()}만원</span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              value={salary}
              onChange={e => setSalary(+e.target.value || 0)}
              className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"
            />
            <span className="text-sm font-bold text-[var(--sub)]">만원</span>
          </div>
          <input type="range" min={2000} max={15000} step={100} value={salary} onChange={e => setSalary(+e.target.value)} className="w-full mt-3.5" />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold">시급</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)]">{Math.round((salary * 10000) / (252 * 8)).toLocaleString()}원</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold">분당</div>
            <div className="text-lg font-extrabold text-[var(--primary-dark)]">{Math.round(perSecond * 60).toLocaleString()}원</div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="🛒">이걸 사려면 얼마나 일해야 할까?</SectionTitle>
        <div className="flex flex-col gap-2">
          {ITEMS.map(item => {
            const time = fmtWorkTime(item.price);
            return (
              <div key={item.name} className="flex items-center justify-between px-3 py-3 rounded-xl bg-[var(--bg)]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.emoji}</span>
                  <div>
                    <div className="text-sm font-semibold">{item.name}</div>
                    <div className="text-[11px] text-[var(--sub)]">{item.price.toLocaleString()}원</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-[var(--primary-dark)]">{time}</div>
                  <div className="text-[10px] text-[var(--sub)]">일해야 함</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <button
        onClick={shareText}
        className="w-full py-3.5 border-0 rounded-xl bg-[var(--primary)] text-white text-sm font-extrabold cursor-pointer shadow-[var(--shadow-h)] transition-all hover:bg-[var(--primary-dark)] active:scale-[.985]"
      >
        📤 결과 공유하기
      </button>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 연봉 환산기란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          연봉을 근무 시간으로 나눠서, 원하는 물건을 사려면 순수하게 며칠을 일해야 하는지 보여줍니다.
          연간 근무일수 252일, 일 8시간 기준입니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          세전 연봉 기준이므로, 실제로는 세금·보험료 공제 후 더 오래 일해야 합니다.
          &quot;내가 이걸 사려면 이만큼 일해야 하는구나&quot; 하는 재미로 보세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 세후 기준으로 볼 수 있나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 현재는 세전 기준입니다. 실수령액 기준으로 보려면 연봉 실수령액 계산기에서 실수령액을 확인한 후 그 금액을 입력하세요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 근무일 252일은 어떤 기준인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 연 365일에서 주말 104일, 공휴일 약 15일을 제외한 평균 근무일수입니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          재미용 계산이며, 실제 구매력과 다를 수 있습니다.
        </div>
      </footer>
    </>
  );
}
