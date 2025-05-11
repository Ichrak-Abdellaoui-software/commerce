import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../consts';

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, {rejectWithValue}) => {
    const response = await fetch(`${BASE_URL}/products?limit=20`);
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    console.log('data', data);
    return data;
  },
);
