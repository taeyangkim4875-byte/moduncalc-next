import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import EmergencyGuide from "./EmergencyGuide";

export const metadata: Metadata = {
  title: "Korea Emergency Numbers & Useful Contacts for Foreigners",
  description: "Emergency in Korea? Police 112, Ambulance 119, Immigration 1345. Tap to call. Hospitals, embassies & Korean phrases included.",
  alternates: { canonical: "https://moduncalc.com/en/emergency" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korea Emergency Contacts" description="Essential emergency numbers, hospital info, embassy contacts, and useful Korean phrases for urgent situations.">
      <CalculatorJsonLd name="Korea Emergency Contacts for Foreigners" description="Interactive reference of Korean emergency numbers, embassy contacts, hospital information, and emergency Korean phrases for foreigners." url="https://moduncalc.com/en/emergency" />
      <FaqJsonLd items={[
        { q: "What is the emergency number in Korea?", a: "The main emergency numbers in Korea are 112 for police (경찰) and 119 for fire and ambulance (소방/구급). Both services have English-speaking operators available. For non-emergency immigration questions, call 1345 (외국인종합안내센터). For medical consultation, call 1339." },
        { q: "Can I call an ambulance for free in Korea?", a: "Yes, calling 119 for an ambulance in Korea is completely free, including the ambulance ride to the hospital. However, hospital treatment costs will apply. If you have National Health Insurance (국민건강보험), emergency room visits are partially covered. Without insurance, ER visits can cost ₩100,000-500,000+ depending on treatment." },
        { q: "What should I do if I lose my ARC (Alien Registration Card) in Korea?", a: "If you lose your ARC (외국인등록증), report the loss at the nearest police station and get a loss report (분실신고). Then visit your local immigration office (출입국관리사무소) within 14 days with your passport, a passport photo, the police report, and ₩30,000 reissue fee. You can also report online via HiKorea (hikorea.go.kr)." },
      ]} />
      <EmergencyGuide />
    </PageLayout>
  );
}
