import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  FlatList,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header";
import PageLoading from "../../components/page-loading";
import { getProduct } from "../../redux/reducers/products";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import StarRating from "react-native-star-rating-widget";
import { formatLira } from "../../custom-functions/format";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import {
  getUserInfo,
  postAddShopCard,
  setFavoriteProduct,
} from "../../redux/reducers/user";
import RenderHTML from "react-native-render-html";
import { ENV } from "../../constants/ENV";
import {
  AnimatedImage,
  Carousel,
  Fader,
  View,
  Colors,
  Text,
} from "react-native-ui-lib";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ROUTES } from "../../constants/ROUTES";

const Rating = ({ rating }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 2,
        marginVertical: 10,
      }}
    >
      <StarRating
        color={COLORS.light.primaryColor}
        onChange={() => {}}
        starSize={wp("4.6%")}
        starStyle={{ marginLeft: -wp("1.3%") }}
        rating={rating}
      />
      <Text weight="200" size="sm">
        {rating}
      </Text>
    </View>
  );
};

const BottomContainer = ({ price, AddShopCard, isLoading }) => {
  return (
    <View style={styles.bottomContainer}>
      <View>
        <Text style={{ fontSize: hp("1.8") }} weight="500" color="#a6a4a4">
          Toplam Fiyat
        </Text>
        <Text style={{ fontSize: hp("2.4") }} weight="800">
          {formatLira(price)} ₺
        </Text>
      </View>
      <TouchableOpacity
        onPress={AddShopCard}
        style={{
          width: wp("50%"),
          height: wp("11%"),
          backgroundColor: COLORS.light.primaryColor,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <Ionicons
              style={{ marginRight: 10 }}
              name="cart-outline"
              color="white"
              size={wp("6%")}
            />
            <Text style={{ fontSize: hp("1.8") }} weight="700" color="white">
              Sepete Ekle
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const ProductDetailScreen = () => {
  const navigation = useNavigation();

  const getUserInfoResult = useSelector(
    (state) => state.user.getUserInfoResult
  );

  const getProductResult = useSelector(
    (state) => state.products.getProductResult
  );

  const getProductLoading = useSelector(
    (state) => state.products.getProductLoading
  );

  const postAddShopCardLoading = useSelector(
    (state) => state.user.postAddShopCardLoading
  );

  const isLogin = useSelector((x) => x.user.getUserInfoResult)?.guid;

  const route = useRoute();
  const dispatch = useDispatch();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const AddShopCard = () => {
    dispatch(
      postAddShopCard({
        productId: getProductResult?.productId,
        productVariantSizeId:
          getProductResult?.productVariantSizes[selectedSizeIndex]?.id,
        count: 1,
      })
    ).then(({ payload: data }) => {
      Toast.show({
        type: data?.isSuccess ? "success" : "error",
        text1: data?.message,
      });
    });
  };

  const productVariantPress = (guid) => {
    if (getProductResult?.guid != guid) {
      dispatch(getProduct(guid));
    }
  };

  useEffect(() => {
    dispatch(getProduct(route.params?.guid));
  }, []);

  if (getProductLoading) {
    return <PageLoading loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        rightIcon={
          <TouchableOpacity
            disabled={!isLogin}
            onPress={async () => {
              await dispatch(setFavoriteProduct(getProductResult?.id));
              await dispatch(getUserInfo());
            }}
          >
            <Ionicons
              color="red"
              name={
                getUserInfoResult?.userFavoriteProducts?.find(
                  (x) => x.productVariantId == getProductResult?.id
                )
                  ? "heart"
                  : "heart-outline"
              }
              size={wp("6")}
            />
          </TouchableOpacity>
        }
      />
      <View style={{ flex: 10 }}>
        <GestureHandlerRootView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: wp("15%") }}
            bounces={false}
          >
            <Carousel
              animated
              autoplay
              autoplayInterval={1500}
              pageControlProps={{
                size: 6,
                containerStyle: styles.loopCarousel,
              }}
              loop
              pagingEnabled
              pageControlPosition={Carousel.pageControlPositions.OVER}
              onChangePage={() => {}}
              allowAccessibleLayout
            >
              {getProductResult?.productVariantImages?.map((item) => (
                <AnimatedImage
                  style={{ width: "100%", height: 400 }}
                  source={{ uri: ENV.imageServicesUrl + item?.path }}
                />
              ))}
            </Carousel>
            <View style={styles.productDetailContainer}>
              <View style={styles.productDetailTopTitleContainer}>
                <TouchableOpacity
                  style={{ height: "100%" }}
                  onPress={() => {
                    navigation.navigate(ROUTES.storeDetailScreen, {
                      guid: getProductResult?.product?.store?.guid,
                    });
                  }}
                >
                  <Text style={{ fontWeight: "700", fontSize: hp("2.8") }}>
                    {getProductResult?.product?.store?.name}{" "}
                  </Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={{ fontSize: hp("2.6") }}>
                  {getProductResult?.product?.name}
                </Text>
              </View>
              <View style={{ paddingHorizontal: 25 }}>
                <Rating rating={getProductResult?.product?.vote} />
              </View>

              <View padding-20 paddingT-5 row>
                {getProductResult?.product?.productVariants?.map(
                  (item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        productVariantPress(item?.guid);
                      }}
                    >
                      <AnimatedImage
                        style={{
                          width: wp("13%"),
                          height: wp("13%"),
                          marginRight: 15,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor:
                            item?.guid == getProductResult?.guid
                              ? COLORS.light.primaryColor
                              : Colors.grey50,
                        }}
                        source={{
                          uri:
                            ENV.imageServicesUrl +
                            item?.productVariantImages[0]?.path,
                        }}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>

              {getProductResult?.productVariantSizes?.length > 1 && (
                <View>
                  <Text style={{ paddingLeft: 25 }} size="md" weight="600">
                    Beden
                  </Text>
                  <FlatList
                    horizontal
                    style={{ marginVertical: 10 }}
                    contentContainerStyle={{ paddingLeft: 25 }}
                    data={getProductResult?.productVariantSizes}
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedSizeIndex(index);
                          }}
                          style={
                            selectedSizeIndex == index
                              ? styles.sizeButtonSelectedContainer
                              : styles.sizeButtonUnSelectedContainer
                          }
                        >
                          <Text
                            color={
                              selectedSizeIndex == index ? "white" : "black"
                            }
                          >
                            {item?.size}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                  <Fader
                    tintColor="white"
                    visible={true}
                    position={Fader.position.END}
                  />
                </View>
              )}
              {getProductResult?.productVariantSizes &&
                getProductResult?.productVariantSizes[selectedSizeIndex]
                  ?.stock <= 7 && (
                  <Text
                    color="red"
                    style={{ marginBottom: 10, paddingLeft: 25 }}
                    size="md"
                    weight="600"
                  >
                    Son{" "}
                    {getProductResult?.productVariantSizes &&
                      getProductResult?.productVariantSizes[selectedSizeIndex]
                        ?.stock}{" "}
                    adet ürün kaldı!
                  </Text>
                )}

              <Text style={{ paddingHorizontal: 25 }} size="md" weight="600">
                Açıklama
              </Text>
              <View style={{ paddingHorizontal: 25 }}>
                <RenderHTML
                  contentWidth={wp("100%")}
                  source={{
                    html: `${getProductResult?.product?.description}`,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </View>
      {Platform.OS == "ios" ? (
        <View style={{ flex: 1.4 }}>
          <BlurView intensity={10} style={{ width: "100%", height: "100%" }}>
            <BottomContainer
              AddShopCard={AddShopCard}
              price={
                getProductResult?.productVariantSizes &&
                getProductResult?.productVariantSizes[selectedSizeIndex]?.price
              }
              isLoading={postAddShopCardLoading}
            />
          </BlurView>
        </View>
      ) : (
        <View style={{ flex: 1.4 }}>
          <BottomContainer
            AddShopCard={AddShopCard}
            price={
              getProductResult?.productVariantSizes &&
              getProductResult?.productVariantSizes[selectedSizeIndex]?.price
            }
            isLoading={postAddShopCardLoading}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productDetailContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: -40,
    paddingTop: 30,
  },
  productDetailTopTitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  //! SizeSelect Comp - Start
  sizeButtonUnSelectedContainer: {
    padding: 10,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.grey50,
  },
  sizeButtonSelectedContainer: {
    padding: 10,
    backgroundColor: "#030303",
    marginRight: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },

  //! SizeSelect Comp - End

  loopCarousel: {
    position: "absolute",
    bottom: 50,
    color: "red",
    width: "100%",
    justifyContent: "center",
  },
});

export default ProductDetailScreen;
