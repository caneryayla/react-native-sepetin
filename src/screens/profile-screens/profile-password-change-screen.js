import TitleHeader from "../../components/header/titleHeader";
import { Formik } from "formik";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors, Text } from "react-native-ui-lib";
import { COLORS } from "../../constants/COLORS";
import MainButton from "../../components/buttons/MainButton";
import { Ionicons } from "@expo/vector-icons";
import { ProfilePasswordChange } from "../../constants/VALIDATIONS";
import { useDispatch, useSelector } from "react-redux";
import { userChangePassword } from "../../redux/reducers/user";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import InputText from "../../components/inputs/InputText";

const ProfilePasswordChangeScreen = () => {
  const formik = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userChangePasswordLoading = useSelector(
    (x) => x.user.userChangePasswordLoading
  );

  const changePassword = (values) => {
    dispatch(userChangePassword(values)).then(({ payload: data }) => {
      if (data?.isSuccess) {
        navigation.navigate(ROUTES.profileScreenLogin);
      }
    });
  };

  return (
    <View>
      <TitleHeader title="Şifre Değişikliği" />
      <View style={styles.main}>
        <Formik
          innerRef={formik}
          enableReinitialize
          initialValues={{
            password: "",
            newPassword: "",
            newPasswordRe: "",
          }}
          onSubmit={(values) => changePassword(values)}
          validationSchema={ProfilePasswordChange}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <Text>Mevcut Şifre</Text>
              <InputText
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder={"Mevcut Şifre"}
                error={errors.password && touched.password}
                errorText={errors.password}
                type="password"
              />
              <Text>Yeni Şifre</Text>
              <InputText
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
                placeholder={"Yeni Şifre"}
                error={errors.newPassword && touched.newPassword}
                errorText={errors.newPassword}
                type="password"
              />
              <Text>Yeni Şifre (Tekrar)</Text>
              <InputText
                onChangeText={handleChange("newPasswordRe")}
                onBlur={handleBlur("newPasswordRe")}
                value={values.newPasswordRe}
                placeholder={"Yeni Şifre (Tekrar)"}
                error={errors.newPasswordRe && touched.newPasswordRe}
                errorText={errors.newPasswordRe}
                type="password"
              />
              {/* 
              <TitleRow
                title="Mevcut Şifre"
                error={errors.password && touched.password}
                input={
                  <TextField
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder={"Mevcut Parolayı Girin"}
                    style={{ fontSize: hp("1.8") }}
                  />
                }
              />

              <TitleRow
                title="Yeni Şifre"
                error={errors.newPassword && touched.newPassword}
                input={
                  <TextField
                    value={values.newPassword}
                    onChangeText={handleChange("newPassword")}
                    placeholder={"Parolayı Girin"}
                    style={{ fontSize: hp("1.8") }}
                    type="password"
                  />
                }
              />
              <TitleRow
                title="Yeni Şifre (Tekrar)"
                error={errors.newPasswordRe && touched.newPasswordRe}
                input={
                  <TextField
                    type="password"
                    value={values.newPasswordRe}
                    onChangeText={handleChange("newPasswordRe")}
                    placeholder="Parolayı Tekrar Girin"
                    style={{ fontSize: hp("1.8") }}
                  />
                }
              />
              */}
              <View style={styles.info}>
                <View>
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color={COLORS.light.primaryColor}
                  />
                </View>

                <View>
                  <Text style={styles.infoText}>
                    Şifreniz en az 7 karakter ve en fazla 64 karakter olmalı,
                    harf ve rakam içermelidir
                  </Text>
                </View>
              </View>

              <View style={{ width: "100%", marginTop: 5 }}>
                <MainButton
                  title="Güncelle"
                  isLoading={userChangePasswordLoading}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffff",
    alignItems: "center",
    paddingTop: 18,
    alignItems: "center",
  },

  container: {
    width: "90%",
    height: "100%",
    alignItems: "center",
    alignItems: "flex-start",
  },
  info: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: Colors.grey50,
  },
  infoText: {
    fontSize: hp("1.7"),
    fontWeight: "300",
  },
});

export default ProfilePasswordChangeScreen;
