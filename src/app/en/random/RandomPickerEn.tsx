'use client';

import { useState, useCallback } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Tab = 'number' | 'lottery' | 'shuffle';

export default function RandomPickerEn() {
  const [tab, setTab] = useState<Tab>('number');

  // Number picker state
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [noDuplicates, setNoDuplicates] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  // Lottery state
  const [lotteryType, setLotteryType] = useState<'lotto645' | 'custom'>('lotto645');
  const [customMax, setCustomMax] = useState(45);
  const [customPick, setCustomPick] = useState(6);
  const [lotteryResults, setLotteryResults] = useState<number[]>([]);
  const [lotteryHistory, setLotteryHistory] = useState<number[][]>([]);

  // Shuffle state
  const [listText, setListText] = useState('');
  const [shuffled, setShuffled] = useState<string[]>([]);

  const generateNumbers = useCallback(() => {
    const minVal = min || 0;
    const maxVal = max || 0;
    const cnt = Math.min(count || 1, noDuplicates ? Math.abs(maxVal - minVal) + 1 : 100);
    const lo = Math.min(minVal, maxVal);
    const hi = Math.max(minVal, maxVal);

    if (noDuplicates) {
      const pool: number[] = [];
      for (let i = lo; i <= hi; i++) pool.push(i);
      // Fisher-Yates with crypto
      const arr = new Uint32Array(pool.length);
      crypto.getRandomValues(arr);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = arr[i] % (i + 1);
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      setResults(pool.slice(0, cnt));
    } else {
      const arr = new Uint32Array(cnt);
      crypto.getRandomValues(arr);
      setResults(Array.from(arr, v => lo + (v % (hi - lo + 1))));
    }
  }, [min, max, count, noDuplicates]);

  const generateLottery = useCallback(() => {
    const maxNum = lotteryType === 'lotto645' ? 45 : (customMax || 45);
    const pickNum = lotteryType === 'lotto645' ? 6 : Math.min(customPick || 6, maxNum);

    const pool: number[] = [];
    for (let i = 1; i <= maxNum; i++) pool.push(i);
    const arr = new Uint32Array(pool.length);
    crypto.getRandomValues(arr);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = arr[i] % (i + 1);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const picked = pool.slice(0, pickNum).sort((a, b) => a - b);
    setLotteryResults(picked);
    setLotteryHistory(prev => [picked, ...prev].slice(0, 5));
  }, [lotteryType, customMax, customPick]);

  const shuffleList = useCallback(() => {
    const items = listText.split('\n').map(s => s.trim()).filter(Boolean);
    if (items.length === 0) return;
    const arr = new Uint32Array(items.length);
    crypto.getRandomValues(arr);
    for (let i = items.length - 1; i > 0; i--) {
      const j = arr[i] % (i + 1);
      [items[i], items[j]] = [items[j], items[i]];
    }
    setShuffled([...items]);
  }, [listText]);

  const getLottoBallColor = (n: number) => {
    if (n <= 10) return 'bg-yellow-400 text-yellow-900';
    if (n <= 20) return 'bg-blue-400 text-white';
    if (n <= 30) return 'bg-red-400 text-white';
    if (n <= 40) return 'bg-gray-500 text-white';
    return 'bg-green-500 text-white';
  };

  const inputClass = "w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center";
  const tabClass = (t: Tab) => `flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${tab === t ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`;

  return (
    <>
      <Card>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('number')} className={tabClass('number')}>Numbers</button>
          <button onClick={() => setTab('lottery')} className={tabClass('lottery')}>Lottery</button>
          <button onClick={() => setTab('shuffle')} className={tabClass('shuffle')}>Shuffler</button>
        </div>
      </Card>

      {tab === 'number' && (
        <>
          <Card>
            <SectionTitle num="1">Number Range</SectionTitle>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <label className="block text-xs font-bold text-[var(--sub)] mb-1">Min</label>
                <input type="number" value={min} onChange={e => setMin(+e.target.value || 0)} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--sub)] mb-1">Max</label>
                <input type="number" value={max} onChange={e => setMax(+e.target.value || 0)} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--sub)] mb-1">Count</label>
                <input type="number" value={count} onChange={e => setCount(+e.target.value || 0)} className={inputClass} />
              </div>
            </div>
            <button onClick={() => setNoDuplicates(!noDuplicates)} className={`w-full py-2.5 mb-3 rounded-xl text-xs font-bold border-[1.5px] transition-colors ${noDuplicates ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>
              {noDuplicates ? '✓ No Duplicates' : 'Allow Duplicates'}
            </button>
            <button onClick={generateNumbers} className="w-full py-3 rounded-xl text-base font-bold bg-[var(--primary)] text-white hover:opacity-90 transition-opacity">
              Generate
            </button>
          </Card>

          {results.length > 0 && (
            <Card className="!p-6">
              <SectionTitle num="2">Results</SectionTitle>
              <div className="flex flex-wrap gap-2 justify-center">
                {results.map((n, i) => (
                  <div key={i} className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-lg font-extrabold">
                    {n}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {tab === 'lottery' && (
        <>
          <Card>
            <SectionTitle num="1">Lottery Type</SectionTitle>
            <div className="flex gap-2 mb-4">
              <button onClick={() => setLotteryType('lotto645')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${lotteryType === 'lotto645' ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>
                Korean Lotto 6/45
              </button>
              <button onClick={() => setLotteryType('custom')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${lotteryType === 'custom' ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--line)] text-[var(--sub)]'}`}>
                Custom
              </button>
            </div>
            {lotteryType === 'custom' && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--sub)] mb-1">Max Number</label>
                  <input type="number" value={customMax} onChange={e => setCustomMax(+e.target.value || 0)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--sub)] mb-1">Pick Count</label>
                  <input type="number" value={customPick} onChange={e => setCustomPick(+e.target.value || 0)} className={inputClass} />
                </div>
              </div>
            )}
            {lotteryType === 'lotto645' && (
              <div className="bg-[var(--bg)] rounded-xl p-3 mb-4 text-xs text-[var(--sub)]">
                Korean Lotto 6/45 (로또 6/45): Pick 6 numbers from 1-45. Drawings every Saturday at 8:45 PM KST.
              </div>
            )}
            <button onClick={generateLottery} className="w-full py-3 rounded-xl text-base font-bold bg-[var(--primary)] text-white hover:opacity-90 transition-opacity">
              Draw Numbers
            </button>
          </Card>

          {lotteryResults.length > 0 && (
            <Card className="!p-6">
              <SectionTitle num="2">Your Numbers</SectionTitle>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {lotteryResults.map((n, i) => (
                  <div key={i} className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-extrabold ${getLottoBallColor(n)}`}>
                    {n}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {lotteryHistory.length > 0 && (
            <Card>
              <SectionTitle num="3">History</SectionTitle>
              <div className="flex flex-col gap-2">
                {lotteryHistory.map((set, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-[var(--bg)] rounded-lg px-3 py-2">
                    <span className="text-xs font-bold text-[var(--sub)] w-6">#{i + 1}</span>
                    <div className="flex gap-1 flex-wrap">
                      {set.map((n, j) => (
                        <span key={j} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${getLottoBallColor(n)}`}>{n}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {tab === 'shuffle' && (
        <>
          <Card>
            <SectionTitle num="1">Enter Items (one per line)</SectionTitle>
            <textarea
              value={listText}
              onChange={e => setListText(e.target.value)}
              placeholder={"Alice\nBob\nCharlie\nDiana\nEve"}
              className="w-full h-36 p-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm outline-none focus:border-[var(--primary)] resize-y mb-3"
            />
            <button onClick={shuffleList} className="w-full py-3 rounded-xl text-base font-bold bg-[var(--primary)] text-white hover:opacity-90 transition-opacity">
              Shuffle
            </button>
          </Card>

          {shuffled.length > 0 && (
            <Card className="!p-6">
              <SectionTitle num="2">Shuffled Order</SectionTitle>
              <div className="flex flex-col gap-1.5">
                {shuffled.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[var(--bg)] rounded-lg px-3 py-2.5">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-none ${i === 0 ? 'bg-yellow-400 text-yellow-900' : i === 1 ? 'bg-gray-300 text-gray-700' : i === 2 ? 'bg-orange-300 text-orange-800' : 'bg-[var(--primary-weak)] text-[var(--primary)]'}`}>{i + 1}</span>
                    <span className="text-sm font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 How Random Generators Work</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Cryptographic randomness:</b> This tool uses the Web Crypto API (crypto.getRandomValues), which generates cryptographically secure pseudo-random numbers. Unlike Math.random(), which uses a simple algorithm that can be predicted, the Crypto API draws from your operating system&apos;s entropy sources (hardware noise, timing data, etc.).</p>
          <p><b>Fisher-Yates shuffle:</b> When shuffling a list or picking lottery numbers, we use the Fisher-Yates (Knuth) shuffle algorithm. This algorithm guarantees that every permutation is equally likely, making it the gold standard for fair random ordering.</p>
          <p><b>Fair drawings and contests:</b> For official drawings or giveaways, transparency is key. Consider screen-recording the draw process, having witnesses present, and documenting the method used. This tool&apos;s use of crypto-grade randomness ensures each number has an equal probability of being selected.</p>
          <p><b>Korean Lotto 6/45 (로또 6/45):</b> South Korea&apos;s national lottery launched in 2002. Players choose 6 numbers from 1 to 45. The jackpot prize pool grows until won. Drawings are held every Saturday evening. While no strategy can improve your odds (each combination has a 1 in 8,145,060 chance), using a random generator ensures you avoid common number patterns that lead to shared jackpots.</p>
          <p><b>True randomness vs pseudo-randomness:</b> No computer can generate truly random numbers -- they are technically &quot;pseudo-random.&quot; However, cryptographically secure pseudo-random generators (CSPRNGs) like the one used here are considered sufficiently random for all practical purposes, including security applications and fair gaming.</p>
        </div>
      </Card>
    </>
  );
}
