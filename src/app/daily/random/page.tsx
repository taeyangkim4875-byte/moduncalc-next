import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import RandomPicker from "./RandomPicker";

export const metadata: Metadata = {
  title: "랜덤 번호 뽑기 - 숫자 추첨 · 로또 번호 생성기",
  description: "공정한 추첨이 필요할 때! 랜덤 숫자 뽑기 + 로또 번호 생성 + 목록 섞기. 무료.",
  alternates: { canonical: "https://moduncalc.com/daily/random" },
  openGraph: { title: "랜덤 번호 뽑기 - 숫자 추첨 · 로또 번호 생성기", description: "랜덤 숫자 추첨, 로또 번호 생성, 순서 섞기.", url: "https://moduncalc.com/daily/random" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="일상 도구" title="랜덤 번호 뽑기" description="숫자 추첨, 로또 번호 생성, 목록 섞기를 한번에.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '랜덤 뽑기', href: '/daily/random' }]} />
      <CalculatorJsonLd name="랜덤 번호 뽑기" description="랜덤 숫자 추첨, 로또 번호 생성, 순서 섞기." url="https://moduncalc.com/daily/random" />
      <FaqJsonLd items={[
        {q:"랜덤 추첨은 공정한가요?",a:"이 생성기는 crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 생성합니다. 모든 숫자가 동일한 확률로 선택됩니다."},
        {q:"로또 당첨 확률은 얼마인가요?",a:"로또 6/45의 1등 당첨 확률은 1/8,145,060(약 814만분의 1)입니다."},
      ]} />
      <RandomPicker />

      <SeoSection title="이 추첨기의 공정성">
        <p>
          이 추첨기는 브라우저의 <strong>crypto.getRandomValues()</strong> API를 사용합니다.
          이는 운영체제의 엔트로피 풀에서 난수를 가져오는 <strong>암호학적으로 안전한(CSPRNG)</strong> 방식으로,
          Math.random()보다 훨씬 예측 불가능합니다.
        </p>
        <SeoList>
          <li><strong>편향 없음</strong> — 모든 숫자가 정확히 동일한 확률로 선택됩니다.</li>
          <li><strong>예측 불가</strong> — 이전 결과로 다음 결과를 유추할 수 없습니다.</li>
          <li><strong>로컬 실행</strong> — 서버 통신 없이 브라우저에서 즉시 생성됩니다.</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="활용 예시">
        <SeoList>
          <li><strong>제비뽑기 / 당첨자 추첨</strong> — 이벤트 당첨자를 공정하게 선정</li>
          <li><strong>팀 나누기</strong> — 목록 섞기로 랜덤 팀 배정</li>
          <li><strong>순서 정하기</strong> — 발표 순서, 당번 순서 등</li>
          <li><strong>로또 번호 생성</strong> — 1~45 중 6개 자동 생성</li>
          <li><strong>게임 / 내기</strong> — 주사위 대용, 동전 던지기 등</li>
        </SeoList>
      </SeoSection>

      <SeoFaq
        title="랜덤 추첨, 이런 점도 궁금하실 거예요"
        items={[
          { q: '같은 번호가 여러 번 나올 수 있나요?', a: '중복 허용 모드에서는 같은 번호가 여러 번 나올 수 있습니다. 로또처럼 중복 없이 뽑으려면 중복 제거 옵션을 선택하세요.' },
          { q: '목록 섞기에서 특정 항목을 고정할 수 있나요?', a: '현재는 전체 목록을 한꺼번에 섞습니다. 특정 항목을 고정하려면 해당 항목을 빼고 나머지만 섞은 뒤 다시 합치세요.' },
          { q: '이 번호로 로또를 사면 당첨되나요?', a: '로또 1등 당첨 확률은 약 814만분의 1로, 어떤 번호 조합이든 확률은 동일합니다. 자동이든 수동이든 당첨 확률에 차이는 없습니다. 재미로만 이용하세요.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 도구">
        <p>
          비율 계산이 필요하면 <SeoLink href="/daily/percent">퍼센트 계산기</SeoLink>,
          안전한 비밀번호가 필요하면 <SeoLink href="/daily/password">비밀번호 생성기</SeoLink>를 이용하세요.
          더치페이 인원 정하기에는 <SeoLink href="/daily/dutch">더치페이 계산기</SeoLink>도 유용합니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
