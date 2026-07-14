import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import RandomPickerEn from "./RandomPickerEn";

export const metadata: Metadata = {
  title: "Random Number Generator - Lottery, Picker & Shuffler",
  description: "Generate random numbers, pick lottery numbers, or shuffle a list randomly. Fair and transparent randomization.",
  alternates: { canonical: "https://moduncalc.com/en/random" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Tools" title="Random Generator" description="Generate random numbers, pick lottery numbers, or shuffle a list.">
      <CalculatorJsonLd name="Random Number Generator" description="Generate random numbers, pick lottery numbers (including Korean Lotto 6/45), or shuffle a list randomly." url="https://moduncalc.com/en/random" />
      <FaqJsonLd items={[
        { q: "Is this random generator truly random?", a: "This tool uses the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure pseudo-random numbers. It is suitable for fair draws, lotteries, and any application requiring unbiased randomness." },
        { q: "What is Korean Lotto (로또 6/45)?", a: "Korean Lotto 6/45 is South Korea's national lottery. Players pick 6 numbers from 1 to 45. Drawings are held every Saturday at 8:45 PM KST. The jackpot often exceeds several billion won. It has been running since 2002." },
        { q: "Can I use this for giveaways and drawings?", a: "Yes. The cryptographically secure random generation ensures fair and unbiased results. For official contests, consider documenting the process with screen recordings for transparency." },
      ]} />
      <RandomPickerEn />
    </PageLayout>
  );
}
