import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import Baby100Calc from "./Baby100Calc";
export const metadata: Metadata = { title: "아기 100일 계산기 - 백일·돌·기념일 자동 계산", description: "아기 생년월일을 입력하면 100일, 200일, 돌, 주요 기념일을 자동 계산합니다.", alternates: { canonical: "https://moduncalc.com/daily/baby100" } };
export default function Page() { return <PageLayout eyebrow="생활" title="아기 100일 계산기" description="아기 생년월일을 입력하면 백일, 돌 등 주요 기념일을 자동 계산합니다."><CalculatorJsonLd name="아기 100일 계산기" description="아기 생년월일을 입력하면 100일, 200일, 돌, 주요 기념일을 자동 계산합니다." url="https://moduncalc.com/daily/baby100" /><FaqJsonLd items={[{q:"백일은 어떻게 세나요?",a:"태어난 날을 1일로 세어 100번째 되는 날입니다. 예를 들어 1월 1일생이면 4월 10일이 백일입니다."},{q:"돌과 첫 번째 생일은 같은 건가요?",a:"보통 같은 날이지만, 엄밀히 돌은 태어난 지 365일째 되는 날이고 생일은 같은 월일입니다. 윤년 등에 의해 하루 차이가 날 수 있습니다."},{q:"아기 개월 수는 어떻게 계산하나요?",a:"만 나이 기준으로, 태어난 달의 같은 날짜가 지나야 1개월이 됩니다. 예를 들어 3월 15일생은 4월 15일에 만 1개월입니다."}]} /><Baby100Calc /></PageLayout>; }
