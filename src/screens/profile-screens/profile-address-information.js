import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import AddresCard from "../../components/addres-cards/addres-card";

import TitleHeader from "../../components/header/titleHeader";
import PageLoading from "../../components/page-loading";
import { COLORS } from "../../constants/COLORS";
import { ROUTES } from "../../constants/ROUTES";
import { getUserAddress } from "../../redux/reducers/user";

const ProfileAddressInformation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getUserAddressResult = useSelector((x) => x.user.getUserAddressResult);
  const getUserAddressLoading = useSelector(
    (x) => x.user.getUserAddressLoading
  );

  useEffect(() => {
    dispatch(getUserAddress());
  }, [useIsFocused()]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <PageLoading loading={getUserAddressLoading} />
      <TitleHeader
        title="Adres Bilgilerim"
        rightView={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.profileAddressCreateScreen)
            }
          >
            <Text style={styles.buttonText}>Adres Ekle</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingVertical: 20 }}
        style={{ width: "100%" }}
      >
        {getUserAddressResult?.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.profileAddressUpdateScreen, {
                address: item,
              })
            }
          >
            <AddresCard
              title={item?.title}
              name={item?.name}
              surname={item?.surname}
              phone={item?.phone}
              longAddress={item?.longAddress}
              city={item?.city}
              county={item?.county}
              id={item?.id}
              item={item}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  addressAddButton: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },
  buttonText: {
    color: COLORS.light.primaryColor,
    fontSize: wp("3.5%"),
    fontWeight: "400",
  },
  addresContainer: {
    width: wp("100%"),
    alignItems: "center",
  },
});

export default ProfileAddressInformation;
