export interface ActiveField {
  id: string;
  componentId: string;
}

export type ComponentsId = 'text' | 'slug';
export type Components = Record<
  ComponentsId,
  {
    label: string;
    Icon: React.ComponentType<{ className: string }>;
  }
>;
