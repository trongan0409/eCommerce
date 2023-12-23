import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/users/userSlide';
import productReducer from '../features/products/ProductSlice';
import blogReducer from '../features/Blogs/BlogSlide';
import contactReducer from '../features/contact/contactSlide';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer
  },
});
