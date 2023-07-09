import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import TitleHeader from "../../components/header/titleHeader";
import TitleRow from "./components/TitleRow";
import { Formik } from "formik";
import { TextField } from "react-native-ui-lib";
import MainButton from "../../components/buttons/MainButton";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ProfileEmailChange } from "../../constants/VALIDATIONS";
import { userChangeEmail } from "../../redux/reducers/user";
import { ROUTES } from "../../constants/ROUTES";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProfileEmailChangeScreen = () => {
  const formik = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const changeEmail = (values) => {
    dispatch(userChangeEmail(values)).then(({ payload: data }) => {
      if (data?.isSuccess) {
        navigation.navigate(ROUTES.profileEmailChangeVerificationScreen);
      }
    });
  };

  return (
    <View>
      <TitleHeader title="E-Posta Değişikliği" />
      <Formik
        innerRef={formik}
        enableReinitialize
        initialValues={{
          email: "",
          newEmail: "",
          newEmailRe: "",
        }}
        onSubmit={(values) => changeEmail(values)}
        validationSchema={ProfileEmailChange}
      >
        {({ handleChange, values, errors, touched }) => (
          <View style={styles.container}>
            <TitleRow
              title="Mevcut E-Posta"
              error={errors.email && touched.email}
              input={
                <TextField
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder={"Mevcut E-posta"}
                  style={{ fontSize: hp("1.8") }}
                />
              }
            />

            <TitleRow
              title="Yeni E-Posta"
              error={errors.newEmail && touched.newEmail}
              input={
                <TextField
                  value={values.newEmail}
                  onChangeText={handleChange("newEmail")}
                  placeholder={"E-Postayı Girin"}
                  style={{ fontSize: hp("1.8") }}
                />
              }
            />
            <TitleRow
              title="Yeni E-Posta (Tekrar)"
              error={errors.newEmailRe && touched.newEmailRe}
              input={
                <TextField
                  value={values.newEmailRe}
                  onChangeText={handleChange("newEmailRe")}
                  placeholder="E-Postayı Girin"
                  style={{ fontSize: hp("1.8") }}
                />
              }
            />
            <View style={{ width: "90%", marginTop: 5 }}>
              <MainButton
                title="Güncelle"
                onPress={() => formik.current.handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    paddingTop: 18,
  },
});
export default ProfileEmailChangeScreen;
