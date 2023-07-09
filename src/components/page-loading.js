import { BlurView } from "expo-blur";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Lottie from "lottie-react-native";

const PageLoading = ({ loading }) => {
  return (
    loading &&
    (Platform.OS == "ios" ? (
      <BlurView intensity={10} style={styles.container}>
        <View
          style={{
            width: wp("34%"),
            height: wp("34%"),
            borderRadius: 100,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: 100,
            }}
          >
            <Lottie
              speed={2}
              source={require("../../assets/animations/loading.json")}
              autoPlay
              loop
              style={{ width: "100%" }}
            />
          </View>
        </View>
      </BlurView>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="black"
          style={{ transform: [{ scale: 1.5 }] }}
        />
      </View>
    ))
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "rgba(255,255,255,0.7)",
    top: 0,
    left: 0,
    zIndex: 99,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PageLoading;
