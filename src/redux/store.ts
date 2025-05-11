import {configureStore} from '@reduxjs/toolkit';

import {productSlice} from './reducers/productSlice';
import cartReducer from '../redux/reducers/cartSlice';

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    cart: cartReducer,
    
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
