import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "../screens/Tabs";
import ProfilePage from "../screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import OrderPage from "../screens/Order";
const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Tabs">
      <Screen name="Home" component={Home} />
      <Screen name="Perfil" component={ProfilePage} />
      <Screen name="Order" component={OrderPage} />
    </Navigator>
  );
};

export default AppRoutes;
