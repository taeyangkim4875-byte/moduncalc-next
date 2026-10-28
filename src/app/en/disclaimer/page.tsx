import type { Metadata } from "next";
import { EN_OPEN_GRAPH } from "@/app/en/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

/** 영문 면책조항. 한국어 /disclaimer 와 같은 내용. */
export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Moduncalc results are reference estimates, not official determinations. What our tax, financial, health and property calculators do and do not account for.",
  alternates: { canonical: "https://moduncalc.com/en/disclaimer" },
  robots: { index: true, follow: true },
  openGraph: {
    ...EN_OPEN_GRAPH,
    title: "Disclaimer - Moduncalc",
    description: "Why our results are estimates, and when to check with an authority or professional.",
    url: "https://moduncalc.com/en/disclaimer",
  },
};

const h2 = "text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5";
const h2First = "text-[17px] font-extrabold text-[var(--ink)] mt-0 mb-2.5";
const ul = "pl-5 my-2 list-disc";
const a = "text-[var(--primary)] underline";

export default function Page() {
  return (
    <PageLayout
      eyebrow="Legal"
      title="Disclaimer"
      description="What our results can and cannot tell you."
    >
      <Card>
        <div className="text-sm text-[#4E5968] leading-[1.8]">
          <h2 className={h2First}>1. Accuracy of results</h2>
          <p>
            Every result produced by Moduncalc (moduncalc.com, the &quot;Service&quot;) is a{" "}
            <b>reference estimate</b> based on published tax law, rates and statistics. It has no
            legal force. Your actual figure may differ according to your circumstances, the law that
            applies to you, and each institution&apos;s own criteria.
          </p>
          <p className="mt-2">
            Our calculators deliberately use simplified methods so they stay usable. Individual
            exemptions, relief conditions, asset-specific rates and deductible expenses may therefore
            not be reflected, and the result can differ from the real amount. Please also read the
            calculation assumptions noted on each calculator.
          </p>

          <h2 className={h2}>2. Tax and social insurance</h2>
          <p>
            Net salary, the four social insurances, income tax, acquisition tax, capital gains tax,
            gift tax and inheritance tax are all simplified estimates. For an exact assessment,
            contact the National Tax Service (☎ 126), your district tax office, or a certified tax
            accountant.
          </p>
          <ul className={ul}>
            <li>Rates and deduction items can change every year.</li>
            <li>Individual non-taxable items and special deductions may not be reflected.</li>
            <li>2026 rates are applied; amendments may not be reflected immediately.</li>
            <li>Some calculators, such as capital gains tax, apply a simplified rate without distinguishing asset type or holding structure, so the difference from the real figure can be large.</li>
            <li><b>Final responsibility for tax filing and payment rests with the taxpayer, and our results cannot be used as the basis for a filing.</b></li>
          </ul>

          <h2 className={h2}>3. Financial products</h2>
          <p>
            Results for youth savings accounts, deposit and savings interest, loan interest and
            compound returns are estimates based on typical conditions.
          </p>
          <ul className={ul}>
            <li>Actual interest rates, preferential conditions and government contributions depend on your bank and your own circumstances.</li>
            <li>Past performance of an investment product does not guarantee future returns.</li>
            <li>Always read the product disclosure from the financial institution before signing up.</li>
          </ul>

          <h2 className={h2}>4. Health calculators</h2>
          <p>
            BMI, body fat, basal metabolic rate, calories and sleep timing are reference figures from
            general formulas. <b>They are not a diagnosis and do not replace medical advice.</b>
          </p>
          <ul className={ul}>
            <li>For any judgment about your health, consult a physician or other qualified medical professional.</li>
            <li>The blood alcohol estimate is approximate and individual variation is large. After drinking, use a designated driver or public transport.</li>
          </ul>

          <h2 className={h2}>5. Property calculators</h2>
          <p>
            Acquisition tax, capital gains tax, agent commission, jeonse-to-wolse conversion, rental
            yield and registration costs are estimates based on general rates.
          </p>
          <ul className={ul}>
            <li>Multi-home surcharges, regulated-area status and relief eligibility all depend on your situation.</li>
            <li>Confirm the exact amount with your district tax office or a tax accountant.</li>
          </ul>

          <h2 className={h2}>6. Limitation of liability</h2>
          <p>
            The operator is not liable for direct or indirect loss arising from a decision you made
            in reliance on a result or on guide content. The Service exists to provide information and
            does not replace professional advice.
          </p>
          <p className="mt-2">
            Specifically, the operator gives no warranty, express or implied, and accepts no legal
            liability, in respect of:
          </p>
          <ul className={ul}>
            <li>Financial products opened or closed, loans taken, or investments made on the basis of a result, and any gain or loss</li>
            <li>Whether a property sale or lease was entered into on the basis of a result, and on what terms</li>
            <li>Tax filing or payment made on the basis of a result, and any penalty or under-reporting consequence</li>
            <li>Decisions about resignation, changing jobs or salary negotiation made on the basis of a result</li>
            <li>Loss arising because published information ceased to be current after an amendment to law, rates or official notices</li>
            <li>Loss arising from third-party advertising or external links</li>
          </ul>
          <p className="mt-2">
            This clause applies to the fullest extent permitted by applicable law.
          </p>

          <h2 className={h2}>7. Reference date and updates</h2>
          <p>
            Rates, contribution levels and deduction limits published on the Service are stated as in
            force for 2026. Statutes and official notices are amended from time to time, and there may
            be a delay before an amendment is reflected here.
          </p>
          <ul className={ul}>
            <li>Some rates change mid-year — for example the National Pension income ceiling changes each July.</li>
            <li>Where next year&apos;s figure has already been confirmed and published, it is noted alongside.</li>
            <li>If you are unsure whether something has changed, check the latest notice from the responsible authority directly.</li>
          </ul>

          <h2 className={h2}>8. Third-party services</h2>
          <p>
            The Service includes Google AdSense advertising and Google Analytics. Responsibility for
            those services&apos; own terms and data handling rests with their providers.
          </p>

          <h2 className={h2}>9. Sources</h2>
          <p>Our calculation bases come from the following official sources:</p>
          <ul className={ul}>
            <li>Income Tax Act art. 55 (progressive income tax rates)</li>
            <li>National Pension Service notice (2026 contribution rate 9.5%)</li>
            <li>National Health Insurance Service notice (2026 contribution rate 7.19%)</li>
            <li>Employment Insurance Act (employee share 0.9%)</li>
            <li>Restriction of Special Taxation Act art. 18-2 (19% flat tax for foreign workers)</li>
            <li>Financial Services Commission, Korea Federation of Banks (financial product bases)</li>
            <li>Ministry of Land, Infrastructure and Transport (property agent commission rates)</li>
            <li>Labor Standards Act and Employee Retirement Benefit Security Act (annual leave, severance)</li>
            <li>Minimum Wage Commission notice (annual minimum wage)</li>
          </ul>

          <h2 className={h2}>10. Your obligation to verify</h2>
          <p>
            By using the Service you are taken to have accepted this disclaimer. In the following
            situations in particular, do not rely on a result as it stands — obtain official
            confirmation from the responsible authority or a professional in the field.
          </p>
          <ul className={ul}>
            <li>Before a high-value property transaction → district tax office, licensed real estate agent, tax accountant</li>
            <li>When a tax filing or payment is required → National Tax Service Hometax (☎ 126), tax accountant</li>
            <li>When a loan limit or rate must be confirmed → the financial institution concerned</li>
            <li>Where severance or unpaid wages may be disputed → Ministry of Employment and Labor (☎ 1350), certified labor attorney</li>
            <li>If you suspect a health problem → a physician or other qualified medical professional</li>
          </ul>

          <h2 className={h2}>11. Contact</h2>
          <p>Questions about this disclaimer: taeyang.kim4875@gmail.com</p>

          <p className="text-xs text-[var(--sub)] mt-6">
            This is the English edition. The Korean edition is at{" "}
            <a href="/disclaimer" className={a}>
              /disclaimer
            </a>
            .
          </p>
          <p className="text-xs text-[var(--sub)] mt-2">Last updated: 28 October 2026</p>
        </div>
      </Card>
    </PageLayout>
  );
}
