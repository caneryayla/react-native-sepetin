import {
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProduct } from "../../redux/reducers/products";
import ProductCard from "../../components/cards/product-card";
import { searchHistoryPushData } from "../../redux/reducers/asyncStorage";
import { MotiView } from "moti";
import { AnimatedImage } from "react-native-ui-lib";

const ProductSearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const getSearchProductResult = useSelector(
    (state) => state.products.getSearchProductResult
  );
  const getSearchProductLoading = useSelector(
    (state) => state.products.getSearchProductLoading
  );

  const searchPress = async () => {
    const jsonValue = {
      query: searchQuery,
      createdAt: new Date().toDateString(),
    };
    dispatch(searchHistoryPushData(jsonValue));
    getSearchProducts(searchQuery);
  };

  const getSearchProducts = (value) => {
    dispatch(getSearchProduct(value));
  };

  useEffect(() => {
    setSearchQuery(route.params.query);
    getSearchProducts(route.params.query);
  }, []);

  return (
    <SafeAreaView style={{ marginTop: hp("3.5") }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons size={25} name="chevron-back" />
        </TouchableOpacity>
        <View style={styles.top}>
          <TextInput
            style={styles.input}
            onChangeText={setSearchQuery}
            placeholder="Marka , ürün veya kategori ara"
            placeholderTextColor="#8E8E92"
            returnKeyType="search"
            value={searchQuery}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={searchPress}
          />
          <View style={styles.searchIconContainer}>
            <Ionicons
              name="search"
              size={15}
              color={COLORS.light.primaryColor}
            />
          </View>
        </View>
      </View>
      <View style={{ width: "100%", height: hp("90%") }}>
        {getSearchProductLoading ? (
          <View
            style={{
              flex: 0.84,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={COLORS.light.primaryColor} />
          </View>
        ) : (
          <FlatList
            style={{
              width: "100%",
              height: wp("60%"),
              paddingHorizontal: 5,
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
            data={getSearchProductResult}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <MotiView
                from={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 200 }}
                style={{
                  width: wp("48%"),
                }}
              >
                <ProductCard
                  loading={getSearchProductLoading}
                  guid={item?.guid}
                  name={item?.product?.name}
                  price={
                    item?.productVariantSizes &&
                    item?.productVariantSizes[0].price
                  }
                  imagePath={
                    item?.productVariantImages &&
                    item?.productVariantImages[0]?.path
                  }
                />
              </MotiView>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    height: wp("10%"),
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    paddingLeft: 35,
    marginVertical: 15,
  },
  focusInput: {
    width: "83%",
    height: wp("10%"),
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    paddingLeft: 35,
  },
  searchIconContainer: {
    marginTop: wp("5%"),
    position: "absolute",
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    height: wp("10%"),
  },
});

export default ProductSearchScreen;
