export interface CalcMeta {
  href: string;
  icon: string;
  title: string;
  desc: string;
  category: string;
  keywords: string[];
  related?: string[];
}

const ALL_KO: CalcMeta[] = [
  // 연봉 / 급여
  { href: '/salary', icon: '💰', title: '연봉 실수령액', desc: '백분위 포함', category: '연봉', keywords: ['연봉', '상위', '퍼센트', '백분위', '급여', '소득', '실수령액'] },
  { href: '/salary/table', icon: '📋', title: '실수령액 표', desc: '2천만~1.5억', category: '연봉', keywords: ['실수령액', '표', '연봉', '세후', '월급', '공제'] },
  { href: '/salary/minimum', icon: '💰', title: '최저시급', desc: '주휴수당·월급', category: '연봉', keywords: ['최저시급', '최저임금', '시급', '주휴수당', '알바', '아르바이트'] },
  { href: '/salary/severance', icon: '💰', title: '퇴직금', desc: '예상 퇴직금', category: '연봉', keywords: ['퇴직금', '퇴직', '퇴사', '재직기간', '평균임금'], related: ['/pension/jobless', '/salary/annual'] },
  { href: '/salary/live', icon: '⏱️', title: '월급 카운터', desc: '초당 버는 돈', category: '연봉', keywords: ['실시간', '카운터', '초당', '시급', '분당', '월급'] },
  { href: '/salary/convert', icon: '🛒', title: '연봉 환산기', desc: '아이폰 며칠?', category: '연봉', keywords: ['환산', '월급', '아이폰', '테슬라', '아파트', '얼마나', '일해야'] },
  { href: '/salary/calendar', icon: '📆', title: '월급 달력', desc: 'D-day', category: '연봉', keywords: ['월급날', '달력', 'D-day', '디데이', '페이데이', '카운트다운'] },
  { href: '/salary/parental', icon: '👶', title: '육아휴직', desc: '6+6 급여', category: '연봉', keywords: ['육아휴직', '육아', '출산', '6+6', '부모휴직', '급여'], related: ['/salary/annual', '/salary/severance'] },
  { href: '/salary/annual', icon: '📅', title: '연차', desc: '입사일 기준', category: '연봉', keywords: ['연차', '월차', '유급휴가', '연차일수', '입사일'], related: ['/salary/severance', '/salary/minimum'] },
  { href: '/salary/lifetime', icon: '💰', title: '평생 근로소득', desc: '은퇴까지', category: '연봉', keywords: ['평생', '근로소득', '총소득', '은퇴', '임금상승률'] },
  { href: '/salary/insurance', icon: '🛡️', title: '4대보험', desc: '보험료 상세 계산', category: '연봉', keywords: ['4대보험', '국민연금', '건강보험', '고용보험', '장기요양', '보험료', '사회보험'], related: ['/salary', '/pension/nps'] },

  // 적금 / 예금
  { href: '/savings/doyak', icon: '🏦', title: '청년도약계좌', desc: '적립액+만기+특별해지', category: '적금', keywords: ['도약', '도약계좌', '청년도약', '적금', '5년'], related: ['/savings/mirae', '/salary'] },
  { href: '/savings/mirae', icon: '🏦', title: '청년미래적금', desc: '우대금리 비교', category: '적금', keywords: ['미래', '미래적금', '청년미래', '환승', '3년', '은행별'], related: ['/savings/doyak', '/salary/table'] },
  { href: '/savings/interest', icon: '🏦', title: '적금·예금 이자', desc: '만기 수령액', category: '적금', keywords: ['적금', '예금', '이자', '만기', '수령액', '단리'] },
  { href: '/daily/compound', icon: '📈', title: '복리 계산기', desc: '투자 수익 시뮬레이션', category: '투자', keywords: ['복리', '이자', '투자', '수익률', '원금', '적립', '72법칙'] },

  // 대출 / 부동산
  { href: '/loan', icon: '🏠', title: '대출 이자', desc: '원리금·원금균등', category: '대출', keywords: ['대출', '이자', '원리금', '원금균등', '상환', '모기지', '주담대'], related: ['/loan/car', '/realestate/acqtax'] },
  { href: '/loan/dsr', icon: '🏠', title: 'DSR', desc: '대출 한도 확인', category: '대출', keywords: ['DSR', '대출', '한도', '총부채', '원리금', '상환비율', '주담대'] },
  { href: '/loan/car', icon: '🚗', title: '자동차 할부', desc: '월 납입액', category: '대출', keywords: ['자동차', '할부', '차량', '오토론', '취등록세', '선수금', '다운페이'], related: ['/loan', '/realestate/commission'] },
  { href: '/realestate/acqtax', icon: '🏢', title: '취득세', desc: '주택 매매', category: '부동산', keywords: ['취득세', '부동산', '매매', '아파트', '주택', '세금'], related: ['/realestate/commission', '/realestate/transfer', '/loan'] },
  { href: '/realestate/registration', icon: '🏢', title: '등기비용', desc: '인지세·법무사', category: '부동산', keywords: ['등기', '등기비용', '인지세', '법무사', '소유권이전', '부동산'] },
  { href: '/realestate/convert', icon: '🏢', title: '전월세 전환', desc: '전세↔월세', category: '부동산', keywords: ['전월세', '전세', '월세', '전환율', '보증금'], related: ['/realestate/commission', '/realestate/acqtax'] },
  { href: '/realestate/commission', icon: '🏢', title: '복비', desc: '중개수수료', category: '부동산', keywords: ['복비', '중개수수료', '중개보수', '부동산', '매매', '전세'], related: ['/realestate/acqtax', '/realestate/convert'] },
  { href: '/realestate/transfer', icon: '🏢', title: '양도소득세', desc: '부동산 양도세', category: '부동산', keywords: ['양도세', '양도소득세', '부동산', '매매', '차익'], related: ['/realestate/acqtax', '/tax/income'] },
  { href: '/realestate/rental', icon: '🏢', title: '임대수익률', desc: '투자 수익률', category: '부동산', keywords: ['임대', '수익률', '월세', '투자', '부동산', '회수기간'] },
  { href: '/realestate/subscription', icon: '🏢', title: '청약 가점', desc: '84점 만점', category: '부동산', keywords: ['청약', '가점', '무주택', '부양가족', '청약통장', '아파트'] },
  { href: '/daily/pyeong', icon: '📐', title: '평수 변환', desc: '평↔㎡', category: '부동산', keywords: ['평수', '평', '제곱미터', '㎡', '면적', '아파트', '전용면적'] },

  // 세금
  { href: '/tax/vat', icon: '🧾', title: '부가세', desc: '공급가액·역산', category: '세금', keywords: ['부가세', 'vat', '부가가치세', '공급가액', '세금계산서'], related: ['/tax/income'] },
  { href: '/tax/income', icon: '🧾', title: '종합소득세', desc: '누진세율', category: '세금', keywords: ['종합소득세', '종소세', '소득세', '누진세', '세율', '프리랜서'], related: ['/tax/vat', '/salary'] },
  { href: '/tax/gift', icon: '🧾', title: '증여세', desc: '가족 간', category: '세금', keywords: ['증여세', '증여', '자녀', '배우자', '면제한도', '상속'] },
  { href: '/tax/inherit', icon: '🧾', title: '상속세', desc: '공제 자동 계산', category: '세금', keywords: ['상속세', '상속', '유산', '배우자공제', '일괄공제', '세율'] },
  { href: '/tax/property', icon: '🏘️', title: '종합부동산세', desc: '종부세 시뮬레이션', category: '세금', keywords: ['종부세', '종합부동산세', '보유세', '공시가격', '부동산세', '재산세'], related: ['/realestate/acqtax', '/tax/income'] },
  { href: '/tax/eitc', icon: '🧾', title: '근로장려금', desc: '자녀장려금 포함', category: '세금', keywords: ['근로장려금', '자녀장려금', 'EITC', '장려금', '신청', '지급', '반기'], related: ['/salary', '/tax/income'] },
  { href: '/daily/cartax', icon: '🚗', title: '자동차세', desc: '배기량·연식', category: '자동차', keywords: ['자동차세', '배기량', '연식', '차량세', '지방교육세', '연납'] },

  // 연금 / 보험
  { href: '/pension/jobless', icon: '👵', title: '실업급여', desc: '구직급여 예상액', category: '연금/보험', keywords: ['실업급여', '구직급여', '퇴사', '고용보험', '실직'], related: ['/pension/nps', '/salary/severance'] },
  { href: '/pension/nps', icon: '👵', title: '국민연금', desc: '예상 수령액', category: '연금/보험', keywords: ['국민연금', '연금', '노후', '수령액', '가입기간'], related: ['/pension/jobless', '/salary'] },

  // 건강
  { href: '/health/bmi', icon: '💪', title: 'BMI', desc: '체질량지수', category: '건강', keywords: ['bmi', '체질량', '비만', '체중', '키', '다이어트'], related: ['/health/bmr'] },
  { href: '/health/bmr', icon: '💪', title: '기초대사량', desc: '일일 칼로리', category: '건강', keywords: ['기초대사량', 'bmr', '칼로리', 'tdee', '다이어트', '대사'], related: ['/health/bmi'] },
  { href: '/health/bodyfat', icon: '💪', title: '체지방률', desc: 'US Navy 공식', category: '건강', keywords: ['체지방', '체지방률', '비만', '허리둘레', '목둘레', '해군'] },
  { href: '/daily/calorie', icon: '🍎', title: '칼로리', desc: 'TDEE·다이어트', category: '건강', keywords: ['칼로리', 'TDEE', '기초대사량', '다이어트', '섭취량', '소모'] },
  { href: '/health/sleep', icon: '😴', title: '수면 계산기', desc: '최적 취침 시간', category: '건강', keywords: ['수면', '잠', '기상', '취침', '수면주기', '개운'] },
  { href: '/health/water', icon: '💧', title: '물 섭취량', desc: '하루 권장량', category: '건강', keywords: ['물', '수분', '섭취량', '권장량', '하루', '건강'] },
  { href: '/daily/bmi-child', icon: '👦', title: '어린이 BMI', desc: '소아 백분위', category: '건강', keywords: ['어린이', 'bmi', '소아', '백분위', '키', '체중', '비만'] },

  // 일상 도구
  { href: '/daily/charcount', icon: '📝', title: '글자수 세기', desc: '바이트·키워드', category: '일상', keywords: ['글자수', '바이트', '단어수', '문자수', '공백', '자소서', '카운터'] },
  { href: '/daily/password', icon: '🔐', title: '비밀번호 생성', desc: '랜덤 생성기', category: '일상', keywords: ['비밀번호', '패스워드', '랜덤', '생성', '보안'] },
  { href: '/daily/random', icon: '🎲', title: '랜덤 뽑기', desc: '로또·추첨', category: '일상', keywords: ['랜덤', '번호', '추첨', '로또', '뽑기', '제비', '섞기'] },
  { href: '/daily/time', icon: '⏰', title: '시간 계산기', desc: '시간 차이·근무', category: '일상', keywords: ['시간', '차이', '근무시간', '알바', '시급', '더하기'] },
  { href: '/daily/percent', icon: '📊', title: '퍼센트', desc: '비율·변화율', category: '일상', keywords: ['퍼센트', '%', '비율', '변화율', '할인율'] },
  { href: '/daily/discount', icon: '🏷️', title: '할인가', desc: '1+1 단가', category: '일상', keywords: ['할인', '세일', '1+1', '단가', '가격'] },
  { href: '/daily/unit', icon: '📏', title: '단위변환', desc: '길이·무게·온도', category: '일상', keywords: ['단위', '변환', '길이', '무게', '온도', '면적', '평', 'cm', 'kg'] },
  { href: '/daily/speed', icon: '🚗', title: '속도·시간', desc: '소요시간', category: '일상', keywords: ['속도', '시간', '거리', 'km', '소요시간'] },

  // 날짜 / 기념일
  { href: '/daily/dday', icon: '📅', title: 'D-day', desc: '날짜 차이', category: '일상', keywords: ['디데이', 'd-day', '날짜', '기념일', '남은날'] },
  { href: '/daily/age', icon: '🎂', title: '나이', desc: '만 나이·띠', category: '일상', keywords: ['나이', '만나이', '한국나이', '띠', '별자리', '생년월일'] },
  { href: '/daily/anniversary', icon: '💕', title: '기념일', desc: '100일·1000일', category: '일상', keywords: ['기념일', '100일', '200일', '1000일', '연애', '사귄날'] },
  { href: '/daily/baby100', icon: '👶', title: '아기 100일', desc: '백일·돌', category: '일상', keywords: ['아기', '100일', '백일', '돌', '기념일', '개월수'] },
  { href: '/daily/due-date', icon: '🤰', title: '출산 예정일', desc: '임신 주수', category: '건강', keywords: ['출산', '예정일', '임신', '주수', '생리일', '배란', '태아'] },
  { href: '/daily/lunar', icon: '🌙', title: '음력 양력', desc: '날짜 변환', category: '일상', keywords: ['음력', '양력', '변환', '설날', '추석', '음력생일'] },
  { href: '/daily/military', icon: '🪖', title: '전역일', desc: '군별 D-day', category: '일상', keywords: ['전역일', '군대', '입대', '복무', '육군', '해군', '공군', '해병대'] },

  // 자동차 / 생활비
  { href: '/daily/fuel', icon: '⛽', title: '연비·전비', desc: '내연차 vs 전기차', category: '일상', keywords: ['연비', '주유', '기름값', '유류비', '자동차'] },
  { href: '/daily/aircon', icon: '❄️', title: '에어컨 전기요금', desc: '여름 필수', category: '일상', keywords: ['에어컨', '전기요금', '전기세', '냉방', '인버터', '누진', '여름'] },
  { href: '/daily/electric', icon: '⚡', title: '전기요금', desc: '누진제', category: '일상', keywords: ['전기요금', '전기세', '누진제', '전력', 'kWh', '에어컨'] },
  { href: '/daily/water', icon: '💧', title: '수도요금', desc: '누진 계산', category: '일상', keywords: ['수도', '요금', '수도세', '상수도', '하수도', '물값'] },
  { href: '/daily/gas', icon: '🔥', title: '가스요금', desc: '난방비', category: '일상', keywords: ['가스', '요금', '난방비', '도시가스', '보일러', '가스비'] },
  { href: '/daily/airfryer', icon: '🍳', title: '에어프라이어', desc: '오븐 변환', category: '일상', keywords: ['에어프라이어', '오븐', '변환', '시간', '온도', '요리'] },
  { href: '/daily/paint', icon: '🎨', title: '페인트·벽지', desc: '자재량', category: '일상', keywords: ['페인트', '벽지', '인테리어', '도배', '면적', '롤'] },
  { href: '/daily/travel', icon: '✈️', title: '여행 경비', desc: '예산 계산', category: '일상', keywords: ['여행', '경비', '예산', '항공', '숙소', '일본', '유럽', '동남아'] },

  // 투자 / 부업
  { href: '/daily/stock', icon: '📈', title: '주식 수익률', desc: '손익·물타기', category: '투자', keywords: ['주식', '수익률', '물타기', '평단가', '손익', '매수', '매도'], related: ['/daily/percent', '/tax/income'] },
  { href: '/daily/crypto', icon: '₿', title: '가상자산', desc: '비트코인 수익', category: '투자', keywords: ['가상자산', '비트코인', '수익률', '투자', '코인', '이더리움'] },
  { href: '/daily/gold', icon: '🪙', title: '금 시세', desc: '돈·g·oz', category: '투자', keywords: ['금', '시세', '금값', '돈', 'oz', '그램', '금거래'] },
  { href: '/daily/fire', icon: '🔥', title: 'FIRE', desc: '조기 은퇴', category: '투자', keywords: ['파이어', 'fire', '조기은퇴', '경제적자유', '저축률', '4%룰'] },
  { href: '/daily/adsense', icon: '💻', title: '애드센스', desc: '블로그 수익', category: '부업', keywords: ['애드센스', 'adsense', '블로그', '수익', 'RPM', 'CPC', '광고'] },
  { href: '/daily/coupang', icon: '🛍️', title: '쿠팡 파트너스', desc: '수수료 수익', category: '부업', keywords: ['쿠팡', '파트너스', '쿠팡파트너스', '수익', '전환율', '수수료'] },
  { href: '/daily/youtube', icon: '🎬', title: '유튜브 수익', desc: '조회수별', category: '부업', keywords: ['유튜브', 'youtube', '조회수', 'CPM', '수익', '구독자', '광고'] },

  // 기타
  { href: '/daily/dutch', icon: '🍽️', title: '더치페이', desc: 'N분의1', category: '일상', keywords: ['더치페이', 'n분의1', '나누기', '팁', '모임'] },
  { href: '/daily/tip-split', icon: '🧾', title: '모임 정산', desc: '차등 정산', category: '일상', keywords: ['정산', '모임', 'n분의1', '차등', '송금', '더치'] },
  { href: '/daily/alcohol', icon: '🍺', title: '음주 운전', desc: 'BAC 계산', category: '일상', keywords: ['음주', '운전', '알코올', '혈중', '소주', '맥주', '분해'] },
  { href: '/daily/gpa', icon: '🎓', title: '학점(GPA)', desc: '평점 계산', category: '일상', keywords: ['학점', 'gpa', '평점', '대학', '성적', '평균'] },
  { href: '/calc', icon: '🧮', title: '스마트 계산기', desc: '수식 입력', category: '기타', keywords: ['스마트', '수식', 'cos', 'sin', 'sqrt', '공학', '함수'] },
];

const ALL_EN: CalcMeta[] = [
  { href: '/en/tax-comparison', icon: '💰', title: 'Flat vs Progressive Tax', desc: '19% flat comparison', category: 'Tax', keywords: ['flat tax', '19%', 'foreigner', 'expat', 'progressive', 'compare', 'which'] },
  { href: '/en/salary', icon: '💰', title: 'Salary Calculator', desc: 'Net pay after tax', category: 'Salary', keywords: ['salary', 'net pay', 'take-home', 'paycheck', 'after tax', 'deductions'] },
  { href: '/en/pension-refund', icon: '👵', title: 'Pension Refund', desc: 'Lump sum refund', category: 'Pension', keywords: ['pension', 'refund', 'lump sum', 'national pension', 'leaving korea', 'NPS'] },
  { href: '/en/korean-age', icon: '🎂', title: 'Korean Age', desc: 'International vs Korean', category: 'Daily', keywords: ['korean age', 'international age', 'age', 'how old', 'birthday'] },
  { href: '/en/rent', icon: '🏠', title: 'Jeonse vs Wolse', desc: 'Deposit calculator', category: 'Housing', keywords: ['jeonse', 'wolse', 'rent', 'deposit', 'housing', 'apartment', 'key money'] },
  { href: '/en/severance', icon: '💰', title: 'Severance Pay', desc: 'Retirement pay', category: 'Salary', keywords: ['severance', 'retirement', 'quitting', 'leaving job', 'severance pay'] },
  { href: '/en/health-insurance', icon: '🏥', title: 'Health Insurance', desc: 'NHI premium', category: 'Insurance', keywords: ['health', 'insurance', 'NHI', 'premium', 'medical', 'healthcare'] },
  { href: '/en/cost-of-living', icon: '🏙️', title: 'Cost of Living', desc: 'Monthly expenses', category: 'Living', keywords: ['cost', 'living', 'expenses', 'budget', 'rent', 'Seoul', 'monthly'] },
  { href: '/en/subway', icon: '🚇', title: 'Subway Fare', desc: 'T-money calculator', category: 'Transport', keywords: ['subway', 'metro', 'fare', 'T-money', 'train', 'Seoul', 'transport'] },
  { href: '/en/size-converter', icon: '👟', title: 'Size Converter', desc: 'Clothing & shoe sizes', category: 'Shopping', keywords: ['size', 'clothing', 'shoe', 'Korean size', 'convert', 'US', 'EU'] },
  { href: '/en/tip-calculator', icon: '💵', title: 'Tipping Guide', desc: 'Restaurant tips', category: 'Culture', keywords: ['tip', 'tipping', 'gratuity', 'restaurant', 'service'] },
  { href: '/en/timezone', icon: '🕐', title: 'Time Zone Converter', desc: 'KST to UTC', category: 'Daily', keywords: ['time', 'timezone', 'KST', 'UTC', 'Seoul time', 'convert'] },
  { href: '/en/electricity', icon: '⚡', title: 'Electricity Bill', desc: 'KEPCO rates', category: 'Housing', keywords: ['electricity', 'bill', 'power', 'kWh', 'KEPCO', 'utility'] },
  { href: '/en/date-converter', icon: '📅', title: 'Date Converter', desc: 'Korean date format', category: 'Daily', keywords: ['date', 'format', 'Korean date', 'calendar', 'holiday', 'lunar'] },
  { href: '/en/grocery', icon: '🛒', title: 'Grocery Prices', desc: 'Food cost guide', category: 'Living', keywords: ['grocery', 'food', 'price', 'supermarket', 'market', 'cost'] },
  { href: '/en/internet-speed', icon: '📶', title: 'Internet Plans', desc: 'KT/SKT/LG plans', category: 'Living', keywords: ['internet', 'wifi', 'broadband', 'mobile data', 'KT', 'SKT', 'plan'] },
  { href: '/en/alcohol', icon: '🍺', title: 'Blood Alcohol', desc: 'BAC calculator', category: 'Daily', keywords: ['alcohol', 'BAC', 'DUI', 'drunk', 'drive', 'soju', 'beer'] },
  { href: '/en/air-fryer', icon: '🍳', title: 'Air Fryer Converter', desc: 'Oven to air fryer', category: 'Daily', keywords: ['air fryer', 'oven', 'convert', 'temperature', 'time', 'cooking'] },
  { href: '/en/compound', icon: '📈', title: 'Compound Interest', desc: 'Investment growth', category: 'Finance', keywords: ['compound', 'interest', 'investment', 'growth', 'savings', 'rule of 72'] },
  { href: '/en/due-date', icon: '🤰', title: 'Due Date Calculator', desc: 'Pregnancy weeks', category: 'Health', keywords: ['pregnancy', 'due date', 'week', 'baby', 'prenatal', 'trimester'] },
  { href: '/en/body-fat', icon: '💪', title: 'Body Fat Calculator', desc: 'Navy method', category: 'Health', keywords: ['body fat', 'percentage', 'navy', 'waist', 'neck', 'fitness'] },
  { href: '/en/lunar-calendar', icon: '🌙', title: 'Lunar Calendar 2026', desc: 'Korean holidays', category: 'Culture', keywords: ['lunar', 'calendar', 'Seollal', 'Chuseok', 'holiday', 'Korean'] },
  { href: '/en/paint', icon: '🎨', title: 'Paint Calculator', desc: 'Room coverage', category: 'Daily', keywords: ['paint', 'wallpaper', 'room', 'liters', 'rolls', 'area'] },
  { href: '/en/character-counter', icon: '📝', title: 'Character Counter', desc: 'Word & byte count', category: 'Tools', keywords: ['character', 'word', 'count', 'byte', 'sentence', 'twitter'] },
  { href: '/en/calorie', icon: '🍎', title: 'Calorie Calculator', desc: 'TDEE & diet', category: 'Health', keywords: ['calorie', 'TDEE', 'BMR', 'diet', 'weight', 'loss'] },
  { href: '/en/pyeong', icon: '📐', title: 'Pyeong Converter', desc: 'Pyeong to sqm', category: 'Housing', keywords: ['pyeong', 'square meter', 'apartment', 'size', 'area', 'convert'] },
  { href: '/en/password', icon: '🔐', title: 'Password Generator', desc: 'Strong passwords', category: 'Tools', keywords: ['password', 'random', 'secure', 'generate', 'strong'] },
  { href: '/en/random', icon: '🎲', title: 'Random Generator', desc: 'Number picker', category: 'Tools', keywords: ['random', 'number', 'lottery', 'picker', 'shuffle', 'draw'] },
  { href: '/en/crypto', icon: '₿', title: 'Crypto Profit', desc: 'Bitcoin returns', category: 'Finance', keywords: ['crypto', 'bitcoin', 'investment', 'profit', 'coin'] },
  { href: '/en/gold', icon: '🪙', title: 'Gold Price', desc: 'Weight converter', category: 'Finance', keywords: ['gold', 'price', 'ounce', 'gram', 'don', 'weight'] },
  { href: '/en/sleep', icon: '😴', title: 'Sleep Calculator', desc: 'Optimal bedtime', category: 'Health', keywords: ['sleep', 'bedtime', 'wake', 'cycle', '90 minutes', 'rest'] },
  { href: '/en/water-intake', icon: '💧', title: 'Water Intake', desc: 'Daily hydration', category: 'Health', keywords: ['water', 'hydration', 'intake', 'daily', 'drink'] },
];

const koMap = new Map<string, CalcMeta>(ALL_KO.map(c => [c.href, c]));
const enMap = new Map<string, CalcMeta>(ALL_EN.map(c => [c.href, c]));

export function getCalc(href: string): CalcMeta | undefined {
  return koMap.get(href) ?? enMap.get(href);
}

export function getKoCalcs(): readonly CalcMeta[] {
  return ALL_KO;
}

export function getEnCalcs(): readonly CalcMeta[] {
  return ALL_EN;
}

export function getRelated(href: string): CalcMeta[] {
  const calc = koMap.get(href) ?? enMap.get(href);
  if (!calc?.related) return [];
  const map = href.startsWith('/en') ? enMap : koMap;
  return calc.related.flatMap(r => {
    const c = map.get(r);
    return c ? [c] : [];
  });
}

export function searchCalcs(query: string, lang: 'ko' | 'en' = 'ko'): CalcMeta[] {
  const q = query.toLowerCase();
  const list = lang === 'en' ? ALL_EN : ALL_KO;
  return list.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.keywords.some(k => k.toLowerCase().includes(q)) ||
    c.category.toLowerCase().includes(q)
  );
}

export interface HomepageCategory {
  title: string;
  items: string[];
}

export const HOMEPAGE_HOT: { href: string; desc: string }[] = [
  { href: '/savings/doyak', desc: '적립액 조회·만기 수령액' },
  { href: '/savings/mirae', desc: '은행별 우대금리 비교' },
  { href: '/salary', desc: '4대보험 공제 후' },
  { href: '/salary/minimum', desc: '2026 시급 10,320원' },
  { href: '/daily/aircon', desc: '여름 필수!' },
  { href: '/daily/charcount', desc: '자소서·SNS 필수' },
];

export const HOMEPAGE_CATEGORIES: HomepageCategory[] = [
  { title: '💰 연봉 / 급여', items: [
    '/salary', '/salary/table', '/salary/minimum', '/salary/severance',
    '/salary/live', '/salary/convert', '/salary/calendar', '/salary/parental',
    '/salary/annual', '/salary/lifetime', '/salary/insurance',
  ]},
  { title: '🏦 적금 / 예금', items: [
    '/savings/doyak', '/savings/mirae', '/savings/interest', '/daily/compound',
  ]},
  { title: '🏠 대출 / 부동산', items: [
    '/loan', '/loan/dsr', '/loan/car',
    '/realestate/acqtax', '/realestate/registration', '/realestate/convert',
    '/realestate/commission', '/realestate/transfer', '/realestate/rental',
    '/realestate/subscription', '/daily/pyeong',
  ]},
  { title: '🧾 세금', items: [
    '/tax/vat', '/tax/income', '/tax/gift', '/tax/inherit', '/tax/property', '/tax/eitc', '/daily/cartax',
  ]},
  { title: '👵 연금 / 보험', items: [
    '/pension/jobless', '/pension/nps',
  ]},
  { title: '💪 건강', items: [
    '/health/bmi', '/health/bmr', '/health/bodyfat', '/daily/calorie',
    '/health/sleep', '/health/water', '/daily/bmi-child',
  ]},
  { title: '🔧 일상 도구', items: [
    '/daily/charcount', '/daily/password', '/daily/random', '/daily/time',
    '/daily/percent', '/daily/discount', '/daily/unit', '/daily/speed',
  ]},
  { title: '📅 날짜 / 기념일', items: [
    '/daily/dday', '/daily/age', '/daily/anniversary', '/daily/baby100',
    '/daily/due-date', '/daily/lunar', '/daily/military',
  ]},
  { title: '🚗 자동차 / 생활비', items: [
    '/daily/fuel', '/daily/aircon', '/daily/electric', '/daily/water',
    '/daily/gas', '/daily/airfryer', '/daily/paint', '/daily/travel',
  ]},
  { title: '💹 투자 / 부업', items: [
    '/daily/stock', '/daily/crypto', '/daily/gold', '/daily/fire',
    '/daily/adsense', '/daily/coupang', '/daily/youtube',
  ]},
  { title: '🎓 기타', items: [
    '/daily/dutch', '/daily/tip-split', '/daily/alcohol', '/daily/gpa', '/calc',
  ]},
];
