import { describe, it, expect } from 'vitest';
import {
  calcMoveOutSettlement,
  calcLongTermRepair,
  calcRentProration,
  calcMaintenanceProration,
  daysInMonth,
  emptyMoveOutInput,
  roundWon,
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
