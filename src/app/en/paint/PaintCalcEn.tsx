'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function PaintCalcEn() {
  const [roomWidth, setRoomWidth] = useState(3.3);
  const [roomLength, setRoomLength] = useState(4.0);
  const [roomHeight, setRoomHeight] = useState(2.4);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(1);
  const [coats, setCoats] = useState(2);
  const [mode, setMode] = useState<'paint' | 'wallpaper'>('paint');

  const w = roomWidth || 0;
  const l = roomLength || 0;
  const h = roomHeight || 0;
  const d = doors || 0;
  const win = windows || 0;
  const c = coats || 0;

  const wallArea = 2 * (w + l) * h;
  const doorArea = d * 1.9 * 0.9;
  const windowArea = win * 1.5 * 1.2;
  const ceilingArea = w * l;
  const netWallArea = Math.max(0, wallArea - doorArea - windowArea);
  const totalPaintArea = netWallArea + ceilingArea;

  // Paint: ~8 sq m per liter per coat
  const coveragePerLiter = 8;
  const litersNeeded = (totalPaintArea * c) / coveragePerLiter;
  const paintCans18L = Math.ceil(litersNeeded / 18);
  const paintCans4L = Math.ceil(litersNeeded / 4);

  // Wallpaper: standard Korean roll 1.06m x 15.6m = ~16.5 sq m per roll
  const wallpaperRollCoverage = 16.5;
  const wallpaperRolls = Math.ceil(netWallArea / wallpaperRollCoverage * 1.1); // 10% waste

  // Cost estimates (Korean market prices)
  const paintCost18L = paintCans18L * 45000;
  const paintCost4L = paintCans4L * 18000;
  const wallpaperCost = wallpaperRolls * 35000;

  const pyeong = (w * l / 3.305785).toFixed(1);

  return (
    <>
      <Card>
        <SectionTitle num="1">Type</SectionTitle>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setMode('paint')}
            className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${mode === 'paint' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}
          >
            Paint (페인트)
          </button>
          <button
            onClick={() => setMode('wallpaper')}
            className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${mode === 'wallpaper' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}
          >
            Wallpaper (도배)
          </button>
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Room Dimensions</SectionTitle>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-[var(--sub)] mb-1">Width (m)</label>
              <input type="number" step="0.1" value={roomWidth} onChange={e => setRoomWidth(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--sub)] mb-1">Length (m)</label>
              <input type="number" step="0.1" value={roomLength} onChange={e => setRoomLength(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--sub)] mb-1">Ceiling Height (m)</label>
            <input type="number" step="0.1" value={roomHeight} onChange={e => setRoomHeight(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-[var(--sub)] mb-1">Doors</label>
              <input type="number" min={0} value={doors} onChange={e => setDoors(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--sub)] mb-1">Windows</label>
              <input type="number" min={0} value={windows} onChange={e => setWindows(+e.target.value)} className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center" />
            </div>
          </div>
          {mode === 'paint' && (
            <div>
              <label className="block text-xs font-bold text-[var(--sub)] mb-1">Number of Coats</label>
              <select value={coats} onChange={e => setCoats(+e.target.value)} className="w-full py-3 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] bg-white text-center">
                <option value={1}>1 coat</option>
                <option value={2}>2 coats (recommended)</option>
                <option value={3}>3 coats</option>
              </select>
            </div>
          )}
        </div>
      </Card>

      <Card className="!p-6">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Room Size</div>
            <div className="text-[28px] font-extrabold text-[var(--primary-dark)]">{(w * l).toFixed(1)}</div>
            <div className="text-xs text-[var(--sub)]">sq m ({pyeong} pyeong/평)</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Wall Area</div>
            <div className="text-[28px] font-extrabold text-[var(--primary-dark)]">{netWallArea.toFixed(1)}</div>
            <div className="text-xs text-[var(--sub)]">sq m (net)</div>
          </div>
        </div>

        {mode === 'paint' ? (
          <>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
                <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Paint Needed</div>
                <div className="text-[28px] font-extrabold text-[var(--primary-dark)]">{litersNeeded.toFixed(1)}</div>
                <div className="text-xs text-[var(--sub)]">liters ({c} coat{c > 1 ? 's' : ''})</div>
              </div>
              <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
                <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Total Area</div>
                <div className="text-[28px] font-extrabold text-[var(--primary-dark)]">{totalPaintArea.toFixed(1)}</div>
                <div className="text-xs text-[var(--sub)]">sq m (walls + ceiling)</div>
              </div>
            </div>
            <div className="bg-[var(--bg)] rounded-xl p-4">
              <div className="text-xs font-bold text-[var(--sub)] mb-2 uppercase">Estimated Cost</div>
              <div className="text-sm flex flex-col gap-1">
                <div className="flex justify-between"><span>18L cans needed</span><span className="font-bold">{paintCans18L} cans (~{paintCost18L.toLocaleString()} won)</span></div>
                <div className="flex justify-between"><span>4L cans needed</span><span className="font-bold">{paintCans4L} cans (~{paintCost4L.toLocaleString()} won)</span></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[var(--bg)] rounded-xl p-4 text-center mb-3">
              <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Wallpaper Rolls Needed</div>
              <div className="text-[36px] font-extrabold text-[var(--primary-dark)]">{wallpaperRolls}</div>
              <div className="text-xs text-[var(--sub)]">rolls (1.06m x 15.6m each, 10% waste included)</div>
            </div>
            <div className="bg-[var(--bg)] rounded-xl p-4">
              <div className="text-xs font-bold text-[var(--sub)] mb-2 uppercase">Estimated Material Cost</div>
              <div className="text-sm flex justify-between">
                <span>Wallpaper (실크벽지)</span>
                <span className="font-bold">~{wallpaperCost.toLocaleString()} won</span>
              </div>
              <div className="text-xs text-[var(--sub)] mt-1">* Installation labor not included. Professional 도배 typically costs 150,000-300,000 won per room.</div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">🎨 Painting Tips for Korean Apartments</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Paint vs wallpaper:</b> Most Korean apartments (아파트) come with wallpaper (벽지) rather than paint. When moving into a new place, landlords often include a fresh wallpaper installation (도배) as part of the move-in process. Painting over wallpaper is possible but requires primer.</p>
          <p><b>Where to buy paint:</b> Large home improvement stores like E-Mart Living (이마트 리빙) and Homeplus carry paint supplies. For budget options, Daiso (다이소) sells small paint cans and basic supplies. Online stores like Coupang (쿠팡) offer the widest selection with next-day delivery.</p>
          <p><b>Surface preparation:</b> Clean walls with a damp cloth and let them dry completely. Fill any holes or cracks with wall putty (벽면 보수제). Apply painter&apos;s tape (마스킹 테이프) around edges, outlets, and fixtures. Use a drop cloth to protect ondol floors (온돌 바닥).</p>
          <p><b>Korean apartment specifics:</b> Standard ceiling height in Korean apartments is 2.3-2.5m. Walls are typically concrete with wallpaper, so you may need a concrete primer if painting directly on the wall. Be mindful of ventilation &mdash; Korean apartments tend to have ondol (underfloor heating) which can affect drying time in winter.</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📋 Wallpaper (도배) Guide</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Types of Korean wallpaper:</b> Silk wallpaper (실크벽지) is the most common and affordable option. It&apos;s not actual silk but a PVC-coated paper with a smooth finish. Natural wallpaper (합지벽지) is made from mixed paper pulp and is more breathable but less durable. Premium options include fabric wallpaper (천벽지) and eco-friendly options.</p>
          <p><b>Hiring a professional:</b> In Korea, wallpaper installation is almost always done by professionals (도배사). Search &quot;도배&quot; on local service apps like Soomgo (숨고) or Miso (미소). Typical cost is 150,000-300,000 won per room including materials. Full apartment 도배 for a 25-pyeong place costs about 800,000-1,500,000 won.</p>
          <p><b>DIY considerations:</b> DIY wallpapering is uncommon in Korea, but if you want to try, buy pre-pasted wallpaper (풀바른 벽지) for easier application. You&apos;ll need a smoothing brush, utility knife, and a level. Practice on a small area first. Most Korean hardware stores can cut wallpaper to size.</p>
        </div>
      </Card>
    </>
  );
}
