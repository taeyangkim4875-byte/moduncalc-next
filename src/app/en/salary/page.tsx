import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SalaryCalcEn from "./SalaryCalcEn";

export const metadata: Metadata = {
  title: "Korea Salary Calculator - Net Pay After Tax & Insurance (2026)",
  description: "What's your take-home pay in Korea? Enter salary, see exact deductions for pension, health insurance & tax. 2026 rates.",
  alternates: { canonical: "https://moduncalc.com/en/salary" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="2026 Rates" title="Korea Salary Calculator" description="Calculate your monthly net pay after tax and social insurance.">
      <CalculatorJsonLd name="Korea Salary Calculator" description="Calculate take-home salary in Korea with 2026 tax rates and social insurance premiums." url="https://moduncalc.com/en/salary" />
      <FaqJsonLd items={[
        { q: "What are the social insurance rates in Korea for 2026?", a: "National Pension 4.75%, Health Insurance 3.595% + Long-term Care 13.14% of health premium, Employment Insurance 0.9%. Employer pays matching amounts." },
        { q: "How is Korean income tax calculated?", a: "Korea uses a progressive tax system with 8 brackets from 6% to 45%. Local income tax of 10% is added on top. Various deductions and credits can reduce the amount." },
      ]} />
      <SalaryCalcEn />
    </PageLayout>
  );
}
