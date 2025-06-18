import { TextCursorInput, Type } from 'lucide-react';

export type ComponentsId = 'text' | 'slug';
export type Components = Record<
  ComponentsId,
  {
    label: string;
    Icon: React.ComponentType<{ className: string }>;
  }
>;

export const components: Components = {
  text: {
    label: 'Text Input',
    Icon: Type,
  },
  slug: {
    label: 'Slug Input',
    Icon: TextCursorInput,
  },
} as const;
