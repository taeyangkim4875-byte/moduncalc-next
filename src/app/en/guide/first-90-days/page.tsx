import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "First 90 Days in Korea - Essential Checklist for New Foreigners",
  description:
    "Just arrived in Korea? Week-by-week checklist: ARC, bank account, phone, housing, insurance. Don't miss these critical steps.",
  alternates: { canonical: "https://moduncalc.com/en/guide/first-90-days" },
  openGraph: {
    title: "First 90 Days in Korea - Essential Checklist for New Foreigners",
    description:
      "Just arrived in Korea? Complete checklist for your first 90 days: ARC, bank account, phone, insurance, housing, and more.",
    url: "https://moduncalc.com/en/guide/first-90-days",
  },
};

const faqItems = [
  {
    q: "What should I do on my very first day in Korea?",
    a: "On your first day, focus on three things: (1) Get a T-money card (교통카드) from any convenience store (CU, GS25, 7-Eleven) for ₩2,500 and charge it with ₩20,000-30,000 for subway and bus travel, (2) Buy a prepaid SIM card at the airport or a phone store so you have data and can use maps, and (3) Get to your temporary accommodation safely. If arriving at Incheon Airport, the AREX train to Seoul Station costs only ₩4,250 and takes about 43 minutes. Do not try to do too much on day one -- jet lag is real and Korea will still be there tomorrow.",
  },
  {
    q: "How soon should I apply for an ARC after arriving?",
    a: "You should apply for your ARC (외국인등록증) as soon as possible, ideally within your first 2 weeks. While the legal deadline is within 90 days of entry, applying early is critical because the ARC takes 2-3 weeks to process, and you need it for almost everything: bank accounts, phone contracts, housing leases, and health insurance enrollment. Book an appointment on Hi Korea (hikorea.go.kr) right away, as appointment slots fill up quickly during peak seasons (March and September).",
  },
  {
    q: "Can I use my foreign credit/debit card in Korea while waiting for a bank account?",
    a: "Yes, most international Visa and Mastercard credit and debit cards work at Korean stores, restaurants, and ATMs. However, there are some caveats: (1) Not all Korean online stores accept foreign cards, (2) ATM withdrawal fees are typically ₩3,000-5,000 per transaction plus your home bank's fees, (3) Some smaller restaurants and street vendors may only accept Korean cards or cash. It is a good idea to carry some Korean won (₩100,000-200,000) in cash as backup until you have a Korean bank account set up.",
  },
  {
    q: "Do I need to speak Korean to get settled in Korea?",
    a: "No, you do not need to speak Korean to handle the basics, especially in Seoul and other major cities. Immigration offices have English-speaking staff, major banks have foreigner-friendly branches, and apps like Naver Map and Kakao Map offer English interfaces. However, learning basic Korean phrases will make your life significantly easier, especially for tasks like communicating with landlords, ordering at local restaurants, and navigating government offices outside Seoul. Apps like Papago (파파고) and Google Translate can help bridge the language gap in real time.",
  },
];

export default function First90DaysPage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="First 90 Days in Korea"
      description="Just arrived in Korea? This complete checklist covers everything you need to do in your first 90 days: ARC registration, bank account, phone, insurance, housing, and essential apps."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "First 90 Days in Korea - Essential Checklist for New Foreigners",
            description:
              "Just arrived in Korea? Complete checklist for your first 90 days: ARC, bank account, phone, insurance, housing, and more.",
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
        <h2 className="text-base font-extrabold mb-3">Week 1: Arrival & Immediate Essentials</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Your first week is about getting your bearings and handling the most urgent basics. Do not try to do everything at once -- focus on what you need to function day-to-day.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Temporary housing:</b> If you do not have permanent housing arranged, stay at a guesthouse (게스트하우스), Airbnb, or gosiwon (고시원). Gosiwon rooms cost ₩300,000-600,000/month with no deposit and usually include rice, kimchi, and basic utilities. They are small but practical as a launchpad.</li>
          <li><b>T-money card (교통카드):</b> Buy one at any convenience store (CU, GS25, 7-Eleven, emart24) for ₩2,500 and charge it. This card works on all subways, buses, and even some taxis nationwide. Charge at convenience stores or subway station machines.</li>
          <li><b>SIM card or eSIM:</b> Get a prepaid SIM card at the airport (KT, SKT, LG U+ booths) or a phone store. Prepaid data-only SIMs start at ₩20,000-30,000 for 10-30 days. For a full phone number (needed later for banking), you will need a postpaid plan, which requires an ARC.</li>
          <li><b>Download essential apps:</b> KakaoTalk (messaging, everyone uses it), Naver Map (best for transit directions), Papago (translation), and your bank&apos;s app once you have an account.</li>
          <li><b>Currency exchange:</b> Airport exchange rates are poor. Exchange money at banks or money changers in Myeongdong (명동) or Itaewon (이태원) for better rates. Or simply withdraw KRW from a Global ATM using your foreign card.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Weeks 2-3: ARC & Bank Account</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          These are the two most important tasks in your first month. Everything else depends on having your ARC and bank account.
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">ARC</span>
            <span className="text-sm text-[#4E5968]">Apply for your Alien Registration Card (외국인등록증) at the immigration office. Book online at hikorea.go.kr. Bring passport, photo, application form, and ₩30,000. See our{" "}
              <Link href="/en/guide/arc-guide" className="text-[var(--primary)] font-bold hover:underline">ARC Guide</Link> for the full process. The card takes 2-3 weeks to be issued, so apply as early as possible.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Bank</span>
            <span className="text-sm text-[#4E5968]">Once you have your ARC (or even with just the receipt), visit a foreigner-friendly bank branch to open an account. KB Kookmin (국민은행) and Shinhan (신한은행) are recommended. Bring your ARC, passport, and Korean phone number. See our{" "}
              <Link href="/en/guide/banking-guide" className="text-[var(--primary)] font-bold hover:underline">Banking Guide</Link> for details.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Phone</span>
            <span className="text-sm text-[#4E5968]">With your ARC, you can now sign up for a postpaid phone plan (후불제) at SKT, KT, or LG U+ for ₩30,000-55,000/month with unlimited data. Having a Korean phone number is essential for banking apps, delivery apps, and identity verification on Korean websites.</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Month 1: Housing & Address Registration</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          With your ARC and bank account set up, you can now find permanent housing and officially register your address.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Find an apartment:</b> Use Zigbang (직방), Dabang (다방), or visit local real estate agents (부동산). For a detailed guide on rental types (jeonse vs wolse), contracts, and deposit protection, see our{" "}
            <Link href="/en/guide/apartment-guide" className="text-[var(--primary)] font-bold hover:underline">Apartment Guide</Link>.</li>
          <li><b>Sign the lease (계약서):</b> Understand the terms before signing. The standard deposit (보증금) for a wolse apartment is ₩5,000,000-10,000,000 with monthly rent of ₩400,000-800,000 for a studio in Seoul.</li>
          <li><b>Address registration (전입신고):</b> On the day you move in, go to your local community center (주민센터) with your ARC, passport, and lease contract. Register your address and get the fixed-date certification (확정일자) stamped on your contract for ₩600. This is critical for protecting your deposit.</li>
          <li><b>Set up utilities:</b> Electricity (한전 / KEPCO), gas, water, and internet. Your landlord or agent should help with the initial setup. Internet installation typically takes 1-3 days after booking.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Month 2: Insurance & Settling In</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          By month two, you should have the basics covered and can focus on longer-term setup items.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>National Health Insurance (국민건강보험):</b> If you are employed, your employer enrolls you automatically and you share the premium 50/50. If self-employed or not working, you must enroll yourself at the NHI office within 6 months of getting your ARC. Premiums are based on income and property. Use our{" "}
            <Link href="/en/health-insurance" className="text-[var(--primary)] font-bold hover:underline">Health Insurance Calculator</Link> to estimate your premium.</li>
          <li><b>National Pension (국민연금):</b> Employees contribute 4.5% of salary (employer matches 4.5%). Citizens of countries with a pension totalization agreement with Korea can claim a lump-sum refund when they leave. Check if your country qualifies.</li>
          <li><b>Understand your payslip:</b> Korean payslips list deductions for income tax (소득세), NHI (건강보험), pension (국민연금), and employment insurance (고용보험). Use our{" "}
            <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link> to verify your deductions are correct.</li>
          <li><b>Find a local hospital/clinic:</b> Register at a nearby clinic (병원/의원) and pharmacy (약국). With NHI, you pay only 30% of outpatient costs. Many clinics in Seoul have English-speaking doctors -- search on the NHIS website for foreigner-friendly medical facilities.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Month 3: Getting Comfortable</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          By month three, the administrative heavy lifting is done. Now focus on quality of life and building your routine.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Learn basic Korean:</b> Even basic phrases make a huge difference. Start with greetings, numbers, ordering food, and directions. Free resources include Talk To Me In Korean (TTMIK), King Sejong Institute classes (세종학당, free government Korean classes), and language exchange meetups.</li>
          <li><b>Explore your neighborhood:</b> Find your local market (시장), convenience stores, laundromat (빨래방), gym (헬스장), and favorite restaurants. Korea rewards those who explore beyond the tourist areas.</li>
          <li><b>Join communities:</b> Expat groups on Facebook, Reddit (r/korea), and local meetup groups help you build a social network. Many cities have international centers (글로벌센터) offering free Korean classes and cultural events.</li>
          <li><b>Set up financial goals:</b> Now that you understand your after-tax income and expenses, create a budget. Use our{" "}
            <Link href="/en/cost-of-living" className="text-[var(--primary)] font-bold hover:underline">Cost of Living Calculator</Link> to plan your monthly spending.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Essential Apps Checklist</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          These apps are essential for daily life in Korea. Download them as soon as you have a smartphone set up:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">App</th>
                <th className="text-left p-2 font-bold">Korean Name</th>
                <th className="text-left p-2 font-bold">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">KakaoTalk</td>
                <td className="p-2">카카오톡</td>
                <td className="p-2">Messaging -- everyone in Korea uses it, including businesses</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Naver Map</td>
                <td className="p-2">네이버 지도</td>
                <td className="p-2">Navigation and transit directions (better than Google Maps in Korea)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Kakao Map</td>
                <td className="p-2">카카오맵</td>
                <td className="p-2">Alternative map app with good bus/subway info</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Toss</td>
                <td className="p-2">토스</td>
                <td className="p-2">Fintech app for transfers, payments, and financial management</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Baemin</td>
                <td className="p-2">배달의민족</td>
                <td className="p-2">Food delivery -- the largest delivery platform in Korea</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Coupang</td>
                <td className="p-2">쿠팡</td>
                <td className="p-2">Online shopping with next-day (Rocket) delivery</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Papago</td>
                <td className="p-2">파파고</td>
                <td className="p-2">Translation app (Korean-English, better than Google for Korean)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Emergency Numbers & Important Contacts</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Save these numbers in your phone immediately upon arrival:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>112 -- Police (경찰):</b> For emergencies and crime reporting. English interpretation available.</li>
          <li><b>119 -- Fire & Ambulance (소방/구급):</b> For fires, medical emergencies, and rescue. English interpretation available.</li>
          <li><b>1345 -- Immigration Contact Center (외국인종합안내센터):</b> For visa, ARC, and immigration questions. Available in English, Chinese, Vietnamese, and other languages. Available 9 AM - 10 PM weekdays.</li>
          <li><b>1339 -- Medical Emergency Info (응급의료정보센터):</b> 24-hour medical consultation and hospital referral in English.</li>
          <li><b>120 -- Dasan Call Center (다산콜센터):</b> Seoul city government hotline for general inquiries about city services, available in English.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Common Mistakes New Foreigners Make</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Avoid these common pitfalls that many newcomers fall into:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Delaying ARC application:</b> Every day without an ARC is a day you cannot open a bank account, sign a phone contract, or secure proper housing. Apply within your first two weeks.</li>
          <li><b>Not doing 전입신고 (address registration):</b> This is not optional. It protects your rental deposit and is legally required within 14 days of moving. Skipping it can result in fines up to ₩1,000,000.</li>
          <li><b>Signing a lease without checking 등기부등본:</b> Always verify the property ownership document before paying any deposit. Scams targeting foreigners do exist.</li>
          <li><b>Not understanding your payslip deductions:</b> Korean payslips can be confusing with multiple deductions. Use our{" "}
            <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link> to verify you are being paid correctly.</li>
          <li><b>Using Google Maps:</b> Google Maps has very limited functionality in Korea due to national security restrictions on map data. Use Naver Map (네이버 지도) or Kakao Map (카카오맵) instead -- they are far more accurate and include real-time transit information.</li>
          <li><b>Not saving emergency numbers:</b> Save 112 (police), 119 (fire/ambulance), and 1345 (immigration) in your phone before you need them.</li>
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
