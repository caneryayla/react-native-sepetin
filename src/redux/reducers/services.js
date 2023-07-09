import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postMobileAppServiceLoading: false,
  postMobileAppServiceResult: [],
  postMobileAppServiceError: false,
};

export const postMobileAppService = createAsyncThunk(
  "postMobileAppService",
  async (data) => {
    const response = await axios.post(`/services/mobileApp`, data);
    return response.data;
  }
);

const stores = createSlice({
  name: "stores",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postMobileAppService.pending, (state, action) => {
      state.postMobileAppServiceLoading = true;
    });
    builder.addCase(postMobileAppService.fulfilled, (state, action) => {
      state.postMobileAppServiceLoading = false;
      state.postMobileAppServiceResult = action.payload;
    });
    builder.addCase(postMobileAppService.rejected, (state, action) => {
      state.postMobileAppServiceError = true;
      state.postMobileAppServiceLoading = false;
    });
  },
  reducers: {},
});

export default stores.reducer;
