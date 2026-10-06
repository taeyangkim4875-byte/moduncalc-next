#!/usr/bin/env node
/**
 * 배포 전 수치·링크 일관성 점검.
 *
 * 이 사이트는 /changelog 에서 "핵심 수치가 사이트 전체에서 하나의 값으로만
 * 등장하는지 배포 전에 자동 점검한다"고 공개하고 있습니다. 그 점검이 이 스크립트입니다.
 *
 *   npm run check:rates
 *
 * 실패하면 종료 코드 1 을 반환하므로 build 가 중단됩니다.
 *
 * ── 수치가 바뀌었을 때 할 일 ─────────────────────────────
 * 1. src/data/constants.ts 의 상수를 고친다
 * 2. 본문에 직접 적힌 숫자를 모두 찾아 고친다
 * 3. src/data/changelog.ts 에 변경 이력을 추가한다
 * 4. 아래 STALE_VALUES 의 패턴을 새 기준에 맞게 갱신한다
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const APP = path.join(SRC, 'app');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const allFiles = walk(SRC);
const codeFiles = allFiles.filter((p) => /\.tsx?$/.test(p));
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

let failures = 0;
const fail = (msg) => { failures++; console.error('  ❌ ' + msg); };

/* ───────── 1. 폐기된 수치가 남아 있는지 ───────── */
/**
 * 각 항목의 `bad` 는 "이제는 나오면 안 되는" 표기입니다.
 * 과거 값을 "637만원 → 659만원" 처럼 변경 이력으로 적는 경우는 통과해야 하므로
 * 뒤에 화살표가 붙은 형태는 제외합니다.
 */
const STALE_VALUES = [
  { name: '2026 최저시급 (10,320원)', bad: [/10,?470원/, /최저시급[^.]{0,25}10,?030원(?!\s*대비)/] },
  { name: '건강보험료율 (7.19% / 본인 3.595%)', bad: [/건강보험료?율[^.→]{0,15}7\.09%(?!\s*→)/, /3\.545%/, /3\.595%\s*\/\s*2/] },
  { name: '국민연금 요율 (9.5% / 본인 4.75%)', bad: [/국민연금[^.]{0,25}\b4\.5%/, /pension[^.]{0,40}\b4\.5%\b/i, /full 9%\b/] },
  { name: '국민연금 상한 (659만원)', bad: [/상한[^.→]{0,10}637만(?!원\s*→|원에서)/, /cap[^.]{0,40}6,370,000(?!\s*KRW\))/] },
  { name: '국민연금 하한 (41만원)', bad: [/하한[^.]{0,10}39만/, /lower limit is 390,000/] },
  { name: '실업급여 하한 (66,048원)', bad: [/63,?104/] },
  { name: '증권거래세 (2026: 0.20%)', bad: [/증권거래세\s*0\.18%/, /코스피\s*0%/, /거래세가 0%로 인하/] },
  { name: '금 1냥 (10돈 = 37.5g)', bad: [/3\.75\s*(돈|Don)\s*\(1\s*(냥|Nyang)\)/, /14\.0625/] },
  { name: 'flat tax 분기점 (약 1.6억)', bad: [/45-50 million/] },
  { name: '간이과세 기준 (1억 400만원)', bad: [/simplified VAT taxpayer[^.]{0,40}40 million/i] },
];

/**
 * changelog.ts 는 "변경 전" 값을 기록하는 것이 존재 이유이므로 이 검사에서 제외합니다.
 * 과거 수치가 남아 있어도 되는 유일한 파일입니다.
 */
const HISTORY_FILES = new Set(['src/data/changelog.ts']);
const scanFiles = codeFiles.filter((f) => !HISTORY_FILES.has(rel(f)));

console.log('1) 폐기된 수치 검사');
for (const rule of STALE_VALUES) {
  const hits = [];
  for (const f of scanFiles) {
    const s = fs.readFileSync(f, 'utf8');
    for (const re of rule.bad) {
      const m = s.match(new RegExp(re.source, 'g'));
      if (m) hits.push(`${rel(f)} :: ${m[0]}`);
    }
  }
  if (hits.length) {
    fail(`${rule.name} — 과거/오류 표기 ${hits.length}건`);
    hits.forEach((h) => console.error('       ' + h));
  } else {
    console.log('  ✅ ' + rule.name);
  }
}

/* ───────── 2. 끊어진 내부 링크 ───────── */
const routes = new Set(
  allFiles
    .filter((p) => path.basename(p) === 'page.tsx')
    .map((p) => '/' + path.relative(APP, path.dirname(p)).split(path.sep).join('/'))
    .map((r) => (r === '/.' ? '/' : r)),
);
routes.add('/');

const broken = new Map();
for (const f of codeFiles) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/href[:=]\s*["'{]?["']?(\/[A-Za-z0-9\-_/]*)["']/g)) {
    let h = m[1];
    if (h.startsWith('/_next') || h.startsWith('/api') || h.startsWith('/embed')) continue;
    if (/\.(svg|png|ico|xml|txt|webmanifest|js)$/.test(h)) continue;
    h = h.replace(/\/$/, '') || '/';
    if (routes.has(h)) continue;
    if (!broken.has(h)) broken.set(h, new Set());
    broken.get(h).add(rel(f));
  }
}
console.log('\n2) 내부 링크 검사');
if (broken.size === 0) console.log('  ✅ 끊어진 내부 링크 없음');
else for (const [h, srcs] of broken) fail(`${h} <- ${[...srcs].join(', ')}`);

/* ───────── 3. 사이트맵 ↔ 실제 라우트 ───────── */
const sitemap = fs.readFileSync(path.join(APP, 'sitemap.ts'), 'utf8');
const listed = [...sitemap.matchAll(/path: '([^']+)'/g)].map((m) => m[1]);
const ghosts = listed.filter((p) => !routes.has(p));
console.log('\n3) 사이트맵 검사');
if (ghosts.length === 0) console.log(`  ✅ 사이트맵 ${listed.length}개 항목 모두 실재 라우트`);
else ghosts.forEach((g) => fail(`사이트맵에 있으나 라우트 없음: ${g}`));

/* ───────── 결과 ───────── */
if (failures) {
  console.error(`\n✗ ${failures}건 실패 — 배포를 중단합니다.`);
  process.exit(1);
}
console.log('\n✓ 수치·링크 일관성 점검 통과');
