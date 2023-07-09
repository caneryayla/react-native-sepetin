import { TouchableOpacity, View, Text } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";

const CountButton = ({ count, setCount }) => {
  const increaseCount = () => {
    setCount && setCount("increase");
  };

  const decreaseCount = () => {
    setCount && setCount("decrease");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        width: wp("30%"),
        height: wp("9%"),
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: hp("10"),
        borderWidth: 1,
        borderColor: COLORS.light.grayBorderColor,
      }}
    >
      <TouchableOpacity
        style={{
          width: wp("7%"),
          height: wp("7%"),
          alignItems: "center",
          justifyContent: "center",
        }}
        disabled={count == 1}
        onPress={decreaseCount}
      >
        <Text
          style={{
            fontSize: hp("3.8%"),
            marginTop: -wp("2"),
            fontWeight: "600",
            color:
              count == 1
                ? COLORS.light.grayBorderColor
                : COLORS.light.primaryColor,
          }}
        >
          -
        </Text>
      </TouchableOpacity>
      <View
        style={{
          width: wp("7.5%"),
          height: "90%",
          textAlign: "center",
          backgroundColor: COLORS.light.lightPrimaryColor,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
        }}
      >
        <Text style={{ color: COLORS.light.primaryColor }}>{count}</Text>
      </View>
      <TouchableOpacity
        style={{
          width: wp("7%"),
          height: wp("7%"),
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={increaseCount}
      >
        <Text
          style={{
            fontSize: hp("3%"),
            marginTop: -wp("0.7"),
            fontWeight: "600",
            color: COLORS.light.primaryColor,
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CountButton;
