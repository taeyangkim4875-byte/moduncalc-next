import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DueDateCalc from "./DueDateCalc";
export const metadata: Metadata = { title: "출산 예정일 계산기 - 임신 주수 · 예정일 자동 계산", description: "마지막 생리 시작일로 출산 예정일과 현재 임신 주수를 계산하세요. 주요 검진 일정도 안내합니다.", alternates: { canonical: "https://moduncalc.com/daily/due-date" } };
export default function Page() { return <PageLayout eyebrow="출산 계산" title="출산 예정일 계산기" description="마지막 생리일 또는 배란일로 출산 예정일과 현재 임신 주수를 계산합니다."><CalculatorJsonLd name="출산 예정일 계산기" description="마지막 생리 시작일로 출산 예정일과 현재 임신 주수를 계산하세요. 주요 검진 일정도 안내합니다." url="https://moduncalc.com/daily/due-date" /><FaqJsonLd items={[{q:"출산 예정일은 정확한가요?",a:"출산 예정일은 네겔레 공식에 의한 추정일입니다. 실제 출산일은 예정일 전후 2주 이내가 정상 범위이며, 정확히 예정일에 출산하는 비율은 약 5%입니다."},{q:"배란일 기준과 생리일 기준 중 어느 것이 더 정확한가요?",a:"배란일을 정확히 알고 있다면 배란일 기준이 더 정확할 수 있습니다. 하지만 대부분 배란일을 정확히 알기 어려워 마지막 생리 시작일 기준을 많이 사용합니다."},{q:"임신 주수는 어떻게 계산하나요?",a:"마지막 생리 시작일부터 오늘까지의 일수를 7로 나누어 계산합니다. 생리일 기준이므로 실제 수정은 약 2주 후에 이루어진 것으로 봅니다."}]} /><DueDateCalc /></PageLayout>; }
