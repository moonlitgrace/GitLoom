import { ComponentsId } from '../_lib/types';

interface Props {
  id: ComponentsId;
  label: string;
  Icon: React.ComponentType<{ className: string }>;
  addField: (id: ComponentsId) => void;
}

export default function FieldItem({ id, label, Icon, addField }: Props) {
  return (
    <button
      className="hover:bg-secondary/50 flex touch-none items-center gap-2 rounded-md p-2 transition-colors select-none"
      onClick={() => addField(id)}
    >
      <Icon className="text-muted-foreground size-5" />
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
    </button>
  );
}
