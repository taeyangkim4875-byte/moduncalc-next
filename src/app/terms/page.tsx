import type { Metadata } from "next";
import Link from "next/link";
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
          <p>① 서비스에서 제공하는 <b>모든 계산 결과와 콘텐츠는 2026년 최신 세법·요율을 반영하여 작성되었으나, 어디까지나 참고용 정보이며 어떠한 법적 효력도 갖지 않습니다.</b></p>
          <p className="mt-2">② 운영자는 이용자가 계산 결과를 근거로 내린 <b>금융·부동산·세금·근로·건강 관련 일체의 의사결정과 그 결과에 대하여 법적 책임을 지지 않습니다.</b> 여기에는 다음이 포함되나 이에 한정되지 않습니다.</p>
          <ul className="pl-5 my-2 list-disc">
            <li>금융 상품 가입·해지, 대출 실행, 투자 판단 및 그로 인한 손익</li>
            <li>부동산 매매·임대차 계약의 체결 여부 및 계약 조건</li>
            <li>세금 신고·납부와 그로 인한 가산세 등 불이익</li>
            <li>퇴사·이직·급여 협상 등 근로 관계에 관한 판단</li>
          </ul>
          <p className="mt-2">③ 운영자는 계산 결과의 <b>정확성·완전성·최신성을 보증하지 않습니다.</b> 관계 법령 및 정부 고시의 개정 내용이 서비스에 반영되기까지 시차가 발생할 수 있습니다.</p>
          <p className="mt-2">④ 정확한 금액과 법적 판단은 반드시 국세청·금융기관·국민연금공단 등 소관 기관의 공식 자료를 직접 확인하거나, 세무사·변호사·공인노무사·의사 등 해당 분야 전문가와 상담하시기 바랍니다. 서비스는 이러한 전문가의 조언을 대체하지 않습니다.</p>
          <p className="mt-2">⑤ 서비스에 포함된 AI 챗봇·AI 분석 기능이 생성한 답변에는 부정확한 정보가 포함될 수 있으며, 운영자는 그 내용에 대해 책임을 지지 않습니다.</p>
          <p className="mt-2">⑥ 서비스는 사전 고지 없이 내용을 변경하거나 중단할 수 있습니다.</p>
          <p className="mt-2">⑦ 본 조의 면책은 관련 법령이 허용하는 최대 범위 내에서 적용되며, 보다 상세한 내용은 <Link href="/disclaimer" className="text-[var(--primary)] font-bold underline">면책조항</Link>에서 확인하실 수 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제4조 (개인정보)</h2>
          <p>서비스는 별도의 회원가입 없이 이용 가능하며, 사용자가 입력하는 계산 데이터는 서버에 저장되지 않습니다. 개인정보 처리에 관한 사항은 <Link href="/privacy" className="text-[var(--primary)] font-bold underline">개인정보처리방침</Link>을 따릅니다.</p>

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
