import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Tax Refund When Leaving Korea - What Foreigners Can Claim",
  description:
    "Guide to tax refunds for foreigners leaving Korea: year-end settlement, pension refund, and other money you might be owed.",
  alternates: { canonical: "https://moduncalc.com/en/guide/tax-refund-leaving" },
  openGraph: {
    title: "Tax Refund When Leaving Korea - What Foreigners Can Claim",
    description:
      "Guide to tax refunds for foreigners leaving Korea: year-end settlement, pension refund, and other money you might be owed.",
    url: "https://moduncalc.com/en/guide/tax-refund-leaving",
  },
};

const faqItems = [
  {
    q: "Can I claim my National Pension refund after leaving Korea?",
    a: "Yes. Foreigners from countries without a social security agreement with Korea can claim a lump-sum refund of their National Pension (국민연금) contributions after leaving the country. You can apply at the airport before departure or from your home country within 5 years of leaving. The refund includes your contributions plus your employer's matching contributions, with some interest. Processing typically takes 2-4 weeks for airport applications and 1-3 months for overseas applications. Use our Pension Refund Calculator to estimate your refund amount.",
  },
  {
    q: "Do I need to do year-end settlement if I leave Korea mid-year?",
    a: "Yes, you should. If you leave Korea before the regular year-end settlement period (January-February), you need to do a mid-year settlement (중도퇴사 정산) through your employer. Your employer should calculate your final tax liability for the months you worked and process any refund or additional tax owed with your final paycheck. If your employer does not handle this, you can file directly with the tax office (세무서) before leaving or file a tax return remotely after leaving Korea.",
  },
  {
    q: "What happens to my health insurance if I do not cancel it before leaving?",
    a: "If you do not properly cancel your National Health Insurance (국민건강보험) before leaving Korea, you may continue to be billed for monthly premiums. While the insurance corporation will eventually deactivate your coverage when your ARC expires or is reported as departed, unpaid premiums can accumulate and cause problems if you return to Korea in the future. Always visit or call the NHIS (국민건강보험공단, 1577-1000) to cancel your coverage before your departure date.",
  },
  {
    q: "How do I receive my severance pay if I leave Korea?",
    a: "Your employer is legally required to pay severance (퇴직금 / toejikgeum) within 14 days of your last working day if you have worked for 1 year or more. You can receive it in your Korean bank account -- keep your Korean bank account open until all final payments are received. If you close your account before receiving severance, provide your employer with an international bank account for the transfer. Alternatively, if your company uses a retirement pension (퇴직연금) system, you may need to contact the pension provider separately to claim your funds.",
  },
];

export default function TaxRefundLeavingPage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Tax Refund When Leaving Korea"
      description="A comprehensive checklist for foreigners leaving Korea: what refunds you can claim, what to cancel, and how to make sure you do not leave money behind."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Tax Refund When Leaving Korea - What Foreigners Can Claim",
            description:
              "Guide to tax refunds for foreigners leaving Korea: year-end settlement, pension refund, and other money you might be owed.",
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
        <h2 className="text-base font-extrabold mb-3">Overview: Money You Might Be Owed</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          When leaving Korea, many foreigners are unaware that they may be entitled to significant refunds and payments. Depending on how long you worked and what you paid into, you could be owed hundreds of thousands to millions of won. Here is a summary of what to check:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Year-end settlement refund (연말정산 환급):</b> If you overpaid income tax during the year, you get money back.</li>
          <li><b>National Pension lump-sum refund (국민연금 반환일시금):</b> Your pension contributions returned when you leave.</li>
          <li><b>Severance pay (퇴직금):</b> Mandatory payment if you worked 1+ years at one employer.</li>
          <li><b>Employment Insurance benefits (고용보험):</b> You may qualify for jobseeker&apos;s allowance in certain cases.</li>
          <li><b>Unused annual leave pay (미사용 연차수당):</b> Compensation for unused paid vacation days.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Year-End Settlement Refund (연말정산 환급)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Throughout the year, your employer withholds estimated income tax from each paycheck. The year-end settlement (연말정산) process reconciles what you actually owe versus what was withheld. If you overpaid, you receive a refund; if you underpaid, you owe additional tax.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>If you leave before January-February:</b> You need a mid-year settlement (중도퇴사 정산). Your employer should process this with your final paycheck, calculating your tax liability for the partial year and issuing any refund directly. Make sure to request this from your HR department or accounting team before your last day.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>If your employer does not process it:</b> You can file a tax return directly at the local tax office (세무서) before departure, or use Hometax (홈택스) to file online. You will need your income withholding receipt (원천징수영수증) from your employer. Learn more in our{" "}
          <Link href="/en/guide/year-end-settlement" className="text-[var(--primary)] font-bold hover:underline">Year-End Settlement Guide</Link>.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">National Pension Lump-Sum Refund (국민연금 반환일시금)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If your home country does not have a social security agreement with Korea (or has a limited agreement), you can claim a lump-sum refund of all your National Pension (국민연금) contributions when you leave. This includes both your 4.5% contribution and your employer&apos;s matching 4.5%, plus interest.
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Option A</span>
            <span className="text-sm text-[#4E5968]">Apply at the airport on departure day. Visit the National Pension Service (NPS) counter at Incheon Airport. Bring your ARC, passport, Korean bank account details (for domestic transfer) or foreign bank details, and a flight ticket. Refund processes in 2-4 weeks.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Option B</span>
            <span className="text-sm text-[#4E5968]">Apply from overseas within 5 years of departure. Download the application form from the NPS website, fill it out, and mail it with copies of your passport and bank account information. Processing takes 1-3 months for international transfers.</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Use our{" "}
          <Link href="/en/pension-refund" className="text-[var(--primary)] font-bold hover:underline">Pension Refund Calculator</Link> to estimate how much you will receive back.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Health Insurance, Employment Insurance & Severance</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Health Insurance (건강보험):</b> There is no refund for health insurance premiums -- they paid for your medical coverage while you were in Korea. However, you must cancel your health insurance to avoid continued billing. Contact the NHIS (국민건강보험공단) at 1577-1000 or visit a local branch before leaving. If you have unpaid medical bills, settle them before departure.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Employment Insurance (고용보험):</b> In most cases, foreigners leaving Korea voluntarily cannot claim unemployment benefits. However, if you were involuntarily terminated (layoff, contract expiration, company closure), you may qualify for jobseeker&apos;s allowance (구직급여) even as a foreigner. Consult your local Employment Center (고용센터) before departure.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Severance Pay (퇴직금):</b> If you worked at one employer for 1 year or more, your employer must pay severance equal to approximately 1 month&apos;s average salary per year worked. This is legally required within 14 days of your last working day. Do not leave Korea without confirming your severance payment. Calculate your expected amount with our{" "}
          <Link href="/en/severance" className="text-[var(--primary)] font-bold hover:underline">Severance Calculator</Link>.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Income Tax for Partial Year Workers</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If you worked only part of the year in Korea, your tax situation requires special attention. Your employer withholds tax monthly based on the assumption you will work the full year. When you leave mid-year, the total tax withheld may exceed your actual tax liability for the months worked, resulting in a refund.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          If you chose the 19% flat tax rate (외국인 단일세율), your calculation is straightforward -- 19% of your actual earned income with no deductions. If you chose progressive tax rates, your partial-year income may fall into a lower tax bracket, potentially resulting in a larger refund. Use our{" "}
          <Link href="/en/tax-comparison" className="text-[var(--primary)] font-bold hover:underline">Tax Comparison Calculator</Link> to compare flat vs progressive tax for your situation.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Checklist Before Leaving Korea</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Use this timeline to make sure you do not miss any refunds or leave any loose ends:
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">4+ Weeks Before</span>
            <span className="text-sm text-[#4E5968]">Notify your employer of your departure date. Request mid-year tax settlement and severance calculation. Confirm unused annual leave days for compensation.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">2-3 Weeks Before</span>
            <span className="text-sm text-[#4E5968]">Cancel Health Insurance (NHIS). Cancel or transfer your phone contract. Settle any outstanding bills (utilities, rent). Get your 원천징수영수증 (tax withholding receipt) from your employer.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">1 Week Before</span>
            <span className="text-sm text-[#4E5968]">Confirm severance pay deposit. Report departure at immigration (출입국관리사무소) if required. Prepare NPS refund documents for airport application.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Departure Day</span>
            <span className="text-sm text-[#4E5968]">Apply for National Pension refund at the airport NPS counter (arrive early). Keep your Korean bank account open for any pending refund deposits.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">After Departure</span>
            <span className="text-sm text-[#4E5968]">Monitor your Korean bank account for refund deposits. If needed, apply for NPS refund from overseas within 5 years. Close Korean bank account once all payments are received (can be done remotely with some banks).</span>
          </div>
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
