'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';

const PYEONG_TO_SQM = 3.3058;

export default function PyeongCalc() {
  const [direction, setDirection] = useState<'toSqm' | 'toPyeong'>('toSqm');
  const [value, setValue] = useState(33);

  const result = direction === 'toSqm'
    ? (value || 0) * PYEONG_TO_SQM
    : (value || 0) / PYEONG_TO_SQM;

  const fmt = (n: number) => parseFloat(n.toFixed(2)).toLocaleString();

  const quickRef = [
    { pyeong: 10, sqm: 33 },
    { pyeong: 15, sqm: 50 },
    { pyeong: 20, sqm: 66 },
    { pyeong: 24, sqm: 79 },
    { pyeong: 30, sqm: 99 },
    { pyeong: 33, sqm: 109 },
    { pyeong: 40, sqm: 132 },
    { pyeong: 50, sqm: 165 },
    { pyeong: 60, sqm: 198 },
  ];

  const aptRef = [
    { name: '24평형 (국민주택)', supply: '79㎡', exclusive: '59㎡', desc: '방 2~3개, 신혼부부 선호' },
    { name: '33평형', supply: '109㎡', exclusive: '84㎡', desc: '방 3개, 가장 인기 평형' },
    { name: '43평형', supply: '142㎡', exclusive: '114㎡', desc: '방 4개, 대형 평형' },
    { name: '51평형', supply: '169㎡', exclusive: '135㎡', desc: '방 4~5개, 프리미엄' },
  ];

  return (
    <>
      <Card>
        <SectionTitle num="1">변환 방향</SectionTitle>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setDirection('toSqm')} className={`flex-1 py-3 rounded-xl text-sm font-bold border-[1.5px] ${direction === 'toSqm' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>평 → ㎡</button>
          <button onClick={() => setDirection('toPyeong')} className={`flex-1 py-3 rounded-xl text-sm font-bold border-[1.5px] ${direction === 'toPyeong' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--sub)] border-[var(--line)]'}`}>㎡ → 평</button>
        </div>
        <div className="mb-0">
          <label className="block text-sm font-bold mb-2">{direction === 'toSqm' ? '평수' : '제곱미터(㎡)'}</label>
          <div className="flex items-center gap-2.5">
            <input type="number" value={value} onChange={e => setValue(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]" />
            <span className="text-sm font-bold text-[var(--sub)]">{direction === 'toSqm' ? '평' : '㎡'}</span>
          </div>
        </div>
      </Card>

      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-sm font-bold text-[var(--sub)]">변환 결과</div>
          <div className="text-[44px] font-extrabold text-[var(--primary-dark)] tracking-tight">{fmt(result)}</div>
          <div className="text-sm text-[var(--sub)]">{direction === 'toSqm' ? '㎡ (제곱미터)' : '평'}</div>
          <div className="text-xs text-[var(--sub)] mt-2">
            {direction === 'toSqm'
              ? `${fmt(value || 0)}평 = ${fmt(result)}㎡`
              : `${fmt(value || 0)}㎡ = ${fmt(result)}평`}
          </div>
        </div>
      </div>

      <ShareButtons title="평수 변환 결과" />

      <Card>
        <SectionTitle num="📋">평수 ↔ ㎡ 빠른 참조표</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">평</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">㎡</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">평</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">㎡</th>
            </tr>
          </thead>
          <tbody>
            {[
              [1, 3.3, 25, 82.6],
              [5, 16.5, 30, 99.2],
              [10, 33.1, 33, 109.1],
              [15, 49.6, 40, 132.2],
              [20, 66.1, 50, 165.3],
            ].map(([p1, s1, p2, s2]) => (
              <tr key={p1} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{p1}평</td>
                <td className="py-2 text-right">{s1}㎡</td>
                <td className="py-2 font-bold">{p2}평</td>
                <td className="py-2 text-right">{s2}㎡</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <SectionTitle num="📋">아파트 평형별 실제 면적</SectionTitle>
        <div className="flex flex-col gap-3">
          {aptRef.map(apt => (
            <div key={apt.name} className="bg-[var(--bg)] rounded-[14px] p-3.5">
              <div className="text-sm font-extrabold mb-1">{apt.name}</div>
              <div className="flex gap-4 text-[12px] text-[var(--sub)]">
                <span>공급: {apt.supply}</span>
                <span>전용: {apt.exclusive}</span>
              </div>
              <div className="text-[11px] text-[#8B95A1] mt-1">{apt.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 평이란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>평(坪)</b>은 일본에서 유래한 면적 단위로, 약 3.3058㎡에 해당합니다. 한국에서는 2007년부터 법적으로 ㎡(제곱미터)를 공식 단위로 사용하지만, 부동산 거래에서는 여전히 &apos;평&apos;이 널리 쓰이고 있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          1평은 가로·세로 약 1.82m(6자)의 정사각형 면적입니다. 다다미 2장 크기에 해당하며, 약 3.3㎡의 공간입니다. 일상 대화에서는 &apos;평&apos;이 직관적이어서 여전히 많이 사용됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 전용면적 vs 공급면적 vs 계약면적</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>전용면적</b>은 실제로 거주하는 공간의 면적입니다. 방, 거실, 주방, 화장실 등 세대 내부만 포함하며 벽체 중심선 기준으로 측정합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>공급면적</b>은 전용면적에 주거 공용면적(복도, 계단, 엘리베이터 등)을 더한 것입니다. 분양 광고에서 &apos;84㎡&apos;라고 하면 보통 이 공급면적을 의미합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>계약면적</b>은 공급면적에 기타 공용면적(주차장, 관리사무소 등)을 더한 것입니다. 분양 계약서에 기재되는 면적이지만, 실제 거주 공간과는 차이가 큽니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 한국 부동산에서 평수가 중요한 이유</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          한국에서 아파트 가격은 평당 가격으로 비교하는 것이 일반적입니다. 같은 지역이라도 평형에 따라 평당 가격이 다를 수 있으며, 일반적으로 중소형(24~33평)이 대형(43평 이상)보다 평당 가격이 높은 경향이 있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          아파트 분양 시 &apos;전용 84㎡&apos;라고 표기하더라도, 실제 체감하는 크기를 파악하려면 평수로 환산하는 것이 직관적입니다. 전용 84㎡는 약 25.4평이지만, 공급면적 기준으로는 33평형으로 불립니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 실제 아파트 크기 감잡기</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>24평형(전용 59㎡):</b> 방 2~3개, 화장실 1~2개. 신혼부부나 2인 가구에 적합합니다. 거실과 주방이 일체형인 경우가 많습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>33평형(전용 84㎡):</b> 방 3개, 화장실 2개. 4인 가족에 가장 인기 있는 평형입니다. 거실이 넓고 주방이 분리되어 있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>43평형(전용 114㎡):</b> 방 4개, 화장실 2개. 넓은 거실과 별도의 다용도실이 있는 대형 평형입니다. 주방이 독립적으로 구성됩니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 전용면적과 공급면적의 차이는?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 전용면적은 실제 거주하는 공간(방, 거실, 주방, 화장실)이고, 공급면적은 전용면적에 복도·계단·엘리베이터 등 공용면적을 더한 것입니다. 보통 전용면적은 공급면적의 70~80% 수준입니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 1평은 몇 제곱미터인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 1평은 정확히 3.3058㎡입니다. 간편하게 3.3㎡로 계산하기도 합니다. 반대로 1㎡는 약 0.3025평입니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 24평 아파트의 실제 크기는?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. &apos;24평형&apos;은 공급면적 79㎡를 의미하며, 전용면적은 약 59㎡(약 17.8평)입니다. 실제 거주 공간은 방 2~3개, 화장실 1~2개 규모입니다.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          1평 = 3.3058㎡ 기준으로 계산합니다. 실제 부동산 거래 시에는 등기부등본의 면적을 확인하세요.
        </div>
      </footer>
    </>
  );
}
