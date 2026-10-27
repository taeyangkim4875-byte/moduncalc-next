'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ResultPanel from '@/components/ResultPanel';

const fmt = (n: number) => parseFloat(n.toFixed(1)).toLocaleString('ko-KR', { maximumFractionDigits: 1 });

/**
 * 전기차 전비 계산기.
 *
 * /daily/fuel 에 있던 전기차 카드 두 개를 여기로 옮겼습니다. 같은 계산기를
 * 두 페이지에 두면 중복이 되므로 fuel 쪽에서는 제거했습니다.
 *
 * 단가와 전비 기본값은 fuel 에서 쓰던 값을 그대로 가져왔습니다.
 * 요율이 바뀌면 두 곳이 아니라 이 파일만 고치면 됩니다.
 */
export default function EvCalc() {
  // 전비 직접 측정
  const [dist, setDist] = useState(300);
  const [kwh, setKwh] = useState(55);
  const measured = kwh ? dist / kwh : 0;

  // 충전비 계산
  const [evEff, setEvEff] = useState(5.5);
  const [evPrice, setEvPrice] = useState(350);
  const [evDist, setEvDist] = useState(300);
  const evKwh = evEff > 0 ? (evDist || 0) / evEff : 0;
  const evCost = evKwh * (evPrice || 0);

  // 내연차 비교
  const [gasEff, setGasEff] = useState(12);
  const [gasPrice, setGasPrice] = useState(1650);
  const cmpDist = evDist || 0;
  const cmpGasL = gasEff > 0 ? cmpDist / gasEff : 0;
  const cmpGasCost = cmpGasL * (gasPrice || 0);
  const savings = cmpGasCost - evCost;

  const mDist = 1500;
  const mGas = gasEff > 0 ? (mDist / gasEff) * (gasPrice || 0) : 0;
  const mEv = evEff > 0 ? (mDist / evEff) * (evPrice || 0) : 0;

  const input = 'flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]';
  const unit = 'text-sm font-bold text-[var(--sub)]';

  return (<>
    <Card><SectionTitle num="🔋">내 전기차 전비 측정</SectionTitle>
      <div className="text-xs text-[var(--sub)] mb-3">충전 후 다음 충전까지의 주행거리와 충전량을 넣으면 실제 전비가 나옵니다.</div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">주행 거리</label>
        <div className="flex items-center gap-2.5"><input type="number" value={dist || ''} onChange={e => setDist(+e.target.value || 0)} className={input} /><span className={unit}>km</span></div>
      </div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">충전량</label>
        <div className="flex items-center gap-2.5"><input type="number" value={kwh || ''} onChange={e => setKwh(+e.target.value || 0)} className={input} /><span className={unit}>kWh</span></div>
      </div>
      <ResultPanel className="mt-3" value={`${fmt(measured)} km/kWh`} sub={`${fmt(dist)}km ÷ ${fmt(kwh)}kWh`} />
    </Card>

    <Card><SectionTitle num="⚡">충전비 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">전비 <span className="text-xs text-[var(--sub)] font-medium ml-1">{evEff} km/kWh</span></label>
        <input type="range" min={3} max={8} step={0.1} value={evEff} onChange={e => setEvEff(+e.target.value)} className="w-full" />
        <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1"><span>3 km/kWh (대형SUV)</span><span>8 km/kWh (소형)</span></div>
      </div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">충전 단가</label>
        <div className="flex gap-2 mb-2">
          {[{ label: '완속 (집)', v: 350 }, { label: '공용 완속', v: 400 }, { label: '급속', v: 500 }].map(o => (
            <button key={o.label} onClick={() => setEvPrice(o.v)} className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] cursor-pointer transition-colors ${evPrice === o.v ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] bg-white text-[var(--sub)]'}`}>{o.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-2.5"><input type="number" value={evPrice || ''} onChange={e => setEvPrice(+e.target.value || 0)} className={input} /><span className={unit}>원/kWh</span></div>
      </div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">주행 거리</label>
        <div className="flex items-center gap-2.5"><input type="number" value={evDist || ''} onChange={e => setEvDist(+e.target.value || 0)} className={input} /><span className={unit}>km</span></div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <ResultPanel className="mt-3" value={`${fmt(evKwh)} kWh`} sub="예상 충전량" />
        <ResultPanel className="mt-3" value={`${Math.round(evCost).toLocaleString()}원`} sub="예상 충전비" />
      </div>
      <div className="bg-[var(--bg)] rounded-xl p-3 mt-3 text-center text-[13px]">
        <span className="font-bold">100km당 </span>
        <span className="font-extrabold text-[var(--primary)]">{evEff > 0 ? Math.round((100 / evEff) * (evPrice || 0)).toLocaleString() : 0}원</span>
      </div>
    </Card>

    <Card><SectionTitle num="⛽">내연차와 비교</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">비교할 내연차 연비</label>
        <div className="flex items-center gap-2.5"><input type="number" value={gasEff || ''} onChange={e => setGasEff(+e.target.value || 0)} className={input} /><span className={unit}>km/L</span></div>
      </div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">유가</label>
        <div className="flex items-center gap-2.5"><input type="number" value={gasPrice || ''} onChange={e => setGasPrice(+e.target.value || 0)} className={input} /><span className={unit}>원/L</span></div>
      </div>
      <div className="text-xs text-[var(--sub)] mb-3">같은 거리({cmpDist.toLocaleString()}km) 기준</div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[var(--bg)] rounded-[14px] p-4 text-center">
          <div className="text-[10px] font-bold text-[var(--sub)]">⛽ 내연차</div>
          <div className="text-xl font-extrabold text-[var(--ink)]">{Math.round(cmpGasCost).toLocaleString()}원</div>
          <div className="text-[10px] text-[var(--sub)] mt-1">{fmt(cmpGasL)}L × {gasPrice.toLocaleString()}원</div>
        </div>
        <div className="bg-[var(--green-weak)] rounded-[14px] p-4 text-center">
          <div className="text-[10px] font-bold text-[var(--sub)]">🔋 전기차</div>
          <div className="text-xl font-extrabold text-[var(--green)]">{Math.round(evCost).toLocaleString()}원</div>
          <div className="text-[10px] text-[var(--sub)] mt-1">{fmt(evKwh)}kWh × {evPrice.toLocaleString()}원</div>
        </div>
      </div>
      {savings > 0 && (
        <div className="bg-[var(--green-weak)] rounded-xl p-3 mt-3 text-center">
          <span className="text-sm font-extrabold text-[var(--green)]">전기차가 {Math.round(savings).toLocaleString()}원 저렴</span>
          <span className="text-xs text-[var(--sub)] ml-1">({cmpGasCost > 0 ? Math.round((savings / cmpGasCost) * 100) : 0}%)</span>
        </div>
      )}
      {savings <= 0 && cmpDist > 0 && (
        <div className="bg-[#FFF4E5] rounded-xl p-3 mt-3 text-center">
          <span className="text-sm font-extrabold text-[#B26A00]">내연차가 {Math.round(Math.abs(savings)).toLocaleString()}원 저렴</span>
        </div>
      )}
      <div className="mt-4">
        <div className="text-xs font-bold text-[var(--sub)] mb-2">월 1,500km 기준</div>
        <div className="flex flex-col gap-1.5 text-[13px]">
          <div className="flex justify-between bg-[var(--bg)] rounded-xl px-3 py-2.5"><span className="font-semibold">⛽ 내연차 월 연료비</span><span className="font-bold">{Math.round(mGas).toLocaleString()}원</span></div>
          <div className="flex justify-between bg-[var(--green-weak)] rounded-xl px-3 py-2.5"><span className="font-semibold">🔋 전기차 월 충전비</span><span className="font-bold text-[var(--green)]">{Math.round(mEv).toLocaleString()}원</span></div>
          <div className="flex justify-between rounded-xl px-3 py-2.5 border-[1.5px] border-[var(--line)]"><span className="font-semibold">연간 차이</span><span className="font-extrabold">{Math.round((mGas - mEv) * 12).toLocaleString()}원</span></div>
        </div>
      </div>
    </Card>
  </>);
}
