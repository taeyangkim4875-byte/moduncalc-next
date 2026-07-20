import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AlcoholCalc from "./AlcoholCalc";
export const metadata: Metadata = { title: "음주 후 운전 가능 시간 계산기 - 혈중알코올 분해 시간", description: "소주 한 병 마셨는데 언제 운전 가능? 음주량·체중 입력하면 혈중알코올 분해 시간 바로 계산.", alternates: { canonical: "https://moduncalc.com/daily/alcohol" } };
export default function Page() { return <PageLayout eyebrow="음주 계산" title="음주 후 운전 가능 시간 계산기" description="음주량, 체중, 성별을 입력하면 혈중알코올농도와 운전 가능 시간을 추정합니다."><CalculatorJsonLd name="음주 후 운전 가능 시간 계산기" description="술 마신 후 운전 가능한 시간을 계산하세요. 음주량, 체중, 성별 기반 혈중알코올농도 추정 및 분해 시간 계산." url="https://moduncalc.com/daily/alcohol" /><FaqJsonLd items={[{q:"혈중알코올농도 0.03%면 어떤 처벌을 받나요?",a:"혈중알코올농도 0.03% 이상 0.08% 미만은 면허정지 처분을 받으며, 1년 이하의 징역 또는 500만원 이하의 벌금이 부과됩니다."},{q:"음주 후 해장국을 먹으면 알코올이 빨리 분해되나요?",a:"해장국은 위장을 보호하고 수분을 보충해 숙취 해소에 도움이 되지만, 알코올 분해 속도 자체를 빠르게 하지는 않습니다. 시간만이 유일한 해결책입니다."},{q:"이 계산기의 결과를 법적 근거로 사용할 수 있나요?",a:"아닙니다. 이 계산기는 Widmark 공식에 기반한 추정치이며, 실제 혈중알코올농도는 체질, 음식 섭취, 컨디션 등에 따라 크게 달라질 수 있습니다. 참고용으로만 사용하세요."}]} /><AlcoholCalc /></PageLayout>; }
