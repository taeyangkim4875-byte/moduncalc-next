import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Card from '@/components/Card';
import { FaqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Leaving Korea Checklist - The 90-Day Timeline and What You Get Back',
  description:
    'Everything you must reclaim before leaving Korea, in the order it has to happen: housing deposit, severance, pension refund, tax settlement, health insurance, phone and bank account. Includes the deposit mistake that costs foreigners the most money.',
  alternates: { canonical: 'https://moduncalc.com/en/guide/leaving-korea-checklist' },
  openGraph: {
    title: 'Leaving Korea Checklist - The 90-Day Timeline',
    description:
      'The order matters more than the list. A dependency-ordered plan for your final 90 days in Korea, and the money you leave behind if you get it wrong.',
    url: 'https://moduncalc.com/en/guide/leaving-korea-checklist',
    locale: 'en_US',
  },
};

const faqItems = [
  {
    q: 'What is the single most expensive mistake when leaving Korea?',
    a: 'Moving out and cancelling your registered address before your housing deposit has been returned. Under the Housing Lease Protection Act your priority claim on the deposit depends on occupying the property and holding a registered address there. Give both up and your claim ranks behind other creditors — and your deposit is usually the largest sum involved. If the landlord has not paid by your move-out date, file for a lease registration order (임차권등기명령) and confirm it appears on the property register before you hand back the keys.',
  },
  {
    q: 'How much notice do I have to give my landlord?',
    a: 'If your contract is running to its end date, give notice between 6 months and 2 months before expiry. Miss that window and the contract renews automatically on the same terms. If you are already on an automatically renewed contract, you can give notice at any time, but it only takes effect 3 months after the landlord receives it. That 3-month lag catches people who book a flight first and tell the landlord afterwards.',
  },
  {
    q: 'Can I claim unemployment benefit when I leave Korea?',
    a: 'Generally no. Employment insurance benefit (실업급여) requires that you are able to work and actively seeking work in Korea. Leaving the country permanently ends that, so the benefit is not available even though you paid the 0.9% contribution. This is different from the National Pension, which can be refunded as a lump sum depending on your nationality and visa.',
  },
  {
    q: 'Should I close my Korean bank account before I fly?',
    a: 'No — close it last. The pension refund, the final tax settlement and often the deposit all arrive after your last working day, and a transfer to a Korean account is faster and cheaper than an international remittance. Keep one account open, make sure its registered contact details still reach you, and close it only once every payment has landed.',
  },
  {
    q: 'Do I need to cancel my health insurance, or does it stop automatically?',
    a: 'Workplace coverage ends when your employer reports your departure, but if there is a gap before you fly you may be switched to regional coverage and billed for it. Settle the final premium before leaving. A health insurance settlement is often a bill rather than a refund, so budget for it rather than expecting money back.',
  },
  {
    q: 'Can I claim my pension refund after I have already left Korea?',
    a: 'Yes. You can apply from overseas and have it sent to a foreign account, though processing is slower. Whether you can claim at all depends on your nationality and visa type — agreement countries, reciprocity countries, and E-8/E-9/H-2 visa holders qualify. Check the full country list before you assume either way.',
  },
];

interface Task {
  text: string;
  warn?: boolean;
}

interface Phase {
  when: string;
  title: string;
  note: string;
  tasks: Task[];
}

const PHASES: Phase[] = [
  {
    when: 'D-90 → D-60',
    title: 'Start the clocks you do not control',
    note: 'Two deadlines here are set by law and by your landlord, not by you. Everything else can wait; these cannot.',
    tasks: [
      {
        text: 'Give your landlord written notice. Contract ending on its date: notice must land between 6 and 2 months before expiry. Already auto-renewed: notice takes effect only 3 months after it is received.',
        warn: true,
      },
      { text: 'Give your employer notice per your contract, and confirm in writing when your last working day is. Severance is calculated from that date.' },
      { text: 'Check whether you have 1 continuous year of service. If you are close, a few days can be the difference between full severance and nothing.' },
      { text: 'Check whether your nationality or visa allows a National Pension lump-sum refund, so you know what to expect.' },
      { text: 'If you have a car, start the sale or transfer now — deregistration and insurance cancellation take longer than people expect.' },
    ],
  },
  {
    when: 'D-60 → D-30',
    title: 'Line up the money',
    note: 'Most of what you are owed is calculated now even if it is paid later.',
    tasks: [
      { text: 'Confirm with HR that they will run an early year-end settlement (중도정산) with your final payroll. Leaving mid-year usually means a refund, because the withholding assumed a full year of income.' },
      { text: 'Gather deduction receipts for that settlement — rent, medical, education, donations, credit card spending for the months you worked.' },
      { text: 'Ask HR in writing when severance will be paid. It is legally due within 14 days of your last working day.' },
      { text: 'If you have a DC or DB retirement pension or an IRP, ask how the balance is released — it does not always follow the same route as ordinary severance.' },
      { text: 'Confirm the exact date and bank account for your deposit return with the landlord, in a written message you can keep.' },
      { text: 'Check your phone contract for a device instalment balance and any early termination fee. This is usually a bill, not a refund.' },
    ],
  },
  {
    when: 'D-30 → D-7',
    title: 'Settle and verify',
    note: 'This is where things either close cleanly or start going wrong.',
    tasks: [
      {
        text: 'Do not hand back the keys or cancel your registered address until the deposit is in your account. If the landlord has not paid, file a lease registration order (임차권등기명령) and confirm it appears on the property register first.',
        warn: true,
      },
      { text: 'Settle final utilities and building management fees — electricity, gas, water, internet. Ask for a final meter reading on your move-out date.' },
      { text: 'Settle your health insurance. Expect a final premium rather than a refund.' },
      { text: 'Terminate your phone contract and pay off any device balance. Keep a working number as long as you can, because banks and the NPS may need to reach you.' },
      { text: 'Cancel any recurring payments tied to your Korean card — subscriptions, gym, insurance.' },
      { text: 'Make sure your bank account contact details still work after you leave, and raise transfer limits if you plan to remit a large amount.' },
    ],
  },
  {
    when: 'D-7 → departure',
    title: 'Final week',
    note: 'Sequence matters here. Cancelling your residence card too early can strand other claims.',
    tasks: [
      { text: 'Confirm severance and the final payroll have actually landed. Chase them before you lose easy access to HR.' },
      { text: 'Apply for the National Pension lump-sum refund if you qualify. Applying before departure is faster than claiming from abroad.' },
      { text: 'Report your departure and handle your residence card at immigration as required for your status.' },
      { text: 'Claim VAT back on eligible purchases at the airport if you have the receipts.' },
      { text: 'Keep digital copies of everything: lease, final payslips, severance statement, pension application, tax settlement, utility closures.' },
      { text: 'Leave one Korean bank account open. Close it only after the last payment arrives.' },
    ],
  },
  {
    when: 'After you leave',
    title: 'What still comes in',
    note: 'Several payments arrive weeks or months later. They only reach you if you kept the channels open.',
    tasks: [
      { text: 'National Pension refund, if you applied from overseas. Allow several weeks and expect withholding tax to be deducted.' },
      { text: 'Any remaining income tax refund from the final settlement.' },
      { text: 'Housing deposit, if it was delayed and you protected your claim with a lease registration order.' },
      { text: 'Remit the balance of your Korean account home and then close it. Compare bank and fintech rates — the spread is usually larger than the stated fee.' },
    ],
  },
];

export default function Page() {
  return (
    <PageLayout
      eyebrow="Living in Korea"
      title="Leaving Korea Checklist"
      description="The order matters more than the list. A 90-day plan for getting your money out."
    >
      <FaqJsonLd items={faqItems} />

      <Card>
        <h2 className="text-base font-extrabold mb-3">Why the order matters more than the list</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Most &ldquo;leaving Korea&rdquo; checklists are a flat list of things to cancel. The problem is that these
          tasks <b>depend on each other</b>, and doing them in the wrong order is what costs people money.
          Three dependencies do almost all the damage:
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed list-disc pl-5 space-y-1.5 mb-3">
          <li><b>Notice periods start before you are ready.</b> If your lease has auto-renewed, your notice only takes effect 3 months after the landlord receives it. Book the flight first and you can end up paying rent on an empty flat.</li>
          <li><b>Your deposit claim dies when you move out.</b> Give up occupancy and your registered address before the money is back and you lose your priority. This is usually the largest sum you are owed.</li>
          <li><b>Your bank account is the destination for everything.</b> Close it early and the pension refund, the tax settlement and a late deposit have nowhere to land.</li>
        </ul>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          The timeline below is ordered so that nothing is cancelled before the thing that depends on it has cleared.
          For the tax detail behind the refunds, see{' '}
          <Link href="/en/guide/tax-refund-leaving" className="text-[var(--primary)] font-bold hover:underline">
            Tax Refund When Leaving Korea
          </Link>
          .
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">⚠️ The deposit mistake</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Under the Housing Lease Protection Act, your right to be paid ahead of the landlord&rsquo;s other creditors
          rests on two things: <b>occupying the property</b> and <b>holding a registered address there</b>.
          For foreign residents the address registration on your residence card serves this purpose.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Move out and deregister while the deposit is still unpaid, and both pillars disappear. If the landlord then
          runs into trouble — a mortgage default, another creditor, a sale — you are no longer first in line for your
          own money. People do this constantly because the flight is booked and the landlord says
          &ldquo;I will send it next week.&rdquo;
        </p>
        <div className="bg-[var(--bg)] rounded-xl p-3.5 mb-3">
          <div className="text-sm font-bold text-[var(--ink)] mb-1.5">If the deposit is not back by move-out day</div>
          <p className="text-[13px] text-[#4E5968] leading-relaxed m-0">
            Apply to the court for a <b>lease registration order (임차권등기명령)</b>. Once it is entered on the
            property register, your occupancy and address rights are preserved even after you move out and leave the
            country. The timing is strict: courts have held that the protection runs <b>from when the registration is
            actually completed</b>, not from when you filed. Check the property register (등기부등본) and confirm the
            entry is there <b>before</b> you hand over the keys.
          </p>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          If you have jeonse deposit insurance through HUG or SGI, notify them as soon as the deposit is late —
          claim procedures have their own deadlines. Background on how Korean deposits work is in the{' '}
          <Link href="/en/guide/housing-guide" className="text-[var(--primary)] font-bold hover:underline">
            housing guide
          </Link>
          .
        </p>
      </Card>

      {PHASES.map((phase) => (
        <Card key={phase.when}>
          <div className="text-xs font-extrabold text-[var(--primary)] mb-1">{phase.when}</div>
          <h2 className="text-base font-extrabold mb-1">{phase.title}</h2>
          <p className="text-sm text-[var(--sub)] leading-relaxed mb-3">{phase.note}</p>
          <div className="flex flex-col gap-2">
            {phase.tasks.map((t) => (
              <div
                key={t.text}
                className="flex items-start gap-2.5 p-3 rounded-xl"
                style={t.warn ? { background: '#FFF4E5' } : { background: 'var(--bg)' }}
              >
                <span className="text-sm flex-none mt-0.5">{t.warn ? '⚠️' : '☐'}</span>
                <span className="text-[13px] text-[#4E5968] leading-relaxed">{t.text}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Card>
        <h2 className="text-base font-extrabold mb-1">What you get back — and what you still owe</h2>
        <p className="text-sm text-[var(--sub)] leading-relaxed mb-3">
          Not everything on the way out is money coming in. Three of these are usually bills.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">Item</th>
                <th className="text-left p-2 font-bold">In or out</th>
                <th className="text-left p-2 font-bold">When</th>
              </tr>
            </thead>
            <tbody className="text-[#4E5968]">
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-semibold">Housing deposit</td>
                <td className="p-2 text-[#00A05E] font-bold">In — usually the largest</td>
                <td className="p-2">Move-out day</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-semibold">Severance pay (퇴직금)</td>
                <td className="p-2 text-[#00A05E] font-bold">In, if 1+ year of service</td>
                <td className="p-2">Within 14 days of last working day</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-semibold">Pension lump sum (반환일시금)</td>
                <td className="p-2 text-[#00A05E] font-bold">In, if eligible</td>
                <td className="p-2">Weeks after applying</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-semibold">Early year-end settlement</td>
                <td className="p-2 text-[#00A05E] font-bold">Usually in</td>
                <td className="p-2">With final payroll</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-semibold">Airport VAT refund</td>
                <td className="p-2 text-[#00A05E] font-bold">In, small</td>
                <td className="p-2">At departure</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-semibold">Health insurance settlement</td>
                <td className="p-2 text-[#E5484D] font-bold">Often out</td>
                <td className="p-2">Before departure</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-semibold">Phone device balance</td>
                <td className="p-2 text-[#E5484D] font-bold">Out</td>
                <td className="p-2">On termination</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-semibold">Final utilities and management fees</td>
                <td className="p-2 text-[#E5484D] font-bold">Out</td>
                <td className="p-2">Move-out day</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-semibold">Unemployment benefit (실업급여)</td>
                <td className="p-2 text-[var(--sub)] font-bold">Neither — not claimable</td>
                <td className="p-2">—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#4E5968] leading-relaxed mt-3">
          Employment insurance is the one people expect and do not get. You paid 0.9% of your salary into it, but the
          benefit requires that you are able and available to work <b>in Korea</b>. Leaving permanently ends the claim.
          The National Pension is the opposite case — that one can come back to you.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Work out the numbers before you negotiate</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Knowing roughly what each item should be makes it much easier to spot an error in a final payslip or a
          severance statement. Two minutes with a calculator has saved people a lot more than that.
        </p>
        <ul className="text-sm text-[#4E5968] leading-relaxed list-disc pl-5 space-y-1.5">
          <li>
            <Link href="/en/severance" className="text-[var(--primary)] font-bold hover:underline">Severance Calculator</Link>
            {' '}— roughly one month of average pay per year of service, based on your last 3 months of earnings.
          </li>
          <li>
            <Link href="/en/pension-refund" className="text-[var(--primary)] font-bold hover:underline">Pension Refund Calculator</Link>
            {' '}— your own 4.75% contributions plus interest, capped at a standard monthly income of 6,590,000 KRW.
          </li>
          <li>
            <Link href="/en/salary" className="text-[var(--primary)] font-bold hover:underline">Salary Calculator</Link>
            {' '}— check the deductions on your final payslip against the 2026 rates.
          </li>
          <li>
            <Link href="/en/rent" className="text-[var(--primary)] font-bold hover:underline">Jeonse vs Wolse Calculator</Link>
            {' '}— confirm what deposit figure your contract actually entitles you to.
          </li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Related guides</h2>
        <ul className="text-sm text-[#4E5968] leading-relaxed list-disc pl-5 space-y-1.5">
          <li>
            <Link href="/en/guide/pension-refund-countries" className="text-[var(--primary)] font-bold hover:underline">Pension Refund by Nationality</Link>
            {' '}— whether you can claim at all, country by country.
          </li>
          <li>
            <Link href="/en/guide/tax-refund-leaving" className="text-[var(--primary)] font-bold hover:underline">Tax Refund When Leaving Korea</Link>
            {' '}— the income tax side in detail.
          </li>
          <li>
            <Link href="/en/guide/severance-guide" className="text-[var(--primary)] font-bold hover:underline">Severance Pay</Link>
            {' '}— eligibility, calculation and what to do if it is not paid.
          </li>
          <li>
            <Link href="/en/guide/remittance-guide" className="text-[var(--primary)] font-bold hover:underline">Sending Money Home</Link>
            {' '}— moving the final balance out without losing it to spreads.
          </li>
          <li>
            <Link href="/en/guide/housing-guide" className="text-[var(--primary)] font-bold hover:underline">Jeonse, Wolse and Everything Between</Link>
            {' '}— how deposits work and what protects them.
          </li>
        </ul>
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
        <h2 className="text-base font-extrabold mb-3">A caution</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Deadlines, notice periods and eligibility all turn on the wording of your own contract and your residence
          status. This page is general information, not legal advice. Where real money is at stake — a disputed
          deposit above all — get advice before you act.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Useful numbers: National Pension Service <b>1355</b> (international team <b>063-713-7101</b>),
          National Tax Service <b>126</b>, Ministry of Employment and Labor <b>1350</b>,
          Immigration <b>1345</b> (multilingual). For housing disputes, local legal aid and the
          Korea Legal Aid Corporation handle lease cases. Found an error on this page?{' '}
          <Link href="/contact" className="text-[var(--primary)] font-bold hover:underline">Tell us</Link> — corrections
          are made and dated in our{' '}
          <Link href="/changelog" className="text-[var(--primary)] font-bold hover:underline">change log</Link>.
        </p>
      </Card>
    </PageLayout>
  );
}
