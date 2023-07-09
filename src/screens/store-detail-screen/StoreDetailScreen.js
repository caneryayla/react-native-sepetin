import { TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../../components/text/main";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getStore } from "../../redux/reducers/stores";
import { LinearGradient } from "expo-linear-gradient";
import PageLoading from "../../components/page-loading";
import Swiper from "react-native-screens-swiper";
import { COLORS } from "../../constants/COLORS";
import { FlatList } from "react-native";
import ProductCard from "../../components/cards/product-card";
import { AnimatedImage, View } from "react-native-ui-lib";
import {
  getUserFavoriteStores,
  postSetFavoriteStore,
} from "../../redux/reducers/user";

const StoreDetailScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const getStoreResult = useSelector((state) => state.stores.getStoreResult);
  const getStoreLoading = useSelector((state) => state.stores.getStoreLoading);

  const getUserFavoriteStoresResult = useSelector(
    (x) => x.user.getUserFavoriteStoresResult
  );
  const getUserFavoriteStoresLoading = useSelector(
    (x) => x.user.getUserFavoriteStoresLoading
  );
  const postSetFavoriteStoreLoading = useSelector(
    (x) => x.user.postSetFavoriteStoreLoading
  );

  const isLogin = useSelector((x) => x.user.getUserInfoResult)?.guid;

  const userIsFollow = () => {
    return getUserFavoriteStoresResult?.find(
      (x) => x?.storeId == getStoreResult?.store?.id
    );
  };

  const followBtnPress = async () => {
    await dispatch(postSetFavoriteStore(getStoreResult?.store?.id));
    await dispatch(getUserFavoriteStores());
  };

  const sendRequest = async () => {
    await dispatch(getStore(route.params.guid));
    await dispatch(getUserFavoriteStores());
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const StoreAllProducts = () => {
    return (
      <FlatList
        style={{
          width: "100%",
          paddingHorizontal: 5,
          backgroundColor: "#F5F5F5",
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        numColumns={2}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text> Aradığınız ürünü maalesef bulamadık... </Text>
            <AnimatedImage
              resizeMode="contain"
              style={{ width: wp("60%"), height: 300 }}
              source={require("../../assets/images/404.png")}
            />
          </View>
        }
        keyExtractor={(item, index) => "key" + index}
        data={getStoreResult?.products}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              width: wp("48%"),
            }}
          >
            <ProductCard
              loading={getStoreLoading}
              guid={item?.guid}
              name={item?.product?.name}
              price={
                item?.productVariantSizes && item?.productVariantSizes[0]?.price
              }
              imagePath={
                item?.productVariantImages && item?.productVariantImages[0].path
              }
            />
          </View>
        )}
      />
    );
  };

  const StoreProfile = () => {
    const Icon = ({ style, icon, description, title }) => {
      return (
        <View
          style={[
            {
              width: "33.5%",
              height: wp("31%"),
              backgroundColor: "white",
              borderColor: "#E5E5E5",
              paddingLeft: 12,
              paddingVertical: 15,
              justifyContent: "space-between",
            },
            style,
          ]}
        >
          <View
            style={{
              width: wp("8%"),
              height: wp("8%"),
              backgroundColor: COLORS.light.primaryColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Ionicons name={icon} color="white" size={20} />
          </View>
          <Text size={hp("2%")} color="#333333" weight="600">
            {title}
          </Text>
          <Text size={hp("1.5%")} color="#656565">
            {description}
          </Text>
        </View>
      );
    };

    return (
      <View style={{ backgroundColor: "#F5F5F5", height: hp("85%") }}>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            borderRadius: 20,
            marginVertical: 15,
            justifyContent: "space-between",
          }}
        >
          <Icon
            title={getStoreResult?.store?.store0peningTime}
            description="Sepetin'deki Süresi"
            icon="time-outline"
            style={{
              borderWidth: 1,
              borderRightWidth: 0,
              borderTopLeftRadius: 7,
              borderBottomLeftRadius: 7,
            }}
          />
          <Icon
            title={getStoreResult?.store?.address}
            description="Konum"
            icon="location-outline"
            style={{ borderWidth: 1 }}
          />
          <Icon
            title={getStoreResult?.products?.length}
            description="Ürün Sayısı"
            icon="cube-outline"
            style={{
              borderWidth: 1,
              borderLeftWidth: 0,
              borderTopRightRadius: 7,
              borderBottomRightRadius: 7,
            }}
          />
        </View>
      </View>
    );
  };

  const data = [
    {
      tabLabel: "Tüm Ürünler",
      component: StoreAllProducts,
      props: {}, // (optional) additional props
    },
    {
      tabLabel: "Satıcı Profili",
      component: StoreProfile,
      props: {}, // (optional) additional props
    },
  ];

  if (
    getStoreLoading ||
    getUserFavoriteStoresLoading ||
    postSetFavoriteStoreLoading
  ) {
    return <PageLoading loading />;
  }

  return (
    <View style={{ backgroundColor: "#F5F5F5" }}>
      {getStoreResult?.colors && (
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["white", COLORS.light.primaryColor]}
          style={{
            flexDirection: "row",
            height: hp("15%"),
            backgroundColor: getStoreResult?.bgColor,
            paddingTop: top,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              height: hp("15%"),
              backgroundColor: "black",
              position: "absolute",
              width: wp("100%"),
              opacity: 0.5,
            }}
          ></View>
          <View row centerV>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={25} color="white" />
            </TouchableOpacity>
            <AnimatedImage
              style={{
                width: wp("13%"),
                height: wp("13%"),
                borderRadius: 50,
                marginHorizontal: 15,
              }}
              source={{ uri: getStoreResult?.store?.image }}
            />
            <Text weight="600" color="white">
              {getStoreResult?.store?.name}
            </Text>
            <View
              style={{
                backgroundColor: COLORS.light.primaryColor,
                marginLeft: wp("4"),
                padding: hp("0.7"),
                borderRadius: hp("0.5"),
              }}
            >
              <Text style={{ fontSize: hp("1.7") }} color="white">
                {getStoreResult?.store?.vote}
              </Text>
            </View>
          </View>

          {isLogin && (
            <TouchableOpacity
              onPress={followBtnPress}
              style={{
                backgroundColor: COLORS.light.backgroundColor,
                paddingHorizontal: 7,
                paddingVertical: 2,
                borderRadius: hp("10"),
                borderColor: COLORS.light.primaryColor,
                borderWidth: 2,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                }}
              >
                <Text
                  style={{ fontSize: hp("1.6") }}
                  color={userIsFollow() ? "gray" : COLORS.light.primaryColor}
                >
                  {userIsFollow() ? "Takibi Bırak" : "Takip Et"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </LinearGradient>
      )}

      <View style={{ width: "100%", height: hp("85%") }}>
        <Swiper data={data} style={styles} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    height: wp("13%"),
  },

  // [View] Static pills container
  staticPillsContainer: {},

  // [View] Button
  pillButton: {
    backgroundColor: "white",
    height: wp("13%"),
    borderBottomWidth: 2.5,
    borderBottomColor: "transparent",
    width: wp("45%"),
  },

  // [View] Active button
  pillActive: {
    borderBottomWidth: 2.5,
    height: wp("13%"),
    borderBottomColor: COLORS.light.primaryColor,
    width: wp("45%"),
  },

  // [Text] Button's text
  pillLabel: {
    color: "#7a7a7a",
    fontWeight: "600",
  },

  // [Text] Active button's text
  activeLabel: {},

  // [View] Border of active pill (:warning: opacity will override animation's opacity)
  borderActive: {},

  // [View] Overflow container for pills container
  pillsOverflow: {
    // Needed if you want to add only bottom shadow
    // Just add the shadow for pillContainer and here add the overflow: 'hidden', and height
  },
});

export default StoreDetailScreen;
