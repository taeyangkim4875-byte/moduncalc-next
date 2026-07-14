'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

const fmt=(n:number)=>n.toLocaleString('ko-KR');

export default function PaintCalc(){
  const [roomW,setRoomW]=useState(4);
  const [roomD,setRoomD]=useState(3.5);
  const [ceilH,setCeilH]=useState(2.4);
  const [doors,setDoors]=useState(2);
  const [coats,setCoats]=useState(2);
  const [result,setResult]=useState<{wallArea:number;ceilArea:number;totalArea:number;paintL:number;wallpaperRolls:number;paintCans:{s1:number;s4:number;s18:number};paintCost:number;wallpaperCost:number}|null>(null);
  const [autoCalc,setAutoCalc]=useState(false);

  useEffect(()=>{
    const p=getParams();
    if(!Object.keys(p).length)return;
    if(p.roomW)setRoomW(+p.roomW);
    if(p.roomD)setRoomD(+p.roomD);
    if(p.ceilH)setCeilH(+p.ceilH);
    if(p.doors)setDoors(+p.doors);
    if(p.coats)setCoats(+p.coats);
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);

  const calc=()=>{
    const w=roomW||0,d=roomD||0,h=ceilH||0,dr=doors||0,ct=coats||0;
    if(w<=0||d<=0||h<=0||ct<=0)return;
    const wallArea=Math.round(((w+d)*2*h-(dr*2))*10)/10;
    const ceilArea=Math.round(w*d*10)/10;
    const totalPaintArea=Math.round((wallArea+ceilArea)*ct*10)/10;
    const paintL=Math.round(totalPaintArea/10*10)/10;
    const wallpaperRolls=Math.ceil(wallArea/5*1.1);
    const s18=Math.floor(paintL/18);
    const rem18=paintL-s18*18;
    const s4=Math.floor(rem18/4);
    const rem4=rem18-s4*4;
    const s1=Math.ceil(rem4);
    const paintCost=Math.round(paintL*15000);
    const wallpaperCost=wallpaperRolls*20000;
    setResult({wallArea,ceilArea,totalArea:totalPaintArea,paintL,wallpaperRolls,paintCans:{s1,s4,s18},paintCost,wallpaperCost});
    setParams({roomW,roomD,ceilH,doors,coats});
    scrollToResult();
  };

  return(<>
    <Card><SectionTitle num="1">방 크기</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">방 가로 <span className="text-xs text-[var(--sub)] font-medium ml-1">{roomW}m</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={roomW} onChange={e=>setRoomW(+e.target.value||0)} step={0.1} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">m</span></div>
        <input type="range" min={1} max={20} step={0.1} value={roomW} onChange={e=>setRoomW(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">방 세로 <span className="text-xs text-[var(--sub)] font-medium ml-1">{roomD}m</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={roomD} onChange={e=>setRoomD(+e.target.value||0)} step={0.1} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">m</span></div>
        <input type="range" min={1} max={20} step={0.1} value={roomD} onChange={e=>setRoomD(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">천장 높이 <span className="text-xs text-[var(--sub)] font-medium ml-1">{ceilH}m</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={ceilH} onChange={e=>setCeilH(+e.target.value||0)} step={0.1} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">m</span></div>
        <input type="range" min={2.0} max={4.0} step={0.1} value={ceilH} onChange={e=>setCeilH(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">문/창문 수 <span className="text-xs text-[var(--sub)] font-medium ml-1">개당 약 2m&sup2; 제외</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={doors} onChange={e=>setDoors(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">개</span></div>
        <input type="range" min={0} max={10} value={doors} onChange={e=>setDoors(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">도포 횟수</label>
        <div className="flex gap-2">
          {[1,2,3].map(c=><button key={c} onClick={()=>setCoats(c)} className={`flex-1 py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${coats===c?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{c}회</button>)}
        </div>
      </div>
    </Card>
    {result&&<div id="calc-result">
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">계산 결과</div>
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">벽 면적</div><div className="text-lg font-extrabold text-[var(--primary-dark)] mt-1">{result.wallArea}</div><div className="text-[10px] text-[var(--sub)]">m&sup2;</div></div>
        <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">천장 면적</div><div className="text-lg font-extrabold text-[var(--primary-dark)] mt-1">{result.ceilArea}</div><div className="text-[10px] text-[var(--sub)]">m&sup2;</div></div>
        <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">총 도포 면적</div><div className="text-lg font-extrabold text-[var(--green)] mt-1">{result.totalArea}</div><div className="text-[10px] text-[var(--sub)]">m&sup2;</div></div>
      </div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-sm font-extrabold mb-3">페인트</div>
        <div className="flex flex-col gap-2 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">필요량</span><span className="font-bold">{result.paintL}L</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">추천 구매</span><span className="font-bold">{result.paintCans.s18>0?`18L x ${result.paintCans.s18}`:''}{result.paintCans.s4>0?` 4L x ${result.paintCans.s4}`:''}{result.paintCans.s1>0?` 1L x ${result.paintCans.s1}`:''}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">예상 비용</span><span className="font-bold text-[var(--primary-dark)]">~{fmt(result.paintCost)}원</span></div>
        </div>
        <div className="mt-4 pt-3 border-t border-[var(--line)]">
          <div className="text-sm font-extrabold mb-3">벽지</div>
          <div className="flex flex-col gap-2 text-[13.5px]">
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">필요 롤 수</span><span className="font-bold">{result.wallpaperRolls}롤</span></div>
            <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">예상 비용</span><span className="font-bold text-[var(--primary-dark)]">~{fmt(result.wallpaperCost)}원</span></div>
          </div>
        </div>
      </div>
    </div>}
    {result && <ShareButtons title="페인트/벽지 계산 결과" />}
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 필요한 자재량을 계산해 드려요.</Card>}
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 셀프 페인팅 가이드</h2>
      <h3 className="text-sm font-extrabold mt-2 mb-2">셀프 페인팅 순서</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">1. <strong>준비:</strong> 바닥과 가구를 비닐/마스킹 테이프로 보호합니다. 2. <strong>하도(프라이머):</strong> 벽면의 접착력을 높이기 위해 프라이머를 먼저 바릅니다. 3. <strong>1차 도포:</strong> 롤러로 넓은 면적을, 붓으로 모서리와 테두리를 칠합니다. 4. <strong>건조:</strong> 최소 2~4시간 건조 후 2차 도포합니다. 5. <strong>2차 도포:</strong> 같은 방향으로 균일하게 칠해 마감합니다.</p>
      <h3 className="text-sm font-extrabold mt-4 mb-2">페인트 종류</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3"><strong>수성 페인트:</strong> 냄새가 적고 건조가 빠르며, 물로 세척할 수 있어 셀프 시공에 적합합니다. 실내 벽면, 천장에 주로 사용합니다. <strong>유성 페인트:</strong> 내구성이 좋고 광택이 있어 문, 가구, 외벽 등에 적합합니다. 냄새가 강하고 시너로 세척해야 합니다.</p>
      <h3 className="text-sm font-extrabold mt-4 mb-2">벽지 시공 팁</h3>
      <p className="text-sm text-[#4E5968] leading-relaxed">벽지를 시공할 때는 반드시 기존 벽지를 제거하고, 벽면을 평탄하게 정리한 후 시공하세요. 실크 벽지는 내구성이 좋아 거실에, 합지 벽지는 가성비가 좋아 침실에 적합합니다. 벽지 풀은 벽면에 바르는 것이 기본이며, 위에서 아래로 기포를 빼가며 부착합니다. 약 10%의 손실(재단, 무늬맞춤)을 감안하여 여유분을 준비하세요.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 페인트 1L로 몇 m&sup2;를 칠할 수 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 일반적으로 1L당 약 8~12m&sup2;를 도포할 수 있습니다. 이 계산기는 평균값인 10m&sup2;/L 기준으로 계산합니다. 벽면 상태, 페인트 종류, 흡수율에 따라 달라질 수 있으므로 약간의 여유분을 두는 것이 좋습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 2회 도포가 필요한 이유는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 1회만 도포하면 기존 색이 비치거나 얼룩이 생길 수 있습니다. 2회 도포하면 색이 균일하게 나오고, 내구성도 높아집니다. 진한 색을 밝은 색으로 바꿀 때는 3회 이상 도포가 필요할 수 있습니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 셀프 페인팅 vs 업체 시공, 비용 차이는?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 셀프 시공은 재료비만 들어 약 10~30만원 선이지만, 업체 시공은 인건비 포함 평당 3~5만원 수준으로 10평 방 기준 30~50만원 정도입니다. 시간 여유가 있고 간단한 공간이라면 셀프 시공이 경제적입니다.</div></div>
      </div>
    </Card>

    <CtaButton label="필요량 계산하기" onClick={calc}/>
  </>);
}
