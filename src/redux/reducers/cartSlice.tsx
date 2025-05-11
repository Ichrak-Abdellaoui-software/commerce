import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Un tableau d'articles dans le panier
  },
  reducers: {
    addItem: (state, action) => {
      // Ajouter un article au panier
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // Supprimer un article du panier en fonction de son ID ou d'autres critères
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: state => {
      // Vider complètement le panier
      state.items = [];
    },
  },
});

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
