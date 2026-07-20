import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import HealthInsCalc from "./HealthInsCalc";

export const metadata: Metadata = {
  title: "Korea Health Insurance Calculator for Foreigners (2026)",
  description: "How much is Korean health insurance? Enter your monthly salary \u2014 see your exact NHI premium. Employee vs self-employed.",
  alternates: { canonical: "https://moduncalc.com/en/health-insurance" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Healthcare" title="Health Insurance Calculator" description="Estimate your monthly NHI premium as a foreigner in Korea.">
      <CalculatorJsonLd name="Korea Health Insurance Calculator" description="Calculate monthly National Health Insurance premium for foreigners in Korea." url="https://moduncalc.com/en/health-insurance" />
      <FaqJsonLd items={[
        { q: "Is health insurance mandatory for foreigners in Korea?", a: "Yes. Since July 2019, all foreigners staying 6+ months must enroll in National Health Insurance (NHI). Employees are automatically enrolled through their employer." },
        { q: "How much does health insurance cost for foreigners?", a: "For employees, the rate is 3.595% of monthly salary (you pay half, employer pays half). Self-employed foreigners pay based on income, assets, and other factors with a minimum floor." },
        { q: "What does Korean health insurance cover?", a: "NHI covers about 60-70% of medical costs at hospitals and clinics. You pay 30% copay for outpatient visits and 20% for inpatient stays. Dental, mental health, and prescriptions are partially covered." },
      ]} />
      <HealthInsCalc />
    </PageLayout>
  );
}
