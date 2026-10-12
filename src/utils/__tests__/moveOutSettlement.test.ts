import { describe, it, expect } from 'vitest';
import {
  calcMoveOutSettlement,
  calcLongTermRepair,
  calcRentProration,
  calcMaintenanceProration,
  daysInMonth,
  emptyMoveOutInput,
  roundWon,
  buildSettlementLetter,
} from '../moveOutSettlement';

describe('일수 산정', () => {
  it('30일 달', () => expect(daysInMonth(2026, 4)).toBe(30));
  it('31일 달', () => expect(daysInMonth(2026, 1)).toBe(31));
  it('평년 2월', () => expect(daysInMonth(2026, 2)).toBe(28));
  it('윤년 2월', () => expect(daysInMonth(2028, 2)).toBe(29));
});

describe('반올림 규칙', () => {
  it('원 단위 반올림', () => {
    expect(roundWon(1000.4)).toBe(1000);
    expect(roundWon(1000.5)).toBe(1001);
  });
  it('NaN 은 0', () => expect(roundWon(NaN)).toBe(0));
});

describe('장기수선충당금', () => {
  it('총액 직접 입력', () => {
    const r = calcLongTermRepair({ mode: 'total', total: 384000 });
    expect(r.amount).toBe(384000);
    expect(r.formula).toContain('납부확인서');
  });

  it('추정: 단일 구간', () => {
    const r = calcLongTermRepair({
      mode: 'estimate',
      periods: [{ monthlyAmount: 8000, months: 24 }],
    });
    expect(r.amount).toBe(192000);
    expect(r.months).toBe(24);
  });

  it('추정: 월 금액이 바뀐 구간 합산', () => {
    const r = calcLongTermRepair({
      mode: 'estimate',
      periods: [
        { monthlyAmount: 8000, months: 12 },
        { monthlyAmount: 9500, months: 12 },
      ],
    });
    expect(r.amount).toBe(8000 * 12 + 9500 * 12); // 210,000
    expect(r.months).toBe(24);
    expect(r.formula).toContain('+');
  });

  it('빈 구간은 무시한다', () => {
    const r = calcLongTermRepair({
      mode: 'estimate',
      periods: [
        { monthlyAmount: 8000, months: 12 },
        { monthlyAmount: 0, months: 5 },
        { monthlyAmount: 9000, months: 0 },
      ],
    });
    expect(r.amount).toBe(96000);
    expect(r.months).toBe(12);
  });
});

describe('퇴거월 월세 일할', () => {
  const moveOut = { year: 2026, month: 3, moveOutDay: 15 }; // 31일 달

  it('후불이면 산 날만큼 공제', () => {
    const r = calcRentProration(1_000_000, moveOut, 'arrears');
    expect(r.isRefund).toBe(false);
    expect(r.amount).toBe(roundWon((1_000_000 * 15) / 31)); // 483,871
    expect(r.amount).toBe(483871);
  });

  it('선불이면 안 산 날만큼 환급', () => {
    const r = calcRentProration(1_000_000, moveOut, 'prepaid');
    expect(r.isRefund).toBe(true);
    expect(r.amount).toBe(roundWon((1_000_000 * 16) / 31)); // 516,129
    expect(r.amount).toBe(516129);
  });

  it('선불 + 후불 금액을 더하면 월세 전액이 된다', () => {
    const a = calcRentProration(1_000_000, moveOut, 'arrears').amount;
    const p = calcRentProration(1_000_000, moveOut, 'prepaid').amount;
    expect(a + p).toBe(1_000_000);
  });

  it('2월 퇴거 (28일)', () => {
    const r = calcRentProration(700_000, { year: 2026, month: 2, moveOutDay: 10 }, 'arrears');
    expect(r.amount).toBe(roundWon((700_000 * 10) / 28)); // 250,000
    expect(r.amount).toBe(250000);
  });

  it('윤년 2월 퇴거 (29일)', () => {
    const r = calcRentProration(700_000, { year: 2028, month: 2, moveOutDay: 10 }, 'arrears');
    expect(r.amount).toBe(roundWon((700_000 * 10) / 29)); // 241,379
  });

  it('말일 퇴거는 후불 전액 / 선불 환급 0', () => {
    const last = { year: 2026, month: 4, moveOutDay: 30 };
    expect(calcRentProration(900_000, last, 'arrears').amount).toBe(900_000);
    expect(calcRentProration(900_000, last, 'prepaid').amount).toBe(0);
  });

  it('퇴거일이 그 달 일수를 넘으면 말일로 본다', () => {
    const r = calcRentProration(900_000, { year: 2026, month: 2, moveOutDay: 31 }, 'arrears');
    expect(r.amount).toBe(900_000);
  });
});

describe('퇴거월 관리비 일할', () => {
  it('30일 달 중간 퇴거', () => {
    const r = calcMaintenanceProration(150_000, { year: 2026, month: 4, moveOutDay: 10 });
    expect(r.amount).toBe(roundWon((150_000 * 10) / 30)); // 50,000
    expect(r.amount).toBe(50000);
  });

  it('31일 달 중간 퇴거', () => {
    const r = calcMaintenanceProration(150_000, { year: 2026, month: 3, moveOutDay: 10 });
    expect(r.amount).toBe(roundWon((150_000 * 10) / 31)); // 48,387
    expect(r.amount).toBe(48387);
  });
});

describe('전체 정산', () => {
  it('일반적인 월세 퇴거 — 받을 금액이 남는 경우', () => {
    const r = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 10_000_000,
      longTermRepair: { mode: 'total', total: 384_000 },
      prepaidMaintenanceDeposit: 100_000,
      moveOut: { year: 2026, month: 3, moveOutDay: 15 },
      monthlyRent: 600_000,
      rentPaymentType: 'arrears',
      monthlyMaintenance: 120_000,
      unpaidUtilities: [{ label: '전기요금', amount: 45_000 }],
      agreedDeductions: [{ label: '벽지 교체', amount: 200_000 }],
    });

    expect(r.totalReceivable).toBe(10_000_000 + 384_000 + 100_000); // 10,484,000
    const rentPart = roundWon((600_000 * 15) / 31); // 290,323
    const feePart = roundWon((120_000 * 15) / 31); // 58,065
    expect(r.totalDeduction).toBe(rentPart + feePart + 45_000 + 200_000);
    expect(r.netAmount).toBe(r.totalReceivable - r.totalDeduction);
    expect(r.tenantOwes).toBe(false);
    expect(r.longTermRepairEstimated).toBe(false);
  });

  it('선불 월세는 받을 금액 쪽에 들어간다', () => {
    const r = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 5_000_000,
      moveOut: { year: 2026, month: 3, moveOutDay: 10 },
      monthlyRent: 620_000,
      rentPaymentType: 'prepaid',
    });
    const refund = roundWon((620_000 * 21) / 31);
    expect(r.receivables.some((l) => l.key === 'rent-proration')).toBe(true);
    expect(r.deductions.some((l) => l.key === 'rent-proration')).toBe(false);
    expect(r.totalReceivable).toBe(5_000_000 + refund);
  });

  it('공제 항목 여러 개가 모두 반영된다', () => {
    const r = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 3_000_000,
      unpaidRent: 500_000,
      unpaidUtilities: [
        { label: '전기요금', amount: 40_000 },
        { label: '가스요금', amount: 35_000 },
        { label: '수도요금', amount: 15_000 },
      ],
      agreedDeductions: [
        { label: '도배', amount: 300_000 },
        { label: '청소비', amount: 150_000 },
      ],
    });
    expect(r.deductions).toHaveLength(6);
    expect(r.totalDeduction).toBe(500_000 + 40_000 + 35_000 + 15_000 + 300_000 + 150_000);
    expect(r.netAmount).toBe(3_000_000 - 1_040_000);
  });

  it('결과가 음수면 임차인이 더 내야 한다', () => {
    const r = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 500_000,
      unpaidRent: 1_200_000,
      agreedDeductions: [{ label: '파손 수리', amount: 800_000 }],
    });
    expect(r.netAmount).toBe(500_000 - 2_000_000);
    expect(r.netAmount).toBeLessThan(0);
    expect(r.tenantOwes).toBe(true);
  });

  it('추정 모드면 납부확인서 안내 플래그가 켜진다', () => {
    const r = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 1_000_000,
      longTermRepair: { mode: 'estimate', periods: [{ monthlyAmount: 8_000, months: 24 }] },
    });
    expect(r.longTermRepairEstimated).toBe(true);
    expect(r.longTermRepairMonths).toBe(24);
    const line = r.receivables.find((l) => l.key === 'long-term-repair');
    expect(line?.note).toContain('납부확인서');
  });

  it('전세(월세 0)면 월세 일할을 건너뛴다', () => {
    const r = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 200_000_000,
      monthlyRent: 0,
      moveOut: { year: 2026, month: 3, moveOutDay: 15 },
      monthlyMaintenance: 130_000,
    });
    expect(r.receivables.some((l) => l.key === 'rent-proration')).toBe(false);
    expect(r.deductions.some((l) => l.key === 'rent-proration')).toBe(false);
    // 관리비 일할은 전세에도 적용된다
    expect(r.deductions.some((l) => l.key === 'maintenance-proration')).toBe(true);
  });

  it('빈 입력이면 전부 0', () => {
    const r = calcMoveOutSettlement(emptyMoveOutInput());
    expect(r.totalReceivable).toBe(0);
    expect(r.totalDeduction).toBe(0);
    expect(r.netAmount).toBe(0);
    expect(r.tenantOwes).toBe(false);
    expect(r.receivables).toHaveLength(0);
  });

  it('음수·NaN 입력은 0으로 처리한다', () => {
    const r = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: -5_000_000,
      unpaidRent: NaN,
      agreedDeductions: [{ label: '잘못된 값', amount: -100 }],
    });
    expect(r.totalReceivable).toBe(0);
    expect(r.totalDeduction).toBe(0);
  });

  it('라벨이 비어 있으면 기본 이름을 쓴다', () => {
    const r = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 1_000_000,
      agreedDeductions: [{ label: '   ', amount: 50_000 }],
    });
    expect(r.deductions[0].label).toBe('합의 공제');
  });
});

describe('정산 요청서 문구', () => {
  const base = calcMoveOutSettlement({
    ...emptyMoveOutInput(),
    deposit: 10_000_000,
    longTermRepair: { mode: 'total', total: 384_000 },
    agreedDeductions: [{ label: '벽지 교체', amount: 200_000 }],
  });

  it('받을 금액·공제·최종 금액이 모두 들어간다', () => {
    const t = buildSettlementLetter(base);
    expect(t).toContain('[받을 금액]');
    expect(t).toContain('임대차 보증금: 10,000,000원');
    expect(t).toContain('장기수선충당금 대납액: 384,000원');
    expect(t).toContain('[공제할 금액]');
    expect(t).toContain('벽지 교체: 200,000원');
    expect(t).toContain('[최종 반환받을 금액] 10,184,000원');
  });

  it('장기수선충당금이 있으면 법령 근거와 확인서 문구가 붙는다', () => {
    const t = buildSettlementLetter(base);
    expect(t).toContain('공동주택관리법 시행령 제31조 제8항');
    expect(t).toContain('납부확인서를 첨부합니다');
  });

  it('추정 모드면 확인서를 받아 첨부하겠다는 문구로 바뀐다', () => {
    const est = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 1_000_000,
      longTermRepair: { mode: 'estimate', periods: [{ monthlyAmount: 8_000, months: 24 }] },
    });
    const t = buildSettlementLetter(est);
    expect(t).toContain('추정치이며');
    expect(t).toContain('받아 첨부하겠습니다');
  });

  it('장기수선충당금이 없으면 관련 문구가 나오지 않는다', () => {
    const none = calcMoveOutSettlement({ ...emptyMoveOutInput(), deposit: 1_000_000 });
    expect(buildSettlementLetter(none)).not.toContain('공동주택관리법');
  });

  it('선택 정보를 넣으면 반영되고, 비우면 나오지 않는다', () => {
    const withParty = buildSettlementLetter(base, {
      address: '서울시 ○○구 ○○아파트 101동 1001호',
      tenantName: '홍길동',
      landlordName: '김철수',
      account: '○○은행 123-456',
    });
    expect(withParty).toContain('김철수 님께');
    expect(withParty).toContain('대상 주택: 서울시');
    expect(withParty).toContain('임차인: 홍길동');
    expect(withParty).toContain('입금 계좌: ○○은행 123-456');

    const without = buildSettlementLetter(base);
    expect(without).toContain('임대인님께');
    expect(without).not.toContain('대상 주택:');
    expect(without).not.toContain('입금 계좌:');
  });

  it('공백만 입력한 선택 항목은 무시한다', () => {
    const t = buildSettlementLetter(base, { address: '   ', tenantName: '  ' });
    expect(t).not.toContain('대상 주택:');
    expect(t).not.toContain('임차인:');
  });

  it('음수 결과면 추가 지급 문구로 바뀐다', () => {
    const owes = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 500_000,
      unpaidRent: 1_200_000,
    });
    const t = buildSettlementLetter(owes, { account: '○○은행 123-456' });
    expect(t).toContain('[추가로 지급해야 할 금액] 700,000원');
    expect(t).not.toContain('[최종 반환받을 금액]');
    // 추가 지급 상황에서는 입금 계좌를 넣지 않는다
    expect(t).not.toContain('입금 계좌:');
  });

  it('단정적인 법률 자문 표현을 쓰지 않는다', () => {
    const t = buildSettlementLetter(base);
    expect(t).not.toMatch(/반드시 반환해야 합니다|법적 의무입니다|위법입니다|고소/);
    expect(t).toContain('정하고 있습니다');
  });
});

describe('임대인 입장 (역할 토글)', () => {
  const positive = calcMoveOutSettlement({
    ...emptyMoveOutInput(),
    deposit: 10_000_000,
    longTermRepair: { mode: 'total', total: 384_000 },
    agreedDeductions: [{ label: '벽지 교체', amount: 200_000 }],
  });

  it('금액과 항목은 역할과 무관하게 동일하다', () => {
    const t = buildSettlementLetter(positive, {}, 'tenant');
    const l = buildSettlementLetter(positive, {}, 'landlord');
    expect(t).toContain('10,184,000원');
    expect(l).toContain('10,184,000원');
    expect(t).toContain('벽지 교체: 200,000원');
    expect(l).toContain('벽지 교체: 200,000원');
  });

  it('수신인이 반대가 된다', () => {
    expect(buildSettlementLetter(positive, {}, 'tenant')).toContain('임대인님께');
    expect(buildSettlementLetter(positive, {}, 'landlord')).toContain('임차인님께');
  });

  it('이름을 넣으면 각자 상대방 이름이 수신인이 된다', () => {
    const party = { tenantName: '홍길동', landlordName: '김철수' };
    expect(buildSettlementLetter(positive, party, 'tenant')).toContain('김철수 님께');
    expect(buildSettlementLetter(positive, party, 'landlord')).toContain('홍길동 님께');
  });

  it('라벨이 입장에 맞게 바뀐다', () => {
    const l = buildSettlementLetter(positive, {}, 'landlord');
    expect(l).toContain('[반환 대상 금액]');
    expect(l).toContain('[최종 반환할 금액]');
    expect(l).not.toContain('[최종 반환 요청 금액]');
  });

  it('임대인은 계좌를 적지 않고 물어본다', () => {
    const l = buildSettlementLetter(positive, { account: '○○은행 123-456' }, 'landlord');
    expect(l).not.toContain('입금 계좌:');
    expect(l).toContain('계좌를 알려주시면');
  });

  it('음수면 청구 문구로 바뀐다', () => {
    const owes = calcMoveOutSettlement({
      ...emptyMoveOutInput(),
      deposit: 500_000,
      unpaidRent: 1_200_000,
    });
    const l = buildSettlementLetter(owes, {}, 'landlord');
    expect(l).toContain('[추가로 청구할 금액] 700,000원');
    expect(l).toContain('청구드릴 금액이 있습니다');

    const t = buildSettlementLetter(owes, {}, 'tenant');
    expect(t).toContain('[추가로 지급해야 할 금액] 700,000원');
  });

  it('장기수선충당금 문구도 입장에 맞게 바뀐다', () => {
    const t = buildSettlementLetter(positive, {}, 'tenant');
    const l = buildSettlementLetter(positive, {}, 'landlord');
    expect(t).toContain('공동주택관리법 시행령 제31조 제8항');
    expect(t).toContain('납부확인서를 첨부합니다');
    // 임대인은 반환하는 쪽이라 법령을 들이밀 이유가 없다
    expect(l).toContain('반환 금액에 포함했습니다');
    expect(l).not.toContain('공동주택관리법');
  });

  it('임대인도 단정적인 표현을 쓰지 않는다', () => {
    const l = buildSettlementLetter(positive, {}, 'landlord');
    expect(l).not.toMatch(/반드시|의무입니다|위법|지급하지 않겠습니다/);
    expect(l).toContain('함께 확인하겠습니다');
  });

  it('기본값은 임차인', () => {
    expect(buildSettlementLetter(positive)).toBe(buildSettlementLetter(positive, {}, 'tenant'));
  });
});
