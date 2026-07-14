import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korea Income Tax Guide for Foreigners - Everything You Need to Know (2026)",
  description:
    "Complete guide to Korean income tax for expats: progressive rates, flat tax option, deductions, year-end settlement, and filing tips.",
  alternates: { canonical: "https://moduncalc.com/en/guide/tax-guide" },
  openGraph: {
    title: "Korea Income Tax Guide for Foreigners (2026)",
    description:
      "Complete guide to Korean income tax for expats: progressive rates, flat tax option, deductions, and filing tips.",
    url: "https://moduncalc.com/en/guide/tax-guide",
  },
};

const faqItems = [
  {
    q: "Do foreigners pay the same income tax as Korean citizens?",
    a: "Foreigners working in Korea are subject to the same progressive income tax rates (6% to 45%) as Korean citizens. However, foreigners have an exclusive option under Article 18-2 of the Income Tax Act to elect a flat 19% tax rate on their gross salary instead. This election must be made during year-end settlement or when filing a tax return, and it cannot be changed retroactively for that tax year.",
  },
  {
    q: "When should I choose the flat 19% tax rate over progressive rates?",
    a: "The flat 19% rate generally becomes advantageous when your annual gross salary exceeds approximately 160 million KRW. Below that threshold, the progressive tax system with its various deductions and credits usually results in a lower effective tax rate. You should calculate both scenarios each year because changes in your deductions or salary may shift the break-even point.",
  },
  {
    q: "Can foreigners claim deductions during year-end settlement (연말정산)?",
    a: "Yes, if you choose the progressive tax system, you can claim most of the same deductions as Korean citizens, including national pension contributions, health insurance premiums, housing rent (월세) deductions, and credit card spending deductions. However, some deductions like the personal exemption for overseas dependents require additional documentation. If you elect the flat 19% rate, you cannot claim any deductions or credits.",
  },
  {
    q: "What happens if I miss the year-end settlement deadline?",
    a: "If you miss the year-end settlement period (typically January to February), you can still file a comprehensive income tax return (종합소득세 신고) during the May filing period (May 1-31). You can use the National Tax Service's Hometax portal (hometax.go.kr) to file online. Late filing may result in penalties, so it is best to file on time or seek help from your employer's HR department.",
  },
];

export default function TaxGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korea Income Tax Guide for Foreigners"
      description="Everything you need to know about Korean income tax as a foreign worker: progressive rates, the flat tax option, deductions, and filing deadlines."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Korea Income Tax Guide for Foreigners - Everything You Need to Know (2026)",
            description:
              "Complete guide to Korean income tax for expats: progressive rates, flat tax option, deductions, year-end settlement, and filing tips.",
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
        <h2 className="text-base font-extrabold mb-3">Overview of Korean Income Tax</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          South Korea taxes individuals on their worldwide income if they are tax residents, or on Korean-source income only if they are non-residents. As a foreigner working in Korea, you are generally considered a tax resident if you have stayed in the country for 183 days or more during the tax year, or if you have a domicile or place of abode in Korea.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Your employer withholds income tax from your monthly paycheck using a simplified tax table (간이세액표). At the end of the year, the exact tax liability is calculated through a process called <b>year-end settlement</b> (연말정산, pronounced &quot;yeonmal-jeonsan&quot;). Any overpaid tax is refunded, and any underpaid tax is collected.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Progressive Tax Brackets (2026)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea uses a progressive tax system with 8 brackets. The rates below apply to <b>taxable income</b> (총급여 minus deductions), not gross salary. Local income tax (지방소득세) adds an additional 10% of your income tax.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Taxable Income (KRW)</th>
                <th className="text-left p-2 font-bold">Rate</th>
                <th className="text-left p-2 font-bold">Cumulative Tax</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Up to 14M</td>
                <td className="p-2">6%</td>
                <td className="p-2">-</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">14M ~ 50M</td>
                <td className="p-2">15%</td>
                <td className="p-2">840K + 15% over 14M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">50M ~ 88M</td>
                <td className="p-2">24%</td>
                <td className="p-2">6.24M + 24% over 50M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">88M ~ 150M</td>
                <td className="p-2">35%</td>
                <td className="p-2">15.36M + 35% over 88M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">150M ~ 300M</td>
                <td className="p-2">38%</td>
                <td className="p-2">37.06M + 38% over 150M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">300M ~ 500M</td>
                <td className="p-2">40%</td>
                <td className="p-2">94.06M + 40% over 300M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">500M ~ 1B</td>
                <td className="p-2">42%</td>
                <td className="p-2">174.06M + 42% over 500M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Over 1B</td>
                <td className="p-2">45%</td>
                <td className="p-2">384.06M + 45% over 1B</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">The Flat 19% Tax Option (Article 18-2)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Under <b>Article 18-2 of the Income Tax Act</b>, foreign workers in Korea can elect to pay a flat 19% tax rate on their entire gross earned income instead of using the progressive tax brackets. This is a unique benefit available only to foreigners and was designed to attract skilled foreign talent.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Key rules of the flat tax:</b> The 19% rate applies to your total gross salary with no deductions or credits allowed. You cannot claim personal exemptions, credit card deductions, pension contribution deductions, or any other tax benefits. Local income tax (1.9%) is added on top, making the effective rate <b>20.9%</b>.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Break-even analysis:</b> For most foreigners earning under approximately <b>160 million KRW per year</b>, the progressive tax system with standard deductions will result in lower taxes than the flat 19% rate. Above that threshold, the flat rate becomes increasingly advantageous because the top progressive brackets (38%~45%) far exceed 19%. Calculate both options using our{" "}
          <Link href="/en/tax-comparison" className="text-[var(--primary)] font-bold hover:underline">Tax Comparison Calculator</Link> to see which saves you more.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Year-End Settlement (연말정산) for Foreigners</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Year-end settlement happens every January-February. Your employer collects documentation of your deductions and calculates your actual tax liability for the previous year. If you overpaid through monthly withholdings, you receive a refund in your February or March paycheck. If you underpaid, the difference is deducted.
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]">Log in to Hometax (hometax.go.kr) and download your simplified year-end settlement data (간소화 자료)</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]">Gather additional receipts not captured in the system (overseas tuition, certain donations, etc.)</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 3</span>
            <span className="text-sm text-[#4E5968]">Submit all documents to your employer&apos;s HR/payroll department by the deadline</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 4</span>
            <span className="text-sm text-[#4E5968]">Receive refund or pay additional tax through your February/March paycheck</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Common Deductions Foreigners Can Claim</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If you choose the <b>progressive tax system</b> (not the flat 19%), you are eligible for most of the same deductions as Korean citizens. Here are the key ones:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>National Pension (국민연금):</b> Your contributions are fully deductible as income deduction.</li>
          <li><b>Health Insurance (건강보험):</b> Premiums including long-term care are deductible.</li>
          <li><b>Credit/Debit Card Spending:</b> Amounts exceeding 25% of your gross salary are deductible at 15% (credit) or 30% (debit/cash receipts).</li>
          <li><b>Housing Rent (월세):</b> Up to 17% tax credit on rent payments (income threshold applies).</li>
          <li><b>Pension Savings (연금저축):</b> Up to 6M KRW per year in tax credit contributions.</li>
          <li><b>Medical Expenses (의료비):</b> Amounts exceeding 3% of gross salary qualify for 15% tax credit.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>What you CANNOT deduct under the flat 19% tax:</b> If you elect the flat rate, you forfeit ALL deductions and credits. No pension deduction, no card spending deduction, no housing rent credit -- nothing. The 19% applies to your full gross income. This is why the flat tax only makes sense at high income levels.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">How to Choose: Decision Flowchart</h2>
        <div className="space-y-2 mb-3">
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <p className="text-sm text-[#4E5968] leading-relaxed">
              <b>1.</b> Is your annual gross salary above 160M KRW? If <b>yes</b>, strongly consider the flat 19% rate. If <b>no</b>, proceed to step 2.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <p className="text-sm text-[#4E5968] leading-relaxed">
              <b>2.</b> Do you have significant deductions (large rent payments, pension savings, dependents)? If <b>yes</b>, the progressive system will likely save you more. If <b>no</b>, proceed to step 3.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <p className="text-sm text-[#4E5968] leading-relaxed">
              <b>3.</b> Calculate both scenarios using the{" "}
              <Link href="/en/tax-comparison" className="text-[var(--primary)] font-bold hover:underline">Tax Comparison Calculator</Link>. Compare the final amounts and choose the lower one. You can also estimate your take-home pay with the{" "}
              <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link>.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Key Deadlines</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">When</th>
                <th className="text-left p-2 font-bold">What</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Mid-January</td>
                <td className="p-2">Hometax simplified data service opens</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Late January</td>
                <td className="p-2">Submit documents to employer</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">February paycheck</td>
                <td className="p-2">Refund or additional tax applied</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">May 1-31</td>
                <td className="p-2">Comprehensive income tax filing (if you missed year-end settlement or have other income)</td>
              </tr>
            </tbody>
          </table>
        </div>
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
