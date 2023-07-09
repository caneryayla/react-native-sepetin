import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View } from "react-native-ui-lib";

const AddresCard = ({
  title,
  name,
  surname,
  phone,
  longAddress,
  city,
  county,
  id,
  item,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ROUTES.profileAddressUpdateScreen, {
          address: item,
        })
      }
      style={styles.container}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <View style={{ width: "92%" }}>
          <View row centerV style={styles.addresTitle}>
            <Text style={styles.title}>{title}</Text>
            <Ionicons name="chevron-forward" size={hp("2")} />
          </View>
          <View style={styles.addresInformationText}>
            <Text style={styles.boldText}>
              {name} {surname}{" "}
            </Text>
            <Text style={styles.slimText}>{phone}</Text>
            <Text style={styles.slimText}>{longAddress}</Text>
            <Text style={styles.boldText}>
              {city?.name} / {county?.name}{" "}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("100"),
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginBottom: 25,
  },
  addresTitle: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 0.4,
    borderBottomColor: "#b3b2b2",
    paddingVertical: 10,
  },
  addresInformationText: {
    width: "100%",
    flexDirection: "column",
    paddingBottom: 6,
  },
  title: {
    fontSize: wp("3.8%"),
    color: COLORS.light.primaryColor,
    fontWeight: "500",
  },
  boldText: {
    fontSize: wp("3.3%"),
    fontWeight: "500",
    paddingVertical: 6,
  },
  slimText: {
    fontSize: wp("3.3%"),
    fontWeight: "400",
    color: "gray",
    paddingVertical: 6,
  },
});

export default AddresCard;
