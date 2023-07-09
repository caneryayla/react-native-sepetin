import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "react-native-ui-lib";

const TitleRow = ({ title, input, error }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: error ? Colors.red80 : "white",
        padding: 18,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: error ? Colors.red20 : Colors.grey50,
      }}
    >
      <Text style={{ width: "40%", fontWeight: "500", fontSize: hp("1.8") }}>
        {title}
      </Text>
      {input}
    </View>
  );
};

export default TitleRow;
