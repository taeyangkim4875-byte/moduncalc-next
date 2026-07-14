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
        <h2 className="text-base font-extrabold mb-3">여행 예산 절약 팁</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2">
          <p>
            <b>항공권:</b> 2~3개월 전 예약이 가장 저렴합니다. 스카이스캐너, 네이버 항공권 비교를
            활용하고, 화·수요일 출발이 주말보다 20~30% 저렴합니다.
          </p>
          <p>
            <b>숙소:</b> 에어비앤비, 호스텔월드를 비교하세요. 장기 숙박 할인(주간 할인)을 활용하면
            1박당 비용을 크게 줄일 수 있습니다.
          </p>
          <p>
            <b>식비:</b> 현지 시장, 편의점, 로컬 식당을 이용하면 관광지 레스토랑 대비 50% 이상
            절약됩니다.
          </p>
          <p>
            <b>교통:</b> 교통 패스(JR패스, 유레일패스 등)를 사전 구매하면 현지 구매보다 저렴합니다.
            도시 내에서는 대중교통을 적극 활용하세요.
          </p>
        </div>
      </Card>

      {/* 목적지별 특징 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">목적지별 여행 특징</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2">
          <p>
            <b>국내:</b> 항공비 부담이 없어 전체 경비가 저렴합니다. KTX, 고속버스를 활용하면
            교통비를 절약할 수 있습니다.
          </p>
          <p>
            <b>일본:</b> 교통비가 비싼 편이므로 JR패스 등 교통 패스 활용이 필수입니다. 편의점 식사로
            식비를 절약할 수 있습니다.
          </p>
          <p>
            <b>동남아:</b> 숙소와 식비가 매우 저렴합니다. 다만 장거리 이동 시 국내선 항공을 이용해야
            하는 경우가 있어 교통비가 추가될 수 있습니다.
          </p>
          <p>
            <b>유럽:</b> 숙소비가 높은 편이지만 유레일패스로 교통비를 절약할 수 있습니다. 도시 간
            이동이 많으면 패스가 유리합니다.
          </p>
          <p>
            <b>미국:</b> 렌터카가 사실상 필수인 지역이 많습니다. 팁 문화(15~20%)가 있어 식비 예산을
            넉넉히 잡아야 합니다.
          </p>
        </div>
      </Card>

      {/* 환율 참고 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">환율 참고 정보</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2">
          <p>
            본 계산기의 비용은 원화(KRW) 기준 평균 예상치입니다. 실제 여행 시 환율 변동에 따라
            비용이 달라질 수 있습니다.
          </p>
          <p>
            <b>환전 팁:</b> 트래블월렛, 트래블로그 등 여행 전용 카드를 사용하면 환전 수수료를 최소화할
            수 있습니다. 대량 환전 시 은행 우대 환율도 활용해 보세요.
          </p>
          <p>
            <b>결제 팁:</b> 해외 결제 시 현지 통화(DCC 거부)로 결제하는 것이 유리합니다. 신용카드
            해외 결제 수수료도 카드사별로 비교하세요.
          </p>
        </div>
      </Card>
    </>
  );
}
