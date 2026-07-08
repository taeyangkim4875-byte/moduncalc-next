'use client';
import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function VatCalc(){
  const [mode,setMode]=useState<'supply'|'total'>('supply');
  const [amount,setAmount]=useState(1000000);
  const supply=mode==='supply'?amount:Math.round(amount/1.1);
  const vat=mode==='supply'?Math.round(amount*0.1):amount-supply;
  const total=mode==='supply'?amount+vat:amount;

  return(<>
    <Card><SectionTitle num="1">금액 입력</SectionTitle>
      <div className="mb-4"><label className="block text-sm font-bold mb-2">입력 방식</label>
        <div className="flex gap-2">
          {([['supply','공급가액'],['total','합계금액']] as const).map(([v,l])=><button key={v} onClick={()=>setMode(v)} className={`flex-1 py-2.5 border-[1.5px] rounded-xl text-sm font-bold cursor-pointer ${mode===v?'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]':'bg-white border-[var(--line)] text-[var(--sub)]'}`}>{l}</button>)}
        </div>
      </div>
      <div className="mb-0"><label className="block text-sm font-bold mb-2">{mode==='supply'?'공급가액':'합계금액'}</label>
        <div className="flex items-center gap-2.5"><input type="number" value={amount} onChange={e=>setAmount(+e.target.value||0)} className="flex-1 py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)]"/><span className="text-sm font-bold text-[var(--sub)]">원</span></div>
      </div>
    </Card>
    <div className="grid grid-cols-3 gap-2.5">
      <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">공급가액</div><div className="text-lg font-extrabold text-[var(--ink)] mt-1">{supply.toLocaleString()}</div><div className="text-[10px] text-[var(--sub)]">원</div></div>
      <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">부가세(10%)</div><div className="text-lg font-extrabold text-[var(--primary-dark)] mt-1">{vat.toLocaleString()}</div><div className="text-[10px] text-[var(--sub)]">원</div></div>
      <div className="bg-white rounded-[14px] shadow-[var(--shadow)] p-4 text-center"><div className="text-xs text-[var(--sub)] font-bold">합계금액</div><div className="text-lg font-extrabold text-[var(--green)] mt-1">{total.toLocaleString()}</div><div className="text-[10px] text-[var(--sub)]">원</div></div>
    </div>
    <Card>
      <h2 className="text-base font-extrabold mb-3">📖 부가가치세(VAT)란?</h2>
      <p className="text-sm text-[#4E5968] leading-relaxed mb-3">부가가치세(VAT)는 상품이나 서비스의 거래 과정에서 발생하는 부가가치에 대해 부과되는 간접세입니다. 한국의 부가가치세율은 10%이며, 공급가액의 10%가 부가세로 부과됩니다. 합계금액(공급가 + 부가세)에서 공급가를 구하려면 합계금액 ÷ 1.1로 계산합니다.</p>
      <p className="text-sm text-[#4E5968] leading-relaxed">사업자는 분기별(1월, 4월, 7월, 10월 25일까지)로 부가세를 신고·납부해야 합니다. 매출세액에서 매입세액을 차감한 금액을 납부하며, 매입세액이 더 크면 환급받을 수 있습니다.</p>
    </Card>
    <Card>
      <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
      <div className="flex flex-col gap-4">
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 부가세 포함가에서 공급가를 구하는 공식은?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 공급가액 = 합계금액 ÷ 1.1, 부가세 = 합계금액 - 공급가액입니다. 예를 들어 110,000원의 합계금액에서 공급가 100,000원, 부가세 10,000원이 됩니다.</div></div>
        <div><div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 부가세가 면제되는 품목이 있나요?</div><div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 미가공 식료품, 의료·교육 서비스, 도서·신문, 대중교통 등은 부가세가 면제됩니다. 이를 &apos;면세&apos;라 하며, 면세 사업자는 부가세 신고 의무가 없습니다.</div></div>
      </div>
    </Card>
  </>);
}
