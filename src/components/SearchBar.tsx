'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface CalcItem {
  name: string;
  keywords: string[];
  href: string;
  icon: string;
  category: string;
}

const CALCULATORS_KO: CalcItem[] = [
  { name: '스마트 계산기', keywords: ['스마트', '수식', 'cos', 'sin', 'sqrt', '공학', '함수'], href: '/calc', icon: '🧮', category: '계산기' },
  { name: '적금·예금 이자 계산기', keywords: ['적금', '예금', '이자', '만기', '수령액', '단리'], href: '/savings/interest', icon: '🏦', category: '적금' },
  { name: '청년도약계좌 계산기', keywords: ['도약', '도약계좌', '청년도약', '적금', '5년'], href: '/savings/doyak', icon: '🏦', category: '적금' },
  { name: '청년미래적금 계산기', keywords: ['미래', '미래적금', '청년미래', '환승', '3년', '은행별'], href: '/savings/mirae', icon: '🏦', category: '적금' },
  { name: '연봉 상위%', keywords: ['연봉', '상위', '퍼센트', '백분위', '급여', '소득'], href: '/salary', icon: '💰', category: '연봉' },
  { name: '연봉 실수령액 표', keywords: ['실수령액', '표', '연봉', '세후', '월급', '공제'], href: '/salary/table', icon: '📋', category: '연봉' },
  { name: '최저시급 계산기', keywords: ['최저시급', '최저임금', '시급', '주휴수당', '알바', '아르바이트'], href: '/salary/minimum', icon: '💰', category: '연봉' },
  { name: '실업급여 계산기', keywords: ['실업급여', '구직급여', '퇴사', '고용보험', '실직'], href: '/pension/jobless', icon: '👵', category: '연금/보험' },
  { name: '국민연금 계산기', keywords: ['국민연금', '연금', '노후', '수령액', '가입기간'], href: '/pension/nps', icon: '👵', category: '연금/보험' },
  { name: '월급 카운터', keywords: ['실시간', '카운터', '초당', '시급', '분당', '월급'], href: '/salary/live', icon: '⏱️', category: '연봉' },
  { name: '연봉 환산기', keywords: ['환산', '월급', '아이폰', '테슬라', '아파트', '얼마나', '일해야'], href: '/salary/convert', icon: '🛒', category: '연봉' },
  { name: '월급 달력', keywords: ['월급날', '달력', 'D-day', '디데이', '페이데이', '카운트다운'], href: '/salary/calendar', icon: '📆', category: '연봉' },
  { name: '평생 근로소득', keywords: ['평생', '근로소득', '총소득', '은퇴', '임금상승률'], href: '/salary/lifetime', icon: '💰', category: '연봉' },
  { name: '퇴직금 계산기', keywords: ['퇴직금', '퇴직', '퇴사', '재직기간', '평균임금'], href: '/salary/severance', icon: '💰', category: '연봉' },
  { name: '육아휴직 급여 계산기', keywords: ['육아휴직', '육아', '출산', '6+6', '부모휴직', '급여'], href: '/salary/parental', icon: '👶', category: '연봉' },
  { name: '연차 계산기', keywords: ['연차', '월차', '유급휴가', '연차일수', '입사일'], href: '/salary/annual', icon: '📅', category: '연봉' },
  { name: '대출 이자 계산기', keywords: ['대출', '이자', '원리금', '원금균등', '상환', '모기지', '주담대'], href: '/loan', icon: '🏠', category: '대출' },
  { name: '자동차 할부 계산기', keywords: ['자동차', '할부', '차량', '오토론', '취등록세', '선수금', '다운페이'], href: '/loan/car', icon: '🚗', category: '대출' },
  { name: 'BMI 계산기', keywords: ['bmi', '체질량', '비만', '체중', '키', '다이어트'], href: '/health/bmi', icon: '💪', category: '건강' },
  { name: '기초대사량 계산기', keywords: ['기초대사량', 'bmr', '칼로리', 'tdee', '다이어트', '대사'], href: '/health/bmr', icon: '💪', category: '건강' },
  { name: '퍼센트 계산기', keywords: ['퍼센트', '%', '비율', '변화율', '할인율'], href: '/daily/percent', icon: '📊', category: '일상' },
  { name: '할인가 계산기', keywords: ['할인', '세일', '1+1', '단가', '가격'], href: '/daily/discount', icon: '🏷️', category: '일상' },
  { name: '더치페이 계산기', keywords: ['더치페이', 'n분의1', '나누기', '팁', '모임'], href: '/daily/dutch', icon: '🍽️', category: '일상' },
  { name: 'D-day 계산기', keywords: ['디데이', 'd-day', '날짜', '기념일', '남은날'], href: '/daily/dday', icon: '📅', category: '일상' },
  { name: '나이 계산기', keywords: ['나이', '만나이', '한국나이', '띠', '별자리', '생년월일'], href: '/daily/age', icon: '🎂', category: '일상' },
  { name: '단위 변환기', keywords: ['단위', '변환', '길이', '무게', '온도', '면적', '평', 'cm', 'kg'], href: '/daily/unit', icon: '📏', category: '일상' },
  { name: '속도·시간 계산기', keywords: ['속도', '시간', '거리', 'km', '소요시간'], href: '/daily/speed', icon: '🚗', category: '일상' },
  { name: '연비 계산기', keywords: ['연비', '주유', '기름값', '유류비', '자동차'], href: '/daily/fuel', icon: '⛽', category: '일상' },
  { name: '취득세 계산기', keywords: ['취득세', '부동산', '매매', '아파트', '주택', '세금'], href: '/realestate/acqtax', icon: '🏢', category: '부동산' },
  { name: '전월세 전환 계산기', keywords: ['전월세', '전세', '월세', '전환율', '보증금'], href: '/realestate/convert', icon: '🏢', category: '부동산' },
  { name: '복비 계산기', keywords: ['복비', '중개수수료', '중개보수', '부동산', '매매', '전세'], href: '/realestate/commission', icon: '🏢', category: '부동산' },
  { name: '양도소득세 계산기', keywords: ['양도세', '양도소득세', '부동산', '매매', '차익'], href: '/realestate/transfer', icon: '🏢', category: '부동산' },
  { name: '임대수익률 계산기', keywords: ['임대', '수익률', '월세', '투자', '부동산', '회수기간'], href: '/realestate/rental', icon: '🏢', category: '부동산' },
  { name: '증여세 계산기', keywords: ['증여세', '증여', '자녀', '배우자', '면제한도', '상속'], href: '/tax/gift', icon: '🧾', category: '세금' },
  { name: '전기요금 계산기', keywords: ['전기요금', '전기세', '누진제', '전력', 'kWh', '에어컨'], href: '/daily/electric', icon: '⚡', category: '일상' },
  { name: '주식 수익률 계산기', keywords: ['주식', '수익률', '물타기', '평단가', '손익', '매수', '매도'], href: '/daily/stock', icon: '📈', category: '투자' },
  { name: 'FIRE 계산기', keywords: ['파이어', 'fire', '조기은퇴', '경제적자유', '저축률', '4%룰'], href: '/daily/fire', icon: '🔥', category: '투자' },
  { name: '전역일 계산기', keywords: ['전역일', '군대', '입대', '복무', '육군', '해군', '공군', '해병대'], href: '/daily/military', icon: '🪖', category: '일상' },
  { name: '학점 계산기', keywords: ['학점', 'gpa', '평점', '대학', '성적', '평균'], href: '/daily/gpa', icon: '🎓', category: '일상' },
  { name: '부가세 계산기', keywords: ['부가세', 'vat', '부가가치세', '공급가액', '세금계산서'], href: '/tax/vat', icon: '🧾', category: '세금' },
  { name: '종합소득세 계산기', keywords: ['종합소득세', '종소세', '소득세', '누진세', '세율', '프리랜서'], href: '/tax/income', icon: '🧾', category: '세금' },
  { name: '글자수 세기', keywords: ['글자수', '바이트', '단어수', '문자수', '공백', '자소서', '카운터'], href: '/daily/charcount', icon: '📝', category: '일상' },
  { name: '비밀번호 생성기', keywords: ['비밀번호', '패스워드', '랜덤', '생성', '보안'], href: '/daily/password', icon: '🔐', category: '일상' },
  { name: '랜덤 번호 뽑기', keywords: ['랜덤', '번호', '추첨', '로또', '뽑기', '제비', '섞기'], href: '/daily/random', icon: '🎲', category: '일상' },
  { name: '시간 계산기', keywords: ['시간', '차이', '근무시간', '알바', '시급', '더하기'], href: '/daily/time', icon: '⏰', category: '일상' },
  { name: '수면 계산기', keywords: ['수면', '잠', '기상', '취침', '수면주기', '개운'], href: '/health/sleep', icon: '😴', category: '건강' },
  { name: '청약 가점 계산기', keywords: ['청약', '가점', '무주택', '부양가족', '청약통장', '아파트'], href: '/realestate/subscription', icon: '🏢', category: '부동산' },
  { name: '칼로리 계산기', keywords: ['칼로리', 'TDEE', '기초대사량', '다이어트', '섭취량', '소모'], href: '/daily/calorie', icon: '🍎', category: '건강' },
  { name: '평수 계산기', keywords: ['평수', '평', '제곱미터', '㎡', '면적', '아파트', '전용면적'], href: '/daily/pyeong', icon: '📐', category: '부동산' },
  { name: '상속세 계산기', keywords: ['상속세', '상속', '유산', '배우자공제', '일괄공제', '세율'], href: '/tax/inherit', icon: '🧾', category: '세금' },
  { name: '자동차세 계산기', keywords: ['자동차세', '배기량', '연식', '차량세', '지방교육세', '연납'], href: '/daily/cartax', icon: '🚗', category: '자동차' },
  { name: 'DSR 계산기', keywords: ['DSR', '대출', '한도', '총부채', '원리금', '상환비율', '주담대'], href: '/loan/dsr', icon: '🏠', category: '대출' },
  { name: '수도요금 계산기', keywords: ['수도', '요금', '수도세', '상수도', '하수도', '물값'], href: '/daily/water', icon: '💧', category: '일상' },
  { name: '가스요금 계산기', keywords: ['가스', '요금', '난방비', '도시가스', '보일러', '가스비'], href: '/daily/gas', icon: '🔥', category: '일상' },
  { name: '아기 100일 계산기', keywords: ['아기', '100일', '백일', '돌', '기념일', '개월수'], href: '/daily/baby100', icon: '👶', category: '일상' },
  { name: '기념일 계산기', keywords: ['기념일', '100일', '200일', '1000일', '연애', '사귄날'], href: '/daily/anniversary', icon: '💕', category: '일상' },
  { name: '복리 계산기', keywords: ['복리', '이자', '투자', '수익률', '원금', '적립', '72법칙'], href: '/daily/compound', icon: '📈', category: '투자' },
  { name: '음주 운전 가능 시간', keywords: ['음주', '운전', '알코올', '혈중', '소주', '맥주', '분해'], href: '/daily/alcohol', icon: '🍺', category: '일상' },
  { name: '출산 예정일 계산기', keywords: ['출산', '예정일', '임신', '주수', '생리일', '배란', '태아'], href: '/daily/due-date', icon: '🤰', category: '건강' },
  { name: '에어프라이어 변환기', keywords: ['에어프라이어', '오븐', '변환', '시간', '온도', '요리'], href: '/daily/airfryer', icon: '🍳', category: '일상' },
  { name: '음력 양력 변환기', keywords: ['음력', '양력', '변환', '설날', '추석', '음력생일'], href: '/daily/lunar', icon: '🌙', category: '일상' },
  { name: '페인트 벽지 계산기', keywords: ['페인트', '벽지', '인테리어', '도배', '면적', '롤'], href: '/daily/paint', icon: '🎨', category: '일상' },
  { name: '체지방률 계산기', keywords: ['체지방', '체지방률', '비만', '허리둘레', '목둘레', '해군'], href: '/health/bodyfat', icon: '💪', category: '건강' },
  { name: '에어컨 전기요금 계산기', keywords: ['에어컨', '전기요금', '전기세', '냉방', '인버터', '누진', '여름'], href: '/daily/aircon', icon: '❄️', category: '일상' },
  { name: '여행 경비 계산기', keywords: ['여행', '경비', '예산', '항공', '숙소', '일본', '유럽', '동남아'], href: '/daily/travel', icon: '✈️', category: '일상' },
  { name: '애드센스 수익 계산기', keywords: ['애드센스', 'adsense', '블로그', '수익', 'RPM', 'CPC', '광고'], href: '/daily/adsense', icon: '💻', category: '부업' },
  { name: '쿠팡 파트너스 계산기', keywords: ['쿠팡', '파트너스', '쿠팡파트너스', '수익', '전환율', '수수료'], href: '/daily/coupang', icon: '🛍️', category: '부업' },
  { name: '유튜브 수익 계산기', keywords: ['유튜브', 'youtube', '조회수', 'CPM', '수익', '구독자', '광고'], href: '/daily/youtube', icon: '🎬', category: '부업' },
];

const CALCULATORS_EN: CalcItem[] = [
  { name: 'Flat vs Progressive Tax', keywords: ['flat tax', '19%', 'foreigner', 'expat', 'progressive', 'compare', 'which'], href: '/en/tax-comparison', icon: '💰', category: 'Tax' },
  { name: 'Salary Calculator', keywords: ['salary', 'net pay', 'take-home', 'paycheck', 'after tax', 'deductions'], href: '/en/salary', icon: '💰', category: 'Salary' },
  { name: 'Pension Refund Calculator', keywords: ['pension', 'refund', 'lump sum', 'national pension', 'leaving korea', 'NPS'], href: '/en/pension-refund', icon: '👵', category: 'Pension' },
  { name: 'Korean Age Calculator', keywords: ['korean age', 'international age', 'age', 'how old', 'birthday'], href: '/en/korean-age', icon: '🎂', category: 'Daily' },
  { name: 'Jeonse vs Wolse Calculator', keywords: ['jeonse', 'wolse', 'rent', 'deposit', 'housing', 'apartment', 'key money'], href: '/en/rent', icon: '🏠', category: 'Housing' },
  { name: 'Severance Pay Calculator', keywords: ['severance', 'retirement', 'quitting', 'leaving job', 'severance pay'], href: '/en/severance', icon: '💰', category: 'Salary' },
  { name: 'Health Insurance Calculator', keywords: ['health', 'insurance', 'NHI', 'premium', 'medical', 'healthcare'], href: '/en/health-insurance', icon: '🏥', category: 'Insurance' },
  { name: 'Cost of Living Calculator', keywords: ['cost', 'living', 'expenses', 'budget', 'rent', 'Seoul', 'monthly'], href: '/en/cost-of-living', icon: '🏙️', category: 'Living' },
  { name: 'Subway Fare Calculator', keywords: ['subway', 'metro', 'fare', 'T-money', 'train', 'Seoul', 'transport'], href: '/en/subway', icon: '🚇', category: 'Transport' },
  { name: 'Size Converter', keywords: ['size', 'clothing', 'shoe', 'Korean size', 'convert', 'US', 'EU'], href: '/en/size-converter', icon: '👟', category: 'Shopping' },
  { name: 'Tipping Guide', keywords: ['tip', 'tipping', 'gratuity', 'restaurant', 'service'], href: '/en/tip-calculator', icon: '💵', category: 'Culture' },
  { name: 'Time Zone Converter', keywords: ['time', 'timezone', 'KST', 'UTC', 'Seoul time', 'convert'], href: '/en/timezone', icon: '🕐', category: 'Daily' },
  { name: 'Electricity Bill', keywords: ['electricity', 'bill', 'power', 'kWh', 'KEPCO', 'utility'], href: '/en/electricity', icon: '⚡', category: 'Housing' },
  { name: 'Date Converter', keywords: ['date', 'format', 'Korean date', 'calendar', 'holiday', 'lunar'], href: '/en/date-converter', icon: '📅', category: 'Daily' },
  { name: 'Grocery Prices', keywords: ['grocery', 'food', 'price', 'supermarket', 'market', 'cost'], href: '/en/grocery', icon: '🛒', category: 'Living' },
  { name: 'Internet Plans', keywords: ['internet', 'wifi', 'broadband', 'mobile data', 'KT', 'SKT', 'plan'], href: '/en/internet-speed', icon: '📶', category: 'Living' },
  { name: 'Blood Alcohol Calculator', keywords: ['alcohol', 'BAC', 'DUI', 'drunk', 'drive', 'soju', 'beer'], href: '/en/alcohol', icon: '🍺', category: 'Daily' },
  { name: 'Air Fryer Converter', keywords: ['air fryer', 'oven', 'convert', 'temperature', 'time', 'cooking'], href: '/en/air-fryer', icon: '🍳', category: 'Daily' },
  { name: 'Compound Interest', keywords: ['compound', 'interest', 'investment', 'growth', 'savings', 'rule of 72'], href: '/en/compound', icon: '📈', category: 'Finance' },
  { name: 'Due Date Calculator', keywords: ['pregnancy', 'due date', 'week', 'baby', 'prenatal', 'trimester'], href: '/en/due-date', icon: '🤰', category: 'Health' },
  { name: 'Body Fat Calculator', keywords: ['body fat', 'percentage', 'navy', 'waist', 'neck', 'fitness'], href: '/en/body-fat', icon: '💪', category: 'Health' },
  { name: 'Lunar Calendar 2026', keywords: ['lunar', 'calendar', 'Seollal', 'Chuseok', 'holiday', 'Korean'], href: '/en/lunar-calendar', icon: '🌙', category: 'Culture' },
  { name: 'Paint Calculator', keywords: ['paint', 'wallpaper', 'room', 'liters', 'rolls', 'area'], href: '/en/paint', icon: '🎨', category: 'Daily' },
  { name: 'Character Counter', keywords: ['character', 'word', 'count', 'byte', 'sentence', 'twitter'], href: '/en/character-counter', icon: '📝', category: 'Tools' },
  { name: 'Calorie Calculator', keywords: ['calorie', 'TDEE', 'BMR', 'diet', 'weight', 'loss'], href: '/en/calorie', icon: '🍎', category: 'Health' },
  { name: 'Pyeong Converter', keywords: ['pyeong', 'square meter', 'apartment', 'size', 'area', 'convert'], href: '/en/pyeong', icon: '📐', category: 'Housing' },
  { name: 'Password Generator', keywords: ['password', 'random', 'secure', 'generate', 'strong'], href: '/en/password', icon: '🔐', category: 'Tools' },
  { name: 'Random Generator', keywords: ['random', 'number', 'lottery', 'picker', 'shuffle', 'draw'], href: '/en/random', icon: '🎲', category: 'Tools' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');
  const calculators = isEn ? CALCULATORS_EN : CALCULATORS_KO;

  const filtered = query.trim()
    ? calculators.filter(c => {
        const q = query.toLowerCase();
        return c.name.toLowerCase().includes(q) ||
               c.keywords.some(k => k.toLowerCase().includes(q)) ||
               c.category.toLowerCase().includes(q);
      })
    : [];

  const showResults = focused && (query.trim().length > 0);

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && filtered[selectedIndex]) {
      e.preventDefault();
      navigateTo(filtered[selectedIndex].href);
    } else if (e.key === 'Escape') {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const navigateTo = (href: string) => {
    setQuery('');
    setFocused(false);
    setSelectedIndex(-1);
    router.push(href);
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => { setSelectedIndex(-1); }, [query]);

  return (
    <div className="relative mb-4">
      {/* 검색 입력 */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--sub)] text-base pointer-events-none">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={isEn ? "Search calculators (e.g. salary, tax, pension)" : "계산기 검색 (예: 연봉, BMI, 대출)"}
          className="w-full py-3 pl-10 pr-4 border-[1.5px] border-[var(--line)] rounded-2xl text-sm font-semibold text-[var(--ink)] outline-none bg-white focus:border-[var(--primary)] transition-colors placeholder:text-[var(--sub)] placeholder:font-medium"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sub)] text-sm cursor-pointer bg-transparent border-0 hover:text-[var(--ink)]"
          >✕</button>
        )}
      </div>

      {/* 검색 결과 드롭다운 */}
      {showResults && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-lg border border-[var(--line)] z-[100] max-h-[360px] overflow-y-auto"
        >
          {filtered.length > 0 ? (
            <div className="p-2">
              {filtered.map((item, i) => (
                <button
                  key={item.href}
                  onClick={() => navigateTo(item.href)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer border-0 transition-colors ${
                    selectedIndex === i ? 'bg-[var(--primary-weak)]' : 'bg-transparent hover:bg-[var(--bg)]'
                  }`}
                >
                  <span className="text-xl w-8 text-center flex-none">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[var(--ink)] truncate">{item.name}</div>
                    <div className="text-[11px] text-[var(--sub)] font-medium">{item.category}</div>
                  </div>
                  <span className="text-xs text-[var(--sub)] flex-none">→</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-[var(--sub)]">
              <span className="text-2xl block mb-2">🔍</span>
              {isEn ? `No calculators found for "${query}"` : `"${query}"에 해당하는 계산기가 없어요`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
