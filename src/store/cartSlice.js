
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.find(i => i.key === item.key);
      if (existing) {
        existing.qty += 1;
      } else {
        state.push({ ...item, qty: 1 });
      }
    },

    
    removeFromCart: (state, action) =>
      state.filter(item => item.key !== action.payload),

    updateQty: (state, action) => {
      const { key, qty } = action.payload;
      const found = state.find(i => i.key === key);
      if (found && qty > 0) {
        found.qty = qty;
      }
    },

    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
