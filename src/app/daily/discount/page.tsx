import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DiscountCalc from "./DiscountCalc";
export const metadata: Metadata = { title: "할인가 계산기 - 할인율·1+1 단가 비교", description: "할인율 적용가와 1+1, 2+1 단가를 비교하세요.", alternates: { canonical: "https://moduncalc.com/daily/discount" } };
export default function Page() { return <PageLayout eyebrow="쇼핑 계산" title="할인가 계산기" description="할인율 적용가와 1+1/2+1 단가를 비교해요."><CalculatorJsonLd name="할인가 계산기" description="할인율 적용가와 1+1, 2+1 단가를 비교하세요." url="https://moduncalc.com/daily/discount" /><FaqJsonLd items={[{q:"이중 할인은 어떻게 계산하나요?",a:"두 할인율을 순차 적용합니다. 20%+10%는 28% 할인이 됩니다 (1×0.8×0.9=0.72)."},{q:"1+1과 50% 할인 중 어느 게 유리한가요?",a:"결과적으로 동일합니다. 1+1은 2개 구매 시 개당 50% 할인과 같습니다."}]} /><DiscountCalc /></PageLayout>; }
