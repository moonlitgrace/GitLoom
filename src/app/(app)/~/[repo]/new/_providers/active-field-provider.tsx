import { nanoid } from 'nanoid';
import { useState } from 'react';
import {
  ActiveFieldContext,
  type ActiveFieldContextValue,
} from '../_contexts/active-field-context';
import { ActiveField } from '../_types';

interface FieldProviderProps {
  children: React.ReactNode;
}

export function FieldProvider({ children }: FieldProviderProps) {
  const [activeFields, setActiveFields] = useState<ActiveField[]>([
    { id: `text-${nanoid()}`, componentId: 'text', key: '', value: '' },
  ]);

  const contextValue: ActiveFieldContextValue = {
    activeFields,
    setActiveFields,
  };

  return <ActiveFieldContext.Provider value={contextValue}>{children}</ActiveFieldContext.Provider>;
}
