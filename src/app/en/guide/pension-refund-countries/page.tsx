import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Card from '@/components/Card';
import { FaqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Korean Pension Refund by Nationality - Who Can Claim the Lump Sum',
  description:
    'Can you get your Korean National Pension back when you leave? It depends on your nationality and your visa. Full country list for 2026: agreement countries, reciprocity countries, minimum contribution periods, and the countries that have an agreement but still get nothing.',
  alternates: { canonical: 'https://moduncalc.com/en/guide/pension-refund-countries' },
  openGraph: {
    title: 'Korean Pension Refund by Nationality (2026)',
    description:
      'The full country-by-country list of who can claim the Korean National Pension lump-sum refund — and the seven agreement countries that cannot.',
    url: 'https://moduncalc.com/en/guide/pension-refund-countries',
    locale: 'en_US',
  },
};

const AGREEMENT = [
  'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'Croatia',
  'Czech Republic', 'France', 'Germany', 'Hungary', 'India', 'Luxembourg', 'Peru', 'Philippines',
  'Poland', 'Quebec', 'Romania', 'Slovakia', 'Slovenia', 'Switzerland', 'Türkiye', 'United States',
  'Uruguay',
];

const RECIPROCITY_NO_MIN = [
  'Bermuda', 'Cambodia', 'Colombia', 'El Salvador', 'Ghana', 'Hong Kong', 'Indonesia', 'Kazakhstan',
  'Kenya', 'Malaysia', 'Solomon Islands', 'Sri Lanka', 'Sudan', 'Trinidad and Tobago', 'Tunisia',
  'Uganda', 'Vanuatu',
];

const RECIPROCITY_1Y = [
  'Bhutan', 'Cameroon', 'Grenada', 'Jordan', 'Laos', 'Saint Vincent and the Grenadines',
  'Thailand', 'Zimbabwe',
];

const NO_REFUND_DESPITE_AGREEMENT = [
  'Denmark', 'Finland', 'Ireland', 'New Zealand', 'Norway', 'Spain', 'Sweden',
];

const EXEMPTION_ONLY = [
  'Chile', 'China', 'Iran', 'Italy', 'Japan', 'Mongolia', 'Netherlands', 'United Kingdom',
  'Uzbekistan',
];

function CountryList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((c) => (
        <span
          key={c}
          className="inline-block text-[12px] font-semibold px-2 py-1 rounded-lg bg-[var(--bg)] text-[#4E5968]"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

const faqItems = [
  {
    q: 'Can I get my Korean National Pension money back when I leave Korea?',
    a: 'Not automatically. Korean law gives foreign nationals no default right to the lump-sum refund (반환일시금). You can claim it in three situations: your country has a social security agreement with Korea that includes equal treatment, your country is recognised under the reciprocity rule because it pays an equivalent benefit to Korean nationals, or you hold an E-8, E-9 or H-2 visa, in which case your nationality does not matter at all.',
  },
  {
    q: 'My country has a social security agreement with Korea. Does that guarantee a refund?',
    a: 'No. Ireland, Denmark, Spain, Sweden, Finland, New Zealand and Norway all have totalization agreements with Korea, and their nationals still cannot claim the lump-sum refund. Their Korean contribution periods count toward a pension instead. Agreements that only cover contribution exemption, such as those with Japan, China, the United Kingdom and the Netherlands, also do not create a refund right. Switzerland is the one exception: it is an exemption-only agreement but the refund is still paid.',
  },
  {
    q: 'I am from Vietnam, Nepal, Bangladesh or Myanmar. Can I claim anything?',
    a: 'Usually yes, but through your visa rather than your nationality. Holders of E-8 (training employment), E-9 (non-professional employment) and H-2 (working visit) visas can claim the lump-sum refund regardless of which country they come from. Most workers from these countries are in Korea on exactly those visas, which is why the refund is routinely paid to them.',
  },
  {
    q: 'How much do I get back?',
    a: 'Your own employee contributions, which are 4.75% of your standard monthly income in 2026, plus accrued interest. The employer half is not refunded and stays in the fund. A withholding tax is deducted before payment. On a 3 million KRW monthly salary, three years of contributions comes to roughly 5.13 million KRW before interest and tax.',
  },
  {
    q: 'Is there a minimum contribution period?',
    a: 'For most countries there is no minimum. Belize requires at least 6 months. Bhutan, Cameroon, Grenada, Jordan, Laos, Saint Vincent and the Grenadines, Thailand and Zimbabwe require at least 1 year of contributions. Separately, if you contributed for 10 years or more you have a pension entitlement rather than a refund, and you may choose to draw a Korean pension from age 65 instead of taking the money out.',
  },
  {
    q: 'Can I claim after I have already left Korea?',
    a: 'Yes. You can apply from overseas and have the money sent to a foreign bank account, although applying before departure is usually faster. The claim must be made within the statutory period, so do not leave it indefinitely. Transfers to a Korean account are generally processed more quickly than international remittances.',
  },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="Living in Korea"
      title="Pension Refund by Nationality"
      description="Whether you get your Korean pension contributions back depends on your passport and your visa. Here is the full list."
    >
      <FaqJsonLd items={faqItems} />

      <Card>
        <h2 className="text-base font-extrabold mb-3">The short answer</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          If you have paid into the Korean National Pension and you are leaving the country, you may be able to take
          your contributions out as a <b>lump-sum refund</b> (반환일시금). But this is not a universal right.
          Korean law treats the refund as something foreign nationals receive only under specific conditions.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          You qualify if <b>any one</b> of the following is true:
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 bg-[var(--bg)] rounded-xl">
            <span className="text-sm font-extrabold text-[var(--primary)] whitespace-nowrap">1</span>
            <span className="text-sm text-[#4E5968] leading-relaxed">
              Your country has a <b>social security agreement</b> with Korea that includes equal treatment.
            </span>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[var(--bg)] rounded-xl">
            <span className="text-sm font-extrabold text-[var(--primary)] whitespace-nowrap">2</span>
            <span className="text-sm text-[#4E5968] leading-relaxed">
              Your country is recognised under the <b>reciprocity rule</b> — its own law pays an equivalent
              benefit to Korean nationals.
            </span>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[var(--bg)] rounded-xl">
            <span className="text-sm font-extrabold text-[var(--primary)] whitespace-nowrap">3</span>
            <span className="text-sm text-[#4E5968] leading-relaxed">
              You hold an <b>E-8, E-9 or H-2 visa</b>. In this case your nationality is irrelevant — the refund is
              payable regardless of where your passport is from.
            </span>
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          Route 3 is the one most often missed, and it covers a very large share of foreign workers in Korea.
          If you came on a non-professional employment or working visit visa, you are almost certainly eligible
          even if your country appears nowhere on the lists below.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">⚠️ The most common misunderstanding</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          A lot of English-language advice — including, until recently, an earlier version of our own pension guide —
          states the rule backwards. It says that people from countries <i>without</i> an agreement get the refund,
          and people from agreement countries do not.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          It is the other way round. <b>Americans, Canadians, Germans, Australians, Indians and Filipinos can claim
          the lump-sum refund.</b> It is the absence of an agreement or reciprocity finding that leaves you with
          nothing, unless your visa type carries you over the line. If you were told you had no claim, it is worth
          checking again — this money does not come to you automatically.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-1">✅ Social security agreement countries</h2>
        <p className="text-sm text-[var(--sub)] leading-relaxed mb-3">
          Nationals of these countries can claim the lump-sum refund. No minimum contribution period applies.
        </p>
        <CountryList items={AGREEMENT} />
        <p className="text-xs text-[var(--sub)] leading-relaxed mt-3">
          Quebec maintains its own agreement with Korea separately from the Canadian federal agreement.
          Switzerland appears here even though its agreement covers contribution exemption only — it is treated
          as an exception and the refund is paid.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-1">✅ Reciprocity countries</h2>
        <p className="text-sm text-[var(--sub)] leading-relaxed mb-3">
          These countries have no agreement with Korea, but their own law provides an equivalent benefit to Korean
          nationals, so Korea returns the favour. Some require a minimum contribution period.
        </p>

        <div className="text-xs font-extrabold text-[var(--primary)] mb-2">No minimum period</div>
        <CountryList items={RECIPROCITY_NO_MIN} />

        <div className="text-xs font-extrabold text-[var(--primary)] mt-4 mb-2">At least 6 months of contributions</div>
        <CountryList items={['Belize']} />

        <div className="text-xs font-extrabold text-[var(--primary)] mt-4 mb-2">At least 1 year of contributions</div>
        <CountryList items={RECIPROCITY_1Y} />
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-1">❌ Agreement, but no refund</h2>
        <p className="text-sm text-[var(--sub)] leading-relaxed mb-3">
          This is the group that catches people out. These countries all have totalization agreements with Korea,
          yet their nationals cannot take the money out as a lump sum.
        </p>
        <CountryList items={NO_REFUND_DESPITE_AGREEMENT} />
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          If you are from one of these countries, your Korean contribution periods are not lost. They can be added to
          your home country record under the totalization agreement, which may help you qualify for a pension there,
          and you may be able to draw a Korean pension later if you meet the 10-year minimum. Contact the NPS
          international team before you assume the money is gone.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-1">❌ Contribution-exemption agreements</h2>
        <p className="text-sm text-[var(--sub)] leading-relaxed mb-3">
          These agreements exist only to stop you paying into two pension systems at the same time. They do not
          create a refund right, and they do not combine your contribution periods.
        </p>
        <CountryList items={EXEMPTION_ONLY} />
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          Chinese nationals are a frequent exception in practice: many work in Korea on H-2 working visit visas,
          which makes them eligible through route 3 regardless of the agreement type. The same logic applies to
          anyone from this group holding an E-8, E-9 or H-2 visa.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">My country is not on any list</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Then your <b>visa type decides it</b>. Workers from Vietnam, Nepal, Bangladesh, Myanmar, Pakistan,
          Uzbekistan and many other countries are usually in Korea on E-9 or H-2 visas, and the refund is paid on
          that basis. Check what is printed on your residence card before concluding that you have no claim.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          If you are on a professional visa such as E-7, D-8 or an F-series visa and your country appears nowhere
          above, the refund is unlikely to be available. In that case ask the NPS whether your contributions can be
          preserved for a future pension instead.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">What you actually receive</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The refund is <b>your own contributions plus interest</b> — not the full 9.5% that went into the system.
          In 2026 the employee share is 4.75% of standard monthly income and the employer pays the other 4.75%,
          which is not returned to you.
        </p>
        <div className="bg-[var(--bg)] rounded-xl p-3.5 text-[13px] text-[var(--ink)] leading-relaxed mb-3">
          <div>Refund ≈ (monthly income × 4.75% × months contributed) + interest − withholding tax</div>
          <div className="mt-1 text-[var(--sub)]">
            Example: 3,000,000 KRW monthly income × 4.75% = 142,500 KRW per month.
            Over 36 months that is about 5,130,000 KRW before interest and tax.
          </div>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          There is a cap. Contributions are calculated on standard monthly income up to <b>6,590,000 KRW</b> for the
          period July 2026 to June 2027, so the maximum employee contribution is 313,025 KRW a month no matter how
          much you earn above that.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Run your own numbers in the{' '}
          <Link href="/en/pension-refund" className="text-[var(--primary)] font-bold hover:underline">
            Pension Refund Calculator
          </Link>
          , and see how the deduction appears on your payslip in the{' '}
          <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">
            Salary Calculator
          </Link>
          .
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">How to claim</h2>
        <div className="space-y-2 mb-3">
          {[
            ['Step 1', 'Confirm your eligibility route — agreement, reciprocity or visa type. Calling the NPS international team on 063-713-7101 takes a few minutes and settles it.'],
            ['Step 2', 'Prepare your documents: passport, residence card, a bank account in your name, and proof that you are leaving Korea permanently.'],
            ['Step 3', 'Apply at an NPS branch before departure, or from overseas afterwards. Applying before you leave is generally faster and avoids document-posting problems.'],
            ['Step 4', 'Receive payment. A transfer to a Korean account is usually quicker than an international remittance, so keep an account open if you can.'],
          ].map(([step, text]) => (
            <div key={step} className="flex items-start gap-3 p-2.5 bg-[var(--bg)] rounded-lg">
              <span className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">{step}</span>
              <span className="text-sm text-[#4E5968] leading-relaxed">{text}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          The pension is only one of several things you can reclaim on your way out. Our{' '}
          <Link href="/en/guide/leaving-korea-checklist" className="text-[var(--primary)] font-bold hover:underline">
            leaving Korea checklist
          </Link>{' '}
          covers the income tax settlement, your housing deposit and account closures in the order they need to happen.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Frequently asked questions</h2>
        <div className="flex flex-col gap-4">
          {faqItems.map((item) => (
            <div key={item.q}>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. {item.q}</div>
              <div className="text-sm text-[#4E5968] leading-relaxed">A. {item.a}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Sources and a caution</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The country lists above are taken from the National Pension Service, which publishes the recognised
          agreement and reciprocity countries and updates them as new agreements take effect. Agreements are signed
          and come into force regularly — Argentina&apos;s took effect in 2025 — so a country missing today may be
          added later.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          This page is general information, not legal or financial advice, and eligibility turns on your individual
          record. Before making any decision based on it, confirm your own position with the{' '}
          <b>NPS international team on 063-713-7101</b> or the NPS general line on <b>1355</b>. Our{' '}
          <Link href="/changelog" className="text-[var(--primary)] font-bold hover:underline">
            change log
          </Link>{' '}
          records when the figures on this site were last checked and what was corrected.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Found something out of date or wrong?{' '}
          <Link href="/contact" className="text-[var(--primary)] font-bold hover:underline">
            Tell us
          </Link>{' '}
          — corrections are made and dated.
        </p>
      </Card>
    </PageLayout>
  );
}
