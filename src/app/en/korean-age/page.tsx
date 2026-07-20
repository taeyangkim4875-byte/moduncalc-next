import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import KoreanAgeCalc from "./KoreanAgeCalc";

export const metadata: Metadata = {
  title: "Korean Age Calculator - International vs Korean Age",
  description: "How old are you in Korea? Enter your birthday \u2014 see international age, Korean age & Chinese zodiac instantly.",
  alternates: { canonical: "https://moduncalc.com/en/korean-age" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Daily" title="Korean Age Calculator" description="Find out your international and Korean age.">
      <CalculatorJsonLd name="Korean Age Calculator" description="Convert between international and Korean age systems." url="https://moduncalc.com/en/korean-age" />
      <FaqJsonLd items={[
        { q: "What is Korean age?", a: "In the traditional Korean age system, you are 1 year old at birth, and everyone gains a year on January 1st. However, since June 2023, Korea officially uses international age for all legal purposes." },
        { q: "Does Korea still use Korean age?", a: "Officially, no. Korea unified to the international age system in June 2023. But many Koreans still use Korean age in casual conversation." },
      ]} />
      <KoreanAgeCalc />
    </PageLayout>
  );
}
