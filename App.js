import { Provider } from "react-redux";
import { store } from "./src/redux";
import MainNavigation from "./src/navigation";
import axios from "axios";
import { LogBox } from "react-native";
import NotificationWrapper from "./src/wrapper/NotificationWrapper";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { toastConfig } from "./src/config/toast";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "react-native-ui-lib";
import { COLORS } from "./src/constants/COLORS";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

LogBox.ignoreLogs(["Animated:"]);
LogBox.ignoreLogs(["Warning:"]);
LogBox.ignoreLogs(["DatePickerIOS"]);

export default function App() {
  axios.defaults.baseURL = __DEV__
    ? "https://sepetinbackend.caneryayla.com"
    : "https://sepetinbackend.caneryayla.com";

  Colors.loadDesignTokens({
    primaryColor: COLORS.light.primaryColor,
  });
  //AsyncStorage.removeItem("userToken");
  useEffect(() => {
    const TokenControl = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + userToken;
    };

    TokenControl();
  }, []);

  return (
    <Provider store={store}>
      <NotificationWrapper>
        <ActionSheetProvider>
          <SafeAreaProvider>
            <MainNavigation />
            <Toast config={toastConfig} />
          </SafeAreaProvider>
        </ActionSheetProvider>
      </NotificationWrapper>
    </Provider>
  );
}
