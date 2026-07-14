import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korean Delivery Apps Guide - How to Order Food in Korea",
  description:
    "How to use Korean food delivery apps as a foreigner: 배달의민족, 쿠팡이츠, and more. English-friendly tips and ordering guide.",
  alternates: { canonical: "https://moduncalc.com/en/guide/delivery-apps" },
  openGraph: {
    title: "Korean Delivery Apps Guide - How to Order Food in Korea",
    description:
      "How to use Korean food delivery apps as a foreigner: 배달의민족, 쿠팡이츠, and more. English-friendly tips and ordering guide.",
    url: "https://moduncalc.com/en/guide/delivery-apps",
  },
};

const faqItems = [
  {
    q: "Do I need to tip delivery drivers in Korea?",
    a: "No. Korea does not have a tipping culture (팁 문화). Delivery drivers, restaurant staff, taxi drivers, and service workers do not expect tips. The price you see on the app is the total price you pay, including delivery fees. Adding a tip would actually confuse most Korean delivery drivers. This applies to all food delivery apps including 배달의민족 (Baemin), 쿠팡이츠 (Coupang Eats), and 요기요 (Yogiyo).",
  },
  {
    q: "Can I use delivery apps without speaking Korean?",
    a: "Yes, though it requires some navigation. 쿠팡이츠 (Coupang Eats) has the most English-friendly interface among the major apps. 배달의민족 (Baemin) is mostly in Korean but has food photos and some English menu descriptions at popular restaurants. Use Papago (파파고) or Google Translate's camera feature to translate menu items in real-time. Most apps accept international credit cards registered to a Korean address, making payment straightforward even without reading Korean.",
  },
  {
    q: "What are the delivery hours in Korea?",
    a: "Most restaurants on delivery apps operate from 10:00 AM to midnight, but Korea's delivery culture is famous for its late-night availability. Many chicken restaurants (치킨집), fast food chains, and convenience stores deliver until 2:00-4:00 AM. Some areas in Seoul have 24-hour delivery options. 쿠팡이츠 (Coupang Eats) and 배달의민족 (Baemin) both show real-time restaurant availability, so you can see which restaurants are currently accepting orders regardless of the hour.",
  },
];

export default function DeliveryAppsGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korean Delivery Apps Guide"
      description="How to order food delivery in Korea as a foreigner: app comparisons, step-by-step ordering guide, payment methods, and tips for navigating Korean-language interfaces."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Korean Delivery Apps Guide - How to Order Food in Korea",
            description:
              "How to use Korean food delivery apps as a foreigner: 배달의민족, 쿠팡이츠, and more. English-friendly tips and ordering guide.",
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
        <h2 className="text-base font-extrabold mb-3">Korean Delivery Culture (배달 문화)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea has one of the fastest and most developed food delivery ecosystems in the world. Delivery (배달 / baedal) is deeply ingrained in Korean culture -- you can get virtually anything delivered to your door within 20-40 minutes, from hot restaurant meals to convenience store snacks to groceries. Unlike many Western countries, delivery in Korea is not limited to pizza and fast food. Korean BBQ, sushi, full-course meals, and even late-night fried chicken (치맥 / chimaek -- chicken and beer) are all standard delivery fare.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          The average Korean orders delivery 2-3 times per week. As a foreigner, mastering delivery apps will make your life significantly more convenient, especially when you are tired after work and do not want to cook or go out.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Major Delivery Apps Comparison</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Three apps dominate Korea&apos;s food delivery market. Here is how they compare:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">App</th>
                <th className="text-left p-2 font-bold">Korean Name</th>
                <th className="text-left p-2 font-bold">Market Share</th>
                <th className="text-left p-2 font-bold">Delivery Fee</th>
                <th className="text-left p-2 font-bold">English Support</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Baemin</td>
                <td className="p-2">배달의민족</td>
                <td className="p-2">Largest (#1)</td>
                <td className="p-2">0-4,000 KRW</td>
                <td className="p-2">Some English UI</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Coupang Eats</td>
                <td className="p-2">쿠팡이츠</td>
                <td className="p-2">#2, growing fast</td>
                <td className="p-2">0-4,000 KRW</td>
                <td className="p-2">Most foreigner-friendly</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Yogiyo</td>
                <td className="p-2">요기요</td>
                <td className="p-2">#3</td>
                <td className="p-2">0-3,000 KRW</td>
                <td className="p-2">Korean only</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Recommendation:</b> Start with 쿠팡이츠 (Coupang Eats) if you cannot read Korean, as it has the best English interface. Once you are more comfortable, add 배달의민족 (Baemin) for its larger restaurant selection. Many restaurants are available on multiple apps, so you can compare delivery fees and promotions.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Step-by-Step Ordering Guide</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Here is how to place your first order, with Korean UI terms translated:
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]">Download the app and sign up. You will need a Korean phone number for SMS verification. Set your delivery address (배달 주소) -- you can search by 동 (neighborhood name) or use GPS.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]">Browse categories or search (검색). Common categories: 치킨 (chicken), 피자 (pizza), 중국집 (Chinese), 한식 (Korean), 분식 (snacks/tteokbokki), 야식 (late-night food), 카페/디저트 (cafe/desserts).</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 3</span>
            <span className="text-sm text-[#4E5968]">Select a restaurant. Check the 최소주문금액 (minimum order amount, usually 10,000-15,000 KRW), delivery fee (배달비), and estimated time (예상 소요시간). Reviews (리뷰) with photos help you choose.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 4</span>
            <span className="text-sm text-[#4E5968]">Add items to your cart (장바구니). Customize options when prompted -- 맵기 (spice level), 사이즈 (size), 추가 (extras/add-ons). Tap 주문하기 (place order) when ready.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 5</span>
            <span className="text-sm text-[#4E5968]">Choose payment: 카드결제 (card payment), 카카오페이 (KakaoPay), 토스페이 (TossPay), or 만나서결제 (pay on delivery -- cash or card). Confirm your order and track the delivery in real-time.</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Payment Methods & Fees</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean delivery apps accept several payment methods:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Credit/debit card (카드결제):</b> Register your Korean bank card in the app. International cards (Visa, Mastercard) sometimes work but may require a Korean billing address.</li>
          <li><b>KakaoPay (카카오페이):</b> Link your bank account or card through KakaoTalk. Very convenient and widely accepted across all delivery platforms.</li>
          <li><b>TossPay (토스페이):</b> Another popular mobile payment option linked to the Toss (토스) app. Easy to set up if you already use Toss for banking.</li>
          <li><b>Pay on delivery (만나서결제):</b> Some restaurants allow you to pay cash or card when the food arrives. Less common now but still available.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Delivery fees (배달비):</b> Typically range from 0-4,000 KRW per order. Some apps offer free delivery promotions or subscription plans -- 쿠팡이츠 has a &quot;Coupang Rocket&quot; membership and 배달의민족 has &quot;배민1&quot; for reduced delivery fees.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Tipping:</b> There is NO tipping culture in Korea. Do not tip your delivery driver -- it is not expected and can cause confusion. The delivery fee is the only additional cost beyond your food price.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Useful Korean Phrases for Delivery</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If a delivery driver calls you (which is common when they cannot find your building), these phrases will help:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Korean</th>
                <th className="text-left p-2 font-bold">Pronunciation</th>
                <th className="text-left p-2 font-bold">English</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">문 앞에 놓아주세요</td>
                <td className="p-2">mun ape noajuseyo</td>
                <td className="p-2">Please leave it at the door</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">비밀번호는 ____입니다</td>
                <td className="p-2">bimilbeonho-neun ____imnida</td>
                <td className="p-2">The door code is ____</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">___층이에요</td>
                <td className="p-2">___cheung-ieyo</td>
                <td className="p-2">I am on the ___ floor</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">수저/젓가락 빼주세요</td>
                <td className="p-2">sujeo/jeotgarak ppaejuseyo</td>
                <td className="p-2">Please leave out the spoon/chopsticks</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">감사합니다</td>
                <td className="p-2">gamsahamnida</td>
                <td className="p-2">Thank you</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Most apps have a &quot;delivery request&quot; (배달 요청사항) text field where you can leave instructions. Common requests include &quot;문 앞에 놓아주세요&quot; (leave at the door) and your building entrance code. You can also order from convenience stores like CU and GS25 through delivery apps for snacks, drinks, and daily necessities. Check our{" "}
          <Link href="/en/cost-of-living" className="text-[var(--primary)] font-bold hover:underline">Cost of Living Calculator</Link> to see how delivery costs fit into your monthly budget.
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
