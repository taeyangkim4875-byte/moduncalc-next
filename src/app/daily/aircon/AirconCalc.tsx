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

      <Card>
        <h2 className="text-base font-extrabold mb-2">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">에어컨 하루 8시간 틀면 전기세 얼마나 나올까? 인버터랑 정속형 차이도 꽤 커요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 인버터 에어컨이 정말 절약되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 정속형 대비 30~50% 절약돼요. 설정 온도에 도달하면 알아서 저전력으로 유지하거든요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 여름 누진 완화는 자동 적용되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 7~8월 사용분에 자동으로 적용돼요. 별도 신청 필요 없어요.</div>
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
