import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DueDateCalcEn from "./DueDateCalcEn";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator - Week by Week Tracker",
  description: "When is your baby due? Enter last period date — see due date, current week & Korean prenatal checkup schedule.",
  alternates: { canonical: "https://moduncalc.com/en/due-date" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Health" title="Pregnancy Due Date Calculator" description="Find your due date and track your pregnancy week by week.">
      <CalculatorJsonLd name="Pregnancy Due Date Calculator" description="Calculate your estimated due date and current pregnancy week based on your last menstrual period. Includes Korean prenatal care information." url="https://moduncalc.com/en/due-date" />
      <FaqJsonLd items={[
        { q: "How is the due date calculated?", a: "The estimated due date is calculated using Naegele's rule: add 280 days (40 weeks) to the first day of your last menstrual period (LMP). This assumes a regular 28-day cycle. Only about 5% of babies are born exactly on their due date — most arrive within 2 weeks before or after." },
        { q: "Is prenatal care covered by Korean health insurance?", a: "Yes, Korea's National Health Insurance (국민건강보험) covers most prenatal care costs. Pregnant women receive a 'Goun Mom Card' (고운맘카드) with 1 million won for prenatal expenses. Ultrasounds, blood tests, and most checkups are covered. Delivery costs are also largely covered by NHI." },
        { q: "How do I find an English-speaking OB-GYN in Korea?", a: "Major hospitals in Seoul (Samsung Medical Center, Asan Medical Center, Severance Hospital) have international clinics with English-speaking staff. Search for '산부인과' (OB-GYN) on Naver Maps. Many clinics in Itaewon, Gangnam, and areas with expat communities have English-speaking doctors." },
      ]} />
      <DueDateCalcEn />
    </PageLayout>
  );
}
