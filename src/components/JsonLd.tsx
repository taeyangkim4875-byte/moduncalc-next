export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '모든 계산기',
    url: 'https://moduncalc.com',
    description: '연봉, 적금, 대출, 건강, 세금 무료 계산기 모음. 2026년 최신 정책 반영.',
    publisher: {
      '@type': 'Organization',
      name: '모든 계산기',
      url: 'https://moduncalc.com',
      founder: {
        '@type': 'Person',
        name: '김태양',
      },
    },
    inLanguage: 'ko',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://moduncalc.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://moduncalc.com${item.href}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function CalculatorJsonLd({ name, description, url }: { name: string; description: string; url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    author: { '@type': 'Person', name: '김태양', url: 'https://moduncalc.com/about' },
    publisher: { '@type': 'Organization', name: '모든 계산기', url: 'https://moduncalc.com' },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '모든 계산기',
    url: 'https://moduncalc.com',
    logo: 'https://moduncalc.com/icons/icon.svg',
    description: '2026년 최신 세법·요율을 반영한 무료 계산기 82종을 제공하는 웹 서비스',
    founder: { '@type': 'Person', name: '김태양', url: 'https://moduncalc.com/about' },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'taeyang.kim4875@gmail.com',
      contactType: 'customer service',
      availableLanguage: 'Korean',
    },
    sameAs: [],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '김태양',
    url: 'https://moduncalc.com/about',
    jobTitle: '웹 개발자 · 모든 계산기 운영자',
    worksFor: { '@type': 'Organization', name: '모든 계산기', url: 'https://moduncalc.com' },
    knowsAbout: ['한국 세법', '4대보험', '금융 계산', '부동산 세금', '웹 개발'],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
