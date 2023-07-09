import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import MainButton from "../../components/buttons/MainButton";
import { ROUTES } from "../../constants/ROUTES";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/COLORS";
import { Ionicons } from "@expo/vector-icons";

const FavoritesScreenNoLogin = () => {
  const navigation = useNavigation();

  const loginButton = () => {
    navigation.navigate(ROUTES.loginScreen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons
          name="heart-outline"
          color={COLORS.light.primaryColor}
          size={wp("20%")}
        />
      </View>
      <Text style={styles.text}>
        Favorilerinizi görüntüleyebilmek için lütfen giriş yapin. Begendiğiniz
        ürünler yeniden satışa çıktığında haberdar olmak için ürünleri
        favorilerime ekleyebilirsiniz.
      </Text>
      <MainButton onPress={loginButton} title="Giriş Yap" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  text: {
    textAlign: "center",
    color: "#9F9F9F",
    marginVertical: 20,
  },
  circle: {
    width: wp("37%"),
    height: wp("37%"),
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.light.primaryColor,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreenNoLogin;
