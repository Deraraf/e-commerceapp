import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authSlice from "./features/auth/authSlice";
import favoritesReducer from "../redux/features/favorites/favoriteSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

import cartSliceReducer from "../redux/features/cart/cartSlice";
import shopReducer from "../redux/features/shop/shopSlice";

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop: shopReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
setupListeners(store.dispatch);
