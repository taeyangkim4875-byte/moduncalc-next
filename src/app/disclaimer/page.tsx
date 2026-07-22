import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "면책조항 - 모든 계산기",
  description: "모든 계산기(moduncalc.com)의 계산 결과에 대한 면책 고지사항입니다.",
  alternates: { canonical: "https://moduncalc.com/disclaimer" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="법적 고지" title="면책조항" description="모든 계산기 서비스의 면책 고지사항입니다.">
      <Card>
        <div className="text-sm text-[#4E5968] leading-[1.8]">
          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-0 mb-2.5">1. 계산 결과의 정확성</h2>
          <p>모든 계산기(moduncalc.com, 이하 &quot;서비스&quot;)에서 제공하는 모든 계산 결과는 공개된 세법·요율·통계를 기반으로 한 <b>참고용 추정치</b>이며, 법적 효력이 없습니다. 실제 금액은 개인 상황, 적용 법령, 기관별 기준에 따라 달라질 수 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">2. 세금 · 보험 계산</h2>
          <p>연봉 실수령액, 4대보험, 소득세, 취득세, 양도소득세, 증여세, 상속세 등 세금 관련 계산 결과는 간이 계산 방식에 의한 추정치입니다. 정확한 세액 산출은 국세청(☎ 126), 관할 세무서, 또는 세무사에게 문의하시기 바랍니다.</p>
          <ul className="pl-5 my-2 list-disc">
            <li>적용 세율 및 공제 항목은 매년 변경될 수 있습니다.</li>
            <li>개인별 비과세 항목, 특별 공제 등은 반영되지 않을 수 있습니다.</li>
            <li>2026년 기준 요율을 적용하고 있으며, 법령 개정 시 즉시 반영되지 않을 수 있습니다.</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">3. 금융 상품 계산</h2>
          <p>청년도약계좌, 청년미래적금, 적금·예금 이자, 대출 이자, 복리 수익 등 금융 상품 관련 계산 결과는 일반적인 조건을 기반으로 한 추정치입니다.</p>
          <ul className="pl-5 my-2 list-disc">
            <li>실제 금리, 우대 조건, 정부 기여금은 가입 은행과 개인 조건에 따라 다릅니다.</li>
            <li>투자 상품의 수익률은 과거 실적이 미래 수익을 보장하지 않습니다.</li>
            <li>금융 상품 가입 전 반드시 해당 금융기관의 상품설명서를 확인하시기 바랍니다.</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">4. 건강 관련 계산</h2>
          <p>BMI, 체지방률, 기초대사량, 칼로리, 수면 시간 등 건강 관련 계산 결과는 일반적인 공식에 의한 참고 수치이며, <b>의료 진단이나 처방을 대체하지 않습니다.</b></p>
          <ul className="pl-5 my-2 list-disc">
            <li>건강에 관한 정확한 판단은 의사 또는 전문 의료인에게 문의하세요.</li>
            <li>음주 후 운전 가능 시간 계산은 추정치이며, 실제 혈중알코올농도는 개인차가 큽니다. 안전을 위해 음주 후에는 대리운전 또는 대중교통을 이용하세요.</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">5. AI 기능</h2>
          <p>서비스에 포함된 AI 챗봇 및 AI 분석 기능은 NVIDIA NIM API를 기반으로 하며, AI가 생성한 답변은 <b>참고용</b>입니다.</p>
          <ul className="pl-5 my-2 list-disc">
            <li>AI 답변에는 부정확한 정보가 포함될 수 있습니다.</li>
            <li>AI 답변을 근거로 한 재무·건강·법률적 의사결정에 대해 운영자는 책임을 지지 않습니다.</li>
            <li>중요한 결정은 반드시 전문가(세무사, 변호사, 의사 등)와 상담하세요.</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">6. 부동산 계산</h2>
          <p>취득세, 양도소득세, 중개수수료, 전월세 전환, 임대수익률, 등기비용 등 부동산 관련 계산 결과는 일반적인 세율과 요율을 기반으로 한 추정치입니다.</p>
          <ul className="pl-5 my-2 list-disc">
            <li>다주택자 중과, 조정대상지역 여부, 감면 혜택 등은 개별 상황에 따라 다릅니다.</li>
            <li>정확한 세액은 관할 세무서 또는 세무사에게 확인하세요.</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">7. 손해배상 책임의 제한</h2>
          <p>서비스의 계산 결과, AI 답변, 가이드 콘텐츠를 신뢰하여 내린 의사결정으로 발생한 직접적·간접적 손해에 대해 운영자는 <b>책임을 지지 않습니다.</b> 서비스는 정보 제공 목적으로만 운영되며, 전문적인 조언을 대체하지 않습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">8. 제3자 서비스</h2>
          <p>서비스에는 Google AdSense 광고, Google Analytics 분석 도구, NVIDIA AI API가 포함되어 있습니다. 이들 제3자 서비스의 이용 약관 및 개인정보 처리에 대한 책임은 해당 서비스 제공자에게 있습니다.</p>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">9. 계산 기준 및 출처</h2>
          <p>서비스의 계산 기준은 다음 공식 출처를 기반으로 합니다:</p>
          <ul className="pl-5 my-2 list-disc">
            <li>소득세법 제55조 (종합소득세 누진세율)</li>
            <li>국민연금공단 고시 (2026년 보험료율 9.5%)</li>
            <li>건강보험공단 고시 (2026년 보험료율 7.19%)</li>
            <li>고용보험법 (근로자 부담 0.9%)</li>
            <li>조세특례제한법 제18조의2 (외국인 flat tax 19%)</li>
            <li>금융위원회, 은행연합회 (금융 상품 기준)</li>
            <li>국토교통부 (부동산 중개수수료 요율)</li>
          </ul>

          <h2 className="text-[17px] font-extrabold text-[var(--ink)] mt-7 mb-2.5">10. 문의</h2>
          <p>면책조항에 대한 문의는 아래로 연락해 주세요.</p>
          <p>운영자: 김태양<br/>이메일: taeyang.kim4875@gmail.com</p>

          <p className="text-xs text-[var(--sub)] mt-6">최종 수정일: 2026년 7월 22일</p>
        </div>
      </Card>
    </PageLayout>
  );
}
