import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
export const metadata: Metadata = { title: "소개", description: "모든 계산기(moduncalc.com) 서비스 소개.", alternates: { canonical: "https://moduncalc.com/about" } };
export default function Page() {
  return <PageLayout eyebrow="서비스 소개" title="모든 계산기" description="일상에서 자주 필요한 계산을 빠르고 정확하게.">
    <Card><h2 className="text-base font-extrabold mb-2.5">🧮 모든 계산기란?</h2><p className="text-sm text-[#4E5968] leading-relaxed">연봉, 적금, 대출, 부동산, 건강, 세금 등 일상에서 자주 필요한 계산을 한 곳에서 무료로 이용할 수 있는 웹 서비스입니다. 모든 계산은 브라우저에서 즉시 처리되며, 개인정보를 저장하지 않습니다.</p></Card>
    <Card><h2 className="text-base font-extrabold mb-2.5">✨ 특징</h2><p className="text-sm text-[#4E5968] leading-relaxed"><b>2026년 최신 정책 반영</b> · <b>실시간 계산</b> · <b>모바일 최적화</b> · <b>무료</b></p></Card>
    <Card><h2 className="text-base font-extrabold mb-2.5">⚠️ 면책</h2><p className="text-sm text-[#4E5968] leading-relaxed">계산 결과는 참고용 추정치이며, 실제 값과 차이가 발생할 수 있습니다.</p></Card>
    <div className="mt-4 p-3.5 bg-[var(--bg)] rounded-xl text-[13px] text-[var(--sub)]"><b className="text-[var(--ink)]">문의</b><br/>taeyang.kim4875@gmail.com</div>
  </PageLayout>;
}
