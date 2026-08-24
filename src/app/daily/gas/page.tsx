import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import GasCalc from "./GasCalc";
export const metadata: Metadata = { title: "도시가스 요금 계산기 - 난방비 · 가스비 자동 계산 (2026)", description: "월 도시가스 사용량으로 가스요금을 계산하세요. 난방용·취사용 구분, MJ 기준 요금 자동 계산.", alternates: { canonical: "https://moduncalc.com/daily/gas" } };
export default function Page() { return <PageLayout eyebrow="생활" title="도시가스 요금 계산기" description="월 사용량을 입력하면 난방비·가스비를 자동 계산합니다."><CalculatorJsonLd name="도시가스 요금 계산기" description="월 도시가스 사용량으로 가스요금을 계산하세요. 난방용·취사용 구분, MJ 기준 요금 자동 계산." url="https://moduncalc.com/daily/gas" /><FaqJsonLd items={[{q:"열량환산계수란?",a:"가스 1㎥당 발생하는 열량(MJ)입니다. 지역·계절에 따라 42~44 MJ/㎥ 범위이며, 가스 고지서에서 확인할 수 있습니다."},{q:"난방용과 취사용 요금이 다른 이유는?",a:"용도별로 공급 원가와 기본료가 다르게 책정됩니다. 취사용이 소량 사용이지만 단가가 약간 높은 편입니다."},{q:"겨울 난방비가 갑자기 많이 나온 이유는?",a:"난방 사용량 증가뿐 아니라 열량환산계수가 겨울에 높아지는 경향이 있어 이중으로 요금이 올라갑니다. 또한 배관 노후로 열효율이 떨어질 수 있습니다."}]} /><GasCalc /></PageLayout>; }
