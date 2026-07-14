import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CharCountEn from "./CharCountEn";

export const metadata: Metadata = {
  title: "Character Counter - Word Count, Byte, Sentence Counter",
  description: "Count characters, words, sentences, and bytes in real-time. Check limits for Twitter, Instagram, YouTube, and more.",
  alternates: { canonical: "https://moduncalc.com/en/character-counter" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Tools" title="Character Counter" description="Count characters, words, sentences, and bytes in real-time.">
      <CalculatorJsonLd name="Character Counter" description="Count characters, words, sentences, and bytes. Check platform limits for social media." url="https://moduncalc.com/en/character-counter" />
      <FaqJsonLd items={[
        { q: "How are bytes calculated?", a: "Bytes are calculated using UTF-8 encoding. English letters use 1 byte each, while Korean characters (한글) use 3 bytes each. This matters for systems with byte-based limits." },
        { q: "What is the Twitter/X character limit?", a: "Twitter (now X) allows up to 280 characters per tweet for free accounts. This includes all characters, spaces, and emojis. URLs are shortened to 23 characters." },
        { q: "How is reading time estimated?", a: "Reading time is estimated at approximately 200 words per minute for English text, which is the average adult reading speed." },
      ]} />
      <CharCountEn />
    </PageLayout>
  );
}
