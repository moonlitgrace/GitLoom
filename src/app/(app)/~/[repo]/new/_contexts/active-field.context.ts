import { createContext, useContext } from 'react';
import { ActiveField } from '../_types';

export interface ActiveFieldContextValue {
  activeFields: ActiveField[];
  setActiveFields: React.Dispatch<React.SetStateAction<ActiveField[]>>;
}

export const ActiveFieldContext = createContext<ActiveFieldContextValue | null>(null);
export function useActiveField(): ActiveFieldContextValue {
  const context = useContext(ActiveFieldContext);
  if (!context) throw new Error('useField must be used within FieldProvider');

  return context;
}
