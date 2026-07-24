import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import TaxCalendarCalc from "./TaxCalendarCalc";

export const metadata: Metadata = {
  title: "Korea Tax Calendar 2026 - Important Deadlines for Foreigners",
  description: "Never miss a tax deadline in Korea. Monthly calendar of tax filing dates, insurance payments, and financial deadlines for 2026.",
  alternates: { canonical: "https://moduncalc.com/en/tax-calendar" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korea Tax Calendar 2026" description="Monthly overview of tax deadlines, filing dates, and financial planning milestones for foreigners living in Korea.">
      <CalculatorJsonLd name="Korea Tax Calendar 2026" description="Interactive calendar of Korean tax deadlines for 2026, with D-day countdown and filing guides for foreigners." url="https://moduncalc.com/en/tax-calendar" />
      <FaqJsonLd items={[
        { q: "When do I file income tax in Korea as a foreigner?", a: "Foreigners with employment income in Korea file through year-end settlement (연말정산) in January-February, handled by their employer. If you have additional income (freelance, rental, overseas), you must file Comprehensive Income Tax (종합소득세) yourself during May 1-31 through Hometax (홈택스). Late filing incurs penalties of 10-40% of unpaid tax." },
        { q: "How do I use Hometax (홈택스) in English?", a: "Visit hometax.go.kr and click the English option in the top-right corner. You will need a public certificate (공동인증서) or simple authentication via your Korean bank app. The English interface covers basic tax filing and certificate issuance. For complex filings, visit your local tax office (세무서) where English assistance may be available, or hire a tax accountant (세무사)." },
        { q: "Do foreigners pay property tax in Korea?", a: "Yes, if you own property in Korea, you must pay property tax (재산세) in two installments: June and September. The tax is based on the government-assessed value (공시가격) of the property. Additionally, if your total property value exceeds certain thresholds, you may owe Comprehensive Real Estate Tax (종합부동산세) in December." },
      ]} />
      <TaxCalendarCalc />
    </PageLayout>
  );
}
