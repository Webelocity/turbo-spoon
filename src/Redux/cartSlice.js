import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.products.find(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.variation_id === action.payload.variation_id
      );
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
      } else {
        state.products.push({
          ...action.payload,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.variation_id === action.payload.variation_id
      );
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.variation_id === action.payload.variation_id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.products.filter(
        (item) =>
          !(
            (item.product_id ===
              action.payload.product_id) &
            (item.variation_id ===
              action.payload.variation_id)
          )
      );

      state.products = removeItem;
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;
