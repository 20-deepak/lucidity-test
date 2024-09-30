import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalProducts: 0,
  totalStoreValue: 0,
  outOfStock: 0,
  numCategories: 0,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setInventory: (state, action) => {
      const data = action.payload;
      state.products = data;
      state.totalProducts = data.length;
      state.totalStoreValue = data.reduce(
        (acc, product) => acc + (parseInt(product?.value?.split("$")[1]) || 0),
        0
      );
      state.outOfStock = data.filter(
        (product) => product.quantity === 0
      ).length;
      state.numCategories = new Set(
        data.map((product) => product.category)
      ).size;
    },
    editProduct: (state, action) => {
      const { updatedProduct } = action.payload;
      const index = state.products.findIndex(
        (product) => product.name === updatedProduct.name
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
        state.totalStoreValue = state.products.reduce(
          (acc, product) =>
            acc + (parseInt(product?.value?.split("$")[1]) || 0),
          0
        );
      }
    },
    deleteProduct: (state, action) => {
      const name = action.payload;
      state.products = state.products.filter(
        (product) => product.name !== name
      );
      state.totalProducts--;
      state.totalStoreValue = state.products.reduce(
        (acc, product) => acc + (parseInt(product?.value?.split("$")[1]) || 0),
        0
      );
      state.outOfStock = state.products.filter(
        (product) => product.quantity === 0
      ).length;
      state.numCategories = new Set(
        state.products.map((product) => product.category)
      ).size;
    },
    disableProduct: (state, action) => {
      const name = action.payload;
      const index = state.products.findIndex(
        (product) => product.name === name
      );
      if (index !== -1) {
        state.products[index].disabled = !state.products[index].disabled;
      }
    },
  },
});

export const { setInventory, editProduct, deleteProduct, disableProduct } =
  inventorySlice.actions;
export default inventorySlice.reducer;
