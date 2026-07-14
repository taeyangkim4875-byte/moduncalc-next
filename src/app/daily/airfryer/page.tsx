import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AirfryerCalc from "./AirfryerCalc";
export const metadata: Metadata = { title: "에어프라이어 시간·온도 변환기 - 오븐 레시피 변환", description: "오븐 레시피를 에어프라이어용으로 변환하세요. 온도 10~15도 낮추고, 시간 20% 줄이면 됩니다.", alternates: { canonical: "https://moduncalc.com/daily/airfryer" } };
export default function Page() { return <PageLayout eyebrow="요리 변환" title="에어프라이어 시간·온도 변환기" description="오븐 레시피의 온도와 시간을 에어프라이어에 맞게 변환합니다."><CalculatorJsonLd name="에어프라이어 시간·온도 변환기" description="오븐 레시피를 에어프라이어용으로 변환하세요. 온도 10~15도 낮추고, 시간 20% 줄이면 됩니다." url="https://moduncalc.com/daily/airfryer" /><FaqJsonLd items={[{q:"에어프라이어는 예열이 필요한가요?",a:"대부분의 에어프라이어는 3~5분 예열하면 충분합니다. 예열 없이 바로 조리해도 되지만, 예열하면 더 바삭한 결과를 얻을 수 있습니다."},{q:"에어프라이어와 오븐의 차이는 무엇인가요?",a:"에어프라이어는 강력한 팬으로 뜨거운 공기를 빠르게 순환시켜 조리합니다. 오븐보다 공간이 작고 공기 순환이 빨라 같은 온도에서도 더 빨리, 더 바삭하게 조리됩니다."},{q:"중간에 뒤집어야 하나요?",a:"대부분의 음식은 조리 시간의 절반 지점에서 한 번 뒤집거나 흔들어주면 골고루 익습니다. 특히 감자튀감, 치킨너겟 등은 뒤집기가 중요합니다."}]} /><AirfryerCalc /></PageLayout>; }
