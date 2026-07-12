import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import RentCalcEn from "./RentCalcEn";

export const metadata: Metadata = {
  title: "Jeonse vs Wolse Calculator - Korean Rent Deposit Explained",
  description: "Convert between jeonse (key money deposit) and wolse (monthly rent) in Korea. Understand the unique Korean rental system and find the best option.",
  alternates: { canonical: "https://moduncalc.com/en/rent" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Housing in Korea" title="Jeonse vs Wolse Calculator" description="Convert between key money deposit and monthly rent.">
      <CalculatorJsonLd name="Jeonse vs Wolse Calculator" description="Convert between jeonse deposit and wolse monthly rent in Korea." url="https://moduncalc.com/en/rent" />
      <FaqJsonLd items={[
        { q: "What is jeonse?", a: "Jeonse is a unique Korean rental system where the tenant pays a large lump-sum deposit (typically 50-80% of the property value) instead of monthly rent. The deposit is returned in full when the lease ends." },
        { q: "What is wolse?", a: "Wolse is the standard monthly rent system, usually with a smaller deposit (보증금). You pay a deposit plus monthly rent." },
        { q: "Which is better for foreigners?", a: "Wolse (monthly rent) is usually more practical for foreigners since jeonse requires a very large deposit. However, if you have the capital, jeonse can save money long-term." },
      ]} />
      <RentCalcEn />
    </PageLayout>
  );
}
