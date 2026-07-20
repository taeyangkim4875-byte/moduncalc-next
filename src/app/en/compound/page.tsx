import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CompoundCalcEn from "./CompoundCalcEn";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Investment Growth Simulator",
  description: "How much will your investment grow? Compound interest calculator with monthly contributions + Rule of 72.",
  alternates: { canonical: "https://moduncalc.com/en/compound" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Finance" title="Compound Interest Calculator" description="See how your investment grows over time with compound interest.">
      <CalculatorJsonLd name="Compound Interest Calculator" description="Calculate compound interest with monthly contributions and visualize investment growth over time." url="https://moduncalc.com/en/compound" />
      <FaqJsonLd items={[
        { q: "What is compound interest?", a: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, your money grows exponentially because you earn 'interest on interest'. Albert Einstein reportedly called it the eighth wonder of the world." },
        { q: "What is the Rule of 72?", a: "The Rule of 72 is a quick way to estimate how long it takes for an investment to double. Simply divide 72 by the annual interest rate. For example, at 7% annual return, your money doubles in approximately 72 / 7 = 10.3 years." },
        { q: "What are typical investment returns in Korea?", a: "Korean bank savings deposits (적금) typically offer 3-4% annually. The Korean stock market (KOSPI) has averaged about 7-8% over the long term. Global stock index funds can offer 7-10% average annual returns over long periods, though with higher volatility." },
      ]} />
      <CompoundCalcEn />
    </PageLayout>
  );
}
