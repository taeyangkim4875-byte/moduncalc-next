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
    a: "Yes, if your home country does not have a pension treaty with Korea, you are eligible for a lump-sum refund (반환일시금) of your contributions when you leave the country. You must apply after your visa is cancelled or within the allowed period. Citizens from treaty countries (such as the US, Canada, Germany, and others) generally cannot receive a lump-sum refund because their contributions are transferred or counted toward their home country pension.",
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
          There is a monthly income cap for contribution calculation purposes. In 2026, the upper limit is <b>6,370,000 KRW per month</b>. If your monthly salary is higher than this, you only pay pension on 6,370,000 KRW. The lower limit is 390,000 KRW. Your maximum monthly employee contribution is therefore 302,575 KRW (6,370,000 x 4.75%).
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Lump-Sum Refund: Getting Your Money Back</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If you are from a country that does <b>not</b> have a pension treaty with Korea, you can apply for a <b>lump-sum refund</b> (반환일시금) when you leave the country permanently. This is the most common scenario for foreigners from countries in Southeast Asia, South Asia, Africa, and parts of Latin America.
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
        <h2 className="text-base font-extrabold mb-3">Countries with Pension Treaties</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea has signed pension totalization agreements with many countries. If your home country is on this list, you generally <b>cannot</b> receive a lump-sum refund. Instead, your Korean pension contributions may count toward your home country pension eligibility, or you may eventually receive a Korean pension when you reach retirement age.
        </p>
        <div className="p-3 bg-[var(--bg)] rounded-xl mb-3">
          <p className="text-sm text-[#4E5968] leading-relaxed">
            <b>Treaty countries include:</b> United States, Canada, Germany, France, United Kingdom, Australia, Japan, China, Czech Republic, Ireland, Belgium, Poland, Slovak Republic, Hungary, Bulgaria, Romania, Austria, Denmark, Switzerland, Netherlands, Sweden, Finland, Norway, Spain, Italy, Luxembourg, Mongolia, India, Brazil, Turkey, Philippines, Indonesia, Uzbekistan, and others.
          </p>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Non-treaty countries</b> (eligible for lump-sum refund): Vietnam, Thailand, Myanmar, Cambodia, Nepal, Bangladesh, Pakistan, Sri Lanka, Nigeria, Ghana, Kenya, and many others. Check with NPS (call 1355) if you are unsure about your country&apos;s status.
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
