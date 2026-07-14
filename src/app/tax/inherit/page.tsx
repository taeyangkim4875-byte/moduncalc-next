import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import InheritTaxCalc from "./InheritTaxCalc";
export const metadata: Metadata = { title: "상속세 계산기 - 2026 상속세율 · 공제 자동 계산", description: "상속재산가액을 입력하면 상속세를 자동 계산합니다. 기초공제, 배우자공제, 일괄공제, 누진세율 반영.", alternates: { canonical: "https://moduncalc.com/tax/inherit" } };
export default function Page() { return <PageLayout eyebrow="세금" title="상속세 계산기" description="상속재산과 상속인 정보를 입력하면 상속세를 실시간으로 계산합니다."><CalculatorJsonLd name="상속세 계산기" description="상속재산가액을 입력하면 상속세를 자동 계산합니다. 기초공제, 배우자공제, 일괄공제, 누진세율 반영." url="https://moduncalc.com/tax/inherit" /><FaqJsonLd items={[{q:"상속세 신고 기한은?",a:"상속 개시일(사망일)이 속하는 달의 말일부터 6개월 이내입니다. 기한 내 신고 시 3% 세액공제를 받을 수 있습니다."},{q:"상속세를 분할 납부할 수 있나요?",a:"납부할 세액이 1,000만원 초과 시 2개월 이내 분납 가능하며, 2,000만원 초과 시 연부연납(최대 5년)도 가능합니다."},{q:"일괄공제와 기초+인적공제 중 어떤 것을 선택해야 하나요?",a:"기초공제(2억)+인적공제 합계와 일괄공제(5억) 중 큰 금액을 선택할 수 있습니다."},{q:"부동산도 상속세 과세 대상인가요?",a:"네. 부동산, 금융재산, 보험금 등 피상속인의 모든 재산이 과세 대상입니다."}]} /><InheritTaxCalc /></PageLayout>; }
