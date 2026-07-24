import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Dating in Korea as a Foreigner - Culture, Apps & Expectations (2026)",
  description: "What's dating like in Korea? Meeting people, popular apps, couple culture, and what foreigners should know.",
  alternates: { canonical: "https://moduncalc.com/en/guide/dating-culture" },
  openGraph: {
    title: "Dating in Korea as a Foreigner - Culture, Apps & Expectations (2026)",
    description: "Guide to dating culture in Korea for foreigners: apps, couple traditions, social expectations, and navigating relationships.",
    url: "https://moduncalc.com/en/guide/dating-culture",
  },
};

const faqItems = [
  {
    q: "What dating apps do people use in Korea?",
    a: "The most popular dating apps in Korea for foreigners are Tinder and Bumble, which have large English-speaking user bases. Korean-language apps include AMANDA (아만다), which requires photo verification and is considered more serious, and Noondate (눈데이트) which shows you 2 profiles at noon daily. Hinge is growing in popularity among internationals. For more serious relationships, some Koreans use 소개팅 apps like Between (비트윈, actually a couples app) or get introduced through friends. 소개팅 (sogaeting) — being set up by mutual friends — is still one of the most common ways Koreans meet partners.",
  },
  {
    q: "Who pays on dates in Korea?",
    a: "Dating payment culture in Korea is evolving. Traditionally, the man pays for the first date, and many Korean men still offer to pay for dinner. A common modern arrangement is '더치페이' (Dutch pay / splitting the bill) or 'taking turns' — one person pays for dinner, the other for coffee or dessert at the next stop. Younger couples increasingly split costs equally. On special occasions (anniversaries, birthdays), the celebrating partner is usually treated. Don't be surprised if your Korean date insists on paying — it's a cultural norm to offer, even if you end up splitting.",
  },
  {
    q: "What are the important couple anniversaries in Korea?",
    a: "Korean couples celebrate many anniversaries that may be unfamiliar to foreigners: the 100-day anniversary (백일, baegil) is the first major milestone and is celebrated with gifts and a special date. Other celebrations include the 200-day, 300-day, and each annual anniversary. Valentine's Day (February 14, women give chocolate to men), White Day (March 14, men give candy to women), and Pepero Day (November 11, exchange Pepero sticks) are also important. Many couples use the 'Between' (비트윈) app to track their D-day counter and share a private timeline. Matching couple items (shoes, phone cases, outfits) are very common.",
  },
];

export default function DatingCulturePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Dating in Korea as a Foreigner"
      description="Everything foreigners should know about Korean dating culture — how people meet, couple traditions, social expectations, and navigating relationships."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Dating in Korea as a Foreigner - Culture, Apps & Expectations (2026)",
            description: "Guide to dating culture in Korea for foreigners: apps, couple traditions, social expectations, and navigating relationships.",
            datePublished: "2026-01-01",
            dateModified: "2026-07-16",
            author: { "@type": "Organization", name: "ModunCalc", url: "https://moduncalc.com" },
          }),
        }}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">How People Meet in Korea</h2>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-bold mb-1">소개팅 (Sogaeting) — Blind Dates Through Friends</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              The most traditional and still popular way to meet someone in Korea. A mutual friend sets you up, often sharing basic info (job, age, photo) beforehand. The first meeting is typically at a cafe. There is no pressure to continue if there is no interest — it is understood that either party can politely decline a second meeting. As a foreigner, ask your Korean friends or coworkers to set you up — many are happy to play matchmaker.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1">미팅 (Meeting) — Group Blind Dates</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              A group version of sogaeting where 3-4 men and 3-4 women meet at a restaurant or bar. Popular among university students and young professionals. The groups are usually organized by one person from each side who know each other. Drinking games and conversation flow naturally. If two people hit it off, they exchange numbers. Less pressure than one-on-one blind dates.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1">Dating Apps</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              <b>Tinder</b> and <b>Bumble</b> are the most foreigner-friendly apps with English interfaces and international user bases. Korean-specific apps include <b>AMANDA (아만다)</b> — requires photo approval and is considered more &quot;serious,&quot; <b>Noondate (눈데이트)</b> — shows you 2 profiles at noon daily, and <b>Glam (글램)</b> — focused on verified professionals. Hinge is growing rapidly in Seoul. Dating apps are widely used and carry less stigma than in some other countries.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1">Language Exchange & Social Groups</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Many foreigners meet Korean partners through language exchange meetups, international friend groups, hobby clubs, or workplaces. Seoul Global Center hosts events, and Meetup.com has active groups. While these are not explicitly for dating, romantic connections naturally develop. Social circles in Korea tend to be tight-knit, so being introduced through a group adds trust.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Korean Couple Culture</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean couple culture has several unique traditions that may surprise foreigners:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>100-day anniversary (백일):</b> The first 100 days of dating is a major milestone. Couples celebrate with gifts (often rings), special dinners, and photo sessions. Your Korean partner will likely remember this date.</li>
          <li><b>Matching outfits (커플룩):</b> Wearing matching or coordinated outfits is very common and is seen as a public display of closeness. Matching shoes, phone cases, accessories, and even pajamas are popular.</li>
          <li><b>Couple rings (커플링):</b> Many Korean couples wear matching rings, often from early in the relationship (not to be confused with engagement rings). Popular ring shops are in Gangnam, Hongdae, and online.</li>
          <li><b>Valentine&apos;s Day / White Day / Pepero Day:</b> Feb 14 (women give chocolate to men), March 14 (men give candy to women), Nov 11 (exchange Pepero sticks). There is also Black Day (April 14) when single people eat jjajangmyeon (짜장면) together.</li>
          <li><b>Frequent communication:</b> Korean partners typically text throughout the day — good morning messages, meal photos, &quot;what are you doing&quot; messages. Going hours without responding may cause concern. Couples often use KakaoTalk (카카오톡) couple emoticons and the Between (비트윈) app.</li>
          <li><b>PDA (Public Display of Affection):</b> Holding hands and linking arms is common and accepted. Kissing in public is more reserved than in Western countries but is becoming more accepted, especially among younger couples in areas like Hongdae and Itaewon.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Who Pays? (데이트 비용)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Payment norms are evolving in Korea, but here is a general guide:
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">First date</span>
            <span className="text-sm text-[#4E5968]">The person who asked (or the man in traditional setups) often pays. It is polite to offer to split, but do not insist too strongly if your date wants to treat you.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Ongoing</span>
            <span className="text-sm text-[#4E5968]">Many couples alternate: one person pays for dinner (1차), the other for the next stop like coffee or drinks (2차). This &quot;taking turns&quot; system avoids awkward splitting at every meal.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Modern</span>
            <span className="text-sm text-[#4E5968]">Younger couples increasingly split everything 50/50 (더치페이). This is becoming more accepted and is common among couples where both partners earn similar incomes.</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Age & Family Dynamics</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Age hierarchy (나이):</b> Age plays a significant role in Korean relationships. Knowing your partner&apos;s age early is normal — it determines the language register (반말 vs. 존댓말) and social dynamics. Age gaps of 2-5 years are common and accepted, though very large gaps may attract attention. Same-age couples (동갑) often use casual speech (반말) from the start, while couples with age differences may use respectful speech longer.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Meeting the family:</b> This is a significant step and usually happens only when the relationship is serious. Korean families may have concerns about intercultural relationships, particularly regarding language barriers, cultural differences, and long-term plans (especially regarding which country you will live in). Being respectful, learning basic Korean greetings, and showing genuine interest in Korean culture goes a long way.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Marriage considerations:</b> If the relationship progresses toward marriage, understanding the F-6 (marriage visa / 결혼이민 비자) process is important. Korean weddings involve both families significantly, and there are financial expectations like 혼수 (wedding preparations) and 전세/집 (housing) that are discussed between families.
        </p>
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
