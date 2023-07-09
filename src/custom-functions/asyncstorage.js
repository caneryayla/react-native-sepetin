import AsyncStorage from "@react-native-async-storage/async-storage";

export const keyPushToArray = async (keyName, value) => {
  let arrValues = JSON.parse(await AsyncStorage.getItem(keyName));
  arrValues.push(value);
  await AsyncStorage.setItem(keyName, JSON.stringify(arrValues));
};

export const keyRemoveIndex = async (keyName, index) => {
  let arrValues = JSON.parse(await AsyncStorage.getItem(keyName));
  arrValues.splice(index, 1);
  await AsyncStorage.setItem(keyName, JSON.stringify(arrValues));
};

export const keyDeleteAllElementsInArray = async (keyName) => {
  await AsyncStorage.setItem(keyName, "[]");
};
