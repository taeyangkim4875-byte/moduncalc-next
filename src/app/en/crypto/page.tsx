import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CryptoCalcEn from "./CryptoCalcEn";

export const metadata: Metadata = {
  title: "Crypto Profit Calculator - Bitcoin & Crypto Investment Returns",
  description: "How much did you make on crypto? Enter buy & sell price — see profit, fees & net return instantly.",
  alternates: { canonical: "https://moduncalc.com/en/crypto" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Finance" title="Crypto Profit Calculator" description="Calculate your cryptocurrency investment returns with fees included.">
      <CalculatorJsonLd name="Crypto Profit Calculator" description="Calculate your cryptocurrency investment returns. Enter buy price, current price, and quantity to see your profit or loss." url="https://moduncalc.com/en/crypto" />
      <FaqJsonLd items={[
        { q: "Is cryptocurrency taxed in Korea?", a: "Crypto taxation in Korea has been postponed multiple times. It was scheduled for 2027 but may be delayed further. When implemented, gains over 2.5 million KRW per year will be taxed at 22% (including local tax)." },
        { q: "What are the fees on Korean crypto exchanges?", a: "Upbit charges 0.05%, Bithumb 0.04% (as low as 0.01% with coupons), Coinone 0.2%, and Binance 0.1%. Fees vary by exchange and payment method." },
        { q: "How is the return calculated?", a: "Return = (Current Price - Buy Price) / Buy Price x 100. Net profit deducts both buy and sell transaction fees from the gross profit." },
      ]} />
      <CryptoCalcEn />
    </PageLayout>
  );
}
