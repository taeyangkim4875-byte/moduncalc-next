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
  const base = '당신은 한국의 재무·세금 전문 어드바이저입니다. 사용자의 계산 결과를 분석하고 실용적인 조언을 해주세요. 답변은 한국어로, 간결하고 핵심만. 이모지를 적절히 사용하세요. 마크다운은 사용하지 마세요. 일반 텍스트로 답변하세요.';

  switch (type) {
    case 'salary':
      return `${base} 연봉 실수령액 분석 전문가입니다. 4대보험, 소득세 절세 방법, 비과세 활용, 부양가족 등록 등 실질적인 절세 팁을 제공하세요.`;
    case 'doyak':
      return `${base} 청년도약계좌 전문가입니다. 현재 적립 상황 분석, 만기까지의 전략, 변동금리 대응, 미래적금 환승 여부 등을 조언하세요.`;
    case 'mirae':
      return `${base} 청년미래적금 전문가입니다. 은행별 우대금리 달성 전략, 최적 납입 전략, 도약계좌와의 비교 등을 조언하세요.`;
    case 'compound':
      return `${base} 투자·복리 전문가입니다. 투자 전략, 적정 수익률, 리스크 관리, 투자 상품 추천(예금, 펀드, ETF 등) 등을 조언하세요.`;
    case 'fire':
      return `${base} FIRE(경제적 자유) 전문가입니다. 은퇴 자금 전략, 저축률 개선, 투자 포트폴리오, 한국에서의 현실적인 FIRE 전략을 조언하세요.`;
    case 'tax':
      return `${base} 세금 전문가입니다. 절세 전략, 공제 활용, 신고 팁 등을 실용적으로 조언하세요.`;
    case 'loan':
      return `${base} 대출·부동산 전문가입니다. 상환 전략, 금리 비교, DSR 관리 방법 등을 조언하세요.`;
    case 'health':
      return `${base} 건강 전문가입니다. BMI, 체지방, 칼로리 결과를 바탕으로 건강 개선 방법을 조언하세요. 단, 의료 진단은 하지 마세요.`;
    default:
      return `${base} 사용자의 계산 결과를 분석하고 유용한 조언을 해주세요.`;
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
