import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Foreign Worker Rights in Korea - Labor Laws You Should Know",
  description:
    "Essential Korean labor law guide for foreign workers: minimum wage, working hours, overtime, annual leave, and discrimination protection.",
  alternates: { canonical: "https://moduncalc.com/en/guide/working-rights" },
  openGraph: {
    title: "Foreign Worker Rights in Korea - Labor Laws You Should Know",
    description:
      "Essential Korean labor law guide for foreign workers: minimum wage, working hours, overtime, annual leave, and discrimination protection.",
    url: "https://moduncalc.com/en/guide/working-rights",
  },
};

const faqItems = [
  {
    q: "Does Korean labor law apply to foreign workers?",
    a: "Yes, Korean labor law applies equally to all workers in Korea regardless of nationality or visa type. The Labor Standards Act (근로기준법), Minimum Wage Act (최저임금법), and other labor-related laws protect foreign workers exactly the same way they protect Korean citizens. Even undocumented workers retain basic labor rights such as the right to unpaid wages and industrial accident compensation.",
  },
  {
    q: "What is the minimum wage in Korea for 2026?",
    a: "The 2026 minimum wage in Korea is 10,030 KRW per hour. This translates to approximately 2,096,270 KRW per month for standard full-time work (209 hours per month, based on 40 hours per week plus paid weekly holidays). The minimum wage applies equally to Korean and foreign workers -- your employer cannot pay you less based on your nationality.",
  },
  {
    q: "Can my employer force me to work overtime without extra pay?",
    a: "No. Under Korean labor law, any work beyond the standard 40 hours per week (or 8 hours per day) is considered overtime and must be compensated at 150% of your regular hourly wage. Work on weekends or public holidays must be paid at 150%, and if overtime occurs on a holiday, the rate can stack up to 200%. Your employer cannot require overtime without your consent, and the maximum extended work hours are 12 hours per week on top of the standard 40.",
  },
  {
    q: "What is weekly holiday pay (주휴수당) and am I entitled to it?",
    a: "Weekly holiday pay (주휴수당) is pay for one additional day per week that you do not actually work. Any employee who works 15 or more hours per week and fulfills their contractual working days for the week is entitled to one paid day off. For full-time workers, this is already included in the monthly salary calculation (which is why the standard monthly hours are 209, not 174). Part-time workers earning the hourly minimum wage should receive weekly holiday pay on top of their hourly earnings.",
  },
];

export default function WorkingRightsPage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Foreign Worker Rights in Korea"
      description="Essential Korean labor laws every foreign worker should know: minimum wage, working hours, overtime, annual leave, and what to do when your rights are violated."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Foreign Worker Rights in Korea - Labor Laws You Should Know",
            description:
              "Essential Korean labor law guide for foreign workers: minimum wage, working hours, overtime, annual leave, and discrimination protection.",
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
        <h2 className="text-base font-extrabold mb-3">Korean Labor Law Applies Equally to Foreigners</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          One of the most important things to understand as a foreign worker in Korea is that <b>Korean labor law protects you equally</b>. The Labor Standards Act (근로기준법), Minimum Wage Act (최저임금법), Industrial Accident Compensation Insurance Act, and all related labor regulations apply to every worker in Korea regardless of nationality, visa status, or employment type.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          This means your employer cannot offer you worse conditions than Korean employees simply because you are a foreigner. If your employer tells you that &quot;the rules are different for foreigners,&quot; they are wrong. Any employment contract clause that provides conditions below the legal minimum is automatically void, even if you signed it.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">2026 Minimum Wage</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The 2026 minimum wage is <b>10,030 KRW per hour</b>, set by the Minimum Wage Commission. Here is how it translates to different pay periods:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Period</th>
                <th className="text-left p-2 font-bold">Amount (KRW)</th>
                <th className="text-left p-2 font-bold">How Calculated</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Hourly</td>
                <td className="p-2">10,030</td>
                <td className="p-2">Base rate</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Daily (8 hrs)</td>
                <td className="p-2">80,240</td>
                <td className="p-2">10,030 x 8</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Weekly (40 hrs + 8 weekly holiday)</td>
                <td className="p-2">481,440</td>
                <td className="p-2">10,030 x 48</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Monthly (209 hrs)</td>
                <td className="p-2">2,096,270</td>
                <td className="p-2">10,030 x 209</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Annual</td>
                <td className="p-2">25,155,240</td>
                <td className="p-2">2,096,270 x 12</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          The 209 monthly hours include 40 working hours per week plus 8 hours of paid weekly holiday (주휴시간), averaged over a month: (40 + 8) x (365 / 7) / 12 = 209 hours.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Standard Working Hours</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean labor law sets the standard working week at <b>40 hours</b> (8 hours per day, 5 days per week). The maximum extended (overtime) working hours are <b>12 hours per week</b>, making the absolute maximum 52 hours per week. This 52-hour cap was a major reform and is strictly enforced with significant penalties for violations.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Rest periods:</b> For every 4 hours of work, you are entitled to at least a 30-minute break. For 8 hours of work, you must receive at least a 1-hour break. These break periods are generally unpaid and do not count as working hours unless your employer requires you to remain on-call during breaks.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Overtime and Holiday Pay Rates</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Any work beyond the standard hours must be compensated at premium rates:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Type of Work</th>
                <th className="text-left p-2 font-bold">Pay Rate</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Overtime (beyond 8 hrs/day or 40 hrs/week)</td>
                <td className="p-2">150% of regular wage</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Holiday/weekend work</td>
                <td className="p-2">150% of regular wage</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Night work (10 PM - 6 AM)</td>
                <td className="p-2">150% of regular wage</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Overtime on a holiday</td>
                <td className="p-2">200% of regular wage</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Night work on a holiday + overtime</td>
                <td className="p-2">250% of regular wage</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          These premium rates are cumulative. For example, if you work overtime during a night shift on a public holiday, the rates stack. Your employer cannot substitute overtime pay with compensatory time off unless you both agree to it.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Annual Leave (연차 / Yeoncha)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          All employees are entitled to paid annual leave under Korean law. The system works as follows:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>First year:</b> You earn 1 day of paid leave for each month of perfect attendance, up to 11 days maximum during your first year.</li>
          <li><b>After 1 year:</b> You receive <b>15 days</b> of annual paid leave.</li>
          <li><b>After 3+ years:</b> You gain 1 additional day for every 2 years of service beyond the first year, up to a maximum of 25 days.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          If you do not use your annual leave within the year, your employer must either allow you to carry it over or pay you for the unused days (미사용 연차수당). Many employers encourage using leave rather than paying it out. Your employer cannot unilaterally force you to use annual leave on specific dates without your consent, except in limited circumstances.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Weekly Holiday Pay (주휴수당)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Weekly holiday pay is a concept unique to Korean labor law that often confuses foreign workers. If you work <b>15 or more hours per week</b> and fulfill your contractual working days for the week, you are entitled to <b>one paid day off</b> per week. This is the &quot;weekly holiday&quot; (주휴일).
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          For full-time salaried workers, weekly holiday pay is already built into the monthly salary (which is why the monthly calculation uses 209 hours instead of 174). However, for <b>hourly or part-time workers</b>, weekly holiday pay should be calculated and paid separately on top of your hourly wage. If you work 20 hours across 5 days, you are owed 4 additional hours of weekly holiday pay. Many part-time foreign workers are unaware of this right and miss out on significant income.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Parental Leave and Other Protections</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Foreign workers in Korea have access to the same family-related leave benefits as Korean citizens:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Maternity leave:</b> 90 days of paid leave (120 days for multiple births), with at least 45 days taken after delivery</li>
          <li><b>Parental leave:</b> Up to 1 year per child (for children under age 8 or in 2nd grade or below). Available to both mothers and fathers.</li>
          <li><b>Paternity leave:</b> 10 days of paid leave within 90 days of the child&apos;s birth</li>
          <li><b>Family care leave:</b> Up to 10 days per year for caring for family members with illness or injury</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">What to Do If Your Rights Are Violated</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If your employer is violating labor law -- not paying minimum wage, refusing overtime pay, denying annual leave, or engaging in discrimination -- you have several options:
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">1350</span>
            <span className="text-sm text-[#4E5968]">Immigration Contact Center -- multilingual counseling (Korean, English, Chinese, Vietnamese, and more) for visa-related work issues</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">1644-8585</span>
            <span className="text-sm text-[#4E5968]">Ministry of Employment and Labor hotline -- report labor law violations, file complaints, and get guidance on your rights</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">1600-8282</span>
            <span className="text-sm text-[#4E5968]">Foreign Workers Counseling Center -- free legal consultation in multiple languages specifically for migrant workers</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          You can also visit your local labor office (고용노동부 지방관서) in person to file a complaint. Bring your employment contract, pay stubs, and any evidence of violations. The process is free. Use our{" "}
          <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link> to verify that your pay meets legal minimums, and our{" "}
          <Link href="/en/severance" className="text-[var(--primary)] font-bold hover:underline">Severance Calculator</Link> to check your severance entitlement.
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
