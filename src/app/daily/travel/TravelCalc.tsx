'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const won = (n: number) => n.toLocaleString() + '원';

type Destination = 'domestic' | 'japan' | 'southeast-asia' | 'europe' | 'usa';
type Style = 'budget' | 'moderate' | 'comfort';

const DEST_LABELS: Record<Destination, string> = {
  domestic: '국내',
  japan: '일본',
  'southeast-asia': '동남아',
  europe: '유럽',
  usa: '미국',
};

const STYLE_LABELS: Record<Style, string> = {
  budget: '절약',
  moderate: '보통',
  comfort: '여유',
};

/* 1인 1일 기준 (원) — 숙소+식비+교통+관광 포함 */
const DAILY_COST: Record<Destination, Record<Style, number>> = {
  domestic:        { budget:  80000, moderate: 150000, comfort: 250000 },
  japan:           { budget: 100000, moderate: 180000, comfort: 300000 },
  'southeast-asia':{ budget:  60000, moderate: 120000, comfort: 200000 },
  europe:          { budget: 150000, moderate: 250000, comfort: 400000 },
  usa:             { budget: 150000, moderate: 280000, comfort: 450000 },
};

/* 왕복 항공비 1인 기준 (원) */
const FLIGHT_COST: Record<Destination, number> = {
  domestic: 0,
  japan: 300000,
  'southeast-asia': 400000,
  europe: 1200000,
  usa: 1500000,
};

/* 일비 세부 비율 */
const BREAKDOWN_RATIO = {
  accommodation: 0.4,
  food: 0.3,
  transport: 0.15,
  sightseeing: 0.15,
};

const BREAKDOWN_LABELS: Record<string, { label: string; color: string }> = {
  accommodation: { label: '숙소', color: '#3182F6' },
  food:          { label: '식비', color: '#FF6B35' },
  transport:     { label: '교통', color: '#10B981' },
  sightseeing:   { label: '관광', color: '#7C3AED' },
};

export default function TravelCalc() {
  const [dest, setDest] = useState<Destination>('japan');
  const [days, setDays] = useState(3);
  const [people, setPeople] = useState(2);
  const [style, setStyle] = useState<Style>('moderate');

  const dailyCost = DAILY_COST[dest][style];
  const flightPerPerson = FLIGHT_COST[dest];

  const totalFlight = flightPerPerson * people;
  const totalDaily = dailyCost * days * people;
  const grandTotal = totalFlight + totalDaily;
  const perPerson = grandTotal / people;

  const breakdownItems = Object.entries(BREAKDOWN_RATIO).map(([key, ratio]) => ({
    key,
    label: BREAKDOWN_LABELS[key].label,
    color: BREAKDOWN_LABELS[key].color,
    amount: dailyCost * ratio * days * people,
  }));

  return (
    <>
      {/* 입력 */}
      <Card>
        <SectionTitle num="1">목적지</SectionTitle>
        <div className="grid grid-cols-3 gap-1.5 mb-4">
          {(Object.keys(DEST_LABELS) as Destination[]).map(d => (
            <button
              key={d}
              onClick={() => setDest(d)}
              className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${
                dest === d
                  ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]'
                  : 'border-[var(--line)] bg-white text-[var(--sub)]'
              }`}
            >
              {DEST_LABELS[d]}
            </button>
          ))}
        </div>

        <SectionTitle num="2">여행 스타일</SectionTitle>
        <div className="grid grid-cols-3 gap-1.5 mb-4">
          {(Object.keys(STYLE_LABELS) as Style[]).map(s => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`py-2.5 rounded-xl text-xs font-bold cursor-pointer border-[1.5px] transition-colors ${
                style === s
                  ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]'
                  : 'border-[var(--line)] bg-white text-[var(--sub)]'
              }`}
            >
              {STYLE_LABELS[s]}
            </button>
          ))}
        </div>

        <SectionTitle num="3">여행 일수</SectionTitle>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="range"
            min={1}
            max={30}
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="flex-1 accent-[var(--primary)]"
          />
          <span className="text-sm font-extrabold text-[var(--primary-dark)] min-w-[48px] text-right">
            {days}일
          </span>
        </div>

        <SectionTitle num="4">인원</SectionTitle>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={1}
            max={10}
            value={people}
            onChange={e => setPeople(Number(e.target.value))}
            className="flex-1 accent-[var(--primary)]"
          />
          <span className="text-sm font-extrabold text-[var(--primary-dark)] min-w-[48px] text-right">
            {people}명
          </span>
        </div>
      </Card>

      {/* 총 예상 경비 */}
      <Card className="!p-6">
        <div className="text-center">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">총 예상 경비</div>
          <div className="text-[42px] font-extrabold text-[var(--primary-dark)] tracking-tight">
            {won(grandTotal)}
          </div>
          <div className="text-sm text-[var(--sub)] mt-1">
            1인당 {won(perPerson)}
          </div>
        </div>
      </Card>

      {/* 비용 항목별 내역 */}
      <Card>
        <SectionTitle num="5">비용 항목별 내역</SectionTitle>
        <div className="flex flex-col gap-2">
          {/* 항공비 */}
          <div>
            <div className="flex justify-between items-center text-[13px] mb-1">
              <span className="font-semibold text-[var(--sub)]">
                항공비 (왕복 {people}인)
              </span>
              <span className="font-bold">{won(totalFlight)}</span>
            </div>
            <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: grandTotal > 0 ? `${(totalFlight / grandTotal) * 100}%` : '0%',
                  backgroundColor: '#F59E0B',
                }}
              />
            </div>
          </div>

          {/* 일비 세부 항목 */}
          {breakdownItems.map(item => (
            <div key={item.key}>
              <div className="flex justify-between items-center text-[13px] mb-1">
                <span className="font-semibold text-[var(--sub)]">{item.label}</span>
                <span className="font-bold">{won(item.amount)}</span>
              </div>
              <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: grandTotal > 0 ? `${(item.amount / grandTotal) * 100}%` : '0%',
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center text-[13px] border-t border-[var(--line)] pt-2.5 mt-1">
            <span className="font-bold">합계</span>
            <span className="font-extrabold text-[var(--primary-dark)]">{won(grandTotal)}</span>
          </div>
        </div>
      </Card>

      {/* 일별 세부 내역 */}
      <Card>
        <SectionTitle num="6">일별 세부 내역 (1인 기준)</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th className="text-left py-2 font-bold text-[var(--sub)]">일차</th>
                <th className="text-right py-2 font-bold text-[var(--sub)]">숙소</th>
                <th className="text-right py-2 font-bold text-[var(--sub)]">식비</th>
                <th className="text-right py-2 font-bold text-[var(--sub)]">교통</th>
                <th className="text-right py-2 font-bold text-[var(--sub)]">관광</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: days }, (_, i) => (
                <tr key={i} className="border-b border-[var(--bg)]">
                  <td className="py-1.5 font-semibold">{i + 1}일차</td>
                  <td className="py-1.5 text-right">{won(dailyCost * 0.4)}</td>
                  <td className="py-1.5 text-right">{won(dailyCost * 0.3)}</td>
                  <td className="py-1.5 text-right">{won(dailyCost * 0.15)}</td>
                  <td className="py-1.5 text-right">{won(dailyCost * 0.15)}</td>
                </tr>
              ))}
              <tr className="border-t border-[var(--line)]">
                <td className="py-2 font-bold">합계</td>
                <td className="py-2 text-right font-bold">{won(dailyCost * 0.4 * days)}</td>
                <td className="py-2 text-right font-bold">{won(dailyCost * 0.3 * days)}</td>
                <td className="py-2 text-right font-bold">{won(dailyCost * 0.15 * days)}</td>
                <td className="py-2 text-right font-bold">{won(dailyCost * 0.15 * days)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* 여행 예산 절약 팁 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">여행 경비 대충 얼마 들지 미리 계산해보세요. 목적지, 여행 스타일, 일수에 따라 예상 비용이 달라져요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 항공권은 언제 예약하면 저렴한가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 2~3개월 전이 보통 가장 저렴해요. 화~수요일 출발이 주말보다 20~30% 싸요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 환전은 어떻게 하는 게 유리한가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 트래블월렛 같은 여행 전용 카드를 쓰면 수수료를 줄일 수 있어요. 해외 결제 시 현지 통화로 결제하세요.</div>
          </div>
        </div>
      </Card>
    </>
  );
}
