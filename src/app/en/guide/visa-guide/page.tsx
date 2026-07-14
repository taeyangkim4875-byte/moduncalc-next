import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korea Visa Types for Foreign Workers - Complete Guide (2026)",
  description:
    "Guide to Korean work visas: E-2 teaching, E-7 professional, F-2 residence, F-4 overseas Korean, and more. Requirements, duration, and how to apply.",
  alternates: { canonical: "https://moduncalc.com/en/guide/visa-guide" },
  openGraph: {
    title: "Korea Visa Types for Foreign Workers - Complete Guide (2026)",
    description:
      "Guide to Korean work visas: E-2 teaching, E-7 professional, F-2 residence, F-4 overseas Korean, and more. Requirements, duration, and how to apply.",
    url: "https://moduncalc.com/en/guide/visa-guide",
  },
};

const faqItems = [
  {
    q: "Can I change my visa type while in Korea?",
    a: "Yes, you can change your visa status (체류자격변경) without leaving Korea in many cases. You must apply at your local immigration office (출입국관리사무소) before your current visa expires. Common changes include D-10 to E-7, E-2 to F-2, and F-6 to F-5. You will need a valid reason, supporting documents from your new sponsor or employer, and the applicable fee (typically 130,000 KRW). Processing usually takes 2-4 weeks. Some visa changes, such as tourist visa to work visa, are not permitted and require you to leave Korea and apply from your home country.",
  },
  {
    q: "What is the points-based F-2 residential visa?",
    a: "The F-2-7 visa uses a points system (점수제) where you need at least 80 out of 120 points to qualify. Points are awarded across categories including age (max 25 points, favoring ages 26-30), income (max 25 points based on GNI multiples), education (max 20 points for graduate degrees from Korean universities), Korean language ability (max 20 points for TOPIK Level 5-6), social integration program completion, and other factors like volunteer work or property ownership. The visa is valid for 3 years and allows you to work in any field without restriction. It is a popular pathway for E-7 visa holders looking for more flexibility.",
  },
  {
    q: "How long can I stay in Korea on each work visa?",
    a: "Visa durations vary: E-2 (teaching) is typically 1 year, renewable up to 3 times for a maximum of 4 years total. E-7 (professional) is granted for 1-3 years and can be renewed indefinitely as long as you maintain employment. E-9 (non-professional) is 3 years with a possible 1 year 10 month extension. D-10 (job seeking) is 6 months, extendable once for another 6 months. H-1 (working holiday) is 1 year with no renewal. F-2 (residential) is 3 years, renewable. F-5 (permanent residence) has no expiry but you must renew the ARC card every 10 years.",
  },
  {
    q: "What is the 1345 immigration hotline?",
    a: "The 1345 hotline is the Korea Immigration Contact Center operated by the Ministry of Justice. It provides free consultation on visa issues, immigration procedures, and foreigner support services. The hotline is available in 20 languages including English, Chinese, Vietnamese, Thai, Japanese, Mongolian, Indonesian, and more. Operating hours are Monday to Friday, 9:00 AM to 6:00 PM. You can also access services through the Hi Korea website (www.hikorea.go.kr) for online visa applications, appointment booking, and checking your application status.",
  },
];

export default function VisaGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Korea Visa Types for Foreign Workers"
      description="A comprehensive guide to Korean visa categories for foreign workers: types, requirements, duration, renewal, and how to navigate the immigration system in 2026."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Korea Visa Types for Foreign Workers - Complete Guide (2026)",
            description:
              "Guide to Korean work visas: E-2 teaching, E-7 professional, F-2 residence, F-4 overseas Korean, and more. Requirements, duration, and how to apply.",
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
        <h2 className="text-base font-extrabold mb-3">Overview of Korean Visa Categories</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean visas are organized into letter-number categories managed by the Ministry of Justice (법무부). Understanding the category system helps you identify which visa fits your situation. Each letter represents a broad purpose of stay, and the number specifies the exact visa type within that category.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Category</th>
                <th className="text-left p-2 font-bold">Purpose</th>
                <th className="text-left p-2 font-bold">Examples</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">A</td>
                <td className="p-2">Diplomatic / Official</td>
                <td className="p-2">A-1 Diplomat, A-2 Government Official</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">C</td>
                <td className="p-2">Short-term (90 days or less)</td>
                <td className="p-2">C-3 Tourism, C-4 Short-term Employment</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">D</td>
                <td className="p-2">Long-term non-work</td>
                <td className="p-2">D-2 Student, D-4 Language Training, D-10 Job Seeking</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">E</td>
                <td className="p-2">Employment / Work</td>
                <td className="p-2">E-2 Teaching, E-7 Professional, E-9 Non-professional</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">F</td>
                <td className="p-2">Residence / Family</td>
                <td className="p-2">F-2 Residential, F-4 Overseas Korean, F-5 Permanent</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">G</td>
                <td className="p-2">Miscellaneous</td>
                <td className="p-2">G-1 Humanitarian (refugees, medical)</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">H</td>
                <td className="p-2">Working Holiday / Visiting</td>
                <td className="p-2">H-1 Working Holiday, H-2 Visiting Employment (ethnic Koreans)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Key point:</b> Only E-series, F-series (except F-1), H-series, and some D-series visas permit employment in Korea. Working on a tourist visa (C-3) or student visa (D-2) without proper authorization is illegal and can result in deportation, fines, and re-entry bans.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Most Common Work and Residence Visas</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Below is a detailed breakdown of the visa types most relevant to foreign workers and long-term residents in Korea as of 2026:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Visa</th>
                <th className="text-left p-2 font-bold">Name</th>
                <th className="text-left p-2 font-bold">Duration</th>
                <th className="text-left p-2 font-bold">Key Requirements</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">E-2</td>
                <td className="p-2">Foreign Language Instructor (회화지도)</td>
                <td className="p-2">1 year</td>
                <td className="p-2">Bachelor&apos;s degree, criminal background check, employer sponsorship</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">E-7</td>
                <td className="p-2">Specially Designated Activities (특정활동)</td>
                <td className="p-2">1-3 years</td>
                <td className="p-2">Relevant degree or experience, employer sponsorship, minimum salary threshold</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">E-9</td>
                <td className="p-2">Non-professional Employment (비전문취업)</td>
                <td className="p-2">3 years</td>
                <td className="p-2">Employment Permit System (EPS), limited to manufacturing, agriculture, fishing</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">D-10</td>
                <td className="p-2">Job Seeking (구직)</td>
                <td className="p-2">6 months</td>
                <td className="p-2">Bachelor&apos;s degree from Korean university or previous E-series visa holder</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">F-2</td>
                <td className="p-2">Residential (거주)</td>
                <td className="p-2">3 years</td>
                <td className="p-2">Points-based system (80/120 points), or spouse of Korean national</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">F-4</td>
                <td className="p-2">Overseas Korean (재외동포)</td>
                <td className="p-2">2 years</td>
                <td className="p-2">Ethnic Korean with foreign citizenship, proof of Korean ancestry</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">F-5</td>
                <td className="p-2">Permanent Residency (영주)</td>
                <td className="p-2">Indefinite</td>
                <td className="p-2">5+ years on F-2 or E-7, income above GNI, TOPIK Level 3+, clean record</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">F-6</td>
                <td className="p-2">Marriage (결혼이민)</td>
                <td className="p-2">1-3 years</td>
                <td className="p-2">Married to Korean citizen, proof of relationship, basic Korean ability</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">H-1</td>
                <td className="p-2">Working Holiday (관광취업)</td>
                <td className="p-2">1 year</td>
                <td className="p-2">Age 18-30, bilateral agreement country, sufficient funds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">E-7 Visa: Salary Requirements in 2026</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The E-7 visa is the most common professional work visa for IT workers, engineers, translators, and other specialists. Immigration authorities set minimum salary thresholds (최저임금기준) to ensure foreign professionals are hired at competitive wages:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>General professionals:</b> Annual salary must be at least equivalent to the Gross National Income (GNI) per capita, which is approximately 42,000,000 KRW in 2026. Some occupations listed as &quot;shortage&quot; categories may have lower thresholds.</li>
          <li><b>IT and tech professionals:</b> For software developers, data scientists, and other tech roles in designated &quot;specialized&quot; categories, the minimum is typically 1.0x to 1.5x GNI per capita depending on experience level.</li>
          <li><b>Less than 1 year experience:</b> New graduates or those with less than 1 year of relevant experience may qualify at 80% of the standard threshold under certain conditions.</li>
          <li><b>Regional exceptions:</b> Companies outside the Seoul Metropolitan Area may qualify for reduced salary thresholds, especially in government-designated innovation zones (혁신도시).</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Use our <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link> to calculate your net pay after deductions and verify that your offered salary meets the E-7 threshold.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Alien Registration Card (ARC / 외국인등록증)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Within 90 days of arriving in Korea on a long-term visa, you must register at your local immigration office (출입국관리사무소) and obtain an Alien Registration Card (외국인등록증). The ARC is your primary ID in Korea and is required for virtually everything: opening a bank account, getting a phone, signing a lease, and receiving medical care.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Application:</b> Visit your local immigration office with your passport, visa, a passport photo (3.5cm x 4.5cm), completed application form, and the fee of 30,000 KRW.</li>
          <li><b>Processing time:</b> The ARC is typically issued within 2-3 weeks. You will receive a receipt with your ARC number in the meantime, which can be used for some purposes.</li>
          <li><b>ARC number format:</b> A 13-digit number starting with your birth date (YYMMDD) followed by a gender digit and registration numbers. This number functions like a Korean resident registration number (주민등록번호).</li>
          <li><b>Must carry:</b> You are legally required to carry your ARC at all times. Failure to present it when requested by authorities can result in a fine of up to 1,000,000 KRW.</li>
          <li><b>Address changes:</b> If you move, you must report your new address within 14 days at immigration or online via Hi Korea (하이코리아).</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Work Hour Restrictions by Visa Type</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Not all visas allow the same working hours. Violating these restrictions can jeopardize your visa status:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>E-2, E-7, E-9 (full work visas):</b> Standard Korean labor law applies. Maximum 52 hours per week (40 regular + 12 overtime). Overtime must be compensated at 1.5x the regular hourly rate.</li>
          <li><b>D-2 (student visa):</b> Part-time work is limited to 20 hours per week during semesters and unlimited during vacations, but only with a part-time work permit (시간제취업허가).</li>
          <li><b>D-10 (job seeking):</b> Part-time work up to 20 hours per week is permitted while you search for full-time employment.</li>
          <li><b>H-1 (working holiday):</b> No restriction on hours, but you may not work at the same employer for more than 6 months. Certain industries like entertainment and adult establishments are prohibited.</li>
          <li><b>F-2, F-4, F-5 (residence visas):</b> No work hour restrictions. You may work in any legal occupation without employer sponsorship.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Visa Renewal and Status Changes</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Renewing your visa (체류기간연장) or changing your visa status (체류자격변경) must be done before your current visa expires. Here is how the process works:
        </p>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]">Book an appointment on the Hi Korea website (www.hikorea.go.kr) at least 4 weeks before your visa expires. Walk-ins are accepted at some offices but expect long waits.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]">Gather required documents: passport, ARC, application form, employer sponsorship letter (재직증명서), contract, tax payment certificate (납세증명서), and the fee (60,000 KRW for renewal, 130,000 KRW for status change).</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 3</span>
            <span className="text-sm text-[#4E5968]">Visit your local immigration office on the appointment date. Submit documents and pay the fee. The officer may ask questions about your employment or living situation.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 4</span>
            <span className="text-sm text-[#4E5968]">Wait for processing (1-4 weeks depending on the visa type and office workload). You can check the status online via Hi Korea. Your stay is legal while the application is pending, even if your visa expires during processing.</span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Warning:</b> Overstaying your visa is a serious offense. Even one day of overstay can result in fines (200,000 KRW per month), detention, deportation, and a re-entry ban of 1-10 years. Always apply for renewal well in advance.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Useful Contacts and Resources</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          These resources are essential for navigating the Korean immigration system:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>1345 Immigration Hotline:</b> Free consultation in 20 languages. Call 1345 from any Korean phone, or +82-1345 from abroad. Available Monday-Friday, 9 AM - 6 PM. Provides guidance on visa types, application procedures, and immigration law.</li>
          <li><b>Hi Korea (www.hikorea.go.kr):</b> The official immigration portal for online visa applications, appointment booking, status checks, and document submissions. Available in Korean, English, and Chinese.</li>
          <li><b>Immigration offices (출입국관리사무소):</b> Located in all major cities. Seoul Immigration Office in Mokdong handles the largest volume. Arrive early as wait times can exceed 2-3 hours during peak periods.</li>
          <li><b>MOEL Foreign Workers Center (외국인근로자지원센터):</b> Call 1350 for employment rights issues, wage disputes, and workplace problems. Provides counseling in multiple languages.</li>
          <li><b>Korea Immigration &amp; Integration Program (KIIP / 사회통합프로그램):</b> Free Korean language and culture classes for immigrants. Completing KIIP courses earns points toward the F-2 and F-5 visa applications.</li>
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
