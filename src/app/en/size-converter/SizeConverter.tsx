'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Tab = 'shoes' | 'tops' | 'pants';

const menShoes = [
  { us: '6', uk: '5.5', eu: '39', kr: '245' },
  { us: '6.5', uk: '6', eu: '39.5', kr: '250' },
  { us: '7', uk: '6.5', eu: '40', kr: '255' },
  { us: '7.5', uk: '7', eu: '40.5', kr: '260' },
  { us: '8', uk: '7.5', eu: '41', kr: '265' },
  { us: '8.5', uk: '8', eu: '42', kr: '270' },
  { us: '9', uk: '8.5', eu: '42.5', kr: '275' },
  { us: '9.5', uk: '9', eu: '43', kr: '280' },
  { us: '10', uk: '9.5', eu: '44', kr: '285' },
  { us: '10.5', uk: '10', eu: '44.5', kr: '290' },
  { us: '11', uk: '10.5', eu: '45', kr: '295' },
  { us: '11.5', uk: '11', eu: '45.5', kr: '300' },
  { us: '12', uk: '11.5', eu: '46', kr: '305' },
];

const womenShoes = [
  { us: '5', uk: '2.5', eu: '35', kr: '220' },
  { us: '5.5', uk: '3', eu: '35.5', kr: '225' },
  { us: '6', uk: '3.5', eu: '36', kr: '230' },
  { us: '6.5', uk: '4', eu: '36.5', kr: '235' },
  { us: '7', uk: '4.5', eu: '37', kr: '240' },
  { us: '7.5', uk: '5', eu: '37.5', kr: '245' },
  { us: '8', uk: '5.5', eu: '38', kr: '250' },
  { us: '8.5', uk: '6', eu: '39', kr: '255' },
  { us: '9', uk: '6.5', eu: '39.5', kr: '260' },
  { us: '9.5', uk: '7', eu: '40', kr: '265' },
  { us: '10', uk: '7.5', eu: '41', kr: '270' },
];

const topsSizes = [
  { kr: '44', label: 'XS', chest: '80-84 cm', usWomen: '0-2', usMen: 'XS' },
  { kr: '55', label: 'S', chest: '84-88 cm', usWomen: '4-6', usMen: 'S' },
  { kr: '66', label: 'M', chest: '88-92 cm', usWomen: '8-10', usMen: 'M' },
  { kr: '77', label: 'L', chest: '92-96 cm', usWomen: '12-14', usMen: 'L' },
  { kr: '88', label: 'XL', chest: '96-100 cm', usWomen: '16', usMen: 'XL' },
  { kr: '99', label: 'XXL', chest: '100-104 cm', usWomen: '18', usMen: 'XXL' },
];

const pantsSizes = [
  { inches: '26', kr: '26 (66)', usWomen: '2' },
  { inches: '27', kr: '27 (69)', usWomen: '4' },
  { inches: '28', kr: '28 (71)', usWomen: '6' },
  { inches: '29', kr: '29 (74)', usWomen: '8' },
  { inches: '30', kr: '30 (76)', usWomen: '10' },
  { inches: '31', kr: '31 (79)', usWomen: '12' },
  { inches: '32', kr: '32 (81)', usWomen: '14' },
  { inches: '33', kr: '33 (84)', usWomen: '16' },
  { inches: '34', kr: '34 (86)', usWomen: '18' },
  { inches: '36', kr: '36 (91)', usWomen: '20' },
];

export default function SizeConverter() {
  const [tab, setTab] = useState<Tab>('shoes');
  const [isMen, setIsMen] = useState(true);
  const [shoeSize, setShoeSize] = useState('9');
  const [sizeSystem, setSizeSystem] = useState<'us' | 'uk' | 'eu'>('us');
  const [waistInches, setWaistInches] = useState(30);

  const shoeData = isMen ? menShoes : womenShoes;
  const matchedShoe = shoeData.find(s => s[sizeSystem] === shoeSize);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'shoes', label: 'Shoes' },
    { key: 'tops', label: 'Tops' },
    { key: 'pants', label: 'Pants' },
  ];

  const matchedPants = pantsSizes.find(p => +p.inches === (waistInches || 0));

  return (
    <>
      <Card>
        <div className="grid grid-cols-3 gap-2 mb-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${tab === t.key ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {tab === 'shoes' && (
        <>
          <Card>
            <SectionTitle num="1">Your Shoe Size</SectionTitle>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => { setIsMen(true); setShoeSize('9'); }}
                className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${isMen ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}
              >
                Men&apos;s
              </button>
              <button
                onClick={() => { setIsMen(false); setShoeSize('7'); }}
                className={`py-3 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${!isMen ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}
              >
                Women&apos;s
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <label className="block text-xs font-bold text-[var(--sub)] mb-1">Size System</label>
                <select
                  value={sizeSystem}
                  onChange={e => { setSizeSystem(e.target.value as 'us' | 'uk' | 'eu'); setShoeSize(shoeData[0][e.target.value as 'us' | 'uk' | 'eu']); }}
                  className="w-full py-3 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] bg-white text-center"
                >
                  <option value="us">US</option>
                  <option value="uk">UK</option>
                  <option value="eu">EU</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--sub)] mb-1">Your Size</label>
                <select
                  value={shoeSize}
                  onChange={e => setShoeSize(e.target.value)}
                  className="w-full py-3 px-2 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] bg-white text-center"
                >
                  {shoeData.map(s => (
                    <option key={s[sizeSystem]} value={s[sizeSystem]}>{s[sizeSystem]}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          <Card className="!p-6">
            {matchedShoe ? (
              <div className="text-center">
                <div className="text-[10px] text-[var(--sub)] font-bold uppercase mb-1">Your Korean Shoe Size</div>
                <div className="text-[48px] font-extrabold text-[var(--primary-dark)]">{matchedShoe.kr}</div>
                <div className="text-sm text-[var(--sub)]">mm ({sizeSystem.toUpperCase()} {shoeSize} = KR {matchedShoe.kr})</div>
              </div>
            ) : (
              <div className="text-center text-sm text-[var(--sub)]">Select a valid size above.</div>
            )}
          </Card>

          <Card>
            <SectionTitle num="2">Full Shoe Size Chart ({isMen ? "Men's" : "Women's"})</SectionTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] text-[var(--sub)] uppercase">
                    <th className="pb-2">US</th>
                    <th className="pb-2">UK</th>
                    <th className="pb-2">EU</th>
                    <th className="pb-2 text-right font-bold">Korean (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {shoeData.map((s, i) => (
                    <tr key={i} className={`border-t border-[var(--line)] ${matchedShoe === s ? 'bg-[var(--primary-weak)]' : ''}`}>
                      <td className="py-2 text-xs">{s.us}</td>
                      <td className="py-2 text-xs">{s.uk}</td>
                      <td className="py-2 text-xs">{s.eu}</td>
                      <td className="py-2 text-xs text-right font-bold">{s.kr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {tab === 'tops' && (
        <Card>
          <SectionTitle num="1">Korean Tops Size Chart</SectionTitle>
          <p className="text-xs text-[var(--sub)] mb-3">Korean clothing uses number-based sizes (44, 55, 66...). Korean sizes tend to run smaller than Western sizes.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] text-[var(--sub)] uppercase">
                  <th className="pb-2">Korean</th>
                  <th className="pb-2">Int&apos;l</th>
                  <th className="pb-2">Chest</th>
                  <th className="pb-2 text-right">US Women</th>
                </tr>
              </thead>
              <tbody>
                {topsSizes.map((s, i) => (
                  <tr key={i} className="border-t border-[var(--line)]">
                    <td className="py-2 text-xs font-bold">{s.kr}</td>
                    <td className="py-2 text-xs">{s.label}</td>
                    <td className="py-2 text-xs text-[var(--sub)]">{s.chest}</td>
                    <td className="py-2 text-xs text-right">{s.usWomen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-[var(--bg)] rounded-xl">
            <p className="text-xs text-[var(--sub)]"><b>Tip:</b> Korean &quot;Free Size&quot; (one-size-fits-all) typically fits US sizes 0-6. If you wear US size 10+, you may need to shop at international brands or plus-size stores.</p>
          </div>
        </Card>
      )}

      {tab === 'pants' && (
        <>
          <Card>
            <SectionTitle num="1">Waist Size</SectionTitle>
            <div className="mb-4">
              <label className="block text-xs font-bold text-[var(--sub)] mb-1">Waist (inches)</label>
              <input
                type="number"
                min={26}
                max={40}
                value={waistInches}
                onChange={e => setWaistInches(+e.target.value)}
                className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"
              />
            </div>
            {matchedPants && (
              <div className="bg-[var(--bg)] rounded-xl p-4 text-center">
                <div className="text-[10px] text-[var(--sub)] font-bold uppercase mb-1">Korean Pants Size</div>
                <div className="text-[36px] font-extrabold text-[var(--primary-dark)]">{matchedPants.kr}</div>
                <div className="text-xs text-[var(--sub)]">US Women&apos;s {matchedPants.usWomen}</div>
              </div>
            )}
          </Card>

          <Card>
            <SectionTitle num="2">Pants Size Chart</SectionTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] text-[var(--sub)] uppercase">
                    <th className="pb-2">Waist (in)</th>
                    <th className="pb-2">Korean Size</th>
                    <th className="pb-2 text-right">US Women</th>
                  </tr>
                </thead>
                <tbody>
                  {pantsSizes.map((s, i) => (
                    <tr key={i} className={`border-t border-[var(--line)] ${matchedPants === s ? 'bg-[var(--primary-weak)]' : ''}`}>
                      <td className="py-2 text-xs font-bold">{s.inches}&quot;</td>
                      <td className="py-2 text-xs">{s.kr}</td>
                      <td className="py-2 text-xs text-right">{s.usWomen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">Guide: Korean Size Labels Explained</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Korean sizes run smaller</b>: As a general rule, size up by 1-2 sizes compared to US/EU sizing. A US Medium often translates to a Korean Large (77) or XL (88). Always try on before buying when possible.</p>
          <p><b>Number-based clothing sizes</b>: Korean tops use numbers like 44, 55, 66, 77, 88. These roughly correspond to XS through XL but are based on chest measurements in centimeters. You will see these numbers on tags in Korean stores.</p>
          <p><b>Shoe sizes in millimeters</b>: Korean shoes are measured in millimeters (mm). A size 270 means 270mm foot length. This is the most precise system and easy to measure at home - just stand on paper, mark your heel and longest toe, and measure in mm.</p>
          <p><b>Where to shop for larger sizes</b>: International brands like Zara, H&amp;M, and Uniqlo carry standard international sizing in Korea. For Korean brands, check Gentlemonster, 8Seconds, or online shops like Musinsa (무신사) which often list detailed measurements.</p>
          <p><b>&quot;Free Size&quot; (프리 사이즈)</b>: Many Korean accessories and some clothing items are labeled &quot;Free Size,&quot; meaning one-size-fits-all. This usually fits smaller body types (roughly US 0-6 for women). Be cautious with this label if you typically wear larger sizes.</p>
          <p><b>Online shopping tips</b>: Korean online stores usually list exact measurements (chest, length, shoulder width) in centimeters. Use these measurements rather than the size label for the most accurate fit. Musinsa, W Concept, and SSF Shop are popular options with English interfaces.</p>
        </div>
      </Card>
    </>
  );
}
