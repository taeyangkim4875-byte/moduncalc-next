import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Severance Pay in Korea - Your Rights as a Foreign Worker (2026)",
  description:
    "Complete guide to Korean severance pay (퇴직금) for foreign workers: eligibility, calculation, tax, and what to do if your employer doesn't pay.",
  alternates: { canonical: "https://moduncalc.com/en/guide/severance-guide" },
  openGraph: {
    title: "Severance Pay in Korea - Your Rights as a Foreign Worker (2026)",
    description:
      "Complete guide to Korean severance pay (퇴직금) for foreign workers: eligibility, calculation, tax, and what to do if your employer doesn't pay.",
    url: "https://moduncalc.com/en/guide/severance-guide",
  },
};

const faqItems = [
  {
    q: "Can foreign workers receive severance pay in Korea?",
    a: "Yes, absolutely. Korean labor law applies equally to all workers regardless of nationality. If you have worked for the same employer for at least one continuous year with 15 or more hours per week, you are legally entitled to severance pay (퇴직금). This includes E-2 English teachers, E-7 skilled workers, H-2 working holiday visa holders, and all other visa types that permit employment.",
  },
  {
    q: "How is severance pay calculated in Korea?",
    a: "Severance pay is calculated as: (average daily wage) x 30 days x (total days of service / 365). Your average daily wage is determined by dividing your total earnings over the last 3 months (including base salary, regular bonuses, and regular overtime pay) by the total number of calendar days in that 3-month period. At minimum, you receive roughly one month of pay per year worked.",
  },
  {
    q: "What should I do if my employer refuses to pay severance?",
    a: "If your employer does not pay severance within 14 days of your last working day, you can file a complaint (진정) with the Ministry of Employment and Labor (고용노동부). You can visit your local labor office in person or file online through the ministry website. The ministry will investigate and can order your employer to pay. Employers who fail to pay severance face up to 3 years in prison or a fine of up to 30 million KRW.",
  },
  {
    q: "Is severance pay taxed differently from regular income?",
    a: "Yes, severance pay is classified as retirement income (퇴직소득) and taxed under a separate, generally more favorable schedule than regular employment income. The tax calculation considers your length of service, with longer-serving employees receiving larger deductions. For many workers, the effective tax rate on severance is significantly lower than their regular income tax rate.",
  },
];

export default function SeveranceGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Severance Pay in Korea"
      description="Your complete guide to Korean severance pay (퇴직금) as a foreign worker: eligibility, calculation, tax treatment, and how to claim what you are owed."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Severance Pay in Korea - Your Rights as a Foreign Worker (2026)",
            description:
              "Complete guide to Korean severance pay (퇴직금) for foreign workers: eligibility, calculation, tax, and what to do if your employer doesn't pay.",
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
        <h2 className="text-base font-extrabold mb-3">Severance Pay Is a Legal Right, Not a Benefit</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          In Korea, severance pay (퇴직금, pronounced &quot;twe-jik-geum&quot;) is not a generous perk offered by good employers -- it is a <b>legal obligation</b> under the Labor Standards Act (근로기준법) and the Employee Retirement Benefit Security Act (근로자퇴직급여 보장법). Every employer in Korea, from multinational corporations to small hagwon (학원) owners, must pay severance to qualifying employees.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          This applies equally to <b>all workers regardless of nationality</b>. Whether you are an E-2 English teacher, an E-7 skilled professional, an F-series visa holder, or any other foreign worker, you have the same severance rights as a Korean citizen. Your employer cannot waive this obligation through employment contracts or verbal agreements -- any clause attempting to do so is legally void.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Eligibility Requirements</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          To qualify for severance pay, you must meet <b>both</b> of the following conditions:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>1 year or more of continuous employment</b> with the same employer. The probation period counts toward this requirement. Even if you changed positions within the same company, your tenure is continuous.</li>
          <li><b>15 or more hours of work per week</b> on average (calculated over a 4-week period). Part-time workers who meet this threshold are fully eligible. Ultra-short-time workers (under 15 hours/week) are excluded.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Important: it does not matter whether you quit voluntarily, are laid off, or are terminated for cause. As long as you meet the above conditions, you are entitled to severance pay. The reason for separation is irrelevant.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Calculation Formula</h2>
        <div className="bg-[var(--bg)] rounded-lg p-4 mb-3">
          <p className="text-sm font-bold text-center">Severance = Daily Average Wage x 30 x (Total Days Worked / 365)</p>
        </div>
        <h3 className="text-sm font-bold mt-4 mb-2">How to Calculate Your Average Daily Wage</h3>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Your average daily wage is based on your <b>last 3 months of earnings</b> before your final day. Take the total gross pay you received during those 3 months and divide it by the total number of calendar days in that period (typically 89-92 days).
        </p>
        <h3 className="text-sm font-bold mt-4 mb-2">What Counts as &quot;Wages&quot;</h3>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Base salary</b> (기본급): Always included</li>
          <li><b>Regular bonuses</b> (상여금): Included if paid regularly and uniformly. Bonuses paid over a period longer than 3 months are prorated to fit the 3-month window.</li>
          <li><b>Fixed overtime pay</b> (고정 연장수당): Included if it is a regular, predetermined part of your pay</li>
          <li><b>Unused annual leave pay</b> (미사용 연차수당): Included if it arose within the last year of employment</li>
        </ul>
        <h3 className="text-sm font-bold mt-4 mb-2">Example Calculation</h3>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Suppose you worked exactly 2 years (730 days) and your total gross pay over the last 3 months was 9,000,000 KRW over 91 calendar days. Your daily average wage = 9,000,000 / 91 = 98,901 KRW. Your severance = 98,901 x 30 x (730 / 365) = <b>5,934,060 KRW</b>.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Severance Pay Tax (Retirement Income Tax)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Severance pay is taxed as <b>retirement income</b> (퇴직소득), which has its own tax schedule separate from regular employment income. The good news is that retirement income tax is generally <b>much lower</b> than regular income tax, especially for workers with longer service periods.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The tax calculation involves several steps: first, a <b>service-length deduction</b> (근속연수공제) reduces your taxable amount based on how many years you worked. Then the remaining amount is annualized, taxed at progressive rates, and multiplied back by your service years. The longer you worked, the more favorable the deduction.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          For a foreign worker who worked 2 years and received about 6 million KRW in severance, the retirement income tax is often minimal -- sometimes just a few tens of thousands of won.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">The 14-Day Payment Deadline</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          By law, your employer must pay your severance within <b>14 days</b> of your last working day. If they fail to do so without a valid, mutually agreed-upon reason for extension, they are liable for <b>late payment interest at 20% per year</b> on the unpaid amount. This deadline applies regardless of whether you resigned, were fired, or your contract simply ended.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">What If Your Employer Refuses to Pay?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Unfortunately, some employers -- particularly smaller hagwon or businesses -- try to avoid paying severance to foreign workers. Here is the step-by-step process to claim your rights:
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]">Send a written request (email or registered letter) to your employer demanding severance payment with a clear deadline</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]">File a complaint (진정) at your local Ministry of Employment and Labor office (고용노동부 / 지방고용노동청). You can also file online. Bring your employment contract and pay stubs as evidence.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 3</span>
            <span className="text-sm text-[#4E5968]">The labor office will investigate and mediate. Most cases are resolved at this stage. Employers face up to 3 years in prison or 30 million KRW in fines for non-payment.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 4</span>
            <span className="text-sm text-[#4E5968]">If mediation fails, you can file a civil lawsuit. Free legal aid is available through the Korea Legal Aid Corporation (대한법률구조공단) for low-income workers.</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Tip:</b> You can file a labor complaint even after leaving Korea. Contact the nearest Korean embassy or consult with a Korean labor attorney. The statute of limitations for severance claims is 3 years.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">DC vs DB Retirement Pension Systems</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Some employers use a retirement pension system instead of the traditional lump-sum severance. There are two main types:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>DB (Defined Benefit / 확정급여형):</b> The employer bears the investment risk. Your payout is calculated the same way as traditional severance -- based on your final average wage and service period. This is generally better if your salary increases steadily over time.</li>
          <li><b>DC (Defined Contribution / 확정기여형):</b> The employer deposits at least 1/12 of your annual salary into your pension account each year, and you manage the investments. Your final payout depends on investment performance. This can be better if you expect your salary to remain flat or decrease.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Calculate Your Severance Pay</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-4">
          Enter your start date, end date, and salary information to instantly calculate your expected severance pay amount.
        </p>
        <Link
          href="/en/severance"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
        >
          Severance Pay Calculator &rarr;
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
