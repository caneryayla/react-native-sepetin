import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../constants/ROUTES";
import { getUserInfo } from "../../redux/reducers/user";

const AuthenticationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const LoginControl = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      console.log(userToken);

      if (userToken) {
        navigation.navigate(ROUTES.bottomScreen);
        dispatch(getUserInfo());
      } else {
        navigation.navigate(ROUTES.bottomScreen);
      }
    };

    LoginControl();
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default AuthenticationScreen;
