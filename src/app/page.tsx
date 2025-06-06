import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-5 flex items-center gap-5">
      <h1 className="text-2xl font-black">Gitloom</h1>
      <Button size={"sm"}>Log in</Button>
    </div>
  );
}
