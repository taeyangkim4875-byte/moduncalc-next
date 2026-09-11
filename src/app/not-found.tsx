import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

export default function NotFound() {
  return (
    <PageLayout eyebrow="404" title="페이지를 찾을 수 없습니다" description="요청하신 페이지가 존재하지 않거나 이동되었습니다.">
      <Card>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-4">
          찾으시는 페이지의 주소가 변경되었거나, 잘못된 경로로 접근하신 것 같습니다.
          아래 링크에서 필요한 계산기를 찾아보세요.
        </p>
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 px-4 py-3 bg-[var(--primary)] text-white rounded-xl no-underline font-bold text-sm text-center justify-center">
            🏠 홈으로 돌아가기
          </Link>
          <Link href="/salary" className="flex items-center gap-2 px-4 py-3 bg-[var(--bg)] rounded-xl no-underline text-[var(--ink)] font-bold text-sm border border-[var(--line)]">
            💰 연봉 실수령액 계산기
          </Link>
          <Link href="/savings/doyak" className="flex items-center gap-2 px-4 py-3 bg-[var(--bg)] rounded-xl no-underline text-[var(--ink)] font-bold text-sm border border-[var(--line)]">
            🏦 청년도약계좌 계산기
          </Link>
          <Link href="/loan" className="flex items-center gap-2 px-4 py-3 bg-[var(--bg)] rounded-xl no-underline text-[var(--ink)] font-bold text-sm border border-[var(--line)]">
            🏠 대출이자 계산기
          </Link>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">🔍 자주 찾는 계산기</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/health/bmi" className="px-3 py-2 bg-[var(--bg)] rounded-lg no-underline text-[var(--ink)] border border-[var(--line)]">BMI 계산기</Link>
          <Link href="/daily/calorie" className="px-3 py-2 bg-[var(--bg)] rounded-lg no-underline text-[var(--ink)] border border-[var(--line)]">칼로리 계산기</Link>
          <Link href="/realestate/acqtax" className="px-3 py-2 bg-[var(--bg)] rounded-lg no-underline text-[var(--ink)] border border-[var(--line)]">취득세 계산기</Link>
          <Link href="/pension/nps" className="px-3 py-2 bg-[var(--bg)] rounded-lg no-underline text-[var(--ink)] border border-[var(--line)]">국민연금 계산기</Link>
          <Link href="/salary/minimum" className="px-3 py-2 bg-[var(--bg)] rounded-lg no-underline text-[var(--ink)] border border-[var(--line)]">최저시급 계산기</Link>
          <Link href="/daily/dday" className="px-3 py-2 bg-[var(--bg)] rounded-lg no-underline text-[var(--ink)] border border-[var(--line)]">D-Day 계산기</Link>
        </div>
      </Card>
    </PageLayout>
  );
}
