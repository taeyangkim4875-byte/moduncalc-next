import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PyeongCalcEn from "./PyeongCalcEn";

export const metadata: Metadata = {
  title: "Pyeong to Square Meters Converter - Korean Apartment Size Guide",
  description: "What is 33평 in square meters? Convert Korean pyeong ↔ ㎡ instantly. Essential for apartment hunting in Korea.",
  alternates: { canonical: "https://moduncalc.com/en/pyeong" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Real Estate" title="Pyeong Converter" description="Convert between pyeong (평) and square meters for Korean real estate.">
      <CalculatorJsonLd name="Pyeong to Square Meters Converter" description="Convert pyeong (평) to square meters (㎡) and vice versa. Essential for understanding Korean apartment sizes." url="https://moduncalc.com/en/pyeong" />
      <FaqJsonLd items={[
        { q: "What is a pyeong?", a: "Pyeong (평) is a traditional Korean unit of area. 1 pyeong equals approximately 3.3058 square meters (㎡) or about 35.58 square feet. It is still widely used in Korean real estate despite the official metric system." },
        { q: "What is the difference between exclusive area and gross area in Korean apartments?", a: "Exclusive area (전용면적) is the actual livable space inside your unit. Gross area (공급면적) includes shared spaces like hallways, stairs, and lobbies. When Koreans say '33-pyeong apartment,' they usually mean the gross area, while the exclusive area is about 84㎡ (roughly 25 pyeong)." },
        { q: "What size apartment should I look for in Korea?", a: "For a single person, 15-24 pyeong (50-80㎡) is common. For a couple, 24-33 pyeong (80-109㎡) is typical. Families usually prefer 33-43 pyeong (109-142㎡) for 3-4 bedrooms." },
      ]} />
      <PyeongCalcEn />
    </PageLayout>
  );
}
