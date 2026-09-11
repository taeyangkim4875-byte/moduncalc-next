import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
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

      <SeoSection title="마른 비만, BMI로는 모릅니다">
        <p>
          BMI 22인데 체지방률이 30%가 넘는 경우가 있어요. 이걸 &quot;마른 비만&quot;이라고 하는데, 특히 운동 없이 식이조절만으로 다이어트한 분들에게 많습니다.
          근육량은 줄고 내장지방은 그대로라서, 겉보기엔 날씬한데 대사증후군 위험은 오히려 높아요.
        </p>
        <p>
          마른 비만을 잡아내려면 BMI 말고 <strong>허리둘레</strong>를 같이 봐야 합니다. 남성 90cm, 여성 85cm 이상이면 내장지방이 과다한 것으로 봅니다.
          더 정확하게 알려면 <SeoLink href="/health/bodyfat">체지방률 계산기</SeoLink>를 써보세요.
        </p>
      </SeoSection>

      <SeoSection title="연령대별 평균 BMI — 내가 어디쯤인지">
        <p>
          국민건강영양조사(2024) 기준 한국 성인 평균 BMI는 남성 24.8, 여성 23.2입니다.
          나이대별로 보면 30~40대에서 가장 높고, 70대 이후에는 다시 낮아지는 패턴이에요.
        </p>
        <SeoList>
          <li><strong>20대</strong> — 남 23.5 / 여 21.8 (가장 낮은 연령대)</li>
          <li><strong>30대</strong> — 남 25.2 / 여 22.9</li>
          <li><strong>40대</strong> — 남 25.4 / 여 23.3</li>
          <li><strong>50대</strong> — 남 24.9 / 여 24.1</li>
          <li><strong>60대</strong> — 남 24.3 / 여 24.5 (여성은 폐경 후 상승)</li>
        </SeoList>
        <p>
          솔직히 &quot;평균&quot;이 정상은 아닙니다. 한국 성인 남성의 약 46%가 BMI 25 이상(비만)인 게 현실이에요.
          BMI는 첫 번째 스크리닝이고, 진짜 건강 상태는 <SeoLink href="/health/bmr">기초대사량</SeoLink>과 체지방률까지 봐야 그림이 완성됩니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="BMI 관련 자주 묻는 질문"
        items={[
          { q: 'BMI 25인데 건강하면 괜찮은 건가요?', a: '혈압, 혈당, 콜레스테롤이 정상이면 당장 문제는 아니지만, 아시아 기준으로는 비만 1단계입니다. 허리둘레가 남성 90cm, 여성 85cm 이상이면 내장지방 위험이 있어요.' },
          { q: '근육이 많아도 BMI가 높게 나오나요?', a: '네. BMI는 근육과 지방을 구분하지 못합니다. 웨이트를 꾸준히 하는 사람이라면 체지방률 계산기를 병행하는 게 낫습니다.' },
          { q: '아이의 BMI는 성인 기준으로 판단하면 안 되나요?', a: '맞아요. 어린이는 성별·나이별 백분위로 판정합니다. 어린이 BMI 계산기를 이용하세요.' },
          { q: 'BMI가 보험료에 영향을 주나요?', a: '실손보험 가입 시 BMI 30 이상이면 할증되거나 가입이 제한될 수 있습니다. 건강보험료에는 직접 영향은 없지만, 비만으로 인한 진료비가 늘면 간접적으로 부담이 커집니다.' },
          { q: '다이어트 중인데 BMI를 얼마나 자주 재야 하나요?', a: '주 1회, 같은 시간(아침 공복)에 재는 게 좋습니다. 매일 재면 수분량 변화 때문에 스트레스만 받아요. 한 달 단위로 추이를 보는 게 정신 건강에도 이롭습니다.' },
        ]}
      />
    </PageLayout>
  );
}
