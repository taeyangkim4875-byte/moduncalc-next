import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PensionRefundCalc from "./PensionRefundCalc";

export const metadata: Metadata = {
  title: "Korea Pension Refund Calculator - Lump-Sum Withdrawal for Foreigners",
  description: "Calculate how much National Pension (NPS) refund you can get when leaving Korea. Covers eligibility, refund amount, and the application process.",
  alternates: { canonical: "https://moduncalc.com/en/pension-refund" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Foreigners Leaving Korea" title="Pension Refund Calculator" description="Estimate your National Pension lump-sum refund when you leave Korea.">
      <CalculatorJsonLd name="Korea Pension Refund Calculator" description="Calculate National Pension lump-sum refund for foreigners leaving Korea." url="https://moduncalc.com/en/pension-refund" />
      <FaqJsonLd items={[
        { q: "Can I get my Korean pension money back when I leave?", a: "Yes, if your country does not have a pension treaty with Korea (or the treaty allows it), you can claim a lump-sum refund of your contributions within 3 years of leaving." },
        { q: "How much pension refund will I get?", a: "You receive your total employee contributions plus a small amount of interest. The employer's matching contribution is NOT refunded — it stays in the NPS fund." },
        { q: "Which countries have pension treaties with Korea?", a: "Countries with treaties include the USA, Canada, Germany, France, Japan, Australia, and others. Citizens of these countries may not be eligible for a lump-sum refund but can transfer credits." },
      ]} />
      <PensionRefundCalc />
    </PageLayout>
  );
}
