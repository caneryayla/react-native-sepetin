import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedImage, TouchableOpacity } from "react-native-ui-lib";
import { ENV } from "../../constants/ENV";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";

const OrderDetailsCard = ({ item, imagePath, name, count, price, size }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.productImg}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTES.productDetailScreen, {
              guid: item?.productVariantSize?.productVariant?.guid,
            })
          }
        >
          <AnimatedImage
            style={styles.images}
            source={{
              uri: ENV.imageServicesUrl + imagePath,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text
          numberOfLines={1}
          style={{ fontSize: hp("1.9%"), fontWeight: "500", color: "black" }}
        >
          {name}
        </Text>
        {size != "default" && (
          <Text style={styles.detailsText}>Beden : {size} </Text>
        )}
        <Text style={styles.detailsText}>Adet: {count} </Text>
        <Text style={styles.detailsPriceText}>{price} TL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: hp("18%"),
    borderBottomColor: "#b3b2b2",
    borderBottomWidth: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  productImg: {
    width: hp("13"),
    height: hp("14"),
  },
  images: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderColor: COLORS.light.primaryColor,
    borderWidth: 0.3,
    borderRadius: 5,
  },
  details: {
    width: "70%",
    height: "100%",
    paddingLeft: hp("2"),
    justifyContent: "center",
  },
  detailsText: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    color: "gray",
    paddingTop: hp("1"),
  },
  detailsPriceText: {
    fontSize: hp("1.8%"),
    fontWeight: "600",
    color: "black",
    paddingTop: hp("1.6"),
  },
});

export default OrderDetailsCard;
