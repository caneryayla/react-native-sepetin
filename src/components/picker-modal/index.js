import {
  Colors,
  Incubator,
  PanningProvider,
  Picker,
  Text,
  View,
} from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

const PickerModal = ({ value, placeholder, data, onChange }) => {
  const renderDialog = (modalProps) => {
    const { visible, children, toggleModal, onDone } = modalProps;

    return (
      <Incubator.Dialog
        visible={visible}
        onDismiss={() => {
          onDone();
          toggleModal(false);
        }}
        width="100%"
        height="45%"
        bottom
        containerStyle={{
          backgroundColor: Colors.$backgroundDefault,
          bottom: -20,
        }}
        direction={PanningProvider.Directions.DOWN}
        headerProps={{ title: "Custom modal" }}
      >
        <ScrollView>{children}</ScrollView>
      </Incubator.Dialog>
    );
  };

  return (
    <Picker
      value={value}
      renderTopBar={() => <View></View>}
      topBarProps={{ doneLabel: null, cancelLabel: null, disable: true }}
      renderPicker={() => (
        <View
          row
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            width: 80,
            height: 40,
            borderColor: Colors.grey50,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{value ? value : placeholder}</Text>
          <Ionicons name="chevron-down" />
        </View>
      )}
      placeholder={"Placeholder"}
      onChange={onChange}
      renderCustomModal={renderDialog}
    >
      {data?.map((item, index) => (
        <Picker.Item key={index} value={item} label={item} />
      ))}
    </Picker>
  );
};

export default PickerModal;
