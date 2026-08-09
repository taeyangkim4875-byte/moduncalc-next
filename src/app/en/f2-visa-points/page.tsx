import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import F2PointsCalc from "./F2PointsCalc";

export const metadata: Metadata = {
  title: "F-2-7 Visa Points Calculator (2026) - Check Your Korea Residence Score",
  description:
    "Free F-2-7 points calculator for Korea's points-based residence visa. Score age, education, income, TOPIK/KIIP and bonuses instantly — see if you reach 80 points.",
  alternates: { canonical: "https://moduncalc.com/en/f2-visa-points" },
  openGraph: {
    title: "F-2-7 Visa Points Calculator 2026 - Korea Residence Visa Score",
    description:
      "Check your F-2-7 score in seconds. Age, education, income, TOPIK and KIIP scored against the 80-point pass mark. No sign-up.",
    url: "https://moduncalc.com/en/f2-visa-points",
  },
};

const FAQ = [
  {
    q: "Do I need a TOPIK score to get the F-2-7 visa?",
    a: "No. Korean language ability is scored but it is not mandatory. Language is worth a maximum of 20 points out of the 130 available in the common categories, so an applicant with a strong income and a graduate degree can clear 80 points without ever sitting the TOPIK exam. That said, language points are the cheapest points to earn relative to effort, and completing KIIP Stage 5 also adds a separate bonus on top of your language score.",
  },
  {
    q: "How much income do I need for the F-2-7 visa?",
    a: "There is no single fixed figure, because income is scored on a sliding scale rather than a pass/fail test. As a practical guide, immigration generally expects applicants to earn at least around 1.5 times Korea's GNI per capita, and income becomes the single heaviest category at up to 60 points. Earning 30 million KRW gives you 30 points, 50 million gives 45 points, and 100 million or more gives the full 60.",
  },
  {
    q: "Can I apply for the F-2-7 visa directly from outside Korea?",
    a: "In practice, no. The F-2-7 is a status change applied for from inside Korea by people who already hold an eligible long-term visa, most commonly E-7, E-1 to E-5, D-5 to D-9, or D-10. You will normally need to have been legally resident in Korea and to produce Korean tax records proving your declared income, which is difficult without an existing residence status.",
  },
  {
    q: "How long is the F-2-7 visa valid, and does it lead to permanent residency?",
    a: "The period of stay granted depends on your final score: roughly 1 year at 80 to 109 points, 2 years at 110 to 119, 3 years at 120 to 129, and 5 years at 130 or above. The F-2-7 is also one of the standard routes to F-5 permanent residency — holders can typically apply after maintaining the status for 3 years, provided income and other requirements continue to be met.",
  },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="Living in Korea"
      title="F-2-7 Visa Points Calculator"
      description="Score yourself against Korea's points-based residence visa. 80 points to qualify."
    >
      <CalculatorJsonLd
        name="F-2-7 Visa Points Calculator"
        description="Interactive calculator for South Korea's F-2-7 points-based residence visa. Scores age, education, Korean proficiency, income, bonuses and deductions against the 80-point pass mark."
        url="https://moduncalc.com/en/f2-visa-points"
      />
      <FaqJsonLd items={FAQ} />

      <F2PointsCalc />

      <SeoSection title="What is the F-2-7 Visa in South Korea?">
        <p>
          The <strong>F-2-7 visa</strong> — formally the points-based Residence visa, or{" "}
          <em>점수제 거주비자</em> — is South Korea&rsquo;s route for skilled foreign professionals who want to
          settle long term without being tied to a single employer. Instead of assessing you against a
          job offer, immigration scores your personal profile and grants the status if you clear a
          threshold.
        </p>
        <p>
          That distinction matters more than it first appears. Most work visas in Korea, such as the
          E-7, bind your legal status to one sponsoring company: if you lose the job, you have a limited
          window to find another sponsor or leave the country. The F-2-7 removes that dependency. Holders
          can change jobs freely, work in most sectors without further permission, and start a business.
          Spouses and minor children can join as dependants, and the status is one of the standard
          stepping stones to <strong>F-5 permanent residency</strong>.
        </p>
        <p>
          Eligibility is decided by a points table published by the Ministry of Justice. The four common
          categories — age, education, Korean language ability and annual income — are worth a combined
          <strong> 130 points</strong>. Bonus items can add up to <strong>+40</strong>, and deductions for
          legal violations can subtract up to <strong>−70</strong>. You qualify at{" "}
          <strong>80 points or more</strong>. Because the categories are additive, there is no single
          mandatory qualification: weakness in one area can be offset by strength in another.
        </p>
      </SeoSection>

      <SeoSection title="Point System Breakdown: Age, Income, Education, Language">
        <h3 className="text-sm font-extrabold text-[var(--ink)]">Age — up to 25 points</h3>
        <p>
          Applicants aged <strong>25 to 29</strong> receive the maximum 25 points. Scores taper off in
          both directions: 23 points for those aged 18 to 24 or 30 to 34, 20 points at 35 to 39, then a
          sharp drop to 12 points at 40 to 44, 8 points at 45 to 50, and just 3 points from 51 onwards.
          Age is the one category you cannot improve, which is why applicants in their forties usually
          need a strong income to compensate.
        </p>

        <h3 className="mt-2 text-sm font-extrabold text-[var(--ink)]">Education — up to 25 points</h3>
        <p>
          A doctorate in a STEM field earns the full 25 points; a doctorate in the humanities earns 20. A
          master&rsquo;s degree is worth 20 points in STEM and 17 otherwise, while a bachelor&rsquo;s degree
          scores 17 or 15 on the same split. Associate and vocational degrees earn 15 or 10. Degrees
          awarded outside Korea must be authenticated by apostille or consular legalisation before
          immigration will score them, so start that paperwork early.
        </p>

        <h3 className="mt-2 text-sm font-extrabold text-[var(--ink)]">Annual income — up to 60 points</h3>
        <p>
          Income is by far the heaviest category, worth almost half of the common total on its own. The
          scale runs from 10 points for earnings above minimum wage but under 30 million KRW, through 30
          points at 30 million, 45 points at 50 million, and 60 points at 100 million KRW or more. The
          figure used is your <strong>pre-tax income for the previous year</strong> as recorded on your
          certificate of income amount (소득금액증명원) issued by the tax office — not your current salary
          or your contract value. A single promotion or bonus year can therefore move an application from
          rejection to approval.
        </p>

        <h3 className="mt-2 text-sm font-extrabold text-[var(--ink)]">Korean language — up to 20 points</h3>
        <p>
          Twenty points go to holders of TOPIK level 5 or 6, or those who have completed KIIP Stage 5.
          Fifteen points are awarded for TOPIK 4 or KIIP Stage 4, ten for TOPIK 3, five for TOPIK 2 and
          three for TOPIK 1. Only the higher of your TOPIK level and your KIIP stage is counted, so there
          is no benefit to doing both purely for scoring — although KIIP Stage 5 completion also attracts
          a separate bonus.
        </p>

        <h3 className="mt-2 text-sm font-extrabold text-[var(--ink)]">Bonuses and deductions</h3>
        <p>
          Common bonus items include graduating from a global top-500 university under the QS or Times
          Higher Education rankings, receiving a recommendation from a central government ministry,
          completing KIIP Stage 5, holding a degree from a Korean institution, and sustained volunteer
          work. Deductions apply for criminal convictions and immigration violations, scaled by the size
          of the fine imposed. Bonus and deduction items are revised more frequently than the core table,
          so treat the values in this calculator as indicative and confirm them before you file.
        </p>
      </SeoSection>

      <SeoSection title="What is GNI and KIIP?">
        <h3 className="text-sm font-extrabold text-[var(--ink)]">GNI — Gross National Income</h3>
        <p>
          <strong>GNI per capita</strong> is the average income per person in Korea, published annually by
          the Bank of Korea. Immigration uses it as a moving benchmark so that income requirements track
          the national economy instead of being frozen at a fixed number. Applicants are generally
          expected to earn at least around <strong>1.5 times GNI per capita</strong>, and the commonly
          cited threshold for converting to F-5 permanent residency later is <strong>2 times GNI</strong>.
        </p>
        <p>
          Korea&rsquo;s GNI per capita has been running in the mid-to-high USD 40,000 range in recent years,
          which works out to roughly <strong>45 to 50 million KRW</strong> annually. On that basis, the
          practical income floor for a comfortable F-2-7 application sits somewhere near{" "}
          <strong>65 to 75 million KRW</strong>. Because the published figure moves each year and is
          revised, check the current Bank of Korea release rather than relying on an estimate.
        </p>

        <h3 className="mt-2 text-sm font-extrabold text-[var(--ink)]">
          KIIP — Korea Immigration and Integration Program
        </h3>
        <p>
          <strong>KIIP</strong> (사회통합프로그램) is a free government course run through immigration
          offices and partner institutions. It combines Korean language teaching with classes on Korean
          society, law and culture, and runs from Stage 0 through Stage 5. You take a placement test to
          determine your entry stage, and each stage requires classroom attendance plus a pass in the
          end-of-stage assessment.
        </p>
        <p>
          KIIP is popular with visa applicants for three reasons. Completing a stage is recognised as
          equivalent to the matching TOPIK level, so it substitutes for the exam. It is free, whereas
          TOPIK carries a fee and fixed test dates. And Stage 5 completion is frequently required or
          heavily weighted for F-5 permanent residency and naturalisation, meaning the effort carries
          forward beyond the F-2-7 application itself.
        </p>
      </SeoSection>

      <SeoSection title="How Long Is the F-2-7 Visa Valid?">
        <p>
          Unlike most Korean visas, the F-2-7 grants a period of stay that scales with your score rather
          than a flat term. The higher you score above the pass mark, the longer you can stay before
          renewing.
        </p>
        <SeoList>
          <li><strong>80 – 109 points</strong> → 1 year</li>
          <li><strong>110 – 119 points</strong> → 2 years</li>
          <li><strong>120 – 129 points</strong> → 3 years</li>
          <li><strong>130 points or more</strong> → 5 years</li>
        </SeoList>
        <p>
          A strong income score can independently lift the granted period, so two applicants with the same
          total may receive different terms. At renewal you are rescored against the table in force at
          that time, which means a drop in income or a change to the point values can shorten your next
          term. Applicants close to a band boundary often find it worth delaying an application until after
          a raise or a language qualification lands.
        </p>
      </SeoSection>

      <SeoFaq title="Frequently Asked Questions About the F-2-7 Visa" items={FAQ} />

      <SeoSection title="Related Calculators and Guides">
        <p>
          Not sure the F-2-7 is the right track for you? The{" "}
          <SeoLink href="/en/visa-check">Korea Visa Checker</SeoLink> walks through a short quiz and points
          you to the visa type that fits your situation, and the{" "}
          <SeoLink href="/en/guide/visa-guide">Korea visa guide</SeoLink> explains the main categories in
          more depth.
        </p>
        <p>
          Since income drives most of your score, it is worth knowing what you actually take home. The{" "}
          <SeoLink href="/en/salary">Korea salary calculator</SeoLink> shows net pay after the four major
          insurances and income tax, and the{" "}
          <SeoLink href="/en/income-tax">income tax calculator</SeoLink> breaks down your annual liability.
          If you are weighing whether to stay long term, the{" "}
          <SeoLink href="/en/pension-refund">national pension refund calculator</SeoLink> shows what you
          would forfeit or reclaim on departure, and the{" "}
          <SeoLink href="/en/cost-of-living">cost of living calculator</SeoLink> helps you judge whether a
          given salary goes far enough.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
