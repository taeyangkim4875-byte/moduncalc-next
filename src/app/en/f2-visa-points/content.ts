/**
 * F-2-7 (Points-Based Residence) visa scoring data + all UI strings.
 *
 * Everything user-facing lives in this file so it can be swapped for an i18n
 * dictionary later without touching the component.
 *
 * Scoring model (Ministry of Justice points system):
 *   Common items  : 130 max  (Age 25 + Education 25 + Korean 20 + Income 60)
 *   Bonus points  : +40 max
 *   Deductions    : -70 max
 *   Overall scale : 170
 *   Pass mark     : 80
 */

export const PASS_MARK = 80;
export const COMMON_MAX = 130;
export const BONUS_CAP = 40;
export const PENALTY_CAP = -70;

export interface PointOption {
  id: string;
  label: string;
  hint?: string;
  points: number;
}

export interface PointCategory {
  key: CategoryKey;
  num: string;
  title: string;
  subtitle: string;
  max: number;
  /** Expandable plain-English explanation of the Korean administrative term. */
  glossary?: { term: string; body: string };
  options: PointOption[];
}

export type CategoryKey = 'age' | 'education' | 'korean' | 'income';

export const CATEGORIES: PointCategory[] = [
  {
    key: 'age',
    num: '1',
    title: 'Age',
    subtitle: 'Your age at the time of application.',
    max: 25,
    options: [
      { id: 'a2529', label: '25 – 29 years old', points: 25 },
      { id: 'a1824', label: '18 – 24 years old', points: 23 },
      { id: 'a3034', label: '30 – 34 years old', points: 23 },
      { id: 'a3539', label: '35 – 39 years old', points: 20 },
      { id: 'a4044', label: '40 – 44 years old', points: 12 },
      { id: 'a4550', label: '45 – 50 years old', points: 8 },
      { id: 'a51', label: '51 years or older', points: 3 },
    ],
  },
  {
    key: 'education',
    num: '2',
    title: 'Education',
    subtitle: 'Your highest completed degree.',
    max: 25,
    glossary: {
      term: 'What counts as STEM?',
      body:
        'Science, Technology, Engineering and Mathematics fields — plus medicine and some applied sciences — are scored higher than humanities and social sciences. A dual major that includes a STEM field is generally treated as STEM. Degrees earned outside Korea must be verified through an apostille or consular authentication before they can be scored.',
    },
    options: [
      { id: 'phd_stem', label: 'Doctorate (PhD) — STEM or dual major', points: 25 },
      { id: 'phd_other', label: 'Doctorate (PhD) — humanities or other', points: 20 },
      { id: 'ma_stem', label: "Master's degree — STEM", points: 20 },
      { id: 'ma_other', label: "Master's degree — other field", points: 17 },
      { id: 'ba_stem', label: "Bachelor's degree — STEM", points: 17 },
      { id: 'ba_other', label: "Bachelor's degree — other field", points: 15 },
      { id: 'assoc_stem', label: 'Associate / vocational degree — STEM', points: 15 },
      { id: 'assoc_other', label: 'Associate / vocational degree — other', points: 10 },
      { id: 'edu_none', label: 'High school or below', points: 0 },
    ],
  },
  {
    key: 'korean',
    num: '3',
    title: 'Korean Language Proficiency',
    subtitle: 'Your TOPIK level or KIIP stage — whichever is higher.',
    max: 20,
    glossary: {
      term: 'What are TOPIK and KIIP?',
      body:
        'TOPIK (Test of Proficiency in Korean) is the official Korean language exam, graded from level 1 to 6. KIIP (Korea Immigration and Integration Program, 사회통합프로그램) is a free government course run by immigration offices that teaches Korean language and Korean society; it runs from Stage 0 to Stage 5. Completing a KIIP stage is recognised as equivalent to the matching TOPIK level, so you only need one of the two. Note that Korean ability is NOT mandatory for the F-2-7 — you can still reach 80 points through age, education, income and bonuses alone.',
    },
    options: [
      { id: 'k5', label: 'TOPIK level 5–6, or KIIP Stage 5 completed', points: 20 },
      { id: 'k4', label: 'TOPIK level 4, or KIIP Stage 4 completed', points: 15 },
      { id: 'k3', label: 'TOPIK level 3, or KIIP Stage 3 completed', points: 10 },
      { id: 'k2', label: 'TOPIK level 2, or KIIP Stage 2 completed', points: 5 },
      { id: 'k1', label: 'TOPIK level 1, or KIIP Stage 1 completed', points: 3 },
      { id: 'k0', label: 'No TOPIK score and no KIIP stage', points: 0 },
    ],
  },
  {
    key: 'income',
    num: '4',
    title: 'Annual Income',
    subtitle: 'Last year’s pre-tax income on your certificate of income amount (소득금액증명원).',
    max: 60,
    glossary: {
      term: 'What is GNI, and why does it matter?',
      body:
        'GNI (Gross National Income) per capita is the average income per person in Korea, published annually by the Bank of Korea. Immigration uses it as the yardstick for income requirements: applicants are generally expected to earn at least around 1.5 times GNI per capita, and 2 times GNI is a common threshold when converting to F-5 permanent residency later. Korea’s GNI per capita has been running in the mid-to-high 40,000 USD range recently — roughly 45–50 million KRW per year — so the income tiers below are best read as multiples of that figure. Always confirm the current published GNI before relying on it.',
    },
    options: [
      { id: 'i100', label: '100 million KRW or more', hint: 'approx. USD 72,000+', points: 60 },
      { id: 'i90', label: '90 – 100 million KRW', points: 58 },
      { id: 'i80', label: '80 – 90 million KRW', points: 56 },
      { id: 'i70', label: '70 – 80 million KRW', points: 53 },
      { id: 'i60', label: '60 – 70 million KRW', points: 50 },
      { id: 'i50', label: '50 – 60 million KRW', points: 45 },
      { id: 'i40', label: '40 – 50 million KRW', points: 40 },
      { id: 'i30', label: '30 – 40 million KRW', points: 30 },
      { id: 'i10', label: 'Above minimum wage, under 30 million KRW', points: 10 },
      { id: 'i0', label: 'Below minimum wage / no declared income', points: 0 },
    ],
  },
];

export interface ExtraItem {
  id: string;
  label: string;
  hint?: string;
  points: number;
}

/** Multi-select. Total bonus is capped at BONUS_CAP. */
export const BONUS_ITEMS: ExtraItem[] = [
  { id: 'b_top500', label: 'Graduated from a global top-500 university', hint: 'QS or Times Higher Education ranking', points: 30 },
  { id: 'b_recommend', label: 'Recommended by a central government ministry', points: 20 },
  { id: 'b_kiip5', label: 'Completed KIIP Stage 5', hint: 'Stacks on top of your language score', points: 10 },
  { id: 'b_kr_degree', label: 'Earned a degree from a Korean university', points: 5 },
  { id: 'b_vol3', label: 'Volunteer / community service, 3 years or more', points: 7 },
  { id: 'b_vol1', label: 'Volunteer / community service, 1 – 2 years', points: 5 },
];

/** Multi-select. Total deduction is floored at PENALTY_CAP. */
export const PENALTY_ITEMS: ExtraItem[] = [
  { id: 'p_crime_high', label: 'Criminal conviction — fine of 3 million KRW or more', points: -40 },
  { id: 'p_crime_mid', label: 'Criminal conviction — fine of 2 – 3 million KRW', points: -30 },
  { id: 'p_crime_low', label: 'Criminal conviction — fine under 2 million KRW', points: -20 },
  { id: 'p_imm_high', label: 'Immigration violation — fine of 3 million KRW or more', points: -30 },
  { id: 'p_imm_mid', label: 'Immigration violation — fine of 1 – 3 million KRW', points: -20 },
  { id: 'p_imm_low', label: 'Immigration violation — fine of 0.5 – 1 million KRW', points: -10 },
];

/** Granted period of stay, derived from the final score. */
export function stayPeriod(total: number): string | null {
  if (total >= 130) return '5 years';
  if (total >= 120) return '3 years';
  if (total >= 110) return '2 years';
  if (total >= PASS_MARK) return '1 year';
  return null;
}

export const UI = {
  eyebrow: 'Living in Korea',
  title: 'F-2-7 Visa Points Calculator',
  description: 'Check whether you reach the 80-point pass mark for Korea’s points-based residence visa.',
  bonusTitle: 'Bonus Points',
  bonusSubtitle: 'Select every item that applies. Bonus is capped at +40.',
  penaltyTitle: 'Deductions',
  penaltySubtitle: 'Select every item that applies. Deductions are capped at −70.',
  scoreLabel: 'Your total score',
  passLabel: 'Pass mark',
  eligible: 'Eligible',
  notEligible: 'Not Eligible',
  idle: 'Start scoring',
  idleNote: 'Answer the questions above to see your score update in real time.',
  eligibleNote: 'You meet the 80-point threshold.',
  notEligibleNote: (gap: number) => `You need ${gap} more point${gap === 1 ? '' : 's'} to reach 80.`,
  stayNote: (period: string) => `Estimated period of stay granted: ${period}.`,
  reset: 'Reset all answers',
  breakdown: 'Score breakdown',
  disclaimer:
    'This calculator is an unofficial estimate based on the publicly documented F-2-7 points table. Point values, bonus items and eligibility criteria are set by the Ministry of Justice and are revised from time to time. Always confirm your score and required documents with HiKorea (☎ 1345) or your local immigration office before applying.',
};
