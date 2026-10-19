#!/usr/bin/env node
/**
 * Search Console 에서 사이트맵 URL 의 색인 상태를 긁어와, "오늘 수동으로 색인
 * 요청할 URL" 목록을 뽑는다.
 *
 * Google 에는 색인 요청 API 가 없다. Indexing API 는 JobPosting /
 * BroadcastEvent 전용이고, URL Inspection API 는 읽기 전용이다. 그래서 클릭은
 * 사람이 해야 한다. 이 스크립트가 없애주는 건 "무엇을 클릭할지 고르는 일"이다.
 * 노출수가 있는데 색인이 안 된 URL 을 위로 올려준다.
 *
 * 설정 (최초 1회):
 *   1. console.cloud.google.com 에서 프로젝트 생성
 *   2. "Google Search Console API" 사용 설정
 *   3. 서비스 계정 생성 → 키(JSON) 발급 → 프로젝트 루트에 gsc-key.json 으로 저장
 *   4. Search Console → 설정 → 사용자 및 권한 → 서비스 계정 이메일
 *      (xxx@yyy.iam.gserviceaccount.com) 을 "정체 공개" 권한으로 추가
 *
 * 사용법:
 *   node scripts/gsc-index-status.mjs
 *   node scripts/gsc-index-status.mjs --top 20
 *   node scripts/gsc-index-status.mjs --csv index-status.csv
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { createSign } from 'node:crypto';
import path from 'node:path';

const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const DOMAIN = 'moduncalc.com';
const ORIGIN = `https://${DOMAIN}`;
const CONCURRENCY = 5;

function args() {
  const a = process.argv.slice(2);
  const o = { top: 10, csv: null, verbose: false, key: process.env.GSC_SA_KEY || 'gsc-key.json' };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--top') o.top = Number(a[++i]);
    else if (a[i] === '--csv') o.csv = a[++i];
    else if (a[i] === '--key') o.key = a[++i];
    else if (a[i] === '--verbose') o.verbose = true;
    else { console.error(`알 수 없는 인자: ${a[i]}`); process.exit(1); }
  }
  return o;
}

/** 서비스 계정 JSON 으로 access token 을 받는다. 외부 의존성 없이 JWT 를 직접 만든다. */
async function getToken(keyPath) {
  let sa;
  try {
    sa = JSON.parse(readFileSync(path.resolve(keyPath), 'utf8'));
  } catch {
    console.error(`서비스 계정 키를 못 읽었습니다: ${keyPath}`);
    console.error('파일 위치를 --key 로 주거나 GSC_SA_KEY 환경변수를 설정하세요.');
    console.error('발급 방법은 이 파일 맨 위 주석에 있습니다.');
    process.exit(1);
  }
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: sa.client_email,
    scope: SCOPE,
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })}`;
  const sig = createSign('RSA-SHA256').update(unsigned).sign(sa.private_key, 'base64url');

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${sig}`,
    }),
  });
  const j = await res.json();
  if (!j.access_token) {
    console.error('토큰 발급 실패:', JSON.stringify(j));
    process.exit(1);
  }
  return { token: j.access_token, email: sa.client_email };
}

const api = (token) => async (url, body) => {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const t = await res.text();
    const err = new Error(`${res.status} ${t.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

/** 어떤 속성이 등록돼 있는지 직접 물어본다. sc-domain 쪽을 우선한다. */
async function pickSite(call, email) {
  let list;
  try {
    list = await call('https://www.googleapis.com/webmasters/v3/sites');
  } catch (e) {
    console.error('속성 목록 조회 실패:', e.message);
    if (e.status === 403) {
      console.error(`\nSearch Console → 설정 → 사용자 및 권한 에서\n  ${email}\n을 사용자로 추가했는지 확인하세요.`);
    }
    process.exit(1);
  }
  const all = (list.siteEntry || []).map((s) => s.siteUrl);
  const mine = all.filter((u) => u.includes(DOMAIN));
  if (!mine.length) {
    console.error(`${DOMAIN} 속성을 찾을 수 없습니다. 접근 가능한 속성: ${all.join(', ') || '없음'}`);
    console.error(`서비스 계정 ${email} 에 권한이 있는지 확인하세요.`);
    process.exit(1);
  }
  return mine.find((u) => u.startsWith('sc-domain:')) || mine[0];
}

function readSitemap() {
  const src = readFileSync(path.join(process.cwd(), 'src/app/sitemap.ts'), 'utf8');
  const re = /\{\s*path:\s*'([^']+)',\s*priority:\s*([\d.]+),\s*lastmod:\s*'(\d{4}-\d{2}-\d{2})'\s*\}/g;
  const out = [...src.matchAll(re)].map((m) => ({
    url: `${ORIGIN}${m[1] === '/' ? '/' : m[1]}`,
    path: m[1],
    priority: Number(m[2]),
    lastmod: m[3],
  }));
  if (!out.length) throw new Error('sitemap.ts 에서 항목을 못 읽었습니다. 형식이 바뀌었는지 확인하세요.');
  return out;
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx]);
      }
    }),
  );
  return out;
}

const normalize = (u) => u.replace(/\/$/, '') || ORIGIN;

async function main() {
  const o = args();
  const { token, email } = await getToken(o.key);
  const call = api(token);
  const site = await pickSite(call, email);
  console.log(`속성: ${site}\n`);

  // 1) 최근 28일 페이지별 노출수 — 우선순위의 근거
  const end = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
  const start = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  const impressions = new Map();
  try {
    const sa = await call(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
      { startDate: start, endDate: end, dimensions: ['page'], rowLimit: 25000 },
    );
    for (const r of sa.rows || []) impressions.set(normalize(r.keys[0]), r.impressions);
    console.log(`실적: ${start} ~ ${end}, 노출 기록이 있는 페이지 ${impressions.size}개`);
  } catch (e) {
    console.log(`실적 조회 실패(계속 진행): ${e.message}`);
  }

  // 2) 사이트맵 URL 전수 색인 상태
  const pages = readSitemap();
  console.log(`색인 상태 조회: ${pages.length}개 (할당량 2,000/일)\n`);

  const rows = await mapLimit(pages, CONCURRENCY, async (p) => {
    try {
      const r = await call('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
        inspectionUrl: p.url,
        siteUrl: site,
        languageCode: 'ko',
      });
      const idx = r.inspectionResult?.indexStatusResult ?? {};
      if (o.verbose) console.log(JSON.stringify({ url: p.url, idx }, null, 1));
      return {
        ...p,
        verdict: idx.verdict ?? '?',
        state: idx.coverageState ?? '?',
        lastCrawl: (idx.lastCrawlTime ?? '').slice(0, 10),
        impressions: impressions.get(normalize(p.url)) ?? 0,
      };
    } catch (e) {
      return { ...p, verdict: 'ERROR', state: e.message.slice(0, 80), lastCrawl: '', impressions: 0 };
    }
  });

  // 3) 상태별 집계
  const byState = new Map();
  for (const r of rows) byState.set(r.state, (byState.get(r.state) || 0) + 1);
  console.log('상태별 집계');
  for (const [s, n] of [...byState].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)}  ${s}`);
  }

  const indexed = rows.filter((r) => r.verdict === 'PASS').length;
  console.log(`\n색인됨 ${indexed} / ${rows.length} (${Math.round((indexed / rows.length) * 100)}%)`);

  // 4) 오늘 요청할 목록 — 노출수 있는 미색인 우선, 그다음 사이트맵 priority
  const todo = rows
    .filter((r) => r.verdict !== 'PASS' && r.verdict !== 'ERROR')
    .filter((r) => !/noindex/i.test(r.state))
    .sort((a, b) => b.impressions - a.impressions || b.priority - a.priority);

  console.log(`\n미색인 ${todo.length}개 중 상위 ${Math.min(o.top, todo.length)}개 — GSC URL 검사에서 색인 요청하세요`);
  console.log('  (노출수가 있는 쪽이 검색 수요가 확인된 페이지입니다)\n');
  for (const r of todo.slice(0, o.top)) {
    console.log(`  노출 ${String(r.impressions).padStart(5)}  ${r.url}`);
    console.log(`              ${r.state}${r.lastCrawl ? ` · 마지막 크롤 ${r.lastCrawl}` : ' · 크롤 기록 없음'}`);
  }

  const errors = rows.filter((r) => r.verdict === 'ERROR');
  if (errors.length) {
    console.log(`\n조회 실패 ${errors.length}개`);
    for (const r of errors.slice(0, 5)) console.log(`  ${r.url}\n    ${r.state}`);
  }

  if (o.csv) {
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    writeFileSync(
      o.csv,
      [
        'url,verdict,coverageState,lastCrawl,impressions,priority,lastmod',
        ...rows
          .sort((a, b) => b.impressions - a.impressions)
          .map((r) => [r.url, r.verdict, r.state, r.lastCrawl, r.impressions, r.priority, r.lastmod].map(esc).join(',')),
      ].join('\n'),
      'utf8',
    );
    console.log(`\n전체 결과 → ${o.csv}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
