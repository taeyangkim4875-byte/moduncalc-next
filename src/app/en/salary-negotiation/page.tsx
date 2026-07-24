import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import SalaryNegotiationCalc from "./SalaryNegotiationCalc";

export const metadata: Metadata = {
  title: "Korea Salary Guide for Foreigners - Expected Pay by Industry (2026)",
  description: "How much should you earn in Korea? Average salaries by industry, experience & visa type. E-2 teacher vs E-7 professional.",
  alternates: { canonical: "https://moduncalc.com/en/salary-negotiation" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korea Salary Guide for Foreigners" description="Expected salaries by industry and experience level — IT, teaching, engineering, finance & more. Plus negotiation tips.">
      <CalculatorJsonLd name="Korea Salary Guide for Foreigners" description="Interactive salary reference for foreigners in Korea. Compare expected pay by industry, experience level, and visa type." url="https://moduncalc.com/en/salary-negotiation" />
      <FaqJsonLd items={[
        { q: "How much do English teachers make in Korea?", a: "English teachers in Korea on E-2 visas typically earn ₩2,100,000 to ₩2,800,000 per month (approximately $1,500-$2,000 USD). EPIK public school positions pay ₩2.1-2.8M based on qualifications and experience, while hagwon (학원/private academy) salaries vary widely from ₩2.0-3.5M. Most E-2 positions include free housing (a furnished studio apartment) or a housing allowance of ₩400,000-600,000/month, plus round-trip airfare and a completion bonus (퇴직금) equal to one month's salary." },
        { q: "What salary can E-7 visa holders expect in Korea?", a: "E-7 (Professional Worker) visa holders typically earn ₩3,000,000 to ₩8,000,000+ per month depending on industry and experience. IT/tech professionals start at ₩3.0-4.5M and can reach ₩10M+ at senior levels. Engineering roles at companies like Samsung and Hyundai pay ₩3.5-8.5M. Finance professionals in Yeouido earn ₩4.0-13M. As of 2026, E-7 visa applicants must meet a minimum salary threshold set by the Ministry of Justice, typically around 80% of the Korean average wage (GNI)." },
        { q: "What benefits should foreigners negotiate in Korea besides salary?", a: "Beyond base salary, foreigners should negotiate: (1) Housing support — free company housing or ₩500K-1M/month allowance, worth ₩6-12M/year in Seoul. (2) Flights home — annual round-trip tickets for you and family. (3) Bonuses — ask about performance bonuses (성과급) and holiday bonuses (명절 상여금), which can add 100-400% of monthly salary. (4) Severance pay (퇴직금) is legally guaranteed at 1 month per year worked. (5) Korean language class support. (6) Pension refund eligibility when leaving Korea." },
      ]} />
      <SalaryNegotiationCalc />
    </PageLayout>
  );
}
