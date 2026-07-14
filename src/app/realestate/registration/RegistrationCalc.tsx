'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type HouseCount = '1' | '2' | '3+';

function getAcqTaxRate(priceMan: number, houseCount: HouseCount): number {
  if (houseCount === '3+') return 0.12;
  if (houseCount === '2') return 0.08;
  // 1주택
  if (priceMan <= 60000) return 0.01;
  if (priceMan <= 90000) {
    // 6~9억 구간: 1~3% 점진
    return 0.01 + ((priceMan - 60000) / 30000) * 0.02;
  }
  return 0.03;
}

function getStampDuty(priceMan: number): number {
  const priceWon = priceMan * 10000;
  if (priceWon <= 100000000) return 0;
  if (priceWon <= 1000000000) return 150000;
  return 350000;
}

function getNongTax(priceMan: number, area: number, houseCount: HouseCount, acqTax: number): number {
  // 전용면적 85㎡ 이하 1주택은 비과세
  if (houseCount === '1' && area <= 85) return 0;
  // 85㎡ 초과 또는 다주택: 취득세의 20% (6억 이하 면제 구간 제외)
  if (priceMan <= 60000 && houseCount === '1') return 0;
  return Math.round(acqTax * 0.2);
}

export default function RegistrationCalc() {
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [houseCount, setHouseCount] = useState<HouseCount>('1');

  const priceMan = +price || 0;
  const areaNum = +area || 0;
  const priceWon = priceMan * 10000;

  // 계산
  const acqTaxRate = getAcqTaxRate(priceMan, houseCount);
  const acqTax = Math.round(priceWon * acqTaxRate);
  const eduTax = Math.round(acqTax * 0.1);
  const nongTax = getNongTax(priceMan, areaNum, houseCount, acqTax);
  const stampDuty = getStampDuty(priceMan);
  const courtFee = 15000;
  const lawyerFee = priceMan <= 30000 ? 500000 : priceMan <= 100000 ? 600000 : 800000;
  const totalTax = acqTax + eduTax + nongTax + stampDuty + courtFee;
  const totalAll = totalTax + lawyerFee;

  const items = [
    { label: '취득세', amount: acqTax, note: `${(acqTaxRate * 100).toFixed(1)}%` },
    { label: '지방교육세', amount: eduTax, note: '취득세의 10%' },
    { label: '농어촌특별세', amount: nongTax, note: areaNum <= 85 && houseCount === '1' ? '면제 (85㎡ 이하)' : '취득세의 20%' },
    { label: '인지세', amount: stampDuty, note: priceWon <= 100000000 ? '면제 (1억 이하)' : '' },
    { label: '증지대', amount: courtFee, note: '고정' },
    { label: '법무사 수수료 (예상)', amount: lawyerFee, note: '셀프등기 시 절약 가능' },
  ];

  return (
    <>
      {/* 입력 */}
      <Card>
        <SectionTitle num="1">매매 정보 입력</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">매매가 (만원)</label>
            <input
              type="number"
              inputMode="numeric"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="예: 50000 (5억)"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">전용면적 (㎡)</label>
            <input
              type="number"
              inputMode="decimal"
              value={area}
              onChange={e => setArea(e.target.value)}
              placeholder="예: 84"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">주택 수</label>
            <div className="flex gap-2">
              {([['1', '1주택'], ['2', '2주택'], ['3+', '3주택 이상']] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setHouseCount(val)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${houseCount === val ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 결과 */}
      <Card className="!p-5">
        <div className="text-center mb-4">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">총 등기비용 (법무사 포함)</div>
          <div className="text-[40px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
            {totalAll.toLocaleString()}원
          </div>
          <div className="text-xs text-[var(--sub)] mt-1">세금·공과금 합계: {totalTax.toLocaleString()}원</div>
        </div>
        <div className="flex flex-col gap-1.5">
          {items.map(item => (
            <div key={item.label} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <div>
                <span className="text-[13px] font-semibold">{item.label}</span>
                {item.note && <span className="text-[10px] text-[var(--sub)] ml-1.5">({item.note})</span>}
              </div>
              <span className="text-[13px] font-bold tabular-nums">{item.amount.toLocaleString()}원</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 취득세율 참조표 */}
      <Card>
        <SectionTitle num="2">주택 취득세율 (2026)</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b-2 border-[var(--line)]">
                <th className="py-2 text-left text-[var(--sub)] font-bold">구분</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">6억 이하</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">6~9억</th>
                <th className="py-2 text-right text-[var(--sub)] font-bold">9억 초과</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1주택', '1%', '1~3%', '3%'],
                ['2주택', '8%', '8%', '8%'],
                ['3주택 이상', '12%', '12%', '12%'],
                ['법인', '12%', '12%', '12%'],
              ].map(([label, a, b, c]) => (
                <tr key={label as string} className="border-b border-[var(--line)]">
                  <td className="py-1.5 font-semibold">{label}</td>
                  <td className="py-1.5 text-right font-bold">{a}</td>
                  <td className="py-1.5 text-right font-bold">{b}</td>
                  <td className="py-1.5 text-right font-bold">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[10px] text-[var(--sub)] mt-2">조정대상지역 기준 · 비조정지역은 2주택 1~3%, 3주택 8%</div>
      </Card>

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 등기비용 가이드</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>등기 절차:</b> 매매계약 체결 → 잔금 지급 → 취득세 신고·납부(잔금일로부터 60일 이내) → 소유권이전등기 신청. 등기 신청은 관할 등기소에서 하며, 인터넷등기소(iros.go.kr)에서 등기부등본 확인이 가능합니다.</p>
          <p><b>셀프등기 vs 법무사:</b> 셀프등기는 법무사비 50~80만원을 절약할 수 있지만, 서류 준비(매도용 인감증명서, 위임장, 부동산거래계약신고필증 등)와 등기소 방문을 직접 해야 합니다. 서류 누락이나 오류 시 보정에 시간이 걸리므로, 첫 등기라면 법무사 의뢰를 권장합니다.</p>
          <p><b>필요 서류:</b> 매수인 - 주민등록등본, 가족관계증명서, 인감증명서, 인감도장, 주민등록초본(전입 예정인 경우). 매도인 - 등기권리증, 매도용 인감증명서, 주민등록초본, 인감도장. 공동 서류 - 부동산거래계약신고필증, 취득세 납부영수증.</p>
          <p><b>취득세 감면:</b> 생애 최초 주택 구입 시 200만원 한도 감면, 신혼부부(혼인 5년 이내) 추가 감면, 다자녀 가구(3자녀 이상) 감면 등이 있습니다. 전용면적 85㎡ 이하 주택은 농어촌특별세가 면제됩니다.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 등기비용에는 어떤 항목이 포함되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 취득세, 지방교육세, 농어촌특별세, 인지세, 증지대, 법무사 수수료가 포함됩니다. 매매가와 주택 수에 따라 세율이 달라지며, 가장 큰 비중은 취득세가 차지합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 셀프등기와 법무사 등기의 차이는 무엇인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 셀프등기는 법무사비(50~80만원)를 절약할 수 있지만, 서류 준비와 등기소 방문을 직접 해야 합니다. 실수 시 보정 절차가 필요하므로 첫 등기는 법무사를 추천합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 취득세 감면 혜택이 있나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 생애 첫 주택 구입 시 취득세 감면(200만원 한도), 신혼부부 감면, 다자녀 감면 등이 있습니다. 전용면적 85㎡ 이하 주택은 농어촌특별세가 면제됩니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          계산 결과는 참고용이며, 실제 등기비용은 관할 지자체와 법무사에 따라 다를 수 있습니다. 조정대상지역 여부, 감면 적용 등에 따라 세율이 달라질 수 있으므로 정확한 금액은 관할 구청 세무과에 확인하세요.
        </div>
      </footer>
    </>
  );
}
