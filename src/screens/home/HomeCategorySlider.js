import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ProductCard from "../../components/cards/product-card";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SPACING } from "../../constants/SPACING";
import { COLORS } from "../../constants/COLORS";

const HomeCategorySlider = ({
  categoryTabs,
  categoryChanged,
  getCategoryProductsResult,
  getCategoryProductsLoading,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const pressCategoryIcon = (index, id) => {
    setSelectedTabIndex(index);
    categoryChanged(id);
  };

  return (
    <>
      <View style={styles.categoryTopContainer}>
        <Text style={styles.categoryTopContainerTitle}>Kategoriler</Text>
        {/* <TouchableOpacity>
          <Text style={styles.categoryTopContainerSeeAllTitle}>
            Hepsini gör
          </Text>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 20,
        }}
      >
        <FlatList
          data={categoryTabs}
          horizontal
          keyExtractor={(item, index) => "key" + index}
          style={{ height: wp("12%") }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: SPACING.mainHomeSpacing,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => pressCategoryIcon(index, item.id)}
              style={{
                backgroundColor:
                  selectedTabIndex == index
                    ? COLORS.light.primaryColor
                    : "#F3F3F3",
                width: wp("10%"),
                height: wp("10%"),
                marginRight: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={item?.icon}
                color={selectedTabIndex == index ? "white" : "#8A837B"}
                size={wp("5%")}
              />
            </TouchableOpacity>
          )}
        />

        <FlatList
          style={{
            width: "100%",
            height: wp("60%"),
            paddingHorizontal: 10,
          }}
          keyExtractor={(item, index) => "key" + index}
          data={getCategoryProductsResult}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <ProductCard
              loading={getCategoryProductsLoading}
              guid={item?.guid}
              name={item?.product?.name}
              price={
                item?.productVariantSizes && item?.productVariantSizes[0].price
              }
              imagePath={
                item?.productVariantImages &&
                item?.productVariantImages[0]?.path
              }
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    width: "100%",
  },
  top: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.mainHomeSpacing,
  },
  flatListContainer: {
    paddingTop: 200,
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  topSquare: {
    width: wp("8%"),
    height: wp("8%"),
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  topMessageContainer: {
    width: "100%",
    paddingHorizontal: SPACING.mainHomeSpacing,
  },
  topMessageTitle: {
    fontWeight: "bold",
    fontSize: wp("5%"),
    marginBottom: 5,
    color: COLORS.light.titleColor,
  },
  topMessageDescription: {
    fontSize: wp("3.3%"),
    color: "#BAB7B2",
  },
  campaignContainer: {
    width: wp("90%"),
    height: "95%",
    backgroundColor: "red",
    marginRight: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  campaignContainerImage: { width: "100%", height: "100%" },
  campaignFlatListStyle: { width: "100%", height: wp("50%"), marginTop: 20 },
  campaignFlatListContentContainerStyle: {
    paddingLeft: SPACING.mainHomeSpacing,
  },
  categoryTopContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: SPACING.mainHomeSpacing,
  },
  categoryTopContainerTitle: {
    color: COLORS.light.titleColor,
    fontSize: wp("3.6%"),
    fontWeight: "500",
  },
  categoryTopContainerSeeAllTitle: {
    color: COLORS.light.primaryColor,
    fontSize: wp("3%"),
  },

  //*
  // [View] Pills container
  pillContainer: {},

  // [View] Static pills container
  staticPillsContainer: {
    backgroundColor: "red",
  },

  // [View] Button
  pillButton: {},

  // [View] Active button
  pillActive: {},

  // [Text] Button's text
  pillLabel: {},

  // [Text] Active button's text
  activeLabel: {},

  // [View] Border of active pill (:warning: opacity will override animation's opacity)
  borderActive: {},

  // [View] Overflow container for pills container
  pillsOverflow: {
    // Needed if you want to add only bottom shadow
    // Just add the shadow for pillContainer and here add the overflow: 'hidden', and height
  },

  //*

  video: {
    width: "100%",
    height: "100%",
  },
});

export default HomeCategorySlider;
