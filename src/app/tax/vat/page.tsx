import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import VatCalc from "./VatCalc";
export const metadata: Metadata = { title: "부가세 계산기 - 공급가액·부가세 역산", description: "공급가액 또는 합계금액에서 부가세를 계산하세요.", alternates: { canonical: "https://moduncalc.com/tax/vat" } };
export default function Page() { return <PageLayout eyebrow="부가가치세 10%" title="부가세 계산기" description="공급가액 또는 합계금액에서 부가세를 역산해요."><CalculatorJsonLd name="부가세 계산기" description="공급가액 또는 합계금액에서 부가세를 계산하세요." url="https://moduncalc.com/tax/vat" /><FaqJsonLd items={[{q:"부가세 포함가에서 공급가를 구하는 공식은?",a:"합계금액 ÷ 1.1 = 공급가액, 합계금액 - 공급가액 = 부가세입니다."},{q:"부가세가 면제되는 품목이 있나요?",a:"기본 식료품, 의료, 교육, 도서 등은 부가세가 면제됩니다."}]} /><VatCalc /></PageLayout>; }
