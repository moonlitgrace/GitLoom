import { create } from 'zustand';

interface ValidationStore {
  isValid: boolean;
  setIsValid: (val: boolean) => void;
}

export const useValidationStore = create<ValidationStore>((set) => ({
  isValid: false,
  setIsValid: (val) => set({ isValid: val }),
}));
