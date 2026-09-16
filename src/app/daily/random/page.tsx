import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import RandomPicker from "./RandomPicker";
import ShareButtons from '@/components/ShareButtons';

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
      <ShareButtons title="랜덤 뽑기 결과" />

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

      <SeoSection title="랜덤 뽑기가 정말 공정하려면">
        <p>
          많은 웹 추첨기가 자바스크립트의 <strong>Math.random()</strong>을 씁니다.
          빠르지만 의사난수(pseudo-random)라서 시드를 알면 다음 값을 예측할 수 있고,
          브라우저 구현에 따라 값이 고르게 퍼지지 않는 경우도 있습니다.
        </p>
        <p>
          이 계산기는 브라우저가 제공하는 <strong>crypto.getRandomValues()</strong>를 사용합니다.
          운영체제의 엔트로피 소스를 쓰는 암호학적 난수라 예측이 불가능하고,
          범위 변환 시 나머지 연산으로 생기는 편향(modulo bias)도 제거해
          모든 숫자가 정확히 같은 확률로 나오도록 처리했습니다.
        </p>
        <p>
          경품 추첨이나 발표 순서처럼 결과에 이해관계가 걸린 상황이라면
          <strong>뽑기 전에 규칙을 먼저 공개</strong>하는 것이 좋습니다.
          범위와 뽑을 개수, 중복 허용 여부를 참가자에게 알린 뒤 화면을 공유하면서 실행하면
          결과에 대한 이의가 거의 생기지 않습니다.
        </p>
      </SeoSection>

      <SeoSection title="로또 6/45 당첨 확률">
        <p>
          1부터 45까지 중 6개를 순서 없이 고르는 경우의 수는 <strong>8,145,060가지</strong>입니다.
          1등 당첨 확률이 814만분의 1이라는 뜻입니다. 등수별로 정리하면 이렇습니다.
        </p>
        <SeoList>
          <li><strong>1등</strong>(6개 일치) — 1 / 8,145,060</li>
          <li><strong>2등</strong>(5개 + 보너스) — 6 / 8,145,060, 약 136만분의 1</li>
          <li><strong>3등</strong>(5개 일치) — 228 / 8,145,060, 약 3만 6천분의 1</li>
          <li><strong>4등</strong>(4개 일치) — 11,115 / 8,145,060, 약 733분의 1</li>
          <li><strong>5등</strong>(3개 일치) — 182,780 / 8,145,060, 약 45분의 1</li>
        </SeoList>
        <p>
          자주 나온 번호를 고르면 유리하다는 말이 있지만, 매 회차 추첨은 이전 회차와 완전히 독립입니다.
          어떤 조합을 고르든 당첨 확률은 정확히 같습니다.
          다만 1·2·3·4·5·6처럼 사람들이 많이 고르는 조합은 당첨 시 당첨금을 나눠 갖게 되므로
          기대 수령액 측면에서는 불리할 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
