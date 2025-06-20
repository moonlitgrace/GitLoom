import { Type, Workflow } from 'lucide-react';
import { Field } from './_types/field';

export const FIELD: Field = {
  text: {
    label: 'Text Input',
    Icon: Type,
  },
  slug: {
    label: 'Auto Populate',
    Icon: Workflow,
  },
} as const;
