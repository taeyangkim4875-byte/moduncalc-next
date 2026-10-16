/**
 * 계산 근거와 소관 기관.
 *
 * 세율·요율이 법령으로 정해지는 계산기에만 붙입니다. 시장 평균값이나
 * 설문 분포처럼 출처를 특정할 수 없는 숫자를 쓰는 페이지에는 달지 않습니다.
 * 없는 출처를 적는 것이 출처를 안 적는 것보다 나쁘기 때문입니다.
 *
 * 조문 번호는 개정이 잦아 일부러 적지 않고 법령명까지만 남깁니다.
 * 요율이 바뀌면 basis 를 함께 고칠 것.
 */

export type Authority = {
  name: string;
  url: string;
};

export type SourceEntry = {
  /** 근거 법령 (법령명까지만) */
  laws: string[];
  /** 소관 기관 */
  authorities: Authority[];
  /** 세율·요율의 기준 시점 */
  basis: string;
};

const NTS: Authority = { name: '국세청', url: 'https://www.nts.go.kr' };
const MOIS: Authority = { name: '행정안전부', url: 'https://www.mois.go.kr' };
const MOEL: Authority = { name: '고용노동부', url: 'https://www.moel.go.kr' };
const MOLIT: Authority = { name: '국토교통부', url: 'https://www.molit.go.kr' };
const MOJ: Authority = { name: '법무부', url: 'https://www.moj.go.kr' };
const NPS: Authority = { name: '국민연금공단', url: 'https://www.nps.or.kr' };
const NHIS: Authority = { name: '국민건강보험공단', url: 'https://www.nhis.or.kr' };
const COMWEL: Authority = { name: '근로복지공단', url: 'https://www.comwel.or.kr' };
const FSC: Authority = { name: '금융위원회', url: 'https://www.fsc.go.kr' };
const FSS: Authority = { name: '금융감독원', url: 'https://www.fss.or.kr' };
const KINFA: Authority = { name: '서민금융진흥원', url: 'https://www.kinfa.or.kr' };

/** 법령 원문은 국가법령정보센터에서 확인할 수 있습니다. */
export const LAW_PORTAL = { name: '국가법령정보센터', url: 'https://www.law.go.kr' };

export const CALC_SOURCES: Record<string, SourceEntry> = {
  '/salary/annual': {
    laws: ['근로기준법'],
    authorities: [MOEL],
    basis: '2026년 기준',
  },
  '/salary/insurance': {
    laws: ['국민연금법', '국민건강보험법', '노인장기요양보험법', '고용보험법'],
    authorities: [NPS, NHIS, COMWEL],
    basis: '2026년 근로자 부담 요율 기준',
  },
  '/salary/parental': {
    laws: ['고용보험법', '남녀고용평등과 일·가정 양립 지원에 관한 법률'],
    authorities: [MOEL],
    basis: '2026년 기준',
  },
  '/salary/reverse': {
    laws: ['소득세법', '국민연금법', '국민건강보험법', '고용보험법'],
    authorities: [NTS, NPS, NHIS],
    basis: '2026년 요율 기준',
  },
  '/tax/income': {
    laws: ['소득세법', '지방세법'],
    authorities: [NTS],
    basis: '2026년 세율 기준',
  },
  '/tax/inherit': {
    laws: ['상속세 및 증여세법'],
    authorities: [NTS],
    basis: '2026년 세율·공제 기준',
  },
  '/tax/property': {
    laws: ['지방세법', '종합부동산세법'],
    authorities: [MOIS, NTS],
    basis: '2026년 세율·공정시장가액비율 기준',
  },
  '/tax/vat': {
    laws: ['부가가치세법'],
    authorities: [NTS],
    basis: '2026년 기준 (일반과세 10%)',
  },
  '/realestate/acqtax': {
    laws: ['지방세법', '농어촌특별세법'],
    authorities: [MOIS],
    basis: '2026년 주택 취득세율 기준',
  },
  '/realestate/acqtax/reverse': {
    laws: ['지방세법', '농어촌특별세법'],
    authorities: [MOIS],
    basis: '2026년 주택 취득세율 기준',
  },
  '/realestate/commission': {
    laws: ['공인중개사법 시행규칙', '시·도 중개보수 조례'],
    authorities: [MOLIT],
    basis: '2026년 상한요율 기준',
  },
  '/realestate/convert': {
    laws: ['주택임대차보호법'],
    authorities: [MOJ, MOLIT],
    basis: '2026년 법정 전환율 기준',
  },
  '/realestate/move-out': {
    laws: ['공동주택관리법'],
    authorities: [MOLIT],
    basis: '2026년 기준',
  },
  '/realestate/registration': {
    laws: ['지방세법', '인지세법'],
    authorities: [MOIS, NTS],
    basis: '2026년 기준',
  },
  '/realestate/subscription': {
    laws: ['주택공급에 관한 규칙'],
    authorities: [MOLIT],
    basis: '2026년 청약 가점 기준',
  },
  '/realestate/transfer': {
    laws: ['소득세법'],
    authorities: [NTS],
    basis: '2026년 세율·공제 기준',
  },
  '/realestate': {
    laws: ['지방세법', '소득세법', '주택임대차보호법'],
    authorities: [MOIS, NTS, MOLIT],
    basis: '2026년 기준',
  },
  '/pension/jobless': {
    laws: ['고용보험법'],
    authorities: [MOEL, COMWEL],
    basis: '2026년 구직급여 기준',
  },
  '/pension/nps': {
    laws: ['국민연금법'],
    authorities: [NPS],
    basis: '2026년 보험료율·기준소득월액 기준',
  },
  '/pension': {
    laws: ['국민연금법', '고용보험법'],
    authorities: [NPS, MOEL],
    basis: '2026년 기준',
  },
  '/loan/car': {
    laws: ['지방세법'],
    authorities: [MOIS],
    basis: '2026년 자동차 취득세 기준',
  },
  '/loan/dsr': {
    laws: ['은행업감독규정'],
    authorities: [FSC, FSS],
    basis: '2026년 DSR 규제 기준',
  },
  '/savings/doyak': {
    laws: ['조세특례제한법'],
    authorities: [KINFA, FSC],
    basis: '2026년 정부기여금·비과세 기준',
  },
  '/savings/mirae': {
    laws: [],
    authorities: [FSC, KINFA],
    basis: '2026년 상품 기준',
  },
  '/savings/interest': {
    laws: ['소득세법'],
    authorities: [NTS],
    basis: '2026년 이자소득세 15.4% 기준',
  },
  '/savings': {
    laws: ['조세특례제한법', '소득세법'],
    authorities: [FSC, NTS],
    basis: '2026년 기준',
  },
};
