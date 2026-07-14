import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Getting a Phone in Korea as a Foreigner - Plans, SIM Cards & Apps",
  description:
    "Complete guide to Korean mobile plans for foreigners: major carriers, budget MVNOs, SIM cards, and essential Korean apps.",
  alternates: { canonical: "https://moduncalc.com/en/guide/phone-guide" },
  openGraph: {
    title: "Getting a Phone in Korea as a Foreigner - Plans, SIM Cards & Apps",
    description:
      "Complete guide to Korean mobile plans for foreigners: major carriers, budget MVNOs, SIM cards, and essential Korean apps.",
    url: "https://moduncalc.com/en/guide/phone-guide",
  },
};

const faqItems = [
  {
    q: "Can foreigners get a phone plan in Korea without an ARC?",
    a: "Short-term visitors without an Alien Registration Card (ARC / 외국인등록증) can purchase prepaid SIM cards at the airport or convenience stores using just their passport. However, postpaid monthly plans from major carriers require an ARC. Some MVNOs (알뜰폰) also offer prepaid options for passport-only holders, though selection is more limited. eSIM providers like Airalo or KT Roaming offer data-only plans that can be activated before you even arrive in Korea.",
  },
  {
    q: "What is the cheapest phone plan for foreigners in Korea?",
    a: "Budget MVNOs (알뜰폰 / alddeul-pon) offer the cheapest plans, starting from around 20,000-25,000 KRW per month for plans with substantial or unlimited data. Popular budget carriers include KT M모바일, 알뜰모바일, and 여유모바일. These MVNOs use the same network infrastructure as the big three carriers (SKT, KT, LG U+), so coverage quality is identical. The tradeoff is that customer service is often Korean-only and you may need to sign up online or at specific stores rather than the major carrier shops found everywhere.",
  },
  {
    q: "Do I need a Korean phone number for daily life in Korea?",
    a: "Yes, a Korean phone number is essentially mandatory for daily life. It is required for opening a bank account, signing up for almost every Korean app and website (including delivery apps, KakaoTalk verification, and government services), receiving authentication codes for online payments, and registering for the National Health Insurance portal. Without a Korean number, you will find it extremely difficult to function in Korea's heavily digital society. Get one as soon as possible after arriving.",
  },
  {
    q: "Can I keep my Korean phone number if I switch carriers?",
    a: "Yes, Korea supports full mobile number portability (번호이동 / beonho-idong). You can switch between any carriers -- including between major carriers and MVNOs -- while keeping your existing phone number. The process typically takes 1-2 hours and can often be done at the new carrier's store. You will need your ARC, passport, and current carrier account information. There is no fee for number portability, though you should check if your current contract has early termination penalties before switching.",
  },
];

export default function PhoneGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Getting a Phone in Korea"
      description="Everything foreigners need to know about Korean mobile plans, SIM cards, essential apps, and staying connected in one of the world's most connected countries."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Getting a Phone in Korea as a Foreigner - Plans, SIM Cards & Apps",
            description:
              "Complete guide to Korean mobile plans for foreigners: major carriers, budget MVNOs, SIM cards, and essential Korean apps.",
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
        <h2 className="text-base font-extrabold mb-3">Major Carriers (대형 통신사)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea has three major mobile carriers that dominate the market. All three offer nationwide 5G and LTE coverage with excellent speeds. Monthly plans for foreigners typically range from 50,000-80,000 KRW depending on the data allowance and device installment plan.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Carrier</th>
                <th className="text-left p-2 font-bold">Monthly Cost</th>
                <th className="text-left p-2 font-bold">Strengths</th>
                <th className="text-left p-2 font-bold">English Support</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">SKT (SK텔레콤)</td>
                <td className="p-2">55-85K KRW</td>
                <td className="p-2">Largest network, best 5G coverage, T membership benefits</td>
                <td className="p-2">Limited (major stores)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">KT (케이티)</td>
                <td className="p-2">50-80K KRW</td>
                <td className="p-2">Strong data speeds, bundled internet deals, global roaming</td>
                <td className="p-2">Good (foreigner hotline)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">LG U+ (엘지유플러스)</td>
                <td className="p-2">50-75K KRW</td>
                <td className="p-2">Competitive pricing, good entertainment bundles, strong indoor coverage</td>
                <td className="p-2">Limited</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Tip:</b> Signing up at a carrier store requires your ARC (외국인등록증) and passport. Contracts are typically 24 months with device subsidies, but you can also bring your own unlocked phone and get a SIM-only plan for lower monthly costs.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Budget MVNOs (알뜰폰)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          MVNOs (알뜰폰 / alddeul-pon, literally &quot;thrifty phone&quot;) are budget carriers that lease network access from the big three. They offer the same coverage quality at significantly lower prices -- typically 20,000-35,000 KRW per month with unlimited data. The main tradeoff is less customer service support and fewer physical stores.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>KT M모바일:</b> Uses KT&apos;s network. Popular among foreigners due to relatively easy sign-up process. Plans from around 22,000 KRW/month with unlimited data (speed-capped after quota).</li>
          <li><b>알뜰모바일 (Alddeul Mobile):</b> Multiple network options available. Very competitive data plans starting around 20,000 KRW/month.</li>
          <li><b>여유모바일 (Yeoyu Mobile):</b> Budget-friendly plans with good unlimited data options. Popular for its straightforward pricing with no hidden fees.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Important:</b> Some MVNOs allow online sign-up with ARC verification, while others require visiting a partner store. Check the carrier&apos;s website for foreigner enrollment options. Most MVNO customer service is Korean-only, so consider having a Korean-speaking friend help with the initial setup.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Prepaid SIM & eSIM Options</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          For short-term visitors or those who have not yet received their ARC, prepaid options are the way to go:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Airport SIM cards:</b> Available at Incheon (ICN) and Gimpo (GMP) airports from KT, SKT, and LG U+ counters. Data-only SIMs start around 20,000-30,000 KRW for 5-10 days. SIMs with a Korean phone number cost more but are essential for app registrations.</li>
          <li><b>Convenience store SIMs:</b> CU, GS25, and 7-Eleven sell prepaid SIM cards. Requires passport for activation. Limited data plans but convenient if you miss the airport counters.</li>
          <li><b>eSIM options:</b> If your phone supports eSIM, services like Airalo, KT Roaming eSIM, and SKT eSIM offer data-only plans you can activate before arriving. Prices range from 10,000-25,000 KRW for short-term data. Note that eSIM data plans typically do not include a Korean phone number.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Required documents:</b> Prepaid SIM cards require only your passport. Postpaid plans and plans with a Korean phone number require your ARC (외국인등록증) + passport.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Essential Korean Apps</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Once you have a Korean phone number, these apps are essential for daily life. Korea runs on apps -- here is what to install immediately:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">App</th>
                <th className="text-left p-2 font-bold">Korean Name</th>
                <th className="text-left p-2 font-bold">Category</th>
                <th className="text-left p-2 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">KakaoTalk</td>
                <td className="p-2">카카오톡</td>
                <td className="p-2">Messaging</td>
                <td className="p-2">MUST HAVE - used by everyone, also for payments, taxi, shopping</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Naver Map / KakaoMap</td>
                <td className="p-2">네이버지도 / 카카오맵</td>
                <td className="p-2">Navigation</td>
                <td className="p-2">Far more accurate than Google Maps in Korea, includes transit info</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Baemin / Coupang Eats</td>
                <td className="p-2">배달의민족 / 쿠팡이츠</td>
                <td className="p-2">Food delivery</td>
                <td className="p-2">Order food from any restaurant, 24/7 delivery available</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Toss</td>
                <td className="p-2">토스</td>
                <td className="p-2">Banking / Payments</td>
                <td className="p-2">All-in-one fintech app: transfers, payments, credit score, investing</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Zigbang / Dabang</td>
                <td className="p-2">직방 / 다방</td>
                <td className="p-2">Apartment hunting</td>
                <td className="p-2">Search rentals by area, price, deposit type (전세/월세)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Kakao T</td>
                <td className="p-2">카카오T</td>
                <td className="p-2">Taxi</td>
                <td className="p-2">Korea&apos;s Uber equivalent, also includes bike and parking services</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Papago</td>
                <td className="p-2">파파고</td>
                <td className="p-2">Translation</td>
                <td className="p-2">Best Korean-English translator, includes camera translation for menus/signs</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Pro tip:</b> KakaoTalk is not optional -- it is the default communication method in Korea for everything from work chats to government notifications. Install it and register with your Korean number on your first day.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Phone Number Portability & eSIM Details</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea has full number portability (번호이동), meaning you can switch carriers while keeping your phone number. The process is straightforward:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li>Visit the new carrier&apos;s store with your ARC and passport</li>
          <li>Request a number transfer (번호이동 신청)</li>
          <li>The switch typically completes within 1-2 hours</li>
          <li>No portability fee, but check for early termination fees on your current contract</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          For eSIM users, all three major Korean carriers now support eSIM activation. If your phone has dual SIM capability, you can keep your home country number on a physical SIM while using a Korean eSIM for local service -- very convenient for foreigners who need to maintain two numbers.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Need to budget for your phone plan? Use our{" "}
          <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link> to see how much of your take-home pay goes to essential expenses like mobile service.
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
