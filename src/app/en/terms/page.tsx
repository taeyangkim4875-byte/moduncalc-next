import type { Metadata } from "next";
import { EN_OPEN_GRAPH } from "@/app/en/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

/** 영문 이용약관. 한국어 /terms 와 같은 내용. 한쪽을 고치면 다른 쪽도 고쳐야 합니다. */
export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Moduncalc (moduncalc.com): what the Service provides, disclaimers, permitted use, intellectual property, and governing law.",
  alternates: { canonical: "https://moduncalc.com/en/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    ...EN_OPEN_GRAPH,
    title: "Terms of Service - Moduncalc",
    description: "Conditions of use for Moduncalc's free calculators.",
    url: "https://moduncalc.com/en/terms",
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
      title="Terms of Service"
      description="Conditions of use for Moduncalc."
    >
      <Card>
        <div className="text-sm text-[#4E5968] leading-[1.8]">
          <h2 className={h2First}>1. Purpose</h2>
          <p>
            These terms set out the conditions and procedures for using Moduncalc (moduncalc.com, the
            &quot;Service&quot;), and the rights and obligations of users and the operator.
          </p>

          <h2 className={h2}>2. What the Service provides</h2>
          <p>
            The Service provides free calculators covering salary, savings, loans, real estate, health
            and taxes. <b>All results are reference estimates</b> based on published policies, rates
            and statistics, and carry no legal force.
          </p>

          <h2 className={h2}>3. Disclaimer</h2>
          <p>
            (1) All results and content reflect 2026 tax law and rates, but are provided for reference
            only and have no legal effect.
          </p>
          <p className="mt-2">
            (2) The operator accepts no legal liability for any decision you make on the basis of a
            result, or for its consequences. This includes but is not limited to:
          </p>
          <ul className={ul}>
            <li>Opening or closing financial products, taking out loans, investment decisions and any resulting gain or loss</li>
            <li>Whether to enter a property sale or lease, and on what terms</li>
            <li>Tax filing and payment, and any penalty or disadvantage arising from it</li>
            <li>Decisions about resignation, changing jobs, or salary negotiation</li>
          </ul>
          <p className="mt-2">
            (3) The operator does not warrant that results are accurate, complete or current. There
            may be a delay before amendments to law or official notices are reflected in the Service.
          </p>
          <p className="mt-2">
            (4) For an exact figure or a legal determination, consult the official materials of the
            relevant authority — the National Tax Service, your financial institution, the National
            Pension Service and so on — or a qualified professional such as a tax accountant, lawyer,
            labor attorney or physician. <b>The Service does not substitute for professional
            advice.</b>
          </p>
          <p className="mt-2">(5) The Service may be changed or discontinued without prior notice.</p>
          <p className="mt-2">
            (6) These disclaimers apply to the fullest extent permitted by applicable law. Further
            detail is in the{" "}
            <a href="/en/disclaimer" className={a}>
              Disclaimer
            </a>
            .
          </p>

          <h2 className={h2}>4. Personal data</h2>
          <p>
            The Service can be used without registration, and the values you enter are not stored on
            our servers. Handling of personal data is governed by the{" "}
            <a href="/en/privacy" className={a}>
              Privacy Policy
            </a>
            .
          </p>

          <h2 className={h2}>5. Advertising</h2>
          <p>
            The Service may display third-party advertising, including Google AdSense, to cover
            operating costs. Responsibility for the content of an advertisement rests with the
            advertiser.
          </p>

          <h2 className={h2}>6. Prohibited use</h2>
          <p>You must not:</p>
          <ul className={ul}>
            <li>Place excessive load on the Service through automated means such as crawlers, scrapers or bots</li>
            <li>Copy the Service&apos;s calculation logic, data or design without permission in order to offer an identical or similar service</li>
            <li>Interfere with normal operation of the Service or exploit security vulnerabilities</li>
            <li>Present or distribute a result from the Service to third parties as though it were an official determination</li>
            <li>Use the Service in violation of applicable law or to infringe the rights of others</li>
          </ul>
          <p className="mt-2">
            Where such conduct is identified, the operator may restrict access without prior notice.
          </p>

          <h2 className={h2}>7. Intellectual property and quotation</h2>
          <p>
            (1) Copyright in the Service&apos;s design, source code, calculation logic and written
            content belongs to the operator. Reproduction, redistribution and derivative works are
            not permitted without consent.
          </p>
          <p className="mt-2">
            (2) You may quote results and portions of the text in blogs, articles or teaching
            materials, provided you <b>attribute moduncalc.com and include a link</b> to the page.
          </p>
          <p className="mt-2">
            (3) You may publish a calculator on an external site using the Service&apos;s embed
            feature, but you must not modify the embed code or remove the attribution.
          </p>
          <p className="mt-2">
            (4) Rights in public data cited by the Service — statutes, official notices, statistics —
            remain with their respective rights holders and the responsible authorities.
          </p>

          <h2 className={h2}>8. Interruption of the Service</h2>
          <p>
            The operator may suspend all or part of the Service temporarily for maintenance,
            equipment failure, force majeure or other unavoidable cause. As the Service is provided
            free of charge, the operator bears no separate liability for loss arising from such
            interruption.
          </p>

          <h2 className={h2}>9. Changes to these terms</h2>
          <p>
            These terms may be revised to reflect changes in law or in the Service, and any change
            will be announced on this page. A revision takes effect on the day it is announced.
            Continuing to use the Service after a revision is taken as acceptance of it.
          </p>

          <h2 className={h2}>10. Governing law and disputes</h2>
          <p>
            These terms and any dispute concerning use of the Service are governed by the laws of the
            Republic of Korea. The operator and the user will seek to resolve any dispute in good
            faith; failing that, either may bring an action before the court having jurisdiction
            under the Korean Civil Procedure Act.
          </p>

          <h2 className={h2}>11. Contact</h2>
          <p>
            For questions about use of the Service, interpretation of these terms, copyright or
            partnerships: taeyang.kim4875@gmail.com
          </p>

          <p className="text-xs text-[var(--sub)] mt-6">
            This is the English edition of our terms. The Korean edition is available at{" "}
            <a href="/terms" className={a}>
              /terms
            </a>
            . In the event of any inconsistency, the Korean edition governs, as the Service is
            operated from the Republic of Korea.
          </p>
          <p className="text-xs text-[var(--sub)] mt-2">Last updated: 28 October 2026</p>
        </div>
      </Card>
    </PageLayout>
  );
}
