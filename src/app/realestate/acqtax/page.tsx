import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import AcqTaxCalc from "./AcqTaxCalc";
export const metadata: Metadata = { title: "취득세 계산기 - 주택 매매 취득세·농특세·교육세", description: "주택 매매 시 납부할 취득세, 농어촌특별세, 지방교육세를 계산하세요.", alternates: { canonical: "https://moduncalc.com/realestate/acqtax" } };
export default function Page() { return <PageLayout eyebrow="2026 세율 기준" title="취득세 계산기" description="주택 매매 시 납부할 취득세를 계산해 드려요."><AcqTaxCalc /></PageLayout>; }
