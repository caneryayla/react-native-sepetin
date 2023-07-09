import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStore } from "../../redux/reducers/stores";
import HomeTop from "./HomeTop";
import HomeTopMessage from "./HomeTopMessage";
import HomeTopStoreSlider from "./HomeTopStoreSlider";
import HomeCampaignSlider from "./HomeCampaignSlider";
import HomeCategorySlider from "./HomeCategorySlider";
import PageLoading from "../../components/page-loading";
import Text from "../../components/text/main";
import { Ionicons } from "@expo/vector-icons";
import {
  deleteAllSearcHistory,
  deleteItemSearcHistory,
} from "../../redux/reducers/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";

import { getCategoryProducts } from "../../redux/reducers/categories";

const SearchScreen = ({ history }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const removeSearchHistory = (index) => {
    dispatch(deleteItemSearcHistory(index));
  };

  const removeAllSearchHistory = (index) => {
    dispatch(deleteAllSearcHistory());
  };

  return (
    <View
      style={{
        width: "100%",
        height: hp("90%"),
        backgroundColor: "#F5F5F5",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginVertical: 10,
          marginTop: 15,
        }}
      >
        <Text size="sm" weight="500">
          Geçmiş Aramalarım
        </Text>
        <TouchableOpacity onPress={removeAllSearchHistory}>
          <Ionicons size={wp("4%")} name="trash-outline" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {history
          ?.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTES.productSearchScreen, {
                  query: item?.query,
                })
              }
              key={index}
              style={{
                width: "100%",
                height: wp("10%"),
                backgroundColor: "white",
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: "#EDEDED",
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => removeSearchHistory(index)}>
                <Ionicons
                  size={wp("3.5%")}
                  name="close"
                  style={{ marginRight: 7 }}
                />
              </TouchableOpacity>
              <Text size="sm">{item?.query}</Text>
            </TouchableOpacity>
          ))
          .reverse()}
      </ScrollView>
    </View>
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getAllStoreResult = useSelector(
    (state) => state.stores.getAllStoreResult
  );
  const getAllStoreLoading = useSelector(
    (state) => state.stores.getAllStoreLoading
  );

  const getCategoryProductsResult = useSelector(
    (state) => state.categories.getCategoryProductsResult
  );
  const getCategoryProductsLoading = useSelector(
    (state) => state.categories.getCategoryProductsLoading
  );

  const [searchStatus, setSearchStatus] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const searchHistoryRedux = useSelector(
    (state) => state.asyncStorage.search_history
  );

  const campaignDatas = [
    {
      image:
        "https://cdn.dsmcdn.com/ty695/pimWidgetApi/mobile_20230120075855_2298900KadinMobile202301191701.jpg",
      query: "pull&bear",
    },
    {
      image:
        "https://cdn.dsmcdn.com/ty698/pimWidgetApi/mobile_20230123142505_2300375KadinMobile202301231701.jpg",
      query: "defacto",
    },
    {
      image:
        "https://cdn.dsmcdn.com/ty678/pimWidgetApi/mobile_20230109061121_2298938ErkekMobile202301041608.jpg",
      query: "adidas",
    },
    {
      image:
        "https://cdn.dsmcdn.com/ty652/pimWidgetApi/mobile_20221218194548_mavimobil2.jpg",
      query: "mavi",
    },
    {
      image:
        "https://cdn.dsmcdn.com/ty681/campaign/banners/original/613935/d526dc0093_0.jpg",
      query: "samsung",
    },
  ];

  const categoryTabs = [
    {
      title: "Saat",
      icon: "watch-outline",
      id: 8,
    },
    {
      title: "Elektronik",
      icon: "phone-portrait-outline",
      id: 9,
    },
    {
      title: "Ev - Mobilya",
      icon: "bed-outline",
      id: 4,
    },
    {
      title: "Spor",
      icon: "barbell-outline",
      id: 10,
    },
    {
      title: "Kozmetik",
      icon: "brush-outline",
      id: 6,
    },
    {
      title: "Süpermarket",
      icon: "cart-outline",
      id: 5,
    },
    {
      title: "Anne - Çocuk",
      icon: "people-outline",
      id: 3,
    },
    {
      title: "Kadın",
      icon: "woman-outline",
      id: 1,
    },
    {
      title: "Erkek",
      icon: "man-outline",
      id: 2,
    },
  ];

  const _getCategoryProducts = async (id) => {
    await dispatch(getCategoryProducts(id));
  };

  const _getAllStore = async (id) => {
    await dispatch(getAllStore());
  };

  const categoryChanged = (id) => {
    _getCategoryProducts(id);
  };

  useEffect(() => {
    _getAllStore();
    _getCategoryProducts(8);
  }, []);

  // if (stores?.getAllStoreLoading && products.getCategoryProductsResult) {
  //   return <PageLoading loading />;
  // }

  return (
    <SafeAreaView style={styles.page}>
      <PageLoading loading={getAllStoreLoading || getCategoryProductsLoading} />

      <ScrollView
        disableScrollViewPanResponder={searchStatus}
        scrollEnabled={!searchStatus}
        bounces={false}
      >
        <HomeTop
          searchStatus={searchStatus}
          setSearchStatus={setSearchStatus}
          setSearchHistory={setSearchHistory}
        />
        {searchStatus ? (
          <SearchScreen history={searchHistoryRedux} />
        ) : (
          <>
            <HomeTopMessage />
            <HomeTopStoreSlider
              data={getAllStoreResult}
              loading={getAllStoreLoading}
            />
            <HomeCampaignSlider data={campaignDatas} />
            <HomeCategorySlider
              categoryTabs={categoryTabs}
              categoryChanged={categoryChanged}
              getCategoryProductsLoading={getCategoryProductsLoading}
              getCategoryProductsResult={getCategoryProductsResult}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    width: "100%",
    marginTop: wp("10"),
  },
});

export default HomeScreen;
