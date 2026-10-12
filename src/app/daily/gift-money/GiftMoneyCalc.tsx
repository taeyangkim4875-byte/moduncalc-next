'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import MoneyInput from '@/components/MoneyInput';
import ShareButtons from '@/components/ShareButtons';
import { won } from '@/utils/format';
import { calcGiftMoney } from '@/utils/giftMoney';
import {
  RELATIONSHIPS,
  VENUE_OPTIONS,
  SURVEY_SOURCE,
  MEAL_COST_SOURCE,
  ODD_NUMBER_NOTE,
} from '@/data/giftMoney';

export default function GiftMoneyCalc() {
  const [relationshipKey, setRelationshipKey] = useState('coworker-distant');
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(1);
  const [venueKey, setVenueKey] = useState('national');
  const [customMealCost, setCustomMealCost] = useState(0);

  const result = useMemo(
    () => calcGiftMoney({ relationshipKey, attending, guests, venueKey, customMealCost }),
    [relationshipKey, attending, guests, venueKey, customMealCost],
  );

  const needsCustom = venueKey === 'custom';
  const ready = !needsCustom || customMealCost > 0;
  const sameAmount = result.suggestedMin === result.suggestedMax;

  return (
    <>
      <Card>
        <SectionTitle num="1">어떤 사이인가요</SectionTitle>
        <div className="grid grid-cols-1 gap-1.5">
          {RELATIONSHIPS.map(r => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRelationshipKey(r.key)}
              className={`flex items-center justify-between gap-2 px-3.5 py-3 rounded-xl text-left transition-colors ${
                relationshipKey === r.key
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--bg)] text-[var(--ink)]'
              }`}
            >
              <span className="text-sm font-bold">{r.label}</span>
              {r.surveyBacked && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded flex-none ${
                    relationshipKey === r.key ? 'bg-white/20 text-white' : 'bg-[#E6F8F0] text-[#00A05E]'
                  }`}
                >
                  설문
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">참석 여부와 식대</SectionTitle>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">예식에 참석하시나요?</label>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                attending ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
              }`}
            >
              참석해요
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                !attending ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
              }`}
            >
              못 가요
            </button>
          </div>
        </div>

        {attending && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">식사 인원 (본인 포함)</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setGuests(n)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      guests === n ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--sub)]'
                    }`}
                  >
                    {n}명
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-bold mb-2">예식장 수준</label>
              <div className="grid grid-cols-1 gap-1.5">
                {VENUE_OPTIONS.map(v => (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => setVenueKey(v.key)}
                    className={`px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                      venueKey === v.key ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg)] text-[var(--ink)]'
                    }`}
                  >
                    <span className="block text-sm font-bold">
                      {v.label}
                      {v.mealCost !== null && (
                        <span className="font-semibold"> · 1인 {won(v.mealCost)}</span>
                      )}
                    </span>
                    <span
                      className={`block text-[11px] mt-0.5 ${
                        venueKey === v.key ? 'text-white/80' : 'text-[var(--sub)]'
                      }`}
                    >
                      {v.note}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {needsCustom && (
              <div className="mt-3">
                <MoneyInput
                  label="1인당 식대"
                  value={customMealCost}
                  onChange={setCustomMealCost}
                  hint="청첩장이나 예식장 홈페이지에서 확인할 수 있습니다."
                  className=""
                />
              </div>
            )}
          </>
        )}
      </Card>

      {ready && result.relationship && (
        <Card>
          <div id="calc-result">
            <SectionTitle num="3">판단 근거</SectionTitle>

            <div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mb-4">
              <div className="text-xs font-bold text-[var(--primary-dark)]">이 정도가 무난합니다</div>
              <div className="text-[32px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-tight">
                {sameAmount
                  ? won(result.suggestedMin)
                  : `${won(result.suggestedMin)} ~ ${won(result.suggestedMax)}`}
              </div>
              <div className="text-xs text-[var(--sub)] mt-1">
                정답이 있는 금액은 아닙니다. 아래 근거를 보고 직접 정하세요.
              </div>
            </div>

            {attending && result.totalMealCost > 0 && (
              <div className="flex items-center justify-between py-2.5 border-b border-[var(--line)]">
                <span className="text-sm text-[#4E5968]">
                  식대 {guests > 1 ? `(${won(result.mealCostPerPerson)} × ${guests}명)` : ''}
                </span>
                <span className="text-sm font-bold text-[var(--ink)]">{won(result.totalMealCost)}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-2.5 border-b border-[var(--line)]">
              <span className="text-sm text-[#4E5968]">이 관계의 통용 범위</span>
              <span className="text-sm font-bold text-[var(--ink)]">
                {won(result.rangeMin)} ~ {won(result.rangeMax)}
              </span>
            </div>

            <ul className="mt-3 flex flex-col gap-2">
              {result.reasons.map((r, i) => (
                <li key={i} className="text-[13px] text-[#4E5968] leading-relaxed flex gap-2">
                  <span className="text-[var(--primary)] flex-none">·</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            {result.raisedByMealCost && (
              <div className="bg-[#FFF4E5] rounded-xl p-3.5 mt-3">
                <div className="text-sm font-bold text-[#B86E00] mb-1">식대가 기준을 끌어올렸습니다</div>
                <p className="text-[13px] text-[#4E5968] leading-relaxed m-0">
                  참석해서 식사까지 하는데 식대보다 적게 내면 축하를 받는 쪽이 오히려 손해를 봅니다.
                  부담스럽다면 참석하지 않고 마음만 전하는 선택지도 있습니다.
                </p>
              </div>
            )}

            <div
              className={`rounded-xl p-3.5 mt-3 ${
                result.surveyBacked ? 'bg-[#E6F8F0]' : 'bg-[var(--bg)]'
              }`}
            >
              <div
                className={`text-xs font-extrabold mb-1 ${
                  result.surveyBacked ? 'text-[#00A05E]' : 'text-[var(--sub)]'
                }`}
              >
                {result.surveyBacked ? '설문 데이터 기반' : '통용 관행 기반'}
              </div>
              <p className="text-[12px] text-[var(--sub)] leading-relaxed m-0">
                {result.surveyBacked
                  ? SURVEY_SOURCE
                  : '이 관계는 공신력 있는 설문을 찾지 못했습니다. 널리 통용되는 범위를 참고용으로 보여드리는 것이며, 집안과 지역 관행에 따라 크게 달라집니다.'}
                {attending && result.mealCostPerPerson > 0 && venueKey !== 'custom' && (
                  <>
                    <br />
                    식대 출처 · {MEAL_COST_SOURCE}
                  </>
                )}
              </p>
            </div>
          </div>

          <ShareButtons title="축의금 계산 결과" />
        </Card>
      )}

      {needsCustom && !ready && (
        <Card>
          <p className="text-sm text-[var(--sub)] leading-relaxed m-0">
            1인당 식대를 입력하면 판단 근거를 보여드립니다.
          </p>
        </Card>
      )}

      <div className="bg-[var(--bg)] rounded-xl p-3.5 text-xs text-[var(--sub)] leading-relaxed mb-3.5">
        {ODD_NUMBER_NOTE}
        <br />
        <br />
        축의금에는 법으로 정해진 기준이 없습니다. 이 계산기는 공개된 설문과 가격조사를 근거로
        <strong> 참고 범위</strong>를 보여줄 뿐이며, 실제 금액은 두 사람의 관계와 본인 형편에 따라
        정하시면 됩니다. 입력값은 브라우저에서만 처리되고 서버로 전송되지 않습니다.
      </div>
    </>
  );
}
