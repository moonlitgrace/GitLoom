import { NavigationOff } from 'lucide-react';

export default function RecentActions() {
  return (
    <div className="col-span-1">
      <h5 className="text-muted-foreground text-sm font-medium">Recent Actions</h5>
      <div className="flex flex-col items-center justify-center gap-4 py-10">
        <NavigationOff className="text-muted-foreground size-10 stroke-1" />
        <div className="flex flex-col items-center">
          <span className="text-sm">No recent actions!</span>
          <span className="text-muted-foreground text-sm">Do something to show it here.</span>
        </div>
      </div>
    </div>
  );
}
