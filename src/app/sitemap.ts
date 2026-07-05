import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://moduncalc.com';

  const pages = [
    { path: '/', priority: 1.0 },
    { path: '/savings/doyak', priority: 0.9 },
    { path: '/savings/mirae', priority: 0.9 },
    { path: '/calc', priority: 0.9 },
    { path: '/salary', priority: 0.9 },
    { path: '/salary/table', priority: 0.9 },
    { path: '/salary/minimum', priority: 0.9 },
    { path: '/salary/severance', priority: 0.9 },
    { path: '/pension/jobless', priority: 0.9 },
    { path: '/pension/nps', priority: 0.9 },
    { path: '/loan', priority: 0.9 },
    { path: '/loan/car', priority: 0.9 },
    { path: '/health/bmi', priority: 0.8 },
    { path: '/health/bmr', priority: 0.8 },
    { path: '/daily/percent', priority: 0.8 },
    { path: '/daily/discount', priority: 0.8 },
    { path: '/daily/dutch', priority: 0.8 },
    { path: '/daily/dday', priority: 0.8 },
    { path: '/daily/age', priority: 0.8 },
    { path: '/daily/unit', priority: 0.8 },
    { path: '/daily/speed', priority: 0.8 },
    { path: '/daily/fuel', priority: 0.8 },
    { path: '/daily/gpa', priority: 0.8 },
    { path: '/realestate/acqtax', priority: 0.8 },
    { path: '/realestate/convert', priority: 0.8 },
    { path: '/realestate/commission', priority: 0.8 },
    { path: '/realestate/transfer', priority: 0.8 },
    { path: '/tax/vat', priority: 0.8 },
    { path: '/tax/income', priority: 0.8 },
    { path: '/handwriting', priority: 0.7 },
    { path: '/about', priority: 0.5 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }));
}
