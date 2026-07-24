import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "How to Get Your ARC (Alien Registration Card) in Korea - 2026 Guide",
  description:
    "How to get your ARC in Korea? Step-by-step: documents, cost ₩30,000, timeline 2-3 weeks. Mobile ARC now available.",
  alternates: { canonical: "https://moduncalc.com/en/guide/arc-guide" },
  openGraph: {
    title: "How to Get Your ARC (Alien Registration Card) in Korea - 2026 Guide",
    description:
      "Step-by-step guide to getting your Residence Card (ARC/외국인등록증) in Korea. Documents, cost ₩30,000, timeline, and what to do after.",
    url: "https://moduncalc.com/en/guide/arc-guide",
  },
};

const faqItems = [
  {
    q: "How long does it take to get an ARC in Korea?",
    a: "After submitting your application at the immigration office (출입국관리사무소), the ARC card itself takes approximately 2-3 weeks to be issued. You will receive a receipt that serves as temporary proof of registration. In busy periods (March-April and September-October when new visa holders arrive), processing can take up to 4 weeks. You can check the status of your card on the Hi Korea website (hikorea.go.kr).",
  },
  {
    q: "Can I open a bank account without an ARC?",
    a: "It is extremely difficult to open a Korean bank account without an ARC. Most major banks (KB Kookmin, Shinhan, Woori, Hana) require an ARC as their primary identification document for foreigners. Some banks may allow short-term visitors to open limited accounts with just a passport, but these accounts come with significant restrictions on transfers and online banking. It is strongly recommended to get your ARC first before attempting to open a bank account.",
  },
  {
    q: "What is the Mobile Residence Card (모바일 외국인등록증)?",
    a: "Starting in 2025, Korea introduced the Mobile Residence Card (모바일 외국인등록증), a digital version of the physical ARC stored on your smartphone. It can be used for identity verification at government offices, banks, and other institutions that accept digital ID. You can register for it through the government's mobile app after receiving your physical ARC. The mobile version supplements but does not replace the physical card -- you should still carry your physical ARC as backup.",
  },
  {
    q: "Do I need to update my ARC when I move to a new address?",
    a: "Yes, you are legally required to report any address change (전입신고) within 14 days of moving. You can do this at your local community center (주민센터) or district office (구청). Bring your ARC, passport, and your new lease agreement. Failure to report an address change can result in a fine of up to ₩1,000,000. The process is free and usually takes about 15 minutes. This address registration is also critical for protecting your rental deposit.",
  },
];

export default function ArcGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="How to Get Your ARC in Korea"
      description="Everything foreigners need to know about getting an Alien Registration Card (외국인등록증), now officially called the Residence Card: documents, cost, timeline, and what to do after you receive it."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "How to Get Your ARC (Alien Registration Card) in Korea - 2026 Guide",
            description:
              "Step-by-step guide to getting your Residence Card (ARC/외국인등록증) in Korea. Documents, cost ₩30,000, timeline, and what to do after.",
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
        <h2 className="text-base font-extrabold mb-3">What is the ARC (외국인등록증)?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The Alien Registration Card, commonly called <b>ARC</b>, is officially known as the <b>Residence Card</b> (외국인등록증 / oegugin deungnokjeung). It is a credit-card-sized ID issued to foreigners staying in Korea for more than 90 days. The card contains your 13-digit foreigner registration number (외국인등록번호), which functions like a Korean resident registration number (주민등록번호) and is essential for nearly every aspect of daily life in Korea.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Without an ARC, you cannot open a bank account, sign a phone contract, rent an apartment, enroll in National Health Insurance (국민건강보험), or receive proper medical care at hospitals. Getting your ARC should be your <b>first priority</b> after arriving in Korea on a long-term visa.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Who Needs an ARC?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Any foreigner planning to stay in Korea for more than 90 days must apply for an ARC within 90 days of entry. This includes holders of the following visa types:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>D-2 (Student visa):</b> University and graduate students enrolled in Korean institutions</li>
          <li><b>D-4 (Language trainee):</b> Korean language program students</li>
          <li><b>E-1 to E-7 (Work visas):</b> Professors, language instructors, researchers, engineers, and other professional workers</li>
          <li><b>F-2 (Resident visa):</b> Long-term residents including points-based immigration</li>
          <li><b>F-4 (Overseas Korean):</b> Ethnic Koreans with foreign citizenship</li>
          <li><b>F-6 (Marriage visa):</b> Spouses of Korean citizens</li>
          <li><b>H-1 (Working Holiday):</b> Working holiday visa holders from eligible countries</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          <b>Note:</b> Short-term visitors on tourist visas (B-1, B-2, C-series) staying less than 90 days do not need and cannot apply for an ARC.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Required Documents</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Prepare the following documents before visiting the immigration office:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Passport (여권):</b> Original passport with your valid visa sticker or entry stamp</li>
          <li><b>Application form (신청서):</b> Unified Application Form for Alien Registration, available at the immigration office or downloadable from Hi Korea (hikorea.go.kr). Fill it out in advance to save time.</li>
          <li><b>Passport photo (증명사진):</b> One 3.5cm x 4.5cm color photo taken within the last 6 months on a white background. Photo booths (인생네컷 style) at convenience stores or subway stations can produce passport-quality photos for ₩4,000-6,000.</li>
          <li><b>Fee: ₩30,000 (수수료):</b> Payable via Revenue Stamp (수입인지) purchased at the post office inside or near the immigration building. Some offices also accept card payment.</li>
          <li><b>Proof of address (거소증명):</b> Lease agreement (임대차계약서), dormitory confirmation, or a letter from your host. Some immigration offices accept a utility bill.</li>
          <li><b>Additional documents by visa type:</b> Students need an enrollment certificate (재학증명서), workers need a certificate of employment (재직증명서) and business registration (사업자등록증) of the employer.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">How to Apply: Step by Step</h2>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]">Book an appointment online through the Hi Korea website (hikorea.go.kr). Walk-ins are accepted at most offices, but reservations save significant waiting time. During peak seasons (March, September), appointments may be booked 2-3 weeks out.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]">Visit your designated immigration office (출입국관리사무소). Major offices include Seoul Southern (서울남부), Seoul Sejongno (세종로), Incheon (인천), and Suwon (수원). Arrive early -- offices open at 9:00 AM and queues can be long. Take a number from the ticket machine.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 3</span>
            <span className="text-sm text-[#4E5968]">Submit your documents at the counter. The officer will take your fingerprints (양손 지문) and photograph. The entire process at the counter takes about 15-20 minutes if your documents are complete.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 4</span>
            <span className="text-sm text-[#4E5968]">Receive a receipt (접수증) with your alien registration number. This receipt serves as temporary proof of registration while you wait for the physical card. Keep it safe.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 5</span>
            <span className="text-sm text-[#4E5968]">Pick up your ARC at the immigration office 2-3 weeks later, or choose to have it mailed to your address (registered mail, takes a few extra days). You can check your card status on Hi Korea.</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Mobile Residence Card (모바일 외국인등록증)</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Since 2025, Korea has introduced the <b>Mobile Residence Card</b> (모바일 외국인등록증), a digital version of the ARC stored on your smartphone. This digital ID can be used for identity verification at government offices, banks, hospitals, and other institutions that support mobile identification.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          To register for the Mobile Residence Card, you need to already have your physical ARC. Download the designated government app, verify your identity using your physical card and biometric data, and the mobile version will be linked to your smartphone. It works similarly to how Korean citizens use their mobile ID (모바일 신분증).
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Important:</b> The mobile version supplements but does not replace the physical card. Some institutions and smaller businesses may not yet accept the mobile version, so always carry your physical ARC as well.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">What You Need Your ARC For</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Your ARC number is used constantly in Korea. Here are the most important situations where you will need it:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Opening a bank account (은행 계좌개설):</b> All banks require an ARC. See our{" "}
            <Link href="/en/guide/banking-guide" className="text-[var(--primary)] font-bold hover:underline">Banking Guide</Link> for details.</li>
          <li><b>Getting a phone contract (휴대폰 개통):</b> Needed for postpaid plans at SKT, KT, and LG U+. Prepaid SIMs may work with just a passport.</li>
          <li><b>Signing a lease (임대차계약):</b> Landlords and real estate agents require your ARC number for the rental contract.</li>
          <li><b>National Health Insurance (국민건강보험):</b> You will be enrolled in NHI based on your ARC. Use our{" "}
            <Link href="/en/health-insurance" className="text-[var(--primary)] font-bold hover:underline">Health Insurance Calculator</Link> to estimate your premiums.</li>
          <li><b>Employment and tax (취업 및 세금):</b> Employers use your ARC number for payroll and tax withholding. Check your after-tax salary with our{" "}
            <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link>.</li>
          <li><b>Online shopping and delivery (온라인 쇼핑):</b> Many Korean websites require a foreigner registration number to sign up and make purchases.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Address Change & Renewal</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>Address change (전입신고):</b> When you move, you must report your new address within 14 days. Visit your local community center (주민센터) or district office (구청) with your ARC, passport, and new lease agreement. This process is free and takes about 15 minutes. Address registration is also critical for protecting your rental deposit through 확정일자 (fixed-date certification).
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Renewal (재발급):</b> ARCs are issued with an expiration date matching your visa period. To renew, apply at the immigration office before your ARC expires. The renewal fee is ₩30,000. If your ARC is lost or damaged, report it immediately to immigration and apply for reissuance (분실신고 및 재발급). A lost ARC can be a serious security risk if someone uses your registration number fraudulently.
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
