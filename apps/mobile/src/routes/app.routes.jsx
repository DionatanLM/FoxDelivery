import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return <Navigator screenOptions={{ headerShown: false }}></Navigator>;
}
