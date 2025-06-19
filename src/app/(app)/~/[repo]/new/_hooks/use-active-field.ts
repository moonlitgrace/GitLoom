import { useContext } from 'react';
import { ActiveFieldContext, ActiveFieldContextValue } from '../_contexts/active-field-context';

export function useActiveField(): ActiveFieldContextValue {
  const context = useContext(ActiveFieldContext);
  if (!context) {
    throw new Error('useField must be used within FieldProvider');
  }

  return context;
}
