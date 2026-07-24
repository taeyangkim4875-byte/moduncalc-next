import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korea Healthcare System Guide for Foreigners - NHI, Clinics & Hospitals",
  description: "How does Korean healthcare work? NHI enrollment, finding a doctor, prescription system, dental care & health checkups.",
  alternates: { canonical: "https://moduncalc.com/en/guide/healthcare-guide" },
  openGraph: {
    title: "Korea Healthcare System Guide for Foreigners - NHI, Clinics & Hospitals",
    description: "Complete guide to Korean healthcare for foreigners: NHI enrollment, hospital system, prescription pickup, dental/vision, and health checkups.",
    url: "https://moduncalc.com/en/guide/healthcare-guide",
  },
};

const faqItems = [
  {
    q: "How much does a doctor visit cost in Korea with NHI?",
    a: "With National Health Insurance (국민건강보험), a basic clinic visit (의원) costs approximately ₩5,000-15,000 out-of-pocket (copay is 30% of the total cost for clinics). A general hospital visit costs slightly more at 40-50% copay. Specialist consultations at tertiary hospitals like Seoul National University Hospital or Samsung Medical Center require a referral letter (진료의뢰서) from a clinic and cost 50-60% copay. Without NHI, the same clinic visit would cost ₩30,000-50,000+. Prescription medication at a pharmacy typically costs ₩3,000-10,000 for common illnesses with NHI coverage.",
  },
  {
    q: "Can foreigners get health checkups (건강검진) in Korea?",
    a: "Yes, all NHI-enrolled foreigners are entitled to free biennial health checkups (일반 건강검진). NHI sends a notification when you are eligible (usually every 2 years). The checkup includes: blood pressure, blood tests (cholesterol, blood sugar, liver function), chest X-ray, BMI, vision, hearing, and urinalysis. Additional cancer screenings are provided based on age: stomach cancer (위암, age 40+), liver cancer (간암, age 40+ with risk factors), colon cancer (대장암, age 50+), breast cancer (유방암, women age 40+), and cervical cancer (자궁경부암, women age 20+). You can get your checkup at any designated hospital or clinic. Many private hospitals also offer premium health checkup packages (종합검진) for ₩300,000-2,000,000.",
  },
  {
    q: "How do I find a doctor who speaks English in Korea?",
    a: "Several options exist: (1) International clinics — major hospitals like Severance (세브란스), Samsung Medical Center (삼성서울병원), and Asan Medical Center (서울아산병원) have international clinics with English-speaking staff. (2) Itaewon and Yongsan area clinics often have English-speaking doctors due to the international community. (3) The Seoul Global Center medical helpline (1577-0088) provides interpretation services. (4) The 1339 health helpline offers English support. (5) Online communities like Reddit r/korea and Facebook expat groups maintain lists of English-speaking doctors by specialty and area.",
  },
];

export default function HealthcareGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korea Healthcare Guide for Foreigners"
      description="How Korean healthcare works — NHI enrollment, finding a doctor, prescriptions, dental care, health checkups, and what foreigners need to know."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Korea Healthcare System Guide for Foreigners - NHI, Clinics & Hospitals",
            description: "Complete guide to Korean healthcare for foreigners: NHI enrollment, hospital system, prescription pickup, dental/vision, and health checkups.",
            datePublished: "2026-01-01",
            dateModified: "2026-07-16",
            author: { "@type": "Organization", name: "ModunCalc", url: "https://moduncalc.com" },
          }),
        }}
      />

      <Card>
        <h2 className="text-base font-extrabold mb-3">National Health Insurance (국민건강보험)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea&apos;s <b>National Health Insurance (NHI / 국민건강보험)</b> provides universal healthcare coverage to all residents, including foreigners with an ARC staying more than 6 months. NHI covers approximately 60-70% of medical costs, making healthcare in Korea both high-quality and affordable.
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Enrollment</span>
            <span className="text-sm text-[#4E5968]">If employed, your employer enrolls you automatically (workplace subscription / 직장가입자). The premium is split 50/50 — about 3.595% of your salary each. Self-employed or unemployed foreigners are enrolled as regional subscribers (지역가입자) with premiums based on income, property, and other factors.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Coverage</span>
            <span className="text-sm text-[#4E5968]">NHI covers: doctor visits, hospitalization, surgery, prescription drugs, dental basics, mental health, physical therapy, and more. It does NOT cover: cosmetic procedures, most dental orthodontics, some traditional Korean medicine (한의학), and private/VIP rooms at hospitals.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Your card</span>
            <span className="text-sm text-[#4E5968]">You will receive an NHI card (건강보험증) or can use your ARC as proof of insurance. Present it at every medical visit. You can also register your insurance on the NHIS app for mobile access.</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          Estimate your monthly NHI premium: <Link href="/en/health-insurance" className="text-[var(--primary)] font-bold hover:underline">Health Insurance Calculator</Link>
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">How to See a Doctor</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea&apos;s healthcare system has a tiered structure. Understanding it helps you get the right care at the right price:
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]"><b>Visit a local clinic (의원/동네병원):</b> For non-emergency issues, start at a nearby clinic. These are everywhere — internal medicine (내과), ENT (이비인후과), dermatology (피부과), etc. No appointment needed for most clinics — walk in and take a number. Copay: ~30% = ₩5,000-15,000.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]"><b>Get a referral if needed (진료의뢰서):</b> If the clinic doctor determines you need specialist or hospital care, they will write a referral letter. Going directly to a large hospital without a referral results in a surcharge (₩10,000-50,000+).</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 3</span>
            <span className="text-sm text-[#4E5968]"><b>Hospital visit (병원/종합병원):</b> General hospitals handle more complex cases, surgeries, and specialized testing. Tertiary hospitals (상급종합병원) like Seoul National University Hospital (서울대병원), Severance (세브란스), Samsung Medical Center (삼성서울병원) are top-tier. Copay: 40-60%.</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Emergency:</b> Go directly to any hospital emergency room (응급실) — no referral needed. Call 119 for ambulance. ER copay is higher but waived for genuine emergencies.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Prescription System (처방전 시스템)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          In Korea, doctors and pharmacies are <b>separated</b> (의약분업). The doctor diagnoses and writes a prescription (처방전), and you take it to any pharmacy (약국) to get your medication. This is different from some countries where doctors dispense medication directly.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>After your doctor visit:</b> You will receive a printed prescription (처방전). Take it to any nearby pharmacy — there is almost always one within walking distance of every clinic and hospital.</li>
          <li><b>At the pharmacy (약국):</b> Hand your prescription to the pharmacist. They will prepare your medication and explain dosage. NHI covers most prescription drugs, so you will pay a copay of approximately ₩3,000-10,000 for common medications.</li>
          <li><b>Over-the-counter (OTC) medication:</b> Common drugs like pain relievers (타이레놀/Tylenol), cold medicine, and digestive aids can be bought at pharmacies without a prescription. Some basic OTC items are also available at convenience stores.</li>
          <li><b>Prescription validity:</b> Prescriptions are typically valid for 3 days. For chronic conditions, doctors can issue longer-term prescriptions (장기처방전) covering 1-3 months of medication.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Dental & Vision Care</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Dental care (치과):</b> NHI covers basic dental care including check-ups, fillings, extractions, and scaling (치석제거, covered once per year). Orthodontics (교정), implants (임플란트), and cosmetic dentistry are mostly not covered by NHI and can be expensive. Dental implants cost approximately ₩800,000-1,500,000 per tooth (significantly cheaper than the US/Europe). Scaling (dental cleaning) is covered by NHI once annually for adults 19+ — cost is only ₩10,000-15,000.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Vision care (안과):</b> Eye exams at an ophthalmology clinic (안과) are covered by NHI. Glasses (안경) and contact lenses (콘택트렌즈) are very affordable in Korea — glasses can be made within 30 minutes at shops like Davich (다비치안경) or Looktique (룩티크) for ₩30,000-200,000 including frames and lenses. LASIK/LASEK surgery costs ₩1,000,000-2,500,000 (much cheaper than Western countries), with numerous clinics in Gangnam specializing in these procedures.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Find nearby hospitals: <Link href="/en/hospital" className="text-[var(--primary)] font-bold hover:underline">Hospital Finder</Link>
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Health Checkups (건강검진)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          NHI provides <b>free biennial health checkups</b> (일반 건강검진) to all enrolled members. You will receive a notification (usually via mail or text) when you are eligible. The checkup includes:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-1 list-disc pl-5">
          <li>Blood pressure, height, weight, BMI, waist circumference</li>
          <li>Blood tests: cholesterol, blood sugar, liver/kidney function, anemia</li>
          <li>Chest X-ray</li>
          <li>Vision and hearing tests</li>
          <li>Urinalysis</li>
          <li>Oral health screening</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Cancer screenings</b> by age: stomach cancer (위암검진, age 40+, every 2 years), colon cancer (대장암, age 50+), breast cancer (유방암, women 40+), cervical cancer (자궁경부암, women 20+), and liver cancer (간암, age 40+ with hepatitis B/C). These are free through NHI.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Premium checkups (종합검진):</b> Many people opt for comprehensive private checkups at hospitals like Samsung Medical Center, which include CT scans, MRI, endoscopy, and colonoscopy. Costs range from ₩300,000 to ₩2,000,000+ but are very thorough and often completed in a single day.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Mental Health Resources</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Mental health support is increasingly accessible in Korea. Psychiatric clinics (정신건강의학과, formerly 신경정신과) are covered by NHI. Counseling sessions typically cost ₩10,000-30,000 with NHI (₩50,000-150,000 without). English-speaking therapists can be found through international clinics and online directories.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Seoul Global Center:</b> Free counseling services for foreigners in multiple languages</li>
          <li><b>Mental health crisis line:</b> 1577-0199 (Korean) or 1393 (suicide prevention)</li>
          <li><b>International SOS Korea:</b> English-language mental health support</li>
          <li><b>Community Mental Health Centers (정신건강복지센터):</b> Free or low-cost services available in every district (구)</li>
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
