import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'meta/llama-3.1-8b-instruct';

export const maxDuration = 60;

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

    const systemPrompt = `한국 재무 상담사. 한국어로 3~5문장 답변. 모르면 "전문가 문의 권장". 마크다운 금지.${context ? ` 현재 페이지: ${context}` : ''}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

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
        max_tokens: 200,
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
