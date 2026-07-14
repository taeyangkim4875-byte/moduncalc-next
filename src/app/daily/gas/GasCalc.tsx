'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';
import { won } from '@/utils/format';

const RATES = {
  heating: { base: 1100, unit: 17.46 },
  cooking: { base: 880, unit: 18.10 },
};

export default function GasCalc() {
  const [purpose, setPurpose] = useState<'heating' | 'cooking' | 'both'>('heating');
  const [usage, setUsage] = useState(30);
  const [heatFactor, setHeatFactor] = useState(43.0);

  const result = useMemo(() => {
    const u = usage || 0;
    const factor = heatFactor || 43.0;
    const mj = u * factor;

    let baseFee = 0;
    let usageFee = 0;

    if (purpose === 'both') {
      const heatingUsage = u * 0.7;
      const cookingUsage = u * 0.3;
      const heatingMj = heatingUsage * factor;
      const cookingMj = cookingUsage * factor;
      baseFee = RATES.heating.base + RATES.cooking.base;
      usageFee = heatingMj * RATES.heating.unit + cookingMj * RATES.cooking.unit;
    } else {
      const r = RATES[purpose];
      baseFee = r.base;
      usageFee = mj * r.unit;
    }

    const subtotal = baseFee + usageFee;
    const vat = Math.round(subtotal * 0.1);
    const total = subtotal + vat;

    const calcSeason = (su: number) => {
      const smj = su * factor;
      const p = purpose as string;
      if (p === 'both') {
        const sb = RATES.heating.base + RATES.cooking.base;
        const suf = su * 0.7 * factor * RATES.heating.unit + su * 0.3 * factor * RATES.cooking.unit;
        return Math.round((sb + suf) * 1.1);
      }
      const r = RATES[purpose === 'both' ? 'heating' : purpose];
      return Math.round((r.base + smj * r.unit) * 1.1);
    };
    const summer = calcSeason(5);
    const winter = calcSeason(80);

    return { mj, baseFee, usageFee, vat, total, summer, winter };
  }, [usage, purpose, heatFactor]);

  return (
    <>
      <Card>
        <SectionTitle num="1">사용 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">용도</label>
          <div className="flex gap-2">
            {[{ v: 'heating' as const, l: '난방용' }, { v: 'cooking' as const, l: '취사용' }, { v: 'both' as const, l: '전체(합산)' }].map(o => (
              <button key={o.v} onClick={() => setPurpose(o.v)} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-all ${purpose === o.v ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-[var(--line)] text-[var(--sub)]'}`}>{o.l}</button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">월 사용량 <span className="text-xs text-[var(--sub)] font-medium ml-1">{usage}㎥</span></label>
          <input type="range" min={0} max={200} step={1} value={usage} onChange={e => setUsage(+e.target.value)} className="w-full" />
          <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1"><span>0㎥</span><span>여름(5㎥)</span><span>봄가을(30㎥)</span><span>겨울(80㎥+)</span></div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">열량환산계수 <span className="text-xs text-[var(--sub)] font-medium ml-1">{heatFactor} MJ/㎥</span></label>
          <input type="number" value={heatFactor} onChange={e => setHeatFactor(+e.target.value)} className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
          <div className="text-xs text-[var(--sub)] mt-1">고시 열량 = {result.mj.toFixed(0)} MJ ({usage}㎥ × {heatFactor} MJ/㎥)</div>
        </div>
      </Card>

      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">🔥 가스요금 계산 결과</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">예상 총 가스요금</div>
            <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.total)}</div>
            <div className="text-sm text-[var(--sub)]">월 {usage}㎥ · {purpose === 'heating' ? '난방용' : purpose === 'cooking' ? '취사용' : '합산'} 기준</div>
          </div>

          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">기본료</span><span className="font-bold">{won(result.baseFee)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">사용료</span><span className="font-bold">{won(result.usageFee)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">부가세 (10%)</span><span className="font-bold">{won(result.vat)}</span></div>
          </div>

          <div className="mt-4 border-t border-[var(--line)] pt-3.5">
            <div className="text-xs font-bold text-[var(--sub)] mb-2.5">계절별 예상 비교</div>
            <div className="flex gap-3">
              <div className="flex-1 bg-[#E3F2FD] rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">☀️</div>
                <div className="text-[11px] text-[var(--sub)] font-bold">여름 (5㎥)</div>
                <div className="text-sm font-extrabold mt-1">{won(result.summer)}</div>
              </div>
              <div className="flex-1 bg-[#FFF3E0] rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">🍂</div>
                <div className="text-[11px] text-[var(--sub)] font-bold">현재 ({usage}㎥)</div>
                <div className="text-sm font-extrabold mt-1">{won(result.total)}</div>
              </div>
              <div className="flex-1 bg-[#E8EAF6] rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">❄️</div>
                <div className="text-[11px] text-[var(--sub)] font-bold">겨울 (80㎥)</div>
                <div className="text-sm font-extrabold mt-1">{won(result.winter)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareButtons title="가스요금 계산 결과" />

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 도시가스 요금 구조</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">도시가스 요금은 <b>기본료 + 사용료 + 부가세(10%)</b>로 구성됩니다. 사용료는 ㎥를 MJ(메가줄)로 환산한 뒤 단가를 곱합니다. 열량환산계수는 지역·시기에 따라 다르며 도시가스 고지서에서 확인할 수 있습니다.</p>

        <h3 className="text-sm font-extrabold mb-2 mt-4">겨울 난방비 절약법 5가지</h3>
        <ul className="text-sm text-[#4E5968] leading-relaxed list-disc pl-5 flex flex-col gap-1.5">
          <li><b>보일러 외출 모드 활용</b>: 완전히 끄는 것보다 외출 모드(10~15도)가 재가동 시 에너지를 절약합니다</li>
          <li><b>문풍지·단열 필름</b>: 창문 틈새로 열 손실이 30% 이상 발생합니다</li>
          <li><b>내복 착용</b>: 실내 온도를 1도 낮추면 난방비 약 7% 절감됩니다</li>
          <li><b>보일러 배관 청소</b>: 2~3년마다 배관 세척 시 열효율이 10~20% 개선됩니다</li>
          <li><b>실내 적정 온도 유지</b>: 난방 적정 온도는 18~20도, 취침 시 15~17도입니다</li>
        </ul>

        <h3 className="text-sm font-extrabold mb-2 mt-4">보일러 효율 높이는 법</h3>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">보일러가 10년 이상 되었다면 콘덴싱 보일러로 교체를 고려하세요. 기존 보일러 대비 15~20% 가스비를 절약할 수 있습니다. 정부 에너지효율 리베이트를 활용하면 교체 비용 일부를 지원받을 수 있습니다.</p>

        <h3 className="text-sm font-extrabold mb-2 mt-4">에너지 캐시백</h3>
        <p className="text-sm text-[#4E5968] leading-relaxed">한국에너지공단의 <b>에너지 캐시백</b> 제도를 이용하면 전년 동기 대비 에너지 사용량을 줄인 가구에 캐시백을 지급합니다. 한국에너지공단 홈페이지에서 신청할 수 있습니다.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 열량환산계수란?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 가스 1㎥당 발생하는 열량(MJ)입니다. 지역·계절에 따라 42~44 MJ/㎥ 범위이며, 가스 고지서에서 확인할 수 있습니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 난방용과 취사용 요금이 다른 이유는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 용도별로 공급 원가와 기본료가 다르게 책정됩니다. 취사용이 소량 사용이지만 단가가 약간 높은 편입니다.</div></div>
          <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 겨울 난방비가 갑자기 많이 나온 이유는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 난방 사용량 증가뿐 아니라 열량환산계수가 겨울에 높아지는 경향이 있어 이중으로 요금이 올라갑니다. 또한 배관 노후로 열효율이 떨어질 수 있습니다.</div></div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">서울도시가스 기준 요금이며, 지역·가스회사에 따라 다를 수 있습니다. 정확한 요금은 해당 도시가스 회사에 문의하세요.</div>
      </footer>
    </>
  );
}
