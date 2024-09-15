import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ProductState {
  value: string[];
}

const initialState = {
  value: [],
} satisfies ProductState as ProductState;

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<string>) {
      state.value = [...state.value, action.payload];
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.value = [...state.value.filter((p) => p !== action.payload)];
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;
