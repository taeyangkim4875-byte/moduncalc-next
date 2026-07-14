import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { WebsiteJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korea Calculators for Foreigners - Tax, Salary, Pension, Housing",
  description: "Free calculators for foreigners living in Korea. Flat tax vs progressive, salary after tax, pension refund, jeonse vs wolse, severance pay, and Korean age.",
  alternates: { canonical: "https://moduncalc.com/en" },
  openGraph: {
    title: "Korea Calculators for Foreigners",
    description: "Free tools for expats: tax comparison, salary, pension refund, housing, and more.",
    url: "https://moduncalc.com/en",
    locale: "en_US",
  },
};

const TOOLS = [
  { href: '/en/tax-comparison', icon: '💰', title: 'Flat vs Progressive Tax', desc: 'Which tax method saves you more?' },
  { href: '/en/salary', icon: '💰', title: 'Salary Calculator', desc: 'Net pay after tax & insurance' },
  { href: '/en/pension-refund', icon: '👵', title: 'Pension Refund', desc: 'Lump-sum refund when leaving Korea' },
  { href: '/en/health-insurance', icon: '🏥', title: 'Health Insurance', desc: 'Monthly NHI premium calculator' },
  { href: '/en/severance', icon: '💼', title: 'Severance Pay', desc: 'Retirement allowance calculator' },
  { href: '/en/cost-of-living', icon: '🏙️', title: 'Cost of Living', desc: 'Monthly budget by city & lifestyle' },
  { href: '/en/rent', icon: '🏠', title: 'Jeonse vs Wolse', desc: 'Korean rental deposit converter' },
  { href: '/en/korean-age', icon: '🎂', title: 'Korean Age', desc: 'International vs Korean age' },
  { href: '/en/subway', icon: '🚇', title: 'Subway Fare', desc: 'Seoul metro cost calculator' },
  { href: '/en/size-converter', icon: '👟', title: 'Size Converter', desc: 'Clothing & shoe sizes' },
  { href: '/en/tip-calculator', icon: '💵', title: 'Tipping Guide', desc: 'Do you tip in Korea?' },
  { href: '/en/timezone', icon: '🕐', title: 'Time Zone (KST)', desc: 'Korea time converter' },
  { href: '/en/electricity', icon: '⚡', title: 'Electricity Bill', desc: 'Understand your 전기요금' },
  { href: '/en/date-converter', icon: '📅', title: 'Date Converter', desc: 'Korean date format' },
  { href: '/en/grocery', icon: '🛒', title: 'Grocery Prices', desc: 'Food costs in Korea' },
  { href: '/en/internet-speed', icon: '📶', title: 'Internet Plans', desc: 'Compare providers & plans' },
  { href: '/en/alcohol', icon: '🍺', title: 'Blood Alcohol (DUI)', desc: 'When can I drive in Korea?' },
  { href: '/en/air-fryer', icon: '🍳', title: 'Air Fryer Converter', desc: 'Oven to air fryer settings' },
  { href: '/en/compound', icon: '📈', title: 'Compound Interest', desc: 'Investment growth simulator' },
  { href: '/en/due-date', icon: '🤰', title: 'Due Date Calculator', desc: 'Pregnancy week tracker' },
  { href: '/en/body-fat', icon: '💪', title: 'Body Fat Calculator', desc: 'US Navy formula' },
  { href: '/en/lunar-calendar', icon: '🌙', title: 'Lunar Calendar 2026', desc: 'Korean holidays & dates' },
  { href: '/en/paint', icon: '🎨', title: 'Paint Calculator', desc: 'How much paint do I need?' },
  { href: '/en/character-counter', icon: '📝', title: 'Character Counter', desc: 'Words, bytes, limits' },
  { href: '/en/calorie', icon: '🍎', title: 'Calorie Calculator', desc: 'TDEE & diet plan' },
  { href: '/en/pyeong', icon: '📐', title: 'Pyeong Converter', desc: 'Korean apartment sizes' },
  { href: '/en/password', icon: '🔐', title: 'Password Generator', desc: 'Strong random passwords' },
  { href: '/en/random', icon: '🎲', title: 'Random Generator', desc: 'Numbers, lottery, shuffler' },
];

export default function EnHome() {
  return (
    <PageLayout
      eyebrow="Free Tools for Expats"
      title="Korea Calculators"
      description="Essential calculators for foreigners living and working in Korea."
    >
      <WebsiteJsonLd />

      <div className="grid grid-cols-1 gap-3">
        {TOOLS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3.5 p-4 bg-white rounded-xl shadow-[var(--shadow)] no-underline text-[var(--ink)] transition-all hover:translate-y-[-2px] hover:shadow-[var(--shadow-h)]"
          >
            <span className="text-2xl flex-none">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-bold">{item.title}</div>
              <div className="text-xs text-[var(--sub)] font-medium">{item.desc}</div>
            </div>
            <span className="text-sm text-[var(--sub)] flex-none">→</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[var(--bg)] rounded-xl text-sm text-[#4E5968] leading-relaxed">
        <h2 className="text-base font-extrabold text-[var(--ink)] mb-2">About These Tools</h2>
        <p className="mb-2">
          These calculators are built specifically for <b>foreign workers, expats, and English teachers</b> in Korea.
          All calculations use <b>2026 tax rates and social insurance premiums</b>.
        </p>
        <p>
          Whether you&apos;re deciding between flat and progressive tax, estimating your pension refund before leaving Korea,
          or trying to understand the unique jeonse rental system — we&apos;ve got you covered.
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link href="/" className="text-sm font-bold text-[var(--primary)] no-underline hover:text-[var(--primary-dark)]">
          🇰🇷 한국어 계산기 보기 →
        </Link>
      </div>
    </PageLayout>
  );
}
