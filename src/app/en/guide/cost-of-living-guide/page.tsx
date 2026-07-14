import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cost of Living in Korea 2026 - Budget Guide for Foreigners",
  description:
    "Detailed breakdown of monthly expenses in Seoul, Busan, and other Korean cities. Covers rent, food, transport, utilities, and money-saving tips.",
  alternates: { canonical: "https://moduncalc.com/en/guide/cost-of-living-guide" },
  openGraph: {
    title: "Cost of Living in Korea 2026 - Budget Guide for Foreigners",
    description:
      "Detailed breakdown of monthly expenses in Seoul, Busan, and other Korean cities. Covers rent, food, transport, utilities, and money-saving tips.",
    url: "https://moduncalc.com/en/guide/cost-of-living-guide",
  },
};

const faqItems = [
  {
    q: "How much money do I need per month to live in Seoul?",
    a: "A single foreigner can live in Seoul on a budget of roughly 1.5 to 2 million KRW per month (excluding rent deposit). This covers a studio in a non-central area (500-700K rent on a monthly lease), food, transport, phone, and basic entertainment. A moderate lifestyle in a decent neighborhood typically costs 2.5 to 3.5 million KRW per month. Comfortable living in a popular area like Gangnam, Itaewon, or Hongdae can easily exceed 4 million KRW per month.",
  },
  {
    q: "Is it cheaper to eat out or cook at home in Korea?",
    a: "Korea is one of the few countries where eating out can be almost as affordable as cooking, especially for single people. A basic Korean meal (김치찌개, 비빔밥, 국밥) costs 7,000 to 10,000 KRW at a local restaurant. Cooking at home can save money if you buy groceries at traditional markets (시장) rather than supermarkets, but fresh produce and meat in Korea can be surprisingly expensive. Many foreigners find a mix of both -- eating out for Korean food and cooking Western dishes at home -- to be the most cost-effective approach.",
  },
  {
    q: "How does the deposit (보증금) system work for renting in Korea?",
    a: "Korean rentals typically require a large upfront deposit (보증금). In the jeonse (전세) system, you pay a massive deposit (often 70-90% of the property value) and no monthly rent. In the wolse (월세) system, you pay a smaller deposit (typically 5-20 million KRW for a studio) plus monthly rent. Higher deposits generally mean lower monthly rent. The deposit is returned in full when you move out, assuming no damage. Many foreigners opt for wolse with a moderate deposit.",
  },
  {
    q: "What are the cheapest ways to send money home from Korea?",
    a: "International bank transfers from Korean banks typically charge 10,000 to 30,000 KRW per transaction plus unfavorable exchange rates. Cheaper alternatives include Wise (formerly TransferWise), which offers near-mid-market rates with low fees, and SentBe (센트비), a Korea-based service with competitive rates for certain corridors. Toss (토스) also offers international transfers with reasonable fees. PayPal is generally the most expensive option due to high conversion fees. Always compare the total cost including both fees and exchange rate markup.",
  },
];

export default function CostOfLivingGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Cost of Living in Korea 2026"
      description="A detailed breakdown of what it actually costs to live in Korea as a foreigner: rent, food, transport, utilities, and practical money-saving tips."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Cost of Living in Korea 2026 - Budget Guide for Foreigners",
            description:
              "Detailed breakdown of monthly expenses in Seoul, Busan, and other Korean cities. Covers rent, food, transport, utilities, and money-saving tips.",
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
        <h2 className="text-base font-extrabold mb-3">Monthly Budget Overview</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Your monthly expenses in Korea will vary significantly based on your city, neighborhood, and lifestyle. Here is a realistic breakdown for a single person across three spending levels:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Category</th>
                <th className="text-left p-2 font-bold">Budget</th>
                <th className="text-left p-2 font-bold">Moderate</th>
                <th className="text-left p-2 font-bold">Comfortable</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Rent (월세)</td>
                <td className="p-2">500-700K</td>
                <td className="p-2">800K-1.2M</td>
                <td className="p-2">1.5M-2.5M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Food</td>
                <td className="p-2">300-400K</td>
                <td className="p-2">500-700K</td>
                <td className="p-2">800K-1.2M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Transport</td>
                <td className="p-2">50-70K</td>
                <td className="p-2">70-100K</td>
                <td className="p-2">100-200K</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Utilities</td>
                <td className="p-2">80-120K</td>
                <td className="p-2">100-150K</td>
                <td className="p-2">150-200K</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Phone</td>
                <td className="p-2">20-30K</td>
                <td className="p-2">30-50K</td>
                <td className="p-2">50-70K</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Entertainment</td>
                <td className="p-2">100-200K</td>
                <td className="p-2">200-400K</td>
                <td className="p-2">400K+</td>
              </tr>
              <tr className="border-t border-[#eee] font-bold">
                <td className="p-2">Total (Seoul)</td>
                <td className="p-2">~1.5-2M</td>
                <td className="p-2">~2.5-3.5M</td>
                <td className="p-2">~4M+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          In cities outside Seoul -- Busan, Daegu, Daejeon, Gwangju -- expect to pay 20-40% less for rent and slightly less for food and entertainment. All amounts are in Korean Won (KRW).
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Rent and Housing</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Housing is typically the largest expense for foreigners in Korea. Studio apartments (원룸, one-room) are the most common option for single foreigners. Prices vary dramatically by location:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Area</th>
                <th className="text-left p-2 font-bold">Studio Rent (Monthly)</th>
                <th className="text-left p-2 font-bold">Typical Deposit</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul - Gangnam/Seocho</td>
                <td className="p-2">800K-1.5M</td>
                <td className="p-2">10-30M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul - Hongdae/Mapo</td>
                <td className="p-2">600K-1M</td>
                <td className="p-2">5-20M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul - Outer areas</td>
                <td className="p-2">400-700K</td>
                <td className="p-2">3-10M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Busan</td>
                <td className="p-2">300-600K</td>
                <td className="p-2">3-10M</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Other cities</td>
                <td className="p-2">250-500K</td>
                <td className="p-2">2-7M</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Most rental contracts in Korea require a deposit (보증금). Under the wolse (월세) system, you pay both a deposit and monthly rent. A higher deposit usually results in lower monthly rent. Officetel (오피스텔) apartments tend to be newer and pricier than traditional one-rooms. Always verify the landlord&apos;s ownership and check for any liens on the property before signing.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Food and Dining</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea offers affordable dining options, especially for Korean food. Here is what you can expect to spend:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Korean restaurant meal:</b> 7,000-12,000 KRW for dishes like bibimbap, jjigae, kimbap, or gukbap. Side dishes (반찬) and rice refills are usually free.</li>
          <li><b>Western/international food:</b> 12,000-25,000 KRW per meal. Pasta, burgers, and brunch spots tend to be significantly pricier than Korean restaurants.</li>
          <li><b>Convenience stores:</b> 3,000-6,000 KRW for a meal (triangle kimbap + ramen combo, lunch boxes). Brands include CU, GS25, 7-Eleven, and Emart24.</li>
          <li><b>Delivery apps:</b> Baemin (배달의민족) and Coupang Eats are the most popular. Delivery fees range from 0 to 4,000 KRW. Minimum order amounts are common.</li>
          <li><b>Coffee:</b> 4,500-6,000 KRW at chain cafes (Starbucks, Ediya, Mega Coffee). Budget chains like Compose Coffee or Paik&apos;s Coffee offer drinks for 1,500-3,000 KRW.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          For grocery shopping, traditional markets (시장) offer the best prices on fresh produce, meat, and fish. Discount supermarkets like Emart, Homeplus, and Costco are good for bulk buying. Online grocery delivery through Coupang Rocket Fresh or MarketKurly is extremely popular and often has competitive prices.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Transportation</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea has one of the best public transportation systems in the world, making it easy and affordable to get around without a car:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>T-money card:</b> The rechargeable transit card used on all subways and buses nationwide. Available at convenience stores for 2,500 KRW (card cost). You get a small discount per ride compared to cash.</li>
          <li><b>Subway/bus fare:</b> Base fare of 1,400 KRW (card) in Seoul. Free transfers between subway and bus within 30 minutes. Intercity buses cost more depending on distance.</li>
          <li><b>Monthly transit pass (기후동행카드):</b> Seoul offers a monthly pass at approximately 65,000 KRW that covers unlimited subway and bus rides within the metropolitan area. Excellent value for daily commuters.</li>
          <li><b>Taxi:</b> Base fare of 4,800 KRW in Seoul (as of 2026). Late-night surcharge (20-40%) applies between midnight and 4 AM. Use Kakao T app for easy booking.</li>
          <li><b>KTX (high-speed train):</b> Seoul to Busan in about 2.5 hours for 59,800 KRW (standard class). Book via the Korail app or SRT app for the best prices.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Utilities</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Monthly utility costs for a typical studio apartment in Korea:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Electricity (전기):</b> 30,000-80,000 KRW per month. Korea uses a progressive rate system (누진제) where the per-unit price increases dramatically in higher tiers. Summer AC usage can push bills to 100,000+ KRW. Winter heating with electric ondol can also spike costs.</li>
          <li><b>Gas (가스):</b> 10,000-40,000 KRW. Mainly used for cooking and heating (in gas-heated buildings). Winter months see the highest bills.</li>
          <li><b>Water (수도):</b> 5,000-15,000 KRW. Water is relatively cheap in Korea.</li>
          <li><b>Internet (인터넷):</b> 30,000-40,000 KRW for high-speed fiber. Korea has some of the fastest and cheapest internet in the world. Major providers include KT, SK Broadband, and LG U+.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Many officetels include management fees (관리비) that cover water, common area electricity, security, and building maintenance. This can add 50,000-150,000 KRW per month but simplifies billing.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Phone Plans</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          You have two main options for mobile phone plans in Korea:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Major carriers (SKT, KT, LG U+):</b> Plans range from 40,000-80,000 KRW/month with unlimited data, calls, and texts. Better network coverage and faster speeds, but more expensive. Most plans include a phone subsidy if you sign a 24-month contract.</li>
          <li><b>MVNOs / budget carriers (알뜰폰):</b> Brands like Tplus, KT M Mobile, and Helio offer plans from 10,000-35,000 KRW/month. They use the same networks as the big three but at lower prices. Data limits are lower (3-15 GB per month) but sufficient for most users. You can sign up with just your ARC (Alien Registration Card) and passport at most convenience stores or online.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Healthcare Costs</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If you are enrolled in the National Health Insurance (NHI / 국민건강보험), your out-of-pocket medical costs are generally low:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Doctor visit (clinic/의원):</b> 5,000-15,000 KRW copay for a basic visit</li>
          <li><b>Hospital outpatient:</b> 10,000-30,000 KRW copay depending on tests and procedures</li>
          <li><b>Prescription medication:</b> 3,000-10,000 KRW for most common prescriptions</li>
          <li><b>Dental cleaning:</b> 15,000-30,000 KRW with insurance. Major dental work (crowns, implants) can cost 500K-1.5M KRW even with insurance.</li>
          <li><b>Monthly NHI premium:</b> Approximately 3.545% of your monthly salary (split 50/50 with your employer). For a 3M KRW salary, your share is about 53,000 KRW.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Entertainment and Social Life</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea offers a wide range of entertainment options at various price points:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Gym membership:</b> 40,000-80,000 KRW/month for a standard gym. Premium fitness centers can cost 100,000-200,000 KRW.</li>
          <li><b>Movie ticket:</b> 12,000-15,000 KRW at CGV, Lotte Cinema, or Megabox</li>
          <li><b>Beer/soju at a bar:</b> Domestic beer 4,000-7,000 KRW, craft beer 7,000-12,000 KRW, soju bottle 5,000-7,000 KRW at a restaurant</li>
          <li><b>Noraebang (karaoke):</b> 15,000-25,000 KRW per hour for a room</li>
          <li><b>Jjimjilbang (spa/sauna):</b> 10,000-15,000 KRW for entry, open 24 hours -- a budget-friendly option for overnight stays too</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Money-Saving Tips for Korea</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li>Use the <b>기후동행카드</b> monthly transit pass instead of paying per ride</li>
          <li>Shop at <b>traditional markets</b> (시장) for produce and meat -- prices can be 30-50% cheaper than supermarkets</li>
          <li>Switch to a <b>budget phone plan</b> (알뜰폰) -- you can save 30,000-50,000 KRW per month</li>
          <li>Use <b>Coupang</b> for household items and groceries -- Rocket delivery is often cheaper than offline stores</li>
          <li>Take advantage of <b>free refills</b> at Korean restaurants (rice, side dishes, water)</li>
          <li>Use <b>Kakao T</b> for taxis and enable ride-sharing options to reduce costs</li>
          <li>Open a <b>debit card</b> and track spending -- credit/debit card spending deductions can significantly reduce your income tax during year-end settlement</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Use our{" "}
          <Link href="/en/cost-of-living" className="text-[var(--primary)] font-bold hover:underline">Cost of Living Calculator</Link> to estimate your personalized monthly budget based on your lifestyle preferences and location.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Banking and Remittances</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Opening a Korean bank account is essential for receiving your salary, paying rent, and using local services. Most major banks (KB Kookmin, Shinhan, Woori, Hana) accept foreign residents with an Alien Registration Card (ARC). Mobile banking apps like Toss (토스) and KakaoBank (카카오뱅크) have become popular alternatives with user-friendly English interfaces.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          For sending money home, compare fees and exchange rates across services. Traditional bank wire transfers are the most expensive option. Services like Wise, SentBe (센트비), and Toss International Transfer typically offer better rates and lower fees. Always check both the stated fee and the exchange rate markup to find the true cost.
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
