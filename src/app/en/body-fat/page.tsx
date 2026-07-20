import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import BodyFatCalcEn from "./BodyFatCalcEn";

export const metadata: Metadata = {
  title: "Body Fat Calculator - US Navy Formula (Free & Accurate)",
  description: "What's your body fat %? Just measure waist & neck — US Navy formula. More accurate than BMI alone.",
  alternates: { canonical: "https://moduncalc.com/en/body-fat" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Health" title="Body Fat Calculator" description="Estimate your body fat percentage using the US Navy formula.">
      <CalculatorJsonLd name="Body Fat Calculator" description="Calculate body fat percentage using the US Navy method with height, waist, and neck measurements." url="https://moduncalc.com/en/body-fat" />
      <FaqJsonLd items={[
        { q: "How accurate is the US Navy body fat formula?", a: "The US Navy method is accurate within 1-3% for most people when measurements are taken correctly. It is more reliable than BMI alone because it accounts for body composition rather than just weight and height." },
        { q: "What is a healthy body fat percentage?", a: "For men, 10-20% is considered healthy (athletes: 6-13%). For women, 18-28% is healthy (athletes: 14-20%). Essential fat is about 2-5% for men and 10-13% for women." },
        { q: "Why is body fat percentage better than BMI?", a: "BMI only considers weight and height, so muscular people can be classified as overweight. Body fat percentage directly measures how much of your body is fat vs lean mass, giving a more accurate picture of health." },
      ]} />
      <BodyFatCalcEn />
    </PageLayout>
  );
}
