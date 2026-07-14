import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Sending Money from Korea - Best Remittance Options Compared (2026)",
  description:
    "Compare ways to send money from Korea: bank transfers, Wise, SentBe, and more. Fees, exchange rates, and speed compared.",
  alternates: { canonical: "https://moduncalc.com/en/guide/remittance-guide" },
  openGraph: {
    title: "Sending Money from Korea - Best Remittance Options Compared (2026)",
    description:
      "Compare ways to send money from Korea: bank transfers, Wise, SentBe, and more. Fees, exchange rates, and speed compared.",
    url: "https://moduncalc.com/en/guide/remittance-guide",
  },
};

const faqItems = [
  {
    q: "How much money can foreigners send abroad from Korea per year?",
    a: "Foreigners in Korea can remit up to $50,000 USD (or equivalent) per year without special documentation beyond basic identification. For amounts exceeding $50,000, you will need to provide proof of the source of funds, such as employment certificates, tax payment receipts, or contract documentation. If you are remitting earnings (salary, business income), there is no strict annual cap, but each transaction above 10,000,000 KRW requires tax reporting. It is advisable to keep records of all your remittances in case immigration or tax authorities request them during visa renewals.",
  },
  {
    q: "Do I need to pay taxes on money I send abroad from Korea?",
    a: "Sending money abroad itself is not a taxable event. However, if you are a tax resident of Korea (residing 183+ days per year), your worldwide income is subject to Korean income tax regardless of where you send it. Korea has tax treaties with many countries to prevent double taxation. For single transactions of 10,000,000 KRW or more, the bank or remittance service must report the transfer to the National Tax Service (국세청) and the Bank of Korea. This does not mean you owe additional tax -- it is simply a reporting requirement for anti-money-laundering purposes.",
  },
  {
    q: "What is the fastest way to send money from Korea?",
    a: "For speed, Wise and SentBe (센트비) are typically the fastest options, with most transfers arriving within 1-2 business days. Some Wise transfers to popular corridors (USD, GBP, EUR) can arrive within hours if sent during banking hours. Western Union offers near-instant cash pickup at agent locations worldwide, making it the fastest for urgent transfers to countries with limited banking infrastructure. Korean bank wire transfers are the slowest, typically taking 3-5 business days due to correspondent banking chains. GME Remittance offers same-day delivery to several Southeast Asian countries.",
  },
  {
    q: "Can I send money abroad without a Korean bank account?",
    a: "Yes, but your options are limited. Western Union and MoneyGram have physical agent locations in Korea where you can send cash without a Korean bank account -- you only need your passport and ARC. GME Remittance also allows cash deposits at their offices. However, digital services like Wise and SentBe require a Korean bank account for funding transfers. For larger or regular transfers, having a Korean bank account is strongly recommended as it gives you access to better rates and lower fees. See our banking guide for how to open an account as a foreigner.",
  },
];

export default function RemittanceGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Sending Money from Korea"
      description="A complete comparison of remittance options for foreign workers in Korea: bank transfers, Wise, SentBe, Western Union, and more. Find the cheapest and fastest way to send money home."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Sending Money from Korea - Best Remittance Options Compared (2026)",
            description:
              "Compare ways to send money from Korea: bank transfers, Wise, SentBe, and more. Fees, exchange rates, and speed compared.",
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
        <h2 className="text-base font-extrabold mb-3">Why Remittance Matters for Foreign Workers</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          For the millions of foreign workers in Korea, sending money home (해외송금) is one of the most important financial tasks. Whether you are supporting family, paying off student loans, or building savings in your home country, the method you choose can make a significant difference in how much money actually arrives. The gap between the best and worst remittance options can easily exceed 50,000-100,000 KRW per transfer -- money that adds up quickly over months and years.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Korea has a well-developed financial technology ecosystem with many options for international money transfers. Understanding the fees, exchange rates, and speed of each option will help you keep more of your hard-earned money. This guide compares all major remittance services available in Korea as of 2026.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Remittance Options Compared</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Here is a side-by-side comparison of the main ways to send money from Korea:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Service</th>
                <th className="text-left p-2 font-bold">Transfer Fee</th>
                <th className="text-left p-2 font-bold">Exchange Rate</th>
                <th className="text-left p-2 font-bold">Speed</th>
                <th className="text-left p-2 font-bold">Best For</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Korean Bank Wire</td>
                <td className="p-2">10,000-30,000 KRW</td>
                <td className="p-2">1-3% markup</td>
                <td className="p-2">3-5 business days</td>
                <td className="p-2">Large transfers needing paper trail</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Wise</td>
                <td className="p-2">3,000-10,000 KRW</td>
                <td className="p-2">Mid-market rate</td>
                <td className="p-2">1-2 business days</td>
                <td className="p-2">Best overall value, major currencies</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">SentBe (센트비)</td>
                <td className="p-2">5,000-10,000 KRW</td>
                <td className="p-2">Near mid-market</td>
                <td className="p-2">1-3 business days</td>
                <td className="p-2">Korean fintech, good for USD/PHP/VND</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">PayPal</td>
                <td className="p-2">Variable (high)</td>
                <td className="p-2">2-4% markup</td>
                <td className="p-2">Instant to 3 days</td>
                <td className="p-2">Freelance payments only, avoid for remittance</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Western Union</td>
                <td className="p-2">5,000-25,000 KRW</td>
                <td className="p-2">1-2% markup</td>
                <td className="p-2">Minutes (cash pickup)</td>
                <td className="p-2">Urgent transfers, cash pickup in rural areas</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">GME Remittance</td>
                <td className="p-2">3,000-8,000 KRW</td>
                <td className="p-2">Competitive</td>
                <td className="p-2">Same day to 2 days</td>
                <td className="p-2">Southeast Asia (Nepal, Philippines, Vietnam)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Important:</b> The &quot;transfer fee&quot; is only part of the cost. Many services make additional profit through exchange rate markups. A service advertising &quot;zero fees&quot; may still cost you more due to a poor exchange rate. Always compare the total amount received, not just the stated fee.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Real Cost Comparison: Sending $1,000 USD</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          To illustrate the true cost difference, here is what it would cost to send $1,000 USD from Korea using each service (based on a mid-market rate of 1,350 KRW/USD):
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Service</th>
                <th className="text-left p-2 font-bold">Fee (KRW)</th>
                <th className="text-left p-2 font-bold">Rate Used</th>
                <th className="text-left p-2 font-bold">Total Cost (KRW)</th>
                <th className="text-left p-2 font-bold">Hidden Cost</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Korean Bank Wire</td>
                <td className="p-2">25,000</td>
                <td className="p-2">1,377 (2% markup)</td>
                <td className="p-2">1,402,000</td>
                <td className="p-2">~52,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Wise</td>
                <td className="p-2">7,000</td>
                <td className="p-2">1,350 (mid-market)</td>
                <td className="p-2">1,357,000</td>
                <td className="p-2">~7,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">SentBe</td>
                <td className="p-2">8,000</td>
                <td className="p-2">1,354 (0.3% markup)</td>
                <td className="p-2">1,362,000</td>
                <td className="p-2">~12,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">PayPal</td>
                <td className="p-2">15,000</td>
                <td className="p-2">1,391 (3% markup)</td>
                <td className="p-2">1,406,000</td>
                <td className="p-2">~56,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Western Union</td>
                <td className="p-2">12,000</td>
                <td className="p-2">1,364 (1% markup)</td>
                <td className="p-2">1,376,000</td>
                <td className="p-2">~26,000</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">GME Remittance</td>
                <td className="p-2">5,000</td>
                <td className="p-2">1,357 (0.5% markup)</td>
                <td className="p-2">1,362,000</td>
                <td className="p-2">~12,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Bottom line:</b> Using Wise instead of a Korean bank wire transfer saves approximately 45,000 KRW per $1,000 sent. If you send $1,000 monthly, that is over 540,000 KRW saved per year -- nearly half a month&apos;s minimum wage.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Annual Remittance Limits and Tax Reporting</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea regulates international money transfers through the Foreign Exchange Transactions Act (외국환거래법). Here is what foreign workers need to know:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Under $50,000 USD per year:</b> You can remit freely with basic identification (ARC and passport). No special documentation required. Most foreign workers fall within this limit.</li>
          <li><b>Over $50,000 USD per year:</b> You must provide proof of the source of funds. Acceptable documents include employment contracts, salary statements (급여명세서), tax payment certificates (납세증명서), and property sale documents.</li>
          <li><b>Single transactions over 10,000,000 KRW:</b> The bank or remittance service is required to report the transaction to the National Tax Service (국세청) and the Bank of Korea. This is an automatic reporting requirement, not a tax. You do not need to do anything extra, but keep records.</li>
          <li><b>Cash transactions over 10,000 USD:</b> If you physically carry more than $10,000 USD (or equivalent) in cash when entering or leaving Korea, you must declare it at customs. Failure to declare can result in the cash being confiscated.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Tip:</b> Keep records of every remittance you send. Immigration officers may ask for proof of financial activity during visa renewals, and tax authorities may request documentation if your remittance patterns appear unusual.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Documents Needed for Your First Transfer</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Setting up your first international transfer requires some initial documentation. After the first transfer, subsequent ones are usually much faster:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Alien Registration Card (ARC / 외국인등록증):</b> Required by all services for identity verification.</li>
          <li><b>Passport:</b> Your original passport matching the name on your ARC.</li>
          <li><b>Korean bank account:</b> Needed for digital services like Wise and SentBe. Not required for Western Union cash transfers.</li>
          <li><b>Recipient&apos;s bank details:</b> Account number, bank name, branch name, and SWIFT/BIC code for international bank transfers. For services like Western Union or GME, the recipient may need only a phone number and ID to pick up cash.</li>
          <li><b>Employment verification (for large amounts):</b> Certificate of employment (재직증명서) or salary statement may be required for transfers exceeding certain thresholds.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Tips for Getting the Best Exchange Rate</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Small improvements in your exchange rate can save significant money over time. Here are practical tips:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Avoid weekends and holidays:</b> Foreign exchange markets are closed on weekends, so services often use Friday&apos;s rate with an additional margin. Send money during weekday business hours (월-금 오전 9시-오후 3시) for the best rates.</li>
          <li><b>Use rate alerts:</b> Wise and other services offer rate alerts that notify you when the KRW exchange rate hits your target. Set an alert and transfer when the rate is favorable.</li>
          <li><b>Batch your transfers:</b> Sending fewer, larger transfers is usually cheaper than many small ones because fixed fees are spread over a larger amount. Consider sending monthly instead of weekly.</li>
          <li><b>Compare before every transfer:</b> Exchange rates fluctuate daily. Check at least 2-3 services before each transfer. A service that was cheapest last month may not be cheapest this month.</li>
          <li><b>Watch for promotions:</b> SentBe, GME, and other services frequently offer promotional rates or zero-fee deals for new customers or during holidays. Follow them on social media for announcements.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Use our <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link> to understand your after-tax income and plan how much you can afford to remit each month.
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
