import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import TaxComparator from "./TaxComparator";

export const metadata: Metadata = {
  title: "Korea Flat Tax vs Progressive Tax Calculator for Foreigners (2026)",
  description: "Should you choose 19% flat tax or progressive? Enter your salary and see exactly which saves you more. Break-even at ~\u20A9160M.",
  alternates: { canonical: "https://moduncalc.com/en/tax-comparison" },
  openGraph: {
    title: "Korea Flat Tax vs Progressive Tax Calculator (2026)",
    description: "Foreign worker? Compare flat 19% vs progressive tax and find your best option.",
    locale: "en_US",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="Foreign Workers · 2026"
      title="Flat Tax vs Progressive Tax"
      description="Enter your salary to see which tax method saves you more money."
    >
      <CalculatorJsonLd
        name="Korea Flat Tax vs Progressive Tax Calculator"
        description="Compare 19% flat tax vs progressive tax rates for foreign workers in Korea. Calculate take-home pay under both methods."
        url="https://moduncalc.com/en/tax-comparison"
      />
      <FaqJsonLd items={[
        { q: "What is the flat tax rate for foreigners in Korea?", a: "Foreign workers can elect a flat 19% income tax rate (+ 1.9% local tax = 20.9% total) instead of the progressive rates (6%–45%). This is available for up to 20 years from your first working day in Korea." },
        { q: "When is flat tax better than progressive?", a: "Flat tax becomes advantageous when your annual salary exceeds approximately ₩160 million. Below that, progressive taxation with deductions is usually cheaper." },
        { q: "Can I switch between flat and progressive every year?", a: "Yes. You choose your tax method during year-end settlement each year. You are not locked in." },
        { q: "Are social insurance contributions different under flat tax?", a: "No. National Pension, Health Insurance, and Employment Insurance contributions are the same regardless of which tax method you choose." },
        { q: "What deductions am I giving up with flat tax?", a: "Under flat tax, you cannot claim earned income deduction, personal exemptions, or earned income tax credit. The 19% applies to your entire gross salary." },
      ]} />
      <TaxComparator />
    </PageLayout>
  );
}
