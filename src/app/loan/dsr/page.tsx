import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DsrCalc from "./DsrCalc";
export const metadata: Metadata = { title: "DSR 계산기 - 대출 한도 확인 · 총부채원리금상환비율 (2026)", description: "내 DSR은 몇 %? 대출 얼마까지 가능할까? 연소득·기존 대출 입력하면 한도 바로 확인.", alternates: { canonical: "https://moduncalc.com/loan/dsr" } };
export default function Page() { return <PageLayout eyebrow="대출" title="DSR 계산기" description="연소득과 대출 정보로 DSR을 계산하고 대출 가능 한도를 확인하세요."><CalculatorJsonLd name="DSR 계산기" description="연소득과 기존 대출로 DSR을 계산하고 대출 가능 한도를 확인하세요. 40% / 50% / 60% 규제 기준 반영." url="https://moduncalc.com/loan/dsr" /><FaqJsonLd items={[{q:"DSR과 DTI의 차이는?",a:"DTI는 주담대의 원리금 + 기타 대출의 이자만 합산하지만, DSR은 모든 대출의 원리금을 합산합니다. DSR이 더 엄격한 기준입니다."},{q:"전세자금대출도 DSR에 포함되나요?",a:"네, 전세자금대출의 원리금 상환액도 DSR 계산에 포함됩니다. 다만 일부 정책 대출은 예외가 있을 수 있습니다."},{q:"카드론·마이너스통장도 포함되나요?",a:"네, 카드론은 만기 일시상환으로 간주해 원리금을 계산하며, 마이너스통장 한도도 DSR에 포함됩니다."}]} /><DsrCalc /></PageLayout>; }
