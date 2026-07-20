import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { WebsiteJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Korea Calculators for Foreigners - Tax, Salary, Pension, Housing",
  description: "Living in Korea? Free calculators for expats: salary, tax, pension refund, rent, subway & more. 30+ tools, no signup needed.",
  alternates: { canonical: "https://moduncalc.com/en" },
  openGraph: {
    title: "Korea Calculators for Foreigners",
    description: "Free tools for expats: tax comparison, salary, pension refund, housing, and more.",
    url: "https://moduncalc.com/en",
    locale: "en_US",
  },
};

const KOREA_ESSENTIALS = [
  { href: '/en/tax-comparison', icon: '💰', title: 'Flat vs Progressive Tax', desc: 'Which tax method saves you more?' },
  { href: '/en/salary', icon: '💰', title: 'Salary Calculator', desc: 'Net pay after tax & insurance' },
  { href: '/en/pension-refund', icon: '👵', title: 'Pension Refund', desc: 'Leaving Korea? Claim your NPS' },
  { href: '/en/health-insurance', icon: '🏥', title: 'Health Insurance', desc: 'Monthly NHI premium' },
  { href: '/en/severance', icon: '💼', title: 'Severance Pay', desc: '1+ year = mandatory pay' },
];

const KOREA_LIVING = [
  { href: '/en/cost-of-living', icon: '🏙️', title: 'Cost of Living', desc: 'Monthly budget by city' },
  { href: '/en/rent', icon: '🏠', title: 'Jeonse vs Wolse', desc: 'Korean deposit system' },
  { href: '/en/subway', icon: '🚇', title: 'Subway Fare', desc: 'Seoul metro cost' },
  { href: '/en/electricity', icon: '⚡', title: 'Electricity Bill', desc: 'Progressive tier system' },
  { href: '/en/grocery', icon: '🛒', title: 'Grocery Prices', desc: 'Food costs in Korea' },
  { href: '/en/internet-speed', icon: '📶', title: 'Internet Plans', desc: 'KT, SK, LG U+ comparison' },
  { href: '/en/pyeong', icon: '📐', title: 'Pyeong Converter', desc: 'Apartment size (평↔㎡)' },
  { href: '/en/gold', icon: '🪙', title: 'Gold Price', desc: 'Korean don (돈) converter' },
];

const KOREA_CULTURE = [
  { href: '/en/korean-age', icon: '🎂', title: 'Korean Age', desc: 'How old are you in Korea?' },
  { href: '/en/size-converter', icon: '👟', title: 'Size Converter', desc: 'Korean clothing & shoe sizes' },
  { href: '/en/tip-calculator', icon: '💵', title: 'Tipping Guide', desc: 'No tip culture in Korea' },
  { href: '/en/timezone', icon: '🕐', title: 'Time Zone (KST)', desc: 'Korea time converter' },
  { href: '/en/date-converter', icon: '📅', title: 'Date Converter', desc: 'Korean date format' },
  { href: '/en/lunar-calendar', icon: '🌙', title: 'Lunar Calendar 2026', desc: 'Seollal, Chuseok dates' },
  { href: '/en/alcohol', icon: '🍺', title: 'Blood Alcohol (DUI)', desc: 'Korea limit: 0.03%' },
];

const OTHER_TOOLS = [
  { href: '/en/calorie', icon: '🍎', title: 'Calorie Calculator', desc: 'TDEE & diet plan' },
  { href: '/en/body-fat', icon: '💪', title: 'Body Fat', desc: 'US Navy formula' },
  { href: '/en/sleep', icon: '😴', title: 'Sleep Calculator', desc: '90-min cycle' },
  { href: '/en/compound', icon: '📈', title: 'Compound Interest', desc: 'Investment growth' },
  { href: '/en/due-date', icon: '🤰', title: 'Due Date', desc: 'Pregnancy tracker' },
  { href: '/en/crypto', icon: '₿', title: 'Crypto Profit', desc: 'Investment returns' },
  { href: '/en/character-counter', icon: '📝', title: 'Character Counter', desc: 'Words & bytes' },
  { href: '/en/password', icon: '🔐', title: 'Password Generator', desc: 'Secure passwords' },
  { href: '/en/random', icon: '🎲', title: 'Random Generator', desc: 'Numbers & lottery' },
  { href: '/en/air-fryer', icon: '🍳', title: 'Air Fryer', desc: 'Oven converter' },
  { href: '/en/paint', icon: '🎨', title: 'Paint Calculator', desc: 'Room quantities' },
  { href: '/en/water-intake', icon: '💧', title: 'Water Intake', desc: 'Daily hydration' },
];

function Section({ title, items }: { title: string; items: typeof KOREA_ESSENTIALS }) {
  return (
    <div className="mb-5">
      <div className="text-sm font-extrabold text-[var(--ink)] mb-2 px-1">{title}</div>
      <div className="flex flex-col gap-2">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[var(--line)] no-underline text-[var(--ink)] transition-all hover:border-[var(--primary)] hover:shadow-sm"
          >
            <span className="text-xl flex-none">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold">{item.title}</div>
              <div className="text-[11px] text-[var(--sub)] font-medium">{item.desc}</div>
            </div>
            <span className="text-xs text-[var(--sub)]">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function EnHome() {
  return (
    <PageLayout
      eyebrow="Free Tools for Expats"
      title="Korea Calculators"
      description="Essential calculators for foreigners living and working in Korea."
    >
      <WebsiteJsonLd />

      <Section title="💰 Money & Tax" items={KOREA_ESSENTIALS} />
      <Section title="🏠 Living in Korea" items={KOREA_LIVING} />
      <Section title="🇰🇷 Korean Culture & Daily Life" items={KOREA_CULTURE} />
      <Section title="🔧 Other Tools" items={OTHER_TOOLS} />

      <div className="mt-4 text-center">
        <Link href="/" className="text-sm font-bold text-[var(--primary)] no-underline hover:text-[var(--primary-dark)]">
          🇰🇷 한국어 계산기 보기 →
        </Link>
      </div>

      <div className="mt-4 p-4 bg-[var(--bg)] rounded-xl text-sm text-[#4E5968] leading-relaxed">
        <h2 className="text-base font-extrabold text-[var(--ink)] mb-2">About These Tools</h2>
        <p className="mb-2">
          Built specifically for <b>foreign workers, expats, and English teachers</b> in Korea.
          All calculations use <b>2026 tax rates and social insurance premiums</b>.
        </p>
        <p>
          Whether you&apos;re deciding between flat and progressive tax, estimating your pension refund before leaving Korea,
          or trying to understand the unique jeonse rental system — we&apos;ve got you covered.
        </p>
      </div>
    </PageLayout>
  );
}
