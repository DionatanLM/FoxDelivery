import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../store/auth.store";
import { ActivityIndicator } from "react-native-paper";
import { THEME } from "../theme";

export function Routes() {
  const { authData, isLoading } = useAuth();

  return (
    <NavigationContainer>
      {isLoading ? (
        <ActivityIndicator animating={true} color={THEME.COLORS.PRIMARY} />
      ) : authData ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  );
}
