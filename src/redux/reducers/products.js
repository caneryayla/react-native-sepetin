import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProductsLoading: false,
  allProductsResult: [],
  allProductsError: false,

  getCategoryProductsLoading: false,
  getCategoryProductsResult: [],
  getCategoryProductsError: false,

  getProductLoading: false,
  getProductResult: [],
  getProductError: false,

  getSearchProductLoading: false,
  getSearchProductResult: [],
  getSearchProductError: false,
};

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async (page) => {
    const response = await axios.get(
      `/products/getAllProducts?limit=20&page=${page}`
    );
    return response.data;
  }
);

export const getAllProductsPagination = createAsyncThunk(
  "getAllProductsPagination",
  async (page) => {
    const response = await axios.get(
      `/products/getAllProducts?limit=20&page=${page}`
    );
    return response.data;
  }
);

export const getCategoryProducts = createAsyncThunk(
  "getCategoryProducts",
  async (categoryID) => {
    const response = await axios.get(
      `/products/getCategoryProduct?id=${categoryID}`
    );
    return response.data;
  }
);

export const getProduct = createAsyncThunk("getProduct", async (guid) => {
  const response = await axios.get(`/products/${guid}`);
  return response.data;
});

export const getSearchProduct = createAsyncThunk(
  "getSearchProduct",
  async (query) => {
    const response = await axios.get(`/search/products?q=${query}`);
    return response.data;
  }
);

const products = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.allProductsLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.allProductsLoading = false;
      state.allProductsResult = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.allProductsError = true;
      state.allProductsLoading = false;
    });
    //*-------------------------------------------------------------
    builder.addCase(getAllProductsPagination.pending, (state, action) => {
      state.allProductsLoading = true;
    });
    builder.addCase(getAllProductsPagination.fulfilled, (state, action) => {
      state.allProductsLoading = false;
      action.payload?.filter((item) => {
        state.allProductsResult.push(item);
      });
    });
    builder.addCase(getAllProductsPagination.rejected, (state, action) => {
      state.allProductsError = true;
      state.allProductsLoading = false;
    });
    //*-------------------------------------------------------------
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
    //*-------------------------------------------------------------
    builder.addCase(getProduct.pending, (state, action) => {
      state.getProductLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.getProductLoading = false;
      state.getProductResult = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.getProductError = true;
      state.getProductLoading = false;
    });
    //*-------------------------------------------------------------
    builder.addCase(getSearchProduct.pending, (state, action) => {
      state.getSearchProductLoading = true;
    });
    builder.addCase(getSearchProduct.fulfilled, (state, action) => {
      state.getSearchProductLoading = false;
      state.getSearchProductResult = action.payload;
    });
    builder.addCase(getSearchProduct.rejected, (state, action) => {
      state.getSearchProductError = true;
      state.getSearchProductLoading = false;
    });
  },
  reducers: {},
});

export default products.reducer;
