interface Props {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className: string }>;
  onClick: (id: string) => void;
}

export default function FieldItem({ id, label, Icon, onClick }: Props) {
  return (
    <button
      className="bg-secondary/50 hover:bg-secondary flex touch-none items-center gap-2 rounded-md p-2 transition-colors select-none"
      onClick={() => onClick(id)}
    >
      <Icon className="text-muted-foreground size-5" />
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
    </button>
  );
}
