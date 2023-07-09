import React, { useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import TitleHeader from "../../components/header/titleHeader";
import OrderCard from "../../components/orders-cards/order-card";
import PageLoading from "../../components/page-loading";
import { getUserOrders } from "../../redux/reducers/user";

const ProfileOrdersScreen = () => {
  const getUserOrdersLoading = useSelector((x) => x.user.getUserOrdersLoading);
  const getUserOrdersResult = useSelector((x) => x.user.getUserOrdersResult);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PageLoading loading={getUserOrdersLoading} />
      <View style={{ alignItems: "center" }}>
        <TitleHeader title="Siparişlerim" />
      </View>
      <View
        style={{
          width: "97%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          height: hp("4"),
        }}
      >
        <Text
          style={{
            paddingLeft: hp("2"),
            fontSize: hp("1.9%"),
            fontWeight: "500",
          }}
        >
          Tüm Siparişler
        </Text>
        <Text
          style={{ color: "#848591", fontSize: hp("1.9%"), fontWeight: "400" }}
        >
          {getUserOrdersResult?.length} Sipariş
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: hp("2") }}>
        {getUserOrdersResult?.map((item, index) => (
          <OrderCard item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfileOrdersScreen;
