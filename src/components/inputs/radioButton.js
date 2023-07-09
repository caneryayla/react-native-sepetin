import { TouchableOpacity, View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";

const RadioButton = ({ value, defaultValue, onChangeValue }) => {
  const radioButtonPress = () => {
    onChangeValue(defaultValue);
  };

  return value == defaultValue ? (
    <TouchableOpacity onPress={radioButtonPress} style={styles.active}>
      <View style={styles.activeInline}></View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={radioButtonPress}
      style={styles.deactive}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deactive: {
    height: wp("6%"),
    width: wp("6%"),
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#DEDFE8",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    height: wp("6%"),
    width: wp("6%"),
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.light.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  activeInline: {
    height: "60%",
    width: "60%",
    backgroundColor: COLORS.light.primaryColor,
    borderRadius: 100,
  },
});

export default RadioButton;
