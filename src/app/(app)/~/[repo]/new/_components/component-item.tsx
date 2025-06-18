import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface Props {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className: string }>;
}

export default function ComponentItem({ id, label, Icon }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-secondary/50 hover:bg-secondary flex touch-none items-center gap-2 rounded-md p-2 transition-colors select-none"
      {...attributes}
    >
      <Icon className="text-muted-foreground size-5" />
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <GripVertical className="text-muted-foreground ml-auto size-5 stroke-[1.5]" {...listeners} />
    </div>
  );
}
