import { createContext } from 'react';
import { ActiveField } from '../_types';

export interface ActiveFieldContextValue {
  activeFields: ActiveField[];
  setActiveFields: React.Dispatch<React.SetStateAction<ActiveField[]>>;
}

export const ActiveFieldContext = createContext<ActiveFieldContextValue | null>(null);
