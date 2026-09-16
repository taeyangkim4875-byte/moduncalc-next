import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "소개 - 모든 계산기 (moduncalc.com)",
  description: "모든 계산기(moduncalc.com)는 2026년 최신 세법·요율을 반영한 무료 계산기 82종을 제공하는 웹 서비스입니다. 운영자 김태양 소개, 계산 기준, 출처를 안내합니다.",
  alternates: { canonical: "https://moduncalc.com/about" },
  openGraph: {
    title: "소개 - 모든 계산기",
    description: "모든 계산기(moduncalc.com)의 운영자 소개, 서비스 특징, 계산 기준 및 공식 출처를 안내합니다.",
    url: "https://moduncalc.com/about",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="서비스 소개" title="모든 계산기" description="일상에서 자주 필요한 계산을 빠르고 정확하게.">
      <PersonJsonLd />
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "소개", href: "/about" }]} />

      <Card>
        <h2 className="text-base font-extrabold mb-3">🧮 모든 계산기란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          모든 계산기(moduncalc.com)는 연봉, 적금, 대출, 부동산, 건강, 세금 등 일상에서 자주 필요한 계산을 한 곳에서 무료로 이용할 수 있는 웹 서비스입니다.
          2026년 최신 세법·보험 요율·정책을 반영하여 정확한 계산 결과를 제공합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          현재 <b>한국어 계산기 82종</b>과 <b>한국어 가이드 10편</b>을 제공하고 있습니다. 여기에 한국에 거주하는 외국인을 위한 <b>영문 계산기 32종</b>과 <b>영문 가이드 28편</b>을 더해 모두 152개 페이지를 운영하며, 새로운 계산기와 콘텐츠를 지속적으로 추가하고 있습니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">👤 운영자 소개</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          모든 계산기는 <b>김태양</b>이 기획·개발·운영하는 개인 프로젝트입니다.
          한국의 복잡한 세금·보험·금융 제도를 누구나 쉽게 이해하고 계산할 수 있도록 돕는 것을 목표로 합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          모든 계산기의 세율·요율은 국세청, 국민연금공단, 건강보험공단, 고용노동부 등 정부 기관의 공식 고시를 직접 확인하여 반영합니다.
          매년 1월 세법 개정과 요율 변경 시 즉시 업데이트하고, 연중 변경 사항(7월 국민연금 기준소득월액 상한 등)도 고시 직후 반영합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          문의사항이나 오류 신고는 <Link href="/contact" className="text-[var(--primary)] font-bold no-underline hover:underline">문의하기</Link> 페이지를 이용해 주세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">✨ 서비스 특징</h2>
        <div className="flex flex-col gap-2 text-sm text-[#4E5968]">
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <b className="text-[var(--ink)]">📊 2026년 최신 정책 반영</b>
            <p className="mt-1">국민연금 9.5%(본인 4.75%), 건강보험 7.19%(본인 3.595%), 장기요양 13.14%, 고용보험 0.9%, 소득세 누진세율 등 2026년 확정 요율을 적용합니다.</p>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <b className="text-[var(--ink)]">🔒 개인정보 미수집</b>
            <p className="mt-1">모든 계산은 사용자 브라우저에서 즉시 처리되며, 입력 데이터는 서버로 전송되지 않습니다.</p>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <b className="text-[var(--ink)]">📱 모바일 최적화</b>
            <p className="mt-1">모바일·태블릿·데스크톱 어디서든 동일한 사용 경험을 제공합니다.</p>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <b className="text-[var(--ink)]">📐 공식 출처 기반</b>
            <p className="mt-1">소득세법, 국민연금공단 고시, 건강보험공단 고시 등 법령·고시에 명시된 세율과 공식을 직접 확인하여 적용합니다.</p>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3">
            <b className="text-[var(--ink)]">💯 무료 · 회원가입 없음</b>
            <p className="mt-1">모든 계산기는 무료이며, 회원가입이 필요 없습니다. 운영비 충당을 위해 일부 광고가 포함될 수 있습니다.</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📋 계산 기준 및 출처</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          모든 계산기의 세율·요율·공식은 아래 공식 출처를 기반으로 합니다:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed list-disc pl-5 flex flex-col gap-1.5">
          <li><b>소득세법 제55조</b> — 종합소득세 8구간 누진세율 (6%~45%)</li>
          <li><b>국민연금공단 고시</b> — 2026년 보험료율 9.5% (본인 4.75%), 기준소득월액 상한 659만원·하한 41만원 (2026.7~2027.6)</li>
          <li><b>건강보험공단 고시</b> — 2026년 보험료율 7.19% (본인 3.595%), 장기요양 13.14%</li>
          <li><b>고용보험법</b> — 근로자 부담 0.9%</li>
          <li><b>조세특례제한법 제18조의2</b> — 외국인 근로자 flat tax 19%</li>
          <li><b>금융위원회</b> — 청년도약계좌·청년미래적금 정부기여금 기준</li>
          <li><b>은행연합회</b> — 은행별 금리 고시</li>
          <li><b>국토교통부</b> — 부동산 중개수수료 요율표</li>
          <li><b>근로기준법·근로자퇴직급여 보장법</b> — 연차수당·퇴직금 기준</li>
          <li><b>최저임금위원회 고시</b> — 2026년 최저임금 10,320원 (2027년 10,700원 확정)</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">⚠️ 면책 조항</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          모든 계산 결과는 공개된 세법·요율을 기반으로 한 <b>참고용 추정치</b>이며, 법적 효력이 없습니다.
          정확한 금액은 해당 기관(국세청, 국민연금공단, 건강보험공단, 은행 등)의 공식 자료를 직접 확인하시기 바랍니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          계산 결과를 신뢰하여 내린 의사결정으로 발생한 손해에 대해 운영자는 책임을 지지 않습니다.
          세금·보험 관련 정확한 상담이 필요하시면 세무사 또는 국세청(☎ 126)에 문의하세요.
          자세한 내용은 <Link href="/disclaimer" className="text-[var(--primary)] font-bold no-underline hover:underline">면책조항</Link>을 참고해 주세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📬 연락처</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2">
          <p><b>운영자:</b> 김태양</p>
          <p><b>이메일:</b> taeyang.kim4875@gmail.com</p>
          <p><b>서비스 문의:</b> <a href="mailto:taeyang.kim4875@gmail.com" className="text-[var(--primary)] font-bold no-underline hover:underline">taeyang.kim4875@gmail.com</a></p>
          <p><b>문의 페이지:</b> <Link href="/contact" className="text-[var(--primary)] font-bold no-underline hover:underline">moduncalc.com/contact</Link></p>
          <p className="text-xs text-[var(--sub)] mt-2">오류 신고, 기능 건의, 제휴 문의를 받고 있습니다.</p>
        </div>
      </Card>

      <p className="text-xs text-[var(--sub)] text-center mt-4">최종 수정일: 2026년 9월 16일</p>
    </PageLayout>
  );
}
