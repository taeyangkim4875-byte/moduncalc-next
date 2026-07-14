'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';
import ShareButtons from '@/components/ShareButtons';

export default function CharCountCalc() {
  const [text, setText] = useState('');

  const charCount = text.length;
  const charNoSpace = text.replace(/\s/g, '').length;
  const byteCount = new Blob([text]).size;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const sentenceCount = text.split(/[.!?。]+/).filter(s => s.trim()).length;
  const lineCount = text ? text.split('\n').length : 0;

  const stats = [
    { label: '글자수 (공백 포함)', value: charCount.toLocaleString() },
    { label: '글자수 (공백 제외)', value: charNoSpace.toLocaleString() },
    { label: '바이트 수', value: byteCount.toLocaleString() },
    { label: '단어 수', value: wordCount.toLocaleString() },
    { label: '문장 수', value: sentenceCount.toLocaleString() },
    { label: '줄 수', value: lineCount.toLocaleString() },
  ];

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Card>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {stats.map(s => (
            <div key={s.label} className="bg-[var(--primary-weak)] rounded-[14px] p-3 text-center">
              <div className="text-[22px] font-extrabold text-[var(--primary-dark)] tracking-tight">{s.value}</div>
              <div className="text-[10px] text-[var(--sub)] mt-0.5 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle num="1">텍스트 입력</SectionTitle>
        <textarea
          rows={8}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="여기에 텍스트를 입력하거나 붙여넣으세요..."
          className="w-full py-3 px-3.5 border-[1.5px] border-[var(--line)] rounded-xl text-base font-bold outline-none focus:border-[var(--primary)] resize-y"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={copyText}
            className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-bold rounded-xl"
          >
            텍스트 복사
          </button>
          <button
            onClick={() => setText('')}
            className="px-4 py-2 bg-[var(--bg)] text-[var(--sub)] text-sm font-bold rounded-xl border border-[var(--line)]"
          >
            초기화
          </button>
        </div>
      </Card>

      {charCount > 0 && <ShareButtons title="글자수 세기 결과" />}

      <Card>
        <SectionTitle num="📋">주요 서비스 글자수 제한</SectionTitle>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)]">
              <th className="py-2 text-left text-xs text-[var(--sub)] font-bold">서비스</th>
              <th className="py-2 text-right text-xs text-[var(--sub)] font-bold">글자수 제한</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['카카오톡 메시지', '10,000자'],
              ['트위터(X) 게시글', '280자'],
              ['인스타그램 캡션', '2,200자'],
              ['블로그 제목', '약 35자 권장'],
              ['네이버 블로그 본문', '제한 없음'],
              ['자기소개서', '500~1,000자'],
              ['이력서 자기소개', '300~500자'],
              ['유튜브 제목', '100자 (권장 60자)'],
              ['유튜브 설명', '5,000자'],
              ['이메일 제목', '40~60자 권장'],
            ].map(([service, limit]) => (
              <tr key={service} className="border-b border-[var(--line)]">
                <td className="py-2 font-bold">{service}</td>
                <td className="py-2 text-right">{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 글자수 세기란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          글자수 세기는 텍스트의 길이를 다양한 기준으로 측정하는 도구입니다. 자기소개서, 블로그 글, SNS 게시글 등 글자수 제한이 있는 경우에 필수적으로 사용됩니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>공백 포함</b>과 <b>공백 제외</b>는 가장 많이 혼동되는 기준입니다. 대부분의 자기소개서는 &apos;공백 포함&apos; 기준이지만, 일부 기업은 &apos;공백 제외&apos;를 사용합니다. 반드시 모집 요강을 확인하세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 바이트(Byte)란?</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          바이트는 컴퓨터가 문자를 저장하는 단위입니다. UTF-8 기준으로 영문/숫자는 1바이트, 한글은 3바이트를 차지합니다. 데이터베이스나 SMS 등에서 바이트 제한을 사용하는 경우가 있어, 같은 글자수라도 한글이 영문보다 더 많은 용량을 차지합니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          예를 들어 &apos;안녕하세요&apos;는 5글자이지만 15바이트이고, &apos;Hello&apos;는 5글자이면서 5바이트입니다. SMS 문자의 경우 한글 70자(영문 160자)가 1건 기준입니다.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 효과적인 글쓰기 팁</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>자기소개서:</b> 보통 500자~1,000자 사이가 요구됩니다. 핵심 역량과 경험을 구체적 숫자와 함께 기술하세요. 불필요한 수식어를 줄이면 제한 내에서 더 많은 내용을 담을 수 있습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>블로그 글:</b> SEO를 고려하면 최소 1,500자 이상이 권장됩니다. 제목은 35자 내외로 핵심 키워드를 포함하고, 소제목을 활용하여 가독성을 높이세요.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>SNS 게시글:</b> 트위터는 280자로 짧고 임팩트 있게, 인스타그램은 첫 125자가 미리보기에 노출되므로 핵심 메시지를 앞에 배치하세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 단어수와 문장수 활용</h2>
        <p className="text-sm text-[#4E5968] leading-relaxed mb-3">
          <b>단어수</b>는 영문 텍스트에서 주로 사용되는 기준입니다. 영어 에세이의 경우 보통 250~500 words가 한 페이지 분량이며, 학술 논문의 Abstract는 150~300 words가 표준입니다. 한국어에서도 번역 작업 시 단어수 기준으로 비용을 산정하는 경우가 많습니다.
        </p>
        <p className="text-sm text-[#4E5968] leading-relaxed">
          <b>문장수</b>는 가독성 분석에 유용합니다. 하나의 문단에 3~5개 문장이 적절하며, 한 문장이 50자를 넘으면 가독성이 떨어집니다. 긴 문장은 쪼개어 읽기 쉽게 만드세요.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">❓ 자주 묻는 질문</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 한글은 몇 바이트인가요?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. UTF-8 인코딩 기준으로 한글 한 글자는 3바이트입니다. EUC-KR 기준으로는 2바이트입니다. 현재 대부분의 웹사이트와 시스템은 UTF-8을 사용합니다.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 공백 포함과 공백 제외의 차이는?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. &apos;공백 포함&apos;은 띄어쓰기, 줄바꿈 등 모든 공백 문자를 글자수에 포함합니다. &apos;공백 제외&apos;는 순수 문자만 셉니다. 자기소개서의 경우 대부분 공백 포함 기준이지만, 채용 공고를 반드시 확인하세요.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--ink)] mb-1">Q. 자기소개서 글자수 기준은?</div>
            <div className="text-sm text-[#4E5968] leading-relaxed">A. 기업마다 다르지만 일반적으로 500자~1,000자(공백 포함)가 많습니다. 삼성은 항목당 700자, LG는 500자 내외가 일반적입니다. &apos;OO자 이내&apos;라고 하면 해당 글자수를 넘기지 않도록 주의하세요.</div>
          </div>
        </div>
      </Card>

      <footer className="mt-2 px-1.5 pt-4 text-[11.5px] text-[var(--sub)] leading-relaxed">
        <div className="bg-[#FBFCFD] border border-[var(--line)] rounded-xl p-3.5 text-[11px] text-[#8B95A1]">
          글자수는 실시간으로 계산되며, 입력한 텍스트는 서버로 전송되지 않습니다.
        </div>
      </footer>
    </>
  );
}
