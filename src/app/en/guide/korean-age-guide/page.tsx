import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korean Age System Explained - Why Koreans Are 'Older' Than You Think",
  description:
    "Everything about the Korean age system: how it works, why it changed in 2023, and when each system is still used.",
  alternates: { canonical: "https://moduncalc.com/en/guide/korean-age-guide" },
  openGraph: {
    title: "Korean Age System Explained - Why Koreans Are 'Older' Than You Think",
    description:
      "Everything about the Korean age system: how it works, why it changed in 2023, and when each system is still used.",
    url: "https://moduncalc.com/en/guide/korean-age-guide",
  },
};

const faqItems = [
  {
    q: "Does Korea still use Korean age?",
    a: "Officially, no. Since June 28, 2023, Korea unified all legal and administrative age calculations to the international age system (만 나이). However, many Koreans still use Korean age in everyday conversation, especially when introducing themselves or asking someone's age casually. It remains deeply embedded in the culture even though it is no longer used for any legal or official purpose.",
  },
  {
    q: "How do I calculate my Korean age?",
    a: "To calculate your Korean age, take the current year and subtract your birth year, then add 1. For example, if you were born in 1995 and the current year is 2026, your Korean age is 2026 - 1995 + 1 = 32. In the Korean age system, your birthday does not matter -- everyone born in the same year is the same Korean age, and everyone ages up together on January 1st.",
  },
  {
    q: "Why did Korea change to international age?",
    a: "Korea changed to international age to reduce confusion in administrative, legal, and medical contexts. Having three different age systems caused practical problems: for example, a child might be considered old enough for school enrollment under one system but not another. The law, passed in December 2022 and effective from June 2023, aimed to standardize age calculations across all public and private sectors to align with international norms.",
  },
];

export default function KoreanAgeGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korean Age System Explained"
      description="Why Koreans are 'older' than you think: the three Korean age systems, the 2023 law change, and when each system is still used in practice."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Korean Age System Explained - Why Koreans Are 'Older' Than You Think",
            description:
              "Everything about the Korean age system: how it works, why it changed in 2023, and when each system is still used.",
            datePublished: "2026-01-01",
            dateModified: "2026-07-12",
            author: {
              "@type": "Organization",
              name: "ModunCalc",
              url: "https://moduncalc.com",
            },
          }),
        }}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">Three Age Systems in Korea</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea is unique in the world for having historically used <b>three different age-counting systems</b> simultaneously. Understanding all three is essential for navigating Korean culture, even after the 2023 reform:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">System</th>
                <th className="text-left p-2 font-bold">Korean Name</th>
                <th className="text-left p-2 font-bold">How It Works</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">International Age</td>
                <td className="p-2">만 나이 (man nai)</td>
                <td className="p-2">Age 0 at birth, +1 on each birthday. The system used worldwide.</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Korean Age</td>
                <td className="p-2">세는 나이 (seneun nai)</td>
                <td className="p-2">Age 1 at birth, +1 on every January 1st (regardless of birthday).</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Year Age</td>
                <td className="p-2">연 나이 (yeon nai)</td>
                <td className="p-2">Current year minus birth year. No +1 at birth, but birthday doesn&apos;t matter.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          For example, if you were born on March 15, 1995, here are your ages on January 10, 2026: <b>International age:</b> 30 (birthday has not passed yet). <b>Korean age:</b> 32 (1 at birth + turned 32 on Jan 1, 2026). <b>Year age:</b> 31 (2026 - 1995). The difference between your Korean age and international age can be either 1 or 2 years, depending on whether your birthday has passed in the current year.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">How Korean Age Works</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The traditional Korean age system (세는 나이) is based on two simple rules that differ fundamentally from how most of the world counts age:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Rule 1: You are 1 year old at birth.</b> Koreans traditionally counted the time spent in the womb as part of your age. The moment you are born, you are already 1 (한 살).</li>
          <li><b>Rule 2: Everyone ages up on January 1st.</b> Your actual birthday is irrelevant for age calculation. When the calendar flips to a new year, every single person in Korea becomes one year older simultaneously.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          This creates a situation where your Korean age can be up to <b>2 years higher</b> than your international age. The maximum difference occurs between January 1st and your birthday: during this window, you have already gained a year on January 1st, but your international age has not yet increased because your birthday has not arrived.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">The Famous December 31st Scenario</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The most extreme example of Korean age logic: a baby born on <b>December 31st at 11:59 PM</b> is 1 year old at birth. Just one minute later, at midnight on January 1st, that baby turns <b>2 years old</b> in Korean age -- despite being only minutes old in reality.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Meanwhile, a baby born just two minutes later, on <b>January 1st at 12:01 AM</b>, would be 1 year old and would not turn 2 until the following January 1st -- a full year later. Despite being born only two minutes apart, these two babies would be considered <b>one full Korean year apart in age</b>, which in Korean culture traditionally meant they would use different speech formality levels (존댓말 vs 반말) with each other.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">The 2023 Law Change</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          On June 28, 2023, Korea officially implemented the <b>Unified Age Counting Act</b>, standardizing all legal and administrative uses of age to the international system (만 나이). This was one of the signature policies of President Yoon Suk-yeol and was passed by the National Assembly in December 2022.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>What changed:</b> All laws, regulations, contracts, and official documents now use international age. This means age-based rights and obligations -- like voting age, drinking age, military service age, pension eligibility, and school enrollment -- are all calculated using your actual date of birth.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>What did not change:</b> The law cannot regulate casual conversation. Many Koreans, especially older generations, still instinctively use Korean age when discussing age in social settings. If a Korean person asks your age (나이가 어떻게 되세요?), they are usually asking for your birth year so they can determine the social hierarchy between you.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Where Each System Is Still Used</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Even after the 2023 reform, different age systems appear in different contexts:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>International age (만 나이):</b> All legal documents, contracts, government services, medical records, insurance, alcohol/tobacco purchase age (19), voting age (18), and criminal responsibility age</li>
          <li><b>Korean age (세는 나이):</b> Casual conversation, self-introductions, determining 형/누나/언니/오빠 relationships, and cultural contexts where birth year matters more than exact date</li>
          <li><b>Year age (연 나이):</b> Largely phased out. Was previously used for some administrative purposes like military conscription age calculations, but now replaced by international age</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Why Korean Age Existed</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean age has deep cultural and historical roots. Several factors explain why Korea counted age differently:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>East Asian tradition:</b> Historically, many East Asian cultures (China, Japan, Vietnam) used similar age-counting systems. Korea was the last to officially abandon it.</li>
          <li><b>Womb time counts:</b> In traditional Korean (and Confucian) thought, the approximately 10 months (열 달) spent in the womb were considered part of your life, so you were born at age 1.</li>
          <li><b>Lunar New Year tradition:</b> The age increase was originally tied to the Lunar New Year (설날), not January 1st. As Korea adopted the Gregorian calendar, the age-up date shifted to January 1st.</li>
          <li><b>Hierarchy and social order:</b> Korean culture places enormous importance on age-based hierarchy. Knowing someone&apos;s birth year immediately tells you how to speak to them (formal vs informal language) and how to behave around them.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Age-Related Korean Culture</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Age matters in Korea more than almost any other country. Here are key cultural aspects tied to age:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Speech formality (존댓말/반말):</b> Koreans use formal language (존댓말) with people older than them and informal language (반말) with people the same age or younger. Using 반말 with someone older is considered extremely rude unless they explicitly permit it.</li>
          <li><b>Age hierarchy (서열):</b> Older people are expected to pay for meals, give advice, and lead in social situations. Younger people are expected to pour drinks for elders, use two hands when receiving something, and show deference.</li>
          <li><b>Military service:</b> Korean men must complete military service, typically between ages 18 and 28 (international age). This is a significant life milestone that affects education and career timing.</li>
          <li><b>School enrollment:</b> Since the 2023 reform, school enrollment age is based on international age (만 나이). Children enter elementary school in the year they turn 6 (international age).</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Calculate Your Korean Age</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-4">
          Curious about your Korean age? Enter your birthday to see your international age, Korean age, and year age side by side.
        </p>
        <Link
          href="/en/korean-age"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
        >
          Korean Age Calculator &rarr;
        </Link>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i}>
              <h3 className="text-sm font-bold mb-1">Q. {item.q}</h3>
              <p className="text-sm text-[#4E5968] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </Card>
    </PageLayout>
  );
}
