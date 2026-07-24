import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Learning Korean as a Foreigner - Free Resources & Study Tips (2026)",
  description: "Best ways to learn Korean? Free apps, classes, TOPIK prep & immersion tips. From zero to conversational.",
  alternates: { canonical: "https://moduncalc.com/en/guide/learning-korean" },
  openGraph: {
    title: "Learning Korean as a Foreigner - Free Resources & Study Tips (2026)",
    description: "Complete guide to learning Korean: free apps, government classes (KIIP), TOPIK test prep, university programs, and immersion tips.",
    url: "https://moduncalc.com/en/guide/learning-korean",
  },
};

const faqItems = [
  {
    q: "How long does it take to learn Korean?",
    a: "The US Foreign Service Institute (FSI) classifies Korean as a Category IV language, estimating 2,200 class hours for professional proficiency. However, for practical conversational ability, most dedicated learners reach a basic conversational level in 6-12 months of consistent study (1-2 hours daily). Hangeul (한글), the Korean alphabet, can genuinely be learned in 1-2 days — it was designed by King Sejong to be easy to learn. TOPIK Level 3 (intermediate) typically takes 1-2 years of study, while TOPIK Level 5-6 (advanced) takes 3-5+ years. Living in Korea significantly accelerates learning through immersion, especially if you actively seek Korean-language social interactions rather than staying in English-speaking circles.",
  },
  {
    q: "What is the TOPIK test and why does it matter?",
    a: "TOPIK (Test of Proficiency in Korean / 한국어능력시험) is the official Korean language proficiency test, held 6 times per year in Korea and multiple times globally. It has 6 levels: TOPIK I (Levels 1-2, basic) and TOPIK II (Levels 3-6, intermediate to advanced). TOPIK matters because: Level 3+ is often required for university admission, Level 4+ earns points for the F-2 (points-based visa), Level 5+ is needed for the F-5 (permanent residency) visa, and many Korean employers value TOPIK scores. The test costs ₩40,000 (TOPIK I) or ₩55,000 (TOPIK II) and results are valid for 2 years. Registration is through the TOPIK website (topik.go.kr).",
  },
  {
    q: "What is KIIP and how can I join?",
    a: "KIIP (Korea Immigration & Integration Program / 사회통합프로그램) is a FREE government-run program that teaches Korean language and Korean culture/society. It consists of 5 levels (0-4) of Korean language classes (총 485시간) plus a final Korea Understanding course (50 hours). Completing KIIP gives you significant advantages: bonus points for the F-2 points-based visa, exemption from the Korean language test for F-5 (permanent residency), and exemption from the naturalization written test. Classes are held at designated education centers across Korea, often at universities and community centers. To join, register at socinet.go.kr, take a placement test, and you will be assigned to the appropriate level. Classes are typically held 2-3 times per week.",
  },
];

export default function LearningKoreanPage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Learning Korean as a Foreigner"
      description="The best free and paid resources for learning Korean — apps, government programs, TOPIK preparation, and tips for building real Korean language skills."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Learning Korean as a Foreigner - Free Resources & Study Tips (2026)",
            description: "Complete guide to learning Korean: free apps, government classes (KIIP), TOPIK test prep, university programs, and immersion tips.",
            datePublished: "2026-01-01",
            dateModified: "2026-07-16",
            author: { "@type": "Organization", name: "ModunCalc", url: "https://moduncalc.com" },
          }),
        }}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">Start Here: Learn Hangeul (한글)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Hangeul (한글), the Korean alphabet, was scientifically designed by King Sejong the Great (세종대왕) in 1443 to be easy for common people to learn. Unlike Chinese characters or Japanese kanji, Hangeul has only <b>24 basic letters</b> (14 consonants + 10 vowels) that combine into syllable blocks. You can genuinely learn to read Korean in <b>1-2 days</b> — this is not an exaggeration.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Why learn Hangeul first:</b> Romanization (writing Korean in English letters) is inconsistent and misleading. The same Korean sound might be romanized as &quot;eo&quot;, &quot;u&quot;, or &quot;o&quot; depending on the system. Once you read Hangeul, you can pronounce Korean words correctly, read menus, signs, subway stations, and your Korean study becomes dramatically more effective.
        </p>
        <div className="p-3 bg-[var(--bg)] rounded-xl">
          <h3 className="text-sm font-bold mb-2">Best free Hangeul resources:</h3>
          <ul className="text-sm text-[#4E5968] leading-relaxed space-y-1 list-disc pl-5">
            <li><b>Talk To Me In Korean (TTMIK)</b> — Hangeul course: Free, well-structured, audio included</li>
            <li><b>How to Study Korean</b> (howtostudykorean.com) — Detailed explanations of each letter</li>
            <li><b>Write It! Korean</b> app — Practice writing strokes on your phone</li>
            <li><b>YouTube</b> — Search &quot;Learn Hangeul in 1 hour&quot; for video lessons</li>
          </ul>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Free Learning Resources</h2>
        <div className="space-y-3">
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Talk To Me In Korean (TTMIK)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              The most popular Korean learning platform for English speakers. Free podcast lessons from beginner to advanced, with PDF textbooks available for purchase. Their curriculum is well-structured and culturally relevant. The hosts explain Korean in a way that makes sense for English speakers. Free content includes all core audio lessons (Levels 1-9). <b>talktomeinkorean.com</b>
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">King Sejong Institute (세종학당)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Free online Korean classes run by the Korean government through the Sejong Institute Foundation. Offers structured courses from beginner to advanced with video lectures, quizzes, and speaking practice. Available worldwide. The online platform (iksi.or.kr) provides free access to the entire curriculum. Physical Sejong Institutes in Korea also offer affordable in-person classes.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Duolingo Korean</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Good for absolute beginners and building a daily study habit. The gamified approach helps with consistency. However, Duolingo alone is insufficient for real fluency — use it as a supplement alongside other resources. Best for: learning basic vocabulary, Hangeul reinforcement, daily practice habit.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">KIIP (사회통합프로그램) — Free Government Program</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              <b>The best free Korean class option for long-term residents.</b> Korea Immigration &amp; Integration Program (KIIP) provides free in-person Korean classes at education centers across Korea. 5 levels of Korean + Korean society/culture course. Completing KIIP earns visa points for F-2 and exemptions for F-5 applications. Register at socinet.go.kr with your ARC. Classes are typically 2-3 times per week, often in the evening for working professionals.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">TOPIK Test (한국어능력시험)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          TOPIK is the official Korean proficiency test recognized by the Korean government, universities, and employers. Understanding the levels helps you set clear study goals:
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between p-2.5 bg-[var(--bg)] rounded-lg">
            <div>
              <span className="text-sm font-bold">TOPIK 1</span>
              <span className="text-xs text-[#8B95A1] ml-2">Basic greeting & survival Korean</span>
            </div>
            <span className="text-xs font-bold text-[#8B95A1]">~200 hours</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[var(--bg)] rounded-lg">
            <div>
              <span className="text-sm font-bold">TOPIK 2</span>
              <span className="text-xs text-[#8B95A1] ml-2">Daily conversations, simple tasks</span>
            </div>
            <span className="text-xs font-bold text-[#8B95A1]">~400 hours</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[var(--bg)] rounded-lg">
            <div>
              <span className="text-sm font-bold text-[var(--primary)]">TOPIK 3</span>
              <span className="text-xs text-[#8B95A1] ml-2">University admission level</span>
            </div>
            <span className="text-xs font-bold text-[var(--primary)]">~600 hours</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[var(--bg)] rounded-lg">
            <div>
              <span className="text-sm font-bold text-[var(--primary)]">TOPIK 4</span>
              <span className="text-xs text-[#8B95A1] ml-2">F-2 visa points, professional use</span>
            </div>
            <span className="text-xs font-bold text-[var(--primary)]">~800 hours</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[var(--bg)] rounded-lg">
            <div>
              <span className="text-sm font-bold">TOPIK 5</span>
              <span className="text-xs text-[#8B95A1] ml-2">F-5 visa, professional fluency</span>
            </div>
            <span className="text-xs font-bold text-[#8B95A1]">~1200 hours</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[var(--bg)] rounded-lg">
            <div>
              <span className="text-sm font-bold">TOPIK 6</span>
              <span className="text-xs text-[#8B95A1] ml-2">Near-native, academic/research</span>
            </div>
            <span className="text-xs font-bold text-[#8B95A1]">~2000+ hours</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Test format:</b> TOPIK I (Levels 1-2) has listening and reading sections. TOPIK II (Levels 3-6) adds a writing section with essay. Held 6 times per year in Korea, 2-4 times abroad. Registration: topik.go.kr. Fee: ₩40,000 (TOPIK I), ₩55,000 (TOPIK II). Results valid for 2 years.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">University Korean Programs</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Major Korean universities offer intensive Korean language programs (한국어 과정), typically structured as 10-week terms with 4 hours of class daily. These are the most effective way to learn Korean quickly but are not free.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Yonsei University KLI (연세대 한국어학당):</b> The most prestigious and oldest program. 10-week terms, ~₩1,750,000 per term. 6 levels. Located in Sinchon, central Seoul.</li>
          <li><b>Seoul National University LEI (서울대 언어교육원):</b> Rigorous academic approach. Similar pricing and structure to Yonsei. Good for students planning to enter Korean universities.</li>
          <li><b>Sogang University KLEC (서강대 한국어교육원):</b> Known for emphasis on speaking and conversation skills. Popular with students who want practical Korean quickly.</li>
          <li><b>Ewha Womans University (이화여대):</b> Open to all genders despite the name. Strong program with good cultural immersion activities.</li>
          <li><b>Korea University (고려대):</b> Competitive program with scholarship opportunities for top students.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Scholarships:</b> The Korean Government Scholarship Program (KGSP/GKS) covers tuition, living expenses, and Korean language training for international students. Apply through your country&apos;s Korean embassy.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Language Exchange & Immersion Tips</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Tip 1</span>
            <span className="text-sm text-[#4E5968]"><b>Language exchange (언어교환):</b> Find a Korean partner who wants to practice English. Apps like HelloTalk, Tandem, and MEEFF connect language exchange partners. Seoul Global Center also hosts free language exchange events. Split time 50/50 between Korean and English practice.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Tip 2</span>
            <span className="text-sm text-[#4E5968]"><b>Change your phone to Korean:</b> Set your phone language to Korean. This forces you to read Korean constantly throughout the day. You already know where every menu item is, so the Korean labels will gradually become second nature.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Tip 3</span>
            <span className="text-sm text-[#4E5968]"><b>Watch Korean content with Korean subtitles:</b> Start with familiar shows dubbed in Korean, then move to Korean dramas/variety shows with Korean subtitles (not English). Netflix offers Korean subtitle options for most K-content.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Tip 4</span>
            <span className="text-sm text-[#4E5968]"><b>Order in Korean:</b> Use Korean at cafes, restaurants, and convenience stores. Even simple phrases like &quot;이거 주세요&quot; (this one please) and &quot;카드로 할게요&quot; (I&apos;ll pay by card) build real-world confidence. Most Koreans appreciate the effort enormously.</span>
          </div>
        </div>
        <p className="text-xs text-[#8B95A1] mt-3">
          Learn essential Korean phrases: <Link href="/en/korean-phrases" className="text-[var(--primary)] font-bold hover:underline">Korean Phrases Guide</Link>
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
