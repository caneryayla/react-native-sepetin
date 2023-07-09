import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { formatLira } from "../../custom-functions/format";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import { Rect } from "react-native-svg";
import { COLORS } from "../../constants/COLORS";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import { useState } from "react";
import { ENV } from "../../constants/ENV.js";
import { AnimatedImage } from "react-native-ui-lib";

const CARD_COLORS = {
  cardPrimaryColor: "#F8F8F8",
  cardSecondaryColor: "white",
};

const ProductCard = ({ guid, loading, price, name, imagePath }) => {
  const navigation = useNavigation();
  const [loadImage, setLoadImage] = useState(true);

  return (
    <TouchableOpacity
      onPress={() =>
        guid &&
        navigation.navigate(ROUTES.productDetailScreen, {
          guid: guid,
        })
      }
      style={styles.container}
    >
      {loading ? (
        <SvgAnimatedLinearGradient
          primaryColor={COLORS.light.grayBorderColor}
          secondaryColor="white"
          height="100%"
        >
          <Rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
        </SvgAnimatedLinearGradient>
      ) : (
        <>
          <View style={styles.topImageContainer}>
            <AnimatedImage
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: ENV.imageServicesUrl + imagePath,
              }}
              resizeMode="contain"
              onLoadEnd={(val) => setLoadImage(false)}
            />
            {loadImage && (
              <ActivityIndicator
                size="large"
                color={COLORS.light.primaryColor}
              />
            )}
          </View>
          <View style={styles.bottom}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.price} numberOfLines={1}>
              ₺{formatLira(price)}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("45%"),
    margin: wp("2%"),
    height: wp("50%"),
    backgroundColor: CARD_COLORS.cardPrimaryColor,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  topImageContainer: {
    width: "100%",
    marginTop: wp("3%"),
    height: wp("30%"),
    backgroundColor: "red",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
  },
  bottom: {
    width: "100%",
    height: wp("13%"),
    backgroundColor: "white",
    position: "absolute",
    bottom: wp("2%"),
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    color: "#A8A6A6",
    fontWeight: "400",
  },
  price: {
    color: "#221505",
    fontWeight: "bold",
    fontSize: wp("3.6%"),
  },
});

export default ProductCard;
