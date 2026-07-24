import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import WeatherGuide from "./WeatherGuide";

export const metadata: Metadata = {
  title: "Korea Weather & Seasons Guide - What to Expect Each Month",
  description: "What's the weather like in Korea? Monthly temperature guide, what to pack, and seasonal tips for foreigners.",
  alternates: { canonical: "https://moduncalc.com/en/weather" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Living in Korea" title="Korea Weather & Seasons Guide" description="Monthly temperatures, rainfall, what to wear, and seasonal highlights — everything you need to plan for Korea's weather.">
      <CalculatorJsonLd name="Korea Weather & Seasons Guide" description="Interactive monthly weather reference for Korea with temperatures, rainfall, packing guide, and seasonal tips for foreigners." url="https://moduncalc.com/en/weather" />
      <FaqJsonLd items={[
        { q: "What is the best time to visit Korea?", a: "The best times to visit Korea are spring (April-May) and autumn (September-November). April brings cherry blossoms (벚꽃) with pleasant temperatures of 10-20°C. October offers stunning autumn foliage (단풍) with comfortable 8-19°C weather. Avoid July-August unless you enjoy extreme heat and humidity (30-38°C), and late June through July is monsoon season (장마) with heavy rainfall. Winter (December-February) is very cold (-10 to 2°C) but great for skiing and holiday illuminations." },
        { q: "What is yellow dust (황사) and fine dust (미세먼지) in Korea?", a: "Yellow dust (황사/hwangsa) is sand blown from the Gobi and Manchurian deserts that affects Korea mainly in spring (March-May). Fine dust (미세먼지/misemeonji) is air pollution that can occur year-round but is worst in winter and spring. On bad days, outdoor activities are not recommended. Check the AirKorea (에어코리아) app or Misemeonji app for real-time levels. Wear KF94 masks (available at all convenience stores and pharmacies for ₩1,000-2,000) when levels are 'Bad' (나쁨) or worse." },
        { q: "How should I prepare for Korean summers?", a: "Korean summers (June-August) are extremely hot and humid, with temperatures of 28-38°C and humidity reaching 80%+. The monsoon (장마) brings heavy rain from mid-June to late July. Prepare by: (1) Bringing light, breathable clothing and a rain jacket, (2) Carrying a portable fan (휴대용 선풍기, available at Daiso for ₩3,000-5,000), (3) Using sunscreen SPF50+ daily, (4) Staying hydrated — buy drinks at any convenience store, (5) Taking advantage of Korea's strong air conditioning in buildings, subways, and buses." },
      ]} />
      <WeatherGuide />
    </PageLayout>
  );
}
