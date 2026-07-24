import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import HospitalCostCalc from "./HospitalCostCalc";

export const metadata: Metadata = {
  title: "Korea Hospital Cost Guide - Medical Expenses for Foreigners",
  description: "Doctor visit in Korea: how much? See exact costs with vs without insurance. Clinic ₩5,000, ER ₩20,000+. NHI copay rates explained.",
  alternates: { canonical: "https://moduncalc.com/en/hospital" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Hospital Cost Guide" description="Look up medical costs in Korea with and without National Health Insurance (NHI).">
      <CalculatorJsonLd name="Korea Hospital Cost Guide" description="Interactive reference guide for medical costs in Korea. Compare prices with and without National Health Insurance for clinics, hospitals, dental, emergency, and pharmacy." url="https://moduncalc.com/en/hospital" />
      <FaqJsonLd items={[
        { q: "How much does a doctor visit cost in Korea?", a: "With National Health Insurance (NHI / 국민건강보험), a general clinic visit costs about ₩5,000~15,000 (you pay 30% copay). Without insurance, the same visit costs ₩15,000~50,000. Korea's healthcare is very affordable compared to most Western countries." },
        { q: "Do foreigners get health insurance in Korea?", a: "Yes, foreigners staying 6+ months are required to enroll in NHI (국민건강보험). If employed, your employer handles enrollment and splits the premium 50/50. Self-employed or students pay the full premium themselves (~₩130,000/month in 2026). Coverage starts from enrollment date." },
        { q: "What should I bring to a Korean hospital?", a: "Bring your ARC (외국인등록증 / Alien Registration Card), health insurance card (건강보험증), and any previous medical records. At the reception (접수), you'll fill out a form with basic info. Some hospitals accept walk-ins, but large hospitals usually require appointments through their app or phone." },
      ]} />
      <HospitalCostCalc />
    </PageLayout>
  );
}
