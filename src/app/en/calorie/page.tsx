import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CalorieCalcEn from "./CalorieCalcEn";

export const metadata: Metadata = {
  title: "Calorie Calculator - Daily TDEE & Weight Loss Plan",
  description: "How many calories should you eat? Enter age, height, weight — get TDEE + diet targets. Mifflin-St Jeor formula.",
  alternates: { canonical: "https://moduncalc.com/en/calorie" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Health" title="Calorie Calculator" description="Calculate your daily calorie needs and plan your diet.">
      <CalculatorJsonLd name="Calorie Calculator" description="Calculate daily calorie needs (TDEE) based on the Mifflin-St Jeor equation. Get targets for weight loss, maintenance, and gain." url="https://moduncalc.com/en/calorie" />
      <FaqJsonLd items={[
        { q: "What is TDEE?", a: "TDEE stands for Total Daily Energy Expenditure. It is the total number of calories your body burns in a day, including your Basal Metabolic Rate (BMR), physical activity, and the thermic effect of food. TDEE is calculated by multiplying your BMR by an activity factor." },
        { q: "How accurate is the Mifflin-St Jeor equation?", a: "The Mifflin-St Jeor equation is considered the most reliable formula for estimating BMR, with an accuracy of about +/-10%. It was developed in 1990 and is recommended by the Academy of Nutrition and Dietetics." },
        { q: "How many calories should I cut to lose weight?", a: "A safe and sustainable calorie deficit is 500 calories per day, which leads to approximately 0.45 kg (1 pound) of weight loss per week. Going below 1,200 calories (women) or 1,500 calories (men) is generally not recommended without medical supervision." },
      ]} />
      <CalorieCalcEn />
    </PageLayout>
  );
}
