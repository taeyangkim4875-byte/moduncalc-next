'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
const R=({v,l}:{v:string;l:string})=><div className="bg-[var(--primary-weak)] rounded-[14px] p-4 text-center mt-3"><div className="text-[28px] font-extrabold text-[var(--primary-dark)] tracking-tight">{v}</div><div className="text-xs text-[var(--sub)] mt-1">{l}</div></div>;

const CHECKUPS=[
  {week:8,name:'초기 초음파',desc:'임신 확인, 태아 심박 확인'},
  {week:12,name:'1차 기형아 검사',desc:'목덜미 투명대 검사 (NT)'},
  {week:16,name:'2차 기형아 검사',desc:'쿼드 검사 (혈액검사)'},
  {week:20,name:'정밀 초음파',desc:'태아 장기 발달 확인'},
  {week:24,name:'임신성 당뇨 검사',desc:'경구 포도당 부하 검사 (GCT)'},
  {week:28,name:'빈혈 검사',desc:'혈액검사, Rh 항체 검사'},
  {week:32,name:'태아 안녕 검사',desc:'비수축 검사 (NST) 시작'},
  {week:36,name:'GBS 검사',desc:'B군 연쇄상구균 검사'},
  {week:37,name:'출산 준비',desc:'매주 검진, 내진 시작'},
];

export default function DueDateCalc(){
  const [method,setMethod]=useState<'lmp'|'ovulation'>('lmp');
  const [dateStr,setDateStr]=useState('');

  const d=dateStr?new Date(dateStr+'T00:00:00'):null;
  const now=new Date();
  const valid=d&&!isNaN(d.getTime())&&d<now;

  const dueDate=valid?new Date(d.getTime()+(method==='lmp'?280:266)*864e5):null;
  const lmpDate=valid&&method==='ovulation'?new Date(d.getTime()-14*864e5):d;
  const totalDays=valid&&lmpDate?Math.floor((now.getTime()-lmpDate.getTime())/864e5):0;
  const weeks=Math.floor(totalDays/7);
  const days=totalDays%7;
  const progress=Math.min(100,Math.max(0,(totalDays/280)*100));

  const fmt=(dt:Date)=>`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
  const trimester=weeks<13?1:weeks<28?2:3;

  const checkupDate=(weekNum:number)=>{
    if(!lmpDate)return'';
    const cd=new Date(lmpDate.getTime()+weekNum*7*864e5);
    return fmt(cd);
  };

  return(<>
    <Card><SectionTitle num="🤰">기준일 입력</SectionTitle>
      <div className="mb-4">
        <label className="block text-xs font-bold text-[var(--sub)] mb-1">계산 방식</label>
        <div className="flex gap-2">
          <button onClick={()=>setMethod('lmp')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${method==='lmp'?'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]':'border-[var(--line)] text-[var(--sub)]'}`}>마지막 생리일 기준</button>
          <button onClick={()=>setMethod('ovulation')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-[1.5px] transition-colors ${method==='ovulation'?'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]':'border-[var(--line)] text-[var(--sub)]'}`}>배란일 기준</button>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-[var(--sub)] mb-1">{method==='lmp'?'마지막 생리 시작일':'배란일'}</label>
        <input type="date" value={dateStr} onChange={e=>setDateStr(e.target.value)}
          className="w-full py-3 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] text-center"/>
      </div>
    </Card>

    {valid&&dueDate&&<>
      <Card><SectionTitle num="📅">계산 결과</SectionTitle>
        <R v={fmt(dueDate)} l="출산 예정일"/>
        <R v={`${weeks}주 ${days}일`} l="현재 임신 주수"/>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-[var(--sub)] mb-1">
            <span>0주</span><span>임신 진행률 {progress.toFixed(1)}%</span><span>40주</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[var(--primary)] rounded-full transition-all" style={{width:`${progress}%`}}/>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[1,2,3].map(t=>(
            <div key={t} className={`py-2.5 rounded-xl text-center text-xs font-bold border-[1.5px] ${trimester===t?'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary)]':'border-[var(--line)] text-[var(--sub)]'}`}>
              {t}분기 ({t===1?'1~12주':t===2?'13~27주':'28~40주'})
            </div>
          ))}
        </div>
      </Card>

      <Card><SectionTitle num="🏥">주요 검진 일정</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[var(--line)]">
              <th className="text-left py-2 text-xs font-bold text-[var(--sub)]">주수</th>
              <th className="text-left py-2 text-xs font-bold text-[var(--sub)]">검사</th>
              <th className="text-left py-2 text-xs font-bold text-[var(--sub)]">예상 날짜</th>
            </tr></thead>
            <tbody>
              {CHECKUPS.map(c=>{
                const isPast=weeks>=c.week;
                const isCurrent=weeks>=c.week-1&&weeks<=c.week+1;
                return(
                  <tr key={c.week} className={`border-b border-[var(--line)] ${isCurrent?'bg-[var(--primary-weak)]':isPast?'opacity-50':''}`}>
                    <td className="py-2 font-bold">{c.week}주</td>
                    <td className="py-2"><div className="font-bold text-xs">{c.name}</div><div className="text-xs text-[var(--sub)]">{c.desc}</div></td>
                    <td className="py-2 text-xs">{checkupDate(c.week)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>}

    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 임신 주수 계산 방법</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">임신 주수는 마지막 생리 시작일(LMP)부터 계산합니다. 실제 수정은 배란일(생리 시작 약 14일 후) 즈음에 이루어지므로, 임신 1~2주차에는 실제로 아직 임신이 아닌 상태입니다. 이는 국제적으로 통일된 계산 방식입니다.</p>
      <h3 className="text-sm font-bold mb-2">네겔레 공식</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">독일의 산부인과 의사 프란츠 네겔레가 고안한 공식으로, 마지막 생리 시작일에 280일(40주)을 더해 출산 예정일을 계산합니다. 간편하게는 생리 시작 월에서 3을 빼고(또는 9를 더하고), 날짜에 7을 더하는 방법도 있습니다.</p>
      <h3 className="text-sm font-bold mb-2">실제 출산일과의 차이</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed">정확히 예정일에 출산하는 비율은 약 5%에 불과합니다. 예정일 전후 2주(38~42주) 내 출산이 정상 범위이며, 초산의 경우 예정일보다 늦어지는 경향이 있습니다. 초음파 측정으로 보정한 예정일이 더 정확할 수 있습니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 출산 예정일은 정확한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 출산 예정일은 네겔레 공식에 의한 추정일입니다. 실제 출산일은 예정일 전후 2주 이내가 정상 범위이며, 정확히 예정일에 출산하는 비율은 약 5%입니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 배란일 기준과 생리일 기준 중 어느 것이 더 정확한가요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 배란일을 정확히 알고 있다면 배란일 기준이 더 정확할 수 있습니다. 하지만 대부분 배란일을 정확히 알기 어려워 마지막 생리 시작일 기준을 많이 사용합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 임신 주수는 어떻게 계산하나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 마지막 생리 시작일부터 오늘까지의 일수를 7로 나누어 계산합니다. 생리일 기준이므로 실제 수정은 약 2주 후에 이루어진 것으로 봅니다.</div></div>
      </div>
    </Card>
  </>);
}
