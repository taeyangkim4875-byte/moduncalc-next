'use client';
import { useState } from 'react';
import Link from 'next/link';
import Card, { SectionTitle } from '@/components/Card';
import { won } from '@/utils/format';

type AcType = 'inverter' | 'fixed';
type Season = 'summer' | 'normal';

const TIERS: { [k in Season]: { limit: number; base: number; unit: number }[] } = {
  normal: [
    { limit: 200, base: 910, unit: 120.0 },
    { limit: 400, base: 1600, unit: 214.6 },
    { limit: Infinity, base: 7300, unit: 307.3 },
  ],
  summer: [
    { limit: 300, base: 910, unit: 120.0 },
    { limit: 450, base: 1600, unit: 214.6 },
    { limit: Infinity, base: 7300, unit: 307.3 },
  ],
};

function calcElectric(kwh: number, season: Season) {
  const tiers = TIERS[season];
  let remaining = kwh,
    tierIdx = 0,
    energyCharge = 0;
  let prevLimit = 0;
  for (let i = 0; i < tiers.length && remaining > 0; i++) {
    const t = tiers[i];
    const tierKwh = Math.min(remaining, t.limit - prevLimit);
    if (tierKwh > 0) {
      energyCharge += Math.round(tierKwh * t.unit);
      tierIdx = i;
    }
    remaining -= tierKwh;
    prevLimit = t.limit;
  }
  const baseCharge = tiers[tierIdx].base;
  const subtotal = baseCharge + energyCharge;
  const vat = Math.round(subtotal * 0.1);
  const fund = Math.round(subtotal * 0.037);
  const total = subtotal + vat + fund;
  return { baseCharge, energyCharge, vat, fund, total };
}

function calcAirconKwh(watt: number, hours: number, acType: AcType) {
  const monthlyKwh = (watt / 1000) * hours * 30;
  return acType === 'inverter' ? Math.round(monthlyKwh * 0.5) : Math.round(monthlyKwh);
}

const COMPARE_HOURS = [2, 4, 6, 8, 10, 12, 24];

export default function AirconCalc() {
  const [acType, setAcType] = useState<AcType>('inverter');
  const [watt, setWatt] = useState(800);
  const [hours, setHours] = useState(8);
  const [baseUsage, setBaseUsage] = useState(200);
  const [season, setSeason] = useState<Season>('summer');

  // 에어컨 종류 변경 시 소비전력 기본값 연동
  const handleAcType = (t: AcType) => {
    setAcType(t);
    setWatt(t === 'inverter' ? 800 : 1500);
  };

  const acKwh = calcAirconKwh(watt, hours, acType);
  const totalKwh = baseUsage + acKwh;
  const totalBill = calcElectric(totalKwh, season);
  const baseBill = calcElectric(baseUsage, season);
  const extraCost = totalBill.total - baseBill.total;

  const seg = (
    opts: { label: string; value: string }[],
    current: string,
    set: (v: string) => void,
  ) => (
    <div className="flex flex-wrap gap-2">
      {opts.map((o) => (
        <button
          key={o.value}
          onClick={() => set(o.value)}
          className={`flex-1 min-w-[60px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${
            current === o.value
              ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]'
              : 'bg-white border-[var(--line)] text-[var(--sub)]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* 입력 */}
      <Card>
        <SectionTitle num="1">에어컨 정보</SectionTitle>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">에어컨 종류</label>
          {seg(
            [
              { label: '인버터형', value: 'inverter' },
              { label: '정속형', value: 'fixed' },
            ],
            acType,
            (v) => handleAcType(v as AcType),
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            소비전력{' '}
            <span className="text-xs text-[var(--sub)] font-medium ml-1">
              {watt.toLocaleString()}W
            </span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              value={watt}
              min={300}
              max={3000}
              onChange={(e) => setWatt(Math.max(300, Math.min(3000, +e.target.value || 300)))}
              className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"
            />
            <span className="text-sm font-bold text-[var(--sub)]">W</span>
          </div>
          <input
            type="range"
            min={300}
            max={3000}
            step={50}
            value={watt}
            onChange={(e) => setWatt(+e.target.value)}
            className="w-full mt-3.5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            하루 사용 시간{' '}
            <span className="text-xs text-[var(--sub)] font-medium ml-1">{hours}시간</span>
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              value={hours}
              min={1}
              max={24}
              onChange={(e) => setHours(Math.max(1, Math.min(24, +e.target.value || 1)))}
              className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"
            />
            <span className="text-sm font-bold text-[var(--sub)]">시간</span>
          </div>
          <input
            type="range"
            min={1}
            max={24}
            step={1}
            value={hours}
            onChange={(e) => setHours(+e.target.value)}
            className="w-full mt-3.5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            기존 사용량 (에어컨 제외){' '}
            <span className="text-xs text-[var(--sub)] font-medium ml-1">
              {baseUsage}kWh
            </span>
          </label>
          <p className="text-xs text-[var(--sub)] mb-2">
            에어컨 빼고 평소 월 전기 사용량
          </p>
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              value={baseUsage}
              min={50}
              max={500}
              onChange={(e) => setBaseUsage(Math.max(50, Math.min(500, +e.target.value || 50)))}
              className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"
            />
            <span className="text-sm font-bold text-[var(--sub)]">kWh</span>
          </div>
          <input
            type="range"
            min={50}
            max={500}
            step={10}
            value={baseUsage}
            onChange={(e) => setBaseUsage(+e.target.value)}
            className="w-full mt-3.5"
          />
        </div>

        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">적용 시기</label>
          {seg(
            [
              { label: '하계 (7~8월)', value: 'summer' },
              { label: '일반 (그 외)', value: 'normal' },
            ],
            season,
            (v) => setSeason(v as Season),
          )}
        </div>
      </Card>

      {/* 결과 - 에어컨 추가 비용 강조 */}
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">에어컨 전기요금 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-sm font-bold text-[var(--sub)]">에어컨 추가 전기요금</div>
          <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">
            {won(extraCost)}
          </div>
        </div>
        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
          <div className="flex justify-between">
            <span className="text-[var(--sub)] font-semibold">에어컨 월 소비 전력량</span>
            <span className="font-bold">{acKwh.toLocaleString()}kWh</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--sub)] font-semibold">에어컨 포함 총 전기요금</span>
            <span className="font-bold">{won(totalBill.total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--sub)] font-semibold">에어컨 없을 때 전기요금</span>
            <span className="font-bold">{won(baseBill.total)}</span>
          </div>
        </div>
      </div>

      {/* 요금 상세 */}
      <Card>
        <div className="text-[13px] font-extrabold mb-2">에어컨 포함 요금 상세</div>
        <div className="flex flex-col gap-2.5 text-[13.5px]">
          <div className="flex justify-between">
            <span className="text-[var(--sub)] font-semibold">총 사용량</span>
            <span className="font-bold">{totalKwh.toLocaleString()}kWh</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--sub)] font-semibold">기본요금</span>
            <span className="font-bold">{won(totalBill.baseCharge)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--sub)] font-semibold">전력량요금</span>
            <span className="font-bold">{won(totalBill.energyCharge)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--sub)] font-semibold">부가가치세 (10%)</span>
            <span className="font-bold">{won(totalBill.vat)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--sub)] font-semibold">전력산업기반기금 (3.7%)</span>
            <span className="font-bold">{won(totalBill.fund)}</span>
          </div>
        </div>
      </Card>

      {/* 사용시간별 비교 표 */}
      <Card>
        <div className="text-[13px] font-extrabold mb-2">사용시간별 요금 비교</div>
        <p className="text-xs text-[var(--sub)] mb-3">
          {acType === 'inverter' ? '인버터형' : '정속형'} {watt}W 기준, 기존 {baseUsage}kWh,{' '}
          {season === 'summer' ? '하계' : '일반'} 시기
        </p>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-[1.5px] border-[var(--line)]">
              <th className="text-left py-2 text-xs text-[var(--sub)] font-bold">하루 사용</th>
              <th className="text-right py-2 text-xs text-[var(--sub)] font-bold">
                에어컨 전력량
              </th>
              <th className="text-right py-2 text-xs text-[var(--sub)] font-bold">추가 요금</th>
              <th className="text-right py-2 text-xs text-[var(--sub)] font-bold">총 요금</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_HOURS.map((h) => {
              const hKwh = calcAirconKwh(watt, h, acType);
              const hTotal = calcElectric(baseUsage + hKwh, season);
              const hExtra = hTotal.total - baseBill.total;
              const isCurrent = h === hours;
              return (
                <tr
                  key={h}
                  className={`border-b border-[var(--line)] ${
                    isCurrent ? 'bg-[var(--primary-weak)]' : ''
                  }`}
                >
                  <td className="py-2 font-bold">{h}시간</td>
                  <td className="text-right py-2 font-bold">{hKwh}kWh</td>
                  <td className="text-right py-2 font-bold">{won(hExtra)}</td>
                  <td className="text-right py-2 font-bold">{won(hTotal.total)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* 누진제 구간표 */}
      <Card>
        <div className="text-[13px] font-extrabold mb-2">
          누진제 요금 구간표 ({season === 'summer' ? '하계' : '일반'})
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-[1.5px] border-[var(--line)]">
              <th className="text-left py-2 text-xs text-[var(--sub)] font-bold">구간</th>
              <th className="text-right py-2 text-xs text-[var(--sub)] font-bold">기본료</th>
              <th className="text-right py-2 text-xs text-[var(--sub)] font-bold">
                단가(원/kWh)
              </th>
            </tr>
          </thead>
          <tbody>
            {TIERS[season].map((t, i) => (
              <tr key={i} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">
                  {i + 1}구간 ({i === 0 ? '0' : TIERS[season][i - 1].limit + 1}~
                  {t.limit === Infinity ? '' : t.limit}kWh)
                </td>
                <td className="text-right py-2 font-bold">{t.base.toLocaleString()}원</td>
                <td className="text-right py-2 font-bold">{t.unit}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 가이드 콘텐츠 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">에어컨 전기요금이 비싼 이유</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          에어컨은 가정용 가전 중 소비전력이 가장 큰 제품입니다. 일반적으로 800W~2,500W의 전력을
          소비하며, 하루 8시간만 사용해도 월 수백 kWh가 추가됩니다. 문제는 한국의 주택용 전기요금이
          누진제를 적용한다는 점입니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          누진제란 사용량이 많을수록 단가가 높아지는 구조입니다. 예를 들어 평소 200kWh를 쓰던 가정이
          에어컨으로 200kWh가 추가되면, 추가분 대부분이 2~3구간 단가(214.6~307.3원/kWh)로 계산됩니다.
          단순히 사용량이 2배가 되는 것이 아니라, 요금은 3~4배로 뛸 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">인버터형 vs 정속형 에어컨 차이</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <strong>정속형(On/Off형)</strong>은 컴프레서가 항상 최대 출력으로 가동되다가 설정 온도에
          도달하면 완전히 멈추는 방식입니다. 켜짐과 꺼짐을 반복하므로 표기 소비전력에 가까운 전력을
          소비합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <strong>인버터형</strong>은 컴프레서 회전 속도를 자유롭게 조절합니다. 설정 온도에 가까워지면
          저속으로 전환하여 유지하므로, 실제 평균 소비전력이 표기의 40~60% 수준에 불과합니다. 같은
          냉방 성능에서 전기요금이 30~50% 절약되어, 현재 판매되는 대부분의 에어컨이 인버터형입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">여름 누진 완화 (7~8월 구간 확대)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          정부는 매년 여름철(7~8월) 냉방으로 인한 전기요금 폭탄을 완화하기 위해 누진제 구간을
          확대합니다. 일반 시기에는 1구간이 0~200kWh, 2구간이 201~400kWh이지만, 하계에는 1구간이
          0~300kWh, 2구간이 301~450kWh로 각각 확대됩니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          이 완화는 7~8월 사용분(8~9월 청구분)에 자동 적용되며, 별도 신청이 필요 없습니다. 다만 하계
          완화가 적용되더라도 사용량이 많으면 3구간(307.3원/kWh) 진입을 피하기 어렵기 때문에, 사용 습관
          개선이 함께 필요합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">에어컨 전기세 절약법 5가지</h2>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">
              1. 설정 온도 26도 유지
            </div>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              냉방 온도를 1도 올리면 전력 소비가 약 7% 줄어듭니다. 26도가 쾌적함과 절약의 균형점으로
              권장됩니다.
            </p>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">
              2. 선풍기·서큘레이터 병행
            </div>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              선풍기(40~50W)를 함께 사용하면 체감 온도가 2~3도 낮아져 에어컨 설정 온도를 높일 수
              있습니다. 에어컨 단독 사용 대비 30% 이상 절약 효과가 있습니다.
            </p>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">3. 필터 2주마다 청소</div>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              에어컨 필터에 먼지가 쌓이면 냉방 효율이 떨어져 같은 온도를 유지하는 데 더 많은 전력이
              소비됩니다. 2주 간격 필터 청소로 5~10% 절약이 가능합니다.
            </p>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">
              4. 제습 모드 활용
            </div>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              습도가 높고 기온이 크게 높지 않은 날에는 제습 모드가 효과적입니다. 컴프레서를 간헐적으로
              가동하므로 냉방 모드 대비 30~40% 전력을 아낄 수 있습니다.
            </p>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">
              5. 방 크기에 맞는 적정 용량 선택
            </div>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              방 크기보다 용량이 작은 에어컨은 풀가동 시간이 길어져 전기요금이 올라갑니다. 평수에 맞는
              적정 용량(8평 기준 6,600BTU, 10평 기준 9,900BTU)을 선택하세요.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">에어컨 소비전력 확인하는 법</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          에어컨의 소비전력은 제품 본체 옆면이나 뒷면에 부착된 <strong>제품 스티커(명판)</strong>에서
          확인할 수 있습니다. &apos;소비전력&apos; 또는 &apos;정격소비전력&apos; 항목에 W(와트) 단위로 표기되어
          있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          또한 <strong>에너지소비효율등급 라벨</strong>에서도 확인할 수 있습니다. 1등급에 가까울수록
          같은 냉방 능력 대비 소비전력이 낮습니다. 온라인 구매 시에는 제품 상세 스펙에서
          &apos;소비전력&apos; 항목을 확인하세요.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          인버터형 에어컨의 경우 표기된 소비전력은 최대 소비전력(정격)이며, 실제 사용 시에는
          운전 상황에 따라 40~60% 수준의 전력만 소비합니다. 이 계산기에서는 인버터형 선택 시
          표기 전력의 50%를 기본 적용합니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">
              Q. 에어컨 하루 10시간 틀면 전기요금이 얼마나 나오나요?
            </div>
            <div className="text-sm text-[#4E5968] leading-relaxed">
              A. 인버터형 에어컨(800W 표기) 기준으로 하루 10시간 사용 시 월 약 120kWh가 추가됩니다.
              기존 사용량 200kWh에 더하면 총 320kWh로, 하계 기준 약 4만~5만원 수준의 전기요금이
              예상됩니다. 위 계산기에서 사용 시간을 조절하여 정확한 금액을 확인하세요.
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">
              Q. 인버터 에어컨이 정말 전기세 절약이 되나요?
            </div>
            <div className="text-sm text-[#4E5968] leading-relaxed">
              A. 네. 인버터 에어컨은 설정 온도에 도달하면 컴프레서 회전수를 낮춰 최소한의 전력으로
              온도를 유지합니다. 같은 냉방 능력의 정속형 대비 월 전기요금이 30~50% 절약됩니다.
              초기 구매 비용은 높지만 여름 한 시즌 전기세 차이만으로도 충분히 보전됩니다.
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">
              Q. 여름 누진 완화는 자동으로 적용되나요?
            </div>
            <div className="text-sm text-[#4E5968] leading-relaxed">
              A. 네, 7~8월 사용분(8~9월 청구분)에 자동 적용됩니다. 별도 신청이 필요 없습니다.
              1구간이 200kWh에서 300kWh로, 2구간이 400kWh에서 450kWh로 확대되어 같은 사용량이라도
              요금이 줄어듭니다.
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">
              Q. 제습 모드가 냉방보다 전기세가 절약되나요?
            </div>
            <div className="text-sm text-[#4E5968] leading-relaxed">
              A. 제습 모드는 컴프레서를 간헐적으로 가동하여 습도를 낮추는 방식이므로, 냉방 모드 대비
              30~40% 전력을 절약합니다. 다만 폭염(35도 이상)에서는 냉방 효과가 부족할 수 있으므로,
              습도가 높고 기온이 크게 높지 않은 날에 활용하는 것이 좋습니다.
            </div>
          </div>
        </div>
      </Card>

      {/* 관련 계산기 링크 */}
      <Card>
        <div className="text-sm font-bold mb-2">관련 계산기</div>
        <Link
          href="/daily/electric"
          className="text-sm text-[var(--primary)] font-bold hover:underline"
        >
          전기요금 계산기 (누진제 전체 계산) &rarr;
        </Link>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <b className="text-[#6B7684]">계산 가정</b>
        <br />
        · 주택용(저압) 전기요금 기준 · 부가세 10%, 기반기금 3.7%
        <br />
        · 인버터형은 표기 소비전력의 50% 실사용 기준 적용
        <br />· 월 30일 기준 계산
        <div className="mt-3.5 bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          참고용 추정 도구입니다. 실제 전기요금은 에어컨 사용 환경, 외부 온도, 단열 상태 등에 따라
          달라질 수 있습니다. 정확한 요금은 한국전력공사(kepco.co.kr)에서 확인하세요.
        </div>
      </footer>
    </>
  );
}
