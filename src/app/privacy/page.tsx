import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "개인정보처리방침 - 모든 계산기",
  description: "모든 계산기(moduncalc.com)의 개인정보 수집·이용·보호에 관한 안내입니다.",
  alternates: { canonical: "https://moduncalc.com/privacy" },
  openGraph: {
    title: "개인정보처리방침 - 모든 계산기",
    description: "모든 계산기(moduncalc.com)의 개인정보 수집·이용·보호에 관한 안내입니다.",
    url: "https://moduncalc.com/privacy",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="법적 고지" title="개인정보처리방침" description="모든 계산기의 개인정보 처리에 관한 안내입니다.">
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "개인정보처리방침", href: "/privacy" }]} />
      <Card>
        <div className="text-sm text-[#4E5968] leading-[1.8]">
          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-0 mb-2.5">1. 개인정보의 수집 및 이용</h2>
          <p>모든 계산기(moduncalc.com, 이하 &quot;서비스&quot;)는 별도의 회원가입 없이 이용할 수 있으며, 사용자가 계산기에 입력하는 데이터(연봉, 나이, 금액 등)는 <b>사용자의 브라우저에서만 처리</b>되고 서버로 전송되지 않습니다.</p>
          <p className="mt-2">다만, 서비스 운영 및 개선을 위해 아래 정보가 자동으로 수집될 수 있습니다:</p>
          <ul className="pl-5 my-2 list-disc">
            <li>방문 페이지, 체류 시간, 유입 경로 (Google Analytics)</li>
            <li>기기 유형, 운영체제, 브라우저 종류</li>
            <li>대략적인 지역 정보 (IP 기반, 개인 식별 불가)</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">2. 로컬 저장 (브라우저 저장소)</h2>
          <p>서비스는 사용 편의를 위해 아래 데이터를 <b>사용자의 브라우저(localStorage)</b>에 저장할 수 있습니다. 이 데이터는 서버로 전송되지 않으며, 사용자의 기기에서만 처리됩니다.</p>
          <ul className="pl-5 my-2 list-disc">
            <li><b>내 프로필 정보</b> — 나이, 연봉, 키, 체중 등 계산기에 입력한 값을 시맨틱 키 기준으로 저장하여 다음 방문 시 자동 채움에 활용합니다. 저장 시점, 출처 계산기 정보가 함께 기록됩니다.</li>
            <li><b>계산 기록</b> — 최근 50건의 계산 결과(계산기 ID, 입력값, 대표 결과, 시간)를 저장합니다.</li>
            <li><b>여정 경로</b> — 계산기 간 이동 경로를 세션 단위로 저장합니다(sessionStorage).</li>
          </ul>
          <p className="mt-2">저장된 데이터는 브라우저의 &quot;사이트 데이터 삭제&quot; 기능으로 언제든 삭제할 수 있으며, 계산기 내 &quot;내 정보&quot; 패널에서 개별 항목을 삭제하거나 전체 초기화할 수 있습니다. 시크릿/프라이빗 모드에서는 브라우저를 닫으면 자동으로 삭제됩니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">3. 쿠키(Cookie) 사용</h2>
          <p>서비스는 아래 목적으로 쿠키를 사용합니다:</p>
          <ul className="pl-5 my-2 list-disc">
            <li><b>Google Analytics</b> — 방문 통계 수집 및 서비스 개선 (수집 주체: Google LLC)</li>
            <li><b>Google AdSense</b> — 맞춤형 광고 제공을 위한 관심사 기반 쿠키 (수집 주체: Google LLC)</li>
          </ul>
          <p className="mt-2">쿠키는 브라우저 설정에서 거부하거나 삭제할 수 있습니다. 쿠키를 거부해도 계산기 이용에는 영향이 없습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">4. 제3자 광고 서비스</h2>
          <p>서비스는 <b>Google AdSense</b>를 통해 광고를 게재할 수 있습니다. Google은 사용자의 웹사이트 방문 기록을 기반으로 맞춤형 광고를 표시할 수 있으며, 이에 대한 자세한 내용은 <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">Google 광고 정책</a>에서 확인하실 수 있습니다.</p>
          <p className="mt-2">사용자는 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">Google 광고 설정</a>에서 맞춤형 광고를 비활성화할 수 있습니다.</p>

          <p className="mt-2">Google을 포함한 제3자 광고 사업자는 <b>쿠키를 사용하여 사용자가 이 사이트나 다른 사이트를 방문한 기록</b>을 바탕으로 광고를 게재합니다. Google이 광고 쿠키(DART 쿠키 등)를 사용하는 방식과 이를 거부하는 방법은 <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">Google의 파트너 사이트 정보 수집 안내</a>에서 확인할 수 있습니다.</p>
          <p className="mt-2">Google 외의 제3자 광고 사업자가 게재하는 광고에 대해서는 <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">aboutads.info</a> 또는 <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">Your Online Choices</a>에서 맞춤 광고를 일괄 거부할 수 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">5. 유럽(EEA)·영국·스위스 및 미국 캘리포니아 이용자</h2>
          <p>유럽경제지역(EEA), 영국, 스위스에서 접속하는 이용자에게는 광고 및 쿠키 사용에 관한 동의 절차가 표시될 수 있으며, 이용자는 언제든 동의를 철회할 수 있습니다. 서비스는 이 지역 이용자에게 개인 맞춤 광고를 게재하기 전에 Google의 동의 관리 요건을 따릅니다.</p>
          <p className="mt-2">미국 캘리포니아주 거주자는 관련 법령에 따라 개인정보의 수집·이용 내역 확인, 삭제, 판매 거부를 요청할 권리가 있습니다. 서비스는 이용자의 개인정보를 제3자에게 판매하지 않습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">6. 아동의 개인정보</h2>
          <p>서비스는 만 14세 미만 아동을 대상으로 하지 않으며, 아동의 개인정보를 의도적으로 수집하지 않습니다. 만 14세 미만 아동의 정보가 수집된 사실을 알게 된 경우 지체 없이 파기합니다. 아동에게 맞춤 광고가 게재되지 않도록 광고 설정을 유지합니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">7. 개인정보의 보유 및 파기</h2>
          <p>서비스는 개인정보를 직접 수집·보유하지 않습니다. Google Analytics 및 AdSense를 통해 수집되는 데이터는 Google의 데이터 보유 정책에 따릅니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">8. 이용자의 권리</h2>
          <ul className="pl-5 my-2 list-disc">
            <li>쿠키 거부: 브라우저 설정에서 쿠키를 차단할 수 있습니다.</li>
            <li>맞춤 광고 거부: Google 광고 설정에서 비활성화할 수 있습니다.</li>
            <li>데이터 삭제: 브라우저의 사이트 데이터를 삭제하면 로컬 스토리지가 초기화됩니다.</li>
            <li>문의: 개인정보 관련 문의는 아래 연락처로 보내주세요.</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">9. 개인정보 보호책임자</h2>
          <p>이름: 김태양<br/>이메일: taeyang.kim4875@gmail.com</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">10. 방침 변경</h2>
          <p>본 방침은 관련 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.</p>

          <p className="text-xs text-[var(--sub)] mt-6">최종 수정일: 2026년 9월 16일</p>
        </div>
      </Card>
    </PageLayout>
  );
}
