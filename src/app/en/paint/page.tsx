import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PaintCalcEn from "./PaintCalcEn";

export const metadata: Metadata = {
  title: "Paint Calculator - How Much Paint Do I Need? (Room Size to Liters)",
  description: "How many liters of paint do I need? Enter room size — get exact paint & wallpaper quantities with cost estimate.",
  alternates: { canonical: "https://moduncalc.com/en/paint" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Daily" title="Paint Calculator" description="Calculate paint and wallpaper needed for your room.">
      <CalculatorJsonLd name="Paint Calculator" description="Calculate how much paint and wallpaper you need based on room dimensions." url="https://moduncalc.com/en/paint" />
      <FaqJsonLd items={[
        { q: "How much area does 1 liter of paint cover?", a: "One liter of paint typically covers about 6-8 square meters per coat, depending on the paint type and surface texture. Two coats are recommended for best results, so plan for about 3-4 sq meters per liter in practice." },
        { q: "How many rolls of wallpaper do I need?", a: "A standard Korean wallpaper roll (실크벽지) is 1.06m wide and about 15.6m long, covering roughly 5 pyeong (16.5 sq meters) of wall area. Count your walls, subtract windows and doors, and divide by the roll coverage." },
        { q: "Is it cheaper to paint or wallpaper in Korea?", a: "Paint is generally cheaper for materials (about 30,000-50,000 won for a room) but requires more labor. Korean-style wallpaper (도배) is the traditional choice and typically costs 150,000-300,000 won per room including installation. Most Korean apartments use wallpaper." },
      ]} />
      <PaintCalcEn />
    </PageLayout>
  );
}
