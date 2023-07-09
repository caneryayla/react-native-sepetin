import { Formik } from "formik";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MainButton from "../../components/buttons/MainButton";

import InputText from "../../components/inputs/InputText";
import { SPACING } from "../../constants/SPACING";
import { SignupValidationSchema } from "../../constants/VALIDATIONS";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../../constants/COLORS";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, setUserInfoResult } from "../../redux/reducers/user";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatedImage } from "react-native-ui-lib";
import axios from "axios";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const postLoginLoading = useSelector((x) => x.user.postLoginLoading);
  const route = useRoute();

  const loginRequest = (values) => {
    dispatch(
      postLogin({
        email: values.email,
        password: values.password,
        deviceToken: "",
      })
    ).then(({ payload: data }) => {
      if (data?.isSuccess) {
        AsyncStorage.setItem("userId", data?.user?.id.toString());
        AsyncStorage.setItem("userToken", data?.token.toString());
        // dispatch(getUserInfo());
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + data?.token;

        dispatch(setUserInfoResult(data?.user));
        navigation.navigate(ROUTES.bottomScreen);
        Toast.show({
          type: "success",
          text1: data?.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: data?.message,
        });
      }
    });
  };

  const navigation = useNavigation();

  const registerButton = () => {
    navigation.navigate(ROUTES.registerScreen);
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <AnimatedImage
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
        <Formik
          initialValues={{
            email: __DEV__
              ? "Test@hotmail.com"
              : route.params?.email
              ? route.params?.email
              : "",
            password: __DEV__ ? "12345678" : "",
          }}
          onSubmit={(values) => loginRequest(values)}
          validationSchema={SignupValidationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{ width: "100%" }}>
              <InputText
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder={"E-Mail"}
                error={errors.email && touched.email}
                errorText={errors.email}
                type="email"
              />
              <InputText
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder={"Password"}
                error={errors.password && touched.password}
                errorText={errors.password}
                type="password"
              />
              <MainButton
                isLoading={postLoginLoading}
                onPress={() => handleSubmit()}
                title="Giriş Yap"
              />
              <View style={styles.registerTextContainer}>
                <Text style={styles.registerText}>Üye değil misin ?</Text>
                <TouchableOpacity
                  onPress={registerButton}
                  style={styles.registerButton}
                >
                  <Text style={styles.registerMainText}> Kayıt Ol</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp("100%"),
    justifyContent: "center",
    padding: SPACING.mainHomeSpacing,
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    marginBottom: 30,
  },
  registerTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  registerText: {
    textAlign: "center",
    fontSize: wp("3.6%"),
  },
  registerButton: { marginLeft: 5 },
  registerMainText: {
    color: COLORS.light.primaryColor,
    fontWeight: "600",
  },
});

export default LoginScreen;
