import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GripVertical, RotateCcw, Trash, Type } from 'lucide-react';

export default function TextInput() {
  return (
    <div className="bg-secondary/25 flex items-center gap-2 rounded-lg p-2">
      <Type className="text-muted-foreground size-4 shrink-0" />
      <Input
        placeholder="key"
        className="w-50 shrink-0 border-transparent bg-transparent focus:border"
      />
      <span className="text-muted-foreground text-sm select-none">:</span>
      <Input placeholder="value" className="border-transparent bg-transparent focus:border" />
      <div className="flex items-center gap-1">
        <Button size={'icon'} variant={'ghost'}>
          <RotateCcw className="text-muted-foreground size-4 shrink-0" />
        </Button>
        <Button size={'icon'} variant={'ghost'}>
          <Trash className="text-destructive size-4 shrink-0" />
        </Button>
        <button className="cursor-grab">
          <GripVertical className="text-muted-foreground size-5 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
}
