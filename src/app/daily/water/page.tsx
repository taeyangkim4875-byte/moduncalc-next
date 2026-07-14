import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import WaterCalc from "./WaterCalc";
export const metadata: Metadata = { title: "수도요금 계산기 - 2026 가정용 수도요금 자동 계산", description: "월 사용량으로 수도요금을 계산하세요. 상수도 + 하수도 + 물이용부담금 포함.", alternates: { canonical: "https://moduncalc.com/daily/water" } };
export default function Page() { return <PageLayout eyebrow="생활" title="수도요금 계산기" description="월 사용량을 입력하면 상수도·하수도·물이용부담금을 자동 계산합니다."><CalculatorJsonLd name="수도요금 계산기" description="월 사용량으로 수도요금을 계산하세요. 상수도 + 하수도 + 물이용부담금 포함." url="https://moduncalc.com/daily/water" /><FaqJsonLd items={[{q:"수도요금은 지역마다 다른가요?",a:"네, 지방자치단체마다 상수도 및 하수도 요금 체계가 다릅니다. 이 계산기는 서울 기준이며, 지방은 5~20% 차이가 날 수 있습니다."},{q:"4인 가구 평균 수도 사용량은?",a:"4인 가구 기준 월 평균 약 18~22㎥ 정도 사용합니다. 1인당 약 5㎥ 수준입니다."},{q:"하수도 요금은 왜 따로 부과되나요?",a:"사용한 물을 하수처리장에서 정화하는 비용입니다. 상수도와 별도로 부과되며, 대부분 상수도 요금과 비슷한 수준입니다."}]} /><WaterCalc /></PageLayout>; }
