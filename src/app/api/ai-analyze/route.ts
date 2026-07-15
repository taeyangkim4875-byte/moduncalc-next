import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'meta/llama-3.1-8b-instruct';

export const maxDuration = 30; // Vercel serverless timeout 30초

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { type, data } = await req.json();

    if (!type || !data) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
    }

    const systemPrompt = getSystemPrompt(type);
    const userPrompt = getUserPrompt(type, data);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const err = await response.text();
      console.error('NVIDIA API error:', response.status, err);
      return NextResponse.json({ error: `AI 분석에 실패했습니다 (${response.status}). 잠시 후 다시 시도해주세요.` }, { status: 502 });
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || '';

    return NextResponse.json({ analysis: content });
  } catch (error) {
    console.error('AI analyze error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

function getSystemPrompt(type: string): string {
  const base = `당신은 한국 재무 전문 어드바이저입니다. 규칙:
1. 한국어로 답변
2. 숫자를 직접 계산하지 마세요. 제공된 숫자만 인용하세요
3. 틀린 정보를 만들어내지 마세요. 모르면 "확인이 필요합니다"라고 하세요
4. 실행 가능한 구체적 조언만 하세요
5. 마크다운 금지, 일반 텍스트로 답변
6. 이모지 적절히 사용`;

  switch (type) {
    case 'salary':
      return `${base}
연봉 절세 조언을 해주세요. 비과세 식대(월 20만원), 연금저축 세액공제(연 400만원 한도), 부양가족 인적공제(1인당 150만원) 등 실질적인 팁만.`;
    case 'doyak':
      return `${base}
청년도약계좌 조언을 해주세요. 주의: 변동금리는 은행이 결정하며 사용자가 선택할 수 없습니다. 사용자가 할 수 있는 것: 납입액 조절, 우대금리 조건 충족, 특별중도해지 사유 확인, 미래적금 환승 검토.`;
    case 'mirae':
      return `${base}
청년미래적금 조언을 해주세요. 사용자가 할 수 있는 것: 은행별 우대금리 조건 달성(급여이체, 카드실적 등), 납입액 최적화, 만기까지 유지 전략.`;
    case 'compound':
      return `${base}
투자 복리 조언을 해주세요. 한국에서 현실적인 투자 수단: 예금(3~4%), 채권(3~5%), ETF(7~10%), 연금저축/IRP 세액공제 활용.`;
    case 'fire':
      return `${base}
FIRE(조기은퇴) 조언을 해주세요. 한국 현실 고려: 높은 주거비, 교육비, 국민연금 수령 시기. 4% 룰 기반 현실적 조언만.`;
    case 'tax':
      return `${base}
절세 조언을 해주세요. 연말정산 공제 항목, 신고 팁 등 실행 가능한 조언만.`;
    case 'loan':
      return `${base}
대출 상환 조언을 해주세요. 중도상환수수료, 상환방식 변경, 대환대출 등 실질적 팁만.`;
    case 'health':
      return `${base}
건강 개선 조언을 해주세요. 의료 진단은 하지 마세요. 운동, 식단, 생활습관 등 일반적 조언만.`;
    default:
      return `${base}
계산 결과를 바탕으로 실용적 조언을 해주세요.`;
  }
}

function getUserPrompt(type: string, data: Record<string, unknown>): string {
  switch (type) {
    case 'salary':
      return `다음 연봉 계산 결과를 분석하고 절세 팁 3가지와 실수령액을 늘리는 방법을 알려주세요.
연봉: ${data.salary}만원
실수령 월급: ${data.netMonth}원
4대보험 월: ${data.insurance}원
소득세 월: ${data.incomeTax}원
지방소득세 월: ${data.localTax}원
부양가족: ${data.dependents}명
비과세 식대: ${data.nontax ? '적용' : '미적용'}
${data.percentile ? `연봉 백분위: 상위 ${data.percentile}%` : ''}`;

    case 'doyak':
      return `다음 청년도약계좌 결과를 분석하고 조언해주세요.
월 납입액: ${data.pay}만원
총급여: ${data.salary}만원
기본금리: ${data.baseRate}%
변동금리: ${data.varRate}%
우대금리: ${data.bonus}%
만기 수령액: ${data.total}원
원금: ${data.principal}원
정부기여금: ${data.contrib}원
이자: ${data.interest}원
${data.elapsed ? `현재 ${data.elapsed}개월차, 적립액: ${data.currentTotal}원` : ''}`;

    case 'mirae':
      return `다음 청년미래적금 결과를 분석하고 조언해주세요.
월 납입액: ${data.pay}만원
적용 금리: ${data.rate}%
만기 수령액: ${data.total}원
정부기여금: ${data.contrib}원
이자: ${data.interest}원
유형: ${data.type}`;

    case 'compound':
      return `다음 복리 투자 결과를 분석하고 투자 전략을 조언해주세요.
초기 원금: ${data.principal}만원
월 적립액: ${data.monthly}만원
연 수익률: ${data.rate}%
투자 기간: ${data.years}년
최종 금액: ${data.finalAmount}원
총 수익: ${data.profit}원`;

    case 'fire':
      return `다음 FIRE 계산 결과를 분석하고 현실적인 조언을 해주세요.
월 소득: ${data.income}만원
월 지출: ${data.expense}만원
현재 자산: ${data.asset}만원
목표 FIRE 자산: ${data.fireAsset}원
예상 달성 나이: ${data.fireAge}세
저축률: ${data.savingRate}%`;

    case 'tax':
      return `다음 세금 계산 결과를 분석하고 절세 방법을 조언해주세요.
${JSON.stringify(data)}`;

    case 'loan':
      return `다음 대출 계산 결과를 분석하고 상환 전략을 조언해주세요.
${JSON.stringify(data)}`;

    case 'health':
      return `다음 건강 지표를 분석하고 개선 방법을 조언해주세요 (의료 진단은 하지 말 것).
${JSON.stringify(data)}`;

    default:
      return `다음 계산 결과를 분석하고 유용한 조언을 해주세요.
${JSON.stringify(data)}`;
  }
}
