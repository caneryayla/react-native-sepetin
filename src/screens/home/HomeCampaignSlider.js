import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import { AnimatedImage, Carousel } from "react-native-ui-lib";

const HomeCampaignSlider = ({ data }) => {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView>
      <View
        style={{
          width: "100%",
          height: wp("40%"),
          marginVertical: 15,
        }}
      >
        <Carousel
          animated
          autoplay
          loop
          pagingEnabled
          showCounter
          horizontal
          containerMarginHorizontal={20}
          allowAccessibleLayout
          pageControlPosition={Carousel.pageControlPositions.OVER}
          onChangePage={() => {}}
        >
          {data?.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTES.productSearchScreen, {
                  query: item?.query,
                })
              }
              style={styles.campaignContainer}
            >
              <AnimatedImage
                style={styles.campaignContainerImage}
                source={{
                  uri: item?.image,
                }}
              />
            </TouchableOpacity>
          ))}
        </Carousel>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  campaignContainer: {
    width: "90%",
    height: "95%",
    backgroundColor: "white",
  },
  campaignContainerImage: { width: "100%", height: "100%", borderRadius: 20 },
});

export default HomeCampaignSlider;
