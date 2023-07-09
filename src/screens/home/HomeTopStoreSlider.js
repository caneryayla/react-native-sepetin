import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SPACING } from "../../constants/SPACING";
import { COLORS } from "../../constants/COLORS";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import { Rect } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import { AnimatedImage } from "react-native-ui-lib";

const HomeTopStoreSlider = ({ data, loading }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: "100%",
        height: wp("30%"),
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => "key" + index}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: SPACING.mainHomeSpacing }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.storeDetailScreen, {
                guid: item?.guid,
              })
            }
            style={{
              width: wp("20%"),
              height: wp("20%"),
              backgroundColor: "white",
              marginRight: 20,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: COLORS.light.grayBorderColor,
            }}
          >
            {loading ? (
              <SvgAnimatedLinearGradient
                primaryColor={COLORS.light.grayBorderColor}
                secondaryColor="white"
                height="100%"
              >
                <Rect x="0" y="0" rx="40" ry="40" width="100%" height="100%" />
              </SvgAnimatedLinearGradient>
            ) : (
              <AnimatedImage
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
                resizeMode="cover"
                source={{ uri: item?.image }}
              ></AnimatedImage>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeTopStoreSlider;
