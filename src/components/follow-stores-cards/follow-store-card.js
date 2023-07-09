import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ROUTES } from "../../constants/ROUTES";
import { COLORS } from "../../constants/COLORS";
import { ENV } from "../../constants/ENV";
import { Colors } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";

const FollowStoreCard = ({
  storeName,
  guid,
  itemImages,
  storeVote,
  storeLogo,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Image
              style={styles.storeLogo}
              source={{
                uri: storeLogo,
              }}
            />
          </View>
          <View style={styles.topMiddle}>
            <Text style={{ fontSize: wp("3.6%"), fontWeight: "500" }}>
              {storeName}
            </Text>
            <View style={styles.vote}>
              <Text style={{ color: "white", fontSize: wp("2.8%") }}>
                {storeVote}
              </Text>
            </View>
          </View>
          <View style={styles.topRight}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTES.storeDetailScreen, {
                  guid,
                });
              }}
              style={styles.topRightButton}
            >
              <Text
                style={{
                  color: COLORS.light.primaryColor,
                  fontWeight: "600",
                  fontSize: wp("3%"),
                }}
              >
                Mağazaya Git
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottom}>
          <View style={styles.bottomUp}>
            <Text style={{ fontSize: wp("3.2%"), color: "gray" }}>
              Satıcını Ürünleri
            </Text>
          </View>
          <View style={styles.bottomLow}>
            {itemImages?.map(
              (item, index) =>
                index < 5 && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ROUTES.productDetailScreen, {
                        guid: item?.productVariants[0]?.guid,
                      });
                    }}
                  >
                    <View style={styles.storeProductImage}>
                      <Image
                        style={styles.productImage}
                        source={{
                          uri:
                            ENV?.imageServicesUrl +
                            item?.productVariants[0]?.productVariantImages[0]
                              ?.path,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                )
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: wp("50%"),
    borderWidth: 0.4,
    borderColor: "#b3b2b2",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomWidth: 0.4,
    borderBottomColor: "#b3b2b2",
  },
  topLeft: {
    width: wp("8%"),
    height: "45%",
    borderRadius: 50,
  },
  topMiddle: {
    width: "40%",
    height: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topRight: {
    width: "40%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  storeLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    resizeMode: "contain",
    borderColor: Colors.grey60,
  },
  vote: {
    width: wp("8%"),
    height: wp("6%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#05B448",
    marginLeft: wp("3"),
    borderRadius: 4,
  },
  topRightButton: {
    width: wp("30%"),
    height: wp("8%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.light.primaryColor,
  },
  bottom: {
    width: "97%",
    height: "60%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  bottomUp: {
    width: "100%",
    height: "30%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  bottomLow: {
    width: "70%",
    height: "70%",
    alignItems: "center",
    flexDirection: "row",
  },
  storeProductImage: {
    width: wp("12"),
    height: "85%",
    borderWidth: 0.4,
    borderColor: "#b3b2b2",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  productImage: {
    width: "98%",
    height: "92%",
  },
});

export default FollowStoreCard;
