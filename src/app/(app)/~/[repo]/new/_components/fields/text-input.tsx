import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GripVertical, RotateCcw, Trash, Type } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { useActiveField } from '../../_contexts/active-field.context';

interface Props {
  id: string;
  gripProps: HTMLAttributes<HTMLButtonElement>;
}

export default function TextInput({ id, gripProps }: Props) {
  const { activeFields } = useActiveField();
  const field = activeFields.find((field) => field.id === id);

  if (!field) return null;

  return (
    <div className="bg-secondary/25 flex items-center gap-2 rounded-lg p-2">
      <Type className="text-muted-foreground size-4 shrink-0" />
      <Input placeholder="key" className="focus:border-border! border-border/25 w-50 shrink-0" />
      <span className="text-muted-foreground text-sm select-none">:</span>
      <Input placeholder="value" className="focus:border-border! border-border/25" />
      <div className="flex items-center gap-1">
        <Button size={'icon'} variant={'ghost'}>
          <RotateCcw className="text-muted-foreground size-4 shrink-0" />
        </Button>
        <Button size={'icon'} variant={'ghost'}>
          <Trash className="text-destructive size-4 shrink-0" />
        </Button>
        <button {...gripProps}>
          <GripVertical className="text-muted-foreground size-5 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
}
