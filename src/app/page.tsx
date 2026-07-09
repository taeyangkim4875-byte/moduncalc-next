import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "모든 계산기 - 연봉, 적금, 대출, 부동산, 건강, 세금 무료 계산기",
  description: "연봉 실수령액, 청년도약계좌, 미래적금, 대출이자, 취득세, 복비, BMI, 퇴직금, 최저시급까지. 2026년 최신 정책 반영 무료 계산기 모음 36종.",
  alternates: { canonical: "https://moduncalc.com" },
  openGraph: {
    title: "모든 계산기 - 연봉, 적금, 대출, 건강 무료 계산기 36종",
    description: "2026년 최신 정책 반영. 연봉, 적금, 대출, 부동산, 건강, 세금, 일상 계산기를 한 곳에서 무료로.",
    url: "https://moduncalc.com",
  },
};

const POPULAR = [
  { href: '/savings/interest', icon: '🏦', title: '적금·예금 이자', desc: '만기 수령액 계산' },
  { href: '/savings/doyak', icon: '🏦', title: '청년도약계좌', desc: '5년 만기 실수령액' },
  { href: '/savings/mirae', icon: '🏦', title: '청년미래적금', desc: '은행별 우대금리 비교' },
  { href: '/salary', icon: '💰', title: '연봉 상위%', desc: '내 연봉 순위 확인' },
  { href: '/salary/table', icon: '📋', title: '실수령액 표', desc: '2천만~1.5억 한눈에' },
  { href: '/salary/minimum', icon: '💰', title: '최저시급', desc: '주휴수당·월급 환산' },
  { href: '/salary/live', icon: '⏱️', title: '실시간 카운터', desc: '초당 버는 돈' },
  { href: '/salary/lifetime', icon: '💰', title: '평생 근로소득', desc: '은퇴까지 총 소득' },
  { href: '/salary/severance', icon: '💰', title: '퇴직금', desc: '예상 퇴직금 조회' },
  { href: '/salary/parental', icon: '👶', title: '육아휴직 급여', desc: '6+6 부모휴직' },
  { href: '/salary/annual', icon: '📅', title: '연차 계산기', desc: '입사일 기준' },
  { href: '/pension/jobless', icon: '👵', title: '실업급여', desc: '구직급여 예상액' },
  { href: '/pension/nps', icon: '👵', title: '국민연금', desc: '예상 월 수령액' },
  { href: '/loan', icon: '🏠', title: '대출 이자', desc: '원리금·원금균등 비교' },
  { href: '/loan/car', icon: '🚗', title: '자동차 할부', desc: '월 납입액·취등록세' },
  { href: '/health/bmi', icon: '💪', title: 'BMI', desc: '체질량지수·비만도' },
  { href: '/health/bmr', icon: '💪', title: '기초대사량', desc: '일일 권장 칼로리' },
  { href: '/realestate/acqtax', icon: '🏢', title: '취득세', desc: '주택 매매 세금' },
  { href: '/realestate/commission', icon: '🏢', title: '복비', desc: '중개수수료 계산' },
  { href: '/realestate/convert', icon: '🏢', title: '전월세 전환', desc: '전세↔월세' },
  { href: '/realestate/rental', icon: '🏢', title: '임대수익률', desc: '투자 수익률' },
  { href: '/realestate/transfer', icon: '🏢', title: '양도소득세', desc: '부동산 양도세' },
  { href: '/tax/vat', icon: '🧾', title: '부가세', desc: '공급가액·역산' },
  { href: '/tax/income', icon: '🧾', title: '종합소득세', desc: '누진세율 계산' },
  { href: '/tax/gift', icon: '🧾', title: '증여세', desc: '가족 간 증여세' },
  { href: '/daily/percent', icon: '📊', title: '퍼센트', desc: '비율·변화율' },
  { href: '/daily/discount', icon: '🏷️', title: '할인가', desc: '할인율·1+1 단가' },
  { href: '/daily/dutch', icon: '🍽️', title: '더치페이', desc: 'N분의1·팁' },
  { href: '/daily/dday', icon: '📅', title: 'D-day', desc: '날짜 차이' },
  { href: '/daily/age', icon: '🎂', title: '나이', desc: '만 나이·띠·별자리' },
  { href: '/daily/unit', icon: '📏', title: '단위변환', desc: '길이·무게·온도' },
  { href: '/daily/electric', icon: '⚡', title: '전기요금', desc: '누진제 요금 계산' },
  { href: '/daily/stock', icon: '📈', title: '주식 수익률', desc: '손익·물타기' },
  { href: '/daily/fire', icon: '🔥', title: 'FIRE', desc: '조기 은퇴 시뮬레이션' },
  { href: '/daily/military', icon: '🪖', title: '전역일', desc: '군별 D-day' },
  { href: '/daily/gpa', icon: '🎓', title: '학점(GPA)', desc: '평점 계산' },
  { href: '/calc', icon: '🧮', title: '스마트 계산기', desc: '수식 입력·공학' },
];

export default function Home() {
  return (
    <PageLayout
      eyebrow="무료 계산기 36종"
      title="모든 계산기"
      description="필요한 계산기를 찾아보세요. 2026년 최신 정책 반영."
    >
      <div className="grid grid-cols-2 gap-2.5">
        {POPULAR.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-start gap-2.5 p-3 bg-white rounded-xl shadow-[var(--shadow)] no-underline text-[var(--ink)] transition-all hover:translate-y-[-2px] hover:shadow-[var(--shadow-h)]"
          >
            <span className="text-xl flex-none mt-0.5">{item.icon}</span>
            <div className="min-w-0">
              <div className="text-sm font-bold truncate">{item.title}</div>
              <div className="text-[11px] text-[var(--sub)] font-medium">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <Card className="mt-4">
        <h2 className="text-base font-extrabold mb-3">📖 모든 계산기란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">모든 계산기(moduncalc.com)는 연봉, 적금, 대출, 부동산, 건강, 세금 등 일상에서 자주 필요한 계산을 한 곳에서 무료로 이용할 수 있는 웹 서비스입니다. 2026년 최신 정책·세율·요율이 반영되어 있으며, 모든 계산은 브라우저에서 즉시 처리됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">청년도약계좌·미래적금 비교, 연봉 실수령액 표, 최저시급·주휴수당, 실업급여, 국민연금, 대출 상환, 자동차 할부, 취득세, 복비, 양도세, BMI, 퇴직금 등 30종 이상의 계산기를 제공합니다.</p>
      </Card>
    </PageLayout>
  );
}
