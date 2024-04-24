"use client";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { positionsApi } from "./api/positions";
import { staffsApi } from "./api/staffs";
import todoReducer from "./todoSlice";

export const store = configureStore({
  reducer: {
    [positionsApi.reducerPath]: positionsApi.reducer,
    [staffsApi.reducerPath]: staffsApi.reducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      positionsApi.middleware,
      staffsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
