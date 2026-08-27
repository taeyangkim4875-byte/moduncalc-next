import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import SleepCalc from "./SleepCalc";

export const metadata: Metadata = {
  title: "수면 시간 계산기 - 몇 시에 자야 개운할까? · 수면 주기",
  description: "몇 시에 자야 개운하게 일어날까? 수면 주기 90분에 맞춘 최적의 취침·기상 시간 계산.",
  alternates: { canonical: "https://moduncalc.com/health/sleep" },
  openGraph: {
    title: "수면 시간 계산기 - 몇 시에 자야 개운할까? · 수면 주기",
    description: "수면 주기(90분)에 맞춰 최적의 취침·기상 시간을 알려드립니다. 개운하게 일어나는 시간 계산.",
    url: "https://moduncalc.com/health/sleep",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="건강" title="수면 시간 계산기" description="수면 주기(90분)에 맞춰 최적의 취침·기상 시간을 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '건강', href: '/health' }, { name: '수면 계산기', href: '/health/sleep' }]} />
      <CalculatorJsonLd name="수면 시간 계산기" description="수면 주기(90분)에 맞춰 최적의 취침·기상 시간을 알려드립니다. 개운하게 일어나는 시간 계산." url="https://moduncalc.com/health/sleep" />
      <FaqJsonLd items={[
        {q:"수면 주기란 무엇인가요?",a:"수면 주기는 NREM(비렘수면)과 REM(렘수면)이 반복되는 약 90분 단위의 사이클입니다. 한 밤에 4~6회 반복되며, 수면 주기가 끝나는 시점에 일어나면 개운합니다."},
        {q:"성인의 권장 수면 시간은 얼마인가요?",a:"미국수면재단(NSF) 기준 성인(18~64세)은 7~9시간, 65세 이상은 7~8시간이 권장됩니다. 수면 주기(90분) 기준으로 5사이클(7.5시간)이 가장 이상적입니다."},
        {q:"잠드는 데 걸리는 시간은 왜 고려하나요?",a:"보통 잠자리에 든 후 실제로 잠들기까지 평균 10~20분이 걸립니다. 이 시간을 고려하지 않으면 수면 주기 계산이 부정확해져 개운하게 일어나기 어렵습니다."},
      ]} />
      <SleepCalc />

      <SeoSection title="알람 시간 잘못 맞추면 더 피곤한 이유">
        <p>7시간 잤는데 개운하고, 8시간 잤는데 오히려 더 피곤한 적 있잖아요. 이게 수면 주기 때문입니다. 수면 주기 한 사이클이 약 90분인데, 딱 이 주기가 끝나는 타이밍에 일어나야 개운해요. 깊은 수면 한가운데서 알람이 울리면 8시간을 자도 피곤합니다.</p>
        <p>잠드는 데 걸리는 시간도 중요해요. 보통 10~20분 정도 걸리는데, 이걸 계산 안 하면 수면 주기가 어긋납니다. 예를 들어 7시에 일어나야 하면 23시 14분이나 0시 44분에 눕는 게 좋아요. 사실 매일 같은 시간에 자고 일어나는 게 수면의 질에는 가장 효과적입니다.</p>
      </SeoSection>

      <SeoFaq
        title="수면 관련 궁금한 점"
        items={[
          { q: '낮잠은 얼마나 자는 게 좋나요?', a: '20분이 베스트입니다. 30분 넘기면 깊은 수면에 들어가서 오히려 머리가 멍해져요. 점심 직후 15~20분 파워냅이 오후 집중력에 효과적입니다.' },
          { q: '주말에 몰아자면 수면 부채가 해소되나요?', a: '일부 회복은 되지만, 수면 리듬이 깨져서 월요일이 더 힘들어집니다. 주중 수면 시간을 30분이라도 늘리는 게 낫습니다.' },
          { q: '카페인은 수면에 얼마나 영향을 주나요?', a: '카페인 반감기가 5~6시간입니다. 오후 2시에 마신 커피가 밤 8시에도 절반이 남아있어요. 수면이 예민하면 점심 이후 카페인은 피하세요.' },
        ]}
      />
    </PageLayout>
  );
}
