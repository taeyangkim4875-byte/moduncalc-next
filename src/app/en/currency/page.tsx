import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CurrencyCalc from "./CurrencyCalc";

export const metadata: Metadata = {
  title: "KRW Currency Converter - Korean Won Exchange Rate Calculator",
  description: "Convert Korean Won (KRW) to USD, EUR, JPY, GBP, CNY, and more. Enter an amount and see the converted value instantly.",
  alternates: { canonical: "https://moduncalc.com/en/currency" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Finance" title="Currency Converter" description="Convert Korean Won to and from major currencies.">
      <CalculatorJsonLd name="KRW Currency Converter" description="Convert Korean Won to USD, EUR, JPY, GBP, and other currencies." url="https://moduncalc.com/en/currency" />
      <FaqJsonLd items={[
        { q: "Where can I exchange currency in Korea?", a: "Banks, airport kiosks, and licensed money changers in Myeongdong/Itaewon offer exchanges. Money changers in tourist areas usually offer better rates than banks or airports." },
        { q: "Should I exchange at the airport?", a: "Airport rates are typically 2-5% worse than city rates. Exchange a small amount at the airport and the rest at a money changer in the city for better rates." },
      ]} />
      <CurrencyCalc />
    </PageLayout>
  );
}
