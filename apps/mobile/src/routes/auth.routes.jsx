import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
