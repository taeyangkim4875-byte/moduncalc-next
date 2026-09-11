import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq } from "@/components/SeoContent";
import YouTubeCalc from "./YouTubeCalc";

export const metadata: Metadata = {
  title: "유튜브 수익 계산기 - 조회수별 예상 수익",
  description: "유튜브 조회수와 CPM으로 예상 광고 수익을 계산하세요.",
  alternates: { canonical: "https://moduncalc.com/daily/youtube" },
  openGraph: {
    title: "유튜브 수익 계산기 - 조회수별 예상 수익",
    description: "유튜브 조회수와 CPM으로 예상 광고 수익을 계산하세요.",
    url: "https://moduncalc.com/daily/youtube",
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="크리에이터 수익"
      title="유튜브 수익 계산기"
      description="조회수와 CPM으로 유튜브 예상 광고 수익을 시뮬레이션하세요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '유튜브 수익', href: '/daily/youtube' }]} />
      <CalculatorJsonLd name="유튜브 수익 계산기" description="유튜브 조회수와 CPM으로 예상 광고 수익을 계산하세요." url="https://moduncalc.com/daily/youtube" />
      <FaqJsonLd items={[
        { q: "유튜브 수익은 언제 지급되나요?", a: "매월 21~26일 사이에 애드센스를 통해 전월 수익이 지급됩니다. 최소 지급 기준액은 100달러입니다." },
        { q: "조회수 100만 회면 얼마를 벌 수 있나요?", a: "CPM 3,000원, 광고 노출 50% 기준으로 약 150만원입니다. 하지만 채널 주제와 시청자층에 따라 크게 달라집니다." },
        { q: "쇼츠도 수익이 발생하나요?", a: "네, 2023년부터 쇼츠에도 광고 수익이 배분됩니다. 다만 일반 영상보다 CPM이 낮은 편입니다." },
      ]} />
      <YouTubeCalc />

      <SeoSection title="유튜브 수익, 생각보다 적을 수 있어요">
        <p>구독자 10만이면 월 얼마 벌까 궁금하잖아요. 근데 구독자 수보다 조회수가 훨씬 중요합니다. 구독자 10만인데 영상당 조회수가 3,000이면 수익이 거의 없어요. 반대로 구독자 1만인데 영상 하나가 100만 뷰 터지면 그 달은 꽤 벌어요.</p>
        <p>2026년 한국 유튜브 평균 CPM은 2,000~5,000원 정도인데, 금융·IT 채널은 7,000원 넘는 경우도 있고, 게임·일상 브이로그는 1,500원도 안 될 때가 있습니다. 사실 유튜브만으로 생활하려면 월 조회수 30만 이상은 꾸준히 나와야 현실적이에요. 협찬이나 멤버십 수익이 광고보다 큰 크리에이터도 많습니다.</p>
      </SeoSection>

      <SeoSection title="CPM이 높은 카테고리, 낮은 카테고리">
        <p>
          같은 10만 뷰라도 주제에 따라 수익이 2~5배 차이 납니다.
          <strong>금융·보험·부동산</strong> 채널은 CPM이 7,000~15,000원까지 나오는데,
          광고주들이 이 분야에 높은 단가를 지불하기 때문이에요.
          반면 게임 실황이나 일상 브이로그는 1,000~2,000원 수준인 경우가 많습니다.
        </p>
        <p>
          IT·테크 리뷰도 CPM이 높은 편(5,000~10,000원)이고, 교육·자기계발도 괜찮아요.
          수익을 높이려면 CPM 높은 주제를 메인으로 잡고, 쇼츠로 구독자를 모으는 전략이 현실적입니다.
          블로그 수익과 비교해보려면 <a href="/daily/coupang">쿠팡 파트너스 계산기</a>도 참고하세요.
        </p>
      </SeoSection>

      <SeoSection title="구독자 수별 현실적인 월 수익">
        <p>
          구독자 1,000~5,000명: 월 5~30만원 (영상 주 2회 기준). 이 단계에서는 광고보다 협찬이 더 큰 수익원인 경우가 많아요.
          구독자 1~5만명: 월 30~150만원. 꾸준히 올리면 부업 수준의 수익이 가능합니다.
          구독자 10만명 이상: 월 100~500만원+. 여기서부터 전업이 현실적으로 고려 가능한 구간이에요.
        </p>
        <p>
          다만 이건 평균이고, 같은 구독자 수라도 영상당 조회수가 핵심입니다.
          구독자 대비 조회수 비율이 10% 미만이면 채널 활성도가 낮은 거라 수익도 기대 이하예요.
          수익이 잡히기 시작하면 종합소득세도 미리 계산해두세요 — <a href="/tax/income">종합소득세 계산기</a>에서 확인 가능합니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="유튜브 수익 관련 궁금한 점"
        items={[
          { q: '쇼츠 수익은 일반 영상과 다른가요?', a: '네, 쇼츠는 별도 수익 풀에서 배분되는데 일반 영상 대비 CPM이 5분의 1 수준이에요. 대신 조회수가 잘 터지니까 홍보용으로 쓰는 전략이 많습니다.' },
          { q: '수익 창출 조건이 뭔가요?', a: '구독자 1,000명 + 최근 12개월 시청 시간 4,000시간, 또는 쇼츠 조회수 1,000만 회가 필요합니다. 2026년 기준입니다.' },
          { q: '유튜브 수익에 세금이 붙나요?', a: '사업소득으로 종합소득세 신고 대상이에요. 구글이 미국 세금 30%를 원천징수하는데, 세금 정보 제출하면 한국 거주자는 면제됩니다. 홈택스에서 신고하세요.' },
          { q: '멤버십이나 슈퍼챗 수익은 얼마나 되나요?', a: '라이브 방송이 활발한 채널은 슈퍼챗만으로 월 수십~수백만원을 버는 경우도 있어요. 구글이 30%를 가져가고 나머지가 크리에이터 몫입니다.' },
          { q: '유튜브 광고 수익 지급 통화는?', a: '미국 달러(USD)로 정산되고, 한국 계좌로 받으면 입금 시점 환율이 적용됩니다. 송금 수수료는 무료지만, 수취 은행에서 중계 수수료가 붙을 수 있어요.' },
        ]}
      />
    </PageLayout>
  );
}
