import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "개인정보처리방침 - 모든 계산기",
  description: "모든 계산기(moduncalc.com)의 개인정보 수집·이용·보호에 관한 안내입니다.",
  alternates: { canonical: "https://moduncalc.com/privacy" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="법적 고지" title="개인정보처리방침" description="모든 계산기의 개인정보 처리에 관한 안내입니다.">
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

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">2. 쿠키(Cookie) 사용</h2>
          <p>서비스는 아래 목적으로 쿠키를 사용합니다:</p>
          <ul className="pl-5 my-2 list-disc">
            <li><b>Google Analytics</b> — 방문 통계 수집 및 서비스 개선 (수집 주체: Google LLC)</li>
            <li><b>Google AdSense</b> — 맞춤형 광고 제공을 위한 관심사 기반 쿠키 (수집 주체: Google LLC)</li>
            <li><b>로컬 스토리지</b> — 일부 계산기의 설정값 저장 (월급 달력 등, 브라우저에만 저장)</li>
          </ul>
          <p className="mt-2">쿠키는 브라우저 설정에서 거부하거나 삭제할 수 있습니다. 쿠키를 거부해도 계산기 이용에는 영향이 없습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">3. 제3자 광고 서비스</h2>
          <p>서비스는 <b>Google AdSense</b>를 통해 광고를 게재할 수 있습니다. Google은 사용자의 웹사이트 방문 기록을 기반으로 맞춤형 광고를 표시할 수 있으며, 이에 대한 자세한 내용은 <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">Google 광고 정책</a>에서 확인하실 수 있습니다.</p>
          <p className="mt-2">사용자는 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">Google 광고 설정</a>에서 맞춤형 광고를 비활성화할 수 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">4. 개인정보의 보유 및 파기</h2>
          <p>서비스는 개인정보를 직접 수집·보유하지 않습니다. Google Analytics 및 AdSense를 통해 수집되는 데이터는 Google의 데이터 보유 정책에 따릅니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">5. 이용자의 권리</h2>
          <ul className="pl-5 my-2 list-disc">
            <li>쿠키 거부: 브라우저 설정에서 쿠키를 차단할 수 있습니다.</li>
            <li>맞춤 광고 거부: Google 광고 설정에서 비활성화할 수 있습니다.</li>
            <li>데이터 삭제: 브라우저의 사이트 데이터를 삭제하면 로컬 스토리지가 초기화됩니다.</li>
            <li>문의: 개인정보 관련 문의는 아래 연락처로 보내주세요.</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">6. 개인정보 보호책임자</h2>
          <p>이름: 김태양<br/>이메일: taeyang.kim4875@gmail.com</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">7. 방침 변경</h2>
          <p>본 방침은 관련 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.</p>

          <p className="text-xs text-[var(--sub)] mt-6">최종 수정일: 2026년 7월 14일</p>
        </div>
      </Card>
    </PageLayout>
  );
}
