import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from "../api/todosApi.js";
import { logout } from "./authSlice.js";
export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    return await getAllTodos();
  },
);

export const addTodoAsync = createAsyncThunk("todos/addTodo", async (text) => {
  return createTodo(text);
});

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, done }) => {
    return updateTodoStatus(id, done);
  },
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodo",
  async (id) => {
    await deleteTodo(id);
    return id;
  },
);

//todosSlice
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    //basic functions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      })

      .addCase(logout, (state) => {
        state.items = [];
        state.status = "idle";
        state.error = null;
      });
  },
});

export default todosSlice.reducer;
