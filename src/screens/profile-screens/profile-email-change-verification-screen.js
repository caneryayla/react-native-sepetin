import { Text, TextInput, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../constants/COLORS";
import Header from "../../components/header";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import MainButton from "../../components/buttons/MainButton";
import { LinearGradient } from "expo-linear-gradient";
import { userChangeEmailVerification } from "../../redux/reducers/user";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";

const ProfileEmailChangeVerificationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userChangeEmailResult = useSelector(
    (x) => x.user.userChangeEmailResult
  );

  const [code, setCode] = useState("");

  const emailVerification = (code) => {
    dispatch(
      userChangeEmailVerification({
        email: userChangeEmailResult?.email,
        newEmail: userChangeEmailResult?.newEmail,
        code: code,
      })
    ).then(({ payload: data }) => {
      if (data?.isSuccess) {
        navigation.navigate(ROUTES.profileScreenLogin);
      }
    });
  };

  return (
    <LinearGradient
      colors={[COLORS.light.primaryColor, "white", "white", "white"]}
      style={styles.frame}
    >
      <Header />
      <View style={styles.container}>
        <Text style={{ textAlign: "center", paddingHorizontal: 20 }}>
          <Text style={{ fontWeight: "bold" }}>
            {userChangeEmailResult?.email}
          </Text>
          {""} adresine gönderilen doğrulama kodunu giriniz.
        </Text>
        <View style={{ justifyContent: "flex-end" }}>
          <View
            style={{
              width: "100%",
              position: "absolute",
              height: "100%",
              alignItems: "center",
              paddingTop: 45,
              justifyContent: "space-around",
              flexDirection: "row",
              paddingHorizontal: 30,
            }}
          >
            <Ionicons
              size={50}
              color={code.length > 0 ? COLORS.light.primaryColor : "gray"}
              name="remove-outline"
            />
            <Ionicons
              size={50}
              color={code.length > 1 ? COLORS.light.primaryColor : "gray"}
              name="remove-outline"
            />
            <Ionicons
              size={50}
              color={code.length > 2 ? COLORS.light.primaryColor : "gray"}
              name="remove-outline"
            />
            <Ionicons
              size={50}
              color={code.length > 3 ? COLORS.light.primaryColor : "gray"}
              name="remove-outline"
            />
            <Ionicons
              size={50}
              color={code.length > 4 ? COLORS.light.primaryColor : "gray"}
              name="remove-outline"
            />
          </View>
          <TextInput
            maxLength={5}
            keyboardType="number-pad"
            style={styles.textInput}
            cursorColor={COLORS.light.primaryColor}
            selectionColor={COLORS.light.primaryColor}
            onChangeText={(val) => {
              setCode(val);
              if (val.length == 5) {
                emailVerification(val);
              }
            }}
            value={code}
          />
        </View>
        <MainButton
          isLoading={false}
          onPress={() => emailVerification(code)}
          title="Doğrula"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    paddingHorizontal: 25,
    height: "100%",
    justifyContent: "center",
  },
  textInput: {
    width: "100%",
    height: wp("18%"),
    color: "black",
    fontSize: wp("7%"),
    fontWeight: "200",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.light.grayBorderColor,
    marginVertical: 40,
    letterSpacing: wp("11%"),
    paddingLeft: wp("12%"),
  },
});

export default ProfileEmailChangeVerificationScreen;
