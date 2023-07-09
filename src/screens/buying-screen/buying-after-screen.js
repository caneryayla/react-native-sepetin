import { ScrollView, TouchableOpacity, View } from "react-native";
import { Colors, Text } from "react-native-ui-lib";
import Lottie from "lottie-react-native";
import TitleHeader from "../../components/header/titleHeader";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ROUTES } from "../../constants/ROUTES";
import { useEffect } from "react";
import { buyShopCard } from "../../redux/reducers/user";
import { COLORS } from "../../constants/COLORS";

const BuyingAfterScreen = () => {
  const buyShopCardLoading = useSelector((x) => x.user.buyShopCardLoading);
  const buyShopCardResult = useSelector((x) => x.user.buyShopCardResult);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  useEffect(() => {
    dispatch(
      buyShopCard({
        userAddressId: route.params?.selectAddress,
        userPayment: "test",
      })
    );
  }, []);

  return (
    <View style={{ backgroundColor: "#F3F3F3", height: "100%" }}>
      <TitleHeader
        title="Güvenli Ödeme"
        rightView={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={wp("6")}
              color={Colors.green10}
            />
            <View style={{ marginLeft: 3 }}>
              <Text
                style={{
                  color: Colors.green10,
                  fontWeight: "600",
                  fontSize: hp("1.7"),
                  marginBottom: -"5",
                }}
              >
                SSL
              </Text>
              <Text
                style={{
                  color: Colors.green10,
                  fontWeight: "600",
                  fontSize: hp("1.7"),
                }}
              >
                secured
              </Text>
            </View>
          </View>
        }
        leftView={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.bottomScreen);
            }}
          >
            <Ionicons name="close" size={25} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        style={{
          width: "100%",
          paddingHorizontal: 20,
          height: "100%",
          paddingTop: 25,
        }}
      >
        {buyShopCardLoading ? (
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.grey50,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Lottie
              style={{ width: "100%", height: 200 }}
              source={require("../../assets/animations/order-loading.json")}
              autoPlay
              loop
            />
            <Text
              style={{
                color: Colors.blue30,
                fontSize: hp("1.7%"),
                fontWeight: "500",
              }}
            >
              Ödemeniz alınıyor...
            </Text>
            <Text
              style={{
                color: Colors.blue30,
                fontSize: hp("1.7%"),
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              Lütfen bekleyiniz...
            </Text>
          </View>
        ) : (
          <>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.grey50,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Lottie
                style={{ width: "100%", height: 200 }}
                loop={false}
                source={
                  buyShopCardResult?.isSuccess
                    ? require("../../assets/animations/order-success.json")
                    : require("../../assets/animations/order-error.json")
                }
                autoPlay
              />
              <Text
                style={{
                  color: Colors.green30,
                  fontSize: hp("2%"),
                  fontWeight: "700",
                }}
              >
                {buyShopCardResult?.message}
              </Text>
              <Text
                style={{
                  color: Colors.green30,
                  fontSize: hp("1.7%"),
                  fontWeight: "500",
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                {buyShopCardResult?.description}
              </Text>
            </View>
            {true && (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.light.primaryColor,
                  width: wp("88%"),
                  height: wp("12%"),
                  borderRadius: hp("5"),
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 15,
                }}
                onPress={() => {
                  navigation.navigate(ROUTES.profileOrdersScreen);
                }}
              >
                <Text style={{ fontSize: hp("2"), color: "white" }}>
                  Siparişlerim
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default BuyingAfterScreen;
