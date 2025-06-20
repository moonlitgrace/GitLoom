import { createContext, useContext } from 'react';
import { ActiveField } from '../_types/field';

export interface ActiveFieldContextValue {
  activeFields: ActiveField[];
  setActiveFields: React.Dispatch<React.SetStateAction<ActiveField[]>>;
  deleteField: (id: string) => void;
  addField: (props: Omit<ActiveField, 'id'>) => void;
  changeField: (id: string, type: 'key' | 'value', value: string) => void;
  resetField: (id: string) => void;
}

export const ActiveFieldContext = createContext<ActiveFieldContextValue | null>(null);

export function useActiveField(): ActiveFieldContextValue {
  const context = useContext(ActiveFieldContext);
  if (!context) throw new Error('useField must be used within FieldProvider');

  return context;
}
