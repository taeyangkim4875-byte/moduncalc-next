import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AlcoholCalcEn from "./AlcoholCalcEn";

export const metadata: Metadata = {
  title: "Blood Alcohol Calculator - When Can I Drive? (Korea BAC Limits)",
  description: "When can I drive after drinking in Korea? Enter what you drank \u2014 see BAC & safe driving time. Korea limit: 0.03%.",
  alternates: { canonical: "https://moduncalc.com/en/alcohol" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Daily" title="Blood Alcohol Calculator" description="Estimate your BAC and find out when you can safely drive in Korea.">
      <CalculatorJsonLd name="Blood Alcohol Calculator (Korea)" description="Calculate estimated BAC using the Widmark formula and find out when you can safely drive under Korea's strict DUI limits." url="https://moduncalc.com/en/alcohol" />
      <FaqJsonLd items={[
        { q: "What is the legal BAC limit for driving in Korea?", a: "Korea has one of the strictest DUI laws in the world. A BAC of 0.03% or above results in license suspension and fines. A BAC of 0.08% or above leads to license revocation, criminal charges, and possible imprisonment." },
        { q: "How long after drinking soju can I drive in Korea?", a: "It depends on how much you drank and your body weight. As a general rule, one bottle of soju (360ml, ~17% ABV) takes roughly 6-8 hours to fully metabolize for an average adult. Use this calculator for a personalized estimate." },
        { q: "What is a designated driver service (대리운전) in Korea?", a: "Daeri-unjeon (대리운전) is an affordable designated driver service unique to Korea. You call a service (via apps like Kakao T), and a driver comes to drive YOUR car home while you sit in the passenger seat. It typically costs 15,000-30,000 won depending on distance." },
      ]} />
      <AlcoholCalcEn />
    </PageLayout>
  );
}
