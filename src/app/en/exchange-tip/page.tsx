import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import ExchangeTipCalc from "./ExchangeTipCalc";

export const metadata: Metadata = {
  title: "Korea Won Exchange Tips - Best Ways to Exchange Currency (2026)",
  description: "Best places to exchange money in Korea? Compare bank, airport, Myeongdong, ATM & card rates. Save up to 5% on exchange.",
  alternates: { canonical: "https://moduncalc.com/en/exchange-tip" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korea Currency Exchange Tips" description="Compare exchange methods side-by-side — see how much you lose at the airport vs. Myeongdong money changers, banks, ATMs & cards.">
      <CalculatorJsonLd name="Korea Currency Exchange Comparison" description="Compare exchange rates across different methods in Korea: banks, airport, Myeongdong money changers, ATMs, and card payments." url="https://moduncalc.com/en/exchange-tip" />
      <FaqJsonLd items={[
        { q: "Where is the best place to exchange money in Korea?", a: "The best rates are at Myeongdong money changers (명동 환전소), located near exits 5-6 of Myeongdong Station on Line 4. They typically offer rates within 0.5-1% of the mid-market rate, much better than banks (1-2% spread) or the airport (3-5% spread). For digital transfers, Wise (와이즈) offers near mid-market rates with transparent fees of about 0.3-0.5%." },
        { q: "Can I use foreign credit cards in Korea?", a: "Yes, Visa and Mastercard are widely accepted at most stores, restaurants, and convenience stores in Korea. Always choose to pay in Korean Won (KRW) when prompted — never accept Dynamic Currency Conversion (DCC) which adds 3-5% extra. Some smaller traditional markets and street food vendors may only accept cash or Korean cards (카카오페이, 토스페이). AMEX and Discover have limited acceptance." },
        { q: "How do I withdraw Korean Won from an ATM with a foreign card?", a: "Use Global ATMs at 7-Eleven (세븐일레븐) or CU convenience stores — they are available 24/7 and accept Visa, Mastercard, Cirrus, Plus, and UnionPay. The ATM fee is ₩3,000-5,000 per transaction, plus your home bank may charge a foreign ATM fee (typically $2-5). Withdraw larger amounts less frequently to minimize per-transaction fees. Maximum withdrawal is usually ₩1,000,000 per transaction." },
      ]} />
      <ExchangeTipCalc />
    </PageLayout>
  );
}
