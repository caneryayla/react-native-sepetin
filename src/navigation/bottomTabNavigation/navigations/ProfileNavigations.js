import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { ROUTES } from "../../../constants/ROUTES";
import ProfileScreenLogin from "../../../screens/profile-screens/profile-screens-login";
import ProfileScreenNoLogin from "../../../screens/profile-screens/profile-screens-no-login";
import { NAVIGATION_OPTIONS } from "../../options";

const ProfileNavigations = () => {
  const Stack = createNativeStackNavigator();
  const user = useSelector((x) => x.user.getUserInfoResult)?.id;

  return (
    <Stack.Navigator screenOptions={NAVIGATION_OPTIONS.screenOptions}>
      {user ? (
        <Stack.Screen
          name={ROUTES.profileScreenLogin}
          component={ProfileScreenLogin}
        />
      ) : (
        <Stack.Screen
          name={ROUTES.profileScreenNoLogin}
          component={ProfileScreenNoLogin}
        />
      )}
    </Stack.Navigator>
  );
};

export default ProfileNavigations;
