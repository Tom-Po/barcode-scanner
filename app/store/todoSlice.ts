import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "./productSlice";
import { RootState } from "./store";
import { uuid } from "expo-modules-core";
export type TodoType = {
  id: string | number[];
  title: string;
  // TODO for now
  content: string;
  createdAt: Date;
  dueDate: Date;
  color: "green" | "yellow" | "red";
  urgency: "urgent" | "common";
  linkedProducts: ProductType[];
};

interface TodoState {
  todos: TodoType[];
}

const today = new Date();
const initialState = {
  todos: [
    {
      id: uuid.v4(),
      title: "C'est pas hyper important",
      content: "Test todo",
      color: "green",
      urgency: "common",
      createdAt: new Date(),
      dueDate: new Date(),
      linkedProducts: [],
    },
    {
      id: uuid.v4(),
      title: "C'est moyen important",
      content: "Test todo",
      color: "green",
      urgency: "common",
      createdAt: new Date(new Date().getDate() - 5),
      dueDate: new Date(),
      linkedProducts: [],
    },
    {
      id: uuid.v4(),
      title: "C'est gentillement important",
      content: "Test todo",
      color: "green",
      urgency: "common",
      createdAt: new Date(),
      dueDate: new Date(),
      linkedProducts: [],
    },
    {
      id: uuid.v4(),
      title: "C'est pas hyper important",
      content: "Test todo",
      color: "green",
      urgency: "common",
      createdAt: new Date(),
      dueDate: new Date(),
      linkedProducts: [],
    },
    {
      id: uuid.v4(),
      title: "C'est pas hyper important",
      content: "Test todo",
      color: "green",
      urgency: "common",
      createdAt: new Date(),
      dueDate: new Date(),
      linkedProducts: [],
    },
    {
      id: uuid.v4(),
      title: "C'est pas hyper important",
      content: "Test todo",
      color: "green",
      urgency: "common",
      createdAt: new Date(),
      dueDate: new Date(),
      linkedProducts: [],
    },
    {
      id: uuid.v4(),
      title: "C'est pas hyper important",
      content: "Test todo",
      color: "green",
      urgency: "common",
      createdAt: new Date(),
      dueDate: new Date(),
      linkedProducts: [],
    },
    {
      id: uuid.v4(),
      title: "Mega urgent Brioche pasquier à jeter demain",
      content: "Test todo",
      color: "green",
      urgency: "urgent",
      createdAt: new Date(),
      dueDate: new Date(today.setDate(today.getDate() - 2)),
      linkedProducts: [],
    },
    {
      id: uuid.v4(),
      title: "Rappeler à Nico d'acheter à manger",
      content: "Test todo",
      color: "green",
      urgency: "urgent",
      createdAt: new Date(),
      dueDate: new Date(),
      linkedProducts: [],
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
