import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import {
  keyPushToArray,
  keyRemoveIndex,
} from "../../custom-functions/asyncstorage";

const initialState = {
  search_history: [],
};

const asyncStorage = createSlice({
  name: "asyncStorage",
  initialState,
  reducers: {
    searchHistoryPushData: (state, action) => {
      keyPushToArray("@search_history", action.payload);
      state.search_history.push(action.payload);
    },
    setSearcHistory: (state, action) => {
      AsyncStorage.setItem("@search_history", JSON.stringify(action.payload));
      state.search_history = action.payload;
    },
    deleteItemSearcHistory: (state, action) => {
      keyRemoveIndex("@search_history", action.payload);
      state.search_history.splice(action.payload, 1);
    },
    deleteAllSearcHistory: (state) => {
      AsyncStorage.setItem("@search_history", "[]");
      state.search_history = [];
    },
  },
});

export const {
  searchHistoryPushData,
  setSearcHistory,
  deleteItemSearcHistory,
  deleteAllSearcHistory,
} = asyncStorage.actions;

export default asyncStorage.reducer;
