import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korean Food Guide for Foreigners - Ordering, Prices & Must-Try Dishes",
  description:
    "How to order food in Korea as a foreigner. Restaurant etiquette, menu translations, prices, delivery apps, and 20 must-try dishes.",
  alternates: { canonical: "https://moduncalc.com/en/guide/korean-food-guide" },
  openGraph: {
    title: "Korean Food Guide for Foreigners - Ordering, Prices & Must-Try Dishes",
    description:
      "How to order food in Korea as a foreigner. Restaurant etiquette, menu translations, prices, delivery apps, and 20 must-try dishes.",
    url: "https://moduncalc.com/en/guide/korean-food-guide",
  },
};

const faqItems = [
  {
    q: "Do I need to tip at restaurants in Korea?",
    a: "No, tipping is NOT expected or customary in Korea. In fact, it can sometimes cause confusion -- staff may try to return the extra money thinking you overpaid. The price on the menu is the final price you pay (including tax). This applies to all restaurants, cafes, bars, taxis, hair salons, and delivery drivers. The no-tipping culture is one of the things foreigners appreciate most about Korea. Simply pay the bill amount and say thank you (감사합니다 / gamsahamnida).",
  },
  {
    q: "How do I order food if I do not speak Korean?",
    a: "Many restaurants in tourist areas and major cities have English menus or picture menus. If not, use these strategies: (1) Point at photos on the menu or pictures on the wall, (2) Use the Papago (파파고) or Google Translate camera feature to translate Korean menus in real time, (3) Look for numbered menu items and say the number + 'hana' (하나 = one) or use fingers, (4) Many Korean restaurants now use kiosk ordering machines (키오스크) or tablet ordering that sometimes have English options. The phrase '이거 주세요' (igeo juseyo = this one please) while pointing is universally understood.",
  },
  {
    q: "Are there vegetarian or vegan options in Korea?",
    a: "Vegetarian and vegan dining in Korea has improved significantly but remains challenging compared to Western countries. Many Korean dishes contain hidden animal products -- kimchi often uses fish sauce (젓갈), soups frequently use anchovy stock (멸치육수), and side dishes may contain shrimp paste. For vegetarians, temple food restaurants (사찰음식) are the best option -- they serve entirely plant-based traditional Korean cuisine. The phrase '고기 빼주세요' (gogi bbae juseyo = please remove the meat) and '채식주의자입니다' (chaesigjuuija imnida = I am vegetarian) are useful. Apps like HappyCow list vegetarian-friendly restaurants in Korea.",
  },
  {
    q: "How much should I budget for food in Korea per month?",
    a: "A reasonable monthly food budget in Korea ranges from ₩300,000 to ₩600,000 depending on your eating habits. If you cook at home and eat at affordable Korean restaurants, ₩300,000-400,000 is achievable. Eating out for most meals at mid-range restaurants runs ₩500,000-600,000. A typical Korean lunch at a local restaurant (김치찌개, 비빔밥, or 제육볶음 with rice and side dishes) costs ₩8,000-12,000. Convenience store meals cost ₩3,000-6,000. Delivery adds ₩2,000-3,000 in fees per order. Grocery shopping at discount marts like Emart (이마트) or Homeplus is the most economical option for daily meals.",
  },
];

export default function KoreanFoodGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korean Food Guide for Foreigners"
      description="Everything you need to know about eating in Korea: restaurant etiquette, how to order, must-try dishes with Korean names and prices, delivery apps, and dietary restriction tips."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Korean Food Guide for Foreigners - Ordering, Prices & Must-Try Dishes",
            description:
              "How to order food in Korea as a foreigner. Restaurant etiquette, menu translations, prices, delivery apps, and 20 must-try dishes.",
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
        <h2 className="text-base font-extrabold mb-3">Restaurant Basics & Etiquette</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean restaurants operate differently from what most foreigners are used to. Understanding these basics will make your dining experience much smoother:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Free side dishes (반찬 / banchan):</b> Every Korean restaurant serves complimentary side dishes with your meal -- kimchi (김치), pickled radish (단무지), bean sprouts (콩나물), and more. These are free and refillable. Just ask: &quot;반찬 더 주세요&quot; (banchan deo juseyo = more side dishes please).</li>
          <li><b>Water is self-service:</b> Most restaurants have a water dispenser (정수기) or water pitcher area. Water, chopsticks, and spoons are typically self-service. Look for a dispenser near the entrance or side of the restaurant.</li>
          <li><b>Call button or &quot;여기요!&quot;:</b> Many restaurants have a buzzer button (호출벨) on the table to call staff. If there is no button, simply call out &quot;여기요!&quot; (yogiyo = over here!) or raise your hand. This is perfectly polite in Korea.</li>
          <li><b>Shoes off (sometimes):</b> Traditional restaurants with floor seating (좌식) require you to remove your shoes. Look for a shoe rack or step up at the entrance to the seating area.</li>
          <li><b>No tipping:</b> Do NOT tip. It is not customary and can cause confusion. The price on the menu is the total price including tax.</li>
          <li><b>Payment:</b> Pay at the counter (계산대) when leaving, not at the table. Most places accept credit/debit cards. Cash is rarely needed except at very small traditional eateries or street food vendors.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">How to Order</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          There are several ordering methods in Korean restaurants, and they vary by establishment:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Call the server:</b> Say &quot;여기요!&quot; (yogiyo) or press the table buzzer (호출벨). Point at the menu item you want and say &quot;이거 주세요&quot; (igeo juseyo = this one please). Add &quot;하나&quot; (hana = one), &quot;둘&quot; (dul = two), or show fingers for quantity.</li>
          <li><b>Kiosk ordering (키오스크):</b> Increasingly common at chain restaurants, fast food, and cafes. Touch-screen machines at the entrance where you select, pay, and get a number. Some have English options -- look for a flag icon or &quot;English&quot; button.</li>
          <li><b>Tablet ordering (태블릿 주문):</b> Some restaurants have tablets at each table. Browse the menu, select items, and submit your order digitally. Popular at BBQ and izakaya-style restaurants.</li>
          <li><b>Useful ordering phrases:</b> &quot;메뉴판 주세요&quot; (menupan juseyo = menu please), &quot;추천 메뉴 뭐예요?&quot; (chucheon menu mwoyeyo = what do you recommend?), &quot;안 맵게 해주세요&quot; (an maepge haejuseyo = not spicy please), &quot;계산이요&quot; (gyesaniyo = check please).</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Must-Try Korean Dishes & Prices (2026)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          These are the essential Korean dishes every foreigner should try. Prices are typical ranges for Seoul and may be lower in other cities. Use our{" "}
          <Link href="/en/grocery" className="text-[var(--primary)] font-bold hover:underline">Grocery Calculator</Link> to compare eating out vs cooking at home.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Dish</th>
                <th className="text-left p-2 font-bold">Korean</th>
                <th className="text-left p-2 font-bold">Price Range</th>
                <th className="text-left p-2 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Kimchi Stew</td>
                <td className="p-2">김치찌개</td>
                <td className="p-2">₩8,000-10,000</td>
                <td className="p-2">Spicy kimchi and pork stew, a daily staple</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Samgyeopsal</td>
                <td className="p-2">삼겹살</td>
                <td className="p-2">₩15,000-20,000/pp</td>
                <td className="p-2">Grilled pork belly, Korea&apos;s most popular BBQ</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Bibimbap</td>
                <td className="p-2">비빔밥</td>
                <td className="p-2">₩8,000-12,000</td>
                <td className="p-2">Mixed rice with vegetables, egg, and gochujang</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Bulgogi</td>
                <td className="p-2">불고기</td>
                <td className="p-2">₩12,000-18,000</td>
                <td className="p-2">Marinated sliced beef, sweet and savory</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Tteokbokki</td>
                <td className="p-2">떡볶이</td>
                <td className="p-2">₩4,000-5,000</td>
                <td className="p-2">Spicy rice cakes in red pepper sauce</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Gimbap</td>
                <td className="p-2">김밥</td>
                <td className="p-2">₩3,000-4,000</td>
                <td className="p-2">Korean rice rolls with vegetables and meat</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Fried Chicken</td>
                <td className="p-2">치킨</td>
                <td className="p-2">₩18,000-22,000</td>
                <td className="p-2">Korean fried chicken -- crispy, spicy, or soy garlic</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Ramyeon</td>
                <td className="p-2">라면</td>
                <td className="p-2">₩4,000-5,000</td>
                <td className="p-2">Korean instant noodles served at restaurants</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Sundubu Jjigae</td>
                <td className="p-2">순두부찌개</td>
                <td className="p-2">₩8,000-10,000</td>
                <td className="p-2">Soft tofu stew, mild to very spicy</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Jajangmyeon</td>
                <td className="p-2">짜장면</td>
                <td className="p-2">₩6,000-8,000</td>
                <td className="p-2">Black bean sauce noodles, Korean-Chinese classic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Street Food Guide</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean street food (길거리 음식) is legendary. You will find food stalls (포장마차) at markets, outside subway stations, and in popular areas. Most items cost ₩1,000-5,000 and are paid in cash.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Eomuk / Odeng (어묵/오뎅):</b> Fish cake skewers in warm broth, ₩1,000-2,000 per skewer. A perfect winter snack. You drink the broth from cups at the stall.</li>
          <li><b>Hotteok (호떡):</b> Sweet filled pancakes with brown sugar, cinnamon, and nuts, ₩1,500-2,000. Best in winter from street vendors.</li>
          <li><b>Bungeoppang (붕어빵):</b> Fish-shaped pastries filled with sweet red bean paste (팥), ₩1,000-2,000 for 3-4 pieces. A beloved winter street snack.</li>
          <li><b>Tteokbokki (떡볶이):</b> The street food version -- spicier and cheaper than restaurant versions, ₩3,000-4,000 per serving.</li>
          <li><b>Tornado potato (회오리감자):</b> Spiral-cut potato on a stick, deep-fried, ₩3,000-4,000. Popular at markets and festivals.</li>
          <li><b>Sundae (순대):</b> Korean blood sausage stuffed with glass noodles. Often served with tteokbokki. ₩3,000-4,000 per serving.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Best street food spots:</b> Gwangjang Market (광장시장), Myeongdong (명동), Hongdae (홍대), Namdaemun Market (남대문시장), and any traditional market (전통시장) in your neighborhood.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Delivery Apps (배달앱)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea has one of the most advanced food delivery systems in the world. You can get almost anything delivered to your door in 30-60 minutes, including convenience store items.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Baemin / 배달의민족:</b> The largest delivery platform. Huge restaurant selection, regular discounts and coupons. The app has limited English but is navigable with pictures. Delivery fee: ₩0-4,000.</li>
          <li><b>Coupang Eats (쿠팡이츠):</b> Coupang&apos;s food delivery service. Clean interface, competitive pricing, and integration with Coupang membership (로켓와우). Often offers free delivery promotions.</li>
          <li><b>Yogiyo (요기요):</b> Another major delivery platform with a wide selection. Frequently offers discount coupons. Similar to Baemin in functionality.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Tip:</b> Delivery minimums are typically ₩10,000-15,000. Delivery fees range from free to ₩4,000. Late-night delivery (야간 배달) after 12 AM may have higher fees. Most delivery drivers will bring the food directly to your door -- leave detailed address notes including apartment building number and unit.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Convenience Store Food (편의점)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean convenience stores (편의점) -- CU, GS25, 7-Eleven, and emart24 -- are a budget-friendly meal option with surprisingly good food. They are open 24/7 and found on virtually every block.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Triangle gimbap (삼각김밥):</b> ₩1,200-1,800. Rice triangles with various fillings (tuna mayo, kimchi, bulgogi). The ultimate quick Korean snack.</li>
          <li><b>Dosirak / lunchbox (도시락):</b> ₩3,500-5,500. Full meal boxes with rice, meat, and side dishes. Microwave at the store. Quality rivals fast food restaurants.</li>
          <li><b>Cup ramyeon (컵라면):</b> ₩1,200-2,000. Hot water dispensers are available at all convenience stores. Some stores have seating areas for eating.</li>
          <li><b>Sandwiches and wraps:</b> ₩2,500-4,000. Fresh sandwiches are restocked daily and are a solid breakfast option.</li>
          <li><b>Frozen meals:</b> ₩2,500-4,500. Frozen dumplings (만두), fried rice (볶음밥), and pasta that you microwave at the store.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Money-saving tip:</b> Convenience stores run &quot;1+1&quot; (buy one get one free) and &quot;2+1&quot; promotions constantly. Check the promotional tags on products. The CU, GS25, and 7-Eleven apps show current deals.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Dietary Restrictions</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea is not the easiest country for dietary restrictions, but options are improving, especially in Seoul:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Vegetarian (채식):</b> Challenging but possible. Many soups use anchovy or beef stock even if they appear vegetable-based. Temple food restaurants (사찰음식) are fully plant-based. Bibimbap without egg is a safe option at most restaurants. Say &quot;고기 빼주세요&quot; (no meat please) and &quot;해산물도 빼주세요&quot; (no seafood either).</li>
          <li><b>Vegan (비건):</b> More difficult but growing. Seoul has a growing number of dedicated vegan restaurants and cafes, especially in Itaewon, Gangnam, and Hapjeong areas. The app HappyCow is your best resource.</li>
          <li><b>Halal (할랄):</b> Halal-certified restaurants are concentrated in Itaewon&apos;s Muslim quarter near Seoul Central Mosque (서울중앙성원). The Korea Tourism Organization maintains a list of halal-certified restaurants. Some Korean fried chicken chains are halal-certified at specific locations.</li>
          <li><b>Gluten-free:</b> Korean cuisine naturally includes many gluten-free options since rice (not wheat) is the staple. However, soy sauce (간장) contains wheat, and many sauces and marinades include it. Stick to grilled meats, rice, and fresh vegetables. Ask for dishes without soy sauce: &quot;간장 빼주세요&quot; (ganjang bbae juseyo).</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          Use our{" "}
          <Link href="/en/tip-calculator" className="text-[var(--primary)] font-bold hover:underline">Tip Calculator</Link> for reference when traveling to other countries -- but remember, you never need it in Korea.
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
