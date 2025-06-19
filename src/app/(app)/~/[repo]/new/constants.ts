import { TextCursorInput, Type } from 'lucide-react';
import { Field } from './_types/field';

export const FIELD: Field = {
  text: {
    label: 'Text Input',
    Icon: Type,
  },
  slug: {
    label: 'Slug',
    Icon: TextCursorInput,
  },
} as const;
