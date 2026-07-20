import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import GroceryCalcEn from "./GroceryCalcEn";

export const metadata: Metadata = {
  title: "Korea Grocery Price Guide - How Much Does Food Cost? (2026)",
  description: "How much does food cost in Korea? Real prices for fruits, meat, drinks & snacks. Build your weekly budget.",
  alternates: { canonical: "https://moduncalc.com/en/grocery" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Grocery Price Guide" description="Reference prices for common groceries and a monthly food budget calculator.">
      <CalculatorJsonLd name="Korea Grocery Price Guide" description="Reference prices for common groceries in Korea with budget calculator for foreigners." url="https://moduncalc.com/en/grocery" />
      <FaqJsonLd items={[
        { q: "How much does food cost in Korea per month?", a: "A single person can spend 300,000-600,000 won/month on groceries depending on diet. Cooking at home is much cheaper than eating out. Budget shoppers using traditional markets and Coupang can keep costs under 400,000 won." },
        { q: "Where is the cheapest place to buy groceries in Korea?", a: "Traditional markets (시장) are cheapest for fresh produce and meat. Coupang (쿠팡) offers competitive prices with free next-day delivery. E-Mart (이마트) and Homeplus (홈플러스) have regular sales. Convenience stores (편의점) are the most expensive option." },
        { q: "What Korean grocery terms should I know?", a: "Key terms: 할인 (discount), 1+1 (buy one get one), 국산 (domestic), 수입 (imported), 유기농 (organic), 냉동 (frozen), 신선 (fresh), 계산 (checkout). Most large supermarkets have English signage." },
      ]} />
      <GroceryCalcEn />
    </PageLayout>
  );
}
