import type { Metadata } from "next";
import { EN_OPEN_GRAPH } from "@/app/en/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

/** 영문 문의. 한국어 /contact 와 같은 내용. */
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Report an error, suggest a calculator, or ask about a rate. Moduncalc is run by one person and replies usually come within 2-3 business days.",
  alternates: { canonical: "https://moduncalc.com/en/contact" },
  robots: { index: true, follow: true },
  openGraph: {
    ...EN_OPEN_GRAPH,
    title: "Contact Moduncalc",
    description: "How to report an error or suggest a calculator.",
    url: "https://moduncalc.com/en/contact",
  },
};

const h2 = "text-base font-extrabold mb-3";
const a = "text-[var(--primary)] underline";

export default function Page() {
  return (
    <PageLayout
      eyebrow="Contact"
      title="Get in touch"
      description="Errors, suggestions and questions all come to the same inbox."
    >
      <Card>
        <h2 className={h2}>📬 Before you write</h2>
        <div className="flex flex-col gap-2.5 text-sm text-[#4E5968] leading-relaxed">
          <p>
            Moduncalc is a personal project built and run by one person. Mail is read by the operator
            directly, and a reply usually takes <b>two to three business days</b>.
          </p>
          <div className="bg-[var(--bg)] rounded-xl p-3.5">
            <div className="text-xs font-bold text-[var(--sub)]">Email</div>
            <div className="text-base font-extrabold text-[var(--ink)] mt-0.5 break-all">
              taeyang.kim4875@gmail.com
            </div>
            <div className="text-xs text-[var(--sub)] mt-1.5">Taeyang Kim · Republic of Korea</div>
          </div>
          <p className="text-[13px]">
            Korean and English are both fine. If you write in another language, a reply may take
            longer.
          </p>
        </div>
      </Card>

      <Card>
        <h2 className={h2}>📝 What people write about</h2>
        <div className="flex flex-col gap-2.5 text-sm text-[#4E5968] leading-relaxed">
          <div>🐛 <b>Error reports</b> — a wrong result, or a page that renders badly</div>
          <div>💡 <b>Suggestions</b> — a calculator you want added, or an improvement</div>
          <div>📊 <b>Rate questions</b> — about a tax rate or contribution rate we apply</div>
          <div>🤝 <b>Partnerships</b> — business enquiries</div>
        </div>
      </Card>

      <Card>
        <h2 className={h2}>🔍 Reporting a wrong result</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          The first thing we do with an error report is try to reproduce it. Without knowing what you
          entered and what came out, that takes a long time. These four things usually let us find the
          cause the same day.
        </p>
        <div className="flex flex-col gap-2.5 text-sm text-[#4E5968] leading-relaxed">
          <div>
            <b>1. Which calculator</b> — pasting the page URL is the most precise.
          </div>
          <div>
            <b>2. What you entered</b> — the actual numbers, e.g. salary 40,000,000 won with 2
            dependents.
          </div>
          <div>
            <b>3. What you got and what you expected</b> — for example &quot;it showed 2.9m won net
            per month but my payslip says 2.95m&quot;.
          </div>
          <div>
            <b>4. Your device and browser</b> — iPhone Safari, Android Chrome and so on. This matters
            for layout problems.
          </div>
        </div>
      </Card>

      <Card>
        <h2 className={h2}>What we cannot help with</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          We cannot give individual tax, legal, financial or medical advice, and we cannot confirm
          what you personally owe or are entitled to. For that, contact the responsible authority or a
          qualified professional — the{" "}
          <a href="/en/disclaimer" className={a}>
            disclaimer
          </a>{" "}
          lists where to go for each case.
        </p>
        <p className="text-xs text-[var(--sub)] mt-3">
          A Korean edition of this page is at{" "}
          <a href="/contact" className={a}>
            /contact
          </a>
          .
        </p>
      </Card>
    </PageLayout>
  );
}
