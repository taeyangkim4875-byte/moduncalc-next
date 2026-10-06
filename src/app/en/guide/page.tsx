import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Card from '@/components/Card';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoList, SeoLink } from '@/components/SeoContent';

export const metadata: Metadata = {
  title: 'Living in Korea - Guides for Foreigners (Visa, Tax, Housing, Health)',
  description:
    'Practical guides for foreigners living in Korea: visas and ARC, income tax and year-end settlement, national pension refunds, health insurance, jeonse and wolse housing, banking, phones and transport. Updated for 2026.',
  alternates: { canonical: 'https://moduncalc.com/en/guide' },
  openGraph: {
    title: 'Living in Korea - Guides for Foreigners',
    description:
      '29 practical guides on visas, taxes, housing, healthcare and daily life in Korea, written for foreign residents and updated for 2026.',
    url: 'https://moduncalc.com/en/guide',
    locale: 'en_US',
  },
};

interface Guide {
  slug: string;
  title: string;
  desc: string;
}

const SECTIONS: { title: string; note: string; items: Guide[] }[] = [
  {
    title: '🛬 Arriving and settling in',
    note: 'The paperwork that has a deadline attached. Get these wrong and everything else stalls.',
    items: [
      { slug: 'first-90-days', title: 'First 90 Days in Korea', desc: 'A week-by-week checklist: ARC, bank account, phone, health insurance, and the order to do them in.' },
      { slug: 'arc-guide', title: 'Getting Your ARC', desc: 'Alien Registration Card: documents, the HiKorea booking system, fees, and what happens if you miss the 90-day deadline.' },
      { slug: 'visa-guide', title: 'Korea Visa Types for Workers', desc: 'E-7, E-9, D-8, F-2, F-5 and more: who qualifies, how long each lasts, and how to change status.' },
      { slug: 'banking-guide', title: 'Opening a Bank Account', desc: 'Which banks are foreigner-friendly, the documents you need, and the transfer limits that catch people out.' },
      { slug: 'phone-guide', title: 'Getting a Phone', desc: 'Carriers versus MVNOs, prepaid options before you have an ARC, and typical monthly costs.' },
    ],
  },
  {
    title: '💰 Money, tax and pension',
    note: 'Where foreigners most often overpay — or leave money behind when they go home.',
    items: [
      { slug: 'tax-guide', title: 'Korea Income Tax Guide', desc: 'Progressive rates versus the 19% flat tax for foreigners, and where the break-even actually sits.' },
      { slug: 'salary-guide', title: 'Understanding Your Payslip', desc: 'Every line on a Korean payslip explained, with the 2026 rates so you can check the arithmetic yourself.' },
      { slug: 'year-end-settlement', title: 'Year-End Tax Settlement', desc: '연말정산 explained: what you can deduct, what documents to gather, and the January-February timeline.' },
      { slug: 'pension-guide', title: 'National Pension for Foreigners', desc: 'Contribution rates, the income cap, social security treaties, and how the lump-sum refund works.' },
      { slug: 'pension-refund-countries', title: 'Pension Refund by Nationality', desc: 'The full country list: who can claim the lump sum, who cannot, and why your visa can override your passport.' },
      { slug: 'tax-refund-leaving', title: 'Tax Refund When Leaving Korea', desc: 'What you can claim on your way out, in what order, and the deadlines that make claims fail.' },
      { slug: 'severance-guide', title: 'Severance Pay (퇴직금)', desc: 'One year of service makes it mandatory. How it is calculated and how it is taxed.' },
      { slug: 'freelancer-tax', title: 'Freelancer Tax Guide', desc: '3.3% withholding, May filing, and why the foreigner flat tax usually does not apply to freelance income.' },
      { slug: 'remittance-guide', title: 'Sending Money Home', desc: 'Banks versus fintech services: fees, exchange-rate spreads, annual limits and the paperwork.' },
    ],
  },
  {
    title: '🏠 Housing and healthcare',
    note: 'The two areas where a misunderstanding costs the most money.',
    items: [
      { slug: 'housing-guide', title: 'Jeonse, Wolse and Everything Between', desc: 'How Korean deposits work, why jeonse exists, and how to protect a deposit worth years of savings.' },
      { slug: 'apartment-guide', title: 'Renting an Apartment', desc: 'Finding listings, agent fees, contract clauses to read twice, and move-in registration.' },
      { slug: 'health-insurance-guide', title: 'Korean Health Insurance (NHI)', desc: 'Mandatory enrolment, what it costs on your salary, and what it actually covers.' },
      { slug: 'healthcare-guide', title: 'Using the Healthcare System', desc: 'Clinics versus hospitals, when to go where, English-speaking options, and typical out-of-pocket costs.' },
      { slug: 'cost-of-living-guide', title: 'Cost of Living in Korea', desc: 'Realistic monthly budgets for Seoul and other cities, broken down by category.' },
    ],
  },
  {
    title: '🚇 Daily life',
    note: 'The things nobody tells you until you have already done them the hard way.',
    items: [
      { slug: 'transportation-guide', title: 'Subway, Bus, KTX and Taxi', desc: 'T-money, transfer discounts, intercity trains, and the apps that actually work in English.' },
      { slug: 'drivers-license', title: 'Getting a Driver’s License', desc: 'Converting a foreign license, which countries have agreements, and the tests you cannot skip.' },
      { slug: 'delivery-apps', title: 'Korean Delivery Apps', desc: 'Baemin, Coupang Eats and Yogiyo: signing up without a Korean ID, and minimum order rules.' },
      { slug: 'shopping-guide', title: 'Shopping in Korea', desc: 'Online marketplaces, overseas shipping, tax-free shopping and returns.' },
      { slug: 'korean-food-guide', title: 'Korean Food Guide', desc: 'Ordering without Korean, typical prices, dishes worth seeking out, and allergy vocabulary.' },
      { slug: 'learning-korean', title: 'Learning Korean', desc: 'Free government programs, apps that are worth the time, and a realistic study plan.' },
      { slug: 'korean-age-guide', title: 'The Korean Age System', desc: 'Why there were three ages, what the 2023 law changed, and where counting age still applies.' },
      { slug: 'nightlife-guide', title: 'Nightlife and 노래방', desc: 'How Korean bars, clubs and karaoke rooms work, including the etiquette and the bill.' },
      { slug: 'dating-culture', title: 'Dating in Korea', desc: 'Apps people actually use, dating norms, and anniversaries counted in days.' },
      { slug: 'working-rights', title: 'Foreign Worker Rights', desc: 'Minimum wage, working hours, overtime pay, and what to do about unpaid wages.' },
    ],
  },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="Living in Korea"
      title="Guides for Foreigners"
      description="Visas, taxes, housing, healthcare and daily life — written for people actually living here."
    >
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'English', href: '/en' }, { name: 'Guides', href: '/en/guide' }]} />
      <FaqJsonLd
        items={[
          { q: 'Do foreigners pay the same income tax as Koreans in 2026?', a: 'Yes, the same progressive rates from 6% to 45% apply. Foreign workers may instead elect a flat 19% rate (plus 1.9% local tax) under Article 18-2 of the Income Tax Act, but with no deductions at all. On a single-dependent basis the crossover sits at roughly 160 million KRW of annual salary.' },
          { q: 'Can I get my Korean pension contributions back when I leave?', a: 'It depends on your nationality. Citizens of countries with a social security agreement or reciprocity with Korea can claim a lump-sum refund of their own contributions plus interest. The employer half stays in the fund.' },
          { q: 'How much is health insurance in Korea for a foreign employee?', a: 'The 2026 rate is 7.19% of your monthly salary, split evenly with your employer, so your share is 3.595%. Long-term care insurance adds 13.14% of your health insurance share. On a 3 million KRW salary that is about 122,000 KRW a month.' },
          { q: 'What is the minimum wage in Korea in 2026?', a: '10,320 KRW per hour, which works out to 2,156,880 KRW a month on the standard 209-hour basis. It rises to 10,700 KRW on 1 January 2027. It applies equally to foreign and Korean workers.' },
        ]}
      />

      <SeoSection title="Written for people who already live here">
        <p>
          Most English-language information about Korea is aimed at tourists.
          These guides are not. They assume you have an address, a contract, a payslip
          and a set of deadlines, and they try to answer the questions that come up in that situation:
          how much of your salary disappears before it reaches you, whether you can get your pension back,
          what a jeonse deposit really commits you to, and which piece of paperwork has to happen first.
        </p>
        <p>
          Every figure is checked against the source that sets it — the National Tax Service,
          the National Pension Service, the National Health Insurance Service, the Ministry of Employment and Labor,
          and the Minimum Wage Commission. When a rate changes, the guide and the matching calculator
          are updated together so they never disagree with each other.
        </p>
      </SeoSection>

      {SECTIONS.map((section) => (
        <Card key={section.title}>
          <h2 className="text-base font-extrabold mb-1">{section.title}</h2>
          <p className="text-sm text-[var(--sub)] leading-relaxed mb-3">{section.note}</p>
          <div className="flex flex-col gap-2">
            {section.items.map((g) => (
              <Link
                key={g.slug}
                href={`/en/guide/${g.slug}`}
                className="block px-3.5 py-3 rounded-xl no-underline text-[var(--ink)] bg-[var(--bg)] hover:bg-[var(--primary-weak)] transition-all"
              >
                <span className="block text-sm font-bold">{g.title}</span>
                <span className="block text-xs text-[var(--sub)] mt-0.5 leading-relaxed">{g.desc}</span>
              </Link>
            ))}
          </div>
        </Card>
      ))}

      <SeoSection title="Where to start">
        <SeoList>
          <li>
            <strong>Just arrived?</strong> Read{' '}
            <SeoLink href="/en/guide/first-90-days">First 90 Days in Korea</SeoLink> first.
            The ARC has a 90-day deadline and almost everything else — bank account, phone contract,
            health insurance — depends on having it.
          </li>
          <li>
            <strong>Starting a job?</strong>{' '}
            <SeoLink href="/en/guide/salary-guide">Understanding Your Payslip</SeoLink> explains every deduction,
            and <SeoLink href="/en/guide/tax-guide">the tax guide</SeoLink> covers the flat-tax election you have to make each year.
          </li>
          <li>
            <strong>Looking for a place to live?</strong>{' '}
            <SeoLink href="/en/guide/housing-guide">Jeonse, Wolse and Everything Between</SeoLink> is the one to read
            before you hand over a deposit.
          </li>
          <li>
            <strong>Leaving Korea?</strong>{' '}
            <SeoLink href="/en/guide/tax-refund-leaving">Tax Refund When Leaving</SeoLink> and{' '}
            <SeoLink href="/en/guide/pension-guide">the pension guide</SeoLink> together cover most of what you can reclaim.
          </li>
        </SeoList>
        <p>
          There are also free calculators for most of these topics — salary, pension refund, health insurance,
          rent, cost of living and more. You can find them on the{' '}
          <SeoLink href="/en">English calculators page</SeoLink>.
        </p>
      </SeoSection>

      <SeoSection title="A note on accuracy">
        <p>
          These guides describe the rules as they generally apply, but immigration, tax and labour matters
          turn on individual circumstances — your visa type, your nationality, the wording of your contract,
          and how long you have been in Korea. Nothing here is legal, tax or immigration advice.
        </p>
        <p>
          For decisions that matter, confirm with the relevant office:
          Immigration (☎ 1345, multilingual), the National Tax Service (☎ 126),
          the Ministry of Employment and Labor (☎ 1350),
          or the National Pension Service (☎ 1355). If you find something out of date or wrong,
          please <SeoLink href="/contact">let us know</SeoLink> — corrections are made and dated.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
