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
  /**
   * 주휴시간은 8시간이 상한이다(근로기준법 제50조).
   * Math.min 없이 (주시간/40)*8 을 그대로 쓰면 주 40시간 초과 시 과다 계산된다.
   * 계산은 utils/holidayPay 의 calcHolidayHours 를 쓸 것.
   */
  { name: '주휴시간 8시간 상한', bad: [/\/\s*40\s*\)\s*\*\s*8(?![^;]*Math\.min)/] },
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

/* ───────── 4. 영문 계산기에 남은 한국어 단위 ───────── */
/*
 * 영문 계산기는 금액을 "만원" 단위로 입력받는데, 접미사를 맨 "만원" 으로만 적으면
 * 영문 독자는 단위를 알 수 없다. src/utils/krwEn.ts 의 MAN_SUFFIX_EN 처럼 원화
 * 환산을 같이 적어야 한다. 예전에 영문 계산기 7개가 맨 "만원" 만 달고 있었다.
 *
 * 그리고 만원 → 억원 환산은 10,000 으로 나눈다. /en/tax-comparison 이 100 으로
 * 나눠서 5,000만원(₩50,000,000)을 "50.0억원"으로 100배 틀리게 적고 있었다.
 */
const EN_DIR = path.join(APP, 'en');
const SEP = path.sep;
const enCalcFiles = codeFiles.filter(
  (f) => f.startsWith(EN_DIR + SEP) && !f.includes(SEP + 'guide' + SEP),
);

console.log('\n4) 영문 계산기 단위 표기 검사');
let unitFails = 0;
for (const f of enCalcFiles) {
  const src = fs.readFileSync(f, 'utf8');
  if (/>\s*만원(\/mo)?\s*</.test(src)) {
    fail(rel(f) + ': 원화 환산 없는 "만원" 표기 — @/utils/krwEn 의 MAN_SUFFIX_EN 을 쓸 것');
    unitFails++;
  }
  if (/\/\s*100\s*\)\s*\.toFixed\([^)]*\)\s*\}\s*억원/.test(src)) {
    fail(rel(f) + ': 만원→억원 환산을 100 으로 나눔 — eokFromMan 을 쓸 것 (1억 = 10,000만원)');
    unitFails++;
  }
}
if (unitFails === 0) console.log('  ✅ 영문 계산기 ' + enCalcFiles.length + '개 단위 표기 정상');

/* ───────── 5. 영문 페이지 공통 UI 가 한국어로 고정돼 있지 않은지 ───────── */
/*
 * PageLayout 이 붙는 영문 페이지 78개에 한국어 푸터·작성자 블록이 그대로
 * 노출되던 적이 있다. 공통 컴포넌트는 isEnPath 로 언어를 갈라야 한다.
 */
const BILINGUAL = [
  'src/components/PageMeta.tsx',
  'src/components/SiteFooter.tsx',
  'src/components/SearchBar.tsx',
  'src/components/RelatedCalcs.tsx',
  'src/components/ShareButtons.tsx',
  'src/components/ScrollToTop.tsx',
  'src/components/FirstSaveNotice.tsx',
];
console.log('\n5) 영문 페이지 공통 UI 이중언어 검사');
let langFails = 0;
for (const r of BILINGUAL) {
  if (!fs.existsSync(r)) {
    fail(r + ': 파일이 없음 (이중언어 대상 목록을 고칠 것)');
    langFails++;
    continue;
  }
  const src = fs.readFileSync(r, 'utf8');
  if (!/isEnPath|isEn\b/.test(src)) {
    fail(r + ': 영문 페이지에도 붙는 공통 UI 인데 언어 분기가 없음 — isEnPath 를 쓸 것');
    langFails++;
  }
}
if (langFails === 0) console.log('  ✅ 공통 UI ' + BILINGUAL.length + '개 모두 언어 분기 있음');

/* ───────── 결과 ───────── */
if (failures) {
  console.error(`\n✗ ${failures}건 실패 — 배포를 중단합니다.`);
  process.exit(1);
}
console.log('\n✓ 수치·링크 일관성 점검 통과');
