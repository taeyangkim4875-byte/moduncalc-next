import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from "@/components/SeoContent";
import PaintCalc from "./PaintCalc";

export const metadata: Metadata = {
  title: "페인트 벽지 계산기 - 방 면적에 필요한 자재량 계산",
  description: "방 크기를 입력하면 필요한 페인트량(L)과 벽지 롤 수를 자동 계산. 셀프 인테리어 필수 도구.",
  alternates: { canonical: "https://moduncalc.com/daily/paint" },
  openGraph: {
    title: "페인트 벽지 계산기 - 방 면적에 필요한 자재량 계산",
    description: "방 크기를 입력하면 필요한 페인트량(L)과 벽지 롤 수를 자동 계산. 셀프 인테리어 필수 도구.",
    url: "https://moduncalc.com/daily/paint",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="셀프 인테리어" title="페인트 벽지 계산기" description="방 크기를 입력하면 필요한 페인트량과 벽지 롤 수를 자동으로 계산해요.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '일상', href: '/daily' }, { name: '페인트', href: '/daily/paint' }]} />
      <CalculatorJsonLd name="페인트 벽지 계산기" description="방 크기를 입력하면 필요한 페인트량(L)과 벽지 롤 수를 자동 계산." url="https://moduncalc.com/daily/paint" />
      <FaqJsonLd items={[{q:"페인트 1L로 몇 m2를 칠할 수 있나요?",a:"일반적으로 1L당 약 8~12m2를 도포할 수 있으며, 평균 10m2/L 기준으로 계산합니다."},{q:"2회 도포가 필요한 이유는?",a:"1회만 도포하면 기존 색이 비치거나 얼룩이 생길 수 있어 2회 이상 도포를 권장합니다."}]} />
      <PaintCalc />

      <SeoSection title="페인트 소요량 계산 방법">
        <SeoFormula>
          <div>벽면 총 면적 = (가로 + 세로) × 2 × 높이</div>
          <div>도장 면적 = 벽면 총 면적 − 문·창문 면적</div>
          <div>필요 페인트량 = 도장 면적 ÷ 도포율(㎡/L) × 도포 횟수</div>
        </SeoFormula>
        <SeoList>
          <li><strong>도포율</strong> — 일반 수성 페인트 기준 약 8~12㎡/L. 평균 10㎡/L로 계산.</li>
          <li><strong>도포 횟수</strong> — 밝은 색 위에 밝은 색이면 2회, 어두운 색 위에 밝은 색이면 3회 이상 권장.</li>
          <li><strong>여유분</strong> — 실제로는 10~15% 정도 여유를 두고 구매하는 게 좋습니다.</li>
        </SeoList>
      </SeoSection>

      <SeoSection title="셀프 페인팅 vs 업체 시공 비용 비교">
        <SeoList>
          <li><strong>셀프 페인팅</strong> — 재료비 10~30만원 (페인트 + 롤러 + 마스킹테이프). 1~2일 소요.</li>
          <li><strong>업체 시공</strong> — 평당 3~5만원. 20평 기준 60~100만원. 반나절~1일 소요.</li>
          <li><strong>벽지 시공</strong> — 실크벽지 기준 평당 2~4만원, 합지벽지는 평당 1.5~3만원.</li>
        </SeoList>
        <p>
          셀프 페인팅은 비용은 저렴하지만 마감 품질에 차이가 있을 수 있습니다.
          처음이라면 작은 방부터 시도하고, 넓은 거실은 업체에 맡기는 것도 방법입니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="페인트·벽지, 이런 점도 궁금하실 거예요"
        items={[
          { q: '수성 페인트와 유성 페인트의 차이는?', a: '수성 페인트는 물로 희석하고 냄새가 적어 실내용으로 적합합니다. 유성 페인트는 내구성이 좋지만 시너로 희석해야 하고 냄새가 강해 환기가 필수입니다. 일반 가정 실내는 수성 페인트를 추천합니다.' },
          { q: '페인트칠 전에 어떤 준비가 필요한가요?', a: '벽면의 갈라진 틈을 퍼티로 메우고, 사포로 매끈하게 정리합니다. 문틀·콘센트·바닥은 마스킹테이프와 비닐로 보호하세요. 프라이머(초벌)를 바르면 접착력이 좋아지고 색 발현이 균일해집니다.' },
          { q: '벽지 롤 하나로 어느 정도 면적을 커버하나요?', a: '표준 벽지 롤은 폭 93cm × 길이 약 15.6m로, 실사용 면적은 약 5㎡(약 1.5평) 정도입니다. 무늬 맞춤이 필요한 벽지는 손실이 10~20% 더 발생합니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          평수와 ㎡ 변환이 필요하면 <SeoLink href="/daily/pyeong">평수 계산기</SeoLink>를 이용하고,
          이사·인테리어 비용까지 계산하려면 <SeoLink href="/daily/percent">퍼센트 계산기</SeoLink>로 할인율을 확인하세요.
          단위 변환이 필요하면 <SeoLink href="/daily/unit">단위 변환기</SeoLink>도 유용합니다.
        </p>
      </SeoSection>

      <SeoSection title="페인트와 벽지, 얼마나 사야 할까">
        <p>
          자재를 모자라게 사는 것이 남기는 것보다 훨씬 곤란합니다.
          페인트는 제조 로트(lot)에 따라 같은 색상이라도 미세하게 색이 다를 수 있어
          중간에 추가로 사면 이어 칠한 부분이 티 납니다.
        </p>
        <SeoFormula>
          <div>벽 면적 = (가로 + 세로) × 2 × 높이 − 문·창문 면적</div>
          <div>필요 페인트(L) = 벽 면적 ÷ 도포면적 × 도포 횟수</div>
          <div>수성페인트 도포면적 ≈ 1L당 8~10㎡ (1회 기준)</div>
        </SeoFormula>
        <p>
          실제로는 흡수율이 높은 벽면, 색상 변화가 큰 경우(진한 색 위에 밝은 색),
          롤러 작업 중 손실을 감안해 <strong>계산값의 10~15%를 여유분</strong>으로 더 잡는 것이 안전합니다.
        </p>
      </SeoSection>

      <SeoSection title="셀프 시공 전에 알아둘 것">
        <SeoList>
          <li><strong>도포는 두 번이 기본입니다.</strong> 한 번만 칠하면 아래 색이 비칩니다. 특히 흰색으로 덮을 때는 3회가 필요할 수도 있습니다.</li>
          <li><strong>프라이머(하도)를 바르면 페인트가 덜 듭니다.</strong> 벽이 도배지이거나 흡수율이 높으면 프라이머 한 번이 페인트 한 번보다 경제적입니다.</li>
          <li><strong>벽지는 합지와 실크가 다릅니다.</strong> 폭과 롤 길이가 제품마다 달라 구매 전 규격을 확인해야 하고, 무늬가 있으면 무늬 맞춤 때문에 손실분이 더 생깁니다.</li>
          <li><strong>천장은 벽보다 어렵습니다.</strong> 같은 면적이라도 시간이 두 배 가까이 걸리므로 일정을 여유 있게 잡으세요.</li>
          <li><strong>건조 시간을 지키세요.</strong> 덧칠 간격은 보통 2~4시간이며, 습도가 높으면 더 걸립니다. 덜 마른 상태에서 덧칠하면 들뜹니다.</li>
        </SeoList>
        <p>
          방 면적을 평 단위로 환산하려면 <SeoLink href="/daily/pyeong">평수 변환 계산기</SeoLink>가 편하고,
          길이·면적 단위 변환은 <SeoLink href="/daily/unit">단위 변환기</SeoLink>에서 할 수 있습니다.
          이사와 함께 진행한다면 <SeoLink href="/realestate/registration">등기비용 계산기</SeoLink>로 전체 예산을 잡아두세요.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
