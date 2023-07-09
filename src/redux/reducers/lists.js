import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  getAllCitiesLoading: false,
  getAllCitiesResult: [],
  getAllCitiesError: false,

  getCountiesLoading: false,
  getCountiesResult: [],
  getCountiesError: false,

  getNeighborhoodsLoading: false,
  getNeighborhoodsResult: [],
  getNeighborhoodsError: false,
};

export const getAllCities = createAsyncThunk("getAllCities", async () => {
  const response = await axios.get(`/cities`);
  return response.data;
});

export const getCounties = createAsyncThunk("getCounties", async (key) => {
  const response = await axios.get(`/counties/cities?key=` + key);
  return response.data;
});

export const getNeighborhoods = createAsyncThunk(
  "getNeighborhoods",
  async (key) => {
    const response = await axios.get(`/neighborhoods/county?key=` + key);
    return response.data;
  }
);

const lists = createSlice({
  name: "lists",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllCities.pending, (state, action) => {
      state.getAllCitiesLoading = true;
    });
    builder.addCase(getAllCities.fulfilled, (state, action) => {
      state.getAllCitiesLoading = false;
      state.getAllCitiesResult = action.payload;
    });
    builder.addCase(getAllCities.rejected, (state, action) => {
      state.getAllCitiesError = true;
      state.getAllCitiesLoading = false;
    });
    //********************
    builder.addCase(getCounties.pending, (state, action) => {
      state.getCountiesLoading = true;
    });
    builder.addCase(getCounties.fulfilled, (state, action) => {
      state.getCountiesLoading = false;
      state.getCountiesResult = action.payload;
    });
    builder.addCase(getCounties.rejected, (state, action) => {
      state.getCountiesError = true;
      state.getCountiesLoading = false;
    });
    //********************
    builder.addCase(getNeighborhoods.pending, (state, action) => {
      state.getNeighborhoodsLoading = true;
    });
    builder.addCase(getNeighborhoods.fulfilled, (state, action) => {
      state.getNeighborhoodsLoading = false;
      state.getNeighborhoodsResult = action.payload;
    });
    builder.addCase(getNeighborhoods.rejected, (state, action) => {
      state.getNeighborhoodsError = true;
      state.getNeighborhoodsLoading = false;
    });
    //********************
  },
  reducers: {},
});

export default lists.reducer;
