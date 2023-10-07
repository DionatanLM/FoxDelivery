import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../screens/Profile";
import Home from "../screens/Home";
import OrderPage from "../screens/Order";
const { Navigator, Screen } = createNativeStackNavigator();
import * as Location from "expo-location";

const AppRoutes = () => {
  useEffect(() => {
    const sendLocationInterval = setInterval(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permissão para acessar a localização foi negada.");
        return;
      }
    }, 30000);

    return () => {
      clearInterval(sendLocationInterval);
    };
  }, []);
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Tabs">
      <Screen name="HomePage" component={Home} />
      <Screen name="Perfil" component={ProfilePage} />
      <Screen name="Order" component={OrderPage} />
    </Navigator>
  );
};

export default AppRoutes;
