import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MainButton from "../../components/buttons/MainButton";
import TitleHeader from "../../components/header/titleHeader";
import { COLORS } from "../../constants/COLORS";
import { clearGetUserInfoResult, getUserInfo } from "../../redux/reducers/user";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "../../constants/ROUTES";
import { useEffect } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Header = ({ user }) => {
  return (
    <>
      <View
        style={{
          width: hp("13%"),
          height: hp("13%"),
          backgroundColor: "white",
          borderRadius: 100,
          marginVertical: 15,
          borderWidth: 1,
          borderColor: COLORS.light.primaryColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="person-outline" size={wp("13%")} />
      </View>
      <Text style={{ fontSize: hp("2%"), fontWeight: "600", marginBottom: 5 }}>
        {user?.name} {user?.surname}
      </Text>
      <Text style={{ fontSize: hp("1.6%"), color: "gray", marginBottom: 20 }}>
        {user?.email}
      </Text>
    </>
  );
};

const RowContainer = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(item?.navigate)}
      style={{
        width: "100%",
        padding: hp("2"),
        backgroundColor: "white",
        paddingHorizontal: 25,
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: COLORS.light.grayBorderColor,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={{ fontWeight: "500", fontSize: hp("1.7%") }}>
          {item?.title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={wp("4%")} />
    </TouchableOpacity>
  );
};

const ProfileScreenLogin = () => {
  const dispatch = useDispatch();

  const logoutButtonPress = () => {
    AsyncStorage.removeItem("userToken");
    dispatch(clearGetUserInfoResult());
  };

  const user = useSelector((x) => x.user.getUserInfoResult);

  const menuNavigation = [
    {
      title: "Profilini Düzenle",
      navigate: ROUTES.profileEditScreen,
    },
    {
      title: "Siparişlerim",
      navigate: ROUTES.profileOrdersScreen,
    },
    {
      title: "Takip Ettiğim Mağazalar",
      navigate: ROUTES.profilefollowStoresScreen,
    },
    {
      title: "Adres Bilgilerim",
      navigate: ROUTES.profileAddressInformation,
    },
    {
      title: "E-Posta Değişikliği",
      navigate: ROUTES.profileEmailChangeScreen,
    },
    {
      title: "Şifre Değişikliği",
      navigate: ROUTES.profilePasswordChangeScreen,
    },
  ];

  useEffect(() => {
    dispatch(getUserInfo());
  }, [useIsFocused()]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.light.backgroundColor,
      }}
    >
      <TitleHeader title="Profil" />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Header user={user} />
        </View>

        {menuNavigation?.map((item, index) => (
          <RowContainer key={index} item={item} />
        ))}

        <View style={{ marginVertical: hp("2"), paddingHorizontal: 20 }}>
          <MainButton onPress={logoutButtonPress} title="Çıkış Yap" />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreenLogin;
