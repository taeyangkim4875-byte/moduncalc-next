import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import MoveInCostCalc from "./MoveInCostCalc";

export const metadata: Metadata = {
  title: "Korea Move-in Cost Calculator - Deposit, Agent Fee & Setup Costs",
  description: "How much to move into a Korean apartment? Calculate deposit + agent fee + utility setup. Know your total before signing.",
  alternates: { canonical: "https://moduncalc.com/en/move-in-cost" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korea Move-in Cost Calculator" description="Calculate your total move-in costs for a Korean apartment, including deposit, agent fee, and setup expenses.">
      <CalculatorJsonLd name="Korea Move-in Cost Calculator" description="Calculate total move-in costs for Korean apartments including deposit, agent commission, utility setup, and first month expenses." url="https://moduncalc.com/en/move-in-cost" />
      <FaqJsonLd items={[
        { q: "How much does it cost to move into a Korean apartment?", a: "Total move-in costs vary widely. For a Wolse (monthly rent) apartment, expect to pay 1-2 months deposit (보증금), first month's rent, agent fee (0.3-0.5% of deposit), plus ₩300,000-500,000 for utility setup, lock change, and moving service. For Jeonse (lump-sum deposit), the deposit alone can be ₩100,000,000-300,000,000 but you pay no monthly rent." },
        { q: "What is the real estate agent fee in Korea?", a: "Agent fees (중개수수료) in Korea are legally capped based on the transaction amount. For monthly rent (Wolse) contracts, the fee is typically 0.3-0.4% of (deposit + monthly rent × 100). For Jeonse, it's 0.3-0.8% of the deposit. The exact rate depends on the transaction value bracket set by Korean law." },
        { q: "What hidden costs should I watch for when renting in Korea?", a: "Common hidden costs include: maintenance fee (관리비, ₩50,000-200,000/month), utility deposits for electricity/gas/water (~₩100,000), internet installation (~₩30,000), door lock replacement (₩100,000-200,000), and moving service (₩200,000-500,000). Always ask about 관리비 before signing as it can significantly increase your monthly expenses." },
      ]} />
      <MoveInCostCalc />
    </PageLayout>
  );
}
