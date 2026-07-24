import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import KoreanPhrasesGuide from "./KoreanPhrasesGuide";

export const metadata: Metadata = {
  title: "Essential Korean Phrases for Foreigners - Daily Life Survival Guide",
  description: "50 must-know Korean phrases for daily life: greetings, shopping, restaurant, hospital, taxi, and emergency situations.",
  alternates: { canonical: "https://moduncalc.com/en/korean-phrases" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Essential Korean Phrases" description="50+ must-know Korean phrases organized by situation. Master daily life conversations with pronunciation guides.">
      <CalculatorJsonLd name="Essential Korean Phrases Guide" description="Interactive Korean phrase reference with 50+ essential phrases for daily life, organized by category with romanization and pronunciation tips." url="https://moduncalc.com/en/korean-phrases" />
      <FaqJsonLd items={[
        { q: "What are the most important Korean phrases to learn first?", a: "Start with these 5 essential phrases: 안녕하세요 (annyeonghaseyo - Hello), 감사합니다 (gamsahamnida - Thank you), 죄송합니다 (joesonghamnida - Sorry), 얼마예요? (eolmayeyo - How much?), and 이거 주세요 (igeo juseyo - This one please). These will cover 80% of basic daily interactions in Korea." },
        { q: "Do I need to speak Korean to live in Korea?", a: "You can survive in major cities like Seoul without Korean, as many signs and services offer English. However, knowing basic Korean phrases makes daily life significantly easier, especially for ordering food, taking taxis, shopping at local markets, and handling administrative tasks. Apps like Papago (Korean Naver's translator) help bridge the gap." },
        { q: "What is the difference between formal and informal Korean?", a: "Korean has different speech levels based on formality. 합쇼체 (formal polite, ending in -ㅂ니다) is used in business, news, and with strangers. 해요체 (informal polite, ending in -요) is the most common in daily conversation and is safe to use in most situations. 반말 (casual speech, no -요 ending) is only for close friends of similar age or younger people. As a foreigner, always use 해요체 (informal polite) to be safe." },
      ]} />
      <KoreanPhrasesGuide />
    </PageLayout>
  );
}
