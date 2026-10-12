/**
 * 축의금 판단 (UI 비의존 순수 함수).
 *
 * 하나의 "적정 금액"을 내놓지 않는다. 축의금에는 정답이 없고,
 * 근거 없이 금액을 단정하면 지어낸 숫자가 된다.
 *
 * 대신 두 가지를 계산해 범위로 보여준다.
 *   하한 — 참석한다면 식대. 이보다 적게 내면 받는 쪽이 적자가 된다.
 *   분포 — 같은 관계에서 사람들이 실제로 내는 금액대.
 *
 * 각 수치가 설문 근거인지 통용 관행인지도 함께 돌려준다.
 */

import {
  RELATIONSHIPS,
  VENUE_OPTIONS,
  COMMON_DENOMINATIONS,
  type RelationshipOption,
} from '@/data/giftMoney';

export interface GiftMoneyInput {
  /** RELATIONSHIPS 의 key */
  relationshipKey: string;
  /** 예식에 참석하는지 */
  attending: boolean;
  /** 식사하는 인원 (본인 포함). 불참이면 무시된다. */
  guests: number;
  /** VENUE_OPTIONS 의 key */
  venueKey: string;
  /** venueKey 가 'custom' 일 때 쓰는 1인당 식대 */
  customMealCost?: number;
}

export interface GiftMoneyResult {
  relationship: RelationshipOption | null;
  /** 1인당 식대 */
  mealCostPerPerson: number;
  /** 식대 × 인원 */
  totalMealCost: number;
  /** 참석 시 하한선. 불참이면 0 */
  mealFloor: number;
  /** 관계별 통용 범위 */
  rangeMin: number;
  rangeMax: number;
  /** 최종 제안 범위 (흔히 쓰는 단위로 정리) */
  suggestedMin: number;
  suggestedMax: number;
  /** 식대 때문에 관계 기준보다 금액이 올라갔는지 */
  raisedByMealCost: boolean;
  /** 관계 금액이 설문으로 뒷받침되는지 */
  surveyBacked: boolean;
  /** 판단 근거 문장들 */
  reasons: string[];
}

function clean(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function findRelationship(key: string): RelationshipOption | null {
  return RELATIONSHIPS.find((r) => r.key === key) ?? null;
}

export function resolveMealCost(venueKey: string, customMealCost?: number): number {
  const venue = VENUE_OPTIONS.find((v) => v.key === venueKey);
  if (!venue) return 0;
  if (venue.mealCost === null) return clean(customMealCost ?? 0);
  return venue.mealCost;
}

/** 흔히 쓰는 축의금 단위로 올림. 목록을 넘어서면 10만원 단위로 올린다. */
export function snapToDenomination(amount: number): number {
  const v = clean(amount);
  if (v === 0) return 0;
  const hit = COMMON_DENOMINATIONS.find((d) => d >= v);
  if (hit !== undefined) return hit;
  return Math.ceil(v / 100000) * 100000;
}

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;

export function calcGiftMoney(input: GiftMoneyInput): GiftMoneyResult {
  const relationship = findRelationship(input.relationshipKey);
  const mealCostPerPerson = resolveMealCost(input.venueKey, input.customMealCost);
  const guests = input.attending ? Math.max(1, Math.floor(clean(input.guests)) || 1) : 0;
  const totalMealCost = input.attending ? mealCostPerPerson * guests : 0;
  const mealFloor = totalMealCost;

  const rangeMin = relationship?.min ?? 0;
  const rangeMax = relationship?.max ?? 0;

  const reasons: string[] = [];

  /* 불참이면 식대가 들지 않으므로 관계 기준의 아래쪽을 쓴다 */
  let baseMin = rangeMin;
  let baseMax = rangeMax;

  if (!input.attending) {
    baseMax = rangeMin > 0 ? Math.max(rangeMin, Math.round(rangeMax * 0.6)) : rangeMax;
    reasons.push('참석하지 않으면 식대가 들지 않으므로 같은 관계라도 조금 낮게 내는 것이 일반적입니다.');
  } else if (guests > 1) {
    reasons.push(`${guests}명이 식사하므로 1인 기준보다 식대 부담이 ${guests}배입니다.`);
  }

  /* 식대 하한 적용 — 참석하는데 식대보다 적게 내면 받는 쪽이 적자다 */
  let raisedByMealCost = false;
  if (input.attending && mealFloor > 0 && mealFloor > baseMin) {
    raisedByMealCost = true;
    baseMin = mealFloor;
    if (baseMax < baseMin) baseMax = baseMin;
    reasons.push(
      `식대가 ${won(totalMealCost)}이라 관계 기준(${won(rangeMin)})보다 높습니다. 참석한다면 식대 이상을 기준으로 잡는 편이 무난합니다.`,
    );
  } else if (input.attending && mealFloor > 0) {
    reasons.push(`식대 ${won(totalMealCost)}은 관계 기준 범위 안에 들어옵니다.`);
  }

  const suggestedMin = snapToDenomination(baseMin);
  const suggestedMax = Math.max(suggestedMin, snapToDenomination(baseMax));

  if (relationship) {
    reasons.push(relationship.basis);
  }

  return {
    relationship,
    mealCostPerPerson,
    totalMealCost,
    mealFloor,
    rangeMin,
    rangeMax,
    suggestedMin,
    suggestedMax,
    raisedByMealCost,
    surveyBacked: relationship?.surveyBacked ?? false,
    reasons,
  };
}
