import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DateConverter from "./DateConverter";

export const metadata: Metadata = {
  title: "Korean Date Format Converter - YYYY년 MM월 DD일 Explained",
  description: "What's today's date in Korean? Convert date formats + see 2026 Korean holidays. Useful for visa & contracts.",
  alternates: { canonical: "https://moduncalc.com/en/date-converter" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korean Date Converter" description="Convert dates between Korean and international formats.">
      <CalculatorJsonLd name="Korean Date Format Converter" description="Convert between Korean and international date formats with holiday calendar." url="https://moduncalc.com/en/date-converter" />
      <FaqJsonLd items={[
        { q: "How do Koreans write dates?", a: "Korea uses the format YYYY년 MM월 DD일 (Year-Month-Day), e.g., 2026년 7월 14일. This is the same order as ISO 8601 (YYYY-MM-DD). Days of the week are: 월(Mon), 화(Tue), 수(Wed), 목(Thu), 금(Fri), 토(Sat), 일(Sun)." },
        { q: "What is the Korean lunar calendar?", a: "Korea traditionally uses a lunisolar calendar (음력) alongside the solar calendar (양력). Some holidays like 설날 (Lunar New Year) and 추석 (Harvest Festival) follow the lunar calendar, so their dates change every year on the solar calendar." },
        { q: "What are the most important Korean holidays for foreigners to know?", a: "Key holidays: 설날 (Lunar New Year, Jan/Feb), 삼일절 (March 1st, Independence Movement Day), 어린이날 (May 5, Children's Day), 추석 (Sep/Oct, Korean Thanksgiving), 한글날 (Oct 9, Hangul Day), and 크리스마스 (Dec 25). Banks, offices, and many shops close on these days." },
      ]} />
      <DateConverter />
    </PageLayout>
  );
}
