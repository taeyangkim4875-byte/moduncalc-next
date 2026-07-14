import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SizeConverter from "./SizeConverter";

export const metadata: Metadata = {
  title: "Korean Size Converter - Clothing & Shoe Size Chart (US/UK/EU to Korean)",
  description: "Convert US, UK, and EU clothing and shoe sizes to Korean sizes. Includes men's, women's, and kids' size charts.",
  alternates: { canonical: "https://moduncalc.com/en/size-converter" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Shopping" title="Korean Size Converter" description="Convert US, UK, and EU sizes to Korean clothing and shoe sizes.">
      <CalculatorJsonLd name="Korean Size Converter" description="Convert US, UK, and EU clothing and shoe sizes to Korean sizes." url="https://moduncalc.com/en/size-converter" />
      <FaqJsonLd items={[
        { q: "What size am I in Korean clothing?", a: "Korean clothing uses number-based sizes: 44 (XS), 55 (S), 66 (M), 77 (L), 88 (XL). Generally, size up 1-2 sizes from your US/EU size as Korean sizes run smaller." },
        { q: "How do Korean shoe sizes work?", a: "Korean shoe sizes are measured in millimeters (mm). For example, US Men's 9 is Korean 275mm, and US Women's 7 is Korean 240mm. You can measure your foot length in mm for the most accurate conversion." },
        { q: "What does 'Free Size' mean in Korea?", a: "Free Size (프리 사이즈) is a one-size-fits-all label common in Korean fashion. It typically fits smaller body types, roughly equivalent to US Women's sizes 0-6 or XS-S." },
      ]} />
      <SizeConverter />
    </PageLayout>
  );
}
