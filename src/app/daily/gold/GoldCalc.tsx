'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Unit = 'don' | 'g' | 'oz';

const UNIT_TO_G: Record<Unit, number> = {
  don: 3.75,
  g: 1,
  oz: 31.1035,
};

const UNIT_LABELS: Record<Unit, string> = {
  don: '돈',
  g: 'g',
  oz: 'oz',
};

const QUICK_REF = [
  { label: '1돈', g: 3.75 },
  { label: '3.75돈 (1냥)', g: 14.0625 },
  { label: '10돈', g: 37.5 },
  { label: '37.5g (10돈)', g: 37.5 },
  { label: '1oz', g: 31.1035 },
  { label: '100g', g: 100 },
];

export default function GoldCalc() {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<Unit>('don');
  const [goldPrice, setGoldPrice] = useState('115000');

  const weightNum = +weight || 0;
  const pricePerG = +goldPrice || 0;
  const weightInG = weightNum * UNIT_TO_G[unit];
  const totalPrice = Math.round(weightInG * pricePerG);

  return (
    <>
      {/* 입력 */}
      <Card>
        <SectionTitle num="1">금 무게·시세 입력</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">금 무게</label>
            <div className="flex gap-2">
              <input
                type="number"
                inputMode="decimal"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="무게 입력"
                className="flex-1 py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
              />
              <div className="flex gap-1">
                {(['don', 'g', 'oz'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${unit === u ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
                  >
                    {UNIT_LABELS[u]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">금 시세 (원/g)</label>
            <input
              type="number"
              inputMode="numeric"
              value={goldPrice}
              onChange={e => setGoldPrice(e.target.value)}
              placeholder="115000"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
            <div className="text-[10px] text-[var(--sub)] mt-1">현재 시세를 입력하세요. 기본값은 참고용입니다.</div>
          </div>
        </div>
      </Card>

      {/* 결과 */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">환산 금액</div>
          <div className="text-[40px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
            {totalPrice.toLocaleString()}원
          </div>
          <div className="text-xs text-[var(--sub)] mt-2">
            {weightNum > 0 && `${weightNum}${UNIT_LABELS[unit]} = ${weightInG.toFixed(2)}g`}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{weightInG.toFixed(2)}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">g</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{(weightInG / 3.75).toFixed(2)}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">돈</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{(weightInG / 31.1035).toFixed(4)}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">oz</div>
          </div>
        </div>
      </Card>

      {/* 빠른 참조 */}
      <Card>
        <SectionTitle num="2">주요 무게별 시세</SectionTitle>
        <div className="flex flex-col gap-1.5">
          {QUICK_REF.map(item => (
            <div key={item.label} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <span className="text-[13px] font-semibold">{item.label} ({item.g}g)</span>
              <span className="text-[13px] font-bold tabular-nums">{Math.round(item.g * pricePerG).toLocaleString()}원</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">금 1돈이 얼마인지 바로 환산할 수 있어요. 1돈 = 3.75g이에요. 돈, g, oz 단위를 자유롭게 변환해드려요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 금 1돈은 몇 그램인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 1돈 = 3.75g이에요. 1냥은 10돈(37.5g)이고요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 금 거래 시 세금이 있나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 골드바는 부가세 10%가 붙어요. KRX 금시장은 부가세 면제, 양도세 비과세라 투자 목적이면 유리해요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          금 시세는 실시간으로 변동됩니다. 기본값은 참고용이며, 실제 거래 시 금거래소나 은행의 현재 시세를 확인하세요.
        </div>
      </footer>
    </>
  );
}
