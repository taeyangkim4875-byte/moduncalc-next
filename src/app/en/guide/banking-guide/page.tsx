import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Opening a Bank Account in Korea as a Foreigner - Complete Guide",
  description:
    "Step-by-step guide to opening a Korean bank account: required documents, best banks, online banking, and international transfers.",
  alternates: { canonical: "https://moduncalc.com/en/guide/banking-guide" },
  openGraph: {
    title: "Opening a Bank Account in Korea as a Foreigner - Complete Guide",
    description:
      "Step-by-step guide to opening a Korean bank account: required documents, best banks, online banking, and international transfers.",
    url: "https://moduncalc.com/en/guide/banking-guide",
  },
};

const faqItems = [
  {
    q: "Can foreigners open a bank account in Korea?",
    a: "Yes, foreigners with a valid Alien Registration Card (ARC / 외국인등록증) can open a bank account at most major Korean banks. You will need your ARC, passport, and a Korean phone number. Some banks also require proof of employment or enrollment. The process typically takes 30-60 minutes at a branch. Note that recent regulations have made it harder for short-term visitors without an ARC to open accounts.",
  },
  {
    q: "Which Korean bank is best for foreigners?",
    a: "KB Kookmin Bank (국민은행) and Shinhan Bank (신한은행) are generally considered the most foreigner-friendly banks, with English-speaking staff at major branches and English-language banking apps. Woori Bank (우리은행) and Hana Bank (하나은행) also provide good foreign customer services. For a fully digital experience, KakaoBank (카카오뱅크) offers an English interface but requires an existing Korean bank account for initial verification.",
  },
  {
    q: "What is the cheapest way to send money abroad from Korea?",
    a: "Wise (formerly TransferWise) is generally the cheapest option for most currencies, offering near-mid-market exchange rates with transparent fees typically between 3,000-10,000 KRW per transfer. SentBe (센트비) is a Korean service with competitive rates for popular corridors like USD, PHP, and VND. The Toss (토스) app also offers international transfers. Traditional bank wire transfers are the most expensive, with fees of 10,000-30,000 KRW plus unfavorable exchange rates that can add 1-3% hidden cost.",
  },
  {
    q: "Can I use my Korean bank card abroad?",
    a: "Yes, most Korean debit and credit cards work internationally at ATMs and merchants that accept the card's network (Visa, Mastercard, or UnionPay). However, some basic Korean debit cards only work on domestic networks. Make sure your card has an international payment feature enabled. ATM withdrawal fees abroad typically range from 3,000-5,000 KRW per transaction, plus the foreign bank's own fees. Notify your Korean bank before traveling to avoid your card being blocked for suspicious foreign transactions.",
  },
];

export default function BankingGuidePage() {
  return (
    <PageLayout
      eyebrow="Guide"
      title="Opening a Bank Account in Korea"
      description="A complete guide for foreigners: which banks to choose, what documents you need, how to set up online banking, and the best ways to send money internationally."
    >
      <FaqJsonLd items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Opening a Bank Account in Korea as a Foreigner - Complete Guide",
            description:
              "Step-by-step guide to opening a Korean bank account: required documents, best banks, online banking, and international transfers.",
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
        <h2 className="text-base font-extrabold mb-3">Which Banks Are Foreigner-Friendly?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Not all Korean banks offer the same level of service to foreign customers. Based on English support, app usability, and branch accessibility, here are the top options:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Bank</th>
                <th className="text-left p-2 font-bold">Korean Name</th>
                <th className="text-left p-2 font-bold">English App</th>
                <th className="text-left p-2 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">KB Kookmin</td>
                <td className="p-2">국민은행</td>
                <td className="p-2">KB Star Banking</td>
                <td className="p-2">Largest bank, most branches, good English support at global branches</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Shinhan</td>
                <td className="p-2">신한은행</td>
                <td className="p-2">SOL Bank</td>
                <td className="p-2">Strong English app, popular among expats, global ATM network</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Woori</td>
                <td className="p-2">우리은행</td>
                <td className="p-2">Woori WON</td>
                <td className="p-2">Dedicated foreign customer service, competitive remittance rates</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">Hana</td>
                <td className="p-2">하나은행</td>
                <td className="p-2">Hana 1Q</td>
                <td className="p-2">Good foreign currency services, partnership with international banks</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2 font-bold">KEB (NH)</td>
                <td className="p-2">농협은행</td>
                <td className="p-2">NH Smart Banking</td>
                <td className="p-2">Wide ATM network especially in rural areas, lower fees for agricultural workers</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Tip:</b> Look for branches labeled &quot;Global Branch&quot; or &quot;Foreign Customer Center&quot; (외국인 고객센터). These branches have English-speaking staff and are experienced in handling foreign customer documentation. In Seoul, Itaewon, Gangnam, and areas near universities tend to have the most foreigner-friendly branches.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Required Documents</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          To open a bank account in Korea as a foreigner, you will need the following documents:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5 mb-3">
          <li><b>Alien Registration Card (ARC / 외국인등록증):</b> This is the most important document. Without an ARC, most banks will not open an account. You can apply for an ARC at your local immigration office after arriving in Korea on a long-term visa (D, E, F, or H series).</li>
          <li><b>Passport:</b> Your original passport (not a copy). The bank will verify it against your ARC information.</li>
          <li><b>Korean phone number:</b> Required for SMS verification and banking app registration. You need an active Korean mobile number -- VoIP or international numbers will not work.</li>
          <li><b>Proof of address (sometimes):</b> Some banks may ask for a utility bill or lease agreement to verify your Korean address.</li>
          <li><b>Proof of employment/enrollment (sometimes):</b> Due to anti-money-laundering regulations, banks may request a certificate of employment or school enrollment, especially for newly arrived foreigners.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Important:</b> Since 2021, Korean banks have tightened their account opening procedures for foreigners as part of enhanced anti-fraud and anti-money-laundering measures. Some banks may limit your initial account features (transfer limits, online banking) and gradually expand them as you build a transaction history. Do not be discouraged if the first bank declines your application -- try another branch or bank.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Types of Bank Accounts</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean banks offer several types of accounts. Here are the most relevant for foreign residents:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Checking/savings account (입출금통장 / ipchulgeum tongjang):</b> The basic everyday account for receiving salary, paying bills, and making transfers. This is what you will open first. Interest rates are minimal (0.1-0.5%).</li>
          <li><b>Installment savings (적금 / jeokgeum):</b> A fixed monthly deposit plan where you commit to saving a set amount each month for 6-36 months. Offers higher interest rates (2-5% depending on conditions) and sometimes tax benefits. You cannot withdraw early without penalty.</li>
          <li><b>Time deposit (예금 / yegeum):</b> A lump-sum deposit locked for a fixed period (3 months to 3 years). Higher interest rates than regular savings. Good for parking your emergency fund or severance pay.</li>
          <li><b>Foreign currency account (외화예금):</b> An account that holds foreign currency (USD, EUR, JPY, etc.). Useful if you receive income in foreign currency or want to save on exchange rate conversions when remitting money home.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Step-by-Step: Opening Your Account</h2>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 1</span>
            <span className="text-sm text-[#4E5968]">Choose a bank and find a foreigner-friendly branch near you. Call ahead or check the bank&apos;s website for branches with English-speaking staff.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 2</span>
            <span className="text-sm text-[#4E5968]">Visit the branch with your ARC, passport, and Korean phone. Take a queue number and wait to be called. Expect the process to take 30-60 minutes.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 3</span>
            <span className="text-sm text-[#4E5968]">Fill out the account opening form. The bank clerk will help you. You will choose a PIN and may need to verify your phone via SMS. Request a debit card (체크카드) -- it usually arrives within 1-2 weeks by mail, or some branches issue them on the spot.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 4</span>
            <span className="text-sm text-[#4E5968]">Ask the clerk to help you set up mobile banking (모바일뱅킹) on your phone. Download the bank&apos;s app, register your account, and set up biometric login. This is essential for transfers, bill payments, and checking your balance.</span>
          </div>
          <div className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
            <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">Step 5</span>
            <span className="text-sm text-[#4E5968]">Make an initial deposit (even 10,000 KRW is fine). Give your account number to your employer for salary deposits. Your account is now active.</span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Essential Banking Apps</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Korean banking is heavily app-based. Most transactions can be done from your phone without visiting a branch:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Your bank&apos;s official app:</b> KB Star Banking, Shinhan SOL, Woori WON, or Hana 1Q -- whichever bank you chose. These apps handle transfers, bill payments, account management, and card controls. Most now offer English language settings.</li>
          <li><b>Toss (토스):</b> A fintech super-app that connects to your bank account. Excellent for quick transfers, splitting bills, checking credit scores, and comparing financial products. Very popular among younger Koreans and increasingly foreigner-friendly.</li>
          <li><b>KakaoBank (카카오뱅크):</b> A mobile-only bank with a clean English interface. Opening an account requires an existing Korean bank account for identity verification. Offers competitive savings rates and very easy peer-to-peer transfers via KakaoTalk.</li>
          <li><b>KakaoPay (카카오페이):</b> A payment platform integrated into KakaoTalk. Widely accepted for online and offline payments, bill splitting, and in-app purchases. You can link it to your Korean bank account or debit card.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">International Transfers</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Sending money home is a common need for foreign workers. Here is how the main options compare:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Service</th>
                <th className="text-left p-2 font-bold">Typical Fee</th>
                <th className="text-left p-2 font-bold">Exchange Rate</th>
                <th className="text-left p-2 font-bold">Speed</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[#eee]">
                <td className="p-2">Korean bank wire</td>
                <td className="p-2">10-30K KRW</td>
                <td className="p-2">1-3% markup</td>
                <td className="p-2">2-5 business days</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Wise</td>
                <td className="p-2">3-10K KRW</td>
                <td className="p-2">Mid-market rate</td>
                <td className="p-2">1-2 business days</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">SentBe (센트비)</td>
                <td className="p-2">5-10K KRW</td>
                <td className="p-2">Near mid-market</td>
                <td className="p-2">1-3 business days</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">Toss International</td>
                <td className="p-2">5-15K KRW</td>
                <td className="p-2">Competitive</td>
                <td className="p-2">1-3 business days</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">PayPal</td>
                <td className="p-2">Variable</td>
                <td className="p-2">2-4% markup</td>
                <td className="p-2">Instant to 3 days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>Pro tip:</b> Always check the total cost of a transfer, not just the stated fee. Some services advertise low fees but use unfavorable exchange rates, which can cost you far more than a higher-fee service with a better rate. For large transfers (over 1 million KRW), even a 0.5% difference in exchange rate matters significantly.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">ATM Tips</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          ATMs (현금인출기) are widespread in Korea but have some quirks foreigners should know about:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed space-y-2 list-disc pl-5">
          <li><b>Global ATMs:</b> Look for ATMs marked &quot;Global&quot; or with Visa/Mastercard logos for international card withdrawals. These are common at convenience stores (CU, GS25), airports, and tourist areas. Standard Korean ATMs may not accept foreign cards.</li>
          <li><b>Fees:</b> Your own bank&apos;s ATM is usually free during business hours. Other banks&apos; ATMs charge 500-1,000 KRW. After hours (typically after 6 PM and weekends), fees may increase. International card withdrawals typically incur a 3,000-5,000 KRW fee.</li>
          <li><b>Withdrawal limits:</b> Most Korean ATMs have a per-transaction limit of 500,000-1,000,000 KRW. Daily limits are typically 3,000,000 KRW for domestic cards. International cards may have lower limits set by your home bank.</li>
          <li><b>Language:</b> Most ATMs in major cities offer an English language option. Press the &quot;English&quot; or &quot;외국어&quot; button at the start screen.</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Korean Banking Terms Glossary</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          These Korean banking terms will help you navigate apps, ATMs, and bank documents:
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
                <td className="p-2">입금</td>
                <td className="p-2">ipgeum</td>
                <td className="p-2">Deposit</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">출금</td>
                <td className="p-2">chulgeum</td>
                <td className="p-2">Withdrawal</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">이체</td>
                <td className="p-2">iche</td>
                <td className="p-2">Transfer</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">잔액</td>
                <td className="p-2">jan-aek</td>
                <td className="p-2">Balance</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">계좌번호</td>
                <td className="p-2">gyejwa beonho</td>
                <td className="p-2">Account number</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">비밀번호</td>
                <td className="p-2">bimil beonho</td>
                <td className="p-2">PIN / Password</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">체크카드</td>
                <td className="p-2">chekeu kadeu</td>
                <td className="p-2">Debit card</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">통장</td>
                <td className="p-2">tongjang</td>
                <td className="p-2">Bankbook / Account</td>
              </tr>
              <tr className="border-t border-[#eee]">
                <td className="p-2">해외송금</td>
                <td className="p-2">haeoe songgeum</td>
                <td className="p-2">International remittance</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Understanding your salary deposits is easier when you can read your bank statements. Use our{" "}
          <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link> to break down your gross-to-net pay and understand each deduction line item on your payslip.
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
