import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import InternetSpeedCalc from "./InternetSpeedCalc";

export const metadata: Metadata = {
  title: "Korea Internet Plans & Speed Guide for Foreigners",
  description: "Best internet plan in Korea? Compare KT, SK, LG U+ prices side by side. Home internet + mobile data plans.",
  alternates: { canonical: "https://moduncalc.com/en/internet-speed" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Internet & Mobile Plans" description="Compare Korean internet providers, plans, and monthly costs.">
      <CalculatorJsonLd name="Korea Internet Plans Guide" description="Compare Korean internet providers and mobile data plans for foreigners." url="https://moduncalc.com/en/internet-speed" />
      <FaqJsonLd items={[
        { q: "How fast is internet in Korea?", a: "Korea has some of the fastest internet in the world. Home internet plans offer 100Mbps to 10Gbps speeds. Average download speed is over 200Mbps. 5G mobile coverage is widespread in cities with speeds of 500Mbps-1Gbps." },
        { q: "Can foreigners sign up for internet in Korea?", a: "Yes, but you need an ARC (Alien Registration Card / 외국인등록증). Most providers require a 3-year contract for the best rates. Some providers offer foreigner-friendly plans with shorter contracts. You can also use prepaid SIM cards without an ARC." },
        { q: "What is the cheapest internet option in Korea?", a: "For home internet, MVNO (알뜰폰) resellers offer plans from 15,000-20,000 won/month. For mobile, MVNOs like Mint Mobile Korea or Hello Mobile offer unlimited data from 20,000-35,000 won/month. Major carriers start around 50,000 won/month for unlimited." },
      ]} />
      <InternetSpeedCalc />
    </PageLayout>
  );
}
