import { Metadata } from 'next';
import ClientPage from './client-page';

export const metadata: Metadata = {
  title: 'New: GitLoom',
};

export default function Page() {
  return (
    <div className="grid h-full grid-cols-4 divide-x">
      <ClientPage />
    </div>
  );
}
