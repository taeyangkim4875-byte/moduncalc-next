import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "모든 계산기 - 연봉, 적금, 대출, 부동산, 건강, 세금 무료 계산기",
  description: "연봉 실수령액, 청년도약계좌, 미래적금, 대출이자, 취득세, 복비, BMI, 퇴직금, 최저시급까지. 2026년 최신 정책 반영 무료 계산기 모음 82종.",
  alternates: { canonical: "https://moduncalc.com" },
  openGraph: {
    title: "모든 계산기 - 연봉, 적금, 대출, 건강 무료 계산기 82종",
    description: "2026년 최신 정책 반영. 연봉, 적금, 대출, 부동산, 건강, 세금, 일상 계산기를 한 곳에서 무료로.",
    url: "https://moduncalc.com",
  },
};

const HOT = [
  { href: '/savings/doyak', icon: '🏦', title: '청년도약계좌', desc: '적립액 조회·만기 수령액' },
  { href: '/savings/mirae', icon: '🏦', title: '청년미래적금', desc: '은행별 우대금리 비교' },
  { href: '/salary', icon: '💰', title: '연봉 실수령액', desc: '4대보험 공제 후' },
  { href: '/salary/minimum', icon: '💰', title: '최저시급', desc: '2026 시급 10,320원' },
  { href: '/daily/aircon', icon: '❄️', title: '에어컨 전기요금', desc: '여름 필수!' },
  { href: '/daily/charcount', icon: '📝', title: '글자수 세기', desc: '자소서·SNS 필수' },
];

const CATEGORIES = [
  { title: '💰 연봉 / 급여', items: [
    { href: '/salary', title: '연봉 실수령액', desc: '백분위 포함' },
    { href: '/salary/table', title: '실수령액 표', desc: '2천만~1.5억' },
    { href: '/salary/minimum', title: '최저시급', desc: '주휴수당·월급' },
    { href: '/salary/severance', title: '퇴직금', desc: '예상 퇴직금' },
    { href: '/salary/live', title: '월급 카운터', desc: '초당 버는 돈' },
    { href: '/salary/convert', title: '연봉 환산기', desc: '아이폰 며칠?' },
    { href: '/salary/calendar', title: '월급 달력', desc: 'D-day' },
    { href: '/salary/parental', title: '육아휴직', desc: '6+6 급여' },
    { href: '/salary/annual', title: '연차', desc: '입사일 기준' },
    { href: '/salary/lifetime', title: '평생 근로소득', desc: '은퇴까지' },
  ]},
  { title: '🏦 적금 / 예금', items: [
    { href: '/savings/doyak', title: '청년도약계좌', desc: '적립액+만기+특별해지' },
    { href: '/savings/mirae', title: '청년미래적금', desc: '우대금리 비교' },
    { href: '/savings/interest', title: '적금·예금 이자', desc: '만기 수령액' },
    { href: '/daily/compound', title: '복리 계산기', desc: '투자 수익 시뮬레이션' },
  ]},
  { title: '🏠 대출 / 부동산', items: [
    { href: '/loan', title: '대출 이자', desc: '원리금·원금균등' },
    { href: '/loan/dsr', title: 'DSR', desc: '대출 한도 확인' },
    { href: '/loan/car', title: '자동차 할부', desc: '월 납입액' },
    { href: '/realestate/acqtax', title: '취득세', desc: '주택 매매' },
    { href: '/realestate/registration', title: '등기비용', desc: '인지세·법무사' },
    { href: '/realestate/convert', title: '전월세 전환', desc: '전세↔월세' },
    { href: '/realestate/commission', title: '복비', desc: '중개수수료' },
    { href: '/realestate/transfer', title: '양도소득세', desc: '부동산 양도세' },
    { href: '/realestate/rental', title: '임대수익률', desc: '투자 수익률' },
    { href: '/realestate/subscription', title: '청약 가점', desc: '84점 만점' },
    { href: '/daily/pyeong', title: '평수 변환', desc: '평↔㎡' },
  ]},
  { title: '🧾 세금', items: [
    { href: '/tax/vat', title: '부가세', desc: '공급가액·역산' },
    { href: '/tax/income', title: '종합소득세', desc: '누진세율' },
    { href: '/tax/gift', title: '증여세', desc: '가족 간' },
    { href: '/tax/inherit', title: '상속세', desc: '공제 자동 계산' },
    { href: '/daily/cartax', title: '자동차세', desc: '배기량·연식' },
  ]},
  { title: '👵 연금 / 보험', items: [
    { href: '/pension/jobless', title: '실업급여', desc: '구직급여 예상액' },
    { href: '/pension/nps', title: '국민연금', desc: '예상 수령액' },
  ]},
  { title: '💪 건강', items: [
    { href: '/health/bmi', title: 'BMI', desc: '체질량지수' },
    { href: '/health/bmr', title: '기초대사량', desc: '일일 칼로리' },
    { href: '/health/bodyfat', title: '체지방률', desc: 'US Navy 공식' },
    { href: '/daily/calorie', title: '칼로리', desc: 'TDEE·다이어트' },
    { href: '/health/sleep', title: '수면 계산기', desc: '최적 취침 시간' },
    { href: '/health/water', title: '물 섭취량', desc: '하루 권장량' },
    { href: '/daily/bmi-child', title: '어린이 BMI', desc: '소아 백분위' },
  ]},
  { title: '🔧 일상 도구', items: [
    { href: '/daily/charcount', title: '글자수 세기', desc: '바이트·키워드' },
    { href: '/daily/password', title: '비밀번호 생성', desc: '랜덤 생성기' },
    { href: '/daily/random', title: '랜덤 뽑기', desc: '로또·추첨' },
    { href: '/daily/time', title: '시간 계산기', desc: '시간 차이·근무' },
    { href: '/daily/percent', title: '퍼센트', desc: '비율·변화율' },
    { href: '/daily/discount', title: '할인가', desc: '1+1 단가' },
    { href: '/daily/unit', title: '단위변환', desc: '길이·무게·온도' },
    { href: '/daily/speed', title: '속도·시간', desc: '소요시간' },
  ]},
  { title: '📅 날짜 / 기념일', items: [
    { href: '/daily/dday', title: 'D-day', desc: '날짜 차이' },
    { href: '/daily/age', title: '나이', desc: '만 나이·띠' },
    { href: '/daily/anniversary', title: '기념일', desc: '100일·1000일' },
    { href: '/daily/baby100', title: '아기 100일', desc: '백일·돌' },
    { href: '/daily/due-date', title: '출산 예정일', desc: '임신 주수' },
    { href: '/daily/lunar', title: '음력 양력', desc: '날짜 변환' },
    { href: '/daily/military', title: '전역일', desc: '군별 D-day' },
  ]},
  { title: '🚗 자동차 / 생활비', items: [
    { href: '/daily/fuel', title: '연비·전비', desc: '내연차 vs 전기차' },
    { href: '/daily/aircon', title: '에어컨 전기요금', desc: '여름 필수' },
    { href: '/daily/electric', title: '전기요금', desc: '누진제' },
    { href: '/daily/water', title: '수도요금', desc: '누진 계산' },
    { href: '/daily/gas', title: '가스요금', desc: '난방비' },
    { href: '/daily/airfryer', title: '에어프라이어', desc: '오븐 변환' },
    { href: '/daily/paint', title: '페인트·벽지', desc: '자재량' },
    { href: '/daily/travel', title: '여행 경비', desc: '예산 계산' },
  ]},
  { title: '💹 투자 / 부업', items: [
    { href: '/daily/stock', title: '주식 수익률', desc: '손익·물타기' },
    { href: '/daily/crypto', title: '가상자산', desc: '비트코인 수익' },
    { href: '/daily/gold', title: '금 시세', desc: '돈·g·oz' },
    { href: '/daily/fire', title: 'FIRE', desc: '조기 은퇴' },
    { href: '/daily/adsense', title: '애드센스', desc: '블로그 수익' },
    { href: '/daily/coupang', title: '쿠팡 파트너스', desc: '수수료 수익' },
    { href: '/daily/youtube', title: '유튜브 수익', desc: '조회수별' },
  ]},
  { title: '🎓 기타', items: [
    { href: '/daily/dutch', title: '더치페이', desc: 'N분의1' },
    { href: '/daily/tip-split', title: '모임 정산', desc: '차등 정산' },
    { href: '/daily/alcohol', title: '음주 운전', desc: 'BAC 계산' },
    { href: '/daily/gpa', title: '학점(GPA)', desc: '평점 계산' },
    { href: '/calc', title: '스마트 계산기', desc: '수식 입력' },
  ]},
];

export default function Home() {
  return (
    <PageLayout
      eyebrow="무료 계산기 82종"
      title="모든 계산기"
      description="필요한 계산기를 찾아보세요. 2026년 최신 정책 반영."
    >
      {/* 인기 / 추천 */}
      <div className="mb-5">
        <div className="text-xs font-bold text-[var(--primary)] mb-2 px-1">🔥 인기 계산기</div>
        <div className="grid grid-cols-2 gap-2">
          {HOT.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-2.5 p-3 bg-white rounded-xl shadow-[var(--shadow)] no-underline text-[var(--ink)] transition-all hover:translate-y-[-1px] hover:shadow-[var(--shadow-h)] border-[1.5px] border-[var(--primary-weak)]"
            >
              <span className="text-xl flex-none mt-0.5">{item.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-bold truncate">{item.title}</div>
                <div className="text-[11px] text-[var(--sub)] font-medium">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 카테고리별 */}
      {CATEGORIES.map(cat => (
        <div key={cat.title} className="mb-4">
          <div className="text-sm font-extrabold text-[var(--ink)] mb-2 px-1">{cat.title}</div>
          <div className="grid grid-cols-2 gap-1.5">
            {cat.items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl no-underline text-[var(--ink)] transition-all hover:bg-[var(--primary-weak)] border border-[var(--line)]"
              >
                <div className="min-w-0">
                  <div className="text-[13px] font-bold truncate">{item.title}</div>
                  <div className="text-[10px] text-[var(--sub)] font-medium">{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 text-center">
        <Link href="/en" className="text-sm font-bold text-[var(--primary)] no-underline hover:text-[var(--primary-dark)]">
          🌍 English Calculators for Foreigners →
        </Link>
      </div>

      <Card className="mt-4">
        <h2 className="text-base font-extrabold mb-3">📖 모든 계산기란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">모든 계산기(moduncalc.com)는 연봉, 적금, 대출, 부동산, 건강, 세금 등 일상에서 자주 필요한 계산을 한 곳에서 무료로 이용할 수 있는 웹 서비스입니다. 2026년 최신 정책·세율·요율이 반영되어 있으며, 모든 계산은 브라우저에서 즉시 처리됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">청년도약계좌·미래적금, 연봉 실수령액, 최저시급·주휴수당, 실업급여, 국민연금, DSR, 취득세, 양도소득세, BMI, 퇴직금, 에어컨 전기요금 등 82종의 계산기와 28편의 가이드 글을 제공합니다.</p>
      </Card>
    </PageLayout>
  );
}
