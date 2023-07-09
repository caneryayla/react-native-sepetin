import React, { useEffect, useRef } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import TitleHeader from "../../components/header/titleHeader";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { View, Text, Colors, TextField, Picker } from "react-native-ui-lib";
import MainButton from "../../components/buttons/MainButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCities,
  getCounties,
  getNeighborhoods,
} from "../../redux/reducers/lists";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { ProfileAddAdressSchema } from "../../constants/VALIDATIONS";
import {
  deleteUserAddress,
  updateUserAddress,
} from "../../redux/reducers/user";
import PageLoading from "../../components/page-loading";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import TitleRow from "./components/TitleRow";

const PickerModal = ({ data, value, editable, placeholder, onChange }) => {
  return (
    <Picker
      useSafeArea
      editable={editable}
      placeholder={placeholder}
      showSearch
      searchPlaceholder="Arayınız"
      value={value}
      onChange={onChange}
      renderPicker={() => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: "70%" }}>
              <Text>
                {value ? data?.find((x) => x.key == value)?.name : placeholder}
              </Text>
            </View>
            <Ionicons
              color={COLORS.light.primaryColor}
              name="chevron-down"
              size={17}
            />
          </View>
        );
      }}
      // topBarProps={{ doneLabel: "YES", cancelLabel: "İptal" }}
    >
      {data?.map((item) => (
        <Picker.Item key={item?.name} value={item?.key} label={item?.name} />
      ))}
    </Picker>
  );
};

const ProfileAddressUpdateScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const getAllCitiesResult = useSelector((x) => x.lists.getAllCitiesResult);
  const getAllCitiesLoading = useSelector((x) => x.lists.getAllCitiesLoading);

  const getCountiesResult = useSelector((x) => x.lists.getCountiesResult);
  const getCountiesLoading = useSelector((x) => x.lists.getCountiesLoading);

  const getNeighborhoodsResult = useSelector(
    (x) => x.lists.getNeighborhoodsResult
  );
  const getNeighborhoodsLoading = useSelector(
    (x) => x.lists.getNeighborhoodsLoading
  );

  const deleteUserAddressLoading = useSelector(
    (x) => x.user.deleteUserAddressLoading
  );

  const formRef = useRef();

  const _getCounties = (key) => {
    dispatch(getCounties(key));
  };

  const _getNeighborhoods = (key) => {
    dispatch(getNeighborhoods(key));
  };

  const updateAddress = (values) => {
    dispatch(
      updateUserAddress({
        guid: route?.params.address.guid,
        title: values.addressTitle,
        name: values.name,
        surname: values.surname,
        phone: values.phone,
        cityId: values.cityId,
        countyId: values.countyId,
        neighborhoodId: values.neighborhoodsId,
        longAddress: values.address,
      })
    ).then(({ payload: data }) => {
      if (data?.isSuccess) {
        navigation.navigate(ROUTES.profileAddressInformation);
      }
    });
  };

  const removeAddress = () => {
    Alert.alert("Uyarı", "Adresinizi silmek istiyor musunuz ?", [
      {
        text: "Evet",
        onPress: () => {
          dispatch(deleteUserAddress(route?.params?.address.guid, "test")).then(
            ({ payload: data }) => {
              if (data?.isSuccess) {
                navigation.navigate(ROUTES.profileAddressInformation);
              }
            }
          );
        },
      },
      {
        text: "Hayır",
        style: "cancel",
      },
    ]);
  };

  useEffect(() => {
    const _getAllCities = async () => {
      await dispatch(getAllCities());
    };

    _getCounties(route?.params.address?.city?.key);
    _getNeighborhoods(route?.params.address?.county?.key);

    _getAllCities();
  }, []);

  return (
    <View>
      <PageLoading
        loading={
          getAllCitiesLoading || getCountiesLoading || getNeighborhoodsLoading
        }
      />
      <TitleHeader title="Adres Düzenle" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{ width: "100%", backgroundColor: "#F3F3F3" }}
      >
        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={{
            name: route?.params?.address?.name,
            surname: route?.params?.address?.surname,
            phone: route?.params?.address?.phone,
            cityId: route?.params?.address?.city?.key,
            countyId: route?.params?.address?.county?.key,
            neighborhoodsId: route?.params?.address?.neighborhood?.key,
            address: route?.params?.address?.longAddress,
            addressTitle: route?.params?.address?.title,
          }}
          onSubmit={(values) => updateAddress(values)}
          validationSchema={ProfileAddAdressSchema}
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
            <View style={styles.container}>
              <Text margin-20>İletişim Bilgileri</Text>
              <TitleRow
                title="Adı"
                error={errors.name && touched.name}
                input={
                  <TextField
                    value={values.name}
                    onChangeText={handleChange("name")}
                    placeholder={"Adınızı Girin"}
                  />
                }
              />

              <TitleRow
                title="Soyadı"
                error={errors.surname && touched.surname}
                input={
                  <TextField
                    value={values.surname}
                    onChangeText={handleChange("surname")}
                    placeholder={"Soyadınızı Girin"}
                  />
                }
              />
              <TitleRow
                title="Cep Telefonu"
                error={errors.phone && touched.phone}
                input={
                  <TextField
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    placeholder={"Numaranızı Girin"}
                  />
                }
              />
              <Text margin-20>Adres Bilgileri</Text>
              <TitleRow
                title="İl"
                error={errors.cityId && touched.cityId}
                input={
                  <PickerModal
                    value={values.cityId}
                    placeholder="İl Seçiniz"
                    data={getAllCitiesResult}
                    onChange={(val) => {
                      _getCounties(val);
                      setFieldValue("cityId", val);
                      setFieldValue("neighborhoodsId", null);
                      setFieldValue("countyId", null);
                    }}
                  />
                }
              />

              <TitleRow
                title="İlçe"
                error={errors.countyId && touched.countyId}
                input={
                  <PickerModal
                    value={values.countyId}
                    editable={values.cityId ? true : false}
                    placeholder="İlçe Seçiniz"
                    data={getCountiesResult}
                    onChange={(val) => {
                      _getNeighborhoods(val);
                      setFieldValue("countyId", val);
                      setFieldValue("neighborhoodsId", null);
                    }}
                  />
                }
              />
              <TitleRow
                title="Mahalle"
                error={errors.neighborhoodsId && touched.neighborhoodsId}
                input={
                  <PickerModal
                    value={values.neighborhoodsId}
                    editable={values.countyId ? true : false}
                    data={getNeighborhoodsResult}
                    placeholder="Mahalle Seçiniz"
                    onChange={(val) => {
                      setFieldValue("neighborhoodsId", val);
                    }}
                  />
                }
              />
              <TitleRow
                title="Adres"
                error={errors.address && touched.address}
                input={
                  <TextField
                    value={values.address}
                    onChangeText={handleChange("address")}
                    multiline={true}
                    numberOfLines={10}
                    placeholder="Adres giriniz"
                    style={{
                      width: 200,
                      height: 90,
                      justifyContent: "flex-start",
                    }}
                  />
                }
              />
              <TitleRow
                title="Adres Başlığı"
                error={errors.addressTitle && touched.addressTitle}
                input={
                  <TextField
                    value={values.addressTitle}
                    onChangeText={handleChange("addressTitle")}
                    placeholder="Adres başlığı giriniz"
                  />
                }
              />
              <View width={"100%"} padding-20>
                <MainButton onPress={() => handleSubmit()} title="Kaydet" />
                <MainButton
                  isLoading={deleteUserAddressLoading}
                  backgroundColor={Colors.red30}
                  onPress={removeAddress}
                  title="Adresi Sil"
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F3F3F3",
  },
  communicationContainer: {
    width: "100%",
    height: wp("55%"),
    backgroundColor: "white",
    borderBottomWidth: 0.4,
    borderBottomColor: "#b3b2b2",
  },
  addresContainer: {
    width: "100%",
    height: wp("90%"),
    backgroundColor: "white",
    borderBottomWidth: 0.4,
    borderBottomColor: "#b3b2b2",
  },
  saveButton: {
    width: wp("95%"),
    height: wp("10%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light.primaryColor,
    marginTop: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: wp("3.5%"),
    fontWeight: "400",
  },
  commText: {
    width: "95%",
    fontSize: wp("3.5%"),
    fontWeight: "400",
    marginTop: 15,
    marginBottom: 15,
  },
});

export default ProfileAddressUpdateScreen;
