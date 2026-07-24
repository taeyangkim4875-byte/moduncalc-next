import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korea Nightlife Guide for Foreigners - Bars, Clubs & 노래방 (2026)",
  description: "Going out in Korea? Best areas for nightlife, drinking culture, 소맥 recipe, 노래방 guide & staying safe.",
  alternates: { canonical: "https://moduncalc.com/en/guide/nightlife-guide" },
  openGraph: {
    title: "Korea Nightlife Guide for Foreigners - Bars, Clubs & 노래방 (2026)",
    description: "Complete guide to Korean nightlife: best areas, drinking culture, karaoke (노래방), pojangmacha, and safety tips for foreigners.",
    url: "https://moduncalc.com/en/guide/nightlife-guide",
  },
};

const faqItems = [
  {
    q: "What time do bars and clubs close in Korea?",
    a: "There is no official nationwide closing time for bars and clubs in Korea — many stay open until the early morning or even 24 hours. In entertainment districts like Hongdae (홍대), Gangnam (강남), and Itaewon (이태원), clubs typically operate from 10 PM to 6 AM or later on weekends. Bars usually serve until 2-4 AM. Korean drinking culture often involves multiple rounds (1차, 2차, 3차) at different venues, so a night out can last until dawn. The Seoul subway stops running around midnight (last train varies by line, typically 11:30 PM - 12:30 AM) and resumes around 5:30 AM. Many people take taxis or night buses (심야버스) home.",
  },
  {
    q: "How much does a night out cost in Korea?",
    a: "A typical night out in Korea costs ₩50,000-150,000 depending on the area and style. Breakdown: Dinner with soju at a BBQ restaurant: ₩15,000-25,000 per person. Bar drinks: ₩7,000-15,000 per cocktail (craft beer ₩7,000-10,000). Club entry: ₩10,000-30,000 (often includes 1-2 free drinks). Noraebang (karaoke): ₩15,000-25,000 per hour for a room. Late-night snack (야식): ₩5,000-10,000 for chimaek (치맥, chicken + beer). Taxi home: ₩10,000-30,000 depending on distance. Hongdae and Itaewon are generally cheaper than Gangnam. Pre-gaming at a convenience store with soju (₩1,800) and beer (₩2,500) saves a lot.",
  },
  {
    q: "Is Korea safe for nightlife?",
    a: "Korea is generally very safe for nightlife, consistently ranking among the safest countries in the world. Violent crime is rare, and it is common to see people walking alone at night, even in entertainment districts. However, standard precautions apply: watch your drinks, stay with friends, and be cautious with strangers who are overly persistent. Keep your phone charged for calling taxis (Kakao Taxi app is essential). Some foreigners report occasional discrimination at certain clubs in Itaewon or Gangnam — this is not legal but does occur. If denied entry, simply move to another venue. Emergency number: 112 for police, 119 for ambulance.",
  },
];

export default function NightlifeGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korea Nightlife Guide for Foreigners"
      description="Best nightlife areas, Korean drinking culture, 노래방 (karaoke), pojangmacha street bars, and essential safety tips for a night out in Korea."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Korea Nightlife Guide for Foreigners - Bars, Clubs & 노래방 (2026)",
            description: "Complete guide to Korean nightlife: best areas, drinking culture, karaoke (노래방), pojangmacha, and safety tips for foreigners.",
            datePublished: "2026-01-01",
            dateModified: "2026-07-16",
            author: { "@type": "Organization", name: "ModunCalc", url: "https://moduncalc.com" },
          }),
        }}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">Best Nightlife Areas</h2>
        <div className="space-y-3">
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Hongdae (홍대) — Young & Trendy</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Seoul&apos;s most popular nightlife district, centered around Hongik University. Known for indie music, street performances, affordable bars, and energetic clubs. <b>Best for:</b> 20s-30s crowd, live music, budget-friendly drinking. <b>Key streets:</b> Hongdae main street (홍대 걷고 싶은 거리), Eoulmadang-ro (어울마당로). <b>Clubs:</b> NB (엔비), Cocoon, Madholic. <b>Craft beer:</b> Magpie Brewing, The Booth. Open very late on weekends.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Itaewon (이태원) — International Hub</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              The most foreigner-friendly area with diverse bars, restaurants, and clubs. Increasingly popular with young Koreans too. <b>Best for:</b> international crowd, cocktail bars, diverse food, LGBTQ+ scene (Homo Hill area). <b>Key areas:</b> Main Itaewon-ro, Gyeongnidan-gil (경리단길), Haebangchon (해방촌/HBC). <b>Bars:</b> Southside Parlor, Thunderbird, Against The Machine. Note: Itaewon has changed significantly and some areas are quieter than before.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Gangnam (강남) — Upscale & Flashy</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Seoul&apos;s wealthiest district with high-end clubs, lounges, and restaurants. More expensive than other areas. <b>Best for:</b> 30s+ professionals, upscale experience, K-pop celebrity sightings. <b>Key areas:</b> Gangnam Station area, Sinsa-dong (신사동/가로수길), Cheongdam-dong (청담동). <b>Clubs:</b> Arena, Octagon (legendary super-club). Dress code often enforced.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Hapjeong / Mangwon (합정/망원) — Chill Vibes</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Adjacent to Hongdae but calmer and trendier. Excellent cocktail bars, wine bars, and cozy pubs. <b>Best for:</b> relaxed evenings, craft cocktails, date nights, food before going out. Growing rapidly in popularity as Hongdae becomes more commercialized.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Korean Drinking Culture (술 문화)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Drinking is deeply embedded in Korean social culture. Understanding the etiquette will help you navigate social situations:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Soju (소주):</b> Korea&apos;s iconic spirit (~17% ABV). A 360ml bottle costs ₩1,800-5,000. Major brands: Chamisul (참이슬), Chum Churum (처음처럼), Good Day (좋은데이). Flavored versions (fruit soju) are very popular — peach (복숭아), grape (포도), and green grape (청포도) are crowd favorites.</li>
          <li><b>Beer (맥주):</b> Korean beers include Cass (카스) and Hite (하이트). Craft beer is booming — try local brands at taprooms in Hongdae, Itaewon, and Yeonnam-dong. A pint costs ₩5,000-10,000.</li>
          <li><b>Somaek (소맥):</b> The legendary soju + beer combo. Standard ratio: 3 parts beer, 1 part soju. Pour beer first, add soju, then stir gently (or do the chopstick spin for style points). This will get you drunk faster than you expect.</li>
          <li><b>Makgeolli (막걸리):</b> Traditional rice wine (~6% ABV). Milky, slightly sweet, and refreshing. Best paired with pajeon (파전/Korean pancake). Popular at traditional-style bars (주막).</li>
        </ul>

        <h3 className="text-sm font-bold mt-4 mb-2">Drinking Etiquette</h3>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Pour for others, not yourself:</b> Always fill others&apos; glasses, and wait for someone else to fill yours. Use two hands when pouring for or receiving from someone older.</li>
          <li><b>Turn away when drinking:</b> When drinking with someone older or senior, turn your head slightly to the side — this is a sign of respect (especially important at work dinners / 회식).</li>
          <li><b>Never refuse the first drink:</b> It is polite to accept at least the first drink offered. After that, you can pace yourself. Saying you cannot drink for health reasons is an acceptable way to decline.</li>
          <li><b>Don&apos;t pour into a glass that still has drink:</b> Wait until the glass is empty before refilling — pouring into a partially full glass is considered bad luck.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">노래방 (Noraebang / Karaoke)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Noraebang (노래방, literally &quot;singing room&quot;) is an essential part of Korean nightlife and socializing. Unlike Western karaoke bars, you get a private room with your group, a massive song library, tambourines, and often disco lights.
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Price</span>
            <span className="text-sm text-[#4E5968]">₩15,000-25,000 per hour for a room (not per person). Coin noraebang (코인노래방) charges per song: ₩500-1,000 per song — great for solo singing or small groups.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Songs</span>
            <span className="text-sm text-[#4E5968]">English songs are available (look for the English menu on the remote). K-pop, J-pop, and Chinese songs are well-stocked. Search by song number, title, or artist. Two main systems: TJ (태진) and KumYoung (금영).</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Tips</span>
            <span className="text-sm text-[#4E5968]">Many noraebangs are open 24 hours. Late-night (after 12 AM) rates are often cheaper. Some offer food and drinks (snack noraebang). Luxury noraebangs in Gangnam have better sound systems and larger rooms. Tambourine shaking is mandatory fun.</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Pojangmacha (포장마차) — Street Tent Bars</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Pojangmacha are the iconic orange tent bars you see on Korean streets and in K-dramas. They serve simple drinking snacks (안주) like tteokbokki (떡볶이), odeng/eomuk (오뎅/어묵, fish cake skewers), and fried foods, along with soju and beer. They are a quintessentially Korean experience — sitting on small plastic stools, eating hot food from the steam, and people-watching.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Where to find them:</b> Myeongdong, Jongno, near university areas, and along the Han River (한강). Gwangjang Market has excellent indoor pojangmacha. Prices are reasonable: expect ₩3,000-8,000 per dish.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Pro tip:</b> The broth (국물) from the odeng skewers is usually free — just grab a paper cup and ladle it yourself. It is perfect for warming up on cold nights.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Getting Home Safely</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Kakao Taxi (카카오택시):</b> Essential app. Call a taxi from anywhere, pay by card. Regular taxi, luxury (모범택시), and carpool options. Late-night surge pricing applies on weekends. Download before you go out.</li>
          <li><b>Night buses (심야버스):</b> Seoul operates special night bus lines (N-routes) from midnight to 5 AM, running through major nightlife areas. Routes N13, N26, N30, and N37 cover popular districts.</li>
          <li><b>Last subway:</b> Seoul subway last trains depart around 11:30 PM - 12:30 AM depending on the line and station. Check the Naver Map app for exact times from your station. Missing the last train is a common experience — plan for taxi fare.</li>
          <li><b>Jjimjilbang (찜질방):</b> 24-hour bathhouses/saunas are a uniquely Korean &quot;plan B&quot; for getting stranded. For ₩10,000-15,000, you get a sleeping area, hot baths, sauna, and snacks until the first subway. Dragon Hill Spa in Itaewon is popular with foreigners.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Emergency:</b> Police: 112 | Ambulance: 119 | Tourist helpline (English): 1330
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
