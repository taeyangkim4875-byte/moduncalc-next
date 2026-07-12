import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CostOfLivingCalc from "./CostOfLivingCalc";

export const metadata: Metadata = {
  title: "Korea Cost of Living Calculator - Monthly Budget Estimator (2026)",
  description: "Estimate your monthly living costs in Seoul, Busan, or other Korean cities. Covers rent, food, transport, utilities, and entertainment for foreigners.",
  alternates: { canonical: "https://moduncalc.com/en/cost-of-living" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Cost of Living Calculator" description="Estimate your monthly expenses in Korea by city and lifestyle.">
      <CalculatorJsonLd name="Korea Cost of Living Calculator" description="Estimate monthly living costs in Korean cities for foreigners." url="https://moduncalc.com/en/cost-of-living" />
      <FaqJsonLd items={[
        { q: "How much does it cost to live in Seoul per month?", a: "A single foreigner can expect to spend ₩1.5-3M/month ($1,100-2,200) depending on lifestyle. Rent is the biggest variable: a studio in Gangnam costs ₩800K-1.2M/month, while areas like Guro or Gwanak are ₩400-600K." },
        { q: "Is Korea expensive for foreigners?", a: "Korea is moderate compared to Western countries. Rent and dining out are cheaper than most Western capitals, but imported goods and international schools are expensive. Public transport is very affordable." },
      ]} />
      <CostOfLivingCalc />
    </PageLayout>
  );
}
