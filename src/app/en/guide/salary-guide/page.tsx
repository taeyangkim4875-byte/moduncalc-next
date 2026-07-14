import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Understanding Your Korean Payslip - Deductions Explained for Foreigners",
  description:
    "Decode your Korean 급여명세서: what each deduction means, how much you should be paying, and common payslip errors to watch for.",
  alternates: { canonical: "https://moduncalc.com/en/guide/salary-guide" },
  openGraph: {
    title: "Understanding Your Korean Payslip - Deductions Explained for Foreigners",
    description:
      "Decode your Korean 급여명세서: what each deduction means, how much you should be paying, and common payslip errors to watch for.",
    url: "https://moduncalc.com/en/guide/salary-guide",
  },
};

const faqItems = [
  {
    q: "Is my employer required to give me a payslip in Korea?",
    a: "Yes, under the amended Labor Standards Act, all employers in Korea must provide employees with a written payslip (급여명세서) every pay period. The payslip must itemize your gross pay, each deduction, and your net pay. If your employer does not provide a payslip, they can be fined up to 5 million KRW. You have the right to request a payslip and your employer must comply.",
  },
  {
    q: "Why is my first month's paycheck lower than expected?",
    a: "Your first month's pay is often lower for several reasons: you may have started mid-month and are being paid only for the days you worked; your employer may be withholding the first month's social insurance contributions (which sometimes includes a retroactive charge); and income tax withholding may be calculated at a higher initial rate. Check your payslip details and ask HR if anything seems incorrect.",
  },
  {
    q: "What is the meal allowance (식대) and why is it separate on my payslip?",
    a: "The meal allowance (식대) of up to 200,000 KRW per month is classified as a non-taxable benefit (비과세). This means it is not subject to income tax or social insurance contributions. Many employers separate this amount on the payslip specifically because it reduces your taxable income. If your contract includes a meal allowance, make sure it appears as a separate non-taxable line item.",
  },
  {
    q: "How do I verify that my deductions are correct?",
    a: "Calculate each deduction yourself using the 2026 rates: National Pension at 4.75% of your gross (up to the income cap of 6,370,000 KRW), Health Insurance at 3.595% divided by 2, Long-term Care at 13.14% of your HI premium, and Employment Insurance at 0.9%. Compare these with your payslip. For income tax, check the National Tax Service simplified tax table (간이세액표) for your salary bracket. Use our Salary Calculator to verify your expected net pay.",
  },
];

export default function SalaryGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Understanding Your Korean Payslip"
      description="A line-by-line breakdown of Korean payslip deductions for foreign workers: what each item means, how much you should pay, and common errors to watch for."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Understanding Your Korean Payslip - Deductions Explained for Foreigners",
            description:
              "Decode your Korean 급여명세서: what each deduction means, how much you should be paying, and common payslip errors to watch for.",
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
        <h2 className="text-base font-extrabold mb-3">Anatomy of a Korean Payslip (급여명세서)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Your Korean payslip (급여명세서, pronounced &quot;geupyeo-myeongseseo&quot;) may look intimidating at first, especially when everything is written in Korean. But once you understand the structure, it is actually quite straightforward. Every payslip in Korea follows a similar format with two main sections:
        </p>
        <div className="grid grid-cols-1 gap-3 mb-3">
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Payment Side (지급 항목)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Lists everything your employer pays you: base salary (기본급), overtime pay (연장근로수당), bonuses (상여금), meal allowance (식대), transportation allowance (교통비), and any other benefits. The total of all these items is your <b>gross salary</b> (세전 급여, literally &quot;before-tax salary&quot;).
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Deduction Side (공제 항목)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Lists everything deducted from your gross pay: social insurance contributions, income tax, local income tax, and any other deductions. Your <b>net salary</b> (세후 급여, literally &quot;after-tax salary&quot;) is what you actually receive in your bank account.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Line-by-Line Deduction Breakdown (2026 Rates)</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Deduction (Korean)</th>
                <th className="text-left p-2 font-bold">Rate</th>
                <th className="text-left p-2 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">National Pension (국민연금)</td>
                <td className="p-2">4.75%</td>
                <td className="p-2">Capped at monthly income of 6,370,000 KRW</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Health Insurance (건강보험)</td>
                <td className="p-2">3.595% / 2 = 1.7975%</td>
                <td className="p-2">Employee pays half of total 3.595%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Long-term Care (장기요양보험)</td>
                <td className="p-2">13.14% of HI premium</td>
                <td className="p-2">Calculated on your HI amount, split 50/50</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Employment Insurance (고용보험)</td>
                <td className="p-2">0.9%</td>
                <td className="p-2">Employee share only; employer pays additional</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Income Tax (소득세)</td>
                <td className="p-2">Progressive 6~45% or Flat 19%</td>
                <td className="p-2">Withheld monthly per simplified tax table</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Local Income Tax (지방소득세)</td>
                <td className="p-2">10% of income tax</td>
                <td className="p-2">Always exactly 10% of your income tax amount</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Example Payslip: 4,000,000 KRW Monthly Salary</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Here is what a typical payslip looks like for an unmarried foreigner earning 4,000,000 KRW per month (approximately 48M KRW annual salary), with a 200,000 KRW non-taxable meal allowance:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Item</th>
                <th className="text-right p-2 font-bold">Amount (KRW)</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold" colSpan={2}>Payment (지급)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 pl-5">Base Salary (기본급)</td>
                <td className="p-2 text-right">3,800,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 pl-5">Meal Allowance (식대, non-taxable)</td>
                <td className="p-2 text-right">200,000</td>
              </tr>
              <tr className="border-t border-[#eee] bg-[var(--bg)]">
                <td className="p-2 font-bold">Gross Total (지급 합계)</td>
                <td className="p-2 text-right font-bold">4,000,000</td>
              </tr>
              <tr className="border-t-2 border-[#ccc]">
                <td className="p-2 font-bold" colSpan={2}>Deductions (공제)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 pl-5">National Pension (국민연금)</td>
                <td className="p-2 text-right">180,500</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 pl-5">Health Insurance (건강보험)</td>
                <td className="p-2 text-right">68,310</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 pl-5">Long-term Care (장기요양)</td>
                <td className="p-2 text-right">8,976</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 pl-5">Employment Insurance (고용보험)</td>
                <td className="p-2 text-right">34,200</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 pl-5">Income Tax (소득세)</td>
                <td className="p-2 text-right">~123,480</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 pl-5">Local Income Tax (지방소득세)</td>
                <td className="p-2 text-right">~12,348</td>
              </tr>
              <tr className="border-t border-[#eee] bg-[var(--bg)]">
                <td className="p-2 font-bold">Deduction Total (공제 합계)</td>
                <td className="p-2 text-right font-bold">~427,814</td>
              </tr>
              <tr className="border-t-2 border-[var(--primary)]">
                <td className="p-2 font-bold text-[var(--primary)]">Net Pay (실수령액)</td>
                <td className="p-2 text-right font-bold text-[var(--primary)]">~3,572,186</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Income tax amounts are approximate as they depend on the simplified tax table and personal circumstances. Calculate your exact net pay with our{" "}
          <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link>.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Non-Taxable Items (비과세)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Certain portions of your salary are classified as non-taxable (비과세), meaning they are exempt from income tax and social insurance calculations. Common non-taxable items include:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Meal allowance (식대):</b> Up to 200,000 KRW per month. This is the most common non-taxable benefit. If your company provides free meals instead, this allowance may not apply.</li>
          <li><b>Transportation/commuting allowance (자가운전보조금):</b> Up to 200,000 KRW per month for employees who use their own vehicle for work purposes.</li>
          <li><b>Childcare allowance (보육수당):</b> Up to 200,000 KRW per month for employees with children aged 6 or under.</li>
          <li><b>Overtime pay for production workers:</b> Overtime, night, and holiday work pay is non-taxable up to 2.4M KRW per year for qualifying production/service workers earning under a certain threshold.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Bonuses and How They Are Taxed</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Bonuses (상여금) in Korea are taxed as regular income. When your company pays a bonus, it is added to your monthly salary for that pay period, and income tax is withheld at the higher combined amount. This often results in a noticeably larger tax deduction in bonus months.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Common bonus types include: performance bonuses (성과급), holiday bonuses (설·추석 상여), signing bonuses, and annual bonuses specified in your employment contract. Some contracts express salary as &quot;annual salary including bonuses&quot; (ex: &quot;연봉 48,000,000원, 상여 별도&quot; means the bonus is separate from the stated 48M). Always clarify this when negotiating your offer.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Overtime Pay Calculation</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Under the Korean Labor Standards Act, overtime work (연장근로) is paid at <b>150% of your hourly rate</b>. Night work (야간근로, 10 PM to 6 AM) and holiday work (휴일근로) are also paid at 150%. If overtime falls on a holiday or at night, the premiums stack.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Work Type</th>
                <th className="text-left p-2 font-bold">Rate</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Regular hours</td>
                <td className="p-2">100%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Overtime (연장근로)</td>
                <td className="p-2">150%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Night work (야간근로)</td>
                <td className="p-2">150%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Holiday work (휴일근로)</td>
                <td className="p-2">150%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Holiday + Overtime</td>
                <td className="p-2">200%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Holiday + Overtime + Night</td>
                <td className="p-2">250%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Your hourly rate is calculated as: monthly base salary / 209 hours (standard monthly hours for a 40-hour work week). Maximum overtime is 12 hours per week under the standard work hour system.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Common Payslip Errors and What to Do</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Missing non-taxable separation:</b> If your meal allowance is being taxed (included in taxable income rather than listed separately as 비과세), you are overpaying tax. Ask HR to correct this.</li>
          <li><b>Incorrect pension base:</b> National Pension should be calculated on your standard monthly income (기준월소득), which is set once per year based on the previous year&apos;s income. If you got a significant raise, the pension base might still reflect your old salary until the annual adjustment in July.</li>
          <li><b>Overtime not paid at premium rate:</b> If you work overtime but your payslip shows it at the regular hourly rate (100% instead of 150%), this is a labor law violation. Document the discrepancy and raise it with HR or the Labor Board (고용노동부).</li>
          <li><b>Tax withholding selection:</b> You can choose 80%, 100%, or 120% of the standard withholding rate. Choosing 80% means more take-home pay monthly but potentially a tax bill at year-end settlement. Check with HR which option is selected for you.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Compare your payslip against our calculators:{" "}
          <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link> for overall net pay, and{" "}
          <Link href="/en/tax-comparison" className="text-[var(--primary)] font-bold hover:underline">Tax Comparison Calculator</Link> to check if the flat tax option would save you money.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Your Rights as an Employee</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean labor law provides strong protections for all workers, including foreigners. Key rights related to your payslip and compensation include:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li>Your employer <b>must provide a written payslip</b> every pay period (violation penalty: up to 5M KRW fine).</li>
          <li>Wages must be paid <b>at least once per month</b> on a fixed, predetermined date.</li>
          <li>Wages must be paid <b>directly to the employee</b> in legal tender (KRW) or bank transfer.</li>
          <li>Your employer cannot make unauthorized deductions beyond the legally mandated social insurance and taxes.</li>
          <li>If you believe your employer is underpaying you or making incorrect deductions, you can file a complaint with the <b>Ministry of Employment and Labor</b> (고용노동부) hotline: 1350.</li>
        </ul>
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
