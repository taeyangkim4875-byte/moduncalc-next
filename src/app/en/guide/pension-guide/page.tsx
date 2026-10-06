import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korean National Pension for Foreigners - Contributions, Refunds & Treaties",
  description:
    "Everything foreigners need to know about Korean National Pension: who pays, how much, lump-sum refund process, and pension treaty countries.",
  alternates: { canonical: "https://moduncalc.com/en/guide/pension-guide" },
  openGraph: {
    title: "Korean National Pension for Foreigners - Contributions, Refunds & Treaties",
    description:
      "Everything foreigners need to know about Korean National Pension: who pays, how much, lump-sum refund process, and pension treaty countries.",
    url: "https://moduncalc.com/en/guide/pension-guide",
  },
};

const faqItems = [
  {
    q: "Can I get a refund of my National Pension contributions when I leave Korea?",
    a: "Only if you fall into one of three groups. Korean law gives foreign nationals no automatic right to a lump-sum refund (반환일시금). You qualify if your country has a social security agreement with Korea covering the refund (the United States, Canada, Germany, Australia, India, the Philippines and about 20 others), if your country is recognised under the reciprocity rule (Thailand, Indonesia, Sri Lanka, Kenya, Cambodia and about 25 others, some with a minimum contribution period), or if you hold an E-8, E-9 or H-2 visa, in which case nationality is irrelevant. Note that Ireland, Denmark, Spain, Sweden, Finland, New Zealand and Norway have agreements with Korea but their nationals still cannot claim the refund.",
  },
  {
    q: "How much will I get back as a pension refund?",
    a: "You will receive a refund of your total employee contributions (4.75% of your monthly income) plus accrued interest. The employer's matching 4.75% contribution is NOT refunded to you -- it stays in the Korean pension system. So if you contributed for 3 years on a salary of 3 million KRW per month, you would get back approximately 5.13 million KRW (142,500 KRW x 36 months) plus interest, minus a small withholding tax.",
  },
  {
    q: "Do I need to pay tax on my pension refund?",
    a: "Yes, a withholding tax is deducted from your lump-sum refund at the time of payment. The tax rate varies but is typically around 3-5% for short contribution periods. If your country has a tax treaty with Korea, the rate may be lower. The NPS automatically deducts this tax before paying out your refund.",
  },
  {
    q: "How long does it take to receive the pension refund?",
    a: "After submitting your application and all required documents, it typically takes 2 to 4 weeks for the NPS to process your refund. The money can be deposited into a Korean bank account or an overseas bank account. If transferring overseas, allow additional time for the international wire transfer to arrive.",
  },
];

export default function PensionGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korean National Pension for Foreigners"
      description="Understand your pension contributions, learn about lump-sum refunds, and find out how pension treaties affect your money."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Korean National Pension for Foreigners - Contributions, Refunds & Treaties",
            description:
              "Everything foreigners need to know about Korean National Pension: who pays, how much, lump-sum refund process, and pension treaty countries.",
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
        <h2 className="text-base font-extrabold mb-3">What is the National Pension (국민연금)?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The Korean National Pension Service (NPS, 국민연금공단) operates Korea&apos;s public pension system. It is a mandatory social insurance program designed to provide income security for old age, disability, and survivors. Think of it as Korea&apos;s equivalent to Social Security (US), CPP (Canada), or state pension systems in Europe.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          As a foreigner working legally in Korea, you are generally <b>required</b> to contribute to the National Pension. Your employer automatically deducts your share from your paycheck each month. The key question for most foreign workers is not whether to pay, but what happens to that money when you leave Korea.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Who Must Contribute?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Most foreigners employed in Korea between ages 18 and 59 must enroll in the National Pension. However, there are some exceptions:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Citizens of countries without a reciprocal agreement</b> that do not provide pension coverage to Korean nationals may be exempt.</li>
          <li><b>Holders of certain visa types</b> (e.g., diplomatic visas, some short-term visas) may be exempt.</li>
          <li><b>Foreign students</b> and those working fewer than the minimum monthly hours may not be required to contribute.</li>
          <li><b>Citizens of countries with pension totalization agreements</b> may continue contributing to their home country pension instead, depending on the treaty terms.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">2026 Contribution Rates and Caps</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The total National Pension contribution rate in 2026 is <b>9.5%</b> of your monthly income, split equally between employee and employer:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Item</th>
                <th className="text-left p-2 font-bold">Rate</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Employee contribution</td>
                <td className="p-2">4.75%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Employer contribution</td>
                <td className="p-2">4.75%</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Total</td>
                <td className="p-2 font-bold">9.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          There is a monthly income cap for contribution purposes, and the National Pension Service revises it every July. For <b>July 2026 to June 2027</b> the upper limit is <b>6,590,000 KRW per month</b> (raised from 6,370,000 KRW) and the lower limit is 410,000 KRW. If your monthly salary is above the cap, you only pay pension on 6,590,000 KRW. Your maximum monthly employee contribution is therefore 313,025 KRW (6,590,000 x 4.75%). To see the pension line next to your tax and insurance deductions, enter your salary into our{" "}
          <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Korea Salary Calculator</Link>.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Lump-Sum Refund: Getting Your Money Back</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Under Korean law a foreign national is <b>not</b> entitled to a lump-sum refund (반환일시금) by default. You can claim one only if you fall into at least one of three groups: your country has a <b>social security agreement</b> with Korea that covers the refund, your country is recognised under the <b>reciprocity</b> rule because it pays an equivalent benefit to Koreans, or you hold an <b>E-8, E-9 or H-2 visa</b> — in which case your nationality does not matter.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          This is the opposite of what many people assume. Americans, Canadians, Germans and Filipinos <b>can</b> claim the refund; Vietnamese, Irish and Danish nationals generally cannot claim it on nationality alone. We list every country in the{" "}
          <Link href="/en/guide/pension-refund-countries" className="text-[var(--primary)] font-bold hover:underline">pension refund eligibility guide</Link>.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>What you get back:</b> Your own employee contributions (4.75%) plus interest. The employer&apos;s 4.75% contribution is not refunded -- it remains in the NPS fund. A small withholding tax (typically 3-5%) is deducted before payment.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Use our{" "}
          <Link href="/en/pension-refund" className="text-[var(--primary)] font-bold hover:underline">Pension Refund Calculator</Link> to estimate your refund amount.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Having an Agreement Is Not the Same as Getting a Refund</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea has social security agreements with more than 40 countries, but they come in two forms and only one of them carries the equal-treatment clause that makes a lump-sum refund payable.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed list-disc pl-5 space-y-1.5 mb-3">
          <li><b>Totalization agreements (가입기간 합산)</b> — periods in both countries are added together so you can qualify for a pension. Most, but not all, also allow the lump-sum refund.</li>
          <li><b>Contribution-exemption agreements (보험료 면제)</b> — these only stop you paying into both systems at once. They usually do <b>not</b> entitle you to a refund. Japan, China, the United Kingdom, the Netherlands, Italy, Mongolia and Uzbekistan are in this group. Switzerland is the notable exception: it is an exemption-only agreement, yet the refund is still paid.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The trap is the group in between. <b>Ireland, Denmark, Spain, Sweden, Finland, New Zealand and Norway</b> all have totalization agreements with Korea, and their nationals still cannot claim the lump-sum refund. Their contributions count toward a future pension instead.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Because the answer turns entirely on your specific nationality and visa, we keep a full country-by-country list — including the minimum contribution periods that apply to some countries — in the{" "}
          <Link href="/en/guide/pension-refund-countries" className="text-[var(--primary)] font-bold hover:underline">pension refund eligibility guide</Link>. If you are unsure, call the NPS international team on <b>063-713-7101</b>.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">How to Apply for a Pension Refund (Step by Step)</h2>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]">Cancel your Alien Registration Card (ARC) at the immigration office. You will receive a departure confirmation document.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]">Visit an NPS branch or apply online at the NPS website (nps.or.kr). You can also apply from overseas after departure.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 3</span>
            <span className="text-sm text-[#4E5968]">Submit the required documents: passport copy, ARC (or copy), bank account details for deposit, and the refund application form.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 4</span>
            <span className="text-sm text-[#4E5968]">Wait 2-4 weeks for processing. Funds are deposited into your Korean or overseas bank account.</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          The pension refund is only one of the payouts due when you leave. Our{" "}
          <Link href="/en/guide/tax-refund-leaving" className="text-[var(--primary)] font-bold hover:underline">Tax Refund When Leaving Korea Guide</Link> sets out the order to handle everything in, and the{" "}
          <Link href="/en/severance" className="text-[var(--primary)] font-bold hover:underline">Severance Calculator</Link> covers the retirement allowance your employer owes you.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Required Documents</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Passport</b> (original or certified copy)</li>
          <li><b>Alien Registration Card (ARC)</b> or a copy if already surrendered</li>
          <li><b>Bank account details</b> -- Korean account (bankbook copy) or overseas account (SWIFT code, account number, bank name and address)</li>
          <li><b>Lump-sum refund application form</b> (available at NPS branches or downloadable from nps.or.kr)</li>
          <li><b>Proof of departure</b> (flight ticket or departure confirmation from immigration) if applying before leaving Korea</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Timeline: When Will You Get Your Money?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          After submitting a complete application, NPS typically processes refunds within <b>14 to 30 business days</b>. If you request a transfer to a Korean bank account, the deposit is usually faster (about 2 weeks). International transfers take longer due to additional processing and intermediary banks -- allow 3 to 5 weeks total.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Pro tip:</b> If you still have a Korean bank account when you apply, have the refund deposited there first, then transfer it yourself. This is often faster and avoids international wire transfer fees charged by the intermediary banks. You can keep your Korean bank account open even after your ARC is cancelled (for a limited period, depending on the bank).
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
