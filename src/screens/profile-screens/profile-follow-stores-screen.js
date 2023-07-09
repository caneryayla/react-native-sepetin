import React, { useEffect } from "react";
import { FlatList } from "react-native";
import FollowStoreCard from "../../components/follow-stores-cards/follow-store-card";
import TitleHeader from "../../components/header/titleHeader";
import { useDispatch, useSelector } from "react-redux";
import { getUserFavoriteStores } from "../../redux/reducers/user";
import { Text, View } from "react-native-ui-lib";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Lottie from "lottie-react-native";

const ProfileFollowStoresScreen = () => {
  const getUserFavoriteStoresResult = useSelector(
    (x) => x.user.getUserFavoriteStoresResult
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFavoriteStores());
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#F3F3F3" }}>
      <TitleHeader title="Takip Ettiğim Mağazalar" />
      <View flex paddingH-20>
        <FlatList
          data={getUserFavoriteStoresResult}
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
                  height: "60%",
                  overflow: "hidden",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Lottie
                  style={{ width: hp("50"), height: hp("35") }}
                  source={require("../../assets/animations/noFavoriteShop.json")}
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
                  Takip ettiğiniz mağaza bulunmamaktadır
                </Text>
              </View>
            </View>
          }
          renderItem={({ item, index }) => (
            <FollowStoreCard
              storeName={item?.store?.name}
              guid={item?.store?.guid}
              itemImages={item?.store?.products}
              storeVote={item?.store?.vote}
              storeLogo={item?.store?.image}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ProfileFollowStoresScreen;
