import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SPACING } from "../../constants/SPACING";
import { COLORS } from "../../constants/COLORS";

const HomeTopMessage = () => {
  return (
    <View style={styles.topMessageContainer}>
      <Text style={styles.topMessageTitle}>Hoşgeldin</Text>
      <Text style={styles.topMessageDescription}>Hemen alışverişe başla!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default HomeTopMessage;
