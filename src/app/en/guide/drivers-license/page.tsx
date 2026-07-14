import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Getting a Driver's License in Korea as a Foreigner",
  description:
    "How to convert your foreign driver's license or get a new one in Korea: requirements, process, costs, and tips.",
  alternates: { canonical: "https://moduncalc.com/en/guide/drivers-license" },
  openGraph: {
    title: "Getting a Driver's License in Korea as a Foreigner",
    description:
      "How to convert your foreign driver's license or get a new one in Korea: requirements, process, costs, and tips.",
    url: "https://moduncalc.com/en/guide/drivers-license",
  },
};

const faqItems = [
  {
    q: "Can I drive in Korea with my foreign driver's license?",
    a: "You cannot drive in Korea using only a foreign driver's license. However, if you hold a valid International Driving Permit (IDP / 국제운전면허증) issued by a country that is a signatory to the 1949 Geneva Convention or 1968 Vienna Convention, you can drive in Korea for up to 1 year from your date of entry. After 1 year, you must convert your license to a Korean one or obtain a new Korean license. Note that IDPs issued by some countries (notably China, Vietnam, and Thailand) are not recognized in Korea. Also, an IDP without the accompanying original foreign license is not valid.",
  },
  {
    q: "How long does it take to convert a foreign license to a Korean one?",
    a: "For citizens of countries with automatic conversion agreements (including the US, UK, Canada, Australia, Japan, and most EU countries), the conversion can be done in a single visit to a driver's license exam center (운전면허시험장), typically taking 2-4 hours including wait time. You will take a basic vision and aptitude test but no driving test. For countries requiring an additional skills test, you may need to schedule a separate appointment, adding 1-2 weeks to the process. The converted license is valid for 10 years.",
  },
  {
    q: "How much does it cost to get a Korean driver's license from scratch?",
    a: "Getting a new Korean driver's license without a driving academy costs approximately 20,000-30,000 KRW in total test fees: written test (약 7,500 KRW), skills test (약 7,500 KRW), road test (약 7,500 KRW), and license issuance (약 7,500 KRW). However, most foreigners find it easier to enroll in a driving academy (운전학원), which costs between 500,000-800,000 KRW and includes all training, practice sessions, and test scheduling. Academy packages often include free retests if you fail on the first attempt. The total time from start to finish is typically 1-3 weeks through an academy.",
  },
  {
    q: "Is the written driving test available in English?",
    a: "Yes, the written test (필기시험) is available in multiple languages including English, Chinese (simplified and traditional), Vietnamese, Thai, Indonesian, Mongolian, Russian, Japanese, Cambodian, Myanmar, Nepali, Sri Lankan, Uzbek, Bengali, Pakistani, and more. The test consists of 40 multiple-choice questions, and you need to score at least 60% (24 correct answers) to pass. Study materials are available in English on the Driver's License Agency website (운전면허시험관리단). Many smartphone apps also offer practice tests in various languages.",
  },
];

export default function DriversLicensePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Getting a Driver's License in Korea"
      description="Everything foreigners need to know about driving in Korea: converting a foreign license, getting a new Korean license, costs, and essential road rules."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Getting a Driver's License in Korea as a Foreigner",
            description:
              "How to convert your foreign driver's license or get a new one in Korea: requirements, process, costs, and tips.",
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
        <h2 className="text-base font-extrabold mb-3">Option 1: Converting a Foreign License (면허교환)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If you already hold a valid driver&apos;s license from your home country, you may be able to convert it to a Korean license without taking a full driving test. This is the fastest and cheapest way to get a Korean driver&apos;s license, and the process can often be completed in a single day.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea classifies foreign countries into two groups for license conversion:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Automatic conversion (aptitude test only):</b> Countries with bilateral agreements including the United States, United Kingdom, Canada, Australia, New Zealand, Japan, France, Germany, Italy, Spain, and most other EU/OECD countries. You only need to pass a basic aptitude test (vision and color blindness check).</li>
          <li><b>Conversion with skills test:</b> Countries not covered by bilateral agreements. You must pass the aptitude test plus a simplified skills test (기능시험) on a test course. No road test is required. This applies to licenses from countries such as China, India, the Philippines, and several Southeast Asian nations.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Note:</b> Your foreign license must be valid (not expired) at the time of conversion. If your license has expired, you may need to renew it through your home country&apos;s embassy or consulate before converting it in Korea.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Required Documents for License Conversion</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Gather all of the following documents before visiting the driver&apos;s license exam center (운전면허시험장):
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Valid foreign driver&apos;s license:</b> Original, not a copy. Must be current and not expired.</li>
          <li><b>Official translation of your license:</b> Must be translated into Korean by your embassy or consulate, a certified translation agency, or a notarized translator. Some exam centers accept translations from the Korean Automobile Association (대한자동차운전전문학원연합회).</li>
          <li><b>Passport:</b> Your original passport. The exam center will verify your entry and exit records to confirm that you held the license in your home country for a valid period.</li>
          <li><b>Alien Registration Card (ARC / 외국인등록증):</b> Your current, valid ARC.</li>
          <li><b>Passport-sized photos:</b> 3 photos (3.5cm x 4.5cm). Some exam centers have photo booths on-site for about 5,000 KRW.</li>
          <li><b>Application form:</b> Available at the exam center. Fill it out on-site.</li>
          <li><b>Fee:</b> Approximately 12,000 KRW for the aptitude test and license issuance combined.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Where to go:</b> Visit any driver&apos;s license exam center (운전면허시험장) in Korea. Major locations include the Gangseo center in Seoul, Yongin center in Gyeonggi-do, and centers in Busan, Daegu, and Gwangju. Check the Driver&apos;s License Agency website for locations and operating hours (Monday-Friday, 9:00 AM - 5:00 PM). Some centers are open Saturday mornings.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Option 2: Getting a New Korean License</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If you do not have a foreign license, or if your country&apos;s license is not eligible for conversion, you will need to obtain a Korean driver&apos;s license from scratch. The process involves three tests:
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Test 1</span>
            <span className="text-sm text-[#4E5968]"><b>Written test (필기시험):</b> 40 multiple-choice questions on traffic laws, road signs, and safe driving practices. Available in 20+ languages including English. You need 60% (24 correct) to pass. Study materials are available online and in apps. Fee: approximately 7,500 KRW.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Test 2</span>
            <span className="text-sm text-[#4E5968]"><b>Skills test (기능시험 / course driving):</b> A driving test on a closed course within the exam center. You must demonstrate basic vehicle control: starting, stopping, turning, lane changes, and parking. You need a score of 80% or higher to pass. Fee: approximately 7,500 KRW.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Test 3</span>
            <span className="text-sm text-[#4E5968]"><b>Road test (도로주행시험):</b> A real on-road driving test lasting approximately 15-20 minutes on public roads near the exam center. An examiner rides with you and scores your driving on multiple criteria. You need 70% or higher to pass. Fee: approximately 7,500 KRW.</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          After passing all three tests, you will receive your Korean driver&apos;s license on the same day. The license issuance fee is approximately 7,500 KRW. Your license is valid for 10 years for Class 2 (일반 / regular passenger vehicles) or 7 years for Class 1 (대형 / large vehicles).
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Driving Academies (자동차운전학원)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Most people in Korea -- both Korean and foreign -- get their license through a driving academy (학원) rather than attempting the tests independently. Academies provide structured training, practice vehicles, and handle test scheduling for you.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Cost:</b> Full packages typically range from 500,000-800,000 KRW, which includes classroom instruction, vehicle practice time, and all test fees. Some academies offer economy packages starting around 450,000 KRW with fewer practice hours.</li>
          <li><b>Duration:</b> Most academy programs take 1-3 weeks to complete, depending on how quickly you schedule your practice sessions and pass each test. Intensive courses can be completed in as few as 7 days.</li>
          <li><b>Language:</b> Some academies in Seoul and other major cities offer instruction in English, Chinese, or Vietnamese. Ask about foreign language support when enrolling. Even at Korean-only academies, the practical driving instruction is often manageable with basic Korean or hand gestures.</li>
          <li><b>Retests:</b> Many academy packages include free retests if you fail on the first attempt. Without an academy, each retest costs the full test fee again.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Tip:</b> Search for &quot;외국인 운전학원&quot; (foreigner driving academy) in your area. Word of mouth from fellow expats is often the best way to find an academy with good English-speaking instructors.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">International Driving Permit (IDP / 국제운전면허증)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          An International Driving Permit is a temporary option for short-term visitors or newly arrived residents who have not yet converted or obtained a Korean license:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Validity:</b> An IDP issued by a signatory country to the Geneva or Vienna Conventions is valid in Korea for up to 1 year from your date of entry. After 1 year, you must obtain a Korean license.</li>
          <li><b>Requirements:</b> You must carry both the IDP and your original foreign license when driving. The IDP alone is not valid.</li>
          <li><b>Limitations:</b> Some rental car companies may require a Korean license for long-term rentals. IDPs from non-signatory countries (China, Vietnam, Thailand, among others) are not recognized in Korea.</li>
          <li><b>Getting an IDP from Korea:</b> If you already have a Korean license, you can get a Korean-issued IDP at any driver&apos;s license exam center for about 8,500 KRW. This is useful for driving abroad during vacations.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Car Insurance Requirements (자동차보험)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If you own or regularly drive a vehicle in Korea, understanding insurance requirements is essential:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Mandatory liability insurance (책임보험):</b> All vehicles must have basic liability insurance covering bodily injury to third parties. This is legally required and included in vehicle registration. Minimum coverage is 200,000,000 KRW per person for death or injury.</li>
          <li><b>Comprehensive insurance (종합보험):</b> Strongly recommended. Covers your own vehicle damage, theft, natural disasters, and provides higher liability limits. Annual premiums for a mid-size sedan range from 600,000-1,500,000 KRW depending on your driving history, age, and coverage level.</li>
          <li><b>Foreigner considerations:</b> New drivers in Korea without a Korean driving history start with no discount (0% safe driving discount). Korean insurance companies may charge higher premiums for new foreign drivers. After 1 year of accident-free driving, you begin accumulating discounts that can reduce premiums by up to 60% over time.</li>
          <li><b>Major insurers:</b> Samsung Fire &amp; Marine (삼성화재), Hyundai Marine &amp; Fire (현대해상), KB Insurance (KB손해보험), and DB Insurance (DB손해보험) are the largest auto insurers. Online comparison sites like Boda (보다) and Carrot Insurance (캐롯보험) can help you compare quotes.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Essential Korean Road Rules for Foreigners</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean traffic laws follow international conventions but have some specific rules that foreigners should know:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Right-hand traffic:</b> Korea drives on the right side of the road, same as the US, Canada, and most of Europe. If you are from a left-hand traffic country (UK, Japan, Australia), take extra care at intersections and when turning.</li>
          <li><b>Speed limits (제한속도):</b> Generally 60 km/h in urban areas (시내), 80 km/h on urban expressways (도시고속도로), and 100-120 km/h on highways (고속도로). Speed cameras (과속카메라) are extremely common and fines are automatically issued.</li>
          <li><b>Blood alcohol limit:</b> 0.03% BAC -- one of the strictest in the world. Even one glass of beer can put you over the limit. Penalties include license suspension (0.03-0.08%), license revocation and criminal charges (0.08%+), and up to 5 years imprisonment for repeat offenders. Drunk driving is taken very seriously in Korea.</li>
          <li><b>Seat belts:</b> Mandatory for all passengers in all seats. Fines of 30,000 KRW for the driver and 30,000 KRW per unbelted passenger.</li>
          <li><b>Phone use:</b> Using a handheld phone while driving is illegal. Fines of 60,000-70,000 KRW. Hands-free devices and navigation mounts are permitted.</li>
          <li><b>Right turn on red:</b> Unlike in the US, right turns on red are generally not permitted in Korea unless there is a specific green arrow signal. Many intersections have a separate right-turn signal.</li>
          <li><b>Bus-only lanes (버스전용차로):</b> Major roads in cities have bus-only lanes marked in blue, typically active during rush hours. Non-bus vehicles caught using them face fines of 50,000-70,000 KRW.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Navigation apps:</b> Naver Map (네이버 지도) and Kakao Map (카카오맵) are far more accurate for Korean roads than Google Maps. Both offer English interfaces and real-time traffic, speed camera alerts, and parking information.
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
