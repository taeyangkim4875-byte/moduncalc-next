'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type PackageSize = 'small' | 'medium' | 'large' | 'xlarge';
type Destination = 'domestic' | 'international';

interface CarrierPrice {
  name: string;
  nameKr: string;
  price: [number, number];
}

const domesticPricing: Record<PackageSize, { label: string; sizeLimit: string; weightLimit: string; carriers: CarrierPrice[] }> = {
  small: {
    label: 'Small',
    sizeLimit: '60cm total',
    weightLimit: '2kg',
    carriers: [
      { name: 'CJ Logistics', nameKr: 'CJ대한통운', price: [3500, 4000] },
      { name: 'Logen', nameKr: '로젠', price: [3500, 3800] },
      { name: 'Hanjin', nameKr: '한진', price: [3800, 4000] },
      { name: 'Korea Post', nameKr: '우체국', price: [3500, 3700] },
    ],
  },
  medium: {
    label: 'Medium',
    sizeLimit: '80cm total',
    weightLimit: '5kg',
    carriers: [
      { name: 'CJ Logistics', nameKr: 'CJ대한통운', price: [4500, 5500] },
      { name: 'Logen', nameKr: '로젠', price: [4500, 5000] },
      { name: 'Hanjin', nameKr: '한진', price: [5000, 5500] },
      { name: 'Korea Post', nameKr: '우체국', price: [4500, 5000] },
    ],
  },
  large: {
    label: 'Large',
    sizeLimit: '120cm total',
    weightLimit: '10kg',
    carriers: [
      { name: 'CJ Logistics', nameKr: 'CJ대한통운', price: [5500, 7000] },
      { name: 'Logen', nameKr: '로젠', price: [5500, 6500] },
      { name: 'Hanjin', nameKr: '한진', price: [6000, 7000] },
      { name: 'Korea Post', nameKr: '우체국', price: [5500, 6500] },
    ],
  },
  xlarge: {
    label: 'Extra Large',
    sizeLimit: '140cm+ total',
    weightLimit: '20kg',
    carriers: [
      { name: 'CJ Logistics', nameKr: 'CJ대한통운', price: [7000, 10000] },
      { name: 'Logen', nameKr: '로젠', price: [7000, 9000] },
      { name: 'Hanjin', nameKr: '한진', price: [8000, 10000] },
      { name: 'Korea Post', nameKr: '우체국', price: [7000, 9000] },
    ],
  },
};

function fmt(n: number) {
  return '₩' + n.toLocaleString();
}

export default function DeliveryFeeCalc() {
  const [size, setSize] = useState<PackageSize>('small');
  const [weight, setWeight] = useState(2);
  const [destination, setDestination] = useState<Destination>('domestic');

  const pricing = domesticPricing[size];
  const cheapest = pricing.carriers.reduce((prev, curr) => (curr.price[0] < prev.price[0] ? curr : prev));

  const sizeOptions: { key: PackageSize; label: string; desc: string }[] = [
    { key: 'small', label: 'Small', desc: '60cm / 2kg' },
    { key: 'medium', label: 'Medium', desc: '80cm / 5kg' },
    { key: 'large', label: 'Large', desc: '120cm / 10kg' },
    { key: 'xlarge', label: 'Extra Large', desc: '140cm+ / 20kg' },
  ];

  const btnClass = (active: boolean) =>
    `flex-1 py-3 px-2 rounded-xl border-[1.5px] text-center cursor-pointer transition-all ${
      active
        ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)] font-bold'
        : 'border-[var(--line)] text-[#4E5968]'
    }`;

  return (
    <>
      <Card>
        <SectionTitle num="1">Package Size</SectionTitle>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {sizeOptions.map(opt => (
            <button key={opt.key} className={btnClass(size === opt.key)} onClick={() => setSize(opt.key)}>
              <div className="text-sm font-bold">{opt.label}</div>
              <div className="text-[10px] text-[var(--sub)]">{opt.desc}</div>
            </button>
          ))}
        </div>

        <SectionTitle num="2">Weight (kg)</SectionTitle>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="range"
            min={1}
            max={30}
            value={weight}
            onChange={e => setWeight(+e.target.value)}
            className="flex-1 accent-[var(--primary)]"
          />
          <div className="w-16 text-center py-2 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-bold">{weight}kg</div>
        </div>

        <SectionTitle num="3">Destination</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          <button className={btnClass(destination === 'domestic')} onClick={() => setDestination('domestic')}>
            <div className="text-sm font-bold">Domestic</div>
            <div className="text-[10px] text-[var(--sub)]">Within Korea</div>
          </button>
          <button className={btnClass(destination === 'international')} onClick={() => setDestination('international')}>
            <div className="text-sm font-bold">International</div>
            <div className="text-[10px] text-[var(--sub)]">Overseas</div>
          </button>
        </div>
      </Card>

      {destination === 'domestic' ? (
        <Card>
          <h2 className="text-base font-extrabold mb-1">Estimated Prices</h2>
          <p className="text-xs text-[var(--sub)] mb-4">{pricing.label} package ({pricing.sizeLimit}, {pricing.weightLimit} max)</p>

          <div className="flex flex-col gap-2 mb-4">
            {pricing.carriers.map((carrier, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-xl border-[1.5px] ${
                  carrier.name === cheapest.name ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)]'
                }`}
              >
                <div>
                  <div className="text-sm font-bold">{carrier.name}</div>
                  <div className="text-xs text-[var(--sub)]">{carrier.nameKr}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-[var(--primary-dark)]">{fmt(carrier.price[0])}~{fmt(carrier.price[1])}</div>
                  {carrier.name === cheapest.name && (
                    <div className="text-[10px] font-bold text-[var(--primary)]">CHEAPEST</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {weight > parseInt(pricing.weightLimit) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
              Your package ({weight}kg) exceeds the {pricing.weightLimit} limit for {pricing.label.toLowerCase()} size. Consider selecting a larger size or expect surcharges.
            </div>
          )}
        </Card>
      ) : (
        <Card>
          <h2 className="text-base font-extrabold mb-2">International Shipping</h2>
          <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
            <p>International shipping from Korea varies widely by destination and carrier. For the best rates:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><b>Korea Post (우체국):</b> EMS is the most popular option. ~₩20,000~50,000 for 1kg depending on destination. Track at epost.go.kr</li>
              <li><b>CJ Logistics International:</b> Available for select countries. Often competitive for heavier packages.</li>
              <li><b>Private couriers:</b> DHL, FedEx, UPS available but significantly more expensive (₩50,000+).</li>
              <li><b>Ship (선편):</b> Cheapest but slowest (4-8 weeks). ~₩10,000~20,000 for 1kg. Good for non-urgent items.</li>
            </ul>
            <p className="text-xs text-[var(--sub)]">Visit your nearest post office (우체국) for exact international rates and packaging requirements.</p>
          </div>
        </Card>
      )}

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">How to Send Packages in Korea</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Convenience Store Pickup (편의점 택배):</b> The easiest way to send a package. Visit CU, GS25, or 7-Eleven, tell the cashier &quot;택배 보내려고요&quot; (I want to send a package). Fill out the label, pay, and done. They handle pickup.</p>
          <p><b>Door-to-door Pickup (방문 수거):</b> Use the CJ대한통운 app or call 1588-1255 to schedule a pickup at your home. Usually same-day if ordered before noon. ₩500~1,000 extra.</p>
          <p><b>Delivery Lockers (무인 택배함):</b> Found in most apartment buildings (아파트). Couriers leave packages here when you are not home. Check the code via text message.</p>
          <p><b>Post Office (우체국):</b> Best for international mail and registered packages. Bring your ARC (외국인등록증) for international shipping. Staff can help with customs forms.</p>
          <p><b>Useful Korean Phrases:</b></p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>&quot;택배 보내려고요&quot; - I want to send a package</li>
            <li>&quot;운송장 번호가 뭐예요?&quot; - What is the tracking number?</li>
            <li>&quot;배송 조회 해주세요&quot; - Please check the delivery status</li>
            <li>&quot;착불이에요 / 선불이에요&quot; - Cash on delivery / Prepaid</li>
          </ul>
          <p><b>Tracking Packages:</b> Every Korean delivery comes with a tracking number (운송장 번호). Enter it on the carrier&apos;s website or use the Naver search bar: just paste the number and it auto-detects the carrier.</p>
        </div>
      </Card>
    </>
  );
}
