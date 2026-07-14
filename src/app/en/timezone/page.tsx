import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import TimezoneCalc from "./TimezoneCalc";

export const metadata: Metadata = {
  title: "Korea Time Zone Converter (KST) - What Time Is It in Korea?",
  description: "Convert Korea Standard Time (KST/UTC+9) to your time zone. See current time in Seoul and major world cities.",
  alternates: { canonical: "https://moduncalc.com/en/timezone" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Travel" title="Korea Time Zone Converter (KST)" description="Convert Korea Standard Time to your time zone and see current time in Seoul.">
      <CalculatorJsonLd name="Korea Time Zone Converter" description="Convert Korea Standard Time (KST/UTC+9) to your time zone with live clock." url="https://moduncalc.com/en/timezone" />
      <FaqJsonLd items={[
        { q: "What time zone is Korea in?", a: "South Korea uses Korea Standard Time (KST), which is UTC+9. It is 9 hours ahead of Greenwich Mean Time (GMT). Korea does not observe daylight saving time." },
        { q: "Does Korea have daylight saving time?", a: "No, South Korea does not observe daylight saving time (DST). The time remains UTC+9 year-round. This means the time difference with DST-observing countries changes twice a year." },
        { q: "What is the time difference between Korea and the US?", a: "Korea is 14 hours ahead of US Eastern Time and 17 hours ahead of US Pacific Time during standard time. During US daylight saving time, the difference is 13 hours (ET) and 16 hours (PT)." },
      ]} />
      <TimezoneCalc />
    </PageLayout>
  );
}
