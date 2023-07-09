/* eslint-disable import/order */
import React, { useEffect, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { deviceTypeNumber } from "../constants/STATICDATA.js";
import { useDispatch } from "react-redux";
import { postMobileAppService } from "../redux/reducers/services.js";

const NotificationWrapper = ({ children }) => {
  const [fetchToken, setFetchToken] = useState("");
  const dispatch = useDispatch();

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setFetchToken(token);

      const appData = {
        deviceToken: token,
        deviceType: deviceTypeNumber[Platform.OS],
        deviceBrand: Device.brand,
        devicePlatform: Platform.OS,
        deviceModelName: Device.modelName,
      };

      dispatch(postMobileAppService(appData));
    } else {
      //("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    console.log(fetchToken);
  }, [fetchToken]);

  return children;
  // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //   <TextInput
  //     style={{ borderWidth: 1, height: 50, width: "100%" }}
  //     value={fetchToken}
  //   />
  // </View>
};

export default NotificationWrapper;
