import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korea Transportation Guide - Subway, Bus, KTX & Taxi for Foreigners",
  description:
    "Complete guide to getting around Korea. T-money card, Seoul subway, buses, KTX trains, taxis, and intercity travel tips.",
  alternates: { canonical: "https://moduncalc.com/en/guide/transportation-guide" },
  openGraph: {
    title: "Korea Transportation Guide - Subway, Bus, KTX & Taxi for Foreigners",
    description:
      "Complete guide to getting around Korea. T-money card, Seoul subway, buses, KTX trains, taxis, and intercity travel tips.",
    url: "https://moduncalc.com/en/guide/transportation-guide",
  },
};

const faqItems = [
  {
    q: "How much does public transportation cost in Seoul?",
    a: "Seoul has some of the most affordable public transportation in the developed world. A single subway ride with a T-money card costs ₩1,250 (base fare for up to 10km), with ₩100 added per additional 5km. Bus fare is ₩1,200 for a regular city bus. The best part is the free transfer system: you can transfer between subway and bus (or bus to bus) for free within 30 minutes of tapping off, as long as you use the same T-money card. Without a T-money card, single-journey subway tickets cost ₩1,350 (includes ₩500 refundable deposit). Monthly transportation costs for most commuters range from ₩50,000-80,000.",
  },
  {
    q: "Can I use my T-money card outside of Seoul?",
    a: "Yes, T-money cards (교통카드) work nationwide across all major cities including Busan, Daegu, Incheon, Gwangju, Daejeon, and many smaller cities. The card works on subways, city buses, intercity buses, and even some taxis. You can also use T-money for small purchases at convenience stores (CU, GS25, 7-Eleven). The free transfer benefit between subway and bus applies in most major cities. If you travel to Busan, their Dongseo Card also works on Seoul transit and vice versa. T-money is essentially a universal transit card for all of Korea.",
  },
  {
    q: "What is the fastest way to get from Incheon Airport to Seoul?",
    a: "The fastest option is the AREX Express train (직통열차), which runs non-stop from Incheon Airport Terminal 1 to Seoul Station in 43 minutes for ₩11,000. The AREX All-Stop train (일반열차) takes about 56-66 minutes but costs only ₩4,250 with a T-money card. Airport limousine buses (공항리무진) cost ₩16,000-17,000 and take 60-90 minutes depending on traffic and destination. A taxi costs approximately ₩65,000-80,000 and takes 50-80 minutes depending on traffic. For most travelers, the AREX All-Stop train offers the best balance of cost and convenience.",
  },
  {
    q: "How do I book KTX tickets as a foreigner?",
    a: "You can book KTX tickets through several methods: (1) The Korail website (letskorail.com) has an English version where you can book and pay with an international credit card, (2) The Korail Talk app (코레일톡) works with a Korean phone number, (3) You can buy tickets at KTX station ticket counters or kiosks with your passport or ARC, (4) The Korea Rail Pass (KR Pass) is available exclusively to foreigners and offers unlimited KTX travel for 2-5 days at fixed prices starting around ₩121,000 for a 2-day pass. Book tickets at least a few days in advance for popular routes (Seoul-Busan, Seoul-Gwangju) especially during holidays (설날, 추석) when tickets sell out weeks ahead.",
  },
];

export default function TransportationGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korea Transportation Guide"
      description="A complete guide for foreigners on getting around Korea: T-money cards, Seoul subway, buses, KTX high-speed trains, taxis, intercity travel, and airport transportation."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Korea Transportation Guide - Subway, Bus, KTX & Taxi for Foreigners",
            description:
              "Complete guide to getting around Korea. T-money card, Seoul subway, buses, KTX trains, taxis, and intercity travel tips.",
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
        <h2 className="text-base font-extrabold mb-3">T-money Card (교통카드)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The T-money card (교통카드) is your essential tool for getting around Korea. This rechargeable transit card works on all subways, buses, and some taxis nationwide. Getting one should be among the first things you do when arriving in Korea.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Where to buy:</b> Any convenience store (CU, GS25, 7-Eleven, emart24) for ₩2,500, or at subway station vending machines. You can also find them at airport convenience stores upon arrival.</li>
          <li><b>How to charge:</b> Add money (충전) at convenience store counters (just hand the card and say the amount, e.g., &quot;만 원 충전해 주세요&quot; = charge 10,000 won please), or at subway station charging machines that accept cash and cards. Charge in increments of ₩1,000.</li>
          <li><b>How to use:</b> Tap the card on the reader when entering AND exiting the subway, or when boarding AND alighting the bus. The fare is calculated based on distance traveled. Always tap off -- if you forget, you will be charged the maximum fare.</li>
          <li><b>Mobile T-money:</b> If you have a supported Samsung phone with NFC, you can use Mobile T-money through Samsung Pay or the T-money app, eliminating the need for a physical card.</li>
          <li><b>Refund:</b> When leaving Korea, you can get a refund of the remaining balance (minus a ₩500 processing fee) at convenience stores if the balance is under ₩20,000.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Seoul Metro (지하철)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Seoul&apos;s subway system is one of the best in the world -- clean, punctual, extensive, and incredibly affordable. It covers the entire Seoul metropolitan area with over 800 stations across multiple lines.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Line</th>
                <th className="text-left p-2 font-bold">Color</th>
                <th className="text-left p-2 font-bold">Key Stations</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Line 1</td>
                <td className="p-2">Dark Blue</td>
                <td className="p-2">Seoul Station, City Hall, Dongdaemun</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Line 2</td>
                <td className="p-2">Green</td>
                <td className="p-2">Gangnam, Hongdae, Jamsil, Sinchon (circular line)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Line 3</td>
                <td className="p-2">Orange</td>
                <td className="p-2">Gyeongbokgung, Anguk, Express Bus Terminal</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Line 4</td>
                <td className="p-2">Light Blue</td>
                <td className="p-2">Myeongdong, Seoul Station, Dongdaemun</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Line 7</td>
                <td className="p-2">Olive</td>
                <td className="p-2">Gangnam, Cheongdam, Gasan Digital Complex</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Shinbundang</td>
                <td className="p-2">Red</td>
                <td className="p-2">Gangnam-Pangyo-Gwanggyo (express, premium fare)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Base fare:</b> ₩1,250 with T-money (up to 10km), ₩1,350 with single-journey ticket. Additional ₩100 per 5km after 10km.</li>
          <li><b>Operating hours:</b> Approximately 5:30 AM to midnight. First and last train times vary by station -- check Naver Map for exact times.</li>
          <li><b>All stations have English signage</b> and announcements. Station numbers (e.g., 222 for Gangnam on Line 2) make navigation easy even without Korean.</li>
          <li><b>Free transfers:</b> Transfer between subway lines for free at interchange stations. Transfer between subway and bus for free within 30 minutes of tapping off.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Bus System (버스)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Seoul&apos;s bus system complements the subway and reaches areas without subway coverage. Buses are color-coded by type:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Color</th>
                <th className="text-left p-2 font-bold">Type</th>
                <th className="text-left p-2 font-bold">Fare (T-money)</th>
                <th className="text-left p-2 font-bold">Route</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Blue (파란색)</td>
                <td className="p-2">Trunk line</td>
                <td className="p-2">₩1,200</td>
                <td className="p-2">Major routes across Seoul, long distance</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Green (초록색)</td>
                <td className="p-2">Branch line</td>
                <td className="p-2">₩1,200</td>
                <td className="p-2">Connects neighborhoods to subway stations</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Red (빨간색)</td>
                <td className="p-2">Express</td>
                <td className="p-2">₩2,300</td>
                <td className="p-2">Seoul to satellite cities (Bundang, Ilsan, etc.)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Yellow (노란색)</td>
                <td className="p-2">Circular</td>
                <td className="p-2">₩1,200</td>
                <td className="p-2">Short circular routes in downtown areas</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Important:</b> Tap your T-money card when boarding AND when getting off the bus. If you forget to tap off, you will be charged the maximum fare and lose your free transfer benefit. Use Naver Map (네이버 지도) to find the right bus number and stop -- it provides real-time bus arrival information.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">KTX High-Speed Train (KTX 고속열차)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The KTX (Korea Train Express) is Korea&apos;s high-speed rail system connecting major cities at speeds up to 305 km/h. It is the most comfortable and time-efficient way to travel between cities.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Route</th>
                <th className="text-left p-2 font-bold">Duration</th>
                <th className="text-left p-2 font-bold">Price (Standard)</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul → Busan (부산)</td>
                <td className="p-2">2h 30min</td>
                <td className="p-2">~₩59,800</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul → Daejeon (대전)</td>
                <td className="p-2">50min</td>
                <td className="p-2">~₩23,700</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul → Daegu (대구)</td>
                <td className="p-2">1h 40min</td>
                <td className="p-2">~₩43,500</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul → Gwangju (광주)</td>
                <td className="p-2">1h 50min</td>
                <td className="p-2">~₩44,800</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Seoul → Gangneung (강릉)</td>
                <td className="p-2">1h 50min</td>
                <td className="p-2">~₩27,600</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Booking:</b> Book online at letskorail.com (English available), via the Korail Talk app (코레일톡), or at station ticket counters/kiosks.</li>
          <li><b>SRT (수서고속철도):</b> A second high-speed rail operator departing from Suseo Station (수서역) in southern Seoul. Often cheaper than KTX with the same speed. Book via the SRT app.</li>
          <li><b>Discounts:</b> Book early for up to 10-30% off. The KR Pass (Korea Rail Pass) is available exclusively to foreigners for unlimited travel over 2-5 consecutive days.</li>
          <li><b>Luggage:</b> No strict luggage limits, but overhead racks and space behind seats accommodate standard suitcases. No extra charge for luggage.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Express & Intercity Bus (고속버스 / 시외버스)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Buses are a cheaper alternative to KTX for intercity travel, with extensive coverage to cities and towns that trains do not reach.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Express bus (고속버스):</b> Connects major cities on highways. Seoul to Busan costs ~₩23,000-34,000 (standard/premium) and takes about 4 hours. Book via the Express Bus app (고속버스 모바일) or at the terminal.</li>
          <li><b>Intercity bus (시외버스):</b> Connects smaller cities and towns with more stops along the way. Cheaper and slower than express buses. Book via the T-money Express Bus app or at terminals.</li>
          <li><b>Bus classes:</b> 일반 (standard), 우등 (premium with wider seats and more legroom, ~30-40% more expensive), and 심야 (late-night, limited routes with surcharge).</li>
          <li><b>Major terminals in Seoul:</b> Express Bus Terminal (고속터미널, Line 3/7/9), Dong Seoul Terminal (동서울터미널, Line 2), and Seoul Nambu Terminal (남부터미널, Line 3).</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Taxi (택시)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean taxis are safe, metered, and relatively affordable compared to most developed countries. There are several types:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Regular taxi (일반택시):</b> Orange or silver cars. Base fare ~₩4,800 for the first 1.6km, then ₩100 per 131m. A typical 5km ride costs ₩7,000-10,000.</li>
          <li><b>Deluxe taxi (모범택시):</b> Black cars with a gold stripe. More spacious and comfortable. Base fare ~₩7,000. Better English ability from drivers. No late-night surcharge.</li>
          <li><b>Late-night surcharge (심야할증):</b> Regular taxis charge 20% extra between 10 PM and 4 AM (40% in some areas). Factor this into late-night travel budgets.</li>
          <li><b>Kakao T (카카오 T):</b> The most popular taxi-hailing app. Enter your destination, get a fare estimate, and a driver is dispatched. Payment can be cashless through the app. Highly recommended for foreigners as it eliminates communication issues with drivers -- just show the app screen.</li>
          <li><b>Tipping:</b> No tipping for taxis. The metered fare is the total amount.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Incheon Airport to Seoul</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Getting from Incheon International Airport (인천국제공항) to central Seoul is straightforward with multiple options:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Option</th>
                <th className="text-left p-2 font-bold">Time</th>
                <th className="text-left p-2 font-bold">Cost</th>
                <th className="text-left p-2 font-bold">Best For</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">AREX All-Stop</td>
                <td className="p-2">56-66 min</td>
                <td className="p-2">₩4,250</td>
                <td className="p-2">Budget travelers, connects to Seoul subway</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">AREX Express</td>
                <td className="p-2">43 min</td>
                <td className="p-2">₩11,000</td>
                <td className="p-2">Speed + comfort, non-stop to Seoul Station</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Airport Bus</td>
                <td className="p-2">60-90 min</td>
                <td className="p-2">₩16,000-17,000</td>
                <td className="p-2">Door-to-door if your area is on the route</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Taxi</td>
                <td className="p-2">50-80 min</td>
                <td className="p-2">₩65,000-80,000</td>
                <td className="p-2">Groups, heavy luggage, late-night arrivals</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Recommendation:</b> For most foreigners, the <b>AREX All-Stop train</b> (₩4,250) offers the best value. It connects directly to the Seoul subway at several stations including Seoul Station, Hongik University (Hongdae), and Digital Media City. Buy your T-money card at the airport convenience store first and use it on the AREX. Use our{" "}
          <Link href="/en/cost-of-living" className="text-[var(--primary)] font-bold hover:underline">Cost of Living Calculator</Link> to factor transportation into your monthly budget.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Useful Transportation Apps</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          These apps are essential for navigating Korea&apos;s transportation system. Download them before you start traveling.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Naver Map (네이버 지도):</b> The best navigation app for Korea. Provides accurate transit directions with real-time bus and subway information. Far superior to Google Maps in Korea due to map data restrictions. English interface available.</li>
          <li><b>Kakao Map (카카오맵):</b> Excellent alternative to Naver Map with good transit planning. Some users prefer its interface for walking directions.</li>
          <li><b>Kakao T (카카오 T):</b> Taxi-hailing app. Enter destination, see fare estimate, and call a taxi. Supports credit card payment through the app. Also offers Kakao T Bike (bike rental) and Kakao T Parking. Check our{" "}
            <Link href="/en/subway" className="text-[var(--primary)] font-bold hover:underline">Subway Calculator</Link> for fare estimates.</li>
          <li><b>Korail Talk (코레일톡):</b> Official KTX and Korail train booking app. Requires Korean phone number for registration.</li>
          <li><b>Express Bus app (고속버스 모바일):</b> Book express bus tickets between cities. Available in Korean; use Papago to translate if needed.</li>
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
