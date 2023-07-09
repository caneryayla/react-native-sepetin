import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/products";
import user from "./reducers/user";
import asyncStorage from "./reducers/asyncStorage";
import stores from "./reducers/stores";
import lists from "./reducers/lists";
import categories from "./reducers/categories";

export const store = configureStore({
  reducer: {
    user,
    products,
    stores,
    asyncStorage,
    lists,
    categories,
  },
});
