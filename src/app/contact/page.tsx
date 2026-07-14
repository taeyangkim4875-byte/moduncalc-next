import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "문의하기 - 모든 계산기",
  description: "모든 계산기에 대한 문의, 건의, 오류 신고를 받고 있습니다.",
  alternates: { canonical: "https://moduncalc.com/contact" },
};

export default function ContactPage() {
  return (
    <PageLayout eyebrow="Contact" title="문의하기" description="궁금한 점이나 건의 사항이 있으시면 알려주세요.">
      <Card>
        <h2 className="text-base font-extrabold mb-3">📬 문의 안내</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p>모든 계산기(moduncalc.com)에 대한 문의, 건의, 오류 신고를 받고 있습니다.</p>
          <div className="bg-[var(--bg)] rounded-xl p-4">
            <div className="text-sm font-bold text-[var(--ink)] mb-2">이메일</div>
            <a href="mailto:contact@moduncalc.com" className="text-[var(--primary)] font-bold no-underline hover:underline">contact@moduncalc.com</a>
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

      <Card>
        <h2 className="text-base font-extrabold mb-3">ℹ️ 참고사항</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed list-disc pl-5 flex flex-col gap-2">
          <li>모든 계산기는 공개된 세법·요율을 기반으로 한 추정치를 제공하며, 법적 효력이 없습니다.</li>
          <li>정확한 세금 계산이 필요하시면 세무사나 국세청(126)에 문의하시기 바랍니다.</li>
          <li>개인정보는 수집하지 않으며, 모든 계산은 브라우저에서 처리됩니다.</li>
        </ul>
      </Card>
    </PageLayout>
  );
}
