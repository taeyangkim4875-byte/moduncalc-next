import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";

export const metadata: Metadata = {
  title: "문의하기 - 모든 계산기",
  description: "모든 계산기(moduncalc.com)에 대한 오류 신고, 기능 건의, 세율 문의, 제휴 문의를 받고 있습니다. 운영자 김태양이 직접 확인하고 답변드립니다.",
  alternates: { canonical: "https://moduncalc.com/contact" },
  openGraph: {
    title: "문의하기 - 모든 계산기",
    description: "오류 신고, 기능 건의, 세율 문의를 받고 있습니다. 운영자가 직접 확인합니다.",
    url: "https://moduncalc.com/contact",
  },
};

export default function ContactPage() {
  return (
    <PageLayout eyebrow="Contact" title="문의하기" description="궁금한 점이나 건의 사항이 있으시면 알려주세요.">
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "문의하기", href: "/contact" }]} />

      <Card>
        <h2 className="text-base font-extrabold mb-3">📬 문의 안내</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p>
            모든 계산기(moduncalc.com)는 <b>김태양</b>이 혼자 만들고 운영하는 개인 프로젝트입니다.
            문의 메일은 운영자가 직접 확인하며, 보통 <b>영업일 기준 2~3일 안에</b> 답변드립니다.
          </p>
          <div className="bg-[var(--bg)] rounded-xl p-4">
            <div className="text-sm font-bold text-[var(--ink)] mb-2">이메일</div>
            <a href="mailto:taeyang.kim4875@gmail.com" className="text-[var(--primary)] font-bold no-underline hover:underline">taeyang.kim4875@gmail.com</a>
            <div className="text-xs text-[var(--sub)] mt-2">운영자 김태양 · 대한민국</div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📝 문의 유형</h2>
        <div className="flex flex-col gap-2 text-sm text-[#4E5968]">
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <span className="font-bold text-[var(--ink)]">🐛 오류 신고</span> — 계산 결과가 잘못된 경우, 화면이 깨지는 경우
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <span className="font-bold text-[var(--ink)]">💡 기능 건의</span> — 추가해줬으면 하는 계산기, 개선 아이디어
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <span className="font-bold text-[var(--ink)]">📊 세율/요율 확인</span> — 적용된 세율이나 요율에 대한 문의
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <span className="font-bold text-[var(--ink)]">🤝 제휴/협업</span> — 비즈니스 관련 문의
          </div>
        </div>
      </Card>

      <SeoSection title="오류 신고할 때 이렇게 적어주시면 빠릅니다">
        <p>
          계산 결과가 이상하다는 제보를 받으면 가장 먼저 하는 일이 <strong>재현</strong>입니다.
          어떤 값을 넣었을 때 어떤 결과가 나왔는지 알 수 없으면 확인에 시간이 오래 걸립니다.
          다음 네 가지만 함께 적어주시면 대부분 당일에 원인을 찾을 수 있습니다.
        </p>
        <SeoList>
          <li><strong>어느 계산기인지</strong> — 페이지 주소(URL)를 그대로 붙여넣어 주시면 가장 정확합니다.</li>
          <li><strong>입력한 값</strong> — 연봉 4,000만원·부양가족 2인처럼 넣으신 숫자를 알려주세요.</li>
          <li><strong>나온 결과와 기대한 결과</strong> — &ldquo;월 실수령 290만원이 나왔는데 회사 명세서는 295만원&rdquo;처럼 적어주시면 좋습니다.</li>
          <li><strong>사용 환경</strong> — 아이폰 사파리, 안드로이드 크롬처럼 기기와 브라우저를 알려주시면 화면 깨짐 문제에 도움이 됩니다.</li>
        </SeoList>
        <p>
          세율이나 요율이 틀렸다고 생각되시면 <strong>근거 자료(고시 링크나 기관명)</strong>를 함께 주시면 확인이 훨씬 빠릅니다.
          실제로 제보를 받고 수정한 사례가 여러 건 있었고, 확인 후 해당 계산기와 관련 가이드를 함께 갱신합니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="문의 전에 확인해 보세요"
        items={[
          {
            q: '계산 결과가 회사 급여명세서와 조금 다른데 오류인가요?',
            a: '몇천 원에서 몇만 원 정도의 차이는 대부분 정상입니다. 소득세는 국세청 근로소득 간이세액표에 따라 원천징수되는데, 회사마다 적용 방식(80%·100%·120% 선택)이 다르고 비과세 항목, 상여 지급 구조, 노조회비나 사우회비 같은 회사별 공제 항목도 다르기 때문입니다. 최종 세액은 연말정산에서 정산됩니다. 차이가 10만원 이상으로 크다면 알려주세요.',
          },
          {
            q: '원하는 계산기를 추가해 달라고 요청할 수 있나요?',
            a: '네. 실제로 많은 계산기가 이용자 요청으로 만들어졌습니다. 어떤 상황에서 필요한지, 어떤 값을 넣고 어떤 결과를 보고 싶은지 함께 적어주시면 구현 우선순위를 정하는 데 큰 도움이 됩니다.',
          },
          {
            q: '세무·법률 상담을 해주시나요?',
            a: '아닙니다. 운영자는 세무사나 노무사가 아니며, 개별 사안에 대한 상담은 제공하지 않습니다. 계산기에 적용된 세율과 산식이 무엇인지는 안내해 드릴 수 있습니다. 개별 상담이 필요하시면 국세청(☎ 126), 고용노동부(☎ 1350), 국민연금공단(☎ 1355)이나 세무사·노무사에게 문의하세요.',
          },
          {
            q: '입력한 값이 저장되거나 전송되나요?',
            a: '아닙니다. 모든 계산은 이용자 브라우저 안에서 처리되며 입력값은 서버로 전송되지 않습니다. 계산 기록도 사용 중인 기기에만 남습니다. 자세한 내용은 개인정보처리방침에 정리해 두었습니다.',
          },
        ]}
      />

      <SeoSection title="함께 확인하면 좋은 페이지">
        <p>
          서비스 소개와 계산 기준의 출처는 <SeoLink href="/about">소개 페이지</SeoLink>에,
          계산 결과의 효력과 한계는 <SeoLink href="/disclaimer">면책조항</SeoLink>에 정리해 두었습니다.
          개인정보 처리 방식은 <SeoLink href="/privacy">개인정보처리방침</SeoLink>,
          서비스 이용 조건은 <SeoLink href="/terms">이용약관</SeoLink>에서 확인하실 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
