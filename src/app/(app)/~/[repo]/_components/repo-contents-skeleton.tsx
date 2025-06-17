import { Skeleton } from '@/components/ui/skeleton';

export default function RepoContentsSkeleton() {
  return Array.from({ length: 1 }).map((_, idx) => (
    <div key={idx} className="grid grid-cols-5 gap-2 p-3">
      <Skeleton className="col-span-2 h-5 w-20" />
      <Skeleton className="col-span-2 h-5 w-3/4" />
      <Skeleton className="col-span-1 ml-auto h-5 w-15" />
    </div>
  ));
}
