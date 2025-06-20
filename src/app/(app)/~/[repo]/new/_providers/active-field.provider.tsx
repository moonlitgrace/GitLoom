import { nanoid } from 'nanoid';
import { useState } from 'react';
import { ActiveFieldContext, ActiveFieldContextValue } from '../_contexts/active-field.context';
import { ActiveField } from '../_types/field';

interface ActiveFieldProviderProps {
  children: React.ReactNode;
}

export function ActiveFieldProvider({ children }: ActiveFieldProviderProps) {
  const [activeFields, setActiveFields] = useState<ActiveField[]>([
    { id: `text-${nanoid()}`, fieldId: 'text' },
  ]);

  function deleteField(id: string) {
    setActiveFields((prev) => prev.filter((f) => f.id !== id));
  }

  function addField({ fieldId, key, value }: Omit<ActiveField, 'id'>) {
    setActiveFields((prev) => [
      ...prev,
      { id: `${fieldId}-${nanoid()}`, fieldId: fieldId, key, value },
    ]);
  }

  function changeField(id: string, type: 'key' | 'value', value: string) {
    setActiveFields((prev) => prev.map((f) => (f.id === id ? { ...f, [type]: value } : f)));
  }

  function resetField(id: string) {
    setActiveFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, key: undefined, value: undefined } : f)),
    );
  }

  const contextValue: ActiveFieldContextValue = {
    activeFields,
    setActiveFields,
    deleteField,
    addField,
    changeField,
    resetField,
  };

  return <ActiveFieldContext.Provider value={contextValue}>{children}</ActiveFieldContext.Provider>;
}
