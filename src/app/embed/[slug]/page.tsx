import EmbedClient from './EmbedClient';

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EmbedClient slug={slug} />;
}
