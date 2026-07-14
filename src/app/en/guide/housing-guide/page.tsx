import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Renting in Korea as a Foreigner - Jeonse, Wolse & Everything In Between",
  description:
    "Complete guide to Korean rental systems for foreigners: jeonse deposits, wolse monthly rent, finding apartments, contracts, and protecting your deposit.",
  alternates: { canonical: "https://moduncalc.com/en/guide/housing-guide" },
  openGraph: {
    title: "Renting in Korea as a Foreigner - Jeonse, Wolse & Everything In Between",
    description:
      "Complete guide to Korean rental systems for foreigners: jeonse deposits, wolse monthly rent, finding apartments, contracts, and protecting your deposit.",
    url: "https://moduncalc.com/en/guide/housing-guide",
  },
};

const faqItems = [
  {
    q: "Can foreigners sign a jeonse (전세) lease in Korea?",
    a: "Yes, foreigners with a valid Alien Registration Card (ARC) can sign jeonse leases. However, securing a jeonse contract can be more difficult for foreigners because landlords may be hesitant due to concerns about contract enforcement if the tenant leaves Korea. Having a Korean co-signer, offering a larger deposit, or working with a real estate agent experienced with foreign tenants can help.",
  },
  {
    q: "What is the typical deposit amount for a one-room (원룸) in Seoul?",
    a: "For a wolse (monthly rent) arrangement, deposits for a one-room in Seoul typically range from 3 million to 10 million KRW, with monthly rent of 500,000 to 900,000 KRW depending on the area and room quality. In popular areas like Gangnam, Hongdae, or Itaewon, expect higher deposits and rent. For jeonse, one-room deposits in Seoul typically range from 80 million to 200 million KRW.",
  },
  {
    q: "What is 전입신고 (move-in registration) and why is it important?",
    a: "전입신고 (jeonip-singo) is the legal registration of your new address at the local district office (주민센터). You must complete this within 14 days of moving. It is critically important because it establishes your legal right to the property and is required to obtain 확정일자 (confirmed date), which protects your deposit in case the landlord goes bankrupt or the property is seized. Without 전입신고, you have no legal priority to recover your deposit.",
  },
  {
    q: "How do I get my deposit back when I move out?",
    a: "Your landlord is legally obligated to return your deposit on the day your lease ends, provided you have not damaged the property beyond normal wear and tear. Give your landlord written notice of your intent to move out at least 1-2 months before the lease end date. On the last day, do a walkthrough inspection together, agree on any deductions for damage, and receive the remaining deposit. If the landlord refuses to return your deposit, you can file a complaint with the 주택임대차분쟁조정위원회 (Housing Lease Dispute Mediation Committee) or take legal action.",
  },
];

export default function HousingGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Renting in Korea as a Foreigner"
      description="Understand jeonse, wolse, and banjeonse rental systems, find apartments, protect your deposit, and avoid common scams."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Renting in Korea as a Foreigner - Jeonse, Wolse & Everything In Between",
            description:
              "Complete guide to Korean rental systems for foreigners: jeonse deposits, wolse monthly rent, finding apartments, contracts, and protecting your deposit.",
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
        <h2 className="text-base font-extrabold mb-3">Korean Rental Types Explained</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea has a unique rental system that can be confusing for newcomers. Unlike most countries where you simply pay a deposit plus monthly rent, Korea offers several distinct rental structures:
        </p>
        <div className="grid grid-cols-1 gap-3 mb-3">
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Jeonse (전세) - Key Money Deposit</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              You pay a large lump-sum deposit (typically 50-80% of the property value) and pay <b>no monthly rent</b>. The landlord invests your deposit and earns returns during the lease period. You get the full deposit back when the lease ends. Jeonse deposits in Seoul for a small apartment can range from 100M to 300M+ KRW. This system is unique to Korea and is less common for foreigners due to the enormous upfront capital required.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Wolse (월세) - Monthly Rent</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              The most common option for foreigners. You pay a smaller deposit (보증금, typically 3M-20M KRW for a one-room) plus a fixed monthly rent. Higher deposits generally mean lower monthly rent. This is the closest to the standard Western rental model.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Banjeonse (반전세) - Hybrid</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              A middle ground between jeonse and wolse. You pay a substantial deposit (larger than typical wolse but smaller than full jeonse) and a reduced monthly rent. For example, 50M KRW deposit + 300,000 KRW monthly rent for a studio that might otherwise be 10M deposit + 700,000 KRW monthly.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Typical Deposit and Rent by Area</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Area</th>
                <th className="text-left p-2 font-bold">Deposit (Wolse)</th>
                <th className="text-left p-2 font-bold">Monthly Rent</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul (Gangnam, Seocho)</td>
                <td className="p-2">10M~30M KRW</td>
                <td className="p-2">700K~1.5M KRW</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul (Mapo, Yongsan)</td>
                <td className="p-2">5M~20M KRW</td>
                <td className="p-2">550K~1M KRW</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul (outer areas)</td>
                <td className="p-2">3M~10M KRW</td>
                <td className="p-2">400K~700K KRW</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Gyeonggi Province</td>
                <td className="p-2">3M~10M KRW</td>
                <td className="p-2">350K~600K KRW</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Busan, Daegu, etc.</td>
                <td className="p-2">2M~7M KRW</td>
                <td className="p-2">300K~500K KRW</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Prices are approximate for one-room/studio apartments (원룸). Larger apartments, officetels, and APT units cost significantly more.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Where to Find Apartments</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>직방 (Zigbang):</b> Korea&apos;s most popular property app. Has English interface options. Great for one-rooms and officetels.</li>
          <li><b>다방 (Dabang):</b> Another major property app, strong in one-room and studio listings.</li>
          <li><b>피터팬의 좋은방 구하기:</b> Popular community-based rental platform, especially for direct landlord-to-tenant deals (no agent fee).</li>
          <li><b>네이버 부동산 (Naver Real Estate):</b> Comprehensive listings for all property types, integrated with Naver Maps.</li>
          <li><b>Local real estate agents (부동산):</b> Walking into a neighborhood 부동산 office is still one of the best ways to find housing. They know the local inventory and can arrange viewings immediately. Agent fees are legally regulated (typically 0.3-0.5% of the deposit).</li>
          <li><b>Facebook/community groups:</b> Expat groups like &quot;Seoul Housing&quot; or &quot;Foreigners in Seoul&quot; sometimes have direct listings.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Protecting Your Deposit: Critical Steps</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Deposit protection is the single most important thing for any renter in Korea. Follow these steps immediately after signing your lease:
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]"><b>전입신고 (Move-in Registration):</b> Go to your local 주민센터 (community center) within 14 days of moving in. Bring your ARC and lease contract. This legally registers your address and establishes your tenancy.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]"><b>확정일자 (Confirmed Date):</b> At the same 주민센터 visit, request 확정일자 on your lease contract. This stamps an official date on your contract that gives you priority as a creditor if the landlord defaults. It costs only 600 KRW.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 3</span>
            <span className="text-sm text-[#4E5968]"><b>전세보증보험 (Deposit Insurance):</b> For larger deposits, consider getting jeonse/deposit insurance through HUG (주택도시보증공사) or SGI Seoul Guarantee. This insurance guarantees your deposit return even if the landlord cannot pay. Premiums are relatively low (around 0.1-0.2% of the deposit per year).</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">What to Look for in a Contract</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Verify ownership:</b> Request a 등기부등본 (property registry document) from the court registry. Confirm the landlord&apos;s name matches. Check for existing mortgages (근저당) -- if the property is heavily mortgaged, your deposit may be at risk.</li>
          <li><b>Lease period:</b> Standard leases are 2 years. By law, you are guaranteed a minimum 2-year term even if the contract says less.</li>
          <li><b>Deposit return date:</b> Ensure the contract clearly states when the deposit will be returned.</li>
          <li><b>Maintenance fees (관리비):</b> Ask what&apos;s included. Some buildings include water, internet, or even gas in the management fee.</li>
          <li><b>Special conditions (특약사항):</b> Read these carefully. They may include rules about pets, subletting, early termination penalties, or responsibilities for repairs.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Utility Setup</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          After moving in, you will need to set up or transfer utilities:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Electricity (전기):</b> Usually auto-transferred. Bills come from KEPCO. Pay via auto-debit or at convenience stores.</li>
          <li><b>Gas (가스):</b> Call the local city gas company to register. An inspector will visit to turn on the gas.</li>
          <li><b>Water (수도):</b> Usually managed by the building or local water authority. Often included in 관리비.</li>
          <li><b>Internet (인터넷):</b> Sign up with KT, SK Broadband, or LG U+. Plans typically run 20,000-35,000 KRW/month for high-speed fiber. Installation takes 1-3 days.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Common Scams and How to Avoid Them</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Fake landlords:</b> Always verify ownership through a 등기부등본 before signing or paying any deposit. Never wire money before confirming the landlord&apos;s identity.</li>
          <li><b>Excessive agent fees:</b> Agent commissions are regulated by law. For deposits under 50M KRW, the maximum fee is 0.5% (up to 200,000 KRW). Ask for a receipt.</li>
          <li><b>Hidden damage charges:</b> Take photos and video of the entire property on move-in day and send them to your landlord via KakaoTalk (for a timestamped record). This protects you from being charged for pre-existing damage.</li>
          <li><b>Deposit withholding:</b> Some landlords try to deduct excessive &quot;cleaning fees&quot; or &quot;repair costs.&quot; Normal wear and tear is the landlord&apos;s responsibility. Know your rights under the 주택임대차보호법 (Housing Lease Protection Act).</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          Estimate your monthly living costs with our{" "}
          <Link href="/en/cost-of-living" className="text-[var(--primary)] font-bold hover:underline">Cost of Living Calculator</Link>, or calculate rent affordability with the{" "}
          <Link href="/en/rent" className="text-[var(--primary)] font-bold hover:underline">Rent Calculator</Link>.
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
