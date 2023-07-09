import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { ROUTES } from "../../constants/ROUTES";
import "moment/locale/tr";
import { formatLira } from "../../custom-functions/format";
import { ENV } from "../../constants/ENV";
import { Colors } from "react-native-ui-lib";

const OrderCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ROUTES.orderDetailsScreen, {
          guid: item?.guid,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <View>
            <Text
              style={{
                marginBottom: 5,
                fontSize: hp("1.7%"),
                fontWeight: "400",
              }}
            >
              {moment(item?.createdAt)
                .locale("tr")
                .format("DD MMMM - YYYY - HH:MM")}
            </Text>
            <Text
              style={{
                fontSize: hp("1.6%"),
                color: "#848591",
                fontWeight: "400",
              }}
            >
              Toplam:
              <Text
                style={{ fontWeight: "500", color: COLORS.light.primaryColor }}
              >
                {" "}
                {formatLira(item?.totalPrice)} ₺
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.orderDetailsScreen, {
                guid: item?.guid,
              })
            }
          >
            <Text
              style={{ color: COLORS.light.primaryColor, fontSize: hp("1.6%") }}
            >
              Detaylara Git
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            width: "100%",
            height: 60,
            flexDirection: "row",
            paddingLeft: 10,
            marginVertical: 10,
          }}
        >
          {item?.totalProducts?.map((images, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTES.productDetailScreen, {
                  guid: images?.productVariantId,
                });
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.grey50,
                  resizeMode: "contain",
                }}
                source={{
                  uri: ENV.imageServicesUrl + images?.path,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.bottom}>
          <Text
            style={{
              fontSize: wp("3.3%"),
              fontWeight: "300",
              marginBottom: 15,
            }}
          >
            {item?.totalProducts?.length} Ürün
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("94"),
    margin: wp("3%"),
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#E2E2E2",
    borderRadius: 5,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderBottomColor: "#E2E2E2",
    paddingHorizontal: 10,
    padding: 10,
    marginTop: 5,
  },
  cargoStatus: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    paddingLeft: 8,
  },

  bottom: {
    width: "100%",
    paddingLeft: 10,
  },
});

export default OrderCard;
