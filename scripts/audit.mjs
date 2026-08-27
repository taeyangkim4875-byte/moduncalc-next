#!/usr/bin/env node
/**
 * 사이트 완성도 감사 스크립트
 * 실행: node scripts/audit.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '..', 'src');
const APP = path.join(SRC, 'app');

const issues = [];
const stats = { pages: 0, pass: 0, warn: 0, fail: 0 };

function warn(page, msg) { issues.push({ level: 'WARN', page, msg }); stats.warn++; }
function fail(page, msg) { issues.push({ level: 'FAIL', page, msg }); stats.fail++; }

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

function checkPage(file, route) {
  const src = fs.readFileSync(file, 'utf-8');
  const isEn = route.startsWith('/en');
  const isReverse = route.includes('/reverse');
  stats.pages++;

  // 1. Metadata 존재 확인
  if (!src.includes('metadata') && !src.includes('generateMetadata')) {
    fail(route, 'metadata 또는 generateMetadata 없음');
  }

  // 2. title 확인
  if (!src.includes('title:') && !src.includes('title,')) {
    fail(route, 'title 메타데이터 없음');
  }

  // 3. description 확인
  if (!src.includes('description:') && !src.includes('description,')) {
    warn(route, 'description 메타데이터 없음');
  }

  // 4. canonical URL 확인
  if (!src.includes('canonical') && !src.includes('alternates')) {
    warn(route, 'canonical URL 없음');
  }

  // 5. JSON-LD 구조화 데이터
  if (!isEn && !isReverse && !src.includes('JsonLd') && !src.includes('json-ld') && !src.includes('application/ld+json')) {
    warn(route, 'JSON-LD 구조화 데이터 없음');
  }

  // 6. PageLayout 사용 확인
  if (!src.includes('PageLayout') && route !== '/') {
    warn(route, 'PageLayout 미사용');
  }

  // 7. 계산기 페이지에 ShareButtons 확인 (reverse 제외)
  const hasCalcComponent = src.includes('Calculator') || src.includes('Calc ') || src.includes('Calc/') || src.includes('Calc,');
  if (hasCalcComponent && !isEn && !isReverse) {
    // 계산기 컴포넌트 파일에서 ShareButtons 확인
    const dir = path.dirname(file);
    const calcFiles = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'page.tsx');
    let hasShare = false;
    for (const cf of calcFiles) {
      const calcSrc = fs.readFileSync(path.join(dir, cf), 'utf-8');
      if (calcSrc.includes('ShareButtons')) hasShare = true;
    }
    if (!hasShare && src.includes('ShareButtons')) hasShare = true;
    if (!hasShare) {
      warn(route, '계산기에 ShareButtons 없음');
    }
  }

  // 8. SEO 콘텐츠 (SeoSection/SeoFaq) 확인
  if (!isEn && !isReverse && hasCalcComponent) {
    if (!src.includes('SeoSection') && !src.includes('SeoFaq')) {
      warn(route, 'SEO 텍스트 콘텐츠 없음 (SeoSection/SeoFaq)');
    }
  }

  // 9. OG 이미지
  if (!isEn && !isReverse && !src.includes('openGraph') && !src.includes('ogImageUrl') && !src.includes('og:image')) {
    warn(route, 'OpenGraph 메타데이터 없음');
  }

  // 10. BreadcrumbJsonLd
  if (!isEn && !isReverse && !src.includes('BreadcrumbJsonLd') && route !== '/' && !route.startsWith('/en')) {
    warn(route, 'BreadcrumbJsonLd 없음');
  }
}

// 사이트맵 검증
function checkSitemap() {
  const sitemapFile = path.join(APP, 'sitemap.ts');
  if (!fs.existsSync(sitemapFile)) {
    fail('sitemap', 'sitemap.ts 파일 없음');
    return new Set();
  }
  const src = fs.readFileSync(sitemapFile, 'utf-8');
  const urls = new Set();
  for (const m of src.matchAll(/['"`](\/[^'"`\s${}]*?)['"`]/g)) {
    if (m[1] && !m[1].includes('$') && !m[1].includes('{')) {
      urls.add(m[1]);
    }
  }
  return urls;
}

// calculators.ts 레지스트리 검증
function checkRegistry() {
  const regFile = path.join(SRC, 'data', 'calculators.ts');
  if (!fs.existsSync(regFile)) return new Set();
  const src = fs.readFileSync(regFile, 'utf-8');
  const hrefs = new Set();
  for (const m of src.matchAll(/href:\s*['"]([^'"]+)['"]/g)) {
    hrefs.add(m[1]);
  }
  return hrefs;
}

// Sidebar 검증
function checkSidebar() {
  const sbFile = path.join(SRC, 'components', 'Sidebar.tsx');
  if (!fs.existsSync(sbFile)) return new Set();
  const src = fs.readFileSync(sbFile, 'utf-8');
  const hrefs = new Set();
  for (const m of src.matchAll(/href:\s*['"]([^'"]+)['"]/g)) {
    hrefs.add(m[1]);
  }
  return hrefs;
}

// 실행
console.log('🔍 모든계산기 사이트 감사 시작...\n');

const pages = findPages(APP);
const sitemapUrls = checkSitemap();
const registryHrefs = checkRegistry();
const sidebarHrefs = checkSidebar();

for (const { file, route } of pages) {
  checkPage(file, route);
}

// 사이트맵 누락 확인 (한국어 계산기 페이지만)
for (const { route } of pages) {
  if (route.startsWith('/en')) continue;
  if (route === '/') continue;
  if (route.includes('/reverse')) continue;
  if (!sitemapUrls.has(route)) {
    warn(route, '사이트맵에 누락');
  }
}

// 레지스트리 등록 확인
for (const { route } of pages) {
  if (route.startsWith('/en')) continue;
  if (['/', '/about', '/contact', '/privacy', '/terms', '/disclaimer', '/map', '/history', '/calc'].includes(route)) continue;
  if (route.includes('/reverse')) continue;
  if (route.includes('/guide')) continue;
  if (!registryHrefs.has(route)) {
    warn(route, '계산기 레지스트리(calculators.ts)에 미등록');
  }
}

// 결과 출력
console.log('=' .repeat(70));
console.log(`📊 감사 결과: ${stats.pages}개 페이지 검사`);
console.log(`   ✅ 통과: ${stats.pages - stats.warn - stats.fail}`);
console.log(`   ⚠️  경고: ${stats.warn}`);
console.log(`   ❌ 오류: ${stats.fail}`);
console.log('=' .repeat(70));

if (issues.length === 0) {
  console.log('\n🎉 문제 없음!');
} else {
  // 그룹별 출력
  const fails = issues.filter(i => i.level === 'FAIL');
  const warns = issues.filter(i => i.level === 'WARN');

  if (fails.length > 0) {
    console.log('\n❌ 오류 (반드시 수정):');
    for (const i of fails) {
      console.log(`   ${i.page} → ${i.msg}`);
    }
  }

  if (warns.length > 0) {
    console.log('\n⚠️  경고 (개선 권장):');
    // 카테고리별 그룹핑
    const byMsg = new Map();
    for (const i of warns) {
      if (!byMsg.has(i.msg)) byMsg.set(i.msg, []);
      byMsg.get(i.msg).push(i.page);
    }
    for (const [msg, pages] of byMsg) {
      console.log(`\n   📌 ${msg} (${pages.length}건):`);
      for (const p of pages.slice(0, 10)) {
        console.log(`      - ${p}`);
      }
      if (pages.length > 10) {
        console.log(`      ... 외 ${pages.length - 10}건`);
      }
    }
  }
}

console.log('\n');
