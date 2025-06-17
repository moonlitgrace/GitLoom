import { Metadata } from 'next';
import ClientPage from './client-page';

interface Props {
  params: Promise<{ repo: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { repo } = await params;
  return { title: `${repo}: GitLoom` };
}

export default async function Page({ params }: Props) {
  const { repo } = await params;
  // render client-side page
  return <ClientPage repo={repo} />;
}
