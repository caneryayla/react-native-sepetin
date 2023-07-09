import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "../../../constants/ROUTES";
import HomeScreen from "../../../screens/home";
import { NAVIGATION_OPTIONS } from "../../options";

const HomeNavigations = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={NAVIGATION_OPTIONS.screenOptions}>
      <Stack.Screen name={ROUTES.homeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigations;
