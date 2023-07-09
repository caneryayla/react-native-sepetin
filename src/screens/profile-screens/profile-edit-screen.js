import MainButton from "../../components/buttons/MainButton";
import TitleHeader from "../../components/header/titleHeader";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { View, Text } from "react-native";
import InputText from "../../components/inputs/InputText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { userInfosUpdate, getUserInfo } from "../../redux/reducers/user";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RadioGroup, RadioButton, DateTimePicker } from "react-native-ui-lib";
import { COLORS } from "../../constants/COLORS";
import moment from "moment";
import * as Yup from "yup";

const InputWithText = ({
  placeholder,
  keyboardType,
  error,
  errorText,
  value,
  onBlur,
  onChangeText,
  maxLength,
  type,
  onChangeDate,
}) => {
  return (
    <View style={{ marginVertical: 5 }}>
      <Text style={{ fontSize: wp("3.5%"), color: "gray" }}>{placeholder}</Text>
      <InputText
        error={error}
        errorText={errorText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        maxLength={maxLength}
        type={type}
        onChangeDate={onChangeDate}
      />
    </View>
  );
};

const ProfileEditScreen = () => {
  const user = useSelector((x) => x.user.getUserInfoResult);

  const userInfosUpdateLoading = useSelector(
    (x) => x.user.userInfosUpdateLoading
  );

  const formRef = useRef();
  const dispatch = useDispatch();

  const updateValues = (val) => {
    dispatch(userInfosUpdate(val)).then(({ payload: data }) => {
      data?.isSuccess && dispatch(getUserInfo());
      Toast.show({
        type: data?.isSuccess ? "success" : "error",
        text1: data?.message,
      });
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <TitleHeader title="Profilini Düzenle" />
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1, paddingHorizontal: 25, paddingTop: 20 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={{
            name: user.name ? user.name : null,
            surname: user.surname ? user.surname : null,
            gender: user.gender == null ? null : user.gender,
            email: user.email ? user.email : null,
            phoneCode: user.phoneCode ? user.phoneCode : null,
            phone: user.phone ? user.phone : null,
            tcKimlik: user.tcKimlik ? user.tcKimlik : null,
            birthdate: user.birthdate ? user.birthdate : null,
          }}
          onSubmit={(values) => updateValues(values)}
          validationSchema={() =>
            Yup.lazy((values) => {
              return values?.tcKimlik
                ? Yup.object().shape({
                    email: Yup.string()
                      .email("Geçerli email giriniz")
                      .required("Lütfen email adresinizi giriniz.")
                      .typeError("Lütfen email adresinizi giriniz."),
                    tcKimlik: Yup.string()
                      .min(11, "Lütfen 11 haneli TC Kimlik numaranızı giriniz.")
                      .required("Lütfen TC Kimlik numaranızı giriniz.")
                      .typeError("Lütfen TC Kimlik numaranızı giriniz."),
                    birthdate: Yup.string()
                      .required("Lütfen doğum tarihinizi giriniz.")
                      .typeError("Lütfen doğum tarihinizi giriniz."),
                  })
                : Yup.object().shape({
                    email: Yup.string()
                      .email("Geçerli email giriniz")
                      .required("Lütfen email adresinizi giriniz.")
                      .typeError("Lütfen email adresinizi giriniz."),
                  });
            })
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            isSubmitting,
            isValid,
            isValidating,
            touched,
          }) => (
            <View style={{ width: "100%" }}>
              <InputWithText
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={errors.name && touched.name}
                errorText={errors.name}
                keyboardType="default"
                placeholder="İsim"
              />
              <InputWithText
                onChangeText={handleChange("surname")}
                onBlur={handleBlur("surname")}
                value={values.surname}
                error={errors.surname && touched.surname}
                errorText={errors.surname}
                keyboardType="default"
                placeholder="Soyad"
              />
              <InputWithText
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                error={errors.phone && touched.phone}
                errorText={errors.phone}
                keyboardType="phone-pad"
                placeholder="Telefon Numarası"
              />

              <DateTimePicker
                renderInput={() => (
                  <InputWithText
                    onChangeText={handleChange("birthdate")}
                    onBlur={handleBlur("birthdate")}
                    value={
                      values?.birthdate
                        ? moment(values.birthdate).format("DD/MM/YYYY")
                        : ""
                    }
                    error={errors.birthdate && touched.birthdate}
                    errorText={errors.birthdate}
                    placeholder="Doğum Tarihi"
                  />
                )}
                minimumDate={new Date(moment().subtract(150, "years"))}
                maximumDate={new Date(moment().subtract(18, "years"))}
                label={"Date"}
                locale="tr-TR"
                onChange={(val) => {
                  setFieldValue("birthdate", val);
                }}
                placeholder={"Select a date"}
                value={
                  values?.birthdate ? new Date(values.birthdate) : new Date()
                }
              />

              <InputWithText
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={errors.email && touched.email}
                errorText={errors.email}
                keyboardType="email-address"
                placeholder="Email"
              />

              <InputWithText
                onChangeText={handleChange("tcKimlik")}
                onBlur={handleBlur("tcKimlik")}
                value={values.tcKimlik}
                error={errors.tcKimlik && touched.tcKimlik}
                errorText={errors.tcKimlik}
                keyboardType="number-pad"
                placeholder="TC Kimlik No"
                maxLength={11}
              />
              <Text
                style={{
                  fontSize: wp("3.5%"),
                  color: "gray",
                  marginVertical: 5,
                  marginBottom: 15,
                }}
              >
                Cinsiyet
              </Text>

              <RadioGroup
                style={{ flexDirection: "row" }}
                initialValue={values.gender}
                onValueChange={(val) => {
                  setFieldValue("gender", val);
                }}
              >
                <RadioButton
                  color={COLORS.light.primaryColor}
                  value={true}
                  label={"Erkek"}
                />
                <RadioButton
                  color={COLORS.light.primaryColor}
                  style={{ marginLeft: 10 }}
                  value={false}
                  label={"Kadın"}
                />
              </RadioGroup>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
        <MainButton
          isLoading={userInfosUpdateLoading}
          title="Güncelle"
          onPress={() => formRef.current.handleSubmit()}
        />
      </View>
    </View>
  );
};

export default ProfileEditScreen;
