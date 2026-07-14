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

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 수분 섭취 가이드</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>물 부족 증상:</b> 가벼운 탈수(체중의 1~2% 수분 손실)에도 피로감, 집중력 저하, 두통, 어지러움이 나타납니다. 소변 색이 진한 노란색이면 수분이 부족하다는 신호입니다. 갈증을 느끼기 전에 미리 마시는 습관이 중요합니다.</p>
          <p><b>커피·차는 수분 섭취에 포함되나요:</b> 네, 커피와 차도 수분 섭취에 포함됩니다. 카페인의 이뇨 작용은 소량에 그치므로 마신 양의 대부분이 체내 수분으로 흡수됩니다. 다만 카페인 음료만으로 수분을 보충하기보다는 순수한 물을 함께 마시는 것이 좋습니다.</p>
          <p><b>수분 과다 섭취:</b> 극단적으로 많은 물(시간당 1리터 이상)을 마시면 저나트륨혈증(물중독)이 발생할 수 있습니다. 일반적으로 건강한 성인은 하루 3~4리터 이내라면 문제가 없으며, 운동 등으로 땀을 많이 흘린 경우 전해질(나트륨, 칼륨)도 함께 보충하면 좋습니다.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 하루에 물을 얼마나 마셔야 하나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 체중 1kg당 약 30ml가 기본이며, 활동량에 따라 보정됩니다. 예를 들어 70kg 성인은 하루 약 2,100ml(약 10컵)이 권장됩니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 커피나 차도 수분 섭취에 포함되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 커피와 차도 수분 섭취에 포함됩니다. 다만 카페인에 약한 이뇨 작용이 있으므로, 카페인 음료 외에 순수 물도 충분히 마시는 것이 좋습니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 물을 너무 많이 마시면 해로운가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 극단적으로 과다 섭취하면 저나트륨혈증(물중독)이 발생할 수 있습니다. 일반적으로 하루 3~4리터 이내라면 건강한 성인에게 문제가 되지 않습니다.</div>
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
