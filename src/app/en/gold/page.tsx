import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import GoldCalcEn from "./GoldCalcEn";

export const metadata: Metadata = {
  title: "Gold Price Calculator - Grams, Ounces & Korean Don (돈)",
  description: "Convert gold weight to value. Supports grams, ounces, and Korean don (돈 = 3.75g). Great for shopping in Korea's gold markets.",
  alternates: { canonical: "https://moduncalc.com/en/gold" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Daily" title="Gold Price Calculator" description="Convert gold weight to value in grams, ounces, and Korean don.">
      <CalculatorJsonLd name="Gold Price Calculator" description="Convert gold weight to value. Supports grams, ounces, and Korean don (돈 = 3.75g)." url="https://moduncalc.com/en/gold" />
      <FaqJsonLd items={[
        { q: "How much does 1 don (돈) of gold weigh?", a: "1 don (돈) equals 3.75 grams. This is the traditional Korean unit for gold. 1 nyang (냥) = 10 don = 37.5 grams." },
        { q: "Where can I buy gold in Korea?", a: "You can buy gold at Jongno gold shops (종로 금은방) in Seoul, KRX Gold Market (Korea Exchange), banks offering gold banking, or online through platforms like Upbit Gold." },
        { q: "Is there tax on gold purchases in Korea?", a: "Physical gold (gold bars) purchases in Korea include 10% VAT. However, trading through KRX Gold Market is VAT-exempt and capital gains tax-free, making it more tax-efficient." },
      ]} />
      <GoldCalcEn />
    </PageLayout>
  );
}
