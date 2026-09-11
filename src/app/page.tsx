import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import { FaqJsonLd } from "@/components/JsonLd";
import { getCalc, HOMEPAGE_HOT, HOMEPAGE_CATEGORIES } from "@/data/calculators";

export const metadata: Metadata = {
  title: "모든 계산기 - 연봉, 적금, 대출, 부동산, 건강, 세금 무료 계산기",
  description: "연봉 실수령액, 청년도약계좌, 미래적금, 대출이자, 취득세, 복비, BMI, 퇴직금, 최저시급까지. 2026년 최신 정책 반영 무료 계산기 모음 82종.",
  alternates: { canonical: "https://moduncalc.com" },
  openGraph: {
    title: "모든 계산기 - 연봉, 적금, 대출, 건강 무료 계산기 82종",
    description: "2026년 최신 정책 반영. 연봉, 적금, 대출, 부동산, 건강, 세금, 일상 계산기를 한 곳에서 무료로.",
    url: "https://moduncalc.com",
  },
};

export default function Home() {
  return (
    <PageLayout
      eyebrow="무료 계산기 82종"
      title="모든 계산기"
      description="필요한 계산기를 찾아보세요. 2026년 최신 정책 반영."
    >
      <FaqJsonLd items={[
        { q: '계산 결과가 정확한가요?', a: '국세청, 고용노동부, 건강보험공단 등 공식 기관의 2026년 기준을 적용합니다. 다만 개인별 세부 조건에 따라 실제 금액과 차이가 있을 수 있어요.' },
        { q: '개인정보가 수집되나요?', a: '아니요. 모든 계산은 브라우저에서 처리되며 서버로 어떤 데이터도 전송하지 않습니다.' },
        { q: '모바일에서도 사용할 수 있나요?', a: '네. 모든 계산기가 모바일에 최적화되어 있습니다. 홈 화면에 추가하면 앱처럼 바로 열 수 있어요.' },
        { q: '새로운 계산기를 요청할 수 있나요?', a: '물론이요. 문의 페이지에서 원하는 계산기를 알려주시면 검토 후 추가합니다.' },
      ]} />
      {/* 인기 / 추천 */}
      <div className="mb-5">
        <div className="text-xs font-bold text-[var(--primary)] mb-2 px-1">🔥 인기 계산기</div>
        <div className="grid grid-cols-2 gap-2">
          {HOMEPAGE_HOT.map(hot => {
            const c = getCalc(hot.href);
            if (!c) return null;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="flex items-start gap-2.5 p-3 bg-white rounded-xl shadow-[var(--shadow)] no-underline text-[var(--ink)] transition-all hover:translate-y-[-1px] hover:shadow-[var(--shadow-h)] border-[1.5px] border-[var(--primary-weak)]"
              >
                <span className="text-xl flex-none mt-0.5">{c.icon}</span>
                <div className="min-w-0">
                  <div className="text-sm font-bold truncate">{c.title}</div>
                  <div className="text-[11px] text-[var(--sub)] font-medium">{hot.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 카테고리별 */}
      {HOMEPAGE_CATEGORIES.map(cat => (
        <div key={cat.title} className="mb-4">
          <div className="text-sm font-extrabold text-[var(--ink)] mb-2 px-1">{cat.title}</div>
          <div className="grid grid-cols-2 gap-1.5">
            {cat.items.map(href => {
              const c = getCalc(href);
              if (!c) return null;
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl no-underline text-[var(--ink)] transition-all hover:bg-[var(--primary-weak)] border border-[var(--line)]"
                >
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold truncate">{c.title}</div>
                    <div className="text-[10px] text-[var(--sub)] font-medium">{c.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}


      <Card className="mt-4">
        <h2 className="text-base font-extrabold mb-3">📖 모든 계산기란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">모든 계산기(moduncalc.com)는 연봉, 적금, 대출, 부동산, 건강, 세금 등 일상에서 자주 필요한 계산을 한 곳에서 무료로 이용할 수 있는 웹 서비스입니다. 2026년 최신 정책·세율·요율이 반영되어 있으며, 모든 계산은 브라우저에서 즉시 처리됩니다.</p>
        <p className="text-sm text-[#4E5968] leading-relaxed">청년도약계좌·미래적금, 연봉 실수령액, 최저시급·주휴수당, 실업급여, 국민연금, DSR, 취득세, 양도소득세, BMI, 퇴직금, 에어컨 전기요금 등 82종의 계산기와 28편의 가이드 글을 제공합니다.</p>
      </Card>

      <SeoSection title="매달 정책이 바뀌는데, 계산기는 최신인가요?">
        <p>연봉 실수령액, 4대보험, 최저시급 같은 계산은 매년 1월에 기준이 바뀝니다. 2026년에는 국민연금 보험료율이 9%에서 9.5%로 올랐고, 건강보험료율은 7.09%가 적용됩니다. 최저시급은 10,470원이에요. 이런 변동 사항을 모든 계산기에 빠르게 반영하고 있습니다.</p>
        <p>부동산 쪽도 마찬가지입니다. 취득세율, 양도소득세 장기보유특별공제율, 종합부동산세 공정시장가액비율이 해마다 바뀌는데, 국세청·행정안전부 고시가 나오면 바로 업데이트합니다. 오래된 세율로 계산해서 세금을 잘못 예상하는 일이 없도록요.</p>
      </SeoSection>

      <SeoSection title="카테고리별 추천 계산기">
        <SeoList>
          <li><strong>연봉·급여</strong> — 처음이면 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>부터. 4대보험, 소득세 다 떼고 통장에 꽂히는 금액을 확인하세요. 이직 협상 전이라면 필수입니다.</li>
          <li><strong>적금·저축</strong> — <SeoLink href="/savings/doyak">청년도약계좌</SeoLink>와 <SeoLink href="/savings/mirae">청년미래적금</SeoLink> 중 뭐가 유리한지 비교해보세요. 환승 여부 판단에도 유용합니다.</li>
          <li><strong>대출</strong> — <SeoLink href="/loan">주택담보대출 계산기</SeoLink>로 원리금균등·원금균등·만기일시 방식별 이자를 비교하고, <SeoLink href="/loan/dsr">DSR 계산기</SeoLink>로 내 대출 한도를 미리 확인하세요.</li>
          <li><strong>부동산</strong> — 집을 사기 전에 <SeoLink href="/realestate/acqtax">취득세</SeoLink>, 팔기 전에 <SeoLink href="/realestate/transfer">양도소득세</SeoLink>를 꼭 계산해 보세요. 수천만원 차이가 날 수 있습니다.</li>
          <li><strong>건강</strong> — <SeoLink href="/health/bmi">BMI</SeoLink>, <SeoLink href="/health/bmr">기초대사량</SeoLink>, <SeoLink href="/daily/calorie">칼로리</SeoLink>를 한 번에 확인하면 다이어트 계획이 훨씬 현실적이에요.</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="모든 계산기 이용 안내"
        items={[
          { q: '계산 결과가 정확한가요?', a: '국세청, 고용노동부, 건강보험공단 등 공식 기관의 2026년 기준을 적용합니다. 다만 개인별 세부 조건(부양가족, 감면, 비과세 항목 등)에 따라 실제 금액과 차이가 있을 수 있어요. 참고용으로 활용하시고, 정확한 금액은 관할 기관에 확인하세요.' },
          { q: '개인정보가 수집되나요?', a: '아니요. 모든 계산은 브라우저에서 처리되며 서버로 어떤 데이터도 전송하지 않습니다. 계산 기록도 기기에만 임시 저장되고, 브라우저를 닫으면 사라집니다.' },
          { q: '모바일에서도 사용할 수 있나요?', a: '네. 모든 계산기가 모바일에 최적화되어 있습니다. 홈 화면에 추가하면 앱처럼 바로 열 수 있어요.' },
          { q: '새로운 계산기를 요청할 수 있나요?', a: '물론이요. 문의 페이지에서 원하는 계산기를 알려주시면 검토 후 추가합니다. 실제로 많은 계산기가 이용자 요청으로 만들어졌어요.' },
        ]}
      />
    </PageLayout>
  );
}
