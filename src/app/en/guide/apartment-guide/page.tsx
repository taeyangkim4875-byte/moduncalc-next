import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Renting an Apartment in Korea as a Foreigner - Complete Guide 2026",
  description:
    "Renting in Korea as a foreigner? Jeonse vs wolse explained, how to find apartments, contract terms in English, deposit protection.",
  alternates: { canonical: "https://moduncalc.com/en/guide/apartment-guide" },
  openGraph: {
    title: "Renting an Apartment in Korea as a Foreigner - Complete Guide 2026",
    description:
      "How to find and rent an apartment in Korea. Jeonse vs wolse, real estate agents, contracts, deposits, and tenant rights.",
    url: "https://moduncalc.com/en/guide/apartment-guide",
  },
};

const faqItems = [
  {
    q: "What is jeonse (전세) and how does it work?",
    a: "Jeonse (전세) is Korea's unique lump-sum deposit rental system. Instead of paying monthly rent, you provide a large deposit (typically 50-80% of the property's market value) to the landlord. The landlord invests this money and earns returns, while you live rent-free. When you move out, the full deposit is returned. For example, an apartment worth ₩500 million might have a jeonse deposit of ₩300-400 million. This system is becoming less common as landlords increasingly prefer wolse (monthly rent), but it remains a major part of the Korean housing market.",
  },
  {
    q: "How much deposit (보증금) do I need for a wolse apartment?",
    a: "For wolse (월세 / monthly rent) apartments, the deposit (보증금) typically ranges from 5 to 20 times the monthly rent. For example, a studio apartment with ₩500,000 monthly rent might require a ₩5,000,000-10,000,000 deposit. You can often negotiate the ratio: a higher deposit means lower monthly rent, and vice versa. In Seoul's popular areas like Gangnam, Hongdae, or Itaewon, deposits tend to be higher. The deposit is returned in full when you move out, provided there is no damage beyond normal wear and tear.",
  },
  {
    q: "How do I protect my rental deposit in Korea?",
    a: "To protect your deposit, you must complete two steps immediately after signing your lease: (1) Report your address change (전입신고) at the local community center (주민센터) with your ARC and lease contract, and (2) Get a fixed-date certification (확정일자) stamped on your contract at the same community center. This costs only ₩600 and gives you legal priority as a creditor if the landlord goes bankrupt or the property is auctioned. Without these two steps, you may lose your entire deposit. Complete both on the day you move in or the next business day.",
  },
  {
    q: "Can foreigners get jeonse loans in Korea?",
    a: "Yes, foreigners with an ARC and stable employment in Korea can apply for jeonse loans (전세자금대출) at major Korean banks. However, eligibility requirements are stricter than for Korean citizens. You typically need at least 6 months to 1 year of employment history in Korea, proof of income (근로소득원천징수영수증), and your ARC must have more than 1 year of remaining validity. Interest rates for jeonse loans range from 3-5% annually. Government-backed jeonse loans (버팀목 전세대출) offer lower rates but have income and property value caps.",
  },
];

export default function ApartmentGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Renting an Apartment in Korea"
      description="A complete guide for foreigners on finding and renting housing in Korea: jeonse vs wolse, real estate agents, contracts, deposit protection, and tenant rights."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Renting an Apartment in Korea as a Foreigner - Complete Guide 2026",
            description:
              "How to find and rent an apartment in Korea. Jeonse vs wolse, real estate agents, contracts, deposits, and tenant rights.",
            datePublished: "2026-01-01",
            dateModified: "2026-07-16",
            author: {
              "@type": "Organization",
              name: "ModunCalc",
              url: "https://moduncalc.com",
            },
          }),
        }}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">Rental Types in Korea</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea has a unique rental system that differs significantly from Western countries. Understanding these four main types is essential before you start apartment hunting:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Type</th>
                <th className="text-left p-2 font-bold">Korean</th>
                <th className="text-left p-2 font-bold">Deposit</th>
                <th className="text-left p-2 font-bold">Monthly Rent</th>
                <th className="text-left p-2 font-bold">Best For</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Jeonse</td>
                <td className="p-2">전세</td>
                <td className="p-2">50-80% of property value</td>
                <td className="p-2">None</td>
                <td className="p-2">Long-term residents with large savings or loan access</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Wolse</td>
                <td className="p-2">월세</td>
                <td className="p-2">₩5-20M typical</td>
                <td className="p-2">₩400K-1.5M+</td>
                <td className="p-2">Most foreigners, flexible commitment</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Banjeonse</td>
                <td className="p-2">반전세</td>
                <td className="p-2">Higher than wolse</td>
                <td className="p-2">Lower than wolse</td>
                <td className="p-2">Compromise between jeonse and wolse</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Gosiwon</td>
                <td className="p-2">고시원</td>
                <td className="p-2">None or minimal</td>
                <td className="p-2">₩300K-600K</td>
                <td className="p-2">Budget option, students, newly arrived foreigners</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>For most foreigners arriving in Korea</b>, wolse (monthly rent) is the most practical option. It requires a manageable deposit and offers flexibility. Gosiwon rooms are a good temporary solution while you search for long-term housing -- they are small (3-7 pyeong / 10-23 sqm) but require no deposit and offer month-to-month contracts.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">How to Find Apartments</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          There are two main channels for finding rental housing in Korea: online platforms and real estate agents (부동산 / budongsan).
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Zigbang (직방):</b> The most popular apartment search app. Listings include photos, floor plans, and estimated costs. Some listings are available in English. Filter by area, price, and room type.</li>
          <li><b>Dabang (다방):</b> Similar to Zigbang with strong coverage of one-room (원룸) and officetel listings. Good for studio apartments in the ₩400K-800K range.</li>
          <li><b>Peter Pan (피터팬의 좋은방 구하기):</b> A Naver Cafe community where landlords and tenants connect directly, often with lower fees. Requires some Korean language ability to navigate.</li>
          <li><b>Local real estate agents (부동산):</b> Walking into a local 부동산 office near your desired neighborhood is still the most reliable method. Agents know about listings not posted online and can negotiate on your behalf. Look for agents with experience dealing with foreigners.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Tip:</b> Always visit the property in person before signing anything. Check for mold (곰팡이), water pressure, noise levels, heating system condition, and proximity to the nearest subway station. Visit at different times of day if possible.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Required Documents for Renting</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>ARC (외국인등록증):</b> Required for the lease contract. Without an ARC, most landlords will not sign a contract with you.</li>
          <li><b>Passport (여권):</b> As secondary identification and for notarization if needed.</li>
          <li><b>Proof of employment (재직증명서) or enrollment (재학증명서):</b> Landlords want assurance you can pay rent. A certificate from your employer or school satisfies this requirement.</li>
          <li><b>Bank balance certificate (잔고증명서):</b> Shows you have sufficient funds for the deposit. Request this from your Korean bank. Especially important for jeonse contracts.</li>
          <li><b>Income proof (소득증명원):</b> Some landlords request a tax withholding receipt (원천징수영수증) to verify your income level.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Understanding the Contract (계약서)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean lease contracts (임대차계약서) are standard forms, but they contain critical terms you must understand. Here are the key Korean terms translated:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Korean Term</th>
                <th className="text-left p-2 font-bold">English</th>
                <th className="text-left p-2 font-bold">What to Check</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">보증금</td>
                <td className="p-2">Security deposit</td>
                <td className="p-2">Total amount and payment schedule</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">월세</td>
                <td className="p-2">Monthly rent</td>
                <td className="p-2">Amount and payment date each month</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">계약기간</td>
                <td className="p-2">Contract period</td>
                <td className="p-2">Start and end dates (typically 1-2 years)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">관리비</td>
                <td className="p-2">Maintenance fee</td>
                <td className="p-2">What is included (water, internet, etc.)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">특약사항</td>
                <td className="p-2">Special conditions</td>
                <td className="p-2">Any additional agreements between parties</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">임대인</td>
                <td className="p-2">Landlord</td>
                <td className="p-2">Verify identity matches property registration</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">임차인</td>
                <td className="p-2">Tenant</td>
                <td className="p-2">Your name and ARC number</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Critical:</b> Before signing, request a registered property document (등기부등본) from the agent. This document shows who legally owns the property and whether there are any liens or mortgages. If the property has heavy debt, your deposit could be at risk. You can view this document online at the Internet Registry Office (인터넷등기소) for ₩1,000.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Protecting Your Deposit (보증금)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Deposit protection is the single most important thing to understand about renting in Korea. Without proper registration, you could lose your entire deposit if the landlord defaults. Follow these two steps <b>on the day you move in</b>:
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]"><b>Address registration (전입신고):</b> Go to your local community center (주민센터) with your ARC, passport, and lease contract. Register your new address. This is free and takes about 15 minutes.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]"><b>Fixed-date certification (확정일자):</b> At the same community center, have your lease contract stamped with a 확정일자. This costs only ₩600 and establishes your legal priority for deposit recovery if the property is auctioned.</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          For additional protection on larger deposits, consider the <b>Housing Deposit Guarantee Insurance</b> (전세보증금반환보증보험) from the Housing and Urban Guarantee Corporation (HUG / 주택도시보증공사). This insurance guarantees the return of your deposit even if the landlord cannot pay. The premium is approximately 0.1-0.2% of the deposit amount per year.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Monthly Costs & Utilities</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Beyond rent, budget for these monthly expenses. Use our{" "}
          <Link href="/en/cost-of-living" className="text-[var(--primary)] font-bold hover:underline">Cost of Living Calculator</Link> for a detailed breakdown.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Maintenance fee (관리비):</b> ₩50,000-200,000/month for apartments and officetels. May include water, internet, or elevator maintenance. Always ask what is included.</li>
          <li><b>Electricity (전기):</b> KEPCO (한전) handles electricity. Average ₩30,000-80,000/month. Progressive pricing means heavy usage gets expensive fast, especially with air conditioning in summer.</li>
          <li><b>Gas (가스):</b> Used for heating (온돌) and cooking. ₩10,000-30,000 in summer, ₩50,000-150,000+ in winter with floor heating (바닥난방). Winter gas bills are the biggest surprise for most foreigners.</li>
          <li><b>Water (수도):</b> ₩10,000-20,000/month. Often included in maintenance fee for apartment complexes.</li>
          <li><b>Internet (인터넷):</b> ₩20,000-35,000/month for 100Mbps-1Gbps. KT, SK Broadband, LG U+ are the main providers. Installation takes 1-3 days after sign-up.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Use our{" "}
          <Link href="/en/rent" className="text-[var(--primary)] font-bold hover:underline">Rent Calculator</Link> to compare the true cost of jeonse versus wolse based on your financial situation.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Tenant Rights</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean law provides strong protections for tenants, including foreigners. Key rights you should know:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Contract renewal right (계약갱신청구권):</b> Under the amended Housing Lease Protection Act (주택임대차보호법), tenants can request one contract renewal for an additional 2 years. The landlord can only refuse in limited circumstances (e.g., they need to live in the property themselves).</li>
          <li><b>5% rent increase cap (5% 상한제):</b> When renewing a contract, the landlord cannot increase the rent or deposit by more than 5% from the previous contract. This applies to the renewal requested under 계약갱신청구권.</li>
          <li><b>Deposit return (보증금 반환):</b> The landlord must return your full deposit on the day your contract ends and you vacate the property. If the landlord delays, you can charge interest and file for mediation or legal action.</li>
          <li><b>Repair responsibility (수선의무):</b> The landlord is responsible for major repairs (structure, plumbing, electrical). Tenants are typically responsible for minor maintenance and consumables.</li>
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
