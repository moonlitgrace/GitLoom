export type FieldId = 'text' | 'slug';
export type Field = Record<
  FieldId,
  {
    label: string;
    Icon: React.ComponentType<{ className: string }>;
  }
>;

export interface ActiveField {
  id: string;
  fieldId: FieldId;
  key?: string;
  value?: string;
}
