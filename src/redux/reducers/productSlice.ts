import {
  createSlice,
  createSelector,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {fetchCategories, fetchProducts} from '../actions/ProductAction';
import {RootState} from '../store';

type RequestState = 'pending' | 'fulfilled' | 'rejected';

const initialState = {
  Categories: [],
  products: [],
  status: 'idle',
  error: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = productSlice.actions;

export const selectCategories = (state: RootState) => state.product.Categories;

export const selectProducts = (state: RootState) => state.product.products;

export default productSlice.reducer;
