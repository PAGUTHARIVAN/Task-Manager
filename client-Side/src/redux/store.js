import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice.js";
import authReducer from "./authSlice.js";
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer, //We register our slice here
  },
});
