import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import IncomeTaxCalcEn from "./IncomeTaxCalcEn";

export const metadata: Metadata = {
  title: "Korea Income Tax Calculator for Foreigners (2026)",
  description: "How much income tax will you pay in Korea? Enter your salary — see progressive tax brackets, deductions & effective rate.",
  alternates: { canonical: "https://moduncalc.com/en/income-tax" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korea Income Tax Calculator" description="Calculate your Korean income tax — see progressive brackets, deductions, effective rate, and compare with the 19% flat tax option for foreigners.">
      <CalculatorJsonLd name="Korea Income Tax Calculator for Foreigners" description="Calculate Korean income tax with progressive brackets, social insurance deductions, and 19% flat tax comparison for foreign workers." url="https://moduncalc.com/en/income-tax" />
      <FaqJsonLd items={[
        { q: "What is the 19% flat tax option for foreigners in Korea?", a: "Foreign workers in Korea can choose to pay a flat 19% income tax rate on their entire gross salary instead of using the progressive tax system (6-45%). This option has no deductions or credits — it is a simple flat rate applied to total earnings. It is generally more beneficial for those earning above approximately ₩80-100 million per year, as the progressive system's higher brackets (35-45%) would otherwise apply. You must elect this option during year-end settlement (연말정산)." },
        { q: "How does year-end settlement (연말정산) work for foreigners?", a: "Year-end settlement happens every January-February. Your employer recalculates your actual tax liability for the previous year compared to what was withheld from your monthly paycheck. If taxes were over-withheld, you receive a refund; if under-withheld, you pay the difference. Foreigners should submit deduction receipts (medical, education, card usage) through the Hometax (홈택스) website, or opt for the simpler 19% flat tax. Your employer's HR department will guide you through the process." },
        { q: "Do foreigners pay social insurance (4대보험) in Korea?", a: "Yes, most foreign workers on employment visas (E-1 through E-7, H-1) must pay the same 4 social insurance premiums as Korean workers: National Pension (국민연금, 4.75%), National Health Insurance (건강보험, 3.595% + long-term care), and Employment Insurance (고용보험, 0.9%). These are split 50/50 between employee and employer. Some countries have pension totalization agreements with Korea, allowing exemption from National Pension contributions." },
      ]} />
      <IncomeTaxCalcEn />
    </PageLayout>
  );
}
