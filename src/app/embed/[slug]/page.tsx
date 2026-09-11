import type { Metadata } from 'next';
import EmbedClient from './EmbedClient';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EmbedClient slug={slug} />;
}
