import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../screens/Profile";
import Home from "../screens/Home";
import OrderPage from "../screens/Order";
const { Navigator, Screen } = createNativeStackNavigator();
import * as Location from "expo-location";
import { useUser } from "../store/user.store";

const AppRoutes = () => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const { loadStorageData } = useUser();

  useEffect(() => {
    loadStorageData();
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
    };

    requestLocationPermission();
  }, []);

  if (permissionStatus === null) {
    return null;
  }

  if (permissionStatus !== "granted") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Para usar o aplicativo, precisamos acessar sua localização.</Text>
        <Button title="Permitir" onPress={() => requestLocationPermission()} />
      </View>
    );
  }

  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Tabs">
      <Screen name="HomePage" component={Home} />
      <Screen name="Perfil" component={ProfilePage} />
      <Screen name="Order" component={OrderPage} />
    </Navigator>
  );
};

export default AppRoutes;
