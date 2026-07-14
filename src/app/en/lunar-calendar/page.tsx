import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import LunarCalendarEn from "./LunarCalendarEn";

export const metadata: Metadata = {
  title: "Korean Lunar Calendar 2026 - Important Dates & Holidays",
  description: "Find Korean lunar calendar dates for 2026. Seollal, Chuseok, and other traditional holidays. Convert lunar birthday to solar date.",
  alternates: { canonical: "https://moduncalc.com/en/lunar-calendar" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Daily" title="Korean Lunar Calendar 2026" description="Korean holidays, lunar dates, and D-day countdown.">
      <CalculatorJsonLd name="Korean Lunar Calendar 2026" description="Find Korean lunar calendar dates for 2026 including Seollal, Chuseok, and other traditional holidays." url="https://moduncalc.com/en/lunar-calendar" />
      <FaqJsonLd items={[
        { q: "When is Seollal (Korean New Year) in 2026?", a: "Seollal 2026 falls on February 17 (Tuesday). It is a 3-day holiday from February 16 to 18. Seollal is based on the lunar calendar and corresponds to the 1st day of the 1st lunar month." },
        { q: "When is Chuseok in 2026?", a: "Chuseok 2026 falls on October 4 (Sunday). The 3-day holiday runs from October 3 to 5. Since October 3 is also National Foundation Day (개천절), there may be a substitute holiday on October 6." },
        { q: "Why does Korea use the lunar calendar?", a: "Korea traditionally followed the Chinese lunisolar calendar for thousands of years. While the Gregorian (solar) calendar is used for daily life, many cultural events, birthdays, and traditional holidays still follow the lunar calendar. About 20-30% of older Koreans celebrate their birthday on the lunar date." },
      ]} />
      <LunarCalendarEn />
    </PageLayout>
  );
}
