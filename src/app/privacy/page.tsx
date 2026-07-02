import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
export const metadata: Metadata = { title: "개인정보처리방침", description: "모든 계산기 개인정보처리방침", alternates: { canonical: "https://moduncalc.com/privacy" }, robots: "noindex, follow" };
export default function Page() {
  return <PageLayout eyebrow="법적 고지" title="개인정보처리방침" description="모든 계산기의 개인정보 처리에 관한 안내입니다.">
    <Card><div className="text-sm text-[#4E5968] leading-[1.8]">
      <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-0 mb-2.5">1. 수집하는 개인정보</h2>
      <p>계산 데이터는 <b>서버에 저장되지 않습니다.</b> Google Analytics·AdSense를 통해 방문 통계와 기기 정보가 자동 수집될 수 있습니다.</p>
      <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">2. 이용 목적</h2>
      <p>서비스 통계 분석 및 광고 제공(Google AdSense)</p>
      <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">3. 쿠키</h2>
      <p>Google Analytics·AdSense용 쿠키가 설정될 수 있으며, 브라우저 설정에서 거부 가능합니다.</p>
      <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">4. 문의</h2>
      <p>taeyang.kim4875@gmail.com</p>
      <p className="text-xs text-[var(--sub)] mt-6">최종 수정일: 2026년 7월 2일</p>
    </div></Card>
  </PageLayout>;
}
