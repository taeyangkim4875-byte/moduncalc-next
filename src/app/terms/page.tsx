import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "이용약관",
  description: "모든 계산기(moduncalc.com) 서비스 이용약관",
  alternates: { canonical: "https://moduncalc.com/terms" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="법적 고지" title="이용약관" description="모든 계산기 서비스 이용에 관한 약관입니다.">
      <Card>
        <div className="text-sm text-[#4E5968] leading-[1.8]">
          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-0 mb-2.5">제1조 (목적)</h2>
          <p>본 약관은 모든 계산기(moduncalc.com, 이하 &quot;서비스&quot;)의 이용 조건 및 절차, 이용자와 운영자의 권리·의무를 규정함을 목적으로 합니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제2조 (서비스의 내용)</h2>
          <p>서비스는 연봉, 적금, 대출, 부동산, 건강, 세금 등 각종 계산 기능을 무료로 제공합니다. 서비스의 모든 계산 결과는 공개된 정책·세율·통계를 기반으로 한 <b>참고용 추정치</b>이며, 법적 효력이 없습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제3조 (면책 조항)</h2>
          <ul className="pl-5 my-1.5 list-disc">
            <li>계산 결과의 정확성·완전성을 보증하지 않으며, 이를 신뢰하여 내린 의사결정으로 발생한 손해에 대해 책임을 지지 않습니다.</li>
            <li>정확한 금액은 해당 기관(국세청, 은행, 국민연금공단 등)의 공식 자료를 직접 확인하시기 바랍니다.</li>
            <li>서비스는 사전 고지 없이 내용을 변경하거나 중단할 수 있습니다.</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제4조 (개인정보)</h2>
          <p>서비스는 별도의 회원가입 없이 이용 가능하며, 사용자가 입력하는 계산 데이터는 서버에 저장되지 않습니다. 개인정보 처리에 관한 사항은 <a href="/privacy" className="text-[var(--primary)] font-bold underline">개인정보처리방침</a>을 따릅니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제5조 (광고)</h2>
          <p>서비스는 운영비 충당을 위해 Google AdSense 등 제3자 광고를 게재할 수 있습니다. 광고 내용에 대한 책임은 해당 광고주에게 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제6조 (지적재산권)</h2>
          <p>서비스의 디자인, 코드, 콘텐츠에 대한 저작권은 운영자에게 있으며, 무단 복제·배포를 금합니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제7조 (약관 변경)</h2>
          <p>본 약관은 관련 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제8조 (문의)</h2>
          <p>이메일: taeyang.kim4875@gmail.com</p>

          <p className="text-xs text-[var(--sub)] mt-6">시행일: 2026년 7월 6일</p>
        </div>
      </Card>
    </PageLayout>
  );
}
