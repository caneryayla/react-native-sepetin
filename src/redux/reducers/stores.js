import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  getAllStoreLoading: false,
  getAllStoreResult: [],
  getAllStoreError: false,

  getStoreLoading: false,
  getStoreResult: [{ colors: [{}, {}] }],
  getStoreError: false,
};

export const getAllStore = createAsyncThunk("getAllStore", async () => {
  const response = await axios.get(`/stores`);
  return response.data;
});

export const getStore = createAsyncThunk("getStore", async (guid) => {
  const response = await axios.get(`/stores/` + guid);
  return response.data;
});

const stores = createSlice({
  name: "stores",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllStore.pending, (state, action) => {
      state.getAllStoreLoading = true;
    });
    builder.addCase(getAllStore.fulfilled, (state, action) => {
      state.getAllStoreLoading = false;
      state.getAllStoreResult = action.payload;
    });
    builder.addCase(getAllStore.rejected, (state, action) => {
      state.getAllStoreError = true;
      state.getAllStoreLoading = false;
    });
    //*------------------------
    builder.addCase(getStore.pending, (state, action) => {
      state.getStoreLoading = true;
    });
    builder.addCase(getStore.fulfilled, (state, action) => {
      state.getStoreLoading = false;
      state.getStoreResult = action.payload;
    });
    builder.addCase(getStore.rejected, (state, action) => {
      state.getStoreError = true;
      state.getStoreLoading = false;
    });
    //*------------------------
  },
  reducers: {},
});

export default stores.reducer;
