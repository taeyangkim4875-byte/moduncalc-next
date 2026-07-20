import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SeveranceCalcEn from "./SeveranceCalcEn";

export const metadata: Metadata = {
  title: "Korea Severance Pay Calculator - Retirement Allowance for Foreigners",
  description: "How much severance pay are you owed? Enter start date & salary — instant calculation. 1+ year = mandatory in Korea.",
  alternates: { canonical: "https://moduncalc.com/en/severance" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Employment" title="Severance Pay Calculator" description="Calculate your retirement allowance (퇴직금) entitlement.">
      <CalculatorJsonLd name="Korea Severance Pay Calculator" description="Calculate severance pay for foreign workers in Korea based on employment period and salary." url="https://moduncalc.com/en/severance" />
      <FaqJsonLd items={[
        { q: "Am I eligible for severance pay in Korea?", a: "Yes, if you worked for the same employer for 1 year or more with at least 15 hours per week. This applies to all workers including foreigners." },
        { q: "How much severance pay do I get?", a: "At minimum, 30 days of average wages for each year of continuous service. Average wage is calculated from your last 3 months of pay." },
      ]} />
      <SeveranceCalcEn />
    </PageLayout>
  );
}
