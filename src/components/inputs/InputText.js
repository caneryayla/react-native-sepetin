import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "../../custom-functions/format";

const redColor = "#C04B4C";

const InputText = ({
  placeholder,
  value,
  onChangeText,
  error,
  type,
  errorText,
  keyboardType,
  maxLength,
  datePressVisible,
  onChangeDate,
}) => {
  const [focus, setFocus] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.frame}>
      {type == "date" ? (
        <View style={styles.inputContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              {
                paddingRight: type == "password" ? 45 : 20,
                justifyContent: "center",
              },
              error
                ? styles.error
                : datePressVisible
                ? styles.focus
                : styles.default,
            ]}
          >
            <Text>{formatDate(value)}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              { paddingRight: type == "password" ? 45 : 20 },
              error ? styles.error : focus ? styles.focus : styles.default,
            ]}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={placeholder}
            editable={!(type == "date")}
            value={value}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            maxLength={maxLength}
            secureTextEntry={type == "password" ? secureTextEntry : false}
          />
          {type == "password" && (
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={styles.passwordRightContainer}
            >
              <Ionicons
                name={secureTextEntry ? "eye-off" : "eye"}
                color={COLORS.light.primaryColor}
                size={25}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      {error && <Text style={styles.errorText}> {errorText} </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  frame: { width: "100%" },
  inputContainer: { width: "100%", height: wp("13%"), marginVertical: 5 },
  default: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FEFEFE",
    borderWidth: 1,
    borderColor: "#DEDFE8",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  focus: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FEFEFE",
    borderWidth: 1,
    borderColor: COLORS.light.primaryColor,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  error: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF9F9",
    borderWidth: 1,
    borderColor: redColor,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: wp("3.5%"),
    marginVertical: 5,
    color: redColor,
    fontWeight: "500",
  },
  passwordRightContainer: {
    height: "100%",
    position: "absolute",
    right: 0,
    paddingRight: 15,
    justifyContent: "center",
  },
});

export default InputText;
