/**
 * 축의금 기준 데이터.
 *
 * 축의금에는 법정 기준도 정답도 없다. 그래서 이 파일은 "적정 금액"을 정의하지 않고,
 * 판단에 쓸 수 있는 두 가지 근거만 담는다.
 *
 *   1. 식대  — 참석한다면 받는 쪽이 손해 보지 않는 하한선 (한국소비자원 가격조사)
 *   2. 분포  — 사람들이 실제로 얼마를 내는지 (인크루트 설문)
 *
 * 설문 근거가 있는 관계와 통용 관행에 불과한 관계를 반드시 구분한다.
 * 근거 없는 숫자를 설문 결과인 것처럼 보여주면 안 된다.
 *
 * 최종 확인 2026-10-12
 */

/* ─────────────────────────────────────────────
   1. 식대 — 한국소비자원 참가격 결혼서비스 가격조사
   ───────────────────────────────────────────── */

export interface VenueOption {
  key: string;
  label: string;
  /** 1인당 식대(원). null 이면 사용자가 직접 입력해야 한다. */
  mealCost: number | null;
  note: string;
}

/**
 * 한국소비자원 참가격 결혼서비스 가격조사 기준 1인당 식대.
 * 전국 중간값과 지역 최고·최저를 그대로 쓰고, 그 밖은 직접 입력하게 한다.
 *
 * TODO: 호텔 예식 1인당 식대는 공신력 있는 집계를 찾지 못했다.
 *       추정치를 넣지 않고 직접 입력으로 둔다.
 */
export const VENUE_OPTIONS: readonly VenueOption[] = [
  {
    key: 'national',
    label: '일반 예식장 (전국 평균)',
    mealCost: 59000,
    note: '한국소비자원 참가격 전국 1인당 식대 중간값',
  },
  {
    key: 'gangnam',
    label: '서울 강남권',
    mealCost: 85000,
    note: '한국소비자원 조사 기준 가장 비싼 지역',
  },
  {
    key: 'local',
    label: '지방 (경상권 등)',
    mealCost: 44000,
    note: '한국소비자원 조사 기준 가장 저렴한 지역',
  },
  {
    key: 'custom',
    label: '직접 입력 (호텔 등)',
    mealCost: null,
    note: '청첩장이나 예식장 홈페이지에서 식대를 확인해 넣으세요',
  },
] as const;

export const MEAL_COST_SOURCE = '한국소비자원 참가격 결혼서비스 가격조사';

/* ─────────────────────────────────────────────
   2. 관계별 분포
   ───────────────────────────────────────────── */

export interface RelationshipOption {
  key: string;
  label: string;
  /** 통용되는 금액 범위(원) */
  min: number;
  max: number;
  /**
   * 설문으로 뒷받침되는 관계인지.
   * false 면 화면에서 "설문이 아니라 통용 관행"임을 밝혀야 한다.
   */
  surveyBacked: boolean;
  /** 근거 설명 */
  basis: string;
}

/**
 * 인크루트 '2025년 직장 동료 결혼 축의금' 설문 (2025.5, 직장인 844명)
 *   전체     10만원 61.8% / 5만원 32.8% / 5만원 미만 3.2% / 15만원 1.4%
 *   친한 동료 10만원 59.7%
 *   일로 엮인 동료 10만원 60.1%
 *   2023년 같은 조사에서 덜 친한 동료는 5만원 65.1% 가 1위였다.
 *
 * 친구·친척 구간은 같은 수준의 설문을 찾지 못해 통용 관행으로 표시한다.
 */
export const RELATIONSHIPS: readonly RelationshipOption[] = [
  {
    key: 'acquaintance',
    label: '얼굴만 아는 사이 · 거래처',
    min: 50000,
    max: 50000,
    surveyBacked: false,
    basis: '통용 관행. 참석하지 않고 마음만 전하는 경우가 많습니다.',
  },
  {
    key: 'coworker-distant',
    label: '직장 동료 (일로만 엮임)',
    min: 50000,
    max: 100000,
    surveyBacked: true,
    basis: '인크루트 설문에서 10만원 60.1%. 2023년에는 5만원이 1위였으나 2025년 역전됐습니다.',
  },
  {
    key: 'coworker-close',
    label: '직장 동료 (사적으로 친함)',
    min: 100000,
    max: 150000,
    surveyBacked: true,
    basis: '인크루트 설문에서 10만원 59.7%. 더 친하면 15만원을 내는 응답도 있었습니다.',
  },
  {
    key: 'friend-casual',
    label: '동창 · 가끔 보는 친구',
    min: 50000,
    max: 100000,
    surveyBacked: false,
    basis: '통용 관행. 참석 여부와 식대에 따라 갈립니다.',
  },
  {
    key: 'friend-close',
    label: '친한 친구',
    min: 100000,
    max: 200000,
    surveyBacked: false,
    basis: '통용 관행. 오래 본 사이일수록 높아지는 편입니다.',
  },
  {
    key: 'friend-best',
    label: '절친 · 오래된 친구',
    min: 200000,
    max: 300000,
    surveyBacked: false,
    basis: '통용 관행. 사례 편차가 가장 큰 구간입니다.',
  },
  {
    key: 'relative-distant',
    label: '사촌 등 친척',
    min: 100000,
    max: 200000,
    surveyBacked: false,
    basis: '통용 관행. 집안 분위기와 왕래 정도에 크게 좌우됩니다.',
  },
  {
    key: 'relative-close',
    label: '가까운 친척 (삼촌 · 이모 등)',
    min: 200000,
    max: 500000,
    surveyBacked: false,
    basis: '통용 관행. 집안마다 정해진 기준이 있는 경우가 많으니 먼저 확인해 보세요.',
  },
  {
    key: 'sibling',
    label: '형제 · 자매',
    min: 500000,
    max: 1000000,
    surveyBacked: false,
    basis: '통용 관행. 사실상 집안 사정에 따라 정해지는 금액입니다.',
  },
] as const;

export const SURVEY_SOURCE = '인크루트 「2025년 직장 동료 결혼 축의금」 설문 (2025.5, 직장인 844명)';

/* ─────────────────────────────────────────────
   3. 금액 단위 관행
   ───────────────────────────────────────────── */

/**
 * 축의금으로 흔히 쓰는 단위.
 * 예로부터 홀수를 썼고(음양에서 홀수를 길한 수로 봄), 10만원처럼
 * 10으로 떨어지는 금액은 예외로 통용된다. 그래서 4만원·8만원은 잘 쓰지 않는다.
 */
export const COMMON_DENOMINATIONS: readonly number[] = [
  30000, 50000, 70000, 100000, 150000, 200000, 300000, 500000, 700000, 1000000,
];

export const ODD_NUMBER_NOTE =
  '축의금은 예로부터 홀수로 내는 관행이 있습니다. 3·5·7만원이 흔하고, 10만원처럼 10으로 떨어지는 금액은 예외로 통용됩니다. 4만원과 8만원은 피하는 편입니다.';
