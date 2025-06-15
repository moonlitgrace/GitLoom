import { Config } from '@/types/config';
import { create } from 'zustand';

// states
interface States {
  isValid: boolean;
  config: Config | null;
}

// actions
interface Actions {
  setIsValid: (val: boolean) => void;
  setConfig: (config: Config) => void;
}

export const useRepoStore = create<States & Actions>((set) => ({
  // states
  isValid: false,
  config: null,
  // actions
  setIsValid: (val) => set({ isValid: val }),
  setConfig: (config) => set({ config }),
}));
