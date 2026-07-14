'use client';

import { useState, useMemo } from 'react';
import Card, { SectionTitle } from '@/components/Card';

export default function CharCountEn() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const bytes = new TextEncoder().encode(text).length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim()).length;
    const lines = text === '' ? 0 : text.split('\n').length;
    const readingMin = Math.ceil(words / 200) || 0;

    // Top keywords
    const wordList = text.toLowerCase().replace(/[^a-zA-Z0-9\s\u3131-\uD79D]/g, '').split(/\s+/).filter(w => w.length > 1);
    const freq: Record<string, number> = {};
    wordList.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const topKeywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return { chars, charsNoSpaces, bytes, words, sentences, lines, readingMin, topKeywords };
  }, [text]);

  const platforms = [
    { name: 'Twitter/X', limit: 280, unit: 'chars' },
    { name: 'Instagram Caption', limit: 2200, unit: 'chars' },
    { name: 'YouTube Title', limit: 100, unit: 'chars' },
    { name: 'LinkedIn Post', limit: 3000, unit: 'chars' },
    { name: 'Facebook Post', limit: 63206, unit: 'chars' },
  ];

  return (
    <>
      <Card>
        <SectionTitle num="1">Enter Your Text</SectionTitle>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-40 p-3 border-[1.5px] border-[var(--line)] rounded-xl text-sm outline-none focus:border-[var(--primary)] resize-y"
        />
      </Card>

      <Card>
        <SectionTitle num="2">Text Statistics</SectionTitle>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Characters</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{stats.chars.toLocaleString()}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">No Spaces</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{stats.charsNoSpaces.toLocaleString()}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Bytes</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{stats.bytes.toLocaleString()}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Words</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{stats.words.toLocaleString()}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Sentences</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{stats.sentences.toLocaleString()}</div>
          </div>
          <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Lines</div>
            <div className="text-2xl font-extrabold text-[var(--primary-dark)]">{stats.lines.toLocaleString()}</div>
          </div>
        </div>
        <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
          <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Estimated Reading Time</div>
          <div className="text-lg font-extrabold text-[var(--primary-dark)]">{stats.readingMin} min</div>
          <div className="text-xs text-[var(--sub)]">Based on 200 words/min</div>
        </div>
      </Card>

      <Card>
        <SectionTitle num="3">Platform Limits</SectionTitle>
        <div className="flex flex-col gap-2">
          {platforms.map(p => {
            const used = stats.chars;
            const pct = Math.min((used / p.limit) * 100, 100);
            const over = used > p.limit;
            return (
              <div key={p.name} className="bg-[var(--bg)] rounded-xl p-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold">{p.name}</span>
                  <span className={`text-xs font-bold ${over ? 'text-red-500' : 'text-[var(--sub)]'}`}>
                    {used.toLocaleString()} / {p.limit.toLocaleString()} {over && '(over!)'}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${over ? 'bg-red-400' : 'bg-[var(--primary)]'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {stats.topKeywords.length > 0 && (
        <Card>
          <SectionTitle num="4">Top Keywords</SectionTitle>
          <div className="flex flex-col gap-1.5">
            {stats.topKeywords.map(([word, count], i) => (
              <div key={word} className="flex items-center justify-between bg-[var(--bg)] rounded-lg px-3 py-2">
                <span className="text-sm font-bold">{i + 1}. {word}</span>
                <span className="text-xs font-bold text-[var(--primary)]">{count}x</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-base font-extrabold mb-3">📖 Writing Tips & Character Limits Guide</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Social media best practices:</b> Each platform has its own character limits and optimal post lengths. Twitter/X allows 280 characters, but tweets between 71-100 characters get the most engagement. Instagram captions can be up to 2,200 characters, but only the first 125 show before &quot;more.&quot;</p>
          <p><b>YouTube titles:</b> Keep titles under 60 characters to avoid truncation in search results. The maximum is 100 characters, but shorter, keyword-rich titles perform better.</p>
          <p><b>Understanding bytes vs characters:</b> A single English letter takes 1 byte in UTF-8. Korean characters (한글) take 3 bytes, and emojis can take up to 4 bytes. This matters for databases and APIs with byte limits rather than character limits.</p>
          <p><b>Readability tips:</b> Aim for 15-20 words per sentence for clear, readable prose. Use short paragraphs (2-3 sentences) for digital content. The average adult reads at about 200 words per minute in English.</p>
          <p><b>Character limit reference table:</b> SMS: 160 chars, Twitter/X: 280, Instagram bio: 150, Instagram caption: 2,200, YouTube title: 100, YouTube description: 5,000, LinkedIn post: 3,000, Facebook post: 63,206, Meta title (SEO): 60, Meta description (SEO): 160.</p>
        </div>
      </Card>
    </>
  );
}
