'use client';
import { useState, useEffect } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import CtaButton from '@/components/CtaButton';
import SliderInput from '@/components/SliderInput';
import { scrollToResult } from '@/utils/scroll';
import ShareButtons from '@/components/ShareButtons';
import { getParamsWithProfile, setParams } from '@/utils/params';
import ChainBanner from '@/components/ChainBanner';
import JourneyBreadcrumb from '@/components/JourneyBreadcrumb';
import ProfileBanner from '@/components/ProfileBanner';
import SavePrompt from '@/components/SavePrompt';
import ModeToggle from '@/components/ModeToggle';

const CATEGORIES=[{max:18.5,label:'저체중',color:'#3182F6'},{max:23,label:'정상',color:'#00C271'},{max:25,label:'과체중',color:'#F59E0B'},{max:30,label:'비만 1단계',color:'#E5484D'},{max:35,label:'비만 2단계',color:'#E5484D'},{max:Infinity,label:'고도비만',color:'#C62828'}];

const QUICK_TARGETS = [
  { label: '정상', bmi: 22.0 },
  { label: '과체중 경계', bmi: 23.0 },
  { label: '비만 경계', bmi: 25.0 },
];

function getCategory(bmi: number) {
  return CATEGORIES.find(c => bmi < c.max) || CATEGORIES[CATEGORIES.length - 1];
}

export default function BmiReverse() {
  const [height, setHeight] = useState(170);
  const [targetBmi, setTargetBmi] = useState(22);
  const [result, setResult] = useState<{
    targetWeight: number;
    category: string;
    color: string;
    normalMin: number;
    normalMax: number;
  } | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);
  const [profileFilled, setProfileFilled] = useState<string[]>([]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const { params: p, profileKeys } = getParamsWithProfile();
    if (!Object.keys(p).length) return;
    if (p.height) setHeight(+p.height);
    if (p.targetBmi) setTargetBmi(+p.targetBmi);
    setProfileFilled(profileKeys.filter(k => ['height'].includes(k)));
    setAutoCalc(true);
  }, []);

  useEffect(() => {
    if (autoCalc) { calc(); setAutoCalc(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalc]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function calc() {
    if (height <= 0 || targetBmi <= 0) return;
    const h = height / 100;
    const targetWeight = Math.round(targetBmi * h * h * 10) / 10;
    const normalMin = Math.round(18.5 * h * h * 10) / 10;
    const normalMax = Math.round(22.9 * h * h * 10) / 10;
    const cat = getCategory(targetBmi);
    setResult({ targetWeight, category: cat.label, color: cat.color, normalMin, normalMax });
    setParams({ height, targetBmi }, { primaryOutput: `${targetWeight}kg` });
    scrollToResult();
  }

  return (<>
    <ChainBanner />
    <JourneyBreadcrumb currentHref="/health/bmi/reverse" />
    <ProfileBanner filledKeys={profileFilled} />
    <ModeToggle forwardHref="/health/bmi" reverseHref="/health/bmi/reverse" mode="reverse" forwardLabel="체중 → BMI" reverseLabel="목표 BMI → 체중" />
    <Card>
      <SectionTitle num="1">신체 정보</SectionTitle>
      <SliderInput label="키" hint={`${height}cm`} value={height} onChange={setHeight} min={130} max={210} unit="cm" />
      <SliderInput label="목표 BMI" hint={targetBmi.toFixed(1)} value={targetBmi} onChange={setTargetBmi} min={15} max={40} step={0.1} className="mb-3" />
      <div className="flex gap-2 mb-0">
        {QUICK_TARGETS.map(t => (
          <button key={t.label} onClick={() => setTargetBmi(t.bmi)}
            className={`flex-1 py-2 border-[1.5px] rounded-xl text-xs font-bold cursor-pointer transition-all ${
              targetBmi === t.bmi
                ? 'bg-[var(--primary-weak)] border-[var(--primary)] text-[var(--primary-dark)]'
                : 'bg-white border-[var(--line)] text-[var(--sub)]'
            }`}>
            {t.label} ({t.bmi})
          </button>
        ))}
      </div>
    </Card>

    {result && (
      <div id="calc-result">
        <div className="text-lg font-extrabold mt-4 mb-3 px-1">목표 체중</div>
        <div className="bg-white rounded-[18px] shadow-[var(--shadow)] p-5 mb-3.5 border-[1.5px] border-[var(--primary)]">
          <span className="inline-flex text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5" style={{ background: result.color + '20', color: result.color }}>
            BMI {targetBmi.toFixed(1)} · {result.category}
          </span>
          <div className="text-center py-2">
            <div className="text-sm font-bold text-[var(--sub)]">키 {height}cm 기준 목표 체중</div>
            <div className="text-[44px] font-extrabold tracking-tight" style={{ color: result.color }}>
              {result.targetWeight}<span className="text-lg font-bold">kg</span>
            </div>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex flex-col gap-2 text-[13.5px]">
            <div className="flex justify-between">
              <span className="text-[var(--sub)] font-semibold">정상 BMI 체중 범위</span>
              <span className="font-bold">{result.normalMin}~{result.normalMax}kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--sub)] font-semibold">목표 BMI</span>
              <span className="font-bold">{targetBmi.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    )}

    <SavePrompt />
    {result && <ShareButtons title="목표 BMI 체중 결과" />}
    {!result && <Card className="text-center text-[var(--sub)] text-sm py-8">버튼을 누르면 목표 체중을 계산해 드려요.</Card>}

    <Card>
      <div className="text-[13px] font-extrabold mb-2">📊 BMI 분류 (WHO 아시아태평양)</div>
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="border-b-[1.5px] border-[var(--line)]"><th className="text-left py-2 text-xs text-[var(--sub)] font-bold">분류</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">BMI</th><th className="text-right py-2 text-xs text-[var(--sub)] font-bold">{height}cm 기준</th></tr></thead>
        <tbody>{CATEGORIES.map(c => {
          const h = height / 100;
          const w = c.max === Infinity ? null : Math.round(c.max * h * h * 10) / 10;
          const prevMax = CATEGORIES[CATEGORIES.indexOf(c) - 1]?.max;
          const wMin = prevMax ? Math.round(prevMax * h * h * 10) / 10 : null;
          return (
            <tr key={c.label} className="border-b border-[var(--line)]">
              <td className="py-2 font-bold" style={{ color: c.color }}>{c.label}</td>
              <td className="text-right py-2 font-bold">{c.max === Infinity ? '35 이상' : c.max === 18.5 ? '18.5 미만' : `${prevMax ?? ''}~${c.max}`}</td>
              <td className="text-right py-2 font-bold">{w === null ? `${wMin}kg 이상` : wMin === null ? `${w}kg 미만` : `${wMin}~${w}kg`}</td>
            </tr>
          );
        })}</tbody>
      </table>
    </Card>

    <Card>
      <h2 className="text-base font-extrabold mb-3">이 계산기는요</h2>
      <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-2.5">
        <p>원하는 BMI를 달성하려면 몇 kg이어야 하는지 역산해 드려요. 키를 입력하고 목표 BMI를 설정하면 필요한 체중이 바로 나옵니다.</p>
        <p>다이어트 목표를 세울 때 &quot;몇 kg까지 빼야 정상이지?&quot; 하고 궁금했다면 이 계산기로 확인해 보세요.</p>
      </div>
    </Card>

    <CtaButton label="목표 체중 계산하기" onClick={calc} />
  </>);
}
