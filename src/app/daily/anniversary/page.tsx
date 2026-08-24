import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import AnniversaryCalc from "./AnniversaryCalc";
export const metadata: Metadata = { title: "기념일 계산기 - 연애 100일·200일·1000일 자동 계산", description: "사귄 날짜를 입력하면 100일, 200일, 300일, 500일, 1000일 기념일을 자동 계산합니다.", alternates: { canonical: "https://moduncalc.com/daily/anniversary" } };
export default function Page() { return <PageLayout eyebrow="생활" title="기념일 계산기" description="사귄 날짜를 입력하면 주요 기념일을 자동 계산합니다."><CalculatorJsonLd name="기념일 계산기" description="사귄 날짜를 입력하면 100일, 200일, 300일, 500일, 1000일 기념일을 자동 계산합니다." url="https://moduncalc.com/daily/anniversary" /><FaqJsonLd items={[{q:"기념일은 사귄 날을 1일로 세나요?",a:"네, 한국에서는 사귄 날을 1일로 세는 것이 일반적입니다. 예를 들어 1월 1일에 사귀면 4월 10일이 100일입니다."},{q:"100일과 1주년 중 어떤 게 더 중요한가요?",a:"보통 둘 다 중요하지만, 100일은 한국 특유의 문화이고 1주년은 세계 공통입니다. 커플마다 의미를 부여하는 기준이 다르니 서로 대화로 정하세요."},{q:"1000일은 몇 년 몇 개월인가요?",a:"1000일은 약 2년 8~9개월입니다. 정확한 날짜는 시작일에 따라 달라지며, 이 계산기에서 자동으로 확인할 수 있습니다."}]} /><AnniversaryCalc /></PageLayout>; }
