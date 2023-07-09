import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesNavigations from "./navigations/FavoritesNavigations";
import HomeNavigations from "./navigations/HomeNavigations";
import ProfileNavigations from "./navigations/ProfileNavigations";
import ShopBagNavigations from "./navigations/ShopBagNavigations";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/COLORS";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const activeColor = COLORS.light.primaryColor;
  const deactiveColor = "gray";

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarLabel: "Anasayfa",
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: deactiveColor,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"home"}
              color={focused ? activeColor : deactiveColor}
              size={26}
            />
          ),
        }}
        name="Home"
        component={HomeNavigations}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Favorilerim",
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: deactiveColor,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="heart"
              color={focused ? activeColor : deactiveColor}
              size={26}
            />
          ),
        }}
        name="Favorites"
        component={FavoritesNavigations}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Sepetim",
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: deactiveColor,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="basket"
              color={focused ? activeColor : deactiveColor}
              size={26}
            />
          ),
        }}
        name="ShopBag"
        component={ShopBagNavigations}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Profil",
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: deactiveColor,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              color={focused ? activeColor : deactiveColor}
              size={26}
            />
          ),
        }}
        name="Profile"
        component={ProfileNavigations}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
