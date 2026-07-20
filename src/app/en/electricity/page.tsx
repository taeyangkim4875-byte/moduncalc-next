import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import ElectricCalcEn from "./ElectricCalcEn";

export const metadata: Metadata = {
  title: "Korea Electricity Bill Calculator - Understand Your 전기요금 (2026)",
  description: "Why is my Korean electricity bill so high? Calculate your bill with progressive tiers. Summer discount explained.",
  alternates: { canonical: "https://moduncalc.com/en/electricity" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Electricity Bill Calculator" description="Calculate your Korean electricity bill with progressive tier pricing.">
      <CalculatorJsonLd name="Korea Electricity Bill Calculator" description="Calculate Korean electricity bills with progressive tier system for foreigners." url="https://moduncalc.com/en/electricity" />
      <FaqJsonLd items={[
        { q: "Why is my summer electricity bill so high in Korea?", a: "Korea uses a progressive tier system where higher usage costs dramatically more per kWh. In summer, air conditioning can push you into the highest tier (401+ kWh), where the rate jumps to 307.3/kWh plus a much higher base fee of 7,300. Summer tiers are slightly wider but AC usage often exceeds them." },
        { q: "How do I read my Korean electricity bill?", a: "Your bill (전기요금 고지서) shows: usage period, kWh consumed, base fee (기본요금), energy charge (전력량요금), VAT (부가세 10%), and the electricity industry fund (전력산업기반기금 3.7%). You can also check via the 한전 (KEPCO) app." },
        { q: "How can I save on electricity in Korea?", a: "Use inverter AC units, set AC to 26-28C, use fans alongside AC, unplug devices when not in use, and try to stay under 200kWh/month. The jump from tier 1 to tier 3 nearly triples your per-kWh rate." },
      ]} />
      <ElectricCalcEn />
    </PageLayout>
  );
}
