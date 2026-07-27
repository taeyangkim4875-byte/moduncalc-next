'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Activity = 'sedentary' | 'normal' | 'active' | 'athlete';
type Season = 'normal' | 'summer';

const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: '비활동',
  normal: '보통',
  active: '활발',
  athlete: '운동선수',
};

const ACTIVITY_MULTIPLIER: Record<Activity, number> = {
  sedentary: 1.0,
  normal: 1.2,
  active: 1.4,
  athlete: 1.6,
};

export default function WaterIntakeCalc() {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState<Activity>('normal');
  const [season, setSeason] = useState<Season>('normal');

  const weightNum = +weight || 0;
  const baseML = weightNum * 30;
  const adjustedML = Math.round(baseML * ACTIVITY_MULTIPLIER[activity]);
  const totalML = season === 'summer' ? adjustedML + 500 : adjustedML;
  const cups = Math.ceil(totalML / 200);
  const bottles = Math.round((totalML / 500) * 10) / 10;

  return (
    <>
      {/* 입력 */}
      <Card>
        <SectionTitle num="1">정보 입력</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">체중 (kg)</label>
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="예: 70"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">활동량</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['sedentary', 'normal', 'active', 'athlete'] as const).map(a => (
                <button
                  key={a}
                  onClick={() => setActivity(a)}
                  className={`py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${activity === a ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
                >
                  {ACTIVITY_LABELS[a]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">계절</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSeason('normal')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${season === 'normal' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
              >
                봄·가을·겨울
              </button>
              <button
                onClick={() => setSeason('summer')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${season === 'summer' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
              >
                여름 (+500ml)
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* 결과 */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">하루 권장 물 섭취량</div>
          <div className="text-[40px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
            {totalML.toLocaleString()}ml
          </div>
          <div className="text-xs text-[var(--sub)] mt-2">
            {weightNum > 0 && `체중 ${weightNum}kg × 30ml × ${ACTIVITY_MULTIPLIER[activity]}배${season === 'summer' ? ' + 여름 500ml' : ''}`}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{totalML.toLocaleString()}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">ml</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{cups}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">컵 (200ml)</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{bottles}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">물병 (500ml)</div>
          </div>
        </div>
      </Card>

      {/* 수분 섭취 타이밍 */}
      <Card>
        <SectionTitle num="2">수분 섭취 타이밍</SectionTitle>
        <div className="flex flex-col gap-1.5">
          {[
            { time: '기상 직후', amount: '200~300ml', note: '밤새 탈수된 몸에 수분 보충' },
            { time: '식사 30분 전', amount: '200ml', note: '소화 촉진, 과식 방지' },
            { time: '식사 중·직후', amount: '소량', note: '과다 섭취 시 소화 방해' },
            { time: '운동 전', amount: '300~500ml', note: '운동 30분~1시간 전' },
            { time: '운동 중', amount: '150~200ml/20분', note: '소량씩 자주' },
            { time: '운동 후', amount: '500ml 이상', note: '땀으로 소실된 수분 보충' },
            { time: '취침 전', amount: '100~200ml', note: '과다 섭취 시 수면 방해' },
          ].map(item => (
            <div key={item.time} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <div>
                <span className="text-[13px] font-semibold">{item.time}</span>
                <span className="text-[10px] text-[var(--sub)] ml-1.5">{item.note}</span>
              </div>
              <span className="text-[13px] font-bold tabular-nums">{item.amount}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-2">이 계산기는요</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed">하루에 물 얼마나 마셔야 하는지 체중 기준으로 알려드려요.</p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 커피나 차도 수분 섭취에 포함되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 포함돼요. 다만 카페인 음료 외에 순수한 물도 같이 마시는 게 좋아요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 물을 너무 많이 마시면 해롭나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 하루 3~4리터 이내면 괜찮아요. 극단적으로 많이 마시면 물중독이 올 수 있거든요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          권장량은 일반적인 가이드라인이며, 개인 건강 상태(신장 질환, 심장 질환 등)에 따라 달라질 수 있습니다. 의사와 상담하세요.
        </div>
      </footer>
    </>
  );
}
