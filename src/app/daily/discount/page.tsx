import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import DiscountCalc from "./DiscountCalc";
export const metadata: Metadata = { title: "할인가 계산기 - 할인율·1+1 단가 비교", description: "할인율 적용가와 1+1, 2+1 단가를 비교하세요.", alternates: { canonical: "https://moduncalc.com/daily/discount" } };
export default function Page() { return <PageLayout eyebrow="쇼핑 계산" title="할인가 계산기" description="할인율 적용가와 1+1/2+1 단가를 비교해요."><DiscountCalc /></PageLayout>; }
