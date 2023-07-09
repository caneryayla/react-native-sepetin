import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../text/main";

const ToastContainer = ({ type, message }) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        width: "100%",
        backgroundColor:
          (type === "success" && "#03C988") ||
          (type === "info" && "#3C79F5") ||
          (type === "warn" && "#FF8B13") ||
          (type === "error" && "#E64848"),
        top: top <= 24 ? -top * 2.2 : -top,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingTop: top + 25,
        padding: 20,
      }}
    >
      <Text weight="600" size="md" color="white">
        {message}
      </Text>
    </View>
  );
};

export default ToastContainer;
