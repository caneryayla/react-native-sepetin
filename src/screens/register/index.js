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
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../redux/reducers/user";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { AnimatedImage } from "react-native-ui-lib";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const postRegisterLoading = useSelector((x) => x.user.postRegisterLoading);

  const registerRequest = (values) => {
    dispatch(postRegister(values)).then(({ payload: data }) => {
      if (data.isSuccess) {
        navigation.navigate(ROUTES.registerVerificationScreen);
      } else {
        Toast.show({
          type: "error",
          text1: data.message,
        });
      }
    });
  };

  const loginButton = () => {
    navigation.navigate(ROUTES.loginScreen);
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
            email: "Test@hotmail.com",
            password: "12345678",
          }}
          onSubmit={(values) => registerRequest(values)}
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
                error={errors.email && touched.email}
                errorText={errors.email}
                placeholder={"E-Mail"}
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
                isLoading={postRegisterLoading}
                onPress={() => handleSubmit()}
                title="Üye Ol"
              />
              <View style={styles.registerTextContainer}>
                <Text style={styles.registerText}>Üye misin ?</Text>
                <TouchableOpacity
                  onPress={loginButton}
                  style={styles.registerButton}
                >
                  <Text style={styles.registerMainText}> Giriş Yap</Text>
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

export default RegisterScreen;
