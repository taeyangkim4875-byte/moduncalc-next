'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Gender = 'male' | 'female';

// Simplified BMI percentile lookup table (5th, 85th, 95th percentile by age/gender)
// Based on Korean CDC growth charts
const PERCENTILE_TABLE: Record<Gender, Record<number, [number, number, number]>> = {
  male: {
    2: [14.5, 17.3, 18.4],
    3: [14.0, 16.8, 17.9],
    4: [13.6, 16.5, 17.6],
    5: [13.4, 16.5, 17.8],
    6: [13.3, 16.8, 18.3],
    7: [13.4, 17.3, 19.0],
    8: [13.6, 17.9, 19.8],
    9: [13.8, 18.6, 20.7],
    10: [14.1, 19.3, 21.6],
    11: [14.5, 19.9, 22.4],
    12: [15.0, 20.5, 23.1],
    13: [15.5, 21.1, 23.7],
    14: [16.0, 21.6, 24.2],
    15: [16.5, 22.0, 24.6],
    16: [17.0, 22.5, 25.0],
    17: [17.4, 22.9, 25.4],
    18: [17.8, 23.3, 25.8],
  },
  female: {
    2: [14.0, 17.0, 18.0],
    3: [13.6, 16.6, 17.6],
    4: [13.2, 16.4, 17.5],
    5: [13.0, 16.5, 17.8],
    6: [12.9, 16.8, 18.3],
    7: [13.0, 17.3, 19.1],
    8: [13.2, 17.9, 19.9],
    9: [13.5, 18.5, 20.8],
    10: [13.8, 19.1, 21.6],
    11: [14.2, 19.7, 22.3],
    12: [14.7, 20.3, 23.0],
    13: [15.2, 20.8, 23.5],
    14: [15.7, 21.3, 24.0],
    15: [16.1, 21.7, 24.4],
    16: [16.5, 22.0, 24.7],
    17: [16.8, 22.3, 25.0],
    18: [17.0, 22.5, 25.2],
  },
};

function getPercentileCategory(bmi: number, gender: Gender, age: number): { label: string; color: string; description: string } {
  const table = PERCENTILE_TABLE[gender][age];
  if (!table) return { label: '-', color: '#8B95A1', description: '' };

  const [p5, p85, p95] = table;
  if (bmi < p5) return { label: '저체중 (5% 미만)', color: '#3182F6', description: '또래보다 체중이 적습니다. 영양 섭취를 확인하세요.' };
  if (bmi < p85) return { label: '정상 (5~85%)', color: '#10B981', description: '건강한 체중 범위입니다.' };
  if (bmi < p95) return { label: '과체중 (85~95%)', color: '#F59E0B', description: '또래 대비 과체중입니다. 식습관과 활동량을 점검하세요.' };
  return { label: '비만 (95% 이상)', color: '#E5484D', description: '또래 대비 비만입니다. 소아과 전문의 상담을 권장합니다.' };
}

export default function BmiChildCalc() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const ageNum = +age || 0;
  const heightNum = +height || 0;
  const weightNum = +weight || 0;
  const heightM = heightNum / 100;
  const bmi = heightM > 0 ? weightNum / (heightM * heightM) : 0;
  const category = ageNum >= 2 && ageNum <= 18 ? getPercentileCategory(bmi, gender, ageNum) : { label: '-', color: '#8B95A1', description: '' };

  return (
    <>
      {/* 입력 */}
      <Card>
        <SectionTitle num="1">정보 입력</SectionTitle>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">성별</label>
            <div className="flex gap-2">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${gender === 'male' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
              >
                남아
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all cursor-pointer ${gender === 'female' ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]' : 'border-[var(--line)] text-[var(--sub)] bg-white'}`}
              >
                여아
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">나이 (만 2~18세)</label>
            <input
              type="number"
              inputMode="numeric"
              value={age}
              onChange={e => setAge(e.target.value)}
              min={2}
              max={18}
              placeholder="예: 10"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">키 (cm)</label>
            <input
              type="number"
              inputMode="decimal"
              value={height}
              onChange={e => setHeight(e.target.value)}
              placeholder="예: 140"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--sub)] block mb-1">체중 (kg)</label>
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="예: 35"
              className="w-full py-2.5 px-3 border-[1.5px] border-[var(--line)] rounded-xl text-lg font-bold outline-none focus:border-[var(--primary)] tabular-nums"
            />
          </div>
        </div>
      </Card>

      {/* 결과 */}
      <Card className="!p-5">
        <div className="text-center mb-3">
          <div className="text-xs font-bold text-[var(--sub)] mb-1">BMI</div>
          <div className="text-[56px] font-extrabold text-[var(--primary-dark)] tracking-tight leading-none tabular-nums">
            {bmi > 0 ? bmi.toFixed(1) : '-'}
          </div>
          {bmi > 0 && category.label !== '-' && (
            <div className="mt-3">
              <span className="px-3 py-1.5 rounded-full text-xs font-extrabold text-white" style={{ backgroundColor: category.color }}>
                {category.label}
              </span>
              <div className="text-xs text-[var(--sub)] mt-2">{category.description}</div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{bmi > 0 ? bmi.toFixed(1) : '-'}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">BMI</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{heightNum || '-'}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">키 (cm)</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-2 text-center">
            <div className="text-[15px] font-extrabold text-[var(--ink)] tabular-nums">{weightNum || '-'}</div>
            <div className="text-[9px] text-[var(--sub)] font-bold">체중 (kg)</div>
          </div>
        </div>
      </Card>

      {/* 백분위 기준표 */}
      <Card>
        <SectionTitle num="2">소아 BMI 백분위 판정 기준</SectionTitle>
        <div className="flex flex-col gap-1.5">
          {[
            { range: '5% 미만', label: '저체중', color: '#3182F6' },
            { range: '5~85%', label: '정상', color: '#10B981' },
            { range: '85~95%', label: '과체중', color: '#F59E0B' },
            { range: '95% 이상', label: '비만', color: '#E5484D' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 bg-[var(--bg)] rounded-xl px-3 py-2.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[13px] font-semibold flex-1">{item.label}</span>
              <span className="text-[13px] font-bold text-[var(--sub)]">{item.range}</span>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-[var(--sub)] mt-2">같은 성별·나이 집단 내 상대적 위치 기준 (질병관리청 소아 성장도표)</div>
      </Card>

      {/* 나이별 참고 BMI */}
      {ageNum >= 2 && ageNum <= 18 && (
        <Card>
          <SectionTitle num="3">만 {ageNum}세 {gender === 'male' ? '남아' : '여아'} BMI 기준</SectionTitle>
          <div className="flex flex-col gap-1.5">
            {(() => {
              const table = PERCENTILE_TABLE[gender][ageNum];
              if (!table) return null;
              return [
                { label: '저체중 기준 (5%)', value: table[0].toFixed(1) },
                { label: '과체중 기준 (85%)', value: table[1].toFixed(1) },
                { label: '비만 기준 (95%)', value: table[2].toFixed(1) },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center bg-[var(--bg)] rounded-xl px-3 py-2.5">
                  <span className="text-[13px] font-semibold">{item.label}</span>
                  <span className="text-[13px] font-bold tabular-nums">{item.value}</span>
                </div>
              ));
            })()}
          </div>
        </Card>
      )}

      {/* 가이드 */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 소아 BMI 가이드</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>소아 비만 기준이 성인과 다른 이유:</b> 어린이와 청소년은 성장기이므로 BMI가 나이·성별에 따라 크게 달라집니다. 성인은 BMI 25 이상을 비만으로 판정하지만, 소아는 같은 성별·나이 집단의 백분위를 사용합니다. 95백분위 이상이면 비만으로 분류합니다.</p>
          <p><b>성장기 영양:</b> 성장기에는 단백질, 칼슘, 철분, 비타민D 등이 특히 중요합니다. 무리한 식이 제한은 성장 발달에 악영향을 줄 수 있으므로, 과체중·비만이라도 균형 잡힌 식단과 규칙적인 신체 활동으로 관리하는 것이 바람직합니다.</p>
          <p><b>성장 곡선:</b> 아이의 성장은 한 시점의 수치보다 시간에 따른 추이(성장 곡선)가 더 중요합니다. 정기적으로 키와 체중을 측정하여 성장 곡선을 관찰하고, 급격한 변화가 있으면 소아과 전문의와 상담하세요. 질병관리청 소아 성장도표를 참고할 수 있습니다.</p>
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 어린이 BMI는 성인과 다른가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 네, 어린이는 성별·나이에 따라 BMI 기준이 다릅니다. 같은 BMI라도 나이와 성별에 따라 정상일 수도, 비만일 수도 있어 백분위로 판정합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 소아 비만 기준은 무엇인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 같은 성별·나이 집단에서 BMI가 85~95백분위이면 과체중, 95백분위 이상이면 비만으로 판정합니다. 5백분위 미만은 저체중입니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 성장기에 다이어트를 해도 되나요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 성장기에는 극단적인 식이 제한보다 균형 잡힌 영양 섭취와 규칙적인 신체 활동이 권장됩니다. 소아 비만이 걱정된다면 소아과 전문의와 상담하세요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          백분위는 질병관리청 소아 성장도표를 참고한 간이 판정이며, 정확한 진단은 소아과 전문의와 상담하세요.
        </div>
      </footer>
    </>
  );
}
