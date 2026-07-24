import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PhoneCostCalc from "./PhoneCostCalc";

export const metadata: Metadata = {
  title: "Korea Phone Plan Calculator - Compare Mobile Costs (2026)",
  description: "Cheapest phone plan in Korea? Compare SKT, KT, LG U+ vs MVNOs from ₩25,000/month. Find the best deal for foreigners.",
  alternates: { canonical: "https://moduncalc.com/en/phone-cost" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Phone Plan Calculator" description="Compare Korean mobile plans and find the best option for your usage.">
      <CalculatorJsonLd name="Korea Phone Plan Calculator" description="Compare mobile phone plans from SKT, KT, LG U+ and MVNO carriers in Korea. Find the cheapest plan for your data usage." url="https://moduncalc.com/en/phone-cost" />
      <FaqJsonLd items={[
        { q: "Can foreigners get a phone plan in Korea?", a: "Yes, but you need an ARC (Alien Registration Card / 외국인등록증) for a regular contract. Without an ARC, you can use prepaid SIM cards or eSIMs available at the airport. Major carriers (SKT, KT, LG U+) and MVNOs (알뜰폰) all accept foreign residents with ARC." },
        { q: "What is the cheapest phone plan in Korea?", a: "MVNOs (알뜰폰) offer the cheapest plans, starting from around ₩25,000~33,000/month for unlimited data. Major carriers like SKT, KT, and LG U+ cost ₩49,000~75,000/month. MVNOs use the same networks as major carriers but at lower prices." },
        { q: "Should I get a Korean SIM card at the airport?", a: "Airport SIM cards and eSIMs are convenient for short-term visitors. Providers like KT Roaming and SK Telecom offer tourist SIMs at Incheon Airport for about ₩30,000~55,000 for 5-30 days. For stays longer than a month, getting a regular plan with ARC is much cheaper." },
      ]} />
      <PhoneCostCalc />
    </PageLayout>
  );
}
