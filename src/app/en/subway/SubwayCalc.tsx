'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

const commonRoutes = [
  { from: 'Seoul Station', to: 'Gangnam', km: 13, line: 'Line 4 + Line 2' },
  { from: 'Hongdae', to: 'Myeongdong', km: 7, line: 'Line 2 + Line 4' },
  { from: 'Incheon Airport', to: 'Seoul Station', km: 58, line: 'AREX' },
  { from: 'Itaewon', to: 'Dongdaemun', km: 6, line: 'Line 6 + Line 4' },
  { from: 'Gangnam', to: 'Jamsil', km: 7, line: 'Line 2' },
  { from: 'Hongdae', to: 'Gangnam', km: 16, line: 'Line 2' },
  { from: 'Seoul Station', to: 'Yongsan', km: 2, line: 'Line 1' },
  { from: 'Sinchon', to: 'Yeouido', km: 8, line: 'Line 2 + Line 5' },
];

function calcFare(distKm: number, isTmoney: boolean): number {
  const baseFare = isTmoney ? 1250 : 1350;
  if (distKm <= 10) return baseFare;
  let extra = 0;
  if (distKm <= 50) {
    extra = Math.ceil((distKm - 10) / 5) * 100;
  } else {
    extra = Math.ceil((50 - 10) / 5) * 100;
    extra += Math.ceil((distKm - 50) / 8) * 100;
  }
  return baseFare + extra;
}

export default function SubwayCalc() {
  const [distance, setDistance] = useState(10);
  const [isTmoney, setIsTmoney] = useState(true);

  const dist = distance || 0;
  const fare = calcFare(dist, isTmoney);
  const travelMin = Math.round(dist * 2.5);
  const approxStations = Math.max(1, Math.round(dist / 1.5));

  return (
    <>
      <Card>
        <SectionTitle num="1">Distance &amp; Card Type</SectionTitle>
        <div className="mb-4">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Distance (km)</label>
          <input
            type="number"
            min={1}
            max={60}
            value={distance}
            onChange={e => setDistance(+e.target.value)}
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"
          />
        </div>
        <div className="mb-2">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">Card Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsTmoney(true)}
              className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${isTmoney ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}
            >
              T-money Card
            </button>
            <button
              onClick={() => setIsTmoney(false)}
              className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${!isTmoney ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}
            >
              Single Ticket
            </button>
          </div>
        </div>
      </Card>

      <Card className="!p-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Fare</div>
            <div className="text-[28px] font-extrabold text-[var(--primary-dark)]">{fare.toLocaleString()}</div>
            <div className="text-xs text-[var(--sub)]">KRW</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Travel Time</div>
            <div className="text-[28px] font-extrabold text-[var(--primary-dark)]">~{travelMin}</div>
            <div className="text-xs text-[var(--sub)]">minutes</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Stations</div>
            <div className="text-[28px] font-extrabold text-[var(--primary-dark)]">~{approxStations}</div>
            <div className="text-xs text-[var(--sub)]">approx.</div>
          </div>
        </div>
        {!isTmoney && (
          <p className="text-xs text-[var(--sub)] mt-3 text-center">Single ticket includes a refundable deposit of 500 KRW.</p>
        )}
      </Card>

      <Card>
        <SectionTitle num="2">Common Routes &amp; Fares</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] text-[var(--sub)] uppercase">
                <th className="pb-2">Route</th>
                <th className="pb-2 text-center">km</th>
                <th className="pb-2 text-right">T-money</th>
              </tr>
            </thead>
            <tbody>
              {commonRoutes.map((r, i) => (
                <tr key={i} className="border-t border-[var(--line)]">
                  <td className="py-2 font-bold text-xs">{r.from} &rarr; {r.to}</td>
                  <td className="py-2 text-center text-xs text-[var(--sub)]">{r.km}</td>
                  <td className="py-2 text-right text-xs font-bold">{calcFare(r.km, true).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Guide: Using Seoul Metro</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>T-money Card (티머니)</b>: A rechargeable transit card available at every convenience store (GS25, CU, 7-Eleven) for 2,500 KRW. It saves 100 KRW per ride compared to single tickets and works on buses too. You can refund the remaining balance at convenience stores when leaving Korea.</p>
          <p><b>Free transfers</b>: When you tap your T-money card, transfers between subway and bus are free within 30 minutes of tapping off. You can transfer up to 4 times on a single fare. This makes T-money essential for cost-effective travel.</p>
          <p><b>Last train times</b>: Most lines run from approximately 5:30 AM to midnight. Last trains typically depart terminal stations around 11:00-11:30 PM. On Friday and Saturday nights, some lines extend service by about 1 hour. Always check the Kakao Metro or Naver Map app for exact times.</p>
          <p><b>Useful apps</b>: Kakao Metro (subway-only navigation), Naver Map (comprehensive transit + walking), KakaoMap (similar to Naver Map). All three work well in English. Google Maps has limited transit data in Korea, so use Naver Map or KakaoMap instead.</p>
          <p><b>Fare structure</b>: The base fare (1,250 KRW with T-money) covers the first 10 km. After that, 100 KRW is added for every 5 km up to 50 km, and 100 KRW for every 8 km beyond 50 km. Children (6-12) and teens (13-18) get discounted fares.</p>
          <p><b>Tips for tourists</b>: Consider the Seoul Metro 1-day pass (5,000 KRW) or multi-day passes if you plan heavy subway use. The Discover Seoul Pass also includes unlimited transit. During rush hours (7:30-9:00 AM, 6:00-7:30 PM), trains are very crowded - plan accordingly.</p>
        </div>
      </Card>
    </>
  );
}
