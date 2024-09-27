import { fakeEAN13 } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "expo-modules-core";
import { RootState } from "./store";

interface ProductState {
  products: string[];
}

function generateProducts(iteration: number): ProductType[] {
  let products: ProductType[] = [];
  for (let i = 0; i < iteration; i++) {
    products.push({
      id: uuid.v4(),
      barcode: fakeEAN13().toString(),
      name: "Harrys Brioche",
    });
  }
  return products;
}
const productsInit = generateProducts(20);
console.debug(productsInit);
const productsInitEANs = productsInit.map((p) => p.barcode);

const initialState = {
  products: ["3057067573012", "3057067573012", "3057067573012"],
} satisfies ProductState as ProductState;

export type ProductType = {
  id: string | number[];
  name: string;
  barcode: string;
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<string>) {
      state.products = [...state.products, action.payload];
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = [...state.products.filter((p) => p !== action.payload)];
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;
