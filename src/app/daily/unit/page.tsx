import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink, SeoFormula } from "@/components/SeoContent";
import UnitCalc from "./UnitCalc";

export const metadata: Metadata = {
  title: "단위 변환기 - 길이·무게·온도·면적 한번에 변환",
  description: "1인치는 몇 cm? 1파운드는 몇 kg? 화씨 100도는 섭씨 몇 도? 길이·무게·온도·면적 단위를 한번에 변환하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/unit" },
  openGraph: {
    title: "단위 변환기 - 길이·무게·온도·면적 한번에 변환",
    description: "1인치는 몇 cm? 1파운드는 몇 kg? 화씨 100도는 섭씨 몇 도? 길이·무게·온도·면적 단위를 한번에 변환하세요.",
    url: "https://moduncalc.com/daily/unit",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="단위 변환" title="단위 변환기" description="길이, 무게, 온도, 면적을 한 번에 변환해요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '단위변환', href: '/daily/unit' }]} />
      <CalculatorJsonLd name="단위 변환기" description="길이, 무게, 온도, 면적을 한 번에 변환하세요." url="https://moduncalc.com/daily/unit" />
      <FaqJsonLd items={[{q:"1평은 몇 ㎡인가요?",a:"1평은 약 3.3058㎡입니다."},{q:"화씨를 섭씨로 빠르게 환산하려면?",a:"(화씨 - 32) × 5/9 = 섭씨입니다. 간단히 (화씨-30)÷2로 근사할 수 있습니다."}]} />
      <UnitCalc />

      <SeoSection title="자주 쓰는 단위 변환 한눈에 보기">
        <p>해외 직구, 요리, 여행 등에서 자주 필요한 변환을 정리했습니다.</p>
        <SeoList>
          <li><strong>1인치(inch)</strong> = 2.54cm — 모니터·TV 화면 크기에 사용</li>
          <li><strong>1피트(ft)</strong> = 30.48cm — 키(신장) 표기에 사용</li>
          <li><strong>1마일(mile)</strong> = 1.609km — 미국 도로 거리 표기</li>
          <li><strong>1파운드(lb)</strong> = 0.4536kg — 미국 체중·식재료 무게</li>
          <li><strong>1온스(oz)</strong> = 28.35g — 향수·귀금속 무게</li>
          <li><strong>1평</strong> = 3.3058㎡ — 한국 부동산 면적 (공식 단위는 ㎡)</li>
          <li><strong>화씨 32°F</strong> = 섭씨 0°C, <strong>화씨 212°F</strong> = 섭씨 100°C</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="온도 변환 공식">
        <p>
          온도 변환은 단순 곱셈이 아니라 <strong>기준점이 다르기 때문에</strong> 계산이 헷갈립니다.
        </p>
        <SeoList>
          <li><strong>섭씨 → 화씨</strong>: °F = °C × 9/5 + 32</li>
          <li><strong>화씨 → 섭씨</strong>: °C = (°F − 32) × 5/9</li>
          <li><strong>빠른 근사법</strong>: 화씨에서 30을 빼고 2로 나누면 대략 섭씨 (오차 ±2°C)</li>
        </SeoList>
        <p>
          미국 날씨 앱에서 화씨가 나올 때: 70°F는 약 21°C(선선), 85°F는 약 29°C(더움),
          100°F는 약 38°C(폭염)으로 기억하면 편합니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="단위 변환, 이런 점도 궁금하실 거예요"
        items={[
          { q: '해외 직구할 때 옷 사이즈는 어떻게 변환하나요?', a: '미국 사이즈는 한국보다 대체로 크고, 유럽은 숫자 체계가 다릅니다. 예를 들어 미국 남성 M은 한국 95~100, 미국 여성 6은 한국 55에 해당합니다. 정확한 변환은 브랜드마다 다르므로 사이즈 차트를 확인하세요.' },
          { q: '평과 ㎡ 중 어느 것이 공식 단위인가요?', a: '한국의 공식 면적 단위는 ㎡(제곱미터)입니다. 평은 일본식 단위로 법적으로는 사용이 금지되었지만, 부동산 거래에서는 여전히 관행적으로 사용됩니다. 1평 = 약 3.3058㎡입니다.' },
          { q: '트로이온스와 일반 온스는 다른 건가요?', a: '네, 다릅니다. 일반 온스(avoirdupois)는 28.35g이고, 금·은 등 귀금속에 쓰는 트로이온스(troy oz)는 31.1g입니다. 금 시세에서 말하는 1온스는 트로이온스입니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          부동산 평수 변환은 <SeoLink href="/daily/pyeong">평수 계산기</SeoLink>가 더 상세하고,
          속도 단위 변환이 필요하면 <SeoLink href="/daily/speed">속도·시간 계산기</SeoLink>를 이용하세요.
          금 무게 환산은 <SeoLink href="/daily/gold">금 시세 계산기</SeoLink>에서 돈·g·oz를 한번에 확인할 수 있습니다.
        </p>
      </SeoSection>

      <SeoSection title="한국에서 자주 쓰는 단위 환산">
        <p>
          부동산, 금은방, 전통시장에서는 아직 옛 단위가 널리 쓰입니다.
          2007년부터 법정 계량단위가 아니지만 실생활에서는 여전히 통용되므로 환산값을 알아두면 유용합니다.
        </p>
        <SeoList>
          <li><strong>1평 = 3.3058㎡</strong> — 반대로 1㎡ = 0.3025평. 아파트 &lsquo;34평&rsquo;은 약 112㎡입니다.</li>
          <li><strong>1돈 = 3.75g</strong> — 금·은 무게 단위. 1냥 = 10돈 = 37.5g, 1푼 = 0.375g입니다.</li>
          <li><strong>1근 = 600g</strong> — 고기·채소용. 다만 과일이나 일부 품목은 375g을 1근으로 쓰기도 해 시장마다 다릅니다.</li>
          <li><strong>1되 = 1.8L</strong> — 곡물·술 부피. 1말 = 10되 = 18L입니다.</li>
          <li><strong>1자(척) = 30.3cm</strong> — 한복이나 목재에서 쓰입니다.</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="해외 직구·여행에서 헷갈리는 단위">
        <p>
          미국과 영국은 야드파운드법을 쓰기 때문에 온라인 쇼핑이나 여행 중에 환산이 필요합니다.
          특히 온도는 덧셈이 들어가서 단순 곱셈으로는 맞지 않습니다.
        </p>
        <SeoFormula>
          <div>℃ → ℉ : (℃ × 9 ÷ 5) + 32</div>
          <div>℉ → ℃ : (℉ − 32) × 5 ÷ 9</div>
          <div>1inch = 2.54cm · 1ft = 30.48cm · 1mile = 1.609km</div>
          <div>1lb = 0.4536kg · 1oz = 28.35g · 1gallon(미국) = 3.785L</div>
        </SeoFormula>
        <p>
          여행지 일기예보에서 &ldquo;80°F&rdquo;를 보면 (80 − 32) × 5 ÷ 9 = 약 26.7℃입니다.
          암산 요령으로 <strong>&ldquo;32를 빼고 반으로 나눈 뒤 10%를 더한다&rdquo;</strong>고 기억하면
          (80−32)=48 → 24 → 26.4로 실제값에 가깝게 나옵니다.
        </p>
        <p>
          옷·신발 사이즈는 단순 길이 환산으로 맞지 않으므로 브랜드별 사이즈표를 확인하세요.
          집 면적 환산은 <SeoLink href="/daily/pyeong">평수 변환 계산기</SeoLink>,
          금 무게와 시세는 <SeoLink href="/daily/gold">금 시세 계산기</SeoLink>가 더 편합니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
