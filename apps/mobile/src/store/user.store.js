import { create } from "zustand";
import userService from "../services/user.service";

export const useUser = create((set, get) => ({
  userData: null,
  isLoading: false,
  loadStorageData: async () => {
    set({ isLoading: true });
    try {
      const result = await userService.getUser();
      set({ userData: result });
    } catch (error) {
      // Trate o erro conforme necessário
    } finally {
      set({ isLoading: false });
    }
  },
}));
