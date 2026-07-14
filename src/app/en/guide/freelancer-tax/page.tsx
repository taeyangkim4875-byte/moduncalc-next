import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Freelancer Tax Guide in Korea - Tax Rates, Filing & Tips for Foreigners",
  description:
    "How freelance and self-employed taxes work in Korea for foreigners: 3.3% withholding, comprehensive income tax, and filing obligations.",
  alternates: { canonical: "https://moduncalc.com/en/guide/freelancer-tax" },
  openGraph: {
    title: "Freelancer Tax Guide in Korea - Tax Rates, Filing & Tips for Foreigners",
    description:
      "How freelance and self-employed taxes work in Korea for foreigners: 3.3% withholding, comprehensive income tax, and filing obligations.",
    url: "https://moduncalc.com/en/guide/freelancer-tax",
  },
};

const faqItems = [
  {
    q: "Is the 3.3% withholding my final tax as a freelancer in Korea?",
    a: "No, absolutely not. The 3.3% withholding (3% income tax + 0.3% local income tax) on your freelance payments is just a prepayment toward your final tax liability. It is called withholding at source (사업소득 원천징수). Your actual tax rate depends on your total annual income and applicable deductions. During the May Comprehensive Income Tax (종합소득세) filing, your real tax is calculated using progressive rates (6-45%). The 3.3% already withheld is credited against this amount. If your actual tax is higher, you owe the difference. If it is lower, you receive a refund.",
  },
  {
    q: "Can freelancers use the 19% flat tax rate for foreigners?",
    a: "Generally no. The 19% flat tax rate (외국인 단일세율) is designed for employed foreign workers (근로소득자) receiving salary income. Freelance income is classified as business income (사업소득), which falls under the Comprehensive Income Tax (종합소득세) system and uses progressive tax rates from 6% to 45%. If you have both employment income and freelance income, the flat tax may apply only to the employment portion, while the freelance portion is taxed progressively. Consult a tax professional if you have mixed income sources.",
  },
  {
    q: "Do freelancers in Korea need to register for VAT?",
    a: "It depends on your annual revenue. If your annual revenue exceeds approximately 40 million KRW, you should register as a simplified VAT taxpayer (간이과세자). If it exceeds 80 million KRW, you become a general VAT taxpayer (일반과세자) and must charge 10% VAT on your invoices and file quarterly VAT returns. Below 40 million KRW, you are exempt from VAT registration but still must file income tax. Note that certain service categories have different thresholds, so consult the National Tax Service (국세청) or a tax advisor for your specific business type.",
  },
  {
    q: "What social insurance do freelancers need to pay in Korea?",
    a: "Freelancers (자영업자 / 프리랜서) have different social insurance obligations than employees. National Pension (국민연금): You must enroll as a regional subscriber and pay the full 9% yourself (employees split 4.5% with their employer). National Health Insurance (건강보험): You enroll as a regional subscriber with premiums based on your income, property, and car ownership -- often higher than employee premiums for the same income. Employment Insurance (고용보험): Optional for self-employed individuals, but available through voluntary enrollment. Industrial Accident Insurance (산재보험): Not required for solo freelancers but available through special enrollment for certain professions.",
  },
];

export default function FreelancerTaxPage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Freelancer Tax Guide in Korea"
      description="Everything foreign freelancers and self-employed workers need to know about Korean taxes: the 3.3% withholding, comprehensive income tax filing, deductions, and common mistakes to avoid."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Freelancer Tax Guide in Korea - Tax Rates, Filing & Tips for Foreigners",
            description:
              "How freelance and self-employed taxes work in Korea for foreigners: 3.3% withholding, comprehensive income tax, and filing obligations.",
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
        <h2 className="text-base font-extrabold mb-3">Freelancer vs Employee: Tax Treatment Differences</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          In Korea, the tax treatment for freelancers (프리랜서) and employees (근로자) is fundamentally different. Understanding this distinction is critical because it affects how much tax you pay, when you file, and what deductions you can claim.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Feature</th>
                <th className="text-left p-2 font-bold">Employee (근로자)</th>
                <th className="text-left p-2 font-bold">Freelancer (프리랜서)</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Income type</td>
                <td className="p-2">Earned income (근로소득)</td>
                <td className="p-2">Business income (사업소득)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Withholding rate</td>
                <td className="p-2">Progressive (estimated monthly)</td>
                <td className="p-2">3.3% flat withholding</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Tax settlement</td>
                <td className="p-2">Year-end settlement (연말정산) via employer</td>
                <td className="p-2">Self-filing in May (종합소득세)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Social insurance</td>
                <td className="p-2">Split with employer (4 insurances)</td>
                <td className="p-2">Full cost borne by freelancer</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">19% flat tax option</td>
                <td className="p-2">Available for foreigners</td>
                <td className="p-2">Generally NOT available</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Severance pay</td>
                <td className="p-2">Entitled after 1 year</td>
                <td className="p-2">Not entitled</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Warning:</b> Some Korean companies misclassify employees as freelancers to avoid paying social insurance and severance. If you work fixed hours at a specific location under a manager&apos;s direction, you may legally be an employee regardless of what your contract says. This matters for tax filing and labor protections.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">The 3.3% Withholding (사업소득 원천징수)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          When a Korean company pays a freelancer, they withhold 3.3% from each payment: 3% as income tax (소득세) and 0.3% as local income tax (지방소득세). This is called withholding at source (원천징수).
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Critical point:</b> This 3.3% is NOT your final tax. It is merely a prepayment -- an advance payment against your actual tax liability for the year. Think of it as a deposit. Your real tax rate will be determined when you file your Comprehensive Income Tax return (종합소득세 신고) in May of the following year.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          For example, if you earn 5,000,000 KRW from a freelance project, the company withholds 165,000 KRW (3.3%) and pays you 4,835,000 KRW. That 165,000 KRW is reported to the National Tax Service (국세청) and credited to your account. When you file in May, if your actual tax liability is higher than the total withheld throughout the year, you pay the difference. If it is lower, you receive a refund.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Important:</b> If your annual freelance income is low enough that your effective tax rate after deductions is below 3.3%, you will receive a refund when you file. Many freelancers with modest income actually get money back in May.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Comprehensive Income Tax Filing in May (종합소득세)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Unlike employees whose taxes are settled by their employer in January-February, freelancers must file their own Comprehensive Income Tax return (종합소득세 신고) during May 1-31 each year, reporting the previous year&apos;s income. This is done through Hometax (홈택스) online or at your local tax office (세무서).
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea&apos;s progressive tax brackets apply to your net taxable income after deductions:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Taxable Income (KRW)</th>
                <th className="text-left p-2 font-bold">Tax Rate</th>
                <th className="text-left p-2 font-bold">Progressive Deduction</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Up to 14M</td>
                <td className="p-2">6%</td>
                <td className="p-2">0</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">14M - 50M</td>
                <td className="p-2">15%</td>
                <td className="p-2">1,260,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">50M - 88M</td>
                <td className="p-2">24%</td>
                <td className="p-2">5,760,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">88M - 150M</td>
                <td className="p-2">35%</td>
                <td className="p-2">15,440,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">150M - 300M</td>
                <td className="p-2">38%</td>
                <td className="p-2">19,940,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">300M - 500M</td>
                <td className="p-2">40%</td>
                <td className="p-2">25,940,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">500M - 1B</td>
                <td className="p-2">42%</td>
                <td className="p-2">35,940,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Over 1B</td>
                <td className="p-2">45%</td>
                <td className="p-2">65,940,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Plus 10% local income tax (지방소득세) on the calculated amount. Use our{" "}
          <Link href="/en/tax-comparison" className="text-[var(--primary)] font-bold hover:underline">Tax Comparison Calculator</Link> to see how these brackets apply to your income level.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Necessary Expenses Deduction (필요경비)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          As a freelancer, you can deduct business-related expenses from your gross income before calculating tax. Korea offers two methods:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Standard deduction rate (기준경비율 / 단순경비율):</b> The tax office assigns standard expense rates by business type. For example, private tutoring might have a 60-70% standard expense rate, meaning only 30-40% of your income is taxable. This is the simpler method and is available for lower-income freelancers.</li>
          <li><b>Actual expense method (실제 경비):</b> You track and report your actual business expenses with receipts and documentation. This method requires more bookkeeping but can result in higher deductions if your actual expenses exceed the standard rate. You must keep all receipts, invoices, and financial records for 5 years.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Which to choose:</b> If your actual business expenses are low (e.g., you are a language tutor working from home), the standard deduction rate is usually more beneficial and much simpler. If you have significant equipment purchases, office rent, travel costs, or subcontractor payments, the actual expense method may save you more.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">VAT Registration & Quarterly Payments</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>VAT registration (부가가치세 사업자등록):</b> If your annual freelance revenue exceeds approximately 40 million KRW, you should register as a simplified VAT taxpayer (간이과세자). Above 80 million KRW, you become a general taxpayer (일반과세자) who must charge 10% VAT on invoices and file semi-annual VAT returns. Below 40 million KRW, you are generally exempt from VAT obligations.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Quarterly estimated tax (중간예납):</b> If your previous year&apos;s income tax exceeded a certain threshold, the tax office may require you to make estimated quarterly payments. This is essentially paying taxes in advance based on your previous year&apos;s income to prevent a large lump-sum tax bill in May. You will receive a notice from the NTS (국세청) if this applies to you.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Record keeping:</b> Maintain organized records of all income received and expenses incurred. Keep bank statements, contracts, invoices, and receipts for at least 5 years. The Korean tax authority (국세청) can audit freelancers, and proper documentation is your best defense. Consider using accounting software or hiring a Korean tax accountant (세무사) if your freelance income is substantial.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Common Mistakes Freelance Foreigners Make</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Avoid these costly errors that foreign freelancers commonly make in Korea:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Thinking 3.3% is the final tax:</b> The most common mistake. Many freelancers assume the 3.3% withheld is all they owe and skip the May filing. This can result in penalties, interest, and a much larger tax bill when the NTS catches up.</li>
          <li><b>Not filing in May:</b> Even if you expect a refund, you must file the Comprehensive Income Tax return. Failure to file results in penalties of 20% of the unpaid tax plus daily interest charges.</li>
          <li><b>Missing the deduction for National Pension:</b> Freelancers paying National Pension as regional subscribers can deduct these contributions, but many forget to include them.</li>
          <li><b>Not registering for social insurance:</b> Freelancers are still required to enroll in National Pension and Health Insurance. Avoiding enrollment can lead to back-payments with penalties when discovered.</li>
          <li><b>Assuming the 19% flat tax applies:</b> The foreign worker flat tax is for employed workers (근로소득), not freelance business income (사업소득). Filing under the wrong category creates serious tax issues.</li>
          <li><b>Poor record keeping:</b> Not keeping receipts and contracts makes it impossible to claim actual expense deductions during an audit. Digital copies of all documents are strongly recommended.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          For a detailed breakdown of how your employment income is taxed, see our{" "}
          <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link>. If you have both employed and freelance income, consult a licensed Korean tax accountant (세무사) to ensure proper filing.
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
