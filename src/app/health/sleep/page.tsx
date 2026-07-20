import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
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
      <CalculatorJsonLd name="수면 시간 계산기" description="수면 주기(90분)에 맞춰 최적의 취침·기상 시간을 알려드립니다. 개운하게 일어나는 시간 계산." url="https://moduncalc.com/health/sleep" />
      <FaqJsonLd items={[
        {q:"수면 주기란 무엇인가요?",a:"수면 주기는 NREM(비렘수면)과 REM(렘수면)이 반복되는 약 90분 단위의 사이클입니다. 한 밤에 4~6회 반복되며, 수면 주기가 끝나는 시점에 일어나면 개운합니다."},
        {q:"성인의 권장 수면 시간은 얼마인가요?",a:"미국수면재단(NSF) 기준 성인(18~64세)은 7~9시간, 65세 이상은 7~8시간이 권장됩니다. 수면 주기(90분) 기준으로 5사이클(7.5시간)이 가장 이상적입니다."},
        {q:"잠드는 데 걸리는 시간은 왜 고려하나요?",a:"보통 잠자리에 든 후 실제로 잠들기까지 평균 10~20분이 걸립니다. 이 시간을 고려하지 않으면 수면 주기 계산이 부정확해져 개운하게 일어나기 어렵습니다."},
      ]} />
      <SleepCalc />
    </PageLayout>
  );
}
