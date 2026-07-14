import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SleepCalcEn from "./SleepCalcEn";

export const metadata: Metadata = {
  title: "Sleep Calculator - Best Time to Sleep & Wake Up (90-min Cycles)",
  description: "Find your optimal bedtime and wake-up time based on 90-minute sleep cycles. Wake up refreshed, not groggy.",
  alternates: { canonical: "https://moduncalc.com/en/sleep" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Health" title="Sleep Calculator" description="Find your optimal bedtime and wake-up time based on 90-minute sleep cycles.">
      <CalculatorJsonLd name="Sleep Calculator" description="Find your optimal bedtime and wake-up time based on 90-minute sleep cycles. Wake up refreshed, not groggy." url="https://moduncalc.com/en/sleep" />
      <FaqJsonLd items={[
        { q: "What is a sleep cycle?", a: "A sleep cycle is approximately 90 minutes of alternating NREM (non-rapid eye movement) and REM (rapid eye movement) sleep. You go through 4-6 cycles per night. Waking at the end of a cycle feels more refreshing." },
        { q: "How many hours of sleep do adults need?", a: "The National Sleep Foundation recommends 7-9 hours for adults (18-64). In terms of sleep cycles, 5 cycles (7.5 hours) is often considered ideal." },
        { q: "Why does the calculator account for falling asleep time?", a: "It typically takes 10-20 minutes to fall asleep after getting into bed. Without factoring this in, your sleep cycle timing would be off, causing you to wake during deep sleep and feel groggy." },
      ]} />
      <SleepCalcEn />
    </PageLayout>
  );
}
