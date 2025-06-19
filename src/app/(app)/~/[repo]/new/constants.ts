import { TextCursorInput, Type } from 'lucide-react';
import { Components } from './types';

export const components: Components = {
  text: {
    label: 'Text Input',
    Icon: Type,
  },
  slug: {
    label: 'Slug',
    Icon: TextCursorInput,
  },
} as const;
