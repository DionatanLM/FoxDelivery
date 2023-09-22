import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../store/auth.store";
import { View, Text } from "react-native";

export function Routes() {
  const { authData, isLoading } = useAuth();
  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Carregando informações....</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      {authData ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
