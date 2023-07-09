import React, { useEffect } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import TitleHeader from "../../components/header/titleHeader";
import OrderDetailsCard from "./order-details-card";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../../redux/reducers/user";
import PageLoading from "../../components/page-loading";
import { formatLira } from "../../custom-functions/format";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { View } from "react-native-ui-lib";
import moment from "moment";

const OrderDetailsScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const getUserOrderLoading = useSelector(
    (state) => state.user.getUserOrderLoading
  );
  const getUserOrderResult = useSelector(
    (state) => state.user.getUserOrderResult
  );

  const sumPrice = () => {
    let sum = 0;
    for (let i in getUserOrderResult?.orderDetails) {
      for (let j in getUserOrderResult?.orderDetails[i]?.orderDetailProducts) {
        sum += parseFloat(
          getUserOrderResult?.orderDetails[i]?.orderDetailProducts[j]?.price
        );
      }
    }

    return sum;
  };

  useEffect(() => {
    dispatch(getUserOrder(route.params.guid));

    sumPrice();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <TitleHeader title="Sipariş Detayı" />
      <PageLoading loading={getUserOrderLoading} />
      <ScrollView bounces={false}>
        <View style={styles.top}>
          <View style={styles.topHead}>
            <Text style={styles.topTitle}>
              Sipariş No:{" "}
              <Text style={styles.topText}>{getUserOrderResult?.id} </Text>
            </Text>
            <Text style={styles.topTitle}>
              Sipariş Tarihi:{" "}
              <Text style={styles.topText}>
                {moment(getUserOrderResult?.createdAt)?.format("DD/MM/YYYY")}
              </Text>
            </Text>
            {/* <Text style={styles.topTitle}>
              Sipariş Özeti:
              <Text style={styles.cargoStatusText}>
                {" "}
                1 Teslimat <Text style={styles.topText}>3 Ürün</Text>
              </Text>
            </Text>
            <Text style={styles.topTitle}>
              Sipariş Detayı:{" "}
              <Text style={styles.cargoStatusText}>3 Ürün Teslim Edildi</Text>
            </Text> */}
            <Text style={styles.topTitle}>
              Toplam:
              <Text style={styles.priceText}> {formatLira(sumPrice())} ₺</Text>
            </Text>
          </View>
        </View>

        {getUserOrderResult?.orderDetails?.map((item, index) => (
          <View
            style={{ backgroundColor: "white", paddingHorizontal: hp("1.5") }}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                <Text>
                  Teslimat No:{" "}
                  <Text style={styles.headerText}>{item?.id} </Text>
                </Text>
              </Text>
              <Text style={styles.headerTitle}>
                Satıcı:{" "}
                <Text style={styles.headerText}>{item?.store?.name} </Text>
              </Text>
            </View>

            <View style={styles.details}>
              <View
                centerH
                style={[
                  { justifyContent: "space-between" },
                  styles.cargoStatus,
                ]}
              >
                <View row>
                  <Ionicons
                    name="checkmark-outline"
                    color={"#0BC15C"}
                    size={wp("5")}
                    style={{ paddingRight: hp("0.2") }}
                  />
                  <Text style={styles.cargoStatusText}>
                    {item?.cargoStatus.name}{" "}
                  </Text>
                </View>
                {item?.cargoNo && (
                  <View style={{ marginTop: hp("-0.5") }}>
                    <Text style={{ fontSize: hp("1.6%"), fontWeight: "500" }}>
                      Kargo No:{" "}
                      <Text style={{ fontSize: hp("1.6%"), fontWeight: "300" }}>
                        {item?.cargoNo}
                      </Text>
                    </Text>
                    {/* <MainButton height={wp("6.5")} title="Kargo Bilgileri" /> */}
                  </View>
                )}
              </View>

              {/* <View style={styles.cargoInformantion}>
                <Ionicons
                  name="information-circle-outline"
                  color={"#0BC15C"}
                  size={wp("5")}
                  style={{ paddingRight: hp("0.5") }}
                />
                <Text style={styles.informationText}>
                  Aşağıdaki {getUserOrderResult?.orderDetails[0]?.length} Ürün
                  <Text style={{ fontWeight: "600" }}> 22 Ekim Cumartesi </Text>
                  günü teslim edilmiştir
                </Text>
              </View> */}
            </View>

            {item?.orderDetailProducts?.map((product, index) => (
              <OrderDetailsCard
                item={product}
                name={product?.product?.name}
                count={product?.count}
                price={formatLira(product?.price)}
                size={product?.productVariantSize?.size}
                imagePath={
                  product?.productVariantSize?.productVariant
                    ?.productVariantImages[0]?.path
                }
              />
            ))}
          </View>
        ))}

        <View style={styles.addresContainer}>
          <View style={styles.addres}>
            <Text style={styles.deliveryTitle}>Teslimat Adresi</Text>
            <Text style={styles.addresTitle}>
              Alıcı:{" "}
              <Text style={styles.headerText}>
                {getUserOrderResult?.userAddress?.name}{" "}
                {getUserOrderResult?.userAddress?.surname}
              </Text>
            </Text>
            <Text style={styles.addresText}>
              {getUserOrderResult?.userAddress?.longAddress}
            </Text>
            <Text style={styles.topTitle}>
              {getUserOrderResult?.userAddress?.neighborhood?.name}
              {" / "}
              {getUserOrderResult?.userAddress?.county?.name}
              {" / "}
              {getUserOrderResult?.userAddress?.city?.name}
            </Text>
            <Text style={styles.addresTel}>
              {getUserOrderResult?.userAddress?.phone}
            </Text>
          </View>
        </View>

        <View style={styles.paymentContainer}>
          <View style={styles.payment}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={styles.paymentTitle}>Ödeme Bilgileri</Text>
              <Text style={styles.paymentText}>
                <Ionicons name="card-outline" size={hp("2")} /> **** **** XXXX
              </Text>
            </View>
            {/* <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={styles.paymentText}>Ara Toplam</Text>
              <Text style={styles.paymentText}>435.30 TL</Text>
            </View> */}
            {/* <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={styles.paymentText}>Kargo</Text>
              <Text style={styles.paymentText}>19.99 TL</Text>
            </View> */}
          </View>
          <View style={styles.total}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.totalPrice}>Toplam:</Text>
              <Text style={styles.totalPrice}>{formatLira(sumPrice())} ₺</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    width: "100%",
    paddingVertical: hp("2.3"),
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },
  topHead: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: hp("1.5"),
    paddingBottom: hp("1.3"),
    paddingTop: hp("1.3"),
  },
  topTitle: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    paddingBottom: hp("0.5"),
    textTransform: "capitalize",
  },
  topText: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    color: "gray",
  },
  priceText: {
    fontSize: hp("1.8%"),
    color: "black",
    fontWeight: "400",
  },
  header: {
    width: "100%",
    borderBottomWidth: 0.4,
    borderBottomColor: "#b3b2b2",
    paddingVertical: hp("1.5"),
  },
  details: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp("1"),
  },
  cargoStatus: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  cargoInformantion: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: hp("1"),
  },
  cargo: {
    width: "100%",
    flexDirection: "column",
  },
  headerTitle: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    paddingTop: hp("0.5"),
  },
  headerText: {
    fontSize: hp("1.8%"),
    color: "gray",
    fontWeight: "400",
  },
  cargoStatusText: {
    fontSize: hp("1.7%"),
    fontWeight: "500",
    color: "#0BC15C",
  },
  informationText: {
    fontSize: hp("1.7%"),
    fontWeight: "400",
    color: "#000000",
  },
  addresContainer: {
    width: "100%",
    paddingVertical: hp("2"),
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentContainer: {
    width: "100%",
    paddingBottom: hp("6"),
    backgroundColor: "#F3F3F3",
    alignItems: "center",
  },

  addres: {
    width: "90%",
    justifyContent: "center",
  },
  payment: {
    width: "90%",
    justifyContent: "center",
  },

  addresTel: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    color: "gray",
  },
  addresTitle: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
  },
  deliveryTitle: {
    fontSize: hp("1.9%"),
    paddingBottom: hp("1"),
    fontWeight: "400",
  },
  addresText: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    color: "gray",
    paddingBottom: hp("0.6"),
  },
  total: {
    width: "90%",
    justifyContent: "center",
    marginTop: hp("1"),
  },
  paymentTitle: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    paddingBottom: hp("0.6"),
  },
  paymentText: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    color: "#66666",
  },
  totalPrice: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    color: COLORS.light.primaryColor,
  },
});

export default OrderDetailsScreen;
