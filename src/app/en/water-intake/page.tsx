import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import WaterIntakeEn from "./WaterIntakeEn";

export const metadata: Metadata = {
  title: "Daily Water Intake Calculator - How Much Water Should You Drink?",
  description: "How much water should you drink daily? Enter weight & activity level — get personalized recommendation in cups.",
  alternates: { canonical: "https://moduncalc.com/en/water-intake" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Health" title="Daily Water Intake Calculator" description="Calculate your recommended daily water intake based on weight and activity level.">
      <CalculatorJsonLd name="Daily Water Intake Calculator" description="Calculate your recommended daily water intake based on weight and activity level." url="https://moduncalc.com/en/water-intake" />
      <FaqJsonLd items={[
        { q: "How much water should I drink per day?", a: "A general guideline is 30ml per kg of body weight. For example, a 70kg person should drink about 2,100ml (roughly 8-9 cups). Activity level and climate also affect your needs." },
        { q: "Does coffee count as water intake?", a: "Yes, coffee and tea do count toward your daily water intake. While caffeine has a mild diuretic effect, most of the liquid is still absorbed. However, pure water should still be your primary source." },
        { q: "Can you drink too much water?", a: "Extremely excessive water intake can cause hyponatremia (water intoxication). For healthy adults, up to 3-4 liters per day is generally safe. If exercising heavily, replenish electrolytes too." },
      ]} />
      <WaterIntakeEn />
    </PageLayout>
  );
}
