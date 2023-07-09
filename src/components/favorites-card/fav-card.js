import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import { formatLira } from "../../custom-functions/format";
import { useDispatch } from "react-redux";
import { getUserInfo, setFavoriteProduct } from "../../redux/reducers/user";

const FavCard = ({
  storeName,
  productImage,
  productPrice,
  productTitle,
  guid,
  follow,
  id,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate(ROUTES.productDetailScreen, {
            guid,
          })
        }
      >
        <View style={styles.left}>
          <Image
            style={styles.img}
            source={{
              uri: productImage,
            }}
          />
        </View>
        <View style={styles.right}>
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={async () => {
                await dispatch(setFavoriteProduct(id));
                await dispatch(getUserInfo());
              }}
            >
              <Ionicons
                color="red"
                name={follow ? "heart" : "heart-outline"}
                size={wp("6")}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: "500", fontSize: hp("1.8%") }}>
            {storeName}
          </Text>
          <Text
            style={{ fontWeight: "300", fontSize: hp("1.6%") }}
            numberOfLines={1}
          >
            {productTitle}
          </Text>
          <StarRating
            style={{ marginLeft: 3 }}
            rating={4.5}
            starSize={wp("4%")}
            starStyle={{ marginLeft: -hp("0.6%") }}
            color={COLORS.light.primaryColor}
          />
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              style={{ marginRight: 5 }}
              color={"green"}
              name="ribbon"
              size={wp("4.5%")}
            />
            <Ionicons color={"orange"} name="rocket" size={wp("4.5%")} />
          </View>

          <Text style={{ color: "black", fontSize: hp("1.8") }}>
            {formatLira(productPrice)} TL
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    borderColor: "#EAEAEA",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("2.5"),
  },
  icon: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    alignItems: "flex-end",
  },
  left: {
    width: "30%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    width: "70%",
    height: "85%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  img: {
    width: "90%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default FavCard;
