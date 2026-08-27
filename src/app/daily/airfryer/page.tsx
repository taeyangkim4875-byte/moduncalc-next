import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList } from "@/components/SeoContent";
import AirfryerCalc from "./AirfryerCalc";
export const metadata: Metadata = { title: "에어프라이어 시간·온도 변환기 - 오븐 레시피 변환", description: "오븐 레시피를 에어프라이어용으로 변환하세요. 온도 10~15도 낮추고, 시간 20% 줄이면 됩니다.", alternates: { canonical: "https://moduncalc.com/daily/airfryer" },
  openGraph: {
    title: "에어프라이어 시간·온도 변환기 - 오븐 레시피 변환",
    description: "오븐 레시피를 에어프라이어용으로 변환하세요. 온도 10~15도 낮추고, 시간 20% 줄이면 됩니다.",
    url: "https://moduncalc.com/daily/airfryer",
  },};
export default function Page() { return <PageLayout eyebrow="요리 변환" title="에어프라이어 시간·온도 변환기" description="오븐 레시피의 온도와 시간을 에어프라이어에 맞게 변환합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '에어프라이어', href: '/daily/airfryer' }]} /><CalculatorJsonLd name="에어프라이어 시간·온도 변환기" description="오븐 레시피를 에어프라이어용으로 변환하세요. 온도 10~15도 낮추고, 시간 20% 줄이면 됩니다." url="https://moduncalc.com/daily/airfryer" /><FaqJsonLd items={[{q:"에어프라이어는 예열이 필요한가요?",a:"대부분의 에어프라이어는 3~5분 예열하면 충분합니다. 예열 없이 바로 조리해도 되지만, 예열하면 더 바삭한 결과를 얻을 수 있습니다."},{q:"에어프라이어와 오븐의 차이는 무엇인가요?",a:"에어프라이어는 강력한 팬으로 뜨거운 공기를 빠르게 순환시켜 조리합니다. 오븐보다 공간이 작고 공기 순환이 빨라 같은 온도에서도 더 빨리, 더 바삭하게 조리됩니다."},{q:"중간에 뒤집어야 하나요?",a:"대부분의 음식은 조리 시간의 절반 지점에서 한 번 뒤집거나 흔들어주면 골고루 익습니다. 특히 감자튀감, 치킨너겟 등은 뒤집기가 중요합니다."}]} /><AirfryerCalc />

      <SeoSection title="오븐 레시피 → 에어프라이어, 핵심 규칙 딱 두 개">
        <p>
          유튜브에서 본 레시피가 오븐 기준이라 에어프라이어로 돌리면 겉은 타고 속은 안 익는 경험, 다들 한 번쯤 있죠.
          사실 규칙은 간단합니다.
        </p>
        <SeoList>
          <li><strong>온도는 10~15°C 낮추기</strong> — 에어프라이어는 공간이 좁아 열 순환이 빠름. 오븐 180°C면 에어프라이어 165~170°C</li>
          <li><strong>시간은 20% 줄이기</strong> — 오븐 25분이면 에어프라이어 20분. 처음엔 짧게 하고 상태 봐가며 추가하는 게 안전</li>
        </SeoList>
        <p>
          냉동식품(치킨너겟, 감자튀김 등)은 포장지에 에어프라이어 시간이 별도 표기된 경우가 많으니 먼저 확인하세요.
        </p>
      </SeoSection>

      <SeoSection title="에어프라이어 요리별 온도·시간 참고표">
        <SeoList>
          <li><strong>냉동 치킨너겟</strong> — 180°C, 10~12분 (중간에 한 번 뒤집기)</li>
          <li><strong>감자튀김 (냉동)</strong> — 190°C, 15~18분 (흔들어주기 2회)</li>
          <li><strong>삼겹살 구이</strong> — 200°C, 15~20분 (기름 빠지게 바닥에 물 약간)</li>
          <li><strong>고구마 굽기</strong> — 180°C, 25~35분 (크기에 따라 다름, 젓가락으로 찔러보기)</li>
          <li><strong>토스트</strong> — 170°C, 3~5분 (예열 필수)</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="에어프라이어 궁금증"
        items={[
          { q: '에어프라이어에 종이호일 써도 되나요?', a: '네, 사용 가능합니다. 다만 음식 없이 종이호일만 넣으면 팬에 의해 날아가 히터에 닿을 수 있으니, 반드시 음식 위에 올리거나 아래 깔아서 고정하세요.' },
          { q: '기름을 아예 안 넣어도 되나요?', a: '냉동식품이나 기름기 있는 고기는 기름 없이도 됩니다. 하지만 감자, 고구마, 채소 등은 오일 스프레이로 살짝 뿌려야 바삭해집니다.' },
          { q: '에어프라이어에 알루미늄 호일도 괜찮나요?', a: '바닥에 깔아 쓸 수 있지만, 공기 순환을 막으면 조리 효율이 떨어집니다. 구멍을 뚫거나 바닥만 살짝 덮는 정도로 사용하세요. 산성 음식(토마토소스 등)은 알루미늄 반응이 있을 수 있어 종이호일이 낫습니다.' },
        ]}
      />
    </PageLayout>; }
