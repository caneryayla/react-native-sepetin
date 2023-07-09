import { TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ rightIcon }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        height: hp("12%"),
        position: "absolute",
        zIndex: 99,
        paddingTop: hp("6%"),
        paddingHorizontal: wp("5"),
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{ width: hp("3"), height: hp("3") }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={wp("5.5%")} />
      </TouchableOpacity>
      {rightIcon}
    </View>
  );
};

export default Header;
