import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Shopping in Korea for Foreigners - Online & Offline Guide (2026)",
  description: "Where to shop in Korea? Coupang, Gmarket, Daiso, outlets & traditional markets. Tax refund for tourists. Online shopping tips.",
  alternates: { canonical: "https://moduncalc.com/en/guide/shopping-guide" },
  openGraph: {
    title: "Shopping in Korea for Foreigners - Online & Offline Guide (2026)",
    description: "Complete guide to shopping in Korea: Coupang, Gmarket, traditional markets, tax-free shopping, clothing sizes, and online payment methods.",
    url: "https://moduncalc.com/en/guide/shopping-guide",
  },
};

const faqItems = [
  {
    q: "Can foreigners use Coupang in Korea?",
    a: "Yes, foreigners with an ARC (외국인등록증) can sign up for Coupang (쿠팡) and use all its features, including Rocket Delivery (로켓배송) which delivers by the next morning for orders placed before midnight. You will need a Korean phone number and ARC number to register. Payment can be made with Korean bank cards (체크카드/신용카드) or through Coupang Pay. Some international credit cards also work. Coupang's app and website are primarily in Korean, but the product images and prices are easy to navigate even with limited Korean. Coupang Rocket Fresh (로켓프레시) also delivers fresh groceries.",
  },
  {
    q: "How does tax-free shopping work in Korea for tourists?",
    a: "Tourists can get a tax refund (부가세 환급) of 10% on purchases of ₩15,000 or more (per receipt) at stores displaying the 'Tax Free' logo. At the time of purchase, show your passport and ask for a tax refund slip. When departing Korea, visit the tax refund counter at Incheon Airport (before or after immigration, depending on purchase amount). For purchases under ₩750,000, you can use the automatic kiosk. For larger amounts, visit the customs counter before check-in. Services like Global Blue, Global Tax Free, and KT Tourist Reward handle the refund. You can also get an immediate refund at many large stores by showing your passport at checkout.",
  },
  {
    q: "What are the best traditional markets to visit in Korea?",
    a: "The top traditional markets (전통시장) in Seoul include: Namdaemun Market (남대문시장) — Korea's largest market with everything from clothing to kitchenware; Dongdaemun Market (동대문시장) — famous for fashion and fabrics, many shops open until 5 AM; Gwangjang Market (광장시장) — best for Korean street food like bindaetteok (녹두전), mayak gimbap, and tteokbokki; Noryangjin Fish Market (노량진수산시장) — fresh seafood where you pick your fish and have it prepared on the spot. Outside Seoul, Jagalchi Market in Busan and Seomun Market in Daegu are must-visits. Bargaining is common at traditional markets — try asking '깎아주세요' (kkakkajuseyo, please give me a discount).",
  },
];

export default function ShoppingGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Shopping in Korea for Foreigners"
      description="Everything you need to know about shopping in Korea — online platforms, offline stores, traditional markets, tax refunds, and Korean payment methods."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Shopping in Korea for Foreigners - Online & Offline Guide (2026)",
            description: "Complete guide to shopping in Korea: Coupang, Gmarket, traditional markets, tax-free shopping, clothing sizes, and online payment methods.",
            datePublished: "2026-01-01",
            dateModified: "2026-07-16",
            author: { "@type": "Organization", name: "ModunCalc", url: "https://moduncalc.com" },
          }),
        }}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">Online Shopping Platforms</h2>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-bold mb-1">Coupang (쿠팡) — Korea&apos;s Amazon</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Korea&apos;s largest e-commerce platform. <b>Rocket Delivery (로켓배송)</b> gets items to your door by the next morning for orders before midnight. Rocket Fresh delivers groceries. Pricing is competitive, and returns are hassle-free (free returns within 30 days for Rocket items). Requires ARC + Korean phone number to sign up. The Coupang app is primarily in Korean, but navigation is intuitive. <b>Coupang Wow</b> membership (~₩7,890/month) gives free shipping on all Rocket items, Coupang Play (streaming), and Coupang Eats discounts.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1">Gmarket / 11st (십일번가)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Open marketplace platforms with millions of sellers. Gmarket has an <b>English version</b> (global.gmarket.co.kr) that ships internationally. 11st is similar, owned by SK. Both have frequent sales events and coupon promotions. Good for finding niche Korean products, K-beauty items, and electronics at competitive prices. Delivery is typically 1-3 days within Korea.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1">Naver Shopping (네이버 쇼핑)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Price comparison engine that aggregates listings from multiple shopping sites. Great for finding the best price on any product. <b>Naver Pay (네이버페이)</b> offers cashback points on purchases. Many small Korean businesses sell exclusively through their Naver Smart Store (스마트스토어).
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Offline Shopping</h2>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-bold mb-1">Large Marts (대형마트)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              <b>E-Mart (이마트)</b>, <b>Homeplus (홈플러스)</b>, and <b>Costco (코스트코)</b> are Korea&apos;s big box retailers. E-Mart is the largest Korean chain — great for groceries, household items, and Korean food products. Homeplus (owned by MBK Partners, formerly Tesco) is similar. Costco operates exactly like in the US, accepts international Costco memberships. <b>Note:</b> Large marts are closed on the 2nd and 4th Sundays of each month by law (의무 휴업일) — check before you go.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1">Daiso (다이소)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Korea&apos;s beloved budget store — most items are ₩1,000-5,000. Perfect for household essentials, kitchen tools, stationery, cleaning supplies, phone accessories, and seasonal items. Locations everywhere — there&apos;s likely one within walking distance of your home. The Myeongdong flagship store has 8 floors. Daiso Korea offers significantly more variety than its Japanese counterpart.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1">Olive Young (올리브영)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Korea&apos;s #1 health and beauty store. The best place to buy Korean skincare (K-beauty), cosmetics, hair products, and supplements. Staff can help with recommendations. Tourist-friendly with tax refund available at most locations. Membership (free) earns points and gives access to exclusive deals. Online orders available with same-day delivery in most areas.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Traditional Markets (전통시장)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Traditional markets offer the best prices, authentic Korean food, and a cultural experience you cannot get at modern stores. Most vendors accept cash and card, and some markets now accept <b>온누리상품권</b> (Onnuri gift certificates) which give you 5-10% savings. Key markets in Seoul:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Namdaemun Market (남대문시장):</b> Korea&apos;s largest and oldest market (since 1414). Clothing, accessories, kitchenware, ginseng, dried goods. Wholesale prices available for bulk purchases.</li>
          <li><b>Dongdaemun Market (동대문시장):</b> Fashion capital — clothing, fabrics, and accessories. Many shops open until 5 AM. Doota, APM, and Hello APM are popular fashion buildings.</li>
          <li><b>Gwangjang Market (광장시장):</b> Famous food market. Must-try: bindaetteok (녹두전/mung bean pancakes), mayak gimbap (마약김밥), and yukhoe (육회/Korean beef tartare).</li>
          <li><b>Noryangjin Fish Market (노량진수산시장):</b> Pick fresh seafood and have it sliced on the spot. Sea urchin, live octopus, and sashimi at market prices.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Bargaining tip:</b> Politely ask &quot;깎아주세요&quot; (kkakkajuseyo — please give me a discount). Works best when buying multiple items or at clothing/accessory stalls. Not appropriate at food stalls with fixed prices.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Tax-Free Shopping (면세)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Tourists can get a <b>10% VAT refund</b> on purchases of ₩15,000+ at Tax Free stores. Look for the blue &quot;Tax Free&quot; logo. Two types of refund:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Immediate refund (즉시 환급):</b> Get the tax removed at checkout by showing your passport. Available at participating stores for purchases up to ₩500,000.</li>
          <li><b>Airport refund (공항 환급):</b> Get tax refund slips at stores, then visit the refund counter at Incheon Airport. Use the automatic kiosks for purchases under ₩750,000 (after immigration). For larger amounts, visit customs before check-in.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Duty-free shops (면세점):</b> Lotte, Shilla, and Shinsegae operate downtown duty-free stores where prices are already tax-free. Pick up purchases at the airport. These are different from Tax Free stores — duty-free means no import duties on luxury goods, cosmetics, alcohol, and tobacco.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Korean Payment Methods</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea is nearly cashless — card payment is accepted almost everywhere, even at street food stalls. Key payment methods:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Korean debit/credit cards (체크카드/신용카드):</b> Easiest option once you have a bank account. Tap-to-pay works everywhere. Get a card with good cashback — Kakao Bank and Toss Bank cards are popular.</li>
          <li><b>KakaoPay (카카오페이):</b> QR-code payments linked to your Korean bank account. Also for online payments, money transfers, and bill splitting with friends.</li>
          <li><b>Toss Pay (토스페이):</b> Similar to KakaoPay, popular with younger Koreans. Also offers banking, investment, and insurance services.</li>
          <li><b>Samsung Pay / Apple Pay:</b> Samsung Pay works at virtually every card terminal in Korea (uses MST technology). Apple Pay works at NFC terminals, which are now widespread.</li>
          <li><b>T-money card (티머니):</b> Transportation card that also works at convenience stores and vending machines. Buy at any convenience store for ₩2,500.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          Convert clothing sizes for Korean shopping with our <Link href="/en/size-converter" className="text-[var(--primary)] font-bold hover:underline">Size Converter</Link>.
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
