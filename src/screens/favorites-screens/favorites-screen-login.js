import { View, Text, FlatList } from "react-native";
import FavCard from "../../components/favorites-card/fav-card";
import TitleHeader from "../../components/header/titleHeader";
import { useSelector } from "react-redux";
import { ENV } from "../../constants/ENV";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import PageLoading from "../../components/page-loading";
import Lottie from "lottie-react-native";

const FavoritesScreenLogin = () => {
  const getUserInfoResult = useSelector(
    (state) => state.user.getUserInfoResult
  );

  const setFavoriteProductLoading = useSelector(
    (state) => state.user.setFavoriteProductLoading
  );

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <TitleHeader title="Favorilerim" />
      <View>
        <View
          style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 100 }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={getUserInfoResult?.userFavoriteProducts}
            ListEmptyComponent={
              <View
                style={{
                  height: hp("70"),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "50%",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Lottie
                    style={{ width: hp("50"), height: hp("35") }}
                    source={require("../../assets/animations/noFavoriteProduct.json")}
                    autoPlay
                    loop
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "10%",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "600",
                      fontSize: hp("1.9"),
                    }}
                  >
                    Favori ürün bulunmamaktadır
                  </Text>
                </View>
              </View>
            }
            renderItem={({ item, index }) => (
              <FavCard
                id={item?.productVariant?.id}
                guid={item?.productVariant?.guid}
                follow={item?.follow}
                storeName={item?.productVariant?.product?.store?.name}
                productTitle={item?.productVariant?.product?.name}
                productPrice={
                  item?.productVariant?.productVariantSizes[0]?.price
                }
                productImage={
                  item?.productVariant?.productVariantImages[0] &&
                  ENV.imageServicesUrl +
                    item?.productVariant?.productVariantImages[0]?.path
                }
              />
            )}
          />
        </View>
      </View>
      <PageLoading loading={setFavoriteProductLoading} />
    </View>
  );
};

export default FavoritesScreenLogin;
