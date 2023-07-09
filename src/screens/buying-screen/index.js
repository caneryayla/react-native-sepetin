import React, { useEffect, useRef } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TitleHeader from "../../components/header/titleHeader";
import {
  Colors,
  Picker,
  TextField,
  Text,
  RadioButton,
  View,
} from "react-native-ui-lib";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { getUserAddress } from "../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheetComp from "../../components/bottom-sheet";
import PageLoading from "../../components/page-loading";
import moment from "moment";
import { formatLira } from "../../custom-functions/format";
import { UserBuyScreen } from "../../constants/VALIDATIONS";
import MaskInput, { Masks } from "react-native-mask-input";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";

const TitleCard = ({ title, headerRight, content }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        marginVertical: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.grey50,
      }}
    >
      <View
        style={{
          height: wp("14"),
          justifyContent: "center",
          borderBottomWidth: 1,
          borderColor: Colors.grey50,
          paddingHorizontal: wp("5.4"),
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: hp("1.8%") }}>{title}</Text>
        {headerRight}
      </View>
      <View style={{ padding: 20 }}>{content}</View>
    </View>
  );
};

const BuyingScreen = () => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { top, bottom } = useSafeAreaInsets();

  const getUserAddressResult = useSelector((x) => x.user.getUserAddressResult);
  const getUserAddressLoading = useSelector(
    (x) => x.user.getUserAddressLoading
  );

  const getUserShopCardResult = useSelector(
    (x) => x.user.getUserShopCardResult
  );

  const selectedUserAddressFormat = (id) => {
    const selectedAddressInfos = getUserAddressResult?.find((x) => x.id == id);
    return `${selectedAddressInfos?.title} (${selectedAddressInfos?.neighborhood.name} / ${selectedAddressInfos?.county?.name} / ${selectedAddressInfos?.city?.name}  )  `;
  };

  const yearsList = () => {
    const years = [];
    const dateStart = moment();
    const dateEnd = moment().add(20, "y");
    while (dateEnd.diff(dateStart, "years") >= 0) {
      years.push(dateStart.format("YYYY"));
      dateStart.add(1, "year");
    }
    return years;
  };

  const userBuyPress = (values) => {
    navigation.navigate(ROUTES.buyingAfterScreen, values);
  };

  useEffect(() => {
    dispatch(getUserAddress());
  }, []);

  return (
    <View style={{ backgroundColor: "#F3F3F3", height: "100%" }}>
      <TitleHeader
        title="Güvenli Ödeme"
        rightView={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={wp("6")}
              color={Colors.green10}
            />
            <View style={{ marginLeft: hp("0.8") }}>
              <Text
                style={{
                  color: Colors.green10,
                  fontWeight: "600",
                  fontSize: hp("1.7"),
                  marginBottom: -"5",
                }}
              >
                SSL
              </Text>
              <Text
                style={{
                  color: Colors.green10,
                  fontWeight: "600",
                  fontSize: hp("1.7"),
                }}
              >
                secured
              </Text>
            </View>
          </View>
        }
      />
      <PageLoading loading={getUserAddressLoading} />
      <ScrollView>
        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={{
            selectAddress: getUserAddressResult[0]?.id,
            selectAddressModalVisible: false,
            selectAddressModalValue: getUserAddressResult[0]?.id,
            cartNo: "",
            cartMonth: "",
            cartYear: "",
            cartCVV: "",
          }}
          onSubmit={(values) => userBuyPress(values)}
          validationSchema={UserBuyScreen}
        >
          {({ handleChange, setFieldValue, values, errors, touched }) => (
            <View style={{ paddingHorizontal: 20 }}>
              <TitleCard
                title="Teslimat Adresi"
                content={
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(getUserAddress());
                        setFieldValue("selectAddressModalVisible", true);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ width: "90%", fontSize: hp("1.7%") }}
                        numberOfLines={1}
                      >
                        {selectedUserAddressFormat(values.selectAddress)}
                      </Text>
                      <Ionicons
                        color={COLORS.light.primaryColor}
                        name="chevron-down"
                        size={hp("2")}
                      />
                    </TouchableOpacity>
                  </View>
                }
              />
              <TitleCard
                title="Kart Bilgileri"
                content={
                  <View>
                    <Text marginB-5 style={{ fontSize: hp("1.7") }}>
                      Kart No
                    </Text>
                    <MaskInput
                      style={{
                        borderWidth: 1,
                        borderRadius: 8,
                        padding: 10,
                        height: 40,
                        borderColor:
                          errors.cartNo && touched.cartNo
                            ? Colors.red30
                            : Colors.grey50,
                      }}
                      value={values.cartNo}
                      onChangeText={(masked, unmasked) => {
                        setFieldValue("cartNo", unmasked);
                      }}
                      mask={Masks.CREDIT_CARD}
                      keyboardType="number-pad"
                      maxLength={19}
                    />
                    <View
                      row
                      style={{ justifyContent: "space-between" }}
                      marginT-10
                    >
                      <View>
                        <Text marginB-5 style={{ fontSize: hp("1.7") }}>
                          Son Kullanma Tarihi
                        </Text>
                        <View row>
                          <Picker
                            useWheelPicker
                            value={values.cartMonth}
                            topBarProps={{
                              doneLabel: "Seç  ",
                              cancelLabel: "İptals",
                            }}
                            renderPicker={() => (
                              <View
                                row
                                style={{
                                  borderWidth: 1,
                                  borderRadius: 8,
                                  padding: 10,
                                  width: 80,
                                  height: 40,
                                  marginRight: 10,
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  borderColor:
                                    errors.cartMonth && touched.cartMonth
                                      ? Colors.red30
                                      : Colors.grey50,
                                }}
                              >
                                <Text style={{ fontSize: hp("1.7") }}>
                                  {values.cartMonth ? values.cartMonth : "Ay"}
                                </Text>
                                <Ionicons name="chevron-down" />
                              </View>
                            )}
                            placeholder={"Placeholder"}
                            onChange={(val) => setFieldValue("cartMonth", val)}
                          >
                            {[
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "11",
                              "12",
                            ].map((item, index) => (
                              <Picker.Item
                                key={index}
                                value={item}
                                label={item}
                              />
                            ))}
                          </Picker>

                          <Picker
                            useWheelPicker
                            value={values.cartYear}
                            renderPicker={() => (
                              <View
                                row
                                style={{
                                  borderWidth: 1,
                                  borderRadius: 8,
                                  padding: 10,
                                  width: 80,
                                  height: 40,
                                  borderColor: Colors.grey50,
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  borderColor:
                                    errors.cartYear && touched.cartYear
                                      ? Colors.red30
                                      : Colors.grey50,
                                }}
                              >
                                <Text style={{ fontSize: hp("1.7") }}>
                                  {values.cartYear ? values.cartYear : "Yıl"}
                                </Text>
                                <Ionicons name="chevron-down" />
                              </View>
                            )}
                            topBarProps={{
                              doneLabel: "Seç  ",
                              cancelLabel: "İptals",
                            }}
                            placeholder={"Placeholder"}
                            onChange={(val) => setFieldValue("cartYear", val)}
                          >
                            {yearsList().map((item, index) => (
                              <Picker.Item
                                key={index}
                                value={item}
                                label={item}
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>

                      <View>
                        <Text marginB-5 style={{ fontSize: hp("1.7") }}>
                          CVV
                        </Text>

                        <TextField
                          placeholder="cvv"
                          maxLength={3}
                          value={values.cartCVV}
                          onChangeText={handleChange("cartCVV")}
                          fieldStyle={{
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 9,
                            width: 80,
                            height: 40,
                            borderColor:
                              errors.cartCVV && touched.cartCVV
                                ? Colors.red30
                                : Colors.grey50,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                }
              />

              <BottomSheetComp
                style={{ fontSize: 2 }}
                title="Adres Seçiniz"
                height={"60%"}
                setVisible={(val) => {
                  setFieldValue("selectAddressModalVisible", false);
                }}
                visible={values.selectAddressModalVisible}
              >
                <>
                  <ScrollView
                    contentContainerStyle={{ paddingVertical: 20 }}
                    style={{
                      width: "100%",
                      paddingHorizontal: 20,
                    }}
                  >
                    {getUserAddressResult?.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          setFieldValue("selectAddressModalValue", item?.id);
                        }}
                        style={{
                          borderWidth: 1,
                          width: "100%",
                          borderColor: Colors.grey50,
                          marginBottom: 15,
                          padding: 9,
                          borderRadius: 8,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ marginRight: 15 }}>
                          <RadioButton
                            size={wp("6")}
                            selected={
                              values.selectAddressModalValue == item?.id
                                ? true
                                : false
                            }
                          />
                        </View>
                        <View>
                          <Text
                            numberOfLines={1}
                            style={{ fontSize: hp("1.7"), fontWeight: "500" }}
                          >
                            {item?.title}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: hp("1.7"),
                              fontWeight: "400",
                              color: Colors.grey30,
                              lineHeight: 24,
                            }}
                          >
                            {item?.neighborhood?.name} / {item?.county?.name} /{" "}
                            {item?.city?.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    style={{
                      marginBottom: bottom,
                      backgroundColor: COLORS.light.primaryColor,
                      width: wp("90%"),
                      height: wp("10%"),
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setFieldValue(
                        "selectAddress",
                        values.selectAddressModalValue
                      );
                      setFieldValue("selectAddressModalVisible", false);
                    }}
                  >
                    <Text style={{ fontSize: hp("1.8%"), color: "white" }}>
                      Adresi Seç
                    </Text>
                  </TouchableOpacity>
                </>
              </BottomSheetComp>
            </View>
          )}
        </Formik>
      </ScrollView>
      <View
        row
        style={{
          position: "absolute",
          width: "100%",
          backgroundColor: "white",
          borderTopWidth: 1,
          borderColor: Colors.grey50,
          bottom: 0,
          padding: 20,
          paddingBottom: bottom + 10,
          alignItems: "flex-start",
        }}
      >
        <View style={{ width: "40%" }}>
          <Text style={{ color: Colors.grey30, fontSize: hp("1.8") }}>
            Toplam
          </Text>
          <Text
            style={{
              color: Colors.black,
              fontSize: hp("2.5"),
              fontWeight: "400",
              marginTop: 5,
            }}
          >
            {formatLira(getUserShopCardResult?.totalPrice)} ₺
          </Text>
        </View>
        <View
          style={{
            width: "60%",
            height: "95%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.light.primaryColor,
              justifyContent: "center",
              alignItems: "center",
              width: wp("45%"),
              height: wp("9%"),
              borderRadius: 10,
            }}
            onPress={() => {
              formRef.current.handleSubmit();
            }}
          >
            <Text style={{ fontSize: hp("1.8%"), color: "white" }}>
              Onayla ve Bitir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BuyingScreen;
