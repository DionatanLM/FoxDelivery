import { create } from 'zustand';
import brLang from '../lang/entries/pt_BR';

export const useLocale = create(set => ({
  language: brLang.lang,
  setLanguage: language => {
    set({ language });
  },
}));
