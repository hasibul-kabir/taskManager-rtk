import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import filterReducer from "../features/filters/filterSlice";


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        filter: filterReducer
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware)
})

export default store