import GitloomIcon from "@/components/icons/gitloom";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="flex justify-between items-center gap-2 py-3 px-5 border-b">
      <nav className="flex items-center gap-2">
        <Link href={'/dashboard'} className="flex items-center gap-2">
          <GitloomIcon className="size-5" />
          <h1 className="text-lg font-black">Gitloom</h1>
        </Link>
      </nav>
      <nav className="flex items-center gap-2">
        <Button>New Post</Button>
      </nav>
    </header>
  );
}
