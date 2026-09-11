import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import SmartCalc from "./SmartCalc";

export const metadata: Metadata = {
  title: "스마트 계산기 - 공학용 계산기 · 수식 입력 · 삼각함수 (무료)",
  description: "cos, sin, sqrt, log 등 공학 함수를 텍스트로 입력하면 실시간으로 계산. 한국어 입력 지원. 버튼 계산기 + 수식 입력 모두 가능.",
  alternates: { canonical: "https://moduncalc.com/calc" },
  openGraph: {
    title: "스마트 계산기 - 무료 온라인 공학용 계산기",
    description: "삼각함수, 로그, 제곱근 등 공학 계산을 브라우저에서. 한국어 입력도 지원.",
    url: "https://moduncalc.com/calc",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="공학 · 일반 계산"
      title="스마트 계산기"
      description="수식을 입력하면 실시간으로 계산해 드려요. 한국어도 지원!"
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: 'calc', href: '/calc' }]} />
      <CalculatorJsonLd name="스마트 계산기" description="공학용 계산기. cos, sin, sqrt, log 등 수식을 텍스트로 입력하면 실시간 계산. 한국어 지원." url="https://moduncalc.com/calc" />
      <FaqJsonLd items={[
        {q:"어떤 함수를 지원하나요?",a:"삼각함수(sin, cos, tan), 제곱근(sqrt), 로그(log, ln), 절대값(abs), 반올림(round), 올림(ceil), 내림(floor), 거듭제곱(pow, ^), 원주율(π) 등을 지원합니다."},
        {q:"한국어로도 입력할 수 있나요?",a:"네, '루트 16', '코사인 45', '사인 30', '파이' 등 한국어로 입력하면 자동으로 수식으로 변환됩니다."},
        {q:"삼각함수는 도(degree) 기준인가요?",a:"네, 이 계산기는 도(degree) 기준입니다. cos(45)는 45도의 코사인 값을 계산합니다."},
      ]} />
      <SmartCalc />

      <SeoSection title="폰에서 공학 계산기 쓰는 가장 빠른 방법">
        <p>
          사실 아이폰 기본 계산기를 가로로 돌리면 공학용이 나오긴 합니다. 근데 그거 아시죠? 화면 고정 걸려 있으면 안 돌아갑니다.
          안드로이드는 기본 계산기에 sin, cos도 없는 기종이 수두룩하고요.
        </p>
        <p>
          이 계산기는 <strong>수식을 텍스트로 직접 입력</strong>할 수 있어서, 복잡한 계산도 한 줄에 끝납니다.
          &quot;루트 144 + 파이 * 3&quot;처럼 한국어로 쳐도 알아서 변환해 줍니다.
        </p>
      </SeoSection>

      <SeoSection title="이런 계산에 활용하세요">
        <SeoList>
          <li><strong>대학 과제</strong> — sin(30) * cos(60) 같은 삼각함수 계산을 앱 설치 없이</li>
          <li><strong>건축·인테리어</strong> — sqrt(가로² + 세로²)로 대각선 길이 바로 계산</li>
          <li><strong>투자 복리</strong> — 1000 * (1.05)^10 같은 거듭제곱도 한 줄이면 끝, 더 자세한 시뮬레이션은 <SeoLink href="/daily/compound">복리 계산기</SeoLink>에서</li>
          <li><strong>요리 레시피 환산</strong> — 6인분 레시피를 4인분으로? 비율 계산이 간편합니다</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="지원하는 함수와 상수 전체 목록">
        <SeoList>
          <li><strong>삼각함수</strong> — sin, cos, tan, asin, acos, atan (모두 도(degree) 기준)</li>
          <li><strong>지수·로그</strong> — log(밑 10), ln(자연로그), exp(e의 거듭제곱), pow(x, y) 또는 x^y</li>
          <li><strong>루트·절대값</strong> — sqrt(제곱근), abs(절대값), cbrt(세제곱근)</li>
          <li><strong>반올림</strong> — round(반올림), ceil(올림), floor(내림)</li>
          <li><strong>상수</strong> — π(파이, 3.14159…), e(자연상수, 2.71828…)</li>
          <li><strong>한국어 키워드</strong> — 루트, 코사인, 사인, 탄젠트, 파이, 절대값 → 자동 변환</li>
        </SeoList>
        <p>수식 입력 예시: <code>sqrt(3^2 + 4^2)</code>를 입력하면 빗변 길이 5가 바로 나옵니다. <code>log(1000)</code>은 3, <code>ln(e^5)</code>는 5입니다. 금융 계산이 필요하면 <SeoLink href="/daily/compound">복리 계산기</SeoLink>가 더 편리해요.</p>
      </SeoSection>

      <SeoFaq
        title="자주 묻는 질문"
        items={[
          { q: '한국어 입력이 정확히 어떤 걸 지원하나요?', a: '"루트", "코사인", "사인", "탄젠트", "파이", "절대값" 등 주요 수학 용어를 한국어로 입력하면 자동 변환됩니다. "루트 16"은 sqrt(16)으로, "파이"는 π(3.14159…)로 바뀝니다.' },
          { q: '계산 결과를 복사할 수 있나요?', a: '결과 영역을 탭하면 클립보드에 복사됩니다. 리포트나 과제에 바로 붙여넣기 하세요.' },
          { q: '괄호를 여러 겹 써도 되나요?', a: '네. ((2+3) * (4+5)) / 2 처럼 괄호를 중첩해도 정확하게 계산됩니다. 괄호가 안 닫히면 빨간색으로 알려줍니다.' },
          { q: '소수점 계산이 이상하게 나와요', a: '컴퓨터 부동소수점 특성상 0.1 + 0.2가 0.30000000000000004로 나올 수 있습니다. 이 계산기는 소수점 10자리에서 자동 반올림하므로 일반적인 사용에는 문제 없어요.' },
          { q: '계산 기록이 저장되나요?', a: '브라우저 내에서만 임시 저장됩니다. 브라우저를 닫으면 사라지니, 중요한 결과는 따로 메모해두세요.' },
        ]}
      />
    </PageLayout>
  );
}
