import GitLoomIcon from '@/components/icons/gitloom';

export default function Home() {
  return (
    <div className="flex items-center gap-2 p-5">
      <GitLoomIcon className="size-6" />
      <h1 className="text-xl font-black">GitLoom</h1>
    </div>
  );
}
