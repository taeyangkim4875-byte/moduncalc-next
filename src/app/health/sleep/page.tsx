import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SeoSection, SeoFaq, SeoList, SeoLink } from "@/components/SeoContent";
import SleepCalc from "./SleepCalc";

export const metadata: Metadata = {
  title: "수면 시간 계산기 - 몇 시에 자야 개운할까? · 수면 주기",
  description: "몇 시에 자야 개운하게 일어날까? 수면 주기 90분에 맞춘 최적의 취침·기상 시간 계산.",
  alternates: { canonical: "https://moduncalc.com/health/sleep" },
  openGraph: {
    title: "수면 시간 계산기 - 몇 시에 자야 개운할까? · 수면 주기",
    description: "수면 주기(90분)에 맞춰 최적의 취침·기상 시간을 알려드립니다. 개운하게 일어나는 시간 계산.",
    url: "https://moduncalc.com/health/sleep",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="건강" title="수면 시간 계산기" description="수면 주기(90분)에 맞춰 최적의 취침·기상 시간을 계산합니다.">
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '건강', href: '/health' }, { name: '수면 계산기', href: '/health/sleep' }]} />
      <CalculatorJsonLd name="수면 시간 계산기" description="수면 주기(90분)에 맞춰 최적의 취침·기상 시간을 알려드립니다. 개운하게 일어나는 시간 계산." url="https://moduncalc.com/health/sleep" />
      <FaqJsonLd items={[
        {q:"수면 주기란 무엇인가요?",a:"수면 주기는 NREM(비렘수면)과 REM(렘수면)이 반복되는 약 90분 단위의 사이클입니다. 한 밤에 4~6회 반복되며, 수면 주기가 끝나는 시점에 일어나면 개운합니다."},
        {q:"성인의 권장 수면 시간은 얼마인가요?",a:"미국수면재단(NSF) 기준 성인(18~64세)은 7~9시간, 65세 이상은 7~8시간이 권장됩니다. 수면 주기(90분) 기준으로 5사이클(7.5시간)이 가장 이상적입니다."},
        {q:"잠드는 데 걸리는 시간은 왜 고려하나요?",a:"보통 잠자리에 든 후 실제로 잠들기까지 평균 10~20분이 걸립니다. 이 시간을 고려하지 않으면 수면 주기 계산이 부정확해져 개운하게 일어나기 어렵습니다."},
      ]} />
      <SleepCalc />

      <SeoSection title="알람 시간 잘못 맞추면 더 피곤한 이유">
        <p>7시간 잤는데 개운하고, 8시간 잤는데 오히려 더 피곤한 적 있잖아요. 이게 수면 주기 때문입니다. 수면 주기 한 사이클이 약 90분인데, 딱 이 주기가 끝나는 타이밍에 일어나야 개운해요. 깊은 수면 한가운데서 알람이 울리면 8시간을 자도 피곤합니다.</p>
        <p>잠드는 데 걸리는 시간도 중요해요. 보통 10~20분 정도 걸리는데, 이걸 계산 안 하면 수면 주기가 어긋납니다. 예를 들어 7시에 일어나야 하면 23시 14분이나 0시 44분에 눕는 게 좋아요. 사실 매일 같은 시간에 자고 일어나는 게 수면의 질에는 가장 효과적입니다.</p>
      </SeoSection>

      <SeoSection title="나이별 권장 수면 시간 — 나는 부족한 편일까">
        <SeoList>
          <li><strong>신생아(0~3개월)</strong> — 14~17시간. 수유 간격에 맞춰 자연스럽게 잠</li>
          <li><strong>유아(1~2세)</strong> — 11~14시간. 낮잠 1~2회 포함</li>
          <li><strong>학령기(6~13세)</strong> — 9~11시간. 근데 학원 때문에 현실적으로 8시간도 어려운 경우 많음</li>
          <li><strong>청소년(14~17세)</strong> — 8~10시간. 성장호르몬이 수면 중에 분비되니까 이 시기는 진짜 잠이 중요</li>
          <li><strong>성인(18~64세)</strong> — 7~9시간. 한국 성인 평균 수면 시간은 6시간 48분으로 OECD 최하위</li>
          <li><strong>노인(65세+)</strong> — 7~8시간. 깊은 수면 비율이 줄어서 자주 깸</li>
        </SeoList>
        <p>
          한국인 평균 수면이 6시간 48분이라는 건, 대부분이 만성 수면 부족 상태라는 뜻입니다. 수면 부채가 쌓이면 집중력, 기억력, 면역력 전부 떨어져요. 주말에 몰아자는 걸로는 회복이 안 됩니다 — 연구에 따르면 1시간 부족한 수면을 회복하는 데 4일이 걸려요.
        </p>
      </SeoSection>

      <SeoSection title="숙면을 위한 현실적인 팁">
        <p>
          &quot;스마트폰 보지 마세요&quot; 같은 뻔한 얘기 말고, 실제로 효과 있는 것들 위주로 정리했습니다.
        </p>
        <SeoList>
          <li><strong>침실 온도 18~20°C</strong> — 더우면 깊은 수면 진입이 어려움. 에어컨 타이머 2시간으로 설정</li>
          <li><strong>기상 시간 고정</strong> — 취침 시간보다 기상 시간을 매일 같게 하는 게 더 중요합니다</li>
          <li><strong>오후 2시 이후 카페인 차단</strong> — 카페인 반감기 6시간. 밤 11시에 자려면 오후 5시까지도 영향 있음</li>
          <li><strong>취침 1시간 전 조명 낮추기</strong> — 밝은 조명이 멜라토닌 분비를 억제합니다</li>
        </SeoList>
        <p>
          수면 질이 좋아지면 다이어트도 수월해집니다. 수면 부족 시 식욕 호르몬(그렐린)이 증가해서 과식하게 돼요.
          <SeoLink href="/health/bmr">기초대사량</SeoLink>도 같이 확인해보면 수면과 다이어트의 관계를 이해하기 쉬울 겁니다.
        </p>
      </SeoSection>

      <SeoFaq
        title="수면 관련 궁금한 점"
        items={[
          { q: '낮잠은 얼마나 자는 게 좋나요?', a: '20분이 베스트입니다. 30분 넘기면 깊은 수면에 들어가서 오히려 머리가 멍해져요. 점심 직후 15~20분 파워냅이 오후 집중력에 효과적입니다.' },
          { q: '주말에 몰아자면 수면 부채가 해소되나요?', a: '일부 회복은 되지만, 수면 리듬이 깨져서 월요일이 더 힘들어집니다. 주중 수면 시간을 30분이라도 늘리는 게 낫습니다.' },
          { q: '카페인은 수면에 얼마나 영향을 주나요?', a: '카페인 반감기가 5~6시간입니다. 오후 2시에 마신 커피가 밤 8시에도 절반이 남아있어요. 수면이 예민하면 점심 이후 카페인은 피하세요.' },
          { q: '수면 앱(삼성 헬스, 애플 워치 등)은 정확한가요?', a: '깊은 수면/얕은 수면 구분은 정확도가 60~70% 수준이라 참고용입니다. 다만 총 수면 시간과 기상 횟수 추적은 꽤 정확해서 변화 추이를 보는 데는 유용해요.' },
          { q: '잠이 안 올 때 억지로 누워있어야 하나요?', a: '20분 넘게 잠이 안 오면 침대에서 나오세요. 침대에서 뒤척이면 뇌가 침대를 각성 장소로 기억합니다. 거실에서 가벼운 독서를 하다가 졸리면 다시 누우세요.' },
        ]}
      />
    </PageLayout>
  );
}
