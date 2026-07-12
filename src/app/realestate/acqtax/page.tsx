import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AcqTaxCalc from "./AcqTaxCalc";
export const metadata: Metadata = { title: "취득세 계산기 - 주택 매매 취득세·농특세·교육세", description: "주택 매매 시 납부할 취득세, 농어촌특별세, 지방교육세를 계산하세요.", alternates: { canonical: "https://moduncalc.com/realestate/acqtax" } };
export default function Page() { return <PageLayout eyebrow="2026 세율 기준" title="취득세 계산기" description="주택 매매 시 납부할 취득세를 계산해 드려요."><CalculatorJsonLd name="취득세 계산기" description="주택 매매 시 납부할 취득세, 농어촌특별세, 지방교육세를 계산하세요." url="https://moduncalc.com/realestate/acqtax" /><FaqJsonLd items={[{q:"생애 첫 주택 취득세 감면이 있나요?",a:"수도권 4억 이하, 비수도권 3억 이하 주택은 취득세 50~100% 감면 가능합니다."},{q:"다주택자 중과세율은 어떻게 되나요?",a:"조정대상지역 2주택 8%, 3주택 이상 12%가 적용됩니다."},{q:"전용면적 85㎡ 이하이면 어떤 혜택이 있나요?",a:"농어촌특별세가 면제됩니다."}]} /><AcqTaxCalc /></PageLayout>; }
