import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash } from 'lucide-react';

interface Props {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className: string }>;
  onDelete: (id: string) => void;
}

export default function ActiveFieldItem({ id, label, Icon, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-secondary/50 group hover:bg-secondary flex touch-none items-center gap-2 rounded-md p-2 transition-colors select-none"
      {...attributes}
    >
      <Icon className="text-muted-foreground size-5" />
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <Trash
        className="text-destructive ml-auto size-4.5 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => onDelete(id)}
      />
      <GripVertical
        className={cn(
          'text-muted-foreground size-5 stroke-[1.5]',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        {...listeners}
      />
    </div>
  );
}
