export type ComponentsId = 'text' | 'slug';
export type Components = Record<
  ComponentsId,
  {
    label: string;
    Icon: React.ComponentType<{ className: string }>;
  }
>;

export interface ActiveField {
  id: string;
  componentId: ComponentsId;
  key: string;
  value: string;
}
