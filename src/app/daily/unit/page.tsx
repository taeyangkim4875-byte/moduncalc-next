import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import UnitCalc from "./UnitCalc";

export const metadata: Metadata = {
  title: "단위 변환기 - 길이·무게·온도·면적 한번에 변환",
  description: "1인치는 몇 cm? 1파운드는 몇 kg? 화씨 100도는 섭씨 몇 도? 길이·무게·온도·면적 단위를 한번에 변환하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/unit" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="단위 변환" title="단위 변환기" description="길이, 무게, 온도, 면적을 한 번에 변환해요.">
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
    </PageLayout>
  );
}
