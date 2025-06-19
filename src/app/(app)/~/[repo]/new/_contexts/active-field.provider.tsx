import { nanoid } from 'nanoid';
import { useState } from 'react';
import { ActiveField } from '../_types';
import { ActiveFieldContext, ActiveFieldContextValue } from './active-field.context';

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
