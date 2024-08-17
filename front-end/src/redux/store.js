import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./DataSlice";

const logger = (store) => (next) => (action) => {
    // console.log('dispatching', action);
    const result = next(action);
    // console.log('next state', store.getState());
    return result;
}

export const store = configureStore({
    reducer:{
        user: userSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});