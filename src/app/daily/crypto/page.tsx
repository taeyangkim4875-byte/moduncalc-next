import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CryptoCalc from "./CryptoCalc";

export const metadata: Metadata = {
  title: "비트코인 수익률 계산기 - 가상자산 투자 손익 계산",
  description: "매수가와 현재가로 비트코인·가상자산 수익률을 계산하세요. 투자금, 수량, 수수료 반영.",
  alternates: { canonical: "https://moduncalc.com/daily/crypto" },
  openGraph: {
    title: "비트코인 수익률 계산기 - 가상자산 투자 손익 계산",
    description: "매수가와 현재가로 비트코인·가상자산 수익률을 계산하세요. 투자금, 수량, 수수료 반영.",
    url: "https://moduncalc.com/daily/crypto",
  },
};

export default function Page() {
  return (
    <PageLayout eyebrow="생활" title="비트코인 수익률 계산기" description="매수가, 수량, 현재가를 입력하면 수익률과 실수익을 계산합니다.">
      <CalculatorJsonLd name="비트코인 수익률 계산기" description="매수가와 현재가로 비트코인·가상자산 수익률을 계산하세요. 투자금, 수량, 수수료 반영." url="https://moduncalc.com/daily/crypto" />
      <FaqJsonLd items={[
        { q: "가상자산 수익에 세금이 부과되나요?", a: "가상자산 과세는 여러 차례 유예되어 2027년 시행 예정이었으나 추가 유예 가능성이 있습니다. 시행 시 연 250만원 초과 수익에 22%(지방세 포함)가 과세됩니다." },
        { q: "거래소 수수료는 얼마인가요?", a: "업비트 0.05%, 빗썸 0.04%(쿠폰 적용 시 0.01%), 코인원 0.2%, 바이낸스 0.1%가 기본입니다. 거래소와 결제 수단에 따라 다를 수 있습니다." },
        { q: "수익률은 어떻게 계산하나요?", a: "수익률 = (현재가 - 매수가) / 매수가 × 100입니다. 수수료를 반영한 실수익은 매수·매도 수수료를 차감한 후 계산됩니다." },
      ]} />
      <CryptoCalc />
    </PageLayout>
  );
}
