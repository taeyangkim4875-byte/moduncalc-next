import type { Metadata } from "next";
import { EN_OPEN_GRAPH } from "@/app/en/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

/** 영문 소개. 한국어 /about 과 같은 내용. 페이지 수치가 바뀌면 양쪽을 함께 고칠 것. */
export const metadata: Metadata = {
  title: "About",
  description:
    "Moduncalc is a free calculator site for life in Korea, built and run by one person. Who makes it, where the rates come from, and how often they are updated.",
  alternates: { canonical: "https://moduncalc.com/en/about" },
  robots: { index: true, follow: true },
  openGraph: {
    ...EN_OPEN_GRAPH,
    title: "About Moduncalc",
    description: "Who builds Moduncalc, and where the tax and insurance rates come from.",
    url: "https://moduncalc.com/en/about",
  },
};

const h2 = "text-base font-extrabold mb-3";
const a = "text-[var(--primary)] underline";

export default function Page() {
  return (
    <PageLayout
      eyebrow="About"
      title="About Moduncalc"
      description="A free calculator site for life in Korea."
    >
      <Card>
        <h2 className={h2}>🧮 What Moduncalc is</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Moduncalc (moduncalc.com) brings together the calculations people in Korea actually need —
          salary, savings, loans, property, health and taxes — in one place, free and without an
          account. Figures reflect <b>2026 tax law, insurance rates and policy</b>.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          There are currently <b>82 Korean-language calculators</b> and <b>10 Korean guides</b>,
          plus <b>46 English calculators</b> and <b>30 English guides</b> for foreign residents —
          168 pages in total, with more added over time.
        </p>
      </Card>

      <Card>
        <h2 className={h2}>👤 Who makes it</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Moduncalc is a personal project designed, built and operated by <b>Taeyang Kim</b>. The aim
          is to make Korea&apos;s complicated tax, insurance and financial rules something anyone can
          understand and calculate for themselves.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          Rates are taken directly from official notices published by the National Tax Service, the
          National Pension Service, the National Health Insurance Service and the Ministry of
          Employment and Labor.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          They are updated as soon as tax law and rates change in January, and mid-year changes — such
          as the National Pension income ceiling each July — are applied right after the notice is
          published. To report an error, use the{" "}
          <a href="/en/contact" className={a}>
            contact page
          </a>
          .
        </p>
      </Card>

      <Card>
        <h2 className={h2}>✨ How it works</h2>
        <div className="flex flex-col gap-3 text-sm text-[#4E5968] leading-relaxed">
          <div>
            <div className="font-bold text-[var(--ink)]">📊 2026 rates applied</div>
            National Pension 9.5% (4.75% employee), Health Insurance 7.19% (3.595% employee),
            Long-term Care 13.14% of the health premium, Employment Insurance 0.9%, and the
            progressive income tax brackets.
          </div>
          <div>
            <div className="font-bold text-[var(--ink)]">🔒 No personal data collected</div>
            Every calculation runs in your browser. What you type is never sent to a server.
          </div>
          <div>
            <div className="font-bold text-[var(--ink)]">📱 Built for phones</div>
            Most visitors arrive on a phone, so that is what the layout is designed for.
          </div>
          <div>
            <div className="font-bold text-[var(--ink)]">🧾 Sources stated</div>
            Calculators whose rates are set by statute show the governing law, the responsible
            authority and the reference date at the bottom of the page.
          </div>
        </div>
      </Card>

      <Card>
        <h2 className={h2}>⚠️ Please read</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Every result is a reference estimate, not an official determination. Before you file a
          return, sign a contract or make a financial decision, check with the responsible authority
          or a qualified professional. The{" "}
          <a href="/en/disclaimer" className={a}>
            disclaimer
          </a>{" "}
          sets out what each calculator does and does not account for.
        </p>
      </Card>

      <Card>
        <h2 className={h2}>📬 Contact</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          Taeyang Kim · Republic of Korea
          <br />
          taeyang.kim4875@gmail.com
        </p>
        <p className="text-xs text-[var(--sub)] mt-3">
          A Korean edition of this page is at{" "}
          <a href="/about" className={a}>
            /about
          </a>
          .
        </p>
      </Card>
    </PageLayout>
  );
}
