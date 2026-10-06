import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Card from '@/components/Card';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoLink } from '@/components/SeoContent';
import { getCalc } from '@/data/calculators';
import {
  CURRENT_RATES,
  CHANGELOG,
  UPCOMING,
  CHANGELOG_UPDATED,
  type ChangeEntry,
} from '@/data/changelog';

export const metadata: Metadata = {
  title: '세율·요율 변경 이력 - 2026년 적용 기준값 한눈에',
  description:
    '최저시급, 4대보험 요율, 국민연금 기준소득월액, 실업급여 상·하한액, 증권거래세까지. 2026년 현재 적용 중인 기준값과 언제 무엇이 바뀌었는지, 앞으로 바뀔 것은 무엇인지 근거와 함께 정리했습니다.',
  alternates: { canonical: 'https://moduncalc.com/changelog' },
  openGraph: {
    title: '세율·요율 변경 이력 - 2026년 적용 기준값 한눈에',
    description: '최저시급·4대보험·실업급여·증권거래세의 현재 기준값과 변경 이력, 예정된 변경을 근거와 함께 정리했습니다.',
    url: 'https://moduncalc.com/changelog',
  },
};

const CATEGORY_ORDER = ['최저임금', '4대보험', '실업급여', '세금'];

/** 계산기 목록에 없는 경로(가이드·정책 페이지)의 표시 이름 */
const PAGE_LABELS: Record<string, string> = {
  '/': '홈',
  '/about': '소개',
  '/guide/investment-tax': '가이드 · 주식 투자 세금',
  '/guide/minimum-wage': '가이드 · 최저시급',
  '/en/guide/freelancer-tax': 'EN · Freelancer Tax',
  '/en/guide/first-90-days': 'EN · First 90 Days',
  '/en/guide/year-end-settlement': 'EN · Year-End Settlement',
  '/en/guide/pension-guide': 'EN · National Pension',
  '/en/guide/pension-refund-countries': 'EN · Pension Refund by Nationality',
  '/en/guide/working-rights': 'EN · Worker Rights',
  '/en/guide/housing-guide': 'EN · Housing',
  '/en/guide/leaving-korea-checklist': 'EN · Leaving Korea Checklist',
  '/en/guide/visa-guide': 'EN · Visa Types',
};

function groupRates() {
  const map = new Map<string, typeof CURRENT_RATES>();
  for (const r of CURRENT_RATES) {
    if (!map.has(r.category)) map.set(r.category, []);
    map.get(r.category)!.push(r);
  }
  return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => [c, map.get(c)!] as const);
}

function AffectedLinks({ hrefs }: { hrefs: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {hrefs.map((href) => {
        const label = PAGE_LABELS[href] ?? getCalc(href)?.title ?? href;
        return (
          <Link
            key={href}
            href={href}
            className="inline-block text-[11px] font-bold px-2 py-1 rounded-lg bg-[var(--bg)] text-[var(--sub)] no-underline hover:bg-[var(--primary-weak)] hover:text-[var(--primary)] transition-colors"
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

function Entry({ e }: { e: ChangeEntry }) {
  const isCorrection = e.type === 'correction';
  return (
    <div className="border-l-2 border-[var(--line)] pl-4 pb-5 last:pb-0 relative">
      <span
        className="absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-[4.5px]"
        style={{ background: isCorrection ? 'var(--primary)' : '#00C271' }}
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-1.5 mb-1">
        <span
          className="text-[10px] font-extrabold px-1.5 py-0.5 rounded"
          style={
            isCorrection
              ? { background: 'var(--primary-weak)', color: 'var(--primary)' }
              : { background: '#E6F8F0', color: '#00A05E' }
          }
        >
          {isCorrection ? '정정' : '제도 변경'}
        </span>
        <span className="text-[10px] font-bold text-[var(--sub)] px-1.5 py-0.5 rounded bg-[var(--bg)]">
          {e.category}
        </span>
      </div>
      <h3 className="text-sm font-extrabold text-[var(--ink)] mb-1.5">{e.title}</h3>
      <div className="text-[13px] leading-relaxed text-[#4E5968] space-y-0.5">
        <div>
          <span className="text-[var(--sub)]">변경 전 </span>
          <span className="line-through decoration-[#C0C6CD]">{e.before}</span>
        </div>
        <div>
          <span className="text-[var(--sub)]">변경 후 </span>
          <strong className="text-[var(--ink)]">{e.after}</strong>
        </div>
      </div>
      {e.note && <p className="text-[13px] leading-relaxed text-[var(--sub)] mt-2">{e.note}</p>}
      <AffectedLinks hrefs={e.affected} />
      <div className="text-[11px] text-[var(--sub)] mt-2 leading-relaxed">
        근거 · {e.basis}
        <br />
        {e.effectiveDate && <>시행일 {e.effectiveDate} · </>}
        사이트 반영일 {e.appliedDate}
      </div>
    </div>
  );
}

export default function Page() {
  const grouped = groupRates();

  return (
    <PageLayout
      eyebrow="기준값 공개"
      title="세율·요율 변경 이력"
      description="이 사이트가 쓰는 숫자가 지금 얼마이고, 언제 왜 바뀌었는지 전부 공개합니다."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '변경 이력', href: '/changelog' }]} />
      <FaqJsonLd
        items={[
          {
            q: '2026년 최저시급은 얼마인가요?',
            a: '10,320원입니다. 2025년 10,030원 대비 290원(2.9%) 올랐으며, 월 209시간 기준 2,156,880원입니다. 2027년 1월 1일부터는 10,700원이 적용됩니다.',
          },
          {
            q: '2026년 4대보험 요율은 어떻게 되나요?',
            a: '국민연금 9.5%(근로자 4.75%), 건강보험 7.19%(근로자 3.595%), 장기요양보험은 건강보험료의 13.14%, 고용보험 실업급여분은 근로자 0.9%입니다. 국민연금 보험료율은 2033년 13%가 될 때까지 매년 0.5%p씩 오릅니다.',
          },
          {
            q: '국민연금 기준소득월액 상한은 언제 바뀌나요?',
            a: '매년 7월에 전체 가입자 평균소득 변동률을 반영해 조정됩니다. 2026년 7월부터 2027년 6월까지는 상한 659만원, 하한 41만원이 적용됩니다.',
          },
          {
            q: '2026년 증권거래세는 얼마인가요?',
            a: '2026년 1월 1일부터 코스피는 증권거래세 0.05%에 농어촌특별세 0.15%를 더해 0.20%, 코스닥과 K-OTC는 0.20%, 코넥스는 0.10%입니다. 금융투자소득세 폐지와 맞물려 인상됐습니다.',
          },
        ]}
      />

      <SeoSection title="이 페이지를 만든 이유">
        <p>
          연봉 실수령액이든 퇴직금이든, 계산 결과는 결국 <strong>어떤 숫자를 넣었느냐</strong>로 결정됩니다.
          그런데 그 숫자는 해마다, 때로는 연중에도 바뀝니다.
          최저임금은 1월에, 국민연금 기준소득월액은 7월에 바뀌고, 세법은 개정 시점마다 달라집니다.
        </p>
        <p>
          계산기 사이트에서 가장 흔한 문제가 <strong>어떤 페이지는 갱신되고 어떤 페이지는 과거 수치로 남는 것</strong>입니다.
          그래서 이 사이트는 모든 계산기가 참조하는 기준값을 코드 한 곳에서 관리하고,
          그 값이 언제 무엇 때문에 바뀌었는지를 이 페이지에 전부 기록합니다.
          제도 변경에 따른 갱신뿐 아니라 <strong>잘못 적혀 있던 수치를 바로잡은 기록도 함께</strong> 남깁니다.
        </p>
      </SeoSection>

      <Card>
        <h2 className="text-base font-extrabold mb-1">📌 현재 적용 중인 기준값</h2>
        <p className="text-sm text-[var(--sub)] leading-relaxed mb-4">
          {CHANGELOG_UPDATED} 기준. 이 표의 값이 사이트의 모든 계산기에 그대로 적용됩니다.
        </p>
        {grouped.map(([category, rows]) => (
          <div key={category} className="mb-4 last:mb-0">
            <div className="text-xs font-extrabold text-[var(--primary)] mb-2">{category}</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--bg)]">
                    <th className="text-left p-2 font-bold">항목</th>
                    <th className="text-left p-2 font-bold">값</th>
                    <th className="text-left p-2 font-bold">적용 기간</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-t border-[var(--line)] align-top">
                      <td className="p-2">
                        <div className="font-semibold text-[var(--ink)]">{r.label}</div>
                        <div className="text-[11px] text-[var(--sub)] mt-0.5">{r.source}</div>
                      </td>
                      <td className="p-2 font-bold text-[var(--ink)] whitespace-nowrap">{r.value}</td>
                      <td className="p-2 text-[var(--sub)] text-[13px] whitespace-nowrap">{r.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-1">🕒 변경 이력</h2>
        <p className="text-sm text-[var(--sub)] leading-relaxed mb-4">
          최신순입니다. <strong>제도 변경</strong>은 법령·고시가 바뀌어 갱신한 건,{' '}
          <strong>정정</strong>은 사이트에 잘못 적혀 있던 수치를 바로잡은 건입니다.
        </p>
        <div>
          {CHANGELOG.map((e) => (
            <Entry key={e.title + e.appliedDate} e={e} />
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-1">📅 예정된 변경</h2>
        <p className="text-sm text-[var(--sub)] leading-relaxed mb-4">
          이미 확정됐거나 예정된 변경입니다. 시행일이 되면 계산기에 반영하고 위 이력에 추가합니다.
        </p>
        <div className="flex flex-col gap-3">
          {UPCOMING.map((u) => (
            <div key={u.title} className="bg-[var(--bg)] rounded-xl p-3.5">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="text-[11px] font-extrabold text-[var(--primary)]">{u.date}</span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={
                    u.confirmed
                      ? { background: '#E6F8F0', color: '#00A05E' }
                      : { background: '#FFF4E5', color: '#B86E00' }
                  }
                >
                  {u.confirmed ? '확정' : '미확정'}
                </span>
              </div>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">{u.title}</div>
              <p className="text-[13px] leading-relaxed text-[#4E5968] m-0">{u.detail}</p>
              <div className="text-[11px] text-[var(--sub)] mt-1.5">근거 · {u.basis}</div>
            </div>
          ))}
        </div>
      </Card>

      <SeoSection title="수치를 관리하는 방식">
        <p>
          계산기에 쓰이는 세율·요율·기준금액은 전부 <strong>코드의 단일 상수 파일</strong>에 모여 있습니다.
          본문에 숫자를 적을 때도 그 값과 맞는지 확인한 뒤에 적습니다.
          페이지마다 따로 숫자를 적어두면, 고시가 바뀌었을 때 일부만 갱신되고 나머지는 과거 값으로 남는 일이 반드시 생기기 때문입니다.
        </p>
        <p>
          배포 전에는 <strong>자동 점검</strong>을 돌려 최저시급, 4대보험 요율, 국민연금 상·하한액,
          실업급여 상·하한액, 증권거래세 같은 핵심 수치가 사이트 전체에서 하나의 값으로만 등장하는지 확인합니다.
          서로 다른 값이 발견되면 배포 전에 잡습니다.
        </p>
        <p>
          그래도 놓치는 것이 있습니다. 위 이력에 &lsquo;정정&rsquo;으로 기록된 건들이 그 결과입니다.
          숫자가 이상하다고 느끼시면 <SeoLink href="/contact">문의하기</SeoLink>로 알려주세요.
          확인해서 고치고, 고친 내용을 이 페이지에 남기겠습니다.
        </p>
      </SeoSection>

      <SeoSection title="관련 계산기와 가이드">
        <p>
          위 기준값이 실제 금액으로 어떻게 나오는지 보려면{' '}
          <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>와{' '}
          <SeoLink href="/salary/insurance">4대보험 계산기</SeoLink>를 이용해 보세요.
          제도 자체를 더 알고 싶다면{' '}
          <SeoLink href="/guide/4-insurance">4대보험 완전 정리</SeoLink>,{' '}
          <SeoLink href="/guide/minimum-wage">2026 최저시급 완전 정리</SeoLink>,{' '}
          <SeoLink href="/guide/investment-tax">주식·투자 세금 총정리</SeoLink>가 도움이 됩니다.
          전체 목록은 <SeoLink href="/guide">가이드</SeoLink>에서 볼 수 있습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
