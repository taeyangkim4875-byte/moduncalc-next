import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korean Health Insurance for Foreigners - NHI Coverage, Costs & Tips (2026)",
  description:
    "Complete guide to National Health Insurance in Korea for foreigners: enrollment, premiums, coverage, and how to save on medical costs.",
  alternates: { canonical: "https://moduncalc.com/en/guide/health-insurance-guide" },
  openGraph: {
    title: "Korean Health Insurance for Foreigners - NHI Coverage, Costs & Tips (2026)",
    description:
      "Complete guide to National Health Insurance in Korea for foreigners: enrollment, premiums, coverage, and how to save on medical costs.",
    url: "https://moduncalc.com/en/guide/health-insurance-guide",
  },
};

const faqItems = [
  {
    q: "Is health insurance mandatory for foreigners in Korea?",
    a: "Yes, since July 2019, all foreigners staying in Korea for 6 months or more are required to enroll in the National Health Insurance (NHI) system. If you are employed, your employer enrolls you automatically and deducts premiums from your paycheck. If you are self-employed or not working, you must enroll yourself at the NHIS office and pay premiums directly.",
  },
  {
    q: "How much does NHI cost for an employee earning 3 million KRW per month?",
    a: "For an employee with a monthly salary of 3 million KRW in 2026, the health insurance premium is approximately 107,850 KRW (3,000,000 x 3.595%), split equally between employee and employer. So you pay about 53,925 KRW. Additionally, long-term care insurance is 13.14% of your health insurance premium, adding roughly 7,086 KRW to your employee share. Your total monthly health insurance deduction would be about 61,011 KRW.",
  },
  {
    q: "Can I use NHI at any hospital or clinic in Korea?",
    a: "Yes, NHI is accepted at virtually all hospitals, clinics, dental offices, and pharmacies in Korea. Simply present your Health Insurance Card (건강보험증) or your ARC (Alien Registration Card) at the reception desk. The NHI system covers about 60-70% of most medical costs, and you pay the remaining 30-40% as a copayment at the time of service.",
  },
  {
    q: "What medical services are NOT covered by NHI?",
    a: "NHI does not cover cosmetic procedures (double eyelid surgery, rhinoplasty, etc.), most dental implants, teeth whitening, LASIK/LASEK eye surgery, MRI scans in some circumstances, certain premium room upgrades at hospitals, and non-covered medicines. These are classified as 비급여 (non-covered) items and you must pay 100% out of pocket. Private insurance can help cover these costs.",
  },
];

export default function HealthInsuranceGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korean Health Insurance for Foreigners"
      description="Understand National Health Insurance enrollment, premiums, coverage, and how to navigate the Korean medical system as a foreigner."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Korean Health Insurance for Foreigners - NHI Coverage, Costs & Tips (2026)",
            description:
              "Complete guide to National Health Insurance in Korea for foreigners: enrollment, premiums, coverage, and how to save on medical costs.",
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
        <h2 className="text-base font-extrabold mb-3">National Health Insurance Overview</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korea&apos;s National Health Insurance (NHI, 국민건강보험) is a single-payer universal health insurance system that covers the entire population. Since <b>July 2019</b>, all foreigners staying in Korea for 6 months or more are required to enroll -- this includes employees, self-employed individuals, students, and dependents.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          The system is managed by the National Health Insurance Service (NHIS, 국민건강보험공단). Korean healthcare is widely regarded as affordable and high-quality compared to many Western countries. With NHI, a typical doctor visit costs 5,000-15,000 KRW out of pocket, and even major surgeries are covered at 70-80% by insurance.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Employee vs Self-Employed Enrollment</h2>
        <div className="grid grid-cols-1 gap-3 mb-3">
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Employed (직장가입자)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              Your employer enrolls you automatically. Premiums are calculated based on your salary and split 50/50 between you and your employer. The premium is deducted from your monthly paycheck. Your dependents (spouse, children) can be added to your plan at no extra cost as long as they meet the income and property criteria.
            </p>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-xl">
            <h3 className="text-sm font-bold mb-1">Self-Employed / Non-Working (지역가입자)</h3>
            <p className="text-sm text-[#4E5968] leading-relaxed">
              If you are not employed by a Korean company (freelancers, business owners, students, spouses not on an employee plan), you must visit the NHIS office to enroll. Premiums are calculated based on your income, property, and other factors. You pay the full premium yourself (no employer share). Minimum premiums apply if you have no reported Korean income.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">2026 Premium Rates</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Item</th>
                <th className="text-left p-2 font-bold">Rate</th>
                <th className="text-left p-2 font-bold">Who Pays</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Health Insurance (건강보험)</td>
                <td className="p-2">3.595% of salary</td>
                <td className="p-2">50% employee, 50% employer</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Long-term Care (장기요양)</td>
                <td className="p-2">13.14% of HI premium</td>
                <td className="p-2">50% employee, 50% employer</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Example:</b> If your monthly salary is 4,000,000 KRW, your total health insurance premium is 143,800 KRW (3.595%). You pay half: 71,900 KRW. Long-term care adds 13.14% of that: 9,448 KRW. Your total monthly deduction is approximately <b>81,348 KRW</b>.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Use our{" "}
          <Link href="/en/health-insurance" className="text-[var(--primary)] font-bold hover:underline">Health Insurance Calculator</Link> to calculate your exact premium.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">What NHI Covers</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Outpatient visits (외래):</b> Doctor consultations, examinations, basic tests, and treatments at clinics and hospitals. You pay a copayment of 30% at clinics or 40-60% at larger hospitals.</li>
          <li><b>Inpatient care (입원):</b> Hospitalization, surgery, and post-operative care. NHI covers 80% of costs in a standard ward room.</li>
          <li><b>Dental care (치과):</b> Basic dental treatments including fillings, root canals, extractions, and scaling (once per year). Crowns are partially covered. Implants are covered for seniors 65+.</li>
          <li><b>Prescriptions (처방약):</b> Prescription medications at pharmacies are covered at approximately 70%. You present your prescription and insurance card at any pharmacy.</li>
          <li><b>Health checkups (건강검진):</b> Free biennial general health screenings for all insured individuals. Additional cancer screenings are available based on age and gender.</li>
          <li><b>Maternity care (출산):</b> Prenatal checkups, delivery costs, and postnatal care are covered. The government provides additional vouchers for pregnancy-related medical expenses.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">What NHI Does NOT Cover</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Cosmetic surgery:</b> Double eyelid surgery, rhinoplasty, liposuction, Botox, fillers, and all aesthetic procedures.</li>
          <li><b>Advanced dental:</b> Most dental implants (except for those 65+), teeth whitening, veneers, and orthodontic braces.</li>
          <li><b>Vision correction:</b> LASIK, LASEK, and PRK surgery.</li>
          <li><b>Non-covered procedures (비급여):</b> Some MRI/CT scans, certain advanced tests, premium room charges (1-2 person rooms), and specific non-essential treatments.</li>
          <li><b>Traditional medicine extras:</b> Some Korean traditional medicine (한의원) treatments beyond basic coverage.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Medical Costs: With vs Without NHI</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Service</th>
                <th className="text-left p-2 font-bold">With NHI</th>
                <th className="text-left p-2 font-bold">Without NHI</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Clinic visit (cold/flu)</td>
                <td className="p-2">5,000~15,000 KRW</td>
                <td className="p-2">30,000~50,000 KRW</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Hospital outpatient</td>
                <td className="p-2">15,000~40,000 KRW</td>
                <td className="p-2">80,000~150,000 KRW</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">ER visit</td>
                <td className="p-2">30,000~100,000 KRW</td>
                <td className="p-2">150,000~500,000 KRW</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Appendectomy (surgery)</td>
                <td className="p-2">500K~1M KRW</td>
                <td className="p-2">3M~5M KRW</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">MRI scan</td>
                <td className="p-2">100K~300K KRW</td>
                <td className="p-2">500K~800K KRW</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          As the table shows, NHI provides substantial savings. Even with monthly premiums, the insurance pays for itself with just one or two medical visits per year.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Using NHI at Hospitals</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Using your health insurance is straightforward. When you visit a hospital or clinic, present your <b>Health Insurance Card</b> (건강보험증) or your <b>Alien Registration Card (ARC)</b> at the reception desk. The hospital automatically processes your insurance, and you only pay the copayment portion.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Emergency room visits:</b> Go to any hospital ER (응급실). You do not need a referral. Present your ARC, and NHI will cover the standard portion. ER copayments are higher than regular outpatient visits. If you are unconscious or unable to present ID, the hospital will still treat you and sort out insurance later.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Prescription process:</b> After your doctor visit, you receive a prescription (처방전). Take it to any pharmacy (약국) -- they are everywhere in Korea, usually right next to or near hospitals. Present your prescription and insurance card. The pharmacist will prepare your medication and you pay the insured copayment, typically 3,000-10,000 KRW for common medications.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Private Insurance: When You Need It</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          While NHI provides excellent basic coverage, many residents in Korea (both Korean and foreign) purchase supplementary private insurance (실비보험 or 실손보험) to cover:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li>Non-covered (비급여) treatments and procedures</li>
          <li>The remaining 20-40% copayment for covered services</li>
          <li>Hospitalization income replacement</li>
          <li>Cancer, stroke, and critical illness lump-sum payments</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Popular private insurers for foreigners include Samsung Life, Hyundai Marine & Fire, DB Insurance, and Meritz Fire. Monthly premiums for basic 실비보험 range from 30,000 to 80,000 KRW depending on age and coverage level.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Useful Apps and Resources</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>The건강보험 app:</b> Official NHIS app to check your insurance status, premium payment history, and coverage details.</li>
          <li><b>Hospital finder (병원찾기):</b> Search for nearby hospitals and clinics by specialty on the NHIS website or Naver Maps.</li>
          <li><b>1577-1000:</b> NHIS customer service hotline (Korean, with some English support). For English-only, call 1345 (immigration helpline which can assist with insurance questions).</li>
          <li><b>Emergency:</b> Dial 119 for ambulance services (free). Dial 1339 for medical emergency consultation available 24/7.</li>
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
