import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const initialState = {
  user: [],
  postLoginLoading: false,
  postLoginResult: [],
  postLoginError: false,

  getUserInfoLoading: false,
  getUserInfoResult: [{}],
  getUserInfoError: false,

  postRegisterLoading: false,
  postRegisterResult: [],
  postRegisterError: false,

  postRegisterValidationAfterLoading: false,
  postRegisterValidationAfterResult: [],
  postRegisterValidationAfterError: false,

  postUpdateShopCardItemCountLoading: false,
  postUpdateShopCardItemCountResult: [],
  postUpdateShopCardItemCountError: false,

  getUserShopCardLoading: false,
  getUserShopCardResult: [],
  getUserShopCardError: false,

  postAddShopCardLoading: false,
  postAddShopCardResult: [],
  postAddShopCardError: false,

  postAddAddressLoading: false,
  postAddAddressResult: [],
  postAddAddressError: false,

  getUserAddressLoading: false,
  getUserAddressResult: [],
  getUserAddressError: false,

  deleteUserAddressLoading: false,
  deleteUserAddressResult: [],
  deleteUserAddressError: false,

  updateUserAddressLoading: false,
  updateUserAddressResult: [],
  updateUserAddressError: false,

  userInfosUpdateLoading: false,
  userInfosUpdateResult: [],
  userInfosUpdateError: false,

  userChangePasswordLoading: false,
  userChangePasswordResult: [],
  userChangePasswordError: false,

  userChangeEmailLoading: false,
  userChangeEmailResult: [],
  userChangeEmailError: false,

  userChangeEmailVerificationLoading: false,
  userChangeEmailVerificationResult: [],
  userChangeEmailVerificationError: false,

  removeShopCardItemLoading: false,
  removeShopCardItemResult: [],
  removeShopCardItemError: false,

  buyShopCardLoading: false,
  buyShopCardResult: [],
  buyShopCardError: false,

  getUserOrdersLoading: false,
  getUserOrdersResult: [],
  getUserOrdersError: false,

  getUserOrderLoading: false,
  getUserOrderResult: [],
  getUserOrderError: false,

  setFavoriteProductLoading: false,
  setFavoriteProductResult: [],
  setFavoriteProductError: false,

  postSetFavoriteStoreLoading: false,
  postSetFavoriteStoreResult: [],
  postSetFavoriteStoreError: false,

  getUserFavoriteStoresLoading: false,
  getUserFavoriteStoresResult: [],
  getUserFavoriteStoresError: false,
};

export const postLogin = createAsyncThunk("postLogin", async (login) => {
  const response = await axios.post("/users/login", {
    email: login.email,
    password: login.password,
    deviceToken: login.deviceToken,
  });
  return response.data;
});

export const postRegister = createAsyncThunk(
  "postRegister",
  async (register) => {
    const response = await axios.post("/users/register", {
      email: register.email,
      password: register.password,
    });
    return response.data;
  }
);

export const postRegisterValidationAfter = createAsyncThunk(
  "postRegisterValidationAfter",
  async (register) => {
    const response = await axios.post("/users/registerEmailVerification", {
      email: register.email,
      password: register.password,
      code: register.code,
    });
    return response.data;
  }
);

export const getUserInfo = createAsyncThunk("getUserInfo", async (login) => {
  const response = await axios.get("/users/detail");
  return response.data;
});

export const getUserShopCard = createAsyncThunk("getUserShopCard", async () => {
  const response = await axios.get("/users/shopCart");
  return response.data;
});

export const postUpdateShopCardItemCount = createAsyncThunk(
  "postUpdateShopCardItemCount",
  async (data) => {
    const response = await axios.put("/users/shopCart/updateCountItem", data);
    return response.data;
  }
);

export const postAddShopCard = createAsyncThunk(
  "postAddShopCard",
  async (data) => {
    const response = await axios.post("/users/shopCart/addShopCart", data);
    return response.data;
  }
);

export const postAddAddress = createAsyncThunk(
  "postAddAddress",
  async (data) => {
    const response = await axios.post("/users/address/", data);
    return response.data;
  }
);

export const getUserAddress = createAsyncThunk("getUserAddress", async () => {
  const response = await axios.get("/users/address");
  return response.data;
});

export const deleteUserAddress = createAsyncThunk(
  "deleteUserAddress",
  async (guid) => {
    const response = await axios.delete("/users/address/" + guid);
    return response.data;
  }
);

export const updateUserAddress = createAsyncThunk(
  "updateUserAddress",
  async (data) => {
    const response = await axios.put("/users/address/" + data?.guid, data);
    return response.data;
  }
);

export const userInfosUpdate = createAsyncThunk(
  "userInfosUpdate",
  async (data) => {
    const response = await axios.put("/users/informations", data);
    return response.data;
  }
);

export const userChangePassword = createAsyncThunk(
  "userChangePassword",
  async (data) => {
    const response = await axios.put("/users/passwordChange", data);
    return response.data;
  }
);

export const userChangeEmail = createAsyncThunk(
  "userChangeEmail",
  async (data) => {
    const response = await axios.put("/users/emailChange", data);
    return response.data;
  }
);

export const userChangeEmailVerification = createAsyncThunk(
  "userChangeEmailVerification",
  async (data) => {
    const response = await axios.post("/users/emailChangeVerification", data);
    return response.data;
  }
);

export const removeShopCardItem = createAsyncThunk(
  "removeShopCardItem",
  async (id) => {
    const response = await axios.delete("/users/shopCart/removeItem?id=" + id);
    return response.data;
  }
);

export const buyShopCard = createAsyncThunk("buyShopCard", async (data) => {
  const response = await axios.post("/users/shopCart/buy", data);
  return response.data;
});

export const getUserOrders = createAsyncThunk("getUserOrders", async () => {
  const response = await axios.get("/users/orders");
  return response.data;
});

export const getUserOrder = createAsyncThunk("getUserOrder", async (guid) => {
  const response = await axios.get("/users/orders/detail?guid=" + guid);
  return response.data;
});

export const setFavoriteProduct = createAsyncThunk(
  "setFavoriteProduct",
  async (id) => {
    const response = await axios.post("/users/setFavoriteProduct", {
      productVariantId: id,
    });
    return response.data;
  }
);

export const postSetFavoriteStore = createAsyncThunk(
  "postSetFavoriteStore",
  async (id) => {
    const response = await axios.post("/users/setFavoriteStore", {
      storeId: id,
    });
    return response.data;
  }
);

export const getUserFavoriteStores = createAsyncThunk(
  "getUserFavoriteStores",
  async (guid) => {
    const response = await axios.get("/users/favoriteStores");
    return response.data;
  }
);

const user = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state, action) => {
      state.postLoginLoading = true;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.postLoginLoading = false;
      state.postLoginResult = action.payload;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.postLoginError = true;
      state.postLoginLoading = false;
    });
    //*----------------------------
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.getUserInfoLoading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.getUserInfoLoading = false;
      state.getUserInfoResult = action.payload;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.getUserInfoError = true;
      state.getUserInfoLoading = false;
    });
    //*----------------------------
    builder.addCase(postRegister.pending, (state, action) => {
      state.postRegisterLoading = true;
    });
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.postRegisterLoading = false;
      state.postRegisterResult = action.payload;
    });
    builder.addCase(postRegister.rejected, (state, action) => {
      state.postRegisterError = true;
      state.postRegisterLoading = false;
    });
    //*----------------------------
    builder.addCase(postRegisterValidationAfter.pending, (state, action) => {
      state.postRegisterValidationAfterLoading = true;
    });
    builder.addCase(postRegisterValidationAfter.fulfilled, (state, action) => {
      state.postRegisterValidationAfterLoading = false;
      state.postRegisterValidationAfterResult = action.payload;
    });
    builder.addCase(postRegisterValidationAfter.rejected, (state, action) => {
      state.postRegisterValidationAfterError = true;
      state.postRegisterValidationAfterLoading = false;
    });
    //*----------------------------
    builder.addCase(postUpdateShopCardItemCount.pending, (state, action) => {
      state.postUpdateShopCardItemCountLoading = true;
    });
    builder.addCase(postUpdateShopCardItemCount.fulfilled, (state, action) => {
      state.postUpdateShopCardItemCountLoading = false;
      state.postUpdateShopCardItemCountResult = action.payload;
      Toast.show({
        type: action.payload?.isSuccess ? "success" : "error",
        text1: action.payload?.message,
      });
    });
    builder.addCase(postUpdateShopCardItemCount.rejected, (state, action) => {
      state.postUpdateShopCardItemCountError = true;
      state.postUpdateShopCardItemCountLoading = false;
      Toast.show({
        type: "error",
        text1: "Hata oluştu",
      });
    });
    //*----------------------------
    builder.addCase(postAddShopCard.pending, (state, action) => {
      state.postAddShopCardLoading = true;
    });
    builder.addCase(postAddShopCard.fulfilled, (state, action) => {
      Toast.show({
        type: action.payload?.isSuccess ? "success" : "error",
        text1: action.payload?.message,
      });
      state.postAddShopCardLoading = false;
      state.postAddShopCardResult = action.payload;
    });
    builder.addCase(postAddShopCard.rejected, (state, action) => {
      state.postAddShopCardError = true;
      state.postAddShopCardLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------
    //*----------------------------
    builder.addCase(userInfosUpdate.pending, (state, action) => {
      state.userInfosUpdateLoading = true;
    });
    builder.addCase(userInfosUpdate.fulfilled, (state, action) => {
      state.userInfosUpdateLoading = false;
      state.userInfosUpdateResult = action.payload;
    });
    builder.addCase(userInfosUpdate.rejected, (state, action) => {
      state.userInfosUpdateError = true;
      state.userInfosUpdateLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------
    builder.addCase(postAddAddress.pending, (state, action) => {
      state.postAddAddressLoading = true;
    });
    builder.addCase(postAddAddress.fulfilled, (state, action) => {
      state.postAddAddressLoading = false;
      state.postAddAddressResult = action.payload;
    });
    builder.addCase(postAddAddress.rejected, (state, action) => {
      state.postAddAddressError = true;
      state.postAddAddressLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------
    builder.addCase(getUserAddress.pending, (state, action) => {
      state.getUserAddressLoading = true;
    });
    builder.addCase(getUserAddress.fulfilled, (state, action) => {
      state.getUserAddressLoading = false;
      state.getUserAddressResult = action.payload;
    });
    builder.addCase(getUserAddress.rejected, (state, action) => {
      state.getUserAddressError = true;
      state.getUserAddressLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------
    builder.addCase(deleteUserAddress.pending, (state, action) => {
      state.deleteUserAddressLoading = true;
    });
    builder.addCase(deleteUserAddress.fulfilled, (state, action) => {
      state.deleteUserAddressLoading = false;
      state.deleteUserAddressResult = action.payload;
      Toast.show({
        type: action?.payload?.isSuccess ? "success" : "error",
        text1: action?.payload?.message,
      });
    });
    builder.addCase(deleteUserAddress.rejected, (state, action) => {
      state.deleteUserAddressError = true;
      state.deleteUserAddressLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------
    builder.addCase(updateUserAddress.pending, (state, action) => {
      state.updateUserAddressLoading = true;
    });
    builder.addCase(updateUserAddress.fulfilled, (state, action) => {
      state.updateUserAddressLoading = false;
      state.updateUserAddressResult = action.payload;
      Toast.show({
        type: action?.payload?.isSuccess ? "success" : "error",
        text1: action?.payload?.message,
      });
    });
    builder.addCase(updateUserAddress.rejected, (state, action) => {
      state.updateUserAddressError = true;
      state.updateUserAddressLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------
    builder.addCase(userChangePassword.pending, (state, action) => {
      state.userChangePasswordLoading = true;
    });
    builder.addCase(userChangePassword.fulfilled, (state, action) => {
      state.userChangePasswordLoading = false;
      state.userChangePasswordResult = action.payload;
      Toast.show({
        type: action?.payload?.isSuccess ? "success" : "error",
        text1: action?.payload?.message,
      });
    });
    builder.addCase(userChangePassword.rejected, (state, action) => {
      state.userChangePasswordError = true;
      state.userChangePasswordLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------
    builder.addCase(userChangeEmail.pending, (state, action) => {
      state.userChangeEmailLoading = true;
    });
    builder.addCase(userChangeEmail.fulfilled, (state, action) => {
      state.userChangeEmailLoading = false;
      state.userChangeEmailResult = action.payload;
      Toast.show({
        type: action?.payload?.isSuccess ? "success" : "error",
        text1: action?.payload?.message,
      });
    });
    builder.addCase(userChangeEmail.rejected, (state, action) => {
      state.userChangeEmailError = true;
      state.userChangeEmailLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------
    builder.addCase(userChangeEmailVerification.pending, (state, action) => {
      state.userChangeEmailVerificationLoading = true;
    });
    builder.addCase(userChangeEmailVerification.fulfilled, (state, action) => {
      state.userChangeEmailVerificationLoading = false;
      state.userChangeEmailVerificationResult = action.payload;
      Toast.show({
        type: action?.payload?.isSuccess ? "success" : "error",
        text1: action?.payload?.message,
      });
    });
    builder.addCase(userChangeEmailVerification.rejected, (state, action) => {
      state.userChangeEmailVerificationError = true;
      state.userChangeEmailVerificationLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------
    builder.addCase(getUserShopCard.pending, (state, action) => {
      state.getUserShopCardLoading = true;
    });
    builder.addCase(getUserShopCard.fulfilled, (state, action) => {
      state.getUserShopCardLoading = false;
      state.getUserShopCardResult = action.payload;
    });
    builder.addCase(getUserShopCard.rejected, (state, action) => {
      state.getUserShopCardError = true;
      state.getUserShopCardLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });

    //*----------------------------!
    builder.addCase(removeShopCardItem.pending, (state, action) => {
      state.removeShopCardItemLoading = true;
    });
    builder.addCase(removeShopCardItem.fulfilled, (state, action) => {
      state.removeShopCardItemLoading = false;
      state.removeShopCardItemResult = action.payload;
      Toast.show({
        type: action?.payload?.isSuccess ? "success" : "error",
        text1: action?.payload?.message,
      });
    });
    builder.addCase(removeShopCardItem.rejected, (state, action) => {
      state.removeShopCardItemError = true;
      state.removeShopCardItemLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });

    //*----------------------------!
    builder.addCase(buyShopCard.pending, (state, action) => {
      state.buyShopCardLoading = true;
    });
    builder.addCase(buyShopCard.fulfilled, (state, action) => {
      state.buyShopCardLoading = false;
      state.buyShopCardResult = action.payload;
      Toast.show({
        type: action?.payload?.isSuccess ? "success" : "error",
        text1: action?.payload?.message,
      });
    });
    builder.addCase(buyShopCard.rejected, (state, action) => {
      state.buyShopCardError = true;
      state.buyShopCardLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------!
    builder.addCase(getUserOrders.pending, (state, action) => {
      state.getUserOrdersLoading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.getUserOrdersLoading = false;
      state.getUserOrdersResult = action.payload;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.getUserOrdersError = true;
      state.getUserOrdersLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------!
    builder.addCase(getUserOrder.pending, (state, action) => {
      state.getUserOrderLoading = true;
    });
    builder.addCase(getUserOrder.fulfilled, (state, action) => {
      state.getUserOrderLoading = false;
      state.getUserOrderResult = action.payload;
    });
    builder.addCase(getUserOrder.rejected, (state, action) => {
      state.getUserOrderError = true;
      state.getUserOrderLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------!
    builder.addCase(setFavoriteProduct.pending, (state, action) => {
      state.setFavoriteProductLoading = true;
    });
    builder.addCase(setFavoriteProduct.fulfilled, (state, action) => {
      state.setFavoriteProductLoading = false;
      state.setFavoriteProductResult = action.payload;
      Toast.show({
        type: action?.payload?.isSuccess ? "success" : "error",
        text1: action?.payload?.message,
      });
    });
    builder.addCase(setFavoriteProduct.rejected, (state, action) => {
      state.setFavoriteProductError = true;
      state.setFavoriteProductLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------!
    builder.addCase(getUserFavoriteStores.pending, (state, action) => {
      state.getUserFavoriteStoresLoading = true;
    });
    builder.addCase(getUserFavoriteStores.fulfilled, (state, action) => {
      state.getUserFavoriteStoresLoading = false;
      state.getUserFavoriteStoresResult = action.payload;
    });
    builder.addCase(getUserFavoriteStores.rejected, (state, action) => {
      state.getUserFavoriteStoresError = true;
      state.getUserFavoriteStoresLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
    //*----------------------------!
    builder.addCase(postSetFavoriteStore.pending, (state, action) => {
      state.postSetFavoriteStoreLoading = true;
    });
    builder.addCase(postSetFavoriteStore.fulfilled, (state, action) => {
      state.postSetFavoriteStoreLoading = false;
      state.postSetFavoriteStoreResult = action.payload;
      Toast.show({
        type: action?.payload?.isSuccess ? "success" : "error",
        text1: action?.payload?.message,
      });
    });
    builder.addCase(postSetFavoriteStore.rejected, (state, action) => {
      state.postSetFavoriteStoreError = true;
      state.postSetFavoriteStoreLoading = false;
      Toast.show({
        type: "error",
        text1: "Bir hata oluştu",
      });
    });
  },
  reducers: {
    clearGetUserInfoResult: (state) => {
      state.getUserInfoResult = null;
    },
    setUserInfoResult: (state, action) => {
      state.getUserInfoResult = action.payload;
    },
  },
});

export const { clearGetUserInfoResult, setUserInfoResult } = user.actions;
export default user.reducer;
