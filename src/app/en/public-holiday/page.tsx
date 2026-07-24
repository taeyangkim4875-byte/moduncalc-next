import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PublicHolidayCalc from "./PublicHolidayCalc";

export const metadata: Metadata = {
  title: "Korea Public Holidays 2026 - Complete Calendar for Foreigners",
  description: "All 15 Korean public holidays in 2026 with dates, meanings & what's open/closed. Plan your vacation days.",
  alternates: { canonical: "https://moduncalc.com/en/public-holiday" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korea Public Holidays 2026" description="Complete guide to all Korean public holidays — dates, meanings, what's open or closed, and how to plan your vacation days.">
      <CalculatorJsonLd name="Korea Public Holiday Calendar 2026" description="Interactive calendar of all Korean public holidays in 2026 with D-day countdown, meanings, and what's open or closed for foreigners." url="https://moduncalc.com/en/public-holiday" />
      <FaqJsonLd items={[
        { q: "How many public holidays does Korea have in 2026?", a: "Korea has 15 official public holidays (공휴일) in 2026, including multi-day holidays like Seollal (Lunar New Year, 3 days) and Chuseok (Korean Thanksgiving, 3 days). When holidays fall on weekends, substitute holidays (대체공휴일) are given on the next weekday, so you may get additional days off. All public holidays are paid days off under the Labor Standards Act for employees at companies with 5 or more workers." },
        { q: "What is closed during Seollal and Chuseok in Korea?", a: "During Seollal (설날, Lunar New Year) and Chuseok (추석, Korean Thanksgiving), many restaurants, shops, markets, and small businesses close for 3 days as Koreans travel to their hometowns. Tourist areas, convenience stores (GS25, CU, 7-Eleven), and some franchise restaurants remain open. Public transportation runs on a reduced holiday schedule. Highways become extremely congested — sometimes 6-8 hours for a normally 3-hour trip." },
        { q: "Do foreigners get public holidays off in Korea?", a: "Yes, under the Korean Labor Standards Act (근로기준법), all employees — including foreign workers — are entitled to paid public holidays off at companies with 5 or more employees. If you must work on a public holiday, your employer should pay holiday premium pay (휴일 근로수당) at 150% of your regular hourly wage. This applies to all visa types including E-2 English teachers and E-7 professionals." },
      ]} />
      <PublicHolidayCalc />
    </PageLayout>
  );
}
