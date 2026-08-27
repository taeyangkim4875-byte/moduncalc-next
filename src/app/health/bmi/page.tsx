import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import { ogImageUrl } from "@/utils/og";
import BmiCalculator from "./BmiCalculator";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const height = sp.height ? +sp.height : 0;
  const weight = sp.weight ? +sp.weight : 0;

  const base: Metadata = {
    title: "BMI 계산기 - 체질량지수·비만도 판정",
    description: "키·체중만 입력하면 BMI + 비만도 판정 바로 확인. WHO 아시아태평양 기준. 정상 범위와 개선 방법까지.",
    alternates: { canonical: "https://moduncalc.com/health/bmi" },
  };

  if (height > 0 && weight > 0) {
    const bmi = weight / Math.pow(height / 100, 2);
    base.openGraph = {
      title: "BMI 계산기 - 체질량지수·비만도 판정",
      description: "키·체중만 입력하면 BMI + 비만도 판정 바로 확인. WHO 아시아태평양 기준.",
      url: "https://moduncalc.com/health/bmi",
      images: [{ url: ogImageUrl({ title: 'BMI 계산기', result: `BMI ${bmi.toFixed(1)}`, inputs: `${height}cm · ${weight}kg` }), width: 1200, height: 630 }],
    };
  }

  return base;
}

export default function Page() {
  return (
    <PageLayout eyebrow="WHO 아시아태평양 기준" title="BMI 계산기" description="키와 체중으로 체질량지수(BMI)와 비만도를 확인하세요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '건강', href: '/health' }, { name: 'BMI', href: '/health/bmi' }]} />
      <CalculatorJsonLd name="BMI 계산기" description="키와 체중으로 BMI를 계산하고 비만도를 확인하세요. WHO 아시아태평양 기준." url="https://moduncalc.com/health/bmi" />
      <FaqJsonLd items={[{q:"정상 BMI 범위는?",a:"아시아태평양 기준 18.5~22.9가 정상 범위입니다."},{q:"BMI가 과체중이면 어떻게 해야 하나요?",a:"식이조절과 규칙적인 운동을 병행하되, BMI는 체지방률을 반영하지 않으므로 근육량이 많은 경우 높게 나올 수 있습니다."}]} />
      <BmiCalculator />

      <SeoSection title="건강검진표에 BMI 나오는데 왜 또 재야 하나요">
        <p>회사 건강검진 받으면 BMI가 나오긴 하는데, 1년에 한 번이잖아요. 다이어트 시작하거나 운동 루틴 바꿨을 때 중간중간 확인하려면 직접 재보는 게 빠릅니다. 근데 BMI만 보면 안 되는 게, 헬스 하는 사람은 근육 때문에 BMI가 과체중으로 나올 수 있어요.</p>
        <p>한국은 WHO 아시아태평양 기준을 씁니다. 서양 기준(25 이상 과체중)보다 엄격해서 23 이상이면 과체중이에요. 사실 한국인은 같은 BMI에서도 내장지방이 더 많다는 연구 결과 때문에 기준이 낮습니다. 체지방률까지 같이 보면 더 정확하니까 체지방률 계산기도 함께 써보세요.</p>
      </SeoSection>

      <SeoFaq
        title="BMI 관련 자주 묻는 질문"
        items={[
          { q: 'BMI 25인데 건강하면 괜찮은 건가요?', a: '혈압, 혈당, 콜레스테롤이 정상이면 당장 문제는 아니지만, 아시아 기준으로는 비만 1단계입니다. 허리둘레가 남성 90cm, 여성 85cm 이상이면 내장지방 위험이 있어요.' },
          { q: '근육이 많아도 BMI가 높게 나오나요?', a: '네. BMI는 근육과 지방을 구분하지 못합니다. 웨이트를 꾸준히 하는 사람이라면 체지방률 계산기를 병행하는 게 낫습니다.' },
          { q: '아이의 BMI는 성인 기준으로 판단하면 안 되나요?', a: '맞아요. 어린이는 성별·나이별 백분위로 판정합니다. 어린이 BMI 계산기를 이용하세요.' },
        ]}
      />
    </PageLayout>
  );
}
