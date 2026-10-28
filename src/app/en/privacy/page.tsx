import type { Metadata } from "next";
import { EN_OPEN_GRAPH } from "@/app/en/sharedMetadata";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

/**
 * 영문 개인정보처리방침.
 *
 * 한국어 /privacy 와 같은 내용을 영문으로 발행합니다. 번역본이 아니라
 * 영문 이용자에게 직접 고지하는 문서이므로, 내용이 바뀌면 양쪽을 함께
 * 고쳐야 합니다.
 *
 * AdSense 는 게시자에게 제3자 쿠키·Google 광고 게재 방식·옵트아웃 경로를
 * 고지하도록 요구합니다. 영문 페이지가 78개(사이트의 41%)인데 정책 문서가
 * 한국어뿐이면 그 고지가 영문 이용자에게 닿지 않습니다.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Moduncalc (moduncalc.com) handles your data: what is collected, local browser storage, cookies, Google Analytics and AdSense, and how to opt out.",
  alternates: { canonical: "https://moduncalc.com/en/privacy" },
  // /en 레이아웃의 noindex 를 덮어씁니다. 그 설정은 본문이 얇은 영문 계산기를
  // 겨냥한 것이고, 정책 문서는 분량과 고유성이 충분합니다.
  robots: { index: true, follow: true },
  openGraph: {
    ...EN_OPEN_GRAPH,
    title: "Privacy Policy - Moduncalc",
    description: "What Moduncalc collects, how cookies and ads work, and how to opt out.",
    url: "https://moduncalc.com/en/privacy",
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
      title="Privacy Policy"
      description="How Moduncalc handles your data."
    >
      <Card>
        <div className="text-sm text-[#4E5968] leading-[1.8]">
          <h2 className={h2First}>1. What we collect</h2>
          <p>
            Moduncalc (moduncalc.com, the &quot;Service&quot;) requires no account. Everything you type
            into a calculator — salary, age, amounts and so on — is <b>processed entirely in your
            browser</b> and is never sent to our servers.
          </p>
          <p className="mt-2">
            To operate and improve the Service, the following may be collected automatically:
          </p>
          <ul className={ul}>
            <li>Pages visited, time on page, referral source (Google Analytics)</li>
            <li>Device type, operating system, browser</li>
            <li>Approximate location derived from IP address (not personally identifying)</li>
          </ul>

          <h2 className={h2}>2. Local browser storage</h2>
          <p>
            For convenience, the Service may store the following in <b>your browser&apos;s
            localStorage</b>. This data never leaves your device.
          </p>
          <ul className={ul}>
            <li>
              <b>Your profile</b> — values you entered (age, salary, height, weight and similar) are
              saved under semantic keys so they can be pre-filled on your next visit, along with when
              they were saved and which calculator they came from.
            </li>
            <li>
              <b>Calculation history</b> — your last 50 results (calculator ID, inputs, headline
              result, timestamp).
            </li>
            <li>
              <b>Journey path</b> — the route you take between calculators, kept for the session
              only (sessionStorage).
            </li>
          </ul>
          <p className="mt-2">
            You can clear all of it at any time with your browser&apos;s &quot;clear site data&quot;
            function, or remove individual entries from the &quot;My info&quot; panel inside the
            Service. In private or incognito mode it is discarded when you close the browser.
          </p>

          <h2 className={h2}>3. Cookies</h2>
          <p>The Service uses cookies for the following purposes:</p>
          <ul className={ul}>
            <li>
              <b>Google Analytics</b> — visit statistics and service improvement (collected by Google
              LLC)
            </li>
            <li>
              <b>Google AdSense</b> — interest-based cookies for personalized advertising (collected
              by Google LLC)
            </li>
            <li>
              <b>Kakao AdFit</b> — advertising cookies for ads served to visitors in Korea (collected
              by Kakao Corp.)
            </li>
          </ul>
          <p className="mt-2">
            You can block or delete cookies in your browser settings. Refusing cookies does not
            affect your ability to use the calculators.
          </p>

          <h2 className={h2}>4. Third-party advertising</h2>
          <p>
            The Service may display advertising through <b>Google AdSense</b>. Google may show
            personalized ads based on your visits to this and other websites. Details are in{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className={a}>
              Google&apos;s advertising policies
            </a>
            .
          </p>
          <p className="mt-2">
            You can turn off personalized advertising at{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className={a}>
              Google Ads Settings
            </a>
            .
          </p>
          <p className="mt-2">
            Third-party vendors, including Google, <b>use cookies to serve ads based on your prior
            visits to this website or other websites</b>. How Google uses advertising cookies, and
            how to opt out, is explained in{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className={a}>
              How Google uses information from sites that use its services
            </a>
            .
          </p>
          <p className="mt-2">
            For ads served by vendors other than Google, you can opt out of personalized advertising
            in bulk at{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className={a}>
              aboutads.info
            </a>{" "}
            or{" "}
            <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className={a}>
              Your Online Choices
            </a>
            .
          </p>

          <h2 className={h2}>5. Visitors from the EEA, UK, Switzerland and California</h2>
          <p>
            Visitors from the European Economic Area, the United Kingdom and Switzerland may be shown
            a consent flow covering advertising and cookies, and may withdraw consent at any time.
            The Service follows Google&apos;s consent management requirements before serving
            personalized ads to visitors in these regions.
          </p>
          <p className="mt-2">
            California residents have the right to request disclosure, deletion, and to opt out of
            the sale of their personal information. <b>The Service does not sell personal
            information to third parties.</b>
          </p>

          <h2 className={h2}>6. Children&apos;s privacy</h2>
          <p>
            The Service is not directed at children under 14 and does not knowingly collect their
            personal information. If we learn that such information has been collected, it is deleted
            without delay. Ad settings are maintained so that personalized ads are not served to
            children.
          </p>

          <h2 className={h2}>7. Retention and deletion</h2>
          <p>
            The Service does not itself collect or retain personal information. Data gathered through
            Google Analytics and AdSense is subject to Google&apos;s own data retention policies.
          </p>

          <h2 className={h2}>8. Your choices</h2>
          <ul className={ul}>
            <li>Block cookies in your browser settings.</li>
            <li>Turn off personalized ads in Google Ads Settings.</li>
            <li>Clear site data in your browser to reset all local storage.</li>
            <li>Contact us using the address below with any privacy question.</li>
          </ul>

          <h2 className={h2}>9. Contact for privacy matters</h2>
          <p>
            Name: Taeyang Kim
            <br />
            Email: taeyang.kim4875@gmail.com
          </p>

          <h2 className={h2}>10. Changes to this policy</h2>
          <p>
            This policy may be revised to reflect changes in law or in the Service. Any change will be
            announced on this page.
          </p>

          <p className="text-xs text-[var(--sub)] mt-6">
            This is the English edition of our privacy policy. The Korean edition is available at{" "}
            <a href="/privacy" className={a}>
              /privacy
            </a>
            . Both describe the same practices.
          </p>
          <p className="text-xs text-[var(--sub)] mt-2">Last updated: 28 October 2026</p>
        </div>
      </Card>
    </PageLayout>
  );
}
