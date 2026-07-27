'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const HOMELESS_OPTIONS = [
  { label: '1년 미만', score: 2 },
  { label: '1년 이상 ~ 2년 미만', score: 4 },
  { label: '2년 이상 ~ 3년 미만', score: 6 },
  { label: '3년 이상 ~ 4년 미만', score: 8 },
  { label: '4년 이상 ~ 5년 미만', score: 10 },
  { label: '5년 이상 ~ 6년 미만', score: 12 },
  { label: '6년 이상 ~ 7년 미만', score: 14 },
  { label: '7년 이상 ~ 8년 미만', score: 16 },
  { label: '8년 이상 ~ 9년 미만', score: 18 },
  { label: '9년 이상 ~ 10년 미만', score: 20 },
  { label: '10년 이상 ~ 11년 미만', score: 22 },
  { label: '11년 이상 ~ 12년 미만', score: 24 },
  { label: '12년 이상 ~ 13년 미만', score: 26 },
  { label: '13년 이상 ~ 14년 미만', score: 28 },
  { label: '14년 이상 ~ 15년 미만', score: 30 },
  { label: '15년 이상', score: 32 },
];

const FAMILY_OPTIONS = [
  { label: '0명', score: 5 },
  { label: '1명', score: 10 },
  { label: '2명', score: 15 },
  { label: '3명', score: 20 },
  { label: '4명', score: 25 },
  { label: '5명', score: 30 },
  { label: '6명 이상', score: 35 },
];

const ACCOUNT_OPTIONS = [
  { label: '6개월 미만', score: 1 },
  { label: '6개월 이상 ~ 1년 미만', score: 2 },
  { label: '1년 이상 ~ 2년 미만', score: 3 },
  { label: '2년 이상 ~ 3년 미만', score: 4 },
  { label: '3년 이상 ~ 4년 미만', score: 5 },
  { label: '4년 이상 ~ 5년 미만', score: 6 },
  { label: '5년 이상 ~ 6년 미만', score: 7 },
  { label: '6년 이상 ~ 7년 미만', score: 8 },
  { label: '7년 이상 ~ 8년 미만', score: 9 },
  { label: '8년 이상 ~ 9년 미만', score: 10 },
  { label: '9년 이상 ~ 10년 미만', score: 11 },
  { label: '10년 이상 ~ 11년 미만', score: 12 },
  { label: '11년 이상 ~ 12년 미만', score: 13 },
  { label: '12년 이상 ~ 13년 미만', score: 14 },
  { label: '13년 이상 ~ 14년 미만', score: 15 },
  { label: '14년 이상 ~ 15년 미만', score: 16 },
  { label: '15년 이상', score: 17 },
];

export default function SubscriptionCalc() {
  const [homelessIdx, setHomelessIdx] = useState(0);
  const [familyIdx, setFamilyIdx] = useState(0);
  const [accountIdx, setAccountIdx] = useState(0);

  const result = useMemo(() => {
    const homeless = HOMELESS_OPTIONS[homelessIdx].score;
    const family = FAMILY_OPTIONS[familyIdx].score;
    const account = ACCOUNT_OPTIONS[accountIdx].score;
    const total = homeless + family + account;

    let level: string;
    let levelColor: string;
    if (total >= 70) {
      level = '유리';
      levelColor = '#059669';
    } else if (total >= 60) {
      level = '보통';
      levelColor = '#F59E0B';
    } else {
      level = '어려움';
      levelColor = '#E5484D';
    }

    return { homeless, family, account, total, level, levelColor };
  }, [homelessIdx, familyIdx, accountIdx]);

  return (
    <>
      {/* 결과 */}
      <Card className="!p-5">
        <div className="text-center mb-4">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">총 가점</div>
          <div className="text-[56px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
            {result.total}<span className="text-xl text-[var(--sub)] font-bold">점</span>
          </div>
          <div className="text-sm text-[var(--sub)] font-bold mt-1">/ 84점 만점</div>
        </div>

        {/* 항목별 점수 */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[
            { label: '무주택', score: result.homeless, max: 32 },
            { label: '부양가족', score: result.family, max: 35 },
            { label: '청약통장', score: result.account, max: 17 },
          ].map((item) => (
            <div key={item.label} className="bg-[var(--bg)] rounded-xl p-3 text-center">
              <div className="text-[20px] font-extrabold text-[var(--ink)] tabular-nums">{item.score}<span className="text-[11px] text-[var(--sub)]">/{item.max}</span></div>
              <div className="text-[10px] text-[var(--sub)] font-bold mt-0.5">{item.label}</div>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mt-1.5">
                <div className="h-full rounded-full bg-[var(--primary)] transition-all" style={{ width: `${(item.score / item.max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* 당첨 가능성 */}
        <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
          <span className="text-xs font-bold text-[var(--sub)]">당첨 가능성: </span>
          <span className="text-sm font-extrabold" style={{ color: result.levelColor }}>{result.level}</span>
          <div className="text-[10px] text-[var(--sub)] mt-1">
            {result.total >= 70 && '가점이 높아 당첨 가능성이 높습니다. 인기 단지도 도전해보세요.'}
            {result.total >= 60 && result.total < 70 && '보통 수준입니다. 경쟁률이 낮은 단지를 노려보세요.'}
            {result.total < 60 && '가점이 낮아 가점제 당첨이 어려울 수 있습니다. 추첨제를 고려해보세요.'}
          </div>
        </div>
      </Card>

      {/* 입력 */}
      <Card>
        <SectionTitle num="1">무주택 기간 (만 32점)</SectionTitle>
        <select
          value={homelessIdx}
          onChange={(e) => setHomelessIdx(+e.target.value)}
          className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] bg-white"
        >
          {HOMELESS_OPTIONS.map((opt, i) => (
            <option key={i} value={i}>{opt.label} ({opt.score}점)</option>
          ))}
        </select>
        <div className="text-[10px] text-[var(--sub)] mt-1.5">만 30세 이상 무주택 세대구성원의 무주택 기간 (만 30세 미만 미혼은 0점)</div>
      </Card>

      <Card>
        <SectionTitle num="2">부양가족 수 (만 35점)</SectionTitle>
        <select
          value={familyIdx}
          onChange={(e) => setFamilyIdx(+e.target.value)}
          className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] bg-white"
        >
          {FAMILY_OPTIONS.map((opt, i) => (
            <option key={i} value={i}>{opt.label} ({opt.score}점)</option>
          ))}
        </select>
        <div className="text-[10px] text-[var(--sub)] mt-1.5">배우자, 직계존속(3년 이상 동일세대), 직계비속(미혼, 30세 미만)</div>
      </Card>

      <Card>
        <SectionTitle num="3">청약통장 가입 기간 (만 17점)</SectionTitle>
        <select
          value={accountIdx}
          onChange={(e) => setAccountIdx(+e.target.value)}
          className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold outline-none focus:border-[var(--primary)] bg-white"
        >
          {ACCOUNT_OPTIONS.map((opt, i) => (
            <option key={i} value={i}>{opt.label} ({opt.score}점)</option>
          ))}
        </select>
        <div className="text-[10px] text-[var(--sub)] mt-1.5">주택청약종합저축 또는 청약저축 가입 기간</div>
      </Card>

      {/* 가점 높이는 팁 */}
      <Card>
        <SectionTitle num="💡">가점 높이는 팁</SectionTitle>
        <div className="flex flex-col gap-2 text-[13px]">
          {[
            { title: '무주택 기간', tip: '만 30세부터 산정되므로 일찍 세대주가 되는 것이 유리합니다. 결혼 시 배우자 포함 무주택이어야 합니다.' },
            { title: '부양가족', tip: '배우자(1명) + 자녀 + 부모님 동거(3년 이상)로 가족 수를 늘릴 수 있습니다. 미혼자는 부양가족 0명으로 5점입니다.' },
            { title: '청약통장', tip: '가능한 한 빨리 가입하세요. 만 17세부터 가입 가능하며, 매월 2만~50만 원 납입합니다. 15년 이상이면 만점(17점)입니다.' },
          ].map((item) => (
            <div key={item.title} className="bg-[var(--bg)] rounded-xl p-3">
              <div className="font-bold text-[var(--ink)] mb-0.5">{item.title}</div>
              <div className="text-[var(--sub)] text-[12px]">{item.tip}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">청약 가점 몇 점인지 미리 알아두세요. 84점 만점이에요. 무주택 기간, 부양가족, 통장 가입 기간으로 계산해요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 가점제와 추첨제의 차이는?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 가점제는 점수 높은 순, 추첨제는 랜덤이에요. 85㎡ 이하 민영주택은 가점제 40~100% 적용돼요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 부양가족 수는 어떻게 세나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 배우자, 3년 이상 동일세대 부모, 30세 미만 미혼 자녀가 해당돼요. 배우자는 분리 시에도 인정돼요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          이 계산기는 2026년 기준 가점제 배점표를 바탕으로 합니다. 실제 청약 시에는 청약Home(applyhome.co.kr)에서 정확한 자격을 확인하세요.
        </div>
      </footer>
    </>
  );
}
