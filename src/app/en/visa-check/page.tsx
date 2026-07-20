import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import VisaCheckCalc from "./VisaCheckCalc";

export const metadata: Metadata = {
  title: "Korea Visa Checker - Which Visa Do You Need? (2026)",
  description: "Which Korean visa fits you? Answer 5 questions and find your visa type, requirements & application process. E-2, E-7, F-2, F-4, F-5, F-6.",
  alternates: { canonical: "https://moduncalc.com/en/visa-check" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korea Visa Checker" description="Answer a few questions to find the right Korean visa for you.">
      <CalculatorJsonLd name="Korea Visa Checker" description="Interactive quiz to find the right Korean visa type based on your purpose, qualifications, and duration of stay." url="https://moduncalc.com/en/visa-check" />
      <FaqJsonLd items={[
        { q: "What visa do I need to work in Korea?", a: "It depends on your job type. English teachers typically need an E-2 visa, IT/engineering professionals need an E-7 visa, and other skilled workers may qualify for E-7 or F-2 (points-based). As of 2026, E-7 visa holders must meet a minimum salary threshold set by the Ministry of Justice." },
        { q: "Can I get permanent residency in Korea?", a: "Yes, through the F-5 visa. Requirements include living in Korea for 5+ years, having sufficient income, passing the KIIP (Korea Immigration & Integration Program), and meeting Korean language requirements (typically TOPIK 5+). Marriage visa (F-6) holders may qualify sooner." },
        { q: "Do I need to speak Korean to get a visa?", a: "Not for all visa types. Tourist visas and E-2 (English teaching) visas don't require Korean. However, for long-term visas like F-2 (points-based resident) and F-5 (permanent resident), Korean proficiency (TOPIK scores) significantly helps your application and earns you extra points." },
      ]} />
      <VisaCheckCalc />
    </PageLayout>
  );
}
