import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { ROUTES } from "../../../constants/ROUTES";
import ShopBagScreenLogin from "../../../screens/shopBag/shop-bag-screen-login";
import ShopBagScreenNoLogin from "../../../screens/shopBag/shop-bag-screen-no-login";
import { NAVIGATION_OPTIONS } from "../../options";

const ShopBagNavigations = () => {
  const Stack = createNativeStackNavigator();
  const user = useSelector((x) => x.user.getUserInfoResult)?.id;

  return (
    <Stack.Navigator screenOptions={NAVIGATION_OPTIONS.screenOptions}>
      {user ? (
        <Stack.Screen
          name={ROUTES.shopBagScreenLogin}
          component={ShopBagScreenLogin}
        />
      ) : (
        <Stack.Screen
          name={ROUTES.shopBagScreenNoLogin}
          component={ShopBagScreenNoLogin}
        />
      )}
    </Stack.Navigator>
  );
};

export default ShopBagNavigations;
