import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Ionicons } from "@expo/vector-icons";
import { SPACING } from "../../constants/SPACING";
import { COLORS } from "../../constants/COLORS";
import { useState } from "react";
import Text from "../../components/text/main";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import { useDispatch } from "react-redux";
import { searchHistoryPushData } from "../../redux/reducers/asyncStorage";

const HomeTop = ({ searchStatus, setSearchStatus, setSearchHistory }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const hideKeyboard = () => {
    setSearchQuery("");
    setSearchStatus(false);
    Keyboard.dismiss();
  };

  const searchPress = async () => {
    const jsonValue = {
      query: searchQuery,
      createdAt: new Date().toDateString(),
    };

    navigation.navigate(ROUTES.productSearchScreen, { query: searchQuery });
    setTimeout(() => {
      dispatch(searchHistoryPushData(jsonValue));
    }, 1000);
  };

  return (
    <View style={styles.top}>
      <TextInput
        style={searchStatus ? styles.focusInput : styles.input}
        onFocus={() => setSearchStatus(true)}
        onChangeText={setSearchQuery}
        placeholder="Marka , ürün veya kategori ara"
        placeholderTextColor="#8E8E92"
        returnKeyType="search"
        value={searchQuery}
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={searchPress}
      />
      <View style={styles.searchIconContainer}>
        <Ionicons name="search" size={15} color={COLORS.light.primaryColor} />
      </View>
      {searchStatus && (
        <TouchableOpacity onPress={hideKeyboard}>
          <Text color={COLORS.light.primaryColor}>Vazgeç</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    width: "100%",
    paddingHorizontal: SPACING.mainHomeSpacing,
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
    marginVertical: 15,
  },
  searchIconContainer: {
    marginTop: wp("5%"),
    position: "absolute",
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    height: wp("10%"),
    marginLeft: 30,
  },
});

export default HomeTop;
