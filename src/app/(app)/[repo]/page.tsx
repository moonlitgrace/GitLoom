import { generateMetadataTitleFor } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientPage from './client-page';

interface Props {
  params: Promise<{ repo: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { repo: rawRepo } = await params;
  const repo = decodeURIComponent(rawRepo);

  return {
    title: generateMetadataTitleFor(repo),
  };
}

export default async function Page({ params }: Props) {
  const { repo: rawRepo } = await params;
  const repo = decodeURIComponent(rawRepo);

  // check if it has prefix '@'
  // otherwise call notFount
  if (!repo.startsWith('@')) {
    notFound();
  }

  // render client-side page
  return <ClientPage repo={repo} />;
}
