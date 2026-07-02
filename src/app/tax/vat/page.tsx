import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import VatCalc from "./VatCalc";
export const metadata: Metadata = { title: "부가세 계산기 - 공급가액·부가세 역산", description: "공급가액 또는 합계금액에서 부가세를 계산하세요.", alternates: { canonical: "https://moduncalc.com/tax/vat" } };
export default function Page() { return <PageLayout eyebrow="부가가치세 10%" title="부가세 계산기" description="공급가액 또는 합계금액에서 부가세를 역산해요."><VatCalc /></PageLayout>; }
