import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../Home";
import DeliveryPage from "../Delivery";
import HelpPage from "../Help";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#ffc99d",
        tabBarStyle: {
          backgroundColor: "#F58328",
          paddingTop: 8,
          height: 86,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Entregas"
        component={DeliveryPage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="racing-helmet"
              color={color}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ajuda"
        component={HelpPage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="help-circle-outline"
              color={color}
              size={35}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
