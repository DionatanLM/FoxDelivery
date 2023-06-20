import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCallbackUrl = create(
  persist(
    (set, get) => ({
      callbackUrl: undefined,
      setCallbackUrl: url => set({ callbackUrl: url }),
    }),
    {
      name: 'callbackUrl',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
