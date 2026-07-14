'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';

export default function CarTaxCalc() {
  const [cc, setCc] = useState(2000);
  const [year, setYear] = useState(2023);
  const [usage, setUsage] = useState<'personal' | 'business'>('personal');

  const currentYear = 2026;

  // 비영업용 세액 계산
  const calcPersonalTax = (displacement: number): number => {
    const d = displacement || 0;
    if (d <= 1000) return d * 80;
    if (d <= 1600) return d * 140;
    return d * 200;
  };

  // 영업용 세액 계산
  const calcBusinessTax = (displacement: number): number => {
    const d = displacement || 0;
    if (d <= 1600) return d * 18;
    if (d <= 2500) return d * 19;
    return d * 24;
  };

  const baseTax = usage === 'personal'
    ? calcPersonalTax(cc || 0)
    : calcBusinessTax(cc || 0);

  // 연식 경감률: 최초 등록 후 3년부터 매년 5%, 최대 50%
  const vehicleAge = currentYear - (year || 0);
  const discountYears = Math.max(0, vehicleAge - 2); // 3년차부터
  const discountRate = Math.min(50, discountYears * 5);
  const discountedTax = Math.round(baseTax * (1 - discountRate / 100));

  // 지방교육세: 자동차세의 30%
  const educationTax = Math.round(discountedTax * 0.3);
  const totalTax = discountedTax + educationTax;

  // 연납 할인 (1월 납부 시 약 4.58%)
  const annualPayDiscount = Math.round(totalTax * 0.0458);
  const annualPayTotal = totalTax - annualPayDiscount;

  const fmt = (n: number) => Math.round(n).toLocaleString();

  // 배기량별 비교
  const ccComparison = [800, 1000, 1500, 1600, 2000, 2500, 3000, 3500, 4000, 5000];

  return (
    <>
      <Card>
        <SectionTitle num="1">차량 정보</SectionTitle>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">배기량</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={cc} onChange={e => setCc(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">cc</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">최초 등록 연도 <span className="text-xs text-[var(--sub)] font-medium ml-1">{year}년 (차령 {vehicleAge}년)</span></label>
          <input type="range" min={2000} max={2026} step={1} value={year} onChange={e => setYear(+e.target.value)} className="w-full" />
          <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1"><span>2000</span><span>2010</span><span>2020</span><span>2026</span></div>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">용도</label>
          <div className="flex gap-2">
            <button onClick={() => setUsage('personal')} className={`flex-1 py-3 rounded-xl text-sm font-bold border-[1.5px] ${usage === 'personal' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>비영업용</button>
            <button onClick={() => setUsage('business')} className={`flex-1 py-3 rounded-xl text-sm font-bold border-[1.5px] ${usage === 'business' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>영업용</button>
          </div>
        </div>
      </Card>

      <div className="text-lg font-extrabold mt-4 mb-3 px-1">🚗 자동차세 계산 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-sm font-bold text-[var(--sub)]">연간 총 납부액</div>
          <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{fmt(totalTax)}원</div>
          <div className="text-sm text-[var(--sub)]">{(cc || 0).toLocaleString()}cc · {usage === 'personal' ? '비영업용' : '영업용'}</div>
        </div>

        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">기본 자동차세</span><span className="font-bold">{fmt(baseTax)}원</span></div>
          {discountRate > 0 && (
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">연식 경감 ({discountRate}%)</span><span className="font-bold text-[var(--green)]">-{fmt(baseTax - discountedTax)}원</span></div>
          )}
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">경감 후 자동차세</span><span className="font-bold">{fmt(discountedTax)}원</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">지방교육세 (30%)</span><span className="font-bold">{fmt(educationTax)}원</span></div>
          <div className="flex justify-between font-extrabold border-t border-[var(--line)] pt-2"><span>총 납부액</span><span>{fmt(totalTax)}원</span></div>
        </div>

        <div className="mt-4 border-t border-[var(--line)] pt-3.5">
          <div className="text-xs font-bold text-[var(--sub)] mb-2">납부 일정</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[var(--bg)] rounded-[14px] p-3 text-center">
              <div className="text-[16px] font-extrabold">{fmt(Math.ceil(totalTax / 2))}원</div>
              <div className="text-[10px] text-[var(--sub)] mt-0.5">1기분 (6월)</div>
            </div>
            <div className="bg-[var(--bg)] rounded-[14px] p-3 text-center">
              <div className="text-[16px] font-extrabold">{fmt(Math.floor(totalTax / 2))}원</div>
              <div className="text-[10px] text-[var(--sub)] mt-0.5">2기분 (12월)</div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-[#E8F5E9] rounded-[14px] p-3.5">
          <div className="text-xs font-bold text-[#2E7D32] mb-1">💡 연납 할인 (1월 일시 납부)</div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#4CAF50] font-semibold">할인 금액 (약 4.58%)</span>
            <span className="font-bold text-[#2E7D32]">-{fmt(annualPayDiscount)}원</span>
          </div>
          <div className="flex justify-between text-[13px] mt-1">
            <span className="text-[#4CAF50] font-semibold">연납 납부액</span>
            <span className="font-bold text-[#2E7D32]">{fmt(annualPayTotal)}원</span>
          </div>
        </div>
      </div>

      <ShareButtons title="자동차세 계산 결과" />

      <Card>
        <SectionTitle num="📋">배기량별 자동차세 비교 (비영업용, 신차 기준)</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">배기량</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">자동차세</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">교육세</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">합계</th>
            </tr>
          </thead>
          <tbody>
            {ccComparison.map(d => {
              const tax = calcPersonalTax(d);
              const edu = Math.round(tax * 0.3);
              return (
                <tr key={d} className={`border-b border-[var(--line)] ${d === (cc || 0) ? 'bg-[var(--primary-weak)]' : ''}`}>
                  <td className="py-2 font-bold">{d.toLocaleString()}cc</td>
                  <td className="py-2 text-right">{fmt(tax)}원</td>
                  <td className="py-2 text-right">{fmt(edu)}원</td>
                  <td className="py-2 text-right font-bold">{fmt(tax + edu)}원</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <Card>
        <SectionTitle num="📋">연식별 경감률</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">차령</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">경감률</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1~2년', '0%', '경감 없음'],
              ['3년', '5%', '경감 시작'],
              ['4년', '10%', ''],
              ['5년', '15%', ''],
              ['6년', '20%', ''],
              ['7년', '25%', ''],
              ['8년', '30%', ''],
              ['9년', '35%', ''],
              ['10년', '40%', ''],
              ['11년', '45%', ''],
              ['12년 이상', '50%', '최대 경감'],
            ].map(([age, rate, note]) => (
              <tr key={age} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{age}</td>
                <td className="py-2 text-right">{rate}</td>
                <td className="py-2 text-right text-[var(--sub)]">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 자동차세란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>자동차세</b>는 자동차를 소유한 사람에게 부과되는 지방세입니다. 매년 6월과 12월에 반기별로 납부하며, 배기량(cc)에 따라 세액이 결정됩니다. 자동차세에는 지방교육세(자동차세의 30%)가 함께 부과됩니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          비영업용 승용차는 배기량이 클수록 cc당 세액이 높아지는 누진 구조입니다. 1,000cc 이하는 cc당 80원, 1,600cc 이하는 140원, 1,600cc 초과는 200원이 적용됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 자동차세 납부 시기</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          자동차세는 연 2회 납부합니다. <b>1기분</b>은 6월 16일~30일, <b>2기분</b>은 12월 16일~31일에 납부합니다. 각 기분은 연세액의 절반입니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>연납(연세액 일시 납부)</b>을 신청하면 할인을 받을 수 있습니다. 1월에 납부하면 약 4.58% 할인, 3월은 약 3.76%, 6월은 약 2.52%, 9월은 약 1.26% 할인됩니다. 위택스(wetax.go.kr)에서 신청할 수 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 전기차 자동차세</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          전기자동차는 배기량이 없으므로 별도의 세액이 적용됩니다. 비영업용 전기차의 자동차세는 <b>연 10만원</b>으로 고정되어 있으며, 지방교육세 3만원을 합산하면 연 13만원입니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          2,000cc 내연기관 차량의 자동차세가 연 52만원(교육세 포함)인 것과 비교하면, 전기차의 자동차세는 4분의 1 수준에 불과합니다. 이는 전기차 보급을 촉진하기 위한 정책적 혜택입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 중고차 연식 경감</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          최초 등록 후 3년이 경과한 차량부터 매년 5%씩 자동차세가 경감됩니다. 최대 경감률은 50%로, 12년 이상 된 차량에 적용됩니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          예를 들어 2,000cc 차량의 기본 자동차세는 40만원이지만, 12년 이상 된 차량은 20만원으로 줄어듭니다. 중고차 구매 시 연식에 따른 자동차세 차이를 고려하면 유지비 계획에 도움이 됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 자동차세 연납 신청은 어떻게 하나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 위택스(wetax.go.kr) 또는 관할 구청 세무과에서 신청할 수 있습니다. 1월 16일~31일에 신청하면 약 4.58% 할인을 받을 수 있으며, 한 번 신청하면 다음 해에도 자동 적용됩니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 차량을 중간에 팔면 자동차세는?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 이전등록일 기준으로 소유 기간에 따라 일할 계산됩니다. 연납으로 미리 납부한 경우 남은 기간에 해당하는 세액이 환급됩니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 전기차 자동차세는 얼마인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 비영업용 전기차의 자동차세는 연 10만원(지방교육세 3만원 별도)으로 고정되어 있습니다. 배기량과 관계없이 동일합니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          비영업용 승용차 기준이며, 승합차·화물차·특수차는 다른 세율이 적용됩니다. 정확한 세액은 관할 구청 세무과에 문의하세요.
        </div>
      </footer>
    </>
  );
}
