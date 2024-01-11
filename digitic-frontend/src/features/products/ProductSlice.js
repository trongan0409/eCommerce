import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./ProductService";

export const getAllProducts = createAsyncThunk('product/get', async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToWishlist = createAsyncThunk('product/wishlist', async (prodId, thunkAPI) => {
    try {
        return await productService.addToWishlist(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAProduct = createAsyncThunk('product/getAProduct', async (id, thunkAPI) => {
    try {
        return await productService.getSingleProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const productState = {
    product: [],
    isErr: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const productSlice = createSlice({
    name: 'product',
    initialState: productState,
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isErr = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isErr = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addToWishlist.pending, (state) => {
            state.isLoading = true
        }).addCase(addToWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isErr = false;
            state.isSuccess = true;
            state.addToWishlist = action.payload;
            state.message = 'Product added to Wishlist!';
        }).addCase(addToWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isErr = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getAProduct.pending, (state) => {
            state.isLoading = true
        }).addCase(getAProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isErr = false;
            state.isSuccess = true;
            state.singleProduct = action.payload;
            state.message = 'Product fetched successfully!';
        }).addCase(getAProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isErr = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default productSlice.reducer;