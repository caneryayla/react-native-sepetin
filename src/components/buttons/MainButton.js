import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";

const MainButton = ({
  title,
  isLoading,
  onPress,
  disabled,
  backgroundColor,
  height,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={
        disabled
          ? styles.buttonDisabled
          : [
              {
                backgroundColor: backgroundColor
                  ? backgroundColor
                  : COLORS.light.primaryColor,
              },
              [{ height: height ? height : wp("9%") }, styles.button],
            ]
      }
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: hp("3"),
  },
  buttonDisabled: {
    width: "100%",
    height: wp("12%"),
    backgroundColor: "#c7c9c8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.light.grayBorderColor,
    marginVertical: 10,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp("1.6"),
  },
});

export default MainButton;
