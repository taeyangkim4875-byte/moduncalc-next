import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import DeliveryFeeCalc from "./DeliveryFeeCalc";

export const metadata: Metadata = {
  title: "Korea Delivery & Shipping Cost Calculator - 택배비 Guide",
  description: "Shipping a package in Korea? Compare 택배 prices: CJ, Logen, Hanjin, Post Office. Small package from ₩3,500.",
  alternates: { canonical: "https://moduncalc.com/en/delivery-fee" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Delivery & Shipping Cost Calculator" description="Compare 택배 (delivery) prices by package size, weight, and carrier.">
      <CalculatorJsonLd name="Korea Delivery Cost Calculator" description="Compare shipping costs across major Korean delivery companies including CJ대한통운, 로젠, 한진, and 우체국." url="https://moduncalc.com/en/delivery-fee" />
      <FaqJsonLd items={[
        { q: "How much does it cost to send a package in Korea?", a: "Domestic shipping in Korea (택배) typically costs ₩3,500~10,000 depending on size and weight. A small package under 2kg starts at around ₩3,500, while large packages up to 20kg can cost ₩7,000~10,000. Convenience store drop-off is the easiest method." },
        { q: "What is the cheapest way to send a package in Korea?", a: "For domestic shipping, 우체국 (Korea Post) is often the cheapest for small packages. For larger items, CJ대한통운 and 로젠 are competitive. Sending from a convenience store (편의점 택배) is convenient and similarly priced. Comparing carriers using our calculator helps find the best rate." },
        { q: "How do I send a package from a Korean convenience store?", a: "Visit any CU, GS25, or 7-Eleven and tell the cashier you want to send a package (택배 보내려고요). Fill out the shipping label with sender/receiver info, pay the fee, and they will arrange pickup. You can also use the convenience store's app for door-to-door pickup service." },
      ]} />
      <DeliveryFeeCalc />
    </PageLayout>
  );
}
