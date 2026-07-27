'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;

const RECIPES=[
  {name:'치킨너겟',ovenTemp:200,ovenMin:15,afTemp:185,afMin:12},
  {name:'감자튀김',ovenTemp:200,ovenMin:25,afTemp:185,afMin:20},
  {name:'삼겹살',ovenTemp:200,ovenMin:20,afTemp:185,afMin:16},
  {name:'고구마',ovenTemp:200,ovenMin:40,afTemp:180,afMin:35},
  {name:'토스트',ovenTemp:180,ovenMin:5,afTemp:170,afMin:4},
  {name:'냉동피자',ovenTemp:200,ovenMin:15,afTemp:185,afMin:12},
  {name:'새우튀김',ovenTemp:200,ovenMin:12,afTemp:185,afMin:10},
  {name:'핫도그(냉동)',ovenTemp:200,ovenMin:15,afTemp:180,afMin:12},
  {name:'마늘빵',ovenTemp:180,ovenMin:10,afTemp:170,afMin:8},
  {name:'치즈스틱',ovenTemp:200,ovenMin:10,afTemp:185,afMin:8},
];

export default function AirfryerCalc(){
  const [ovenTemp,setOvenTemp]=useState('180');
  const [ovenMin,setOvenMin]=useState('30');

  const ot=+ovenTemp||0, om=+ovenMin||0;
  const afTemp=Math.max(0,ot-15);
  const afMin=Math.round(om*0.8);
  const hasInput=ot>0&&om>0;

  return(<>
    <Card><SectionTitle num="🔥">오븐 레시피 입력</SectionTitle>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">오븐 온도 (°C)</label>
          <input type="number" value={ovenTemp} onChange={e=>setOvenTemp(e.target.value)} min={100} max={250} inputMode="numeric"
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--sub)] mb-1">오븐 시간 (분)</label>
          <input type="number" value={ovenMin} onChange={e=>setOvenMin(e.target.value)} min={5} max={120} inputMode="numeric"
            className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
        </div>
      </div>
    </Card>

    {hasInput&&<Card><SectionTitle num="✅">변환 결과</SectionTitle>
      <div className="grid grid-cols-2 gap-2.5">
        <R v={`${afTemp}°C`} l="에어프라이어 온도"/>
        <R v={`${afMin}분`} l="에어프라이어 시간"/>
      </div>
      <div className="mt-4 bg-gray-50 rounded-xl p-4">
        <h3 className="text-sm font-bold mb-2">변환 팁</h3>
        <ul className="text-xs text-[#4E5968] leading-relaxed space-y-1.5">
          <li>1. 에어프라이어는 오븐보다 온도를 10~20°C 낮추세요 (이 계산기는 15°C 적용)</li>
          <li>2. 조리 시간은 약 20% 줄이세요 (공기 순환이 빨라 더 빨리 익음)</li>
          <li>3. 조리 중간에 한 번 뒤집거나 흔들어주면 골고루 익습니다</li>
        </ul>
      </div>
    </Card>}

    <Card><SectionTitle num="📋">인기 요리 변환표</SectionTitle>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b-2 border-[var(--line)]">
            <th className="text-left py-2 text-xs font-bold text-[var(--sub)]">요리</th>
            <th className="text-center py-2 text-xs font-bold text-[var(--sub)]">오븐</th>
            <th className="text-center py-2 text-xs font-bold text-[var(--sub)]">에어프라이어</th>
          </tr></thead>
          <tbody>
            {RECIPES.map(r=>(
              <tr key={r.name} className="border-b border-[var(--line)]">
                <td className="py-2.5 font-bold text-xs">{r.name}</td>
                <td className="py-2.5 text-center text-xs text-[var(--sub)]">{r.ovenTemp}°C / {r.ovenMin}분</td>
                <td className="py-2.5 text-center text-xs font-bold text-[var(--primary)]">{r.afTemp}°C / {r.afMin}분</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed">오븐 레시피를 에어프라이어로 바꿀 때 온도 15도 낮추고 시간 20% 줄이면 돼요. 중간에 한 번 뒤집어주면 골고루 익습니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 에어프라이어는 예열이 필요한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 3~5분 예열하면 더 바삭하게 나오지만, 안 해도 괜찮아요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 오븐이랑 뭐가 다른가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 에어프라이어는 공기 순환이 빨라서 같은 온도에서도 더 빨리, 더 바삭하게 조리됩니다.</div></div>
      </div>
    </Card>
  </>);
}
