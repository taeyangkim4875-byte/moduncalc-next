import { describe, it, expect } from 'vitest';
import {
  calcGiftMoney,
  snapToDenomination,
  resolveMealCost,
  findRelationship,
} from '../giftMoney';
import { RELATIONSHIPS, VENUE_OPTIONS, COMMON_DENOMINATIONS } from '@/data/giftMoney';

describe('데이터 정합성', () => {
  it('관계 key 가 중복되지 않는다', () => {
    const keys = RELATIONSHIPS.map((r) => r.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('모든 관계의 min 이 max 이하', () => {
    RELATIONSHIPS.forEach((r) => expect(r.min).toBeLessThanOrEqual(r.max));
  });

  it('설문 근거가 있다고 표시한 관계는 직장 동료뿐', () => {
    const backed = RELATIONSHIPS.filter((r) => r.surveyBacked).map((r) => r.key);
    expect(backed).toEqual(['coworker-distant', 'coworker-close']);
  });

  it('직접 입력 항목만 식대가 null 이다', () => {
    const nulls = VENUE_OPTIONS.filter((v) => v.mealCost === null).map((v) => v.key);
    expect(nulls).toEqual(['custom']);
  });

  it('흔히 쓰는 단위에 4·8만원이 없다 (홀수 관행)', () => {
    expect(COMMON_DENOMINATIONS).not.toContain(40000);
    expect(COMMON_DENOMINATIONS).not.toContain(80000);
  });
});

describe('단위 올림', () => {
  it('가까운 통용 단위로 올린다', () => {
    expect(snapToDenomination(59000)).toBe(70000);
    expect(snapToDenomination(100000)).toBe(100000);
    expect(snapToDenomination(118000)).toBe(150000);
  });
  it('목록을 넘으면 10만원 단위로 올린다', () => {
    expect(snapToDenomination(1_200_000)).toBe(1_200_000);
    expect(snapToDenomination(1_250_000)).toBe(1_300_000);
  });
  it('0 은 0', () => expect(snapToDenomination(0)).toBe(0));
});

describe('식대 확정', () => {
  it('전국 평균', () => expect(resolveMealCost('national')).toBe(59000));
  it('강남권', () => expect(resolveMealCost('gangnam')).toBe(85000));
  it('지방', () => expect(resolveMealCost('local')).toBe(44000));
  it('직접 입력', () => expect(resolveMealCost('custom', 120000)).toBe(120000));
  it('직접 입력인데 값이 없으면 0', () => expect(resolveMealCost('custom')).toBe(0));
  it('없는 키는 0', () => expect(resolveMealCost('nope')).toBe(0));
});

describe('기본 판정', () => {
  it('직장 동료 + 참석 + 전국 평균 식대', () => {
    const r = calcGiftMoney({
      relationshipKey: 'coworker-distant',
      attending: true,
      guests: 1,
      venueKey: 'national',
    });
    expect(r.mealCostPerPerson).toBe(59000);
    expect(r.totalMealCost).toBe(59000);
    // 관계 기준 하한 5만원 < 식대 5.9만원 → 식대가 하한이 된다
    expect(r.raisedByMealCost).toBe(true);
    expect(r.suggestedMin).toBe(70000);
    expect(r.surveyBacked).toBe(true);
  });

  it('강남 예식장이면 하한이 더 올라간다', () => {
    const r = calcGiftMoney({
      relationshipKey: 'coworker-distant',
      attending: true,
      guests: 1,
      venueKey: 'gangnam',
    });
    expect(r.totalMealCost).toBe(85000);
    expect(r.raisedByMealCost).toBe(true);
    expect(r.suggestedMin).toBe(100000);
  });

  it('지방 예식장은 관계 기준이 식대보다 높아 그대로 쓴다', () => {
    const r = calcGiftMoney({
      relationshipKey: 'coworker-distant',
      attending: true,
      guests: 1,
      venueKey: 'local',
    });
    expect(r.totalMealCost).toBe(44000);
    expect(r.raisedByMealCost).toBe(false);
    expect(r.suggestedMin).toBe(50000);
  });

  it('동반 인원이 늘면 식대도 배수로 늘어난다', () => {
    const r = calcGiftMoney({
      relationshipKey: 'friend-close',
      attending: true,
      guests: 2,
      venueKey: 'national',
    });
    expect(r.totalMealCost).toBe(118000);
    expect(r.suggestedMin).toBe(150000); // 11.8만 → 15만으로 올림
    expect(r.reasons.join()).toContain('2명이 식사하므로');
  });

  it('불참이면 식대를 반영하지 않고 범위가 내려간다', () => {
    const attend = calcGiftMoney({
      relationshipKey: 'friend-close',
      attending: true,
      guests: 1,
      venueKey: 'gangnam',
    });
    const absent = calcGiftMoney({
      relationshipKey: 'friend-close',
      attending: false,
      guests: 1,
      venueKey: 'gangnam',
    });
    expect(absent.totalMealCost).toBe(0);
    expect(absent.mealFloor).toBe(0);
    expect(absent.suggestedMax).toBeLessThan(attend.suggestedMax);
    expect(absent.reasons.join()).toContain('참석하지 않으면');
  });

  it('호텔 등 직접 입력 식대도 하한에 반영된다', () => {
    const r = calcGiftMoney({
      relationshipKey: 'coworker-close',
      attending: true,
      guests: 1,
      venueKey: 'custom',
      customMealCost: 180000,
    });
    expect(r.raisedByMealCost).toBe(true);
    expect(r.suggestedMin).toBe(200000);
  });
});

describe('근거 표시', () => {
  it('직장 동료는 설문 근거로 표시된다', () => {
    const r = calcGiftMoney({
      relationshipKey: 'coworker-close',
      attending: true,
      guests: 1,
      venueKey: 'national',
    });
    expect(r.surveyBacked).toBe(true);
    expect(r.reasons.join()).toContain('인크루트');
  });

  it('친구·친척은 설문이 아니라 통용 관행으로 표시된다', () => {
    ['friend-close', 'relative-close', 'sibling'].forEach((key) => {
      const r = calcGiftMoney({ relationshipKey: key, attending: true, guests: 1, venueKey: 'national' });
      expect(r.surveyBacked).toBe(false);
      expect(r.reasons.join()).toContain('통용 관행');
    });
  });

  it('식대가 범위 안이면 그렇다고 알려준다', () => {
    const r = calcGiftMoney({
      relationshipKey: 'friend-close',
      attending: true,
      guests: 1,
      venueKey: 'national',
    });
    expect(r.raisedByMealCost).toBe(false);
    expect(r.reasons.join()).toContain('범위 안에 들어옵니다');
  });
});

describe('방어', () => {
  it('없는 관계 key 면 범위가 0', () => {
    const r = calcGiftMoney({ relationshipKey: 'nope', attending: true, guests: 1, venueKey: 'national' });
    expect(r.relationship).toBeNull();
    expect(r.rangeMin).toBe(0);
  });

  it('인원이 0 이나 음수면 1명으로 본다', () => {
    const r = calcGiftMoney({ relationshipKey: 'friend-close', attending: true, guests: 0, venueKey: 'national' });
    expect(r.totalMealCost).toBe(59000);
  });

  it('제안 범위는 항상 min <= max', () => {
    RELATIONSHIPS.forEach((rel) => {
      VENUE_OPTIONS.forEach((v) => {
        [true, false].forEach((attending) => {
          const r = calcGiftMoney({
            relationshipKey: rel.key,
            attending,
            guests: 2,
            venueKey: v.key,
            customMealCost: 150000,
          });
          expect(r.suggestedMin).toBeLessThanOrEqual(r.suggestedMax);
        });
      });
    });
  });

  it('findRelationship 은 없는 키에 null', () => {
    expect(findRelationship('nope')).toBeNull();
    expect(findRelationship('sibling')?.label).toBe('형제 · 자매');
  });
});
