import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "../constants/ROUTES";
import { setSearcHistory } from "../redux/reducers/asyncStorage";
import AuthenticationScreen from "../screens/authentication-screen";
import LoginScreen from "../screens/login";
import ProductDetailScreen from "../screens/product-detail-screen";
import ProductSearchScreen from "../screens/product-search-screen/ProductSearchScreen";
import ProfileEditScreen from "../screens/profile-screens/profile-edit-screen";
import RegisterScreen from "../screens/register";
import RegisterVerificationScreen from "../screens/register/register-verification-screen";
import StoreDetailScreen from "../screens/store-detail-screen/StoreDetailScreen";
import ProfileOrdersScreen from "../screens/profile-screens/profile-orders-screen";
import BottomNavigation from "./bottomTabNavigation";
import { NAVIGATION_OPTIONS } from "./options";
import OrderDetailsScreen from "../screens/order-details-screen";
import ProfileFollowStoresScreen from "../screens/profile-screens/profile-follow-stores-screen";
import ProfileAddressInformation from "../screens/profile-screens/profile-address-information";
import ProfilePasswordChangeScreen from "../screens/profile-screens/profile-password-change-screen";
import ProfileEmailChangeScreen from "../screens/profile-screens/profile-email-change-screen";
import ProfileAddressCreateScreen from "../screens/profile-screens/profile-address-create-screen";
import ProfileAddressUpdateScreen from "../screens/profile-screens/profile-address-update-screen";
import ProfileEmailChangeVerificationScreen from "../screens/profile-screens/profile-email-change-verification-screen";
import BuyingScreen from "../screens/buying-screen";
import BuyingAfterScreen from "../screens/buying-screen/buying-after-screen";

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAsyncStorageValues = async () => {
      const searchHistory = await AsyncStorage.getItem("@search_history");
      if (!searchHistory) {
        await AsyncStorage.setItem("@search_history", "[]");
      } else {
        dispatch(setSearcHistory(JSON.parse(searchHistory)));
      }
    };

    getAsyncStorageValues();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NAVIGATION_OPTIONS.screenOptions}>
        <Stack.Screen
          name={ROUTES.authenticationScreen}
          component={AuthenticationScreen}
        />
        <Stack.Screen name={ROUTES.loginScreen} component={LoginScreen} />
        <Stack.Screen name={ROUTES.registerScreen} component={RegisterScreen} />
        <Stack.Screen
          name={ROUTES.registerVerificationScreen}
          component={RegisterVerificationScreen}
        />
        <Stack.Screen name={ROUTES.bottomScreen} component={BottomNavigation} />
        <Stack.Screen
          name={ROUTES.productDetailScreen}
          component={ProductDetailScreen}
        />
        <Stack.Screen
          name={ROUTES.productSearchScreen}
          component={ProductSearchScreen}
        />
        <Stack.Screen
          name={ROUTES.storeDetailScreen}
          component={StoreDetailScreen}
        />
        <Stack.Screen
          name={ROUTES.profileEditScreen}
          component={ProfileEditScreen}
        />
        <Stack.Screen
          name={ROUTES.profileOrdersScreen}
          component={ProfileOrdersScreen}
        />
        <Stack.Screen
          name={ROUTES.orderDetailsScreen}
          component={OrderDetailsScreen}
        />
        <Stack.Screen
          name={ROUTES.profilefollowStoresScreen}
          component={ProfileFollowStoresScreen}
        />
        <Stack.Screen
          name={ROUTES.profileAddressInformation}
          component={ProfileAddressInformation}
        />
        <Stack.Screen
          name={ROUTES.profileAddressCreateScreen}
          component={ProfileAddressCreateScreen}
        />
        <Stack.Screen
          name={ROUTES.profileAddressUpdateScreen}
          component={ProfileAddressUpdateScreen}
        />
        <Stack.Screen
          name={ROUTES.profilePasswordChangeScreen}
          component={ProfilePasswordChangeScreen}
        />
        <Stack.Screen
          name={ROUTES.profileEmailChangeScreen}
          component={ProfileEmailChangeScreen}
        />
        <Stack.Screen
          name={ROUTES.profileEmailChangeVerificationScreen}
          component={ProfileEmailChangeVerificationScreen}
        />
        <Stack.Screen name={ROUTES.buyingScreen} component={BuyingScreen} />
        <Stack.Screen
          name={ROUTES.buyingAfterScreen}
          component={BuyingAfterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
