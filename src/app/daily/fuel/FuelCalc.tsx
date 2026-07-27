'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;
const fmt=(n:number)=>parseFloat(n.toFixed(1)).toLocaleString('ko-KR',{maximumFractionDigits:1});
export default function FuelCalc(){
  const [dist,setDist]=useState(500);const [liter,setLiter]=useState(45);
  const [td,setTd]=useState(300);const [eff,setEff]=useState(12);const [price,setPrice]=useState(1650);
  const eff1=liter?dist/liter:0;const liters2=eff?td/eff:0;const cost=liters2*price;

  // 전기차 전비
  const [evEff, setEvEff] = useState(5.5); // km/kWh
  const [evPrice, setEvPrice] = useState(350); // 원/kWh (완속 기준)
  const [evDist, setEvDist] = useState(300);
  const evKwh = (evEff || 1) > 0 ? (evDist || 0) / (evEff || 1) : 0;
  const evCost = evKwh * (evPrice || 0);

  // 내연차 vs 전기차 비교 (같은 거리 기준)
  const cmpDist = evDist || 0;
  const cmpGasL = (eff || 1) > 0 ? cmpDist / (eff || 1) : 0;
  const cmpGasCost = cmpGasL * (price || 0);
  const cmpEvKwh = (evEff || 1) > 0 ? cmpDist / (evEff || 1) : 0;
  const cmpEvCost = cmpEvKwh * (evPrice || 0);
  const savings = cmpGasCost - cmpEvCost;

  return(<>
    <Card><SectionTitle num="⛽">자동차 연비 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">주행 거리</label><div className="flex items-center gap-2.5"><input type="number" value={dist} onChange={e=>setDist(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">주유량</label><div className="flex items-center gap-2.5"><input type="number" value={liter} onChange={e=>setLiter(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">L</span></div></div>
      <R v={`${fmt(eff1)} km/L`} l={`${fmt(dist)}km ÷ ${fmt(liter)}L`}/>
    </Card>
    <Card><SectionTitle num="💰">여행 유류비 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">주행 거리</label><div className="flex items-center gap-2.5"><input type="number" value={td} onChange={e=>setTd(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km</span></div></div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">차량 연비</label><div className="flex items-center gap-2.5"><input type="number" value={eff} onChange={e=>setEff(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km/L</span></div></div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">유가</label><div className="flex items-center gap-2.5"><input type="number" value={price} onChange={e=>setPrice(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원/L</span></div></div>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <R v={`${fmt(liters2)}L`} l="예상 주유량"/>
        <R v={`${Math.round(cost).toLocaleString()}원`} l="예상 유류비"/>
      </div>
    </Card>
    {/* 전기차 전비 계산 */}
    <Card><SectionTitle num="🔋">전기차 전비 계산</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">전비 (에너지 효율) <span className="text-xs text-[var(--sub)] font-medium ml-1">{evEff} km/kWh</span></label>
        <input type="range" min={3} max={8} step={0.1} value={evEff} onChange={e => setEvEff(+e.target.value)} className="w-full" />
        <div className="flex justify-between text-[10px] text-[var(--sub)] mt-1"><span>3 km/kWh (대형SUV)</span><span>8 km/kWh (소형)</span></div>
      </div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">전기요금</label>
        <div className="flex gap-2 mb-2">
          {[{label:'완속 (집)', v:350},{label:'공용 완속', v:400},{label:'급속', v:500}].map(o=>(
            <button key={o.label} onClick={()=>setEvPrice(o.v)} className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] cursor-pointer transition-colors ${evPrice===o.v?'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]':'border-[var(--line)] bg-white text-[var(--sub)]'}`}>{o.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-2.5"><input type="number" value={evPrice} onChange={e=>setEvPrice(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원/kWh</span></div>
      </div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">주행 거리</label><div className="flex items-center gap-2.5"><input type="number" value={evDist} onChange={e=>setEvDist(+e.target.value)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">km</span></div></div>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <R v={`${fmt(evKwh)} kWh`} l="예상 충전량"/>
        <R v={`${Math.round(evCost).toLocaleString()}원`} l="예상 충전비"/>
      </div>
    </Card>

    {/* 내연차 vs 전기차 비교 */}
    <Card><SectionTitle num="⚡">내연차 vs 전기차 비용 비교</SectionTitle>
      <div className="text-xs text-[var(--sub)] mb-3">같은 거리({cmpDist.toLocaleString()}km) 기준 연료비 비교</div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[var(--bg)] rounded-[14px] p-4 text-center">
          <div className="text-[10px] font-bold text-[var(--sub)]">⛽ 내연차</div>
          <div className="text-xl font-extrabold text-[var(--ink)]">{Math.round(cmpGasCost).toLocaleString()}원</div>
          <div className="text-[10px] text-[var(--sub)] mt-1">{fmt(cmpGasL)}L × {price.toLocaleString()}원</div>
        </div>
        <div className="bg-[var(--green-weak)] rounded-[14px] p-4 text-center">
          <div className="text-[10px] font-bold text-[var(--sub)]">🔋 전기차</div>
          <div className="text-xl font-extrabold text-[var(--green)]">{Math.round(cmpEvCost).toLocaleString()}원</div>
          <div className="text-[10px] text-[var(--sub)] mt-1">{fmt(cmpEvKwh)}kWh × {evPrice.toLocaleString()}원</div>
        </div>
      </div>
      {savings > 0 && (
        <div className="bg-[var(--green-weak)] rounded-xl p-3 mt-3 text-center">
          <span className="text-sm font-extrabold text-[var(--green)]">전기차가 {Math.round(savings).toLocaleString()}원 절약</span>
          <span className="text-xs text-[var(--sub)] ml-1">({cmpGasCost > 0 ? Math.round((savings / cmpGasCost) * 100) : 0}% 저렴)</span>
        </div>
      )}
      {savings <= 0 && cmpDist > 0 && (
        <div className="bg-[#FFF4E5] rounded-xl p-3 mt-3 text-center">
          <span className="text-sm font-extrabold text-[#B26A00]">내연차가 {Math.round(Math.abs(savings)).toLocaleString()}원 절약</span>
        </div>
      )}

      {/* 월간 비교 */}
      <div className="mt-4">
        <div className="text-xs font-bold text-[var(--sub)] mb-2">월간 비용 비교 (월 1,500km 기준)</div>
        <div className="flex flex-col gap-1.5 text-[13px]">
          {(() => {
            const mDist = 1500;
            const mGas = (eff || 1) > 0 ? (mDist / (eff || 1)) * (price || 0) : 0;
            const mEv = (evEff || 1) > 0 ? (mDist / (evEff || 1)) * (evPrice || 0) : 0;
            const mSave = mGas - mEv;
            return [
              <div key="gas" className="flex justify-between bg-[var(--bg)] rounded-xl px-3 py-2.5"><span className="font-semibold">⛽ 내연차 월 연료비</span><span className="font-bold">{Math.round(mGas).toLocaleString()}원</span></div>,
              <div key="ev" className="flex justify-between bg-[var(--bg)] rounded-xl px-3 py-2.5"><span className="font-semibold">🔋 전기차 월 충전비</span><span className="font-bold text-[var(--green)]">{Math.round(mEv).toLocaleString()}원</span></div>,
              <div key="save" className="flex justify-between bg-[var(--bg)] rounded-xl px-3 py-2.5"><span className="font-semibold">월 절약액</span><span className="font-bold text-[var(--primary-dark)]">{Math.round(mSave).toLocaleString()}원</span></div>,
              <div key="year" className="flex justify-between bg-[var(--primary-weak)] rounded-xl px-3 py-2.5"><span className="font-bold">연간 절약액</span><span className="font-extrabold text-[var(--primary-dark)]">{Math.round(mSave * 12).toLocaleString()}원</span></div>,
            ];
          })()}
        </div>
      </div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">📊 차종별 평균 연비 비교</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead><tr className="border-b-2 border-[var(--line)]"><th className="py-2 text-left text-xs text-[var(--sub)] font-bold">차종</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">가솔린</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">디젤</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">하이브리드</th><th className="py-2 text-right text-xs text-[var(--sub)] font-bold">전기차</th></tr></thead>
          <tbody>
            {[['경차 (모닝, 스파크)','15~17','–','–','–'],['소형 (아반떼, K3)','12~15','16~19','18~23','6.0~7.0'],['중형 (쏘나타, K5)','10~13','14~17','17~21','5.5~6.5'],['대형 (그랜저, K8)','8~11','12~15','14~18','5.0~6.0'],['SUV (투싼, 스포티지)','9~12','13~16','15~19','4.5~5.5'],['대형SUV (팰리세이드)','7~10','11~14','–','4.0~5.0'],['전기차 전용 (아이오닉5, EV6)','–','–','–','5.5~6.5']].map(([type,gas,diesel,hybrid,ev],i)=>(
              <tr key={i} className="border-b border-[var(--line)]"><td className="py-2 font-semibold">{type}</td><td className="py-2 text-right">{gas}</td><td className="py-2 text-right">{diesel}</td><td className="py-2 text-right text-[var(--green)] font-bold">{hybrid}</td><td className="py-2 text-right text-[var(--primary)] font-bold">{ev}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-[11px] text-[var(--sub)] mt-2">내연차: km/L · 전기차: km/kWh · 복합 기준 · 실제 수치는 운전 습관에 따라 다릅니다</div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">🚗 주요 구간 유류비 참고</h2>
      <div className="flex flex-col gap-1.5 text-[13px]">
        {[['서울 → 부산', 400, 12], ['서울 → 대전', 160, 12], ['서울 → 강릉', 230, 12], ['서울 → 목포', 370, 12], ['서울 → 제주 (차량 선적 포함)', 450, 12]].map(([route, km, mpg]) => {
          const liters = (km as number) / (mpg as number);
          const cost = liters * 1650;
          return (
            <div key={route as string} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <div><span className="font-semibold">{route}</span> <span className="text-[var(--sub)] text-[11px] ml-1">{km}km</span></div>
              <span className="font-bold text-[var(--primary-dark)]">약 {Math.round(cost as number).toLocaleString()}원</span>
            </div>
          );
        })}
      </div>
      <div className="text-[11px] text-[var(--sub)] mt-2">연비 12km/L, 유가 1,650원/L 기준 · 고속도로 통행료 별도</div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">내 차 연비, 직접 재보는 게 제일 정확해요</h2>
      <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
        <p>주유할 때마다 &apos;이번에 연비 얼마 나왔지?&apos; 궁금하잖아요. 만탱 하고 트립미터 초기화한 다음, 다음 주유 때 거리랑 주유량 넣으면 바로 나옵니다.</p>
        <p>공인연비는 솔직히 참고만 하세요. 실험실에서 잰 거라 실제로는 70~85% 수준밖에 안 나오더라고요. 여름에 에어컨 켜면 연비가 10~20%는 더 떨어져요.</p>
        <p>서울에서 부산까지 400km를 연비 12km/L 차로 가면 기름값이 약 55,000원이에요. 왕복하면 11만원. 여기에 고속도로 통행료까지 합치면 꽤 나가죠. 여행 전에 미리 계산해보면 마음의 준비가 됩니다.</p>
      </div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">연비 아끼는 팁 (실제로 효과 본 것들)</h2>
      <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
        <p>급가속·급제동만 안 해도 연비가 10~15% 좋아져요. 이게 진짜 제일 효과 큽니다. 일반도로에서 60~80km/h 유지하는 것도 중요하고요.</p>
        <p>타이어 공기압도 은근 영향이 커요. 적정보다 10%만 부족해도 연비가 3~5% 빠지거든요. 한 달에 한 번은 체크해보세요.</p>
        <p>여름에 에어컨은 어쩔 수 없지만, 내기순환 모드로 쓰고 24~26도로 맞추면 그나마 덜 떨어져요. 그리고 트렁크에 안 쓰는 짐 빼는 것도 도움 됩니다. 50kg 늘면 연비가 2%씩 떨어진다고 하더라고요.</p>
      </div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">궁금한 점들</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">연비를 정확하게 재려면?</div><div className="text-sm text-[#4E5968] leading-relaxed">만탱 하고 트립미터를 0으로 맞추세요. 다음에 만탱 할 때 주행거리를 주유량으로 나누면 됩니다. 계기판에 뜨는 평균 연비보다 이 방법이 더 정확해요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">공인연비만큼 안 나오는 게 정상인가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">네, 정상이에요. 에어컨, 정체, 오르막 같은 변수가 많아서 공인연비의 70~85% 나오면 잘 나오는 거예요. 너무 차이 나면 점검 한번 받아보세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">서울에서 부산까지 기름값 얼마예요?</div><div className="text-sm text-[#4E5968] leading-relaxed">연비 12km/L, 유가 1,650원 기준으로 약 55,000원이에요. 고속도로 통행료가 약 25,000원 따로 나오니까, 편도 8만원 정도 생각하시면 됩니다.</div></div>
      </div>
    </Card>
  </>);
}
