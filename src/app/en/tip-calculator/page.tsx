import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import TipCalc from "./TipCalc";

export const metadata: Metadata = {
  title: "Korea Tipping Guide & Calculator - Do You Tip in Korea?",
  description: "Learn about tipping culture in Korea and calculate tips for when you travel abroad. Korea has NO tipping culture.",
  alternates: { canonical: "https://moduncalc.com/en/tip-calculator" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Travel" title="Korea Tipping Guide &amp; Calculator" description="Learn about tipping in Korea and calculate tips for international travel.">
      <CalculatorJsonLd name="Korea Tipping Guide & Calculator" description="Learn about tipping culture in Korea and calculate tips for international travel." url="https://moduncalc.com/en/tip-calculator" />
      <FaqJsonLd items={[
        { q: "Do you tip in Korea?", a: "No. Tipping is not part of Korean culture. Service charges are included in prices at restaurants, cafes, hotels, and taxis. Attempting to tip can sometimes cause confusion." },
        { q: "Is it rude to tip in Korea?", a: "It is not rude, but it is unnecessary and can cause awkwardness. Staff may try to return the extra money thinking you made a mistake. In most situations, simply paying the listed price is correct." },
        { q: "When should I tip in Korea?", a: "Tipping is almost never expected. The only exceptions are private tour guides, golf caddies, and exceptional service at international luxury hotels. Even then, it is optional and considered a bonus." },
      ]} />
      <TipCalc />
    </PageLayout>
  );
}
