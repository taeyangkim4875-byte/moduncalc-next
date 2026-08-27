#!/usr/bin/env node
/**
 * SEO 자동 수정 스크립트
 * 실행: node scripts/fix-seo.mjs
 *
 * 1. BreadcrumbJsonLd 자동 삽입
 * 2. OpenGraph 메타데이터 자동 삽입
 * 3. ShareButtons 자동 삽입 (계산기 컴포넌트)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '..', 'src');
const APP = path.join(SRC, 'app');

let fixed = 0;
let skipped = 0;

const ROUTE_LABELS = {
  salary: '연봉', loan: '대출', health: '건강', tax: '세금',
  pension: '연금', realestate: '부동산', savings: '적금',
  daily: '일상', guide: '가이드', calc: '계산기',
};

const PAGE_LABELS = {
  '/salary': '연봉 실수령액', '/salary/table': '실수령액 표', '/salary/minimum': '최저시급',
  '/salary/severance': '퇴직금', '/salary/live': '월급 카운터', '/salary/convert': '연봉 환산기',
  '/salary/calendar': '월급 달력', '/salary/parental': '육아휴직', '/salary/annual': '연차',
  '/salary/lifetime': '평생 근로소득', '/salary/insurance': '4대보험',
  '/savings/doyak': '청년도약계좌', '/savings/mirae': '청년미래적금', '/savings/interest': '적금 이자',
  '/loan': '대출 이자', '/loan/dsr': 'DSR', '/loan/car': '자동차 할부',
  '/realestate/acqtax': '취득세', '/realestate/registration': '등기비용',
  '/realestate/convert': '전월세 전환', '/realestate/commission': '복비',
  '/realestate/transfer': '양도소득세', '/realestate/rental': '임대수익률',
  '/realestate/subscription': '청약 가점',
  '/tax/vat': '부가세', '/tax/income': '종합소득세', '/tax/gift': '증여세',
  '/tax/inherit': '상속세', '/tax/eitc': '근로장려금', '/tax/property': '종부세',
  '/pension/jobless': '실업급여', '/pension/nps': '국민연금',
  '/health/bmi': 'BMI', '/health/bmr': '기초대사량', '/health/bodyfat': '체지방률',
  '/health/sleep': '수면 계산기', '/health/water': '물 섭취량',
  '/daily/charcount': '글자수', '/daily/password': '비밀번호', '/daily/random': '랜덤 뽑기',
  '/daily/time': '시간 계산기', '/daily/percent': '퍼센트', '/daily/discount': '할인가',
  '/daily/unit': '단위변환', '/daily/speed': '속도·시간',
  '/daily/dday': 'D-day', '/daily/age': '나이', '/daily/anniversary': '기념일',
  '/daily/baby100': '아기 100일', '/daily/due-date': '출산 예정일',
  '/daily/lunar': '음력 양력', '/daily/military': '전역일',
  '/daily/fuel': '연비', '/daily/aircon': '에어컨 전기요금', '/daily/electric': '전기요금',
  '/daily/water': '수도요금', '/daily/gas': '가스요금',
  '/daily/airfryer': '에어프라이어', '/daily/paint': '페인트', '/daily/travel': '여행 경비',
  '/daily/stock': '주식 수익률', '/daily/crypto': '가상자산', '/daily/gold': '금 시세',
  '/daily/fire': 'FIRE', '/daily/adsense': '애드센스', '/daily/coupang': '쿠팡 파트너스',
  '/daily/youtube': '유튜브 수익', '/daily/dutch': '더치페이', '/daily/tip-split': '모임 정산',
  '/daily/alcohol': '음주 운전', '/daily/gpa': '학점', '/daily/calorie': '칼로리',
  '/daily/pyeong': '평수 변환', '/daily/cartax': '자동차세', '/daily/bmi-child': '어린이 BMI',
  '/daily/compound': '복리 계산기',
};

function findPages(dir, prefix = '') {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['api', 'embed', 'node_modules', '__tests__'].includes(entry.name)) continue;
      results.push(...findPages(full, `${prefix}/${entry.name}`));
    } else if (entry.name === 'page.tsx') {
      results.push({ file: full, route: prefix || '/' });
    }
  }
  return results;
}

function buildBreadcrumb(route) {
  const parts = route.split('/').filter(Boolean);
  const items = [{ name: '홈', href: '/' }];
  let accum = '';
  for (let i = 0; i < parts.length; i++) {
    accum += '/' + parts[i];
    const isLast = i === parts.length - 1;
    const label = isLast
      ? (PAGE_LABELS[route] || parts[i])
      : (ROUTE_LABELS[parts[i]] || parts[i]);
    items.push({ name: label, href: accum });
  }
  return items;
}

// ── Fix 1: BreadcrumbJsonLd ──
function fixBreadcrumb(file, route) {
  let src = fs.readFileSync(file, 'utf-8');
  if (src.includes('BreadcrumbJsonLd')) return false;
  if (!src.includes('PageLayout')) return false;

  const items = buildBreadcrumb(route);
  const itemsStr = items.map(i => `{ name: '${i.name}', href: '${i.href}' }`).join(', ');
  const component = `      <BreadcrumbJsonLd items={[${itemsStr}]} />`;

  // import 추가
  if (src.includes("from '@/components/JsonLd'") || src.includes('from "@/components/JsonLd"')) {
    if (!src.includes('BreadcrumbJsonLd')) {
      src = src.replace(
        /(import\s*\{[^}]*)(}\s*from\s*['"]@\/components\/JsonLd['"])/,
        (_, before, after) => {
          const cleaned = before.trimEnd();
          return `${cleaned}, BreadcrumbJsonLd ${after}`;
        }
      );
    }
  } else {
    const lastImport = src.lastIndexOf('\nimport ');
    if (lastImport !== -1) {
      const lineEnd = src.indexOf('\n', lastImport + 1);
      src = src.slice(0, lineEnd + 1) +
        "import { BreadcrumbJsonLd } from '@/components/JsonLd';\n" +
        src.slice(lineEnd + 1);
    }
  }

  // PageLayout 시작 태그 뒤에 삽입
  const plMatch = src.match(/<PageLayout[^>]*>/);
  if (plMatch) {
    const idx = src.indexOf(plMatch[0]) + plMatch[0].length;
    src = src.slice(0, idx) + '\n' + component + src.slice(idx);
  }

  fs.writeFileSync(file, src, 'utf-8');
  return true;
}

// ── Fix 2: OpenGraph 메타데이터 ──
function fixOpenGraph(file, route) {
  let src = fs.readFileSync(file, 'utf-8');
  if (src.includes('openGraph') || src.includes('generateMetadata')) return false;

  // title과 description 추출
  const titleMatch = src.match(/title:\s*["']([^"']+)["']/);
  const descMatch = src.match(/description:\s*["']([^"']+)["']/);
  if (!titleMatch) return false;

  const title = titleMatch[1];
  const desc = descMatch ? descMatch[1] : title;
  const url = `https://moduncalc.com${route}`;

  const ogBlock = `  openGraph: {\n    title: "${title}",\n    description: "${desc}",\n    url: "${url}",\n  },`;

  // metadata 객체에서 마지막 필드 뒤에 삽입
  // alternates 뒤 or description 뒤에 삽입
  if (src.includes('alternates:')) {
    src = src.replace(
      /(alternates:\s*\{[^}]+\}\s*,?)/,
      (match) => {
        const m = match.trimEnd();
        const withComma = m.endsWith(',') ? m : m + ',';
        return withComma + '\n' + ogBlock;
      }
    );
  } else if (descMatch) {
    src = src.replace(
      /(description:\s*["'][^"']+["']\s*,?)/,
      (match) => {
        const m = match.trimEnd();
        const withComma = m.endsWith(',') ? m : m + ',';
        return withComma + '\n' + ogBlock;
      }
    );
  } else {
    return false;
  }

  fs.writeFileSync(file, src, 'utf-8');
  return true;
}

// ── Fix 3: ShareButtons 삽입 ──
function fixShareButtons(file, route) {
  const dir = path.dirname(file);
  const calcFiles = fs.readdirSync(dir).filter(f =>
    f.endsWith('.tsx') && f !== 'page.tsx' &&
    (f.includes('Calc') || f.includes('Calculator') || f.includes('Reverse'))
  );

  if (calcFiles.length === 0) return false;

  for (const cf of calcFiles) {
    const calcPath = path.join(dir, cf);
    let src = fs.readFileSync(calcPath, 'utf-8');
    if (src.includes('ShareButtons')) continue;
    if (!src.includes("'use client'")) continue;

    // ResultPanel이 있는 경우에만 ShareButtons 추가
    if (!src.includes('ResultPanel') && !src.includes('result')) continue;

    // import 추가
    const lastImportIdx = src.lastIndexOf('\nimport ');
    if (lastImportIdx === -1) continue;
    const lineEnd = src.indexOf('\n', lastImportIdx + 1);
    src = src.slice(0, lineEnd + 1) +
      "import ShareButtons from '@/components/ShareButtons';\n" +
      src.slice(lineEnd + 1);

    // 타이틀 추출
    const pageLabel = PAGE_LABELS[route] || route.split('/').pop();

    // ResultPanel 닫는 태그 뒤에 삽입
    const rpClose = src.lastIndexOf('</ResultPanel>');
    if (rpClose !== -1) {
      const insertIdx = rpClose + '</ResultPanel>'.length;
      src = src.slice(0, insertIdx) +
        `\n        <ShareButtons title="${pageLabel}" />` +
        src.slice(insertIdx);
    }

    fs.writeFileSync(calcPath, src, 'utf-8');
    return true;
  }
  return false;
}

// ── 실행 ──
console.log('🔧 SEO 자동 수정 시작...\n');

const pages = findPages(APP);

for (const { file, route } of pages) {
  if (route.startsWith('/en')) continue;
  if (route === '/') continue;
  if (route.includes('/reverse')) continue;

  const skip = ['/about', '/contact', '/privacy', '/terms', '/disclaimer', '/map', '/history'];
  if (skip.includes(route)) continue;

  let pageFixed = false;

  if (fixBreadcrumb(file, route)) {
    console.log(`  ✅ BreadcrumbJsonLd 추가: ${route}`);
    pageFixed = true;
  }

  if (fixOpenGraph(file, route)) {
    console.log(`  ✅ OpenGraph 추가: ${route}`);
    pageFixed = true;
  }

  if (fixShareButtons(file, route)) {
    console.log(`  ✅ ShareButtons 추가: ${route}`);
    pageFixed = true;
  }

  if (pageFixed) fixed++;
  else skipped++;
}

console.log(`\n${'='.repeat(50)}`);
console.log(`📊 수정 완료: ${fixed}개 페이지 수정, ${skipped}개 스킵`);
console.log(`${'='.repeat(50)}\n`);
console.log('💡 빌드 확인: npx next build');
console.log('💡 재감사:    node scripts/audit.mjs\n');
