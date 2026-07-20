import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SubwayCalc from "./SubwayCalc";

export const metadata: Metadata = {
  title: "Seoul Subway Fare Calculator - Metro Cost & Travel Time",
  description: "Seoul subway fare: how much? Base ₩1,250 with T-money. Calculate cost by distance and number of transfers.",
  alternates: { canonical: "https://moduncalc.com/en/subway" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Travel" title="Seoul Subway Fare Calculator" description="Calculate Seoul metro fares, travel time, and station info.">
      <CalculatorJsonLd name="Seoul Subway Fare Calculator" description="Calculate Seoul subway fares, travel time, and transfer info for tourists." url="https://moduncalc.com/en/subway" />
      <FaqJsonLd items={[
        { q: "How much does the Seoul subway cost?", a: "The base fare is 1,250 KRW (about $1 USD) with a T-money card, or 1,350 KRW with a single-use ticket. This covers the first 10 km, with small surcharges for longer distances." },
        { q: "What is a T-money card and where can I buy one?", a: "T-money is a rechargeable transit card that works on all Seoul buses and subways. You can buy one at any convenience store (GS25, CU, 7-Eleven) for 2,500 KRW and recharge it with cash at machines in stations." },
        { q: "Can I transfer between subway and bus for free?", a: "Yes, with a T-money card, transfers between subway and bus are free within 30 minutes of tapping off. You can transfer up to 4 times on a single fare." },
      ]} />
      <SubwayCalc />
    </PageLayout>
  );
}
