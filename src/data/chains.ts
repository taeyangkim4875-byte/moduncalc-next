import { getCalc, type CalcMeta } from './calculators';

export interface ParamMapping {
  from: string;
  to: string;
  divide?: number;
  multiply?: number;
  round?: boolean;
}

export interface ChainLink {
  from: string;
  to: string;
  label: string;
  desc: string;
  mappings: ParamMapping[];
}

export const CHAIN_LINKS: ChainLink[] = [
  // ── 소득 흐름 ──
  {
    from: '/salary',
    to: '/pension/nps',
    label: '이 연봉으로 국민연금 알아보기',
    desc: '월 소득이 자동 입력됩니다',
    mappings: [
      { from: 'salary', to: 'income', divide: 12, round: true },
      { from: 'age', to: 'age' },
    ],
  },
  {
    from: '/salary',
    to: '/pension/jobless',
    label: '이 연봉으로 실업급여 알아보기',
    desc: '월평균 임금이 자동 입력됩니다',
    mappings: [
      { from: 'salary', to: 'wage', divide: 12, round: true },
      { from: 'age', to: 'age' },
    ],
  },
  {
    from: '/salary',
    to: '/tax/income',
    label: '연봉 기준 종합소득세 알아보기',
    desc: '과세표준이 자동 입력됩니다',
    mappings: [{ from: 'salary', to: 'income' }],
  },
  {
    from: '/pension/nps',
    to: '/pension/jobless',
    label: '이 소득으로 실업급여 알아보기',
    desc: '월평균 임금이 자동 입력됩니다',
    mappings: [
      { from: 'income', to: 'wage' },
      { from: 'age', to: 'age' },
    ],
  },
  {
    from: '/pension/jobless',
    to: '/pension/nps',
    label: '이 소득으로 국민연금 알아보기',
    desc: '월 소득이 자동 입력됩니다',
    mappings: [
      { from: 'wage', to: 'income' },
      { from: 'age', to: 'age' },
    ],
  },
  {
    from: '/tax/income',
    to: '/salary',
    label: '이 소득으로 실수령액 알아보기',
    desc: '연봉이 자동 입력됩니다',
    mappings: [{ from: 'income', to: 'salary' }],
  },

  // ── 건강 흐름 ──
  {
    from: '/health/bmi',
    to: '/health/bmr',
    label: '이 체형으로 기초대사량 알아보기',
    desc: '키·체중이 자동 입력됩니다',
    mappings: [
      { from: 'height', to: 'height' },
      { from: 'weight', to: 'weight' },
    ],
  },
  {
    from: '/health/bmi',
    to: '/health/bodyfat',
    label: '이 체형으로 체지방률 알아보기',
    desc: '키·체중이 자동 입력됩니다',
    mappings: [
      { from: 'height', to: 'height' },
      { from: 'weight', to: 'weight' },
    ],
  },
  {
    from: '/health/bmr',
    to: '/health/bmi',
    label: 'BMI도 같이 확인하기',
    desc: '키·체중이 자동 입력됩니다',
    mappings: [
      { from: 'height', to: 'height' },
      { from: 'weight', to: 'weight' },
    ],
  },
  {
    from: '/health/bmr',
    to: '/health/bodyfat',
    label: '체지방률도 확인하기',
    desc: '키·체중이 자동 입력됩니다',
    mappings: [
      { from: 'height', to: 'height' },
      { from: 'weight', to: 'weight' },
    ],
  },
  {
    from: '/health/bodyfat',
    to: '/health/bmr',
    label: '기초대사량도 확인하기',
    desc: '키·체중이 자동 입력됩니다',
    mappings: [
      { from: 'height', to: 'height' },
      { from: 'weight', to: 'weight' },
    ],
  },
  {
    from: '/health/bodyfat',
    to: '/health/bmi',
    label: 'BMI도 확인하기',
    desc: '키·체중이 자동 입력됩니다',
    mappings: [
      { from: 'height', to: 'height' },
      { from: 'weight', to: 'weight' },
    ],
  },

  // ── 부동산 흐름 ──
  {
    from: '/realestate/acqtax',
    to: '/realestate/commission',
    label: '이 매물의 중개수수료 알아보기',
    desc: '매매가가 자동 입력됩니다',
    mappings: [{ from: 'price', to: 'price' }],
  },
  {
    from: '/realestate/acqtax',
    to: '/loan',
    label: '이 매물 대출 상환액 계산하기',
    desc: '대출 금액이 자동 입력됩니다',
    mappings: [{ from: 'price', to: 'amount' }],
  },
  {
    from: '/realestate/commission',
    to: '/realestate/acqtax',
    label: '이 매물의 취득세 알아보기',
    desc: '거래가가 자동 입력됩니다',
    mappings: [{ from: 'price', to: 'price' }],
  },
  {
    from: '/realestate/commission',
    to: '/realestate/convert',
    label: '이 가격으로 전월세 전환 계산',
    desc: '보증금이 자동 입력됩니다',
    mappings: [{ from: 'price', to: 'jeonse' }],
  },
  {
    from: '/loan',
    to: '/realestate/acqtax',
    label: '이 금액으로 취득세 알아보기',
    desc: '매매가가 자동 입력됩니다',
    mappings: [{ from: 'amount', to: 'price' }],
  },
  {
    from: '/realestate/convert',
    to: '/realestate/commission',
    label: '이 금액으로 중개수수료 알아보기',
    desc: '거래가가 자동 입력됩니다',
    mappings: [{ from: 'jeonse', to: 'price' }],
  },

  // ── 네이버 유입 상위 페이지에서 나가는 체인 ──
  // 트래픽이 실제로 오는 페이지에는 '다음 단계'가 하나도 없었다.
  // 체인이 걸린 11개 경로는 모두 유입이 거의 없는 쪽이었다.
  {
    from: '/salary/live',
    to: '/salary',
    label: '그래서 실수령액은 얼마인지 보기',
    desc: '연봉이 자동 입력됩니다',
    mappings: [{ from: 'salary', to: 'salary' }],
  },
  {
    from: '/daily/fuel',
    to: '/daily/ev',
    label: '전기차로 바꾸면 얼마 절약되는지 보기',
    desc: '연비와 유가가 자동 입력됩니다',
    mappings: [
      { from: 'eff', to: 'gasEff' },
      { from: 'price', to: 'gasPrice' },
    ],
  },
  {
    from: '/savings/doyak',
    to: '/savings/mirae',
    label: '청년미래적금과 비교하기',
    desc: '소득과 납입액이 자동 입력됩니다',
    mappings: [
      { from: 'size', to: 'size' },
      { from: 'salary', to: 'salary' },
      { from: 'houseIncome', to: 'houseIncome' },
      { from: 'pay', to: 'pay' },
    ],
  },
  {
    from: '/salary/calendar',
    to: '/salary',
    label: '이 월급의 실수령액 확인하기',
    desc: '연봉이 자동 입력됩니다',
    mappings: [{ from: 'salary', to: 'salary' }],
  },
  {
    from: '/salary/annual',
    to: '/salary/severance',
    label: '이 입사일로 퇴직금 계산하기',
    desc: '입사일이 자동 입력됩니다',
    mappings: [{ from: 'startDate', to: 'startDate' }],
  },
  {
    from: '/daily/ev',
    to: '/daily/electric',
    label: '집에서 충전하면 전기요금이 얼마나 오르는지 보기',
    desc: '월 충전량이 사용량에 더해져 누진 구간을 확인할 수 있습니다',
    mappings: [{ from: 'monthlyKwh', to: 'kwh', round: true }],
  },
  {
    from: '/savings/mirae',
    to: '/savings/doyak',
    label: '청년도약계좌와 비교하기',
    desc: '소득과 납입액이 자동 입력됩니다',
    mappings: [
      { from: 'size', to: 'size' },
      { from: 'salary', to: 'salary' },
      { from: 'houseIncome', to: 'houseIncome' },
      { from: 'pay', to: 'pay' },
    ],
  },
];

export function getChainLinks(from: string): ChainLink[] {
  return CHAIN_LINKS.filter(l => l.from === from);
}

export function buildChainUrl(
  link: ChainLink,
  outputs: Record<string, number | string>,
): string {
  const params = new URLSearchParams();
  for (const m of link.mappings) {
    const raw = outputs[m.from];
    if (raw === undefined || raw === '') continue;
    let num = typeof raw === 'number' ? raw : parseFloat(String(raw));
    if (!isNaN(num)) {
      if (m.divide) num /= m.divide;
      if (m.multiply) num *= m.multiply;
      if (m.round) num = Math.round(num);
      params.set(m.to, String(num));
    } else {
      params.set(m.to, String(raw));
    }
  }
  params.set('_from', link.from);
  return `${link.to}?${params.toString()}`;
}

export function getChainCalc(href: string): CalcMeta | undefined {
  return getCalc(href);
}

export interface JourneyInfo {
  title: string;
  desc: string;
  calcs: string[];
}

export const JOURNEYS: JourneyInfo[] = [
  {
    title: '💰 소득 여정',
    desc: '연봉에서 시작해 세금·연금·실업급여까지',
    calcs: ['/salary', '/tax/income', '/pension/nps', '/pension/jobless'],
  },
  {
    title: '💪 건강 여정',
    desc: 'BMI에서 시작해 기초대사량·체지방률까지',
    calcs: ['/health/bmi', '/health/bmr', '/health/bodyfat'],
  },
  {
    title: '🏠 부동산 여정',
    desc: '매매 시 필요한 비용을 순서대로 계산',
    calcs: ['/loan', '/realestate/acqtax', '/realestate/commission', '/realestate/convert'],
  },
];
