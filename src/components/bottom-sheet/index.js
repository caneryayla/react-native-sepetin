import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  Colors,
  Incubator,
  PanningProvider,
  Text,
  View,
} from "react-native-ui-lib";

const BottomSheetComp = ({ visible, setVisible, height, title, children }) => {
  return (
    <Incubator.Dialog
      visible={visible}
      onDismiss={() => {
        setVisible && setVisible(false);
      }}
      width="100%"
      height={height ? height : "50%"}
      bottom
      containerStyle={{
        backgroundColor: Colors.$backgroundDefault,
        bottom: -20,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        alignItems: "center",
      }}
      direction={PanningProvider.Directions.DOWN}
    >
      <View
        style={{
          width: "10%",
          height: 4,
          backgroundColor: Colors.grey50,
          marginVertical: hp("1%"),
        }}
      ></View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: Colors.grey50,
          width: "95%",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: hp("1.7"),
        }}
      >
        <Text black40 text70BO style={{ fontSize: hp("2") }}>
          {title}
        </Text>
      </View>
      {children}
    </Incubator.Dialog>
  );
};

export default BottomSheetComp;
