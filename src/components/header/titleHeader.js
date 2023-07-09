import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, rightView, leftView }) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {leftView ? (
        <View style={{ width: "30%" }}>{leftView}</View>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: "30%" }}
        >
          <Ionicons name="chevron-back" size={wp("5.5%")} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: "30%", alignItems: "flex-end" }}>{rightView}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    height: hp("12%"),
    paddingHorizontal: 15,
  },
  title: {
    fontSize: wp("3.5%"),
    fontWeight: "500",
  },
});

export default Header;
