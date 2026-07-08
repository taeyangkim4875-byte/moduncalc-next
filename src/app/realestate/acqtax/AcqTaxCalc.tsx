'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import { won } from '@/utils/format';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParams, setParams } from '@/utils/params';

export default function AcqTaxCalc(){
  const [price,setPrice]=useState(50000);
  const [houseType,setHouseType]=useState('apt');
  const [houseCount,setHouseCount]=useState(1);
  const [area,setArea]=useState(85);
  const [result,setResult]=useState<{acqTax:number;nongTax:number;eduTax:number;total:number;rate:number}|null>(null);
  const [autoCalc,setAutoCalc]=useState(false);

  useEffect(()=>{
    const p=getParams();
    if(!Object.keys(p).length)return;
    if(p.price)setPrice(+p.price);
    if(p.houseType)setHouseType(p.houseType);
    if(p.houseCount)setHouseCount(+p.houseCount);
    if(p.area)setArea(+p.area);
    setAutoCalc(true);
  },[]);

  useEffect(()=>{
    if(autoCalc){calc();setAutoCalc(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[autoCalc]);

  const calc=()=>{
    const priceWon=price*10000;
    let rate:number;
    if(houseCount===1){
      if(price<=60000)rate=0.01;
      else if(price<=90000){const r=(price/10000*2/3-3)/100;rate=Math.max(0.01,Math.min(0.03,r));}
      else rate=0.03;
    }else if(houseCount===2)rate=0.08;
    else rate=0.12;
    const acqTax=Math.round(priceWon*rate);
    const nongTax=area<=85?0:Math.round(priceWon*0.002);
    const eduTax=Math.round(acqTax*0.1);
    setResult({acqTax,nongTax,eduTax,total:acqTax+nongTax+eduTax,rate});
    setParams({price,houseType,houseCount,area});
    scrollToResult();
  };

  const seg=(opts:{label:string;value:number|string}[],current:number|string,set:(v:number|string)=>void)=>
    <div className="flex flex-wrap gap-2">{opts.map(o=><button key={String(o.value)} onClick={()=>set(o.value)} className={`flex-1 min-w-[60px] py-2.5 px-2 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer transition-all ${current===o.value?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{o.label}</button>)}</div>;

  return(<>
    <Card><SectionTitle num="1">매매 정보</SectionTitle>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">매매가격 <span className="text-xs text-[var(--sub)] font-medium ml-1">{price>=10000?`${Math.floor(price/10000)}억${price%10000?` ${(price%10000).toLocaleString()}만`:''}`:price.toLocaleString()+'만'}원</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={price} onChange={e=>setPrice(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">만원</span></div>
        <input type="range" min={0} max={200000} step={1000} value={price} onChange={e=>setPrice(+e.target.value)} className="w-full mt-3.5"/>
      </div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">주택 유형</label>{seg([{label:'아파트',value:'apt'},{label:'주택',value:'house'},{label:'오피스텔',value:'officetel'}],houseType,v=>setHouseType(v as string))}</div>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">주택 수</label>{seg([{label:'1주택',value:1},{label:'2주택',value:2},{label:'3주택+',value:3},{label:'법인',value:4}],houseCount,v=>setHouseCount(v as number))}</div>
      <div className="mb-0">
        <label className="block text-sm font-bold mb-2">면적 <span className="text-xs text-[var(--sub)] font-medium ml-1">85㎡ 이하 농특세 면제</span></label>
        <div className="flex items-center gap-2.5"><input type="number" value={area} onChange={e=>setArea(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">㎡</span></div>
      </div>
    </Card>
    {result&&<div id="calc-result">
      <div className="text-lg font-extrabold mt-4 mb-3 px-1">취득세 결과</div>
      <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
        <div className="text-center py-2">
          <div className="text-sm font-bold text-[var(--sub)]">총 납부세액</div>
          <div className="text-[38px] font-extrabold text-[var(--primary-dark)] tracking-tight">{won(result.total)}</div>
          <div className="text-sm text-[var(--sub)]">세율 {(result.rate*100).toFixed(1)}%</div>
        </div>
        <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2.5 text-[13.5px]">
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">취득세</span><span className="font-bold">{won(result.acqTax)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">농어촌특별세{area<=85?' (면제)':''}</span><span className="font-bold">{won(result.nongTax)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--sub)] font-semibold">지방교육세</span><span className="font-bold">{won(result.eduTax)}</span></div>
        </div>
      </div>
    </div>}
    {result && <ShareButtons title="취득세 계산 결과" />}
    {!result&&<Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 취득세를 계산해 드려요.</Card>}
    <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
      <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">참고용 추정치입니다. 정확한 세액은 관할 지자체에 확인하세요.</div>
    </footer>
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 취득세란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">취득세는 부동산, 차량 등 자산을 취득(매매, 상속, 증여 등)할 때 납부하는 지방세입니다. 주택 매매의 경우 취득가액에 세율을 곱하여 산출하며, 주택 수와 거래금액에 따라 1~12%까지 차등 적용됩니다. 1주택자는 6억 이하 1%, 6~9억 구간 1~3%, 9억 초과 3%가 기본 세율입니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">취득세와 함께 지방교육세(취득세의 10%)가 부과되며, 전용면적 85㎡ 초과 주택에는 농어촌특별세(0.2%)도 추가됩니다. 다주택자의 경우 2주택 8%, 3주택 이상 12%의 중과세율이 적용되어 세 부담이 크게 증가합니다. 취득일로부터 60일 이내에 관할 구청에 신고·납부해야 합니다.</p>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 생애 첫 주택 취득세 감면이 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 생애 최초로 주택을 구입하는 경우 취득세 감면 혜택이 있습니다. 부부 합산 소득 기준을 충족하고 취득가액 12억원 이하인 경우, 최대 200만원까지 취득세를 감면받을 수 있습니다. 세대 구성원 전원이 주택을 소유한 사실이 없어야 합니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 다주택자 중과세율은 어떻게 되나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 조정대상지역 내 2주택 취득 시 8%, 3주택 이상 또는 법인은 12%의 중과세율이 적용됩니다. 비조정지역의 경우 완화된 세율이 적용될 수 있으며, 일시적 2주택 등 예외 사항도 있으니 정확한 세율은 관할 지자체에 확인하세요.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 전용면적 85㎡ 이하이면 어떤 혜택이 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 전용면적 85㎡(약 25.7평) 이하 주택은 농어촌특별세(0.2%)가 면제됩니다. 이는 국민주택 규모에 해당하며, 취득세와 지방교육세만 납부하면 됩니다. 85㎡ 초과 시에는 농어촌특별세가 추가로 부과됩니다.</div></div>
      </div>
    </Card>

    <CtaButton label="취득세 계산하기" onClick={calc}/>
  </>);
}
