import {
  MINIMUM_WAGE_HOURLY,
  MINIMUM_WAGE_MONTHLY,
  MINIMUM_WAGE_HOURLY_NEXT,
  NP_RATE_TOTAL,
  NP_RATE,
  NP_CAP_MONTHLY,
  NP_FLOOR_MONTHLY,
  HI_RATE_TOTAL,
  HI_RATE,
  LTC_RATIO,
  EI_RATE,
  JOBLESS_UPPER_DAILY,
  JOBLESS_LOWER_DAILY,
} from './constants';

/**
 * 세율·요율 변경 이력.
 *
 * 이 사이트의 계산기는 전부 src/data/constants.ts 한 곳의 값을 바라봅니다.
 * 그 값이 언제, 무엇 때문에 바뀌었는지를 여기에 기록합니다.
 * 새 고시가 나오거나 오표기를 정정하면 constants.ts 와 이 파일을 함께 수정합니다.
 */

const won = (n: number) => n.toLocaleString('ko-KR');
const pct = (n: number) => `${(n * 100).toFixed(n * 100 % 1 === 0 ? 0 : 3).replace(/0+$/, '').replace(/\.$/, '')}%`;

/* ────────────────────────────────────────────────
   1. 현재 적용 중인 기준값
   ──────────────────────────────────────────────── */
export interface CurrentRate {
  category: string;
  label: string;
  value: string;
  period: string;
  source: string;
}

export const CURRENT_RATES: CurrentRate[] = [
  {
    category: '최저임금',
    label: '최저시급',
    value: `${won(MINIMUM_WAGE_HOURLY)}원`,
    period: '2026.1.1 ~ 2026.12.31',
    source: '고용노동부 고시',
  },
  {
    category: '최저임금',
    label: '월 환산액 (209시간)',
    value: `${won(MINIMUM_WAGE_MONTHLY)}원`,
    period: '2026.1.1 ~ 2026.12.31',
    source: '고용노동부 고시',
  },
  {
    category: '4대보험',
    label: '국민연금 보험료율',
    value: `${pct(NP_RATE_TOTAL)} (근로자 ${pct(NP_RATE)})`,
    period: '2026.1.1 ~',
    source: '국민연금법 (2026년 연금개혁 시행)',
  },
  {
    category: '4대보험',
    label: '국민연금 기준소득월액 상한',
    value: `${won(NP_CAP_MONTHLY)}원`,
    period: '2026.7.1 ~ 2027.6.30',
    source: '국민연금공단 고시',
  },
  {
    category: '4대보험',
    label: '국민연금 기준소득월액 하한',
    value: `${won(NP_FLOOR_MONTHLY)}원`,
    period: '2026.7.1 ~ 2027.6.30',
    source: '국민연금공단 고시',
  },
  {
    category: '4대보험',
    label: '건강보험료율',
    value: `${pct(HI_RATE_TOTAL)} (근로자 ${pct(HI_RATE)})`,
    period: '2026.1.1 ~',
    source: '국민건강보험공단 고시',
  },
  {
    category: '4대보험',
    label: '장기요양보험료율',
    value: `건강보험료의 ${pct(LTC_RATIO)}`,
    period: '2026.1.1 ~',
    source: '국민건강보험공단 고시',
  },
  {
    category: '4대보험',
    label: '고용보험료율 (실업급여분)',
    value: `근로자 ${pct(EI_RATE)}`,
    period: '2026 기준',
    source: '고용보험법 시행령',
  },
  {
    category: '실업급여',
    label: '구직급여 1일 상한액',
    value: `${won(JOBLESS_UPPER_DAILY)}원`,
    period: '2026.1.1 이후 이직자',
    source: '고용노동부 고시',
  },
  {
    category: '실업급여',
    label: '구직급여 1일 하한액',
    value: `${won(JOBLESS_LOWER_DAILY)}원`,
    period: '2026.1.1 이후 이직자',
    source: '최저시급 × 8시간 × 80%',
  },
  {
    category: '세금',
    label: '종합소득세율',
    value: '8구간 6% ~ 45%',
    period: '2026 기준',
    source: '소득세법 제55조',
  },
  {
    category: '세금',
    label: '증권거래세 (코스피)',
    value: '0.20% (거래세 0.05% + 농특세 0.15%)',
    period: '2026.1.1 ~',
    source: '증권거래세법 시행령',
  },
  {
    category: '세금',
    label: '증권거래세 (코스닥)',
    value: '0.20%',
    period: '2026.1.1 ~',
    source: '증권거래세법 시행령',
  },
  {
    category: '세금',
    label: '부가가치세 간이과세 기준',
    value: '직전연도 공급대가 1억 400만원 미만',
    period: '2024.7.1 ~',
    source: '부가가치세법 시행령',
  },
];

/* ────────────────────────────────────────────────
   2. 변경 이력
   ──────────────────────────────────────────────── */
export type ChangeType = 'law' | 'correction';

export interface ChangeEntry {
  /** 법령·고시 시행일 (정정 건은 생략) */
  effectiveDate?: string;
  /** 이 사이트에 반영한 날 */
  appliedDate: string;
  type: ChangeType;
  category: string;
  title: string;
  before: string;
  after: string;
  basis: string;
  affected: string[];
  note?: string;
}

/** 최신순 */
export const CHANGELOG: ChangeEntry[] = [
  {
    appliedDate: '2026-10-06',
    type: 'correction',
    category: '근로',
    title: '5인 미만 사업장 적용 제외를 영문 가이드에 반영',
    before: '연차휴가·연장근로 가산수당·주 52시간 한도를 모든 사업장에 적용되는 것처럼 서술',
    after: '5인 미만 사업장은 연차휴가·가산수당·주52시간·부당해고 구제가 적용되지 않음을 표로 명시. 최저임금·주휴수당·퇴직금·휴게시간·4대보험은 적용',
    basis: '근로기준법 제11조 및 같은 법 시행령 제7조 (적용 범위)',
    affected: ['/en/guide/working-rights'],
    note: '영문 페이지 전체에서 5인 미만 예외를 단 한 번도 언급하지 않고 있었습니다. 소규모 학원·식당에서 일하는 외국인이 많아 실제로 자주 걸리는 예외인데, 연차와 야근수당을 당연히 받는 것처럼 읽히는 상태였습니다.',
  },
  {
    appliedDate: '2026-10-06',
    type: 'law',
    effectiveDate: '2025-02-23',
    category: '근로',
    title: '육아휴직 기간 1년 → 1년 6개월 반영',
    before: '자녀 1명당 부모 각각 최대 1년(12개월)',
    after: '기본 1년, 부모가 각각 3개월 이상 사용 시 1년 6개월. 분할 횟수도 2회 → 3회',
    basis: '남녀고용평등법 개정 (2025.2.23 시행)',
    affected: ['/salary/parental', '/en/guide/working-rights'],
    note: '한국어 계산기 페이지와 영문 가이드 양쪽에 개정 전 기간이 남아 있었습니다.',
  },
  {
    appliedDate: '2026-10-06',
    type: 'correction',
    category: '주거',
    title: '임대차 계약 해지 통지 기한 정정',
    before: '이사 나가기 1~2개월 전에 통지하면 된다고 안내',
    after: '만료 6개월 전 ~ 2개월 전 사이에 통지해야 하며, 묵시적 갱신 상태에서는 임대인이 통지받은 날부터 3개월 후 효력 발생',
    basis: '주택임대차보호법 제6조, 제6조의2',
    affected: ['/en/guide/housing-guide', '/en/guide/leaving-korea-checklist'],
    note: '1개월 전 통지로도 괜찮다고 읽힐 수 있었는데, 실제로는 2개월을 넘기면 묵시적 갱신이 되어 계약이 자동 연장됩니다. 출국을 앞둔 사람에게는 빈집 월세로 직결되는 문제입니다.',
  },
  {
    appliedDate: '2026-10-06',
    type: 'correction',
    category: '비자',
    title: 'E-7 비자 임금 요건 정정',
    before: '전년도 1인당 GNI 전액(약 4,200만원) 이상',
    after: '전년도 1인당 GNI의 80% 기준(GNI 4,995만원 적용 시 약 4,000만원). 법무부가 별도로 고시하는 연간 임금 하한이 더 낮을 수 있어 직종·고용주별 확인 필요',
    basis: '법무부 사증발급 안내매뉴얼 (특정활동 E-7)',
    affected: ['/en/guide/visa-guide'],
  },
  {
    appliedDate: '2026-10-06',
    type: 'correction',
    category: '연금',
    title: '영문 가이드의 외국인 반환일시금 수급 요건 정정',
    before: '협정 체결국 국민은 반환일시금을 받을 수 없고, 미체결국 국민이 받을 수 있다고 설명',
    after: '사회보장협정 체결국(미국·캐나다·독일 등) 또는 상호주의 인정국 국민, 그리고 E-8·E-9·H-2 체류자격 보유자가 받을 수 있음',
    basis: '국민연금법 제126조 및 국민연금공단 외국인 반환일시금 지급 대상국 고시',
    affected: ['/en/guide/pension-guide', '/en/guide/pension-refund-countries'],
    note: '요건을 정반대로 설명하고 있었습니다. 미국·캐나다·독일 국적자가 받을 수 있는 돈을 받을 수 없다고 안내한 셈이라, 실제 금전적 불이익으로 이어질 수 있는 오류였습니다. 정정하면서 국적별 수급 가능 여부를 전부 정리한 페이지를 새로 만들었습니다.',
  },
  {
    effectiveDate: '2026-01-01',
    appliedDate: '2026-10-02',
    type: 'law',
    category: '세금',
    title: '증권거래세 탄력세율 일부 환원',
    before: '코스피 0.15% (농특세만) · 코스닥 0.15%',
    after: '코스피 0.20% (거래세 0.05% + 농특세 0.15%) · 코스닥 0.20% · 코넥스 0.10%',
    basis: '증권거래세법 시행령 개정 (2026.1.1 시행)',
    affected: ['/guide/investment-tax', '/daily/stock'],
    note: '금융투자소득세 폐지와 맞물려, 2025년까지 사실상 0%였던 코스피 순수 거래세가 다시 부과되기 시작했습니다.',
  },
  {
    effectiveDate: '2024-07-01',
    appliedDate: '2026-10-02',
    type: 'correction',
    category: '세금',
    title: '부가가치세 간이과세 기준금액 상향 반영',
    before: '간이과세 8,000만원 · 일반과세 전환 8,000만원',
    after: '간이과세 1억 400만원 미만 · 납부면제 4,800만원 미만',
    basis: '부가가치세법 시행령 (2024.7.1 시행)',
    affected: ['/en/guide/freelancer-tax'],
    note: '시행일로부터 한참 뒤에 반영된 건으로, 정정 과정에서 같은 페이지 안에 신고 주기가 서로 다르게 적혀 있던 부분도 함께 바로잡았습니다.',
  },
  {
    effectiveDate: '2026-01-01',
    appliedDate: '2026-10-02',
    type: 'correction',
    category: '4대보험',
    title: '영문 가이드의 국민연금 요율 정정',
    before: '근로자 4.5% / 지역가입자 9%',
    after: `근로자 ${pct(NP_RATE)} / 지역가입자 ${pct(NP_RATE_TOTAL)}`,
    basis: '국민연금법 (2026년 연금개혁 시행)',
    affected: ['/en/guide/first-90-days', '/en/guide/year-end-settlement', '/en/guide/freelancer-tax'],
    note: '한국어 계산기는 2026년 요율을 적용하고 있었지만 영문 가이드 일부가 개정 전 수치로 남아 있었습니다.',
  },
  {
    effectiveDate: '2026-07-01',
    appliedDate: '2026-09-16',
    type: 'law',
    category: '4대보험',
    title: '국민연금 기준소득월액 상·하한액 조정',
    before: '상한 637만원 · 하한 40만원',
    after: `상한 ${won(NP_CAP_MONTHLY / 10000)}만원 · 하한 ${won(NP_FLOOR_MONTHLY / 10000)}만원`,
    basis: '국민연금공단 2026년 기준소득월액 상·하한액 조정 고시',
    affected: ['/salary', '/salary/insurance', '/pension/nps', '/salary/table'],
    note: '매년 7월 전체 가입자 평균소득 변동률에 따라 조정됩니다. 상한 소득자의 월 보험료 본인 부담은 302,575원에서 313,025원이 됐습니다.',
  },
  {
    effectiveDate: '2026-01-01',
    appliedDate: '2026-09-16',
    type: 'correction',
    category: '최저임금',
    title: '2026년 최저시급 표기 통일',
    before: '사이트 안에서 10,030원 · 10,320원 · 10,470원이 혼재',
    after: `${won(MINIMUM_WAGE_HOURLY)}원 (월 209시간 ${won(MINIMUM_WAGE_MONTHLY)}원)`,
    basis: '최저임금위원회 의결, 고용노동부 고시 (2026.1.1 시행)',
    affected: ['/salary/minimum', '/guide/minimum-wage', '/daily/time', '/salary/live', '/about'],
    note: '계산기는 10,320원으로 맞게 계산하고 있었으나 일부 본문에 과거 수치와 잘못된 수치가 남아 있었습니다. 이 일을 계기로 모든 수치를 constants.ts 한 곳에서 관리하도록 바꿨습니다.',
  },
  {
    effectiveDate: '2026-01-01',
    appliedDate: '2026-09-16',
    type: 'correction',
    category: '실업급여',
    title: '구직급여 상·하한액 정정',
    before: '상한 66,000원 · 하한 63,104원',
    after: `상한 ${won(JOBLESS_UPPER_DAILY)}원 · 하한 ${won(JOBLESS_LOWER_DAILY)}원`,
    basis: '고용노동부 고시 (2026.1.1 이후 이직자 적용)',
    affected: ['/pension/jobless'],
    note: '하한액은 최저시급의 80%에 연동되므로 최저임금이 오르면 함께 오릅니다. 본문에 2024년 기준 금액이 남아 있어 계산기 결과와 설명이 어긋나 있었습니다.',
  },
  {
    effectiveDate: '2026-01-01',
    appliedDate: '2026-09-16',
    type: 'correction',
    category: '4대보험',
    title: '건강보험료율 표기 정정',
    before: '일부 페이지 7.09%',
    after: `${pct(HI_RATE_TOTAL)} (근로자 ${pct(HI_RATE)}) · 장기요양 ${pct(LTC_RATIO)}`,
    basis: '국민건강보험공단 2026년 보험료율 고시',
    affected: ['/', '/about', '/salary/insurance'],
  },
  {
    appliedDate: '2026-09-16',
    type: 'correction',
    category: '기타',
    title: '금 무게 단위 오표기 정정',
    before: '1냥 = 3.75돈 (14.0625g)',
    after: '1냥 = 10돈 (37.5g)',
    basis: '전통 도량형 (1돈 = 3.75g)',
    affected: ['/daily/gold', '/en/gold'],
    note: '계산기 프리셋과 같은 페이지의 설명이 서로 다른 값을 말하고 있었습니다.',
  },
];

/* ────────────────────────────────────────────────
   3. 예정된 변경
   ──────────────────────────────────────────────── */
export interface UpcomingChange {
  date: string;
  title: string;
  detail: string;
  basis: string;
  /** 확정 고시·의결 여부 */
  confirmed: boolean;
}

export const UPCOMING: UpcomingChange[] = [
  {
    date: '2027.1.1',
    title: `최저시급 ${won(MINIMUM_WAGE_HOURLY_NEXT)}원`,
    detail: `${won(MINIMUM_WAGE_HOURLY)}원 대비 ${won(MINIMUM_WAGE_HOURLY_NEXT - MINIMUM_WAGE_HOURLY)}원(3.7%) 인상. 월 209시간 환산 ${won(MINIMUM_WAGE_HOURLY_NEXT * 209)}원. 구직급여 하한액도 ${won(Math.round(MINIMUM_WAGE_HOURLY_NEXT * 8 * 0.8))}원으로 함께 오릅니다.`,
    basis: '최저임금위원회 2026.7.14 의결',
    confirmed: true,
  },
  {
    date: '2027.1.1',
    title: '국민연금 보험료율 10.0%',
    detail: '근로자 부담 5.0%. 2026년 9.5%를 시작으로 2033년 13%에 도달할 때까지 매년 0.5%p씩 오릅니다.',
    basis: '국민연금법 (2026년 연금개혁)',
    confirmed: true,
  },
  {
    date: '2027.7.1',
    title: '국민연금 기준소득월액 상·하한액 조정',
    detail: '전체 가입자 평균소득 변동률에 따라 매년 7월 조정됩니다. 고시가 나오는 대로 반영합니다.',
    basis: '국민연금공단 연례 고시',
    confirmed: false,
  },
  {
    date: '2027년 (유예 가능성)',
    title: '가상자산 과세 시행',
    detail: '연 250만원 초과 수익에 22%(지방소득세 포함) 과세 예정. 여러 차례 유예된 전례가 있어 추가 유예 가능성이 남아 있습니다.',
    basis: '소득세법 부칙',
    confirmed: false,
  },
];

export const CHANGELOG_UPDATED = '2026년 10월 6일';
