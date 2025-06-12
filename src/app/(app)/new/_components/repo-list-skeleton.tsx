import { Skeleton } from '@/components/ui/skeleton';

export function RepoListSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => {
        const minRem = 10;
        const maxRem = 15;
        const randomRem = minRem + ((idx * 2) % (maxRem - minRem + 1));

        return (
          <div key={idx} className="flex h-14 items-center gap-2 px-3">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-5" style={{ width: `${randomRem}rem` }} />
            <Skeleton className="ml-auto h-8 w-17" />
          </div>
        );
      })}
    </>
  );
}
