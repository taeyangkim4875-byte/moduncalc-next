import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "이용약관",
  description: "모든 계산기(moduncalc.com) 서비스 이용약관",
  alternates: { canonical: "https://moduncalc.com/terms" },
  openGraph: {
    title: "이용약관 - 모든 계산기",
    description: "모든 계산기(moduncalc.com) 서비스 이용에 관한 약관입니다.",
    url: "https://moduncalc.com/terms",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="법적 고지" title="이용약관" description="모든 계산기 서비스 이용에 관한 약관입니다.">
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "이용약관", href: "/terms" }]} />
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
          <p className="mt-2">⑤ 서비스는 사전 고지 없이 내용을 변경하거나 중단할 수 있습니다.</p>
          <p className="mt-2">⑥ 본 조의 면책은 관련 법령이 허용하는 최대 범위 내에서 적용되며, 보다 상세한 내용은 <Link href="/disclaimer" className="text-[var(--primary)] font-bold underline">면책조항</Link>에서 확인하실 수 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제4조 (개인정보)</h2>
          <p>서비스는 별도의 회원가입 없이 이용 가능하며, 사용자가 입력하는 계산 데이터는 서버에 저장되지 않습니다. 개인정보 처리에 관한 사항은 <Link href="/privacy" className="text-[var(--primary)] font-bold underline">개인정보처리방침</Link>을 따릅니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제5조 (광고)</h2>
          <p>서비스는 운영비 충당을 위해 Google AdSense 등 제3자 광고를 게재할 수 있습니다. 광고 내용에 대한 책임은 해당 광고주에게 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제6조 (이용자의 의무 및 금지행위)</h2>
          <p>이용자는 서비스를 이용함에 있어 다음 행위를 하여서는 안 됩니다.</p>
          <ul className="pl-5 my-2 list-disc">
            <li>자동화된 수단(크롤러, 스크래퍼, 봇 등)으로 서비스에 과도한 부하를 일으키는 행위</li>
            <li>서비스의 계산 로직·데이터·디자인을 무단으로 복제하여 동일하거나 유사한 서비스를 제공하는 행위</li>
            <li>서비스의 정상적인 운영을 방해하거나 보안 취약점을 악용하는 행위</li>
            <li>서비스의 계산 결과를 <b>공식 산정 결과인 것처럼</b> 제3자에게 제시하거나 배포하는 행위</li>
            <li>관계 법령을 위반하거나 타인의 권리를 침해하는 목적으로 서비스를 이용하는 행위</li>
          </ul>
          <p className="mt-2">운영자는 위 행위가 확인될 경우 사전 통지 없이 접근을 제한할 수 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제7조 (지적재산권 및 인용)</h2>
          <p>① 서비스의 디자인, 소스코드, 계산 로직, 본문 콘텐츠에 대한 저작권은 운영자에게 있으며, 무단 복제·배포·2차적 저작물 작성을 금합니다.</p>
          <p className="mt-2">② 다만 <b>출처(moduncalc.com)를 명시하고 해당 페이지로 연결되는 링크를 포함하는 경우</b>, 블로그·기사·강의 자료 등에서 계산 결과와 본문 일부를 인용하는 것은 허용합니다.</p>
          <p className="mt-2">③ 서비스가 제공하는 임베드(삽입) 기능을 이용해 계산기를 외부 사이트에 게시하는 것은 허용되나, 임베드 코드를 임의로 변조하거나 출처 표기를 제거해서는 안 됩니다.</p>
          <p className="mt-2">④ 서비스가 인용하는 법령·고시·통계 등 공공 데이터의 권리는 각 저작권자 및 소관 기관에 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제8조 (서비스의 중단)</h2>
          <p>운영자는 시스템 점검, 설비 장애, 천재지변, 그 밖에 부득이한 사유가 있는 경우 서비스의 전부 또는 일부를 일시적으로 중단할 수 있습니다. 서비스는 무료로 제공되므로 중단으로 인한 손해에 대하여 운영자는 별도의 보상 책임을 지지 않습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제9조 (약관 변경)</h2>
          <p>본 약관은 관련 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 본 페이지를 통해 공지합니다. 변경된 약관은 공지한 날부터 효력이 발생하며, 변경 후에도 서비스를 계속 이용하는 경우 변경 내용에 동의한 것으로 봅니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제10조 (준거법 및 분쟁 해결)</h2>
          <p>본 약관의 해석과 서비스 이용에 관한 분쟁에는 대한민국 법을 적용합니다. 서비스 이용과 관련하여 분쟁이 발생한 경우, 운영자와 이용자는 성실히 협의하여 해결하는 것을 원칙으로 하며, 협의가 이루어지지 않을 경우 민사소송법상 관할 법원에 소를 제기할 수 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">제11조 (문의)</h2>
          <p>서비스 이용, 약관 해석, 저작권 및 제휴에 관한 문의는 아래 연락처로 보내주세요.</p>
          <p className="mt-2">운영자: 김태양<br/>이메일: taeyang.kim4875@gmail.com<br/>문의 페이지: <Link href="/contact" className="text-[var(--primary)] font-bold underline">moduncalc.com/contact</Link></p>

          <p className="text-xs text-[var(--sub)] mt-6">시행일: 2026년 7월 6일 · 최종 개정일: 2026년 9월 16일</p>
        </div>
      </Card>
    </PageLayout>
  );
}
