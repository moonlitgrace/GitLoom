import { nanoid } from 'nanoid';
import { createContext, useContext, useState } from 'react';
import { ActiveField } from '../_types';

// ===== context =====
interface ActiveFieldContextValue {
  activeFields: ActiveField[];
  setActiveFields: React.Dispatch<React.SetStateAction<ActiveField[]>>;
}

export const ActiveFieldContext = createContext<ActiveFieldContextValue | null>(null);

interface ActiveFieldProviderProps {
  children: React.ReactNode;
}

// ===== provider =====
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

// ===== hook =====
export function useActiveField(): ActiveFieldContextValue {
  const context = useContext(ActiveFieldContext);
  if (!context) throw new Error('useField must be used within FieldProvider');

  return context;
}
