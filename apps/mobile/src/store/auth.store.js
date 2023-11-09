import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";
import authService from "../services/auth.service";

export const useAuth = create((set) => ({
  authData: null,
  isLoading: true,
  signIn: async (data) => {
    try {
      const authData = await authService.login(data);
      set({ authData });
      await AsyncStorage.setItem("@AuthData", JSON.stringify(authData));
    } catch (error) {
      Alert.alert(error.message, "Tente novamente");
    }
  },
  signOut: async () => {
    set({ authData: null });
    await AsyncStorage.removeItem("@AuthData");
  },
  loadStorageData: async () => {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);
        set({ authData: _authData });
      }
    } catch (error) {
      // Trate o erro conforme necessário
    } finally {
      set({ isLoading: false });
    }
  },
}));
