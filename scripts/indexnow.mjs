#!/usr/bin/env node
/**
 * IndexNow 로 변경된 URL 을 검색엔진에 알린다.
 *
 * 네이버·Bing·Yandex·Seznam 이 IndexNow 를 지원한다. **Google 은 참여하지 않는다.**
 * Google 쪽은 색인 요청 API 가 없어서(Indexing API 는 JobPosting/BroadcastEvent
 * 전용, URL Inspection API 는 읽기 전용) Search Console 에서 수동으로 눌러야 한다.
 * 어떤 URL 을 누를지 고르는 건 scripts/gsc-index-status.mjs 가 뽑아준다.
 *
 * 모드
 *   --changed  (기본) 배포된 sitemap.xml 의 lastmod 와 로컬 sitemap.ts 를 비교해
 *              바뀐 URL 만 보낸다. 상태 파일이 필요 없고, 배포 후 두 쪽이 같아지므로
 *              같은 변경을 두 번 보내지 않는다. 자동 실행에 쓰는 모드다.
 *   --since    lastmod 가 기준일 이후인 URL. 수동 점검용.
 *   --all      사이트맵 전체. 최초 1회만. 반복하면 429(스팸 판정)가 돌아온다.
 *
 * 기타
 *   --dry-run  전송 없이 목록만
 *   --auto     postbuild 자동 실행용. 프로덕션 배포가 아니면 조용히 넘어가고,
 *              전송에 실패해도 빌드를 깨뜨리지 않는다.
 *
 * 사용법
 *   npm run indexnow                  바뀐 것만
 *   npm run indexnow -- --dry-run
 *   npm run indexnow -- --since 2026-10-01
 *   npm run indexnow -- --all         최초 1회
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';

const HOST = 'moduncalc.com';
const ORIGIN = `https://${HOST}`;
const KEY = 'bX37F8C0urkSSDSeaB0k4FxyhVwcPYgO';
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const LIVE_SITEMAP = `${ORIGIN}/sitemap.xml`;

/** 엔진별 직접 전송. api.indexnow.org 의 전달에 의존하지 않는다. */
const ENDPOINTS = [
  { name: '네이버', url: 'https://searchadvisor.naver.com/indexnow' },
  { name: 'Bing', url: 'https://www.bing.com/indexnow' },
  { name: 'Yandex', url: 'https://yandex.com/indexnow' },
];

const MAX_PER_REQUEST = 10_000;

/** src/app/sitemap.ts 에서 { path, lastmod } 를 읽는다. 사이트맵이 유일한 정본이다. */
function readLocalSitemap() {
  const src = readFileSync(path.join(process.cwd(), 'src/app/sitemap.ts'), 'utf8');
  const entries = [...src.matchAll(/\{\s*path:\s*'([^']+)',[^}]*?lastmod:\s*'(\d{4}-\d{2}-\d{2})'\s*\}/g)]
    .map((m) => ({ url: `${ORIGIN}${m[1] === '/' ? '/' : m[1]}`, lastmod: m[2] }));
  if (!entries.length) throw new Error('sitemap.ts 에서 항목을 못 읽었습니다. 형식이 바뀌었는지 확인하세요.');
  return entries;
}

/** 현재 배포된 sitemap.xml 의 url -> lastmod. 실패하면 null 을 돌려 호출자가 판단한다. */
async function fetchLiveSitemap() {
  try {
    const res = await fetch(LIVE_SITEMAP, { headers: { 'cache-control': 'no-cache' } });
    if (!res.ok) return null;
    const xml = await res.text();
    const map = new Map();
    for (const m of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
      map.set(m[1].trim(), m[2].slice(0, 10));
    }
    return map.size ? map : null;
  } catch {
    return null;
  }
}

function parseArgs(argv) {
  const o = { mode: 'changed', since: null, dryRun: false, auto: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all') o.mode = 'all';
    else if (a === '--changed') o.mode = 'changed';
    else if (a === '--dry-run') o.dryRun = true;
    else if (a === '--auto') o.auto = true;
    else if (a === '--since') { o.mode = 'since'; o.since = argv[++i]; }
    else if (a.startsWith('--since=')) { o.mode = 'since'; o.since = a.slice('--since='.length); }
    else { console.error(`알 수 없는 인자: ${a}`); process.exit(1); }
  }
  if (o.mode === 'since' && !/^\d{4}-\d{2}-\d{2}$/.test(o.since ?? '')) {
    console.error(`--since 는 YYYY-MM-DD 형식이어야 합니다: ${o.since}`);
    process.exit(1);
  }
  return o;
}

async function submit(endpoint, urlList, dryRun) {
  if (dryRun) return { ok: true, status: 0, note: 'dry-run' };
  const res = await fetch(endpoint.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const note = {
    200: '정상 접수',
    202: '접수됨 (키 검증 대기)',
    400: '요청 형식 오류',
    403: '키가 유효하지 않음 — 키 파일이 배포됐는지 확인',
    422: 'URL 이 host 와 맞지 않음',
    429: '전송 과다 — 바뀐 URL 만 보내세요',
  }[res.status] ?? '예상치 못한 응답';
  return { ok: res.ok || res.status === 202, status: res.status, note };
}

async function pickUrls(o, local) {
  if (o.mode === 'all') {
    return { urls: local.map((e) => e.url), why: '사이트맵 전체' };
  }
  if (o.mode === 'since') {
    return {
      urls: local.filter((e) => e.lastmod >= o.since).map((e) => e.url),
      why: `lastmod >= ${o.since}`,
    };
  }
  // changed: 배포본과 비교
  const live = await fetchLiveSitemap();
  if (!live) {
    return {
      urls: [],
      why: '배포된 sitemap.xml 을 읽지 못해 비교를 건너뜀',
      softFail: true,
    };
  }
  const urls = local
    .filter((e) => {
      const prev = live.get(e.url);
      return prev === undefined || e.lastmod > prev;
    })
    .map((e) => e.url);
  return { urls, why: `배포본 sitemap.xml 과 비교 (배포본 ${live.size}개)` };
}

async function main() {
  const o = parseArgs(process.argv.slice(2));

  // 자동 실행은 프로덕션 배포에서만. 로컬·프리뷰 빌드에서 알림이 나가면 안 된다.
  if (o.auto && process.env.VERCEL_ENV !== 'production') {
    console.log(`[indexnow] 프로덕션 배포가 아니라 건너뜁니다 (VERCEL_ENV=${process.env.VERCEL_ENV ?? '없음'})`);
    return;
  }

  const local = readLocalSitemap();
  const { urls, why, softFail } = await pickUrls(o, local);

  console.log(`[indexnow] 로컬 사이트맵 ${local.length}개 · 전송 대상 ${urls.length}개 — ${why}`);

  if (!urls.length) {
    if (softFail && !o.auto) process.exitCode = 1;
    else console.log('[indexnow] 보낼 URL 이 없습니다. 변경된 페이지가 없으면 정상입니다.');
    return;
  }
  for (const u of urls) console.log('  ' + u);

  if (urls.length > MAX_PER_REQUEST) {
    console.error(`한 번에 ${MAX_PER_REQUEST}개까지만 보낼 수 있습니다.`);
    process.exit(o.auto ? 0 : 1);
  }

  console.log();
  let failed = 0;
  for (const ep of ENDPOINTS) {
    try {
      const r = await submit(ep, urls, o.dryRun);
      console.log(`  ${r.ok ? '✓' : '✗'} ${ep.name.padEnd(8)} ${r.status || ''} ${r.note}`);
      if (!r.ok) failed++;
    } catch (e) {
      console.log(`  ✗ ${ep.name.padEnd(8)} 전송 실패: ${e.message}`);
      failed++;
    }
  }

  if (o.dryRun) {
    console.log('\ndry-run 이라 실제로 보내지 않았습니다.');
    return;
  }
  if (failed) {
    console.log(`\n${failed}개 엔진에서 실패했습니다.`);
    // 자동 실행에서는 빌드를 깨뜨리지 않는다. 색인 통보 실패가 배포를 막을 이유는 없다.
    if (!o.auto) process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error('[indexnow]', e);
  // --auto 여부를 못 읽는 상황도 있으므로 인자를 직접 본다.
  if (!process.argv.includes('--auto')) process.exitCode = 1;
});
