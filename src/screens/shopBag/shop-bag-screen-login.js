import { useIsFocused, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { useDispatch, useSelector } from "react-redux";
import TitleHeader from "../../components/header/titleHeader";
import CountButton from "../../components/buttons/CountButton";
import { ROUTES } from "../../constants/ROUTES";
import {
  getUserShopCard,
  postUpdateShopCardItemCount,
  removeShopCardItem,
} from "../../redux/reducers/user";
import { useEffect } from "react";
import { formatLira } from "../../custom-functions/format";
import {
  AnimatedImage,
  Carousel,
  Colors,
  Drawer,
  Text,
} from "react-native-ui-lib";
import { ENV } from "../../constants/ENV";
import PageLoading from "../../components/page-loading";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ShopBagScreenLogin = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getUserShopCardResult = useSelector(
    (x) => x.user.getUserShopCardResult
  );
  const getUserShopCardLoading = useSelector(
    (x) => x.user.getUserShopCardLoading
  );

  const productPress = (guid) => {
    navigation.navigate(ROUTES.productDetailScreen, {
      guid: guid,
    });
  };

  const removeProduct = (id) => {
    dispatch(removeShopCardItem(id)).then(({ payload: data }) => {
      dispatch(getUserShopCard());
    });
  };

  const removeProductSheet = (id) => {
    const options = ["Sil ve Favorilere Ekle", "Sil", "İptal"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        message: "Ürünü sepetten çıkarmak istediğinize emin misiniz?",
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            // Sil ve Favorilere Ekle
            removeProduct(id);
            break;

          case 1:
            // Sil
            removeProduct(id);
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  const ProductCard = ({ item }) => {
    const setCount = (type, shopCartId) => {
      dispatch(
        postUpdateShopCardItemCount({
          type: type,
          shopCartId: shopCartId,
        })
      ).then(({ payload: data }) => {
        dispatch(getUserShopCard());
      });
    };

    return (
      <View
        style={{
          width: "100%",
          height: 120,
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            productPress(item?.productVariantSize?.productVariant?.guid)
          }
          style={{
            width: "32%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              width: "85%",
              height: "90%",
              justifyContent: "flex-end",
              borderRadius: hp("1"),
              overflow: "hidden",
            }}
          >
            <Carousel autoplay autoplayInterval={1500}>
              {item?.productVariantSize?.productVariant?.productVariantImages?.map(
                (item, index) => (
                  <AnimatedImage
                    key={index}
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: ENV.imageServicesUrl + item?.path }}
                  />
                )
              )}
            </Carousel>
            {item?.productVariantSize?.stock <= 5 && (
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: hp("2%"),
                  backgroundColor: Colors.red30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: hp("1.2%") }} color="white">
                  SON {item?.productVariantSize?.stock} ÜRÜN!
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            productPress(item?.productVariantSize?.productVariant?.guid)
          }
          style={{
            width: "68%",
            height: "100%",
            padding: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title} numberOfLines={1}>
            {item?.productVariantSize?.productVariant?.color}{" "}
            {item?.product?.name}
          </Text>
          {item?.productVariantSize?.size !== "default" &&
            item?.productVariantSize?.size?.length <= 10 && (
              <Text style={{ fontSize: hp("1.7") }} black30 numberOfLines={1}>
                Beden : {item?.productVariantSize?.size}
              </Text>
            )}
          <View style={styles.row}>
            <CountButton
              setCount={(val) => setCount(val, item?.id)}
              count={item?.count}
            />
            <Text style={styles.price} numberOfLines={1}>
              {formatLira(item?.productVariantSize?.price)} TL
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    dispatch(getUserShopCard()).then(({ payload: data }) => console.log(data));
  }, [useIsFocused()]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light.backgroundColor }}>
      <TitleHeader title="Sepetim" />
      <PageLoading loading={getUserShopCardLoading} />
      <View style={styles.products}>
        <ScrollView
          contentContainerStyle={{ paddingTop: 20 }}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ alignItems: "center" }}>
            {getUserShopCardResult?.cartItems?.map((item, index) => (
              <GestureHandlerRootView>
                <Drawer
                  style={{
                    backgroundColor: "#FF0032",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: COLORS.light.grayBorderColor,
                    marginBottom: 10,
                  }}
                  useNativeAnimations
                  showLeftItem={false}
                  showRightItems
                  rightItems={[
                    {
                      width: wp("25%"),
                      text: "Sil",
                      background: Colors.red30,
                      onPress: () => removeProductSheet(item?.id),
                    },
                  ]}
                >
                  <ProductCard item={item} />
                </Drawer>
              </GestureHandlerRootView>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.information}>
        <View style={styles.row}>
          <Text style={{ color: "#9D9CA3", fontSize: hp("2") }}>
            Ürünler Toplam
          </Text>
          <Text
            style={{
              color: "#9D9CA3",
              fontWeight: "600",
              fontSize: hp("2%"),
            }}
          >
            {getUserShopCardResult?.totalPrice &&
              formatLira(getUserShopCardResult?.totalPrice)}
            ₺
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View>
          <Text style={styles.productsCountText}>
            {`Toplam : ${getUserShopCardResult?.cartItems?.length} ürün `}
          </Text>
          <Text style={styles.priceText}>
            {formatLira(getUserShopCardResult?.totalPrice)} ₺
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={getUserShopCardResult.cartItems?.length > 0 ? 0 : 1}
          onPress={() => {
            if (getUserShopCardResult.cartItems?.length > 0) {
              navigation.navigate(ROUTES.buyingScreen);
            }
          }}
          style={
            getUserShopCardResult.cartItems?.length > 0
              ? styles.shopButton
              : styles.shopButtonDisabled
          }
        >
          <Text style={styles.shopButtonText}>Satın Al</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    flex: 0.16,
  },
  headerTitle: {
    fontSize: wp("4%"),
    fontWeight: "400",
  },
  products: {
    flex: 2,
  },
  information: {
    flex: 0.3,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  bottom: {
    flex: 0.45,
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.light.grayBorderColor,
  },
  shopButton: {
    backgroundColor: COLORS.light.primaryColor,
    width: wp("45%"),
    height: wp("9%"),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shopButtonDisabled: {
    backgroundColor: Colors.grey50,
    width: wp("47%"),
    height: wp("12%"),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shopButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: hp("1.8"),
  },
  productsCountText: {
    fontSize: hp("1.8%"),
    marginBottom: 5,
  },
  priceText: {
    fontSize: hp("2.5%"),
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  line: {
    width: "100%",
    backgroundColor: "#9D9CA3",
  },
  title: {
    fontSize: hp("1.8%"),
  },
  price: {
    fontSize: hp("1.7%"),
    color: COLORS.light.primaryColor,
    fontWeight: "600",
  },
});

export default ShopBagScreenLogin;
