import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  getCategoryProductsLoading: false,
  getCategoryProductsResult: [],
  getCategoryProductsError: false,
};

export const getCategoryProducts = createAsyncThunk(
  "getCategoryProducts",
  async (id) => {
    const response = await axios.get(`/categories/products?id=` + id);
    return response.data;
  }
);

const categories = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategoryProducts.pending, (state, action) => {
      state.getCategoryProductsLoading = true;
    });
    builder.addCase(getCategoryProducts.fulfilled, (state, action) => {
      state.getCategoryProductsLoading = false;
      state.getCategoryProductsResult = action.payload;
    });
    builder.addCase(getCategoryProducts.rejected, (state, action) => {
      state.getCategoryProductsError = true;
      state.getCategoryProductsLoading = false;
    });
  },
  reducers: {},
});

export default categories.reducer;
