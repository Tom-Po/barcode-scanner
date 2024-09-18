import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
export type TodoType = {
  id: string;
  title: string;
  // TODO for now
  content: string;
  createdAt: Date;
  dueDate: Date;
  color: "green" | "yellow" | "red";
  urgency: "urgent" | "common";
};

interface TodoState {
  todos: TodoType[];
}

const initialState = {
  todos: [
    {
      id: "XXXXX test ID",
      title: "Test todo title",
      content: "Test todo",
      color: "green",
      urgency: "common",
      createdAt: new Date(),
      dueDate: new Date(),
    },
    {
      id: "YYYYYY test ID",
      title: "Test todo title",
      content: "Test todo",
      color: "green",
      urgency: "urgent",
      createdAt: new Date(),
      dueDate: new Date(),
    },
  ],
} satisfies TodoState as TodoState;

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoType>) {
      state.todos = [...state.todos, action.payload];
    },
    removeTodo(state, action: PayloadAction<TodoType>) {
      state.todos = [
        ...state.todos.filter((todo) => todo.id !== action.payload.id),
      ];
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => state.products;

export default todoSlice.reducer;
