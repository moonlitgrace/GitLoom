import { nanoid } from 'nanoid';
import { useState } from 'react';
import { ActiveFieldContext, ActiveFieldContextValue } from '../_contexts/active-field.context';
import { ActiveField } from '../types';

interface ActiveFieldProviderProps {
  children: React.ReactNode;
}

export function ActiveFieldProvider({ children }: ActiveFieldProviderProps) {
  const [activeFields, setActiveFields] = useState<ActiveField[]>([
    { id: `text-${nanoid()}`, componentId: 'text', key: '', value: '' },
  ]);

  const contextValue: ActiveFieldContextValue = {
    activeFields,
    setActiveFields,
  };

  return <ActiveFieldContext.Provider value={contextValue}>{children}</ActiveFieldContext.Provider>;
}
