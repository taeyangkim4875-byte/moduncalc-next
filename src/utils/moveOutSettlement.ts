/**
 * 이사(퇴실) 정산 계산 — UI 비의존 순수 함수.
 *
 * 임대인용 퇴실 정산서에서 입장만 바꿔 재사용할 수 있도록
 * React·DOM 에 의존하지 않고, 결과를 "항목 목록 + 합계" 구조로 돌려준다.
 *
 * 근거
 * - 공동주택관리법 시행령 제31조 제8항
 *   장기수선충당금을 사용자(임차인)가 대신 납부한 경우 소유자가 반환해야 한다.
 * - 관리주체는 임차인 요청 시 납부확인서를 지체 없이 발급해야 한다.
 *
 * 금액은 전부 원 단위 정수로 다룬다. 반올림 규칙은 roundWon 한 곳에서만 정의한다.
 */

/** 일할 계산 등에서 생기는 소수를 원 단위로 정리하는 단일 규칙. */
export function roundWon(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n);
}

/** 사람이 읽는 반올림 설명. 화면에 그대로 노출한다. */
export const ROUNDING_NOTE = '일할 계산 결과는 원 단위에서 반올림합니다.';

/** 음수·NaN 방어 */
function clean(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** 해당 연·월의 일수 (윤년 반영) */
export function daysInMonth(year: number, month: number): number {
  if (!Number.isFinite(year) || !Number.isFinite(month)) return 30;
  return new Date(year, month, 0).getDate();
}

/* ─────────────────────────────────────────────
   입력 타입
   ───────────────────────────────────────────── */

/** 장기수선충당금 입력 — 납부확인서 총액이 가장 정확하다. */
export type LongTermRepairInput =
  | { mode: 'total'; total: number }
  | { mode: 'estimate'; periods: RepairPeriod[] };

/** 거주 기간 중 월 금액이 바뀐 경우를 위한 구간 */
export interface RepairPeriod {
  /** 월 장기수선충당금 */
  monthlyAmount: number;
  /** 해당 금액이 적용된 개월 수 */
  months: number;
}

/** 월세 일할 정산 방식 */
export type RentPaymentType = 'prepaid' | 'arrears';

export interface MoveOutMonth {
  year: number;
  /** 1~12 */
  month: number;
  /** 퇴거일(일자). 퇴거일 당일까지 거주한 것으로 본다. */
  moveOutDay: number;
}

export interface NamedAmount {
  label: string;
  amount: number;
}

export interface MoveOutInput {
  /* 받을 금액 */
  deposit: number;
  longTermRepair: LongTermRepairInput;
  /** 입주 시 납부한 관리비 예치금(선수관리비) 환급액 */
  prepaidMaintenanceDeposit: number;

  /* 퇴거월 일할 계산 */
  moveOut: MoveOutMonth | null;
  /** 월세. 0 이면 전세로 보고 월세 일할을 건너뛴다. */
  monthlyRent: number;
  rentPaymentType: RentPaymentType;
  /** 퇴거월 관리비 일할 계산에 쓸 월 관리비 */
  monthlyMaintenance: number;

  /* 공제 */
  /** 퇴거월과 별개로 밀린 월세 */
  unpaidRent: number;
  /** 미납 공과금 — 직접 입력한 금액들 */
  unpaidUtilities: NamedAmount[];
  /** 원상복구·수리비 등 합의된 공제 */
  agreedDeductions: NamedAmount[];
}

/* ─────────────────────────────────────────────
   결과 타입
   ───────────────────────────────────────────── */

export interface SettlementLine {
  key: string;
  label: string;
  /** 원 단위. 받을 금액은 양수, 공제는 양수로 담고 구분은 섹션으로 한다. */
  amount: number;
  /** 펼쳐서 보여줄 계산식 */
  formula?: string;
  note?: string;
}

export interface MoveOutSettlementResult {
  receivables: SettlementLine[];
  deductions: SettlementLine[];
  totalReceivable: number;
  totalDeduction: number;
  /** 최종 반환 금액. 음수면 임차인이 추가로 내야 한다. */
  netAmount: number;
  /** 임차인이 더 내야 하는 상황인지 */
  tenantOwes: boolean;
  /** 장기수선충당금을 추정으로 계산했는지 → 납부확인서 안내 표시용 */
  longTermRepairEstimated: boolean;
  /** 추정 모드에서 쓴 총 개월 수 */
  longTermRepairMonths: number;
}

/* ─────────────────────────────────────────────
   개별 계산
   ───────────────────────────────────────────── */

/** 장기수선충당금 대납액 */
export function calcLongTermRepair(input: LongTermRepairInput): {
  amount: number;
  months: number;
  formula: string;
} {
  if (input.mode === 'total') {
    return {
      amount: roundWon(clean(input.total)),
      months: 0,
      formula: '관리사무소 납부확인서 총액',
    };
  }

  const periods = (input.periods ?? []).filter(
    (p) => clean(p.monthlyAmount) > 0 && clean(p.months) > 0,
  );
  const amount = roundWon(
    periods.reduce((sum, p) => sum + clean(p.monthlyAmount) * clean(p.months), 0),
  );
  const months = periods.reduce((sum, p) => sum + clean(p.months), 0);
  const formula = periods.length
    ? periods
        .map((p) => `${clean(p.monthlyAmount).toLocaleString('ko-KR')}원 × ${clean(p.months)}개월`)
        .join(' + ')
    : '입력 없음';

  return { amount, months, formula };
}

/**
 * 퇴거월 월세 일할 계산.
 *
 * 후불(매월 말 지급)이면 산 날만큼 내야 하므로 공제이고,
 * 선불(매월 초 지급)이면 이미 한 달치를 냈으므로 살지 않은 날만큼 돌려받는다.
 * 부호가 반대라서 둘을 섞으면 금액이 두 배로 틀어진다.
 */
export function calcRentProration(
  monthlyRent: number,
  moveOut: MoveOutMonth,
  type: RentPaymentType,
): { amount: number; isRefund: boolean; formula: string } {
  const rent = clean(monthlyRent);
  const total = daysInMonth(moveOut.year, moveOut.month);
  const stayed = Math.min(Math.max(clean(moveOut.moveOutDay), 0), total);

  if (type === 'arrears') {
    const amount = roundWon((rent * stayed) / total);
    return {
      amount,
      isRefund: false,
      formula: `${rent.toLocaleString('ko-KR')}원 × ${stayed}일 ÷ ${total}일`,
    };
  }

  const remaining = total - stayed;
  const amount = roundWon((rent * remaining) / total);
  return {
    amount,
    isRefund: true,
    formula: `${rent.toLocaleString('ko-KR')}원 × ${remaining}일 ÷ ${total}일 (미거주분 환급)`,
  };
}

/** 퇴거월 관리비 일할 계산 — 산 날만큼 부담한다. */
export function calcMaintenanceProration(
  monthlyMaintenance: number,
  moveOut: MoveOutMonth,
): { amount: number; formula: string } {
  const fee = clean(monthlyMaintenance);
  const total = daysInMonth(moveOut.year, moveOut.month);
  const stayed = Math.min(Math.max(clean(moveOut.moveOutDay), 0), total);
  return {
    amount: roundWon((fee * stayed) / total),
    formula: `${fee.toLocaleString('ko-KR')}원 × ${stayed}일 ÷ ${total}일`,
  };
}

/* ─────────────────────────────────────────────
   전체 정산
   ───────────────────────────────────────────── */

export function calcMoveOutSettlement(input: MoveOutInput): MoveOutSettlementResult {
  const receivables: SettlementLine[] = [];
  const deductions: SettlementLine[] = [];

  /* ── 받을 금액 ── */
  const deposit = roundWon(clean(input.deposit));
  if (deposit > 0) {
    receivables.push({ key: 'deposit', label: '임대차 보증금', amount: deposit });
  }

  const repair = calcLongTermRepair(input.longTermRepair);
  if (repair.amount > 0) {
    receivables.push({
      key: 'long-term-repair',
      label: '장기수선충당금 대납액',
      amount: repair.amount,
      formula: repair.formula,
      note:
        input.longTermRepair.mode === 'estimate'
          ? '추정값입니다. 관리사무소 납부확인서로 실제 금액을 확인하세요.'
          : undefined,
    });
  }

  const prepaid = roundWon(clean(input.prepaidMaintenanceDeposit));
  if (prepaid > 0) {
    receivables.push({
      key: 'prepaid-maintenance',
      label: '관리비 예치금(선수관리비) 환급',
      amount: prepaid,
    });
  }

  /* ── 퇴거월 일할 ── */
  if (input.moveOut && clean(input.monthlyRent) > 0) {
    const r = calcRentProration(input.monthlyRent, input.moveOut, input.rentPaymentType);
    if (r.amount > 0) {
      const line: SettlementLine = {
        key: 'rent-proration',
        label: r.isRefund ? '퇴거월 월세 환급 (선불)' : '퇴거월 월세 (후불)',
        amount: r.amount,
        formula: r.formula,
      };
      (r.isRefund ? receivables : deductions).push(line);
    }
  }

  if (input.moveOut && clean(input.monthlyMaintenance) > 0) {
    const m = calcMaintenanceProration(input.monthlyMaintenance, input.moveOut);
    if (m.amount > 0) {
      deductions.push({
        key: 'maintenance-proration',
        label: '퇴거월 관리비 일할',
        amount: m.amount,
        formula: m.formula,
      });
    }
  }

  /* ── 공제 ── */
  const unpaidRent = roundWon(clean(input.unpaidRent));
  if (unpaidRent > 0) {
    deductions.push({ key: 'unpaid-rent', label: '미납 월세', amount: unpaidRent });
  }

  (input.unpaidUtilities ?? []).forEach((u, i) => {
    const amount = roundWon(clean(u.amount));
    if (amount > 0) {
      deductions.push({
        key: `utility-${i}`,
        label: u.label?.trim() || '미납 공과금',
        amount,
      });
    }
  });

  (input.agreedDeductions ?? []).forEach((d, i) => {
    const amount = roundWon(clean(d.amount));
    if (amount > 0) {
      deductions.push({
        key: `deduction-${i}`,
        label: d.label?.trim() || '합의 공제',
        amount,
      });
    }
  });

  const totalReceivable = receivables.reduce((s, l) => s + l.amount, 0);
  const totalDeduction = deductions.reduce((s, l) => s + l.amount, 0);
  const netAmount = totalReceivable - totalDeduction;

  return {
    receivables,
    deductions,
    totalReceivable,
    totalDeduction,
    netAmount,
    tenantOwes: netAmount < 0,
    longTermRepairEstimated: input.longTermRepair.mode === 'estimate' && repair.amount > 0,
    longTermRepairMonths: repair.months,
  };
}

/** 빈 입력값 — UI 초기 상태와 테스트에서 공유한다. */
export function emptyMoveOutInput(): MoveOutInput {
  return {
    deposit: 0,
    longTermRepair: { mode: 'total', total: 0 },
    prepaidMaintenanceDeposit: 0,
    moveOut: null,
    monthlyRent: 0,
    rentPaymentType: 'arrears',
    monthlyMaintenance: 0,
    unpaidRent: 0,
    unpaidUtilities: [],
    agreedDeductions: [],
  };
}

/* ─────────────────────────────────────────────
   정산 요청서 문구 생성
   ───────────────────────────────────────────── */

export interface LetterParty {
  /** 대상 주택 주소 (선택) */
  address?: string;
  /** 임차인 이름 (선택) */
  tenantName?: string;
  /** 임대인 이름 (선택) */
  landlordName?: string;
  /** 입금 계좌 (선택) */
  account?: string;
}

/**
 * 임대인에게 보낼 정산 요청 문구.
 *
 * 임대인용 퇴실 정산서에서도 같은 결과 구조를 받아 문구만 바꿔 쓸 수 있도록
 * UI 가 아니라 여기에 둔다. 법률 자문처럼 단정하는 표현은 쓰지 않는다.
 */
export function buildSettlementLetter(
  result: MoveOutSettlementResult,
  party: LetterParty = {},
): string {
  const t = (s?: string) => (s ?? '').trim();
  const lines: string[] = [];

  lines.push(t(party.landlordName) ? `${t(party.landlordName)} 님께` : '임대인님께');
  lines.push('');
  lines.push('안녕하세요. 퇴거에 따른 정산 내역을 정리해 보내드립니다.');
  if (t(party.address)) lines.push(`대상 주택: ${t(party.address)}`);
  if (t(party.tenantName)) lines.push(`임차인: ${t(party.tenantName)}`);
  lines.push('');

  const money = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;

  if (result.receivables.length) {
    lines.push('[받을 금액]');
    result.receivables.forEach((l) => lines.push(`· ${l.label}: ${money(l.amount)}`));
    lines.push(`  소계: ${money(result.totalReceivable)}`);
    lines.push('');
  }

  if (result.deductions.length) {
    lines.push('[공제할 금액]');
    result.deductions.forEach((l) => lines.push(`· ${l.label}: ${money(l.amount)}`));
    lines.push(`  소계: ${money(result.totalDeduction)}`);
    lines.push('');
  }

  if (result.tenantOwes) {
    lines.push(`[추가 지급할 금액] ${money(Math.abs(result.netAmount))}`);
    lines.push('');
    lines.push('공제액이 받을 금액을 넘어 추가로 지급해야 할 금액이 있습니다.');
    lines.push('내역 중 확인이 필요한 부분이 있으면 말씀해 주세요.');
  } else {
    lines.push(`[최종 반환 요청 금액] ${money(result.netAmount)}`);
    lines.push('');
    if (t(party.account)) lines.push(`입금 계좌: ${t(party.account)}`);
    lines.push('확인 후 반환해 주시면 감사하겠습니다.');
  }

  if (result.receivables.some((l) => l.key === 'long-term-repair')) {
    lines.push('');
    lines.push('※ 장기수선충당금은 공동주택관리법 시행령 제31조 제8항에 따라');
    lines.push('   임차인이 대신 납부한 경우 소유자가 반환하도록 정하고 있습니다.');
    lines.push(
      result.longTermRepairEstimated
        ? '   금액은 추정치이며, 관리사무소 납부확인서를 받아 첨부하겠습니다.'
        : '   관리사무소 납부확인서를 첨부합니다.',
    );
  }

  lines.push('');
  lines.push('내역 중 사실과 다른 부분이 있으면 알려주시면 함께 확인하겠습니다.');
  lines.push('감사합니다.');

  return lines.join('\n');
}
