import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/auth.service";
import { Alert } from "react-native";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  const signIn = async (data) => {
    try {
      const authData = await authService.login(data);

      setAuthData(authData);
      await AsyncStorage.setItem("@AuthData", JSON.stringify(authData.token));
    } catch (error) {
      Alert.alert(error.message, "Tente novamente");
    }
  };

  // Função para fazer logout
  const signOut = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem("@AuthData");
  };

  return (
    <AuthContext.Provider value={{ authData, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
