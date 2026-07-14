'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;

const PRESETS=[
  {name:'소주 1잔',ml:50,abv:16.5},
  {name:'소주 1병',ml:360,abv:16.5},
  {name:'맥주 500ml',ml:500,abv:4.5},
  {name:'맥주 1000ml',ml:1000,abv:4.5},
  {name:'와인 1잔',ml:150,abv:12},
  {name:'직접입력',ml:0,abv:0},
];

export default function AlcoholCalc(){
  const [gender,setGender]=useState<'male'|'female'>('male');
  const [weight,setWeight]=useState('70');
  const [preset,setPreset]=useState(0);
  const [abv,setAbv]=useState('16.5');
  const [ml,setMl]=useState('50');
  const [elapsed,setElapsed]=useState('0');

  const handlePreset=(i:number)=>{
    setPreset(i);
    if(i<5){setMl(String(PRESETS[i].ml));setAbv(String(PRESETS[i].abv));}
  };

  const w=+weight||0, a=+abv||0, m=+ml||0, e=+elapsed||0;
  const pureAlcohol=m*(a/100)*0.7894;
  const genderFactor=gender==='male'?0.68:0.55;
  const bac=w>0?pureAlcohol/(w*genderFactor*10):0;
  const decayRate=0.015;
  const currentBac=Math.max(0,bac-e*decayRate);
  const remainHours=currentBac>0?currentBac/decayRate:0;
  const now=new Date();
  const driveTime=new Date(now.getTime()+remainHours*3600000);
  const fmt=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  const hasInput=m>0&&w>0&&a>0;

  const dangerLevel=currentBac>=0.08?'취소':currentBac>=0.03?'정지':'안전';
  const dangerColor=currentBac>=0.08?'text-red-600':currentBac>=0.03?'text-orange-500':'text-green-600';

  return(<>
    <Card><SectionTitle num="🍺">음주 정보 입력</SectionTitle>
      <div className="mb-4">
        <label className="block text-xs font-bold text-[var(--sub)] mb-1">성별</label>
        <div className="flex gap-2">
          <button onClick={()=>setGender('male')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${gender==='male'?'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]':'border-[var(--line)] text-[var(--sub)]'}`}>남성</button>
          <button onClick={()=>setGender('female')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${gender==='female'?'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]':'border-[var(--line)] text-[var(--sub)]'}`}>여성</button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-bold text-[var(--sub)] mb-1">체중 (kg)</label>
        <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} min={40} max={120} inputMode="numeric"
          className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-bold text-[var(--sub)] mb-2">음주량 프리셋</label>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((p,i)=>(
            <button key={i} onClick={()=>handlePreset(i)} className={`py-2 rounded-xl text-xs font-bold border-[1.5px] transition-colors ${preset===i?'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]':'border-[var(--line)] text-[var(--sub)]'}`}>{p.name}</button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">알코올 도수 (%)</label>
          <input type="number" value={abv} onChange={e=>setAbv(e.target.value)} step={0.1} inputMode="decimal"
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">음주량 (ml)</label>
          <input type="number" value={ml} onChange={e=>setMl(e.target.value)} inputMode="numeric"
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-[var(--sub)] mb-1">마지막 음주 후 경과 시간</label>
        <input type="number" value={elapsed} onChange={e=>setElapsed(e.target.value)} min={0} max={24} step={0.5} inputMode="decimal"
          className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
      </div>
    </Card>

    {hasInput&&<Card><SectionTitle num="📊">계산 결과</SectionTitle>
      <R v={`${currentBac.toFixed(4)}%`} l="현재 추정 혈중알코올농도"/>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <R v={remainHours>0?`${Math.floor(remainHours)}시간 ${Math.round((remainHours%1)*60)}분`:'즉시 가능'} l="운전 가능까지 남은 시간"/>
        <R v={remainHours>0?fmt(driveTime):'지금 가능'} l="운전 가능 예상 시점"/>
      </div>
      <div className={`mt-4 p-3 rounded-xl text-center font-bold text-sm ${currentBac>=0.03?'bg-red-50':'bg-green-50'}`}>
        <span className={dangerColor}>
          {currentBac>=0.08?'면허취소 기준 (0.08%) 초과':currentBac>=0.03?'면허정지 기준 (0.03%) 초과':'단속 기준 이하 (0.03% 미만)'}
        </span>
      </div>
      <div className="mt-3 text-xs text-[var(--sub)] leading-relaxed bg-yellow-50 rounded-xl p-3">
        <strong>단속 기준 안내:</strong> 혈중알코올농도 0.03% 이상 → 면허정지 / 0.08% 이상 → 면허취소
      </div>
      <div className="mt-2 text-xs text-red-500 leading-relaxed bg-red-50 rounded-xl p-3">
        이 결과는 Widmark 공식에 의한 추정치이며, 실제 분해속도는 개인차가 큽니다. 절대적인 기준으로 사용하지 마세요.
      </div>
    </Card>}

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 음주운전 처벌 기준 (2026)</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">대한민국 도로교통법상 혈중알코올농도 0.03% 이상이면 음주운전으로 처벌됩니다. 0.03~0.08% 미만은 면허정지 및 1년 이하 징역 또는 500만원 이하 벌금, 0.08% 이상은 면허취소 및 1~5년 징역 또는 500~2000만원 벌금이 부과됩니다.</p>
      <h3 className="text-sm font-bold mb-2">알코올 분해 원리</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">섭취된 알코올은 간에서 알코올 탈수소효소(ADH)에 의해 아세트알데히드로, 다시 알데히드 탈수소효소(ALDH)에 의해 아세트산으로 분해됩니다. 평균적으로 시간당 약 0.015%의 혈중알코올이 분해되며, 이 속도는 체질, 간 건강, 유전적 요인에 따라 달라집니다.</p>
      <h3 className="text-sm font-bold mb-2">해장에 도움이 되는 것 / 안 되는 것</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">도움이 되는 것: 충분한 수분 섭취(물, 이온음료), 충분한 수면, 가벼운 식사(죽, 수프). 알코올 분해를 직접 빠르게 하는 것은 아니지만 숙취 증상을 완화합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">도움이 안 되는 것: 커피(탈수 악화), 해장술(알코올 추가 섭취), 사우나(탈수 및 심혈관 부담). 특히 해장술은 알코올을 추가로 섭취하는 것이므로 절대 금물입니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 혈중알코올농도 0.03%면 어떤 처벌을 받나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 혈중알코올농도 0.03% 이상 0.08% 미만은 면허정지 처분을 받으며, 1년 이하의 징역 또는 500만원 이하의 벌금이 부과됩니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 음주 후 해장국을 먹으면 알코올이 빨리 분해되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 해장국은 위장을 보호하고 수분을 보충해 숙취 해소에 도움이 되지만, 알코올 분해 속도 자체를 빠르게 하지는 않습니다. 시간만이 유일한 해결책입니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 이 계산기의 결과를 법적 근거로 사용할 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 아닙니다. 이 계산기는 Widmark 공식에 기반한 추정치이며, 실제 혈중알코올농도는 체질, 음식 섭취, 컨디션 등에 따라 크게 달라질 수 있습니다. 참고용으로만 사용하세요.</div></div>
      </div>
    </Card>
  </>);
}
