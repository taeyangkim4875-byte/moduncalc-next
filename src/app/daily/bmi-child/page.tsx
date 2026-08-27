import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import BmiChildCalc from "./BmiChildCalc";

export const metadata: Metadata = {
  title: "어린이 BMI 계산기 - 소아 청소년 성장 백분위 (2026)",
  description: "어린이·청소년의 BMI를 계산하고 성장 백분위를 확인하세요. 2~18세 소아 비만도 판정.",
  alternates: { canonical: "https://moduncalc.com/daily/bmi-child" },
  openGraph: {
    title: "어린이 BMI 계산기 - 소아 청소년 성장 백분위 (2026)",
    description: "어린이·청소년의 BMI를 계산하고 성장 백분위를 확인하세요. 2~18세 소아 비만도 판정.",
    url: "https://moduncalc.com/daily/bmi-child",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="건강" title="어린이 BMI 계산기" description="2~18세 소아·청소년의 BMI와 성장 백분위를 확인합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '어린이 BMI', href: '/daily/bmi-child' }]} />
      <CalculatorJsonLd name="어린이 BMI 계산기" description="어린이·청소년의 BMI를 계산하고 성장 백분위를 확인하세요. 2~18세 소아 비만도 판정." url="https://moduncalc.com/daily/bmi-child" />
      <FaqJsonLd items={[
        { q: "어린이 BMI는 성인과 다른가요?", a: "네, 어린이는 성별·나이에 따라 BMI 기준이 다릅니다. 같은 BMI라도 나이와 성별에 따라 정상일 수도, 비만일 수도 있어 백분위로 판정합니다." },
        { q: "소아 비만 기준은 무엇인가요?", a: "같은 성별·나이 집단에서 BMI가 85~95백분위이면 과체중, 95백분위 이상이면 비만으로 판정합니다. 5백분위 미만은 저체중입니다." },
        { q: "성장기에 다이어트를 해도 되나요?", a: "성장기에는 극단적인 식이제한보다 균형 잡힌 영양 섭취와 규칙적인 신체활동이 권장됩니다. 소아 비만이 걱정된다면 소아과 전문의와 상담하세요." },
      ]} />
      <BmiChildCalc />

      <SeoSection title="우리 아이 살찐 걸까? 성인 BMI와 다른 이유">
        <p>
          어린이 BMI는 성인처럼 18.5~25가 정상이라고 단순하게 볼 수 없습니다.
          아이들은 성장하면서 체지방 비율이 계속 바뀌기 때문에, <strong>같은 나이·성별 아이들과 비교한 백분위</strong>로 판단합니다.
        </p>
        <SeoList>
          <li><strong>5백분위 미만</strong> — 저체중. 영양 섭취 점검 필요</li>
          <li><strong>5~85백분위</strong> — 정상 체중</li>
          <li><strong>85~95백분위</strong> — 과체중. 식습관 개선 권장</li>
          <li><strong>95백분위 이상</strong> — 비만. 소아과 상담 추천</li>
        </SeoList>
        <p>
          예를 들어 10살 남자아이 BMI 20이면 성인 기준에서는 정상이지만,
          같은 나이 남아 집단에서는 <strong>상위 10% 안에 들어 과체중~비만</strong>에 해당할 수 있어요.
        </p>
      </SeoSection>

      <SeoSection title="소아 비만, 왜 빨리 관리해야 할까">
        <p>
          &quot;크면서 빠지겠지&quot;라고 생각하기 쉬운데, 통계적으로 <strong>소아 비만의 70~80%가 성인 비만으로 이어집니다</strong>.
          특히 사춘기 이전에 비만이면 지방세포 수 자체가 늘어나서, 이후 다이어트가 훨씬 어려워집니다.
        </p>
        <p>
          극단적인 식이제한은 절대 금물. 성장기에는 탄수화물·단백질·지방 모두 필요합니다.
          패스트푸드·음료 줄이고, 하루 60분 이상 몸 움직이는 것만으로도 충분히 관리할 수 있어요.
          성인 체중 관리가 필요하면 <SeoLink href="/health/bmi">BMI 계산기</SeoLink>를 활용하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="어린이 BMI 관련 궁금증"
        items={[
          { q: '몇 살부터 BMI를 체크해야 하나요?', a: '만 2세부터 BMI 백분위 판정이 가능합니다. 만 2세 미만은 체중·신장 성장곡선을 사용합니다. 영유아 검진 시 소아과에서 자동으로 체크해 줍니다.' },
          { q: '키가 작은데 BMI가 정상이면 괜찮은 건가요?', a: 'BMI는 체중과 키의 비율만 보기 때문에, 키가 또래보다 많이 작다면 별도로 성장 곡선을 확인해야 합니다. 성장 지연이 의심되면 소아내분비 전문의 상담을 추천드립니다.' },
          { q: '학교 건강검진에서 비만이라고 나왔는데 어떻게 해야 하나요?', a: '먼저 가까운 소아과에서 정밀 검사(혈당, 콜레스테롤 등)를 받으세요. 대부분 식습관 개선과 활동량 증가만으로 충분히 관리됩니다. 병원비 부담은 어린이 의료비 지원 제도도 있으니 주민센터에 문의해 보세요.' },
        ]}
      />
    </PageLayout>
  );
}
