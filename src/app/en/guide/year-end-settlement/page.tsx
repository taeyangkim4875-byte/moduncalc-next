import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Year-End Tax Settlement for Foreigners in Korea (연말정산 Guide)",
  description:
    "Step-by-step guide to year-end tax settlement for foreign workers: what to submit, what you can deduct, and how to get your refund.",
  alternates: { canonical: "https://moduncalc.com/en/guide/year-end-settlement" },
  openGraph: {
    title: "Year-End Tax Settlement for Foreigners in Korea (연말정산 Guide)",
    description:
      "Step-by-step guide to year-end tax settlement for foreign workers: what to submit, what you can deduct, and how to get your refund.",
    url: "https://moduncalc.com/en/guide/year-end-settlement",
  },
};

const faqItems = [
  {
    q: "Do foreigners have to do year-end settlement in Korea?",
    a: "Yes, all employed foreigners in Korea must participate in the year-end settlement (연말정산) process. Your employer will initiate the process in January or February each year. If you chose the 19% flat tax rate (외국인 단일세율), your settlement is simpler because no deductions apply -- your tax is simply 19% of gross income. If you use progressive tax rates, you can claim various deductions to reduce your tax burden. Failing to participate may result in overpaying taxes since you would miss out on potential refunds.",
  },
  {
    q: "Should foreigners choose flat tax or progressive tax for year-end settlement?",
    a: "It depends on your income level and eligible deductions. The 19% flat tax is simpler and often better for high earners (roughly above 45-50 million KRW annually) because no deductions are needed and the effective rate stays at 19%. Progressive tax rates start at 6% and go up to 45%, but you can claim deductions that significantly reduce your taxable income. For lower to mid-range salaries, progressive rates with full deductions often result in a lower effective tax rate. Use our Tax Comparison Calculator to compare both options with your actual numbers before deciding.",
  },
  {
    q: "Can foreigners claim housing rent deduction (월세 세액공제)?",
    a: "Yes, foreigners using progressive tax rates can claim the housing rent deduction (월세 세액공제) if they meet the requirements: total annual salary of 70 million KRW or less, not a homeowner, and paying rent on a property with a proper lease contract (임대차계약서) registered in your name. The deduction is 17% of annual rent paid (up to 10 million KRW per year) for earners under 55 million KRW, or 15% for earners between 55-70 million KRW. You will need your lease contract and proof of rent payments (bank transfer records).",
  },
  {
    q: "What is the Simplified Tax Service (간소화서비스) and can foreigners use it?",
    a: "The Simplified Tax Service (연말정산 간소화서비스) is an online system on Hometax (홈택스) that automatically collects your tax-deductible spending data -- including insurance premiums, medical expenses, and pension contributions -- from various institutions. Foreigners can use it if they have a Hometax account, which requires an ARC and Korean phone number. Log in during the January-February period, download your simplified documents (간소화자료), and submit them to your employer. Note that some foreign-specific deductions may not appear automatically and need to be submitted manually.",
  },
];

export default function YearEndSettlementPage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Year-End Tax Settlement (연말정산)"
      description="A complete guide for foreign workers in Korea: understand the year-end tax settlement process, know what deductions you can claim, and maximize your tax refund."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Year-End Tax Settlement for Foreigners in Korea (연말정산 Guide)",
            description:
              "Step-by-step guide to year-end tax settlement for foreign workers: what to submit, what you can deduct, and how to get your refund.",
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
        <h2 className="text-base font-extrabold mb-3">What Is Year-End Settlement (연말정산)?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Year-end settlement (연말정산 / yeonmal-jeonsan) is Korea&apos;s annual process of reconciling the income taxes withheld from your paychecks throughout the year against what you actually owe. Every month, your employer withholds estimated income tax based on your salary and a standard deduction assumption. At year-end, the actual calculation is done considering your real deductions and credits. If too much tax was withheld, you receive a refund; if too little was withheld, you owe additional tax.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Timeline:</b> The process runs from mid-January through February. Your employer will ask you to submit documents in January, then process the settlement and include any refund or additional tax in your February (sometimes March) paycheck. The key dates are: mid-January for Hometax Simplified Service (간소화서비스) opening, late January for document submission to your employer, and February for receiving your result.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Flat Tax vs Progressive Tax: How Settlement Differs</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          As a foreign worker in Korea, your year-end settlement experience depends entirely on which tax method you chose:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Feature</th>
                <th className="text-left p-2 font-bold">19% Flat Tax (단일세율)</th>
                <th className="text-left p-2 font-bold">Progressive Tax (종합소득세율)</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Tax calculation</td>
                <td className="p-2">19% of gross salary, no exceptions</td>
                <td className="p-2">6-45% brackets after deductions</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Deductions allowed</td>
                <td className="p-2">None</td>
                <td className="p-2">Many (see below)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Settlement complexity</td>
                <td className="p-2">Very simple</td>
                <td className="p-2">Requires document preparation</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Refund potential</td>
                <td className="p-2">Minimal (only if withholding was miscalculated)</td>
                <td className="p-2">Can be significant with proper deductions</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Best for</td>
                <td className="p-2">High earners (roughly above 45-50M KRW/year)</td>
                <td className="p-2">Lower-to-mid range earners with eligible deductions</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Use our{" "}
          <Link href="/en/tax-comparison" className="text-[var(--primary)] font-bold hover:underline">Tax Comparison Calculator</Link> to compare which method saves you more money based on your actual income and deductions.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Deductions Foreigners CAN Claim</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If you use progressive tax rates, the following deductions are available to foreign workers and can significantly reduce your taxable income:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Personal exemption (본인 공제):</b> A basic deduction of 1,500,000 KRW for yourself. This is automatic and does not require any documents.</li>
          <li><b>Spouse exemption (배우자 공제):</b> An additional 1,500,000 KRW deduction if your spouse resides in Korea and earns less than 1 million KRW per year (or has no income). Your spouse does not need to be Korean.</li>
          <li><b>Dependent exemption (부양가족 공제):</b> 1,500,000 KRW per qualifying dependent (children, parents) living with you in Korea.</li>
          <li><b>National Pension contributions (국민연금 납입액):</b> Your 4.5% National Pension contributions are fully deductible from your income.</li>
          <li><b>Health Insurance premiums (건강보험료):</b> Both your health insurance and long-term care insurance premiums are deductible.</li>
          <li><b>Housing rent deduction (월세 세액공제):</b> If you pay rent and earn 70 million KRW or less annually, you can claim 15-17% of your annual rent as a tax credit (up to 10 million KRW in rent).</li>
          <li><b>Retirement pension contributions (연금저축):</b> Voluntary contributions to qualified retirement pension plans are deductible up to certain limits.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Deductions Foreigners Usually CANNOT Claim</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Some deductions that Korean nationals commonly claim are difficult or impossible for most foreigners:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Credit card spending deduction (신용카드 소득공제):</b> Requires spending above 25% of your gross salary on Korean credit or debit cards registered in your name. While technically available to foreigners, you need Korean-issued cards with sufficient spending history. Many foreigners do not meet the minimum threshold or do not have Korean credit cards.</li>
          <li><b>Education expense deduction (교육비 세액공제):</b> Primarily for Korean school tuition (elementary through university). International school tuition for your children is generally not eligible. However, if your children attend a Korean public or private school, this deduction may apply.</li>
          <li><b>Donation deduction (기부금 세액공제):</b> Donations to Korean-registered charities are deductible, but donations to foreign organizations are not. Few foreigners have significant Korean charitable giving.</li>
          <li><b>Housing savings (주택마련저축 공제):</b> Requires participation in specific Korean housing savings programs, which most foreigners do not join.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Important:</b> Even if you cannot claim many deductions, the basic personal exemption, pension contributions, and health insurance premiums alone can result in meaningful tax savings under progressive rates for lower-income earners.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Documents to Prepare</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Your employer will request the following documents during the settlement period. Prepare them in advance to avoid delays:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Simplified Tax Service data (간소화자료):</b> Download from Hometax (홈택스) website. This automatically includes your insurance premiums, pension contributions, and other tracked deductions.</li>
          <li><b>Lease contract (임대차계약서):</b> If claiming housing rent deduction, provide a copy of your registered lease agreement.</li>
          <li><b>Rent payment proof (월세 납입 증명):</b> Bank transfer records showing monthly rent payments to your landlord.</li>
          <li><b>Family relation documents:</b> If claiming spouse or dependent exemptions, provide marriage certificate and/or birth certificates (with Korean translation if needed).</li>
          <li><b>Resident registration (주민등록등본):</b> Foreigners can use their ARC-based registration document from the immigration office.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Using Hometax Simplified Service (간소화서비스):</b> Log into{" "}
          <Link href="https://www.hometax.go.kr" className="text-[var(--primary)] font-bold hover:underline">Hometax</Link> with your ARC-linked account from mid-January. Navigate to 연말정산 간소화 and download your consolidated deduction data as a PDF. Submit this PDF to your employer&apos;s HR/accounting department along with any additional documents not captured by the automated system. Check your{" "}
          <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link> results to understand your current withholding amounts.
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
