#!/usr/bin/env node
/**
 * IndexNow 로 변경된 URL 을 검색엔진에 알린다.
 *
 * 네이버·Bing·Yandex·Seznam 이 IndexNow 를 지원한다. **Google 은 참여하지 않는다.**
 * Google 쪽은 색인 요청 API 가 없어서(Indexing API 는 JobPosting/BroadcastEvent
 * 전용, URL Inspection API 는 읽기 전용) Search Console 에서 수동으로 눌러야 한다.
 * 어떤 URL 을 누를지 고르는 건 scripts/gsc-index-status.mjs 가 뽑아준다.
 *
 * 사용법:
 *   node scripts/indexnow.mjs                  최근 7일 안에 lastmod 가 바뀐 URL
 *   node scripts/indexnow.mjs --since 2026-10-01
 *   node scripts/indexnow.mjs --all            사이트맵 전체 (최초 1회용)
 *   node scripts/indexnow.mjs --dry-run        전송 없이 목록만 확인
 *
 * 주의: 바뀌지 않은 URL 을 반복 전송하면 스팸으로 간주되어 429 가 돌아온다.
 * 평소에는 기본 모드(최근 변경분)를 쓰고, --all 은 처음 한 번만 쓸 것.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';

const HOST = 'moduncalc.com';
const ORIGIN = `https://${HOST}`;
const KEY = 'bX37F8C0urkSSDSeaB0k4FxyhVwcPYgO';
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;

/** 엔진별 직접 전송. api.indexnow.org 의 전달에 의존하지 않는다. */
const ENDPOINTS = [
  { name: '네이버', url: 'https://searchadvisor.naver.com/indexnow' },
  { name: 'Bing', url: 'https://www.bing.com/indexnow' },
  { name: 'Yandex', url: 'https://yandex.com/indexnow' },
];

const MAX_PER_REQUEST = 10_000;

/** src/app/sitemap.ts 에서 { path, lastmod } 를 읽는다. 사이트맵이 유일한 정본이다. */
function readSitemap() {
  const src = readFileSync(path.join(process.cwd(), 'src/app/sitemap.ts'), 'utf8');
  const entries = [...src.matchAll(/\{\s*path:\s*'([^']+)',[^}]*?lastmod:\s*'(\d{4}-\d{2}-\d{2})'\s*\}/g)]
    .map(m => ({ path: m[1], lastmod: m[2] }));
  if (!entries.length) throw new Error('sitemap.ts 에서 항목을 못 읽었습니다. 형식이 바뀌었는지 확인하세요.');
  return entries;
}

function parseArgs(argv) {
  const out = { mode: 'since', since: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all') out.mode = 'all';
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--since') out.since = argv[++i];
    else if (a.startsWith('--since=')) out.since = a.slice('--since='.length);
    else { console.error(`알 수 없는 인자: ${a}`); process.exit(1); }
  }
  if (out.mode === 'since' && !out.since) {
    const d = new Date(Date.now() - 7 * 864e5);
    out.since = d.toISOString().slice(0, 10);
  }
  if (out.since && !/^\d{4}-\d{2}-\d{2}$/.test(out.since)) {
    console.error(`--since 는 YYYY-MM-DD 형식이어야 합니다: ${out.since}`);
    process.exit(1);
  }
  return out;
}

async function submit(endpoint, urlList, dryRun) {
  if (dryRun) return { ok: true, status: 0, note: 'dry-run' };
  const res = await fetch(endpoint.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const note = {
    200: '정상 접수', 202: '접수됨 (키 검증 대기)', 400: '요청 형식 오류',
    403: '키가 유효하지 않음 — 키 파일이 배포됐는지 확인', 422: 'URL 이 host 와 맞지 않음',
    429: '전송 과다 — 바뀐 URL 만 보내세요',
  }[res.status] ?? '예상치 못한 응답';
  return { ok: res.ok || res.status === 202, status: res.status, note };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const all = readSitemap();

  const picked = args.mode === 'all' ? all : all.filter(e => e.lastmod >= args.since);
  const urls = picked.map(e => `${ORIGIN}${e.path === '/' ? '/' : e.path}`);

  console.log(`사이트맵 ${all.length}개 중 전송 대상 ${urls.length}개` +
    (args.mode === 'all' ? ' (전체)' : ` (lastmod >= ${args.since})`));

  if (!urls.length) {
    console.log('보낼 URL 이 없습니다. sitemap.ts 의 lastmod 를 수정했는지 확인하세요.');
    return;
  }
  for (const u of urls) console.log('  ' + u);

  if (urls.length > MAX_PER_REQUEST) {
    console.error(`한 번에 ${MAX_PER_REQUEST}개까지만 보낼 수 있습니다.`);
    process.exit(1);
  }

  console.log();
  let failed = 0;
  for (const ep of ENDPOINTS) {
    try {
      const r = await submit(ep, urls, args.dryRun);
      console.log(`  ${r.ok ? '✓' : '✗'} ${ep.name.padEnd(8)} ${r.status || ''} ${r.note}`);
      if (!r.ok) failed++;
    } catch (e) {
      console.log(`  ✗ ${ep.name.padEnd(8)} 전송 실패: ${e.message}`);
      failed++;
    }
  }

  if (args.dryRun) console.log('\ndry-run 이라 실제로 보내지 않았습니다.');
  else if (failed) {
    console.log(`\n${failed}개 엔진에서 실패했습니다.`);
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
