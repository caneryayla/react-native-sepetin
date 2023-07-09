import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";

const UpdateAddresCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.commText}>İletişim Bilgileri</Text>

      <View style={styles.communicationContainer}>
        <View style={styles.communication}></View>
      </View>
      <Text style={styles.commText}>Adres Bilgileri</Text>

      <View style={styles.addresContainer}>
        <View style={styles.addres}></View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
  },
  communicationContainer: {
    width: "100%",
    height: wp("55%"),
    backgroundColor: "white",
    borderBottomWidth: 0.4,
    borderBottomColor: "#b3b2b2",
  },
  addresContainer: {
    width: "100%",
    height: wp("90%"),
    backgroundColor: "white",
    borderBottomWidth: 0.4,
    borderBottomColor: "#b3b2b2",
  },
  saveButton: {
    width: wp("95%"),
    height: wp("10%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light.primaryColor,
    marginTop: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: wp("3.5%"),
    fontWeight: "400",
  },
  commText: {
    width: "95%",
    fontSize: wp("3.5%"),
    fontWeight: "400",
    marginTop: 15,
    marginBottom: 15,
  },
});

export default UpdateAddresCard;
