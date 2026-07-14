import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AirFryerCalcEn from "./AirFryerCalcEn";

export const metadata: Metadata = {
  title: "Air Fryer Converter - Oven to Air Fryer Time & Temperature",
  description: "Convert oven recipes to air fryer settings. Reduce temperature by 15°C and time by 20%. Includes popular Korean dish conversions.",
  alternates: { canonical: "https://moduncalc.com/en/air-fryer" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Daily" title="Air Fryer Converter" description="Convert oven recipes to air fryer time and temperature instantly.">
      <CalculatorJsonLd name="Air Fryer Converter" description="Convert oven recipes to air fryer settings. Reduce temperature by 15 degrees and time by 20%. Includes Korean dish presets." url="https://moduncalc.com/en/air-fryer" />
      <FaqJsonLd items={[
        { q: "How do I convert oven temperature to air fryer?", a: "Reduce the oven temperature by about 15°C (25°F) and the cooking time by 20%. For example, if a recipe calls for 200°C for 25 minutes in a conventional oven, set your air fryer to 185°C for 20 minutes." },
        { q: "Can I cook Korean fried chicken (치킨) in an air fryer?", a: "Yes! Air fryer Korean fried chicken is very popular. Set it to 185°C for about 20-25 minutes, flipping halfway. For extra crispiness, spray a light coat of oil and increase temperature to 200°C for the last 3-5 minutes." },
        { q: "Do I need to preheat an air fryer?", a: "Most air fryers benefit from 2-3 minutes of preheating, especially for foods that need a crispy exterior. However, for frozen foods or longer cooking times, preheating is less critical. Always check your specific model's instructions." },
      ]} />
      <AirFryerCalcEn />
    </PageLayout>
  );
}
