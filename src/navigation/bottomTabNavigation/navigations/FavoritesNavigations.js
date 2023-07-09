import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { ROUTES } from "../../../constants/ROUTES";
import FavoritesScreenLogin from "../../../screens/favorites-screens/favorites-screen-login";
import FavoritesScreenNoLogin from "../../../screens/favorites-screens/favorites-screen-no-login";
import { NAVIGATION_OPTIONS } from "../../options";

const FavoritesNavigations = () => {
  const Stack = createNativeStackNavigator();
  const user = useSelector((x) => x.user.getUserInfoResult)?.id;

  return (
    <Stack.Navigator screenOptions={NAVIGATION_OPTIONS.screenOptions}>
      {user ? (
        <Stack.Screen
          name={ROUTES.favoritesScreenLogin}
          component={FavoritesScreenLogin}
        />
      ) : (
        <Stack.Screen
          name={ROUTES.favoritesScreenNoLogin}
          component={FavoritesScreenNoLogin}
        />
      )}
    </Stack.Navigator>
  );
};

export default FavoritesNavigations;
