import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HTMLAttributes } from 'react';

interface Props {
  id: string;
  children: (props: { gripProps: HTMLAttributes<HTMLButtonElement> }) => React.ReactNode;
}

export default function Sortable({ id, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    // suppressing "...attributes" warning
    <div
      ref={setNodeRef}
      style={style}
      className="bg-background rounded-lg"
      {...attributes}
      suppressHydrationWarning
    >
      {children({
        gripProps: {
          ...listeners,
          className: `text-muted-foreground size-5 stroke-[1.5] ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`,
        },
      })}
    </div>
  );
}
