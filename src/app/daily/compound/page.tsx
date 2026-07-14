import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import CompoundCalc from "./CompoundCalc";
export const metadata: Metadata = { title: "복리 계산기 - 원금 · 이자 · 투자 기간별 수익 시뮬레이션", description: "원금, 연이율, 투자 기간으로 복리 수익을 계산하세요. 월 적립식도 지원. 72의 법칙으로 원금 2배 기간도 확인.", alternates: { canonical: "https://moduncalc.com/daily/compound" } };
export default function Page() { return <PageLayout eyebrow="투자 계산" title="복리 계산기" description="원금, 연이율, 투자 기간을 입력하면 복리 수익과 72의 법칙 결과를 보여드립니다."><CalculatorJsonLd name="복리 계산기" description="원금, 연이율, 투자 기간으로 복리 수익을 계산하세요. 월 적립식도 지원. 72의 법칙으로 원금 2배 기간도 확인." url="https://moduncalc.com/daily/compound" /><FaqJsonLd items={[{q:"72의 법칙이란 무엇인가요?",a:"72의 법칙은 투자 원금이 2배가 되는 데 걸리는 시간을 간단히 구하는 방법입니다. 72를 연이율(%)로 나누면 됩니다. 예를 들어 연 8% 수익률이면 72 / 8 = 약 9년이 걸립니다."},{q:"단리와 복리의 차이는 무엇인가요?",a:"단리는 원금에만 이자가 붙고, 복리는 원금 + 이전 이자에도 이자가 붙습니다. 기간이 길어질수록 복리의 효과가 기하급수적으로 커집니다."},{q:"월 적립식 투자는 어떻게 계산되나요?",a:"매월 일정 금액을 추가 투자하는 방식입니다. 각 월 적립금에도 복리가 적용되어, 초기 목돈 없이도 장기적으로 큰 자산을 만들 수 있습니다."}]} /><CompoundCalc /></PageLayout>; }
