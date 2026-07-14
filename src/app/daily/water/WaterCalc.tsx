'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';
import { won } from '@/utils/format';

const BASE_FEES: Record<string, number> = { '15': 1080, '20': 3050, '25': 5930 };
const TIERS = [
  { max: 10, rate: 450 },
  { max: 20, rate: 790 },
  { max: 30, rate: 1180 },
  { max: 40, rate: 1580 },
  { max: 50, rate: 2140 },
  { max: Infinity, rate: 3120 },
];
const WATER_CHARGE_PER_M3 = 170;

function calcWaterUsageFee(usage: number) {
  let fee = 0;
  let remaining = usage;
  let prevMax = 0;
  for (const tier of TIERS) {
    const tierUsage = Math.min(remaining, tier.max - prevMax);
    if (tierUsage <= 0) break;
    fee += tierUsage * tier.rate;
    remaining -= tierUsage;
    prevMax = tier.max;
  }
  return fee;
}

export default function WaterCalc() {
  const [usage, setUsage] = useState(20);
  const [pipe, setPipe] = useState('15');

  const result = useMemo(() => {
    const u = usage || 0;
    const baseFee = BASE_FEES[pipe] || 1080;
    const usageFee = calcWaterUsageFee(u);
    const waterSupply = baseFee + usageFee;
    const sewage = waterSupply;
    const waterCharge = u * WATER_CHARGE_PER_M3;
    const total = waterSupply + sewage + waterCharge;

    const comparisons = [10, 20, 30, 40, 50].map(v => {
      const bf = BASE_FEES[pipe] || 1080;
      const uf = calcWaterUsageFee(v);
      const ws = bf + uf;
      const sw = ws;
      const wc = v * WATER_CHARGE_PER_M3;
      return { usage: v, total: ws + sw + wc };
    });

    return { baseFee, usageFee, waterSupply, sewage, waterCharge, total, comparisons };
  }, [usage, pipe]);

  return (
    <>
      <Card>
        <SectionTitle num="1">사용량 입력</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">월 사용량 <span className="text-xs text-[var(--sub)] font-medium ml-1">{usage}㎥</span></label>
          <input type="range" min={1} max={100} step={1} value={usage} onChange={e => setUsage(+e.target.value)} className="w-full" />
          <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1"><span>1㎥</span><span>1인(10㎥)</span><span>4인(20㎥)</span><span>100㎥</span></div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">수도 구경</label>
          <div className="flex gap-2">
            {[{ v: '15', l: '15mm (가정용)' }, { v: '20', l: '20mm' }, { v: '25', l: '25mm' }].map(o => (
              <button key={o.v} onClick={() => setPipe(o.v)} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-all ${pipe === o.v ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-[var(--line)] text-[var(--sub)]'}`}>{o.l}</button>
            ))}
          </div>
        </div>
      </Card>

      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">💧 수도요금 계산 결과</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">예상 총 수도요금</div>
            <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.total)}</div>
            <div className="text-sm text-[var(--sub)]">월 {usage}㎥ 사용 기준</div>
          </div>

          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">상수도 기본료</span><span className="font-bold">{won(result.baseFee)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">상수도 사용료</span><span className="font-bold">{won(result.usageFee)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">상수도 소계</span><span className="font-bold">{won(result.waterSupply)}</span></div>
            <div className="flex justify-between border-t border-[var(--line)] pt-2.5"><span className="text-[var(--sub)] font-semibold">하수도 요금</span><span className="font-bold">{won(result.sewage)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">물이용부담금</span><span className="font-bold">{won(result.waterCharge)}</span></div>
          </div>
        </div>

        {/* 사용량별 비교표 */}
        <Card>
          <SectionTitle num="📋">사용량별 요금 비교</SectionTitle>
          <table className="w-full border-collapse text-[13px]">
            <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">사용량</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">예상 요금</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">㎥당 단가</th></tr></thead>
            <tbody>
              {result.comparisons.map(c => (
                <tr key={c.usage} className={`border-b border-[var(--line)] ${c.usage === usage ? 'bg-[var(--primary-bg)]' : ''}`}>
                  <td className="py-2 font-bold">{c.usage}㎥</td>
                  <td className="py-2 text-right">{won(c.total)}</td>
                  <td className="py-2 text-right text-[var(--sub)]">{won(Math.round(c.total / c.usage))}/㎥</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <ShareButtons title="수도요금 계산 결과" />

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 수도요금 구조</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">수도요금은 크게 <b>상수도 요금</b>(기본료 + 사용료), <b>하수도 요금</b>, <b>물이용부담금</b>으로 구성됩니다. 상수도 사용료는 누진제가 적용되어 사용량이 많을수록 ㎥당 단가가 올라갑니다.</p>

        <h3 className="text-sm font-extrabold mb-2 mt-4">수도요금 절약법</h3>
        <ul className="text-sm text-[#4E5968] leading-relaxed list-disc pl-5 flex flex-col gap-1.5">
          <li><b>절수형 샤워헤드</b> 사용: 수압은 유지하면서 사용량 30~50% 절감 가능</li>
          <li><b>빨래 모아서 하기</b>: 세탁기 물 사용량은 횟수에 비례합니다</li>
          <li><b>설거지 물 받아서 하기</b>: 흘려보내는 것보다 60% 이상 절약</li>
          <li><b>변기 절수 장치</b>: 화장실 물 사용이 전체의 약 25%를 차지합니다</li>
        </ul>

        <h3 className="text-sm font-extrabold mb-2 mt-4">수도 검침 읽는 법</h3>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">수도 계량기의 검은색 숫자는 ㎥ 단위, 빨간색 숫자는 리터 단위입니다. 이번 달 검침 수치에서 지난달 수치를 빼면 월 사용량을 알 수 있습니다.</p>

        <h3 className="text-sm font-extrabold mb-2 mt-4">누수 확인법</h3>
        <p className="text-sm text-[#4E5968] leading-relaxed">모든 수도꼭지를 잠근 뒤 계량기를 확인하세요. 빨간 바늘이 움직이면 어딘가에서 누수가 발생하고 있는 것입니다. 변기에 식용 색소를 넣어 색이 변하면 변기 내부 누수입니다.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 수도요금은 지역마다 다른가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 지방자치단체마다 상수도 및 하수도 요금 체계가 다릅니다. 이 계산기는 서울 기준이며, 지방은 5~20% 차이가 날 수 있습니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 4인 가구 평균 수도 사용량은?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 4인 가구 기준 월 평균 약 18~22㎥ 정도 사용합니다. 1인당 약 5㎥ 수준입니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 하수도 요금은 왜 따로 부과되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 사용한 물을 하수처리장에서 정화하는 비용입니다. 상수도와 별도로 부과되며, 대부분 상수도 요금과 비슷한 수준입니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">서울시 기준 요금이며, 지역에 따라 다를 수 있습니다. 정확한 요금은 해당 지역 수도사업소에 문의하세요.</div>
      </footer>
    </>
  );
}
