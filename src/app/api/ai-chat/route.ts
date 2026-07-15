import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'meta/llama-3.1-8b-instruct';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { question, context } = await req.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json({ error: '질문을 입력해주세요.' }, { status: 400 });
    }

    if (question.length > 500) {
      return NextResponse.json({ error: '질문은 500자 이내로 입력해주세요.' }, { status: 400 });
    }

    const systemPrompt = `당신은 한국 재무·세금·생활 전문 상담사입니다. 규칙:
1. 한국어로 답변
2. 정확한 정보만 제공. 모르면 "정확한 답변을 드리기 어렵습니다. 국세청(126) 또는 전문가에게 문의하세요"라고 하세요
3. 숫자를 임의로 만들어내지 마세요
4. 간결하게 핵심만 답변 (3~5문장)
5. 마크다운 금지, 일반 텍스트로
6. 이모지 적절히 사용
7. 2026년 한국 기준으로 답변

전문 분야: 연봉 실수령액, 4대보험, 소득세, 연말정산, 청년도약계좌, 청년미래적금, 대출(DSR), 부동산(취득세/양도세), 퇴직금, 최저시급, 주휴수당, 증여세, 상속세, 국민연금, 실업급여, 건강보험

${context ? `현재 사용자가 보고 있는 계산기: ${context}` : ''}`;

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
          { role: 'user', content: question },
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error('NVIDIA API error:', response.status);
      return NextResponse.json({ error: 'AI 응답에 실패했습니다. 잠시 후 다시 시도해주세요.' }, { status: 502 });
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || '';

    return NextResponse.json({ answer: content });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: '응답 시간이 초과되었습니다. 다시 시도해주세요.' }, { status: 504 });
    }
    console.error('AI chat error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
