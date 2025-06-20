import { Type, Workflow } from 'lucide-react';
import { Field } from './_types/field';

export const FIELD: Field = {
  text: {
    label: 'Text Input',
    Icon: Type,
  },
  auto_populate: {
    label: 'Auto Populate',
    Icon: Workflow,
  },
} as const;
