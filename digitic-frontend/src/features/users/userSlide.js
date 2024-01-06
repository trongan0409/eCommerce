import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const logoutUser = createAsyncThunk('auth/logout', async (thunkAPI) => {
    try {
        return await authService.logOut()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserProductWishlist = createAsyncThunk('user/wishlist', async (id, thunkAPI) => {
    try {
        return await authService.getUserWishlist(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addProductToCart = createAsyncThunk('user/cart/add', async (cartData, thunkAPI) => {
    try {
        return await authService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserCart = createAsyncThunk('user/cart/get', async (thunkAPI) => {
    try {
        return await authService.getCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteUserCart = createAsyncThunk('user/cart/delete', async (thunkAPI) => {
    try {
        return await authService.removeCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCartProduct = createAsyncThunk('user/cart/product/delete', async (id, thunkAPI) => {
    try {
        return await authService.removeProductFromCart(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCartProduct = createAsyncThunk('user/cart/product/update', async (cartDetail, thunkAPI) => {
    try {
        return await authService.updateProductFromCart(cartDetail);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createAnOrder = createAsyncThunk('user/cart/create-order', async (orderDetail, thunkAPI) => {
    try {
        return await authService.createOrder(orderDetail);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrdersUser = createAsyncThunk('user/get-orders', async (thunkAPI) => {
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const getCustomerfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    isErr: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isErr = false;
            state.isSuccess = true;
            state.createdUser = action.payload;

        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isErr = true;
            state.isSuccess = false;
            state.message = action.error;

        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.user = action.payload;

            }).addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            ///
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.user = null;
            }).addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = '';
            })
            //
            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true
            }).addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.wishlistProducts = action.payload;
            }).addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;

            }).addCase(addProductToCart.pending, (state) => {
                state.isLoading = true
            }).addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;

            }).addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;

            }).addCase(getUserCart.pending, (state) => {
                state.isLoading = true
            }).addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
            }).addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isErr === true) {
                    toast.error(action.error);
                }
            }).addCase(deleteUserCart.pending, (state) => {
                state.isLoading = true
            }).addCase(deleteUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
            }).addCase(deleteUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isErr === true) {
                    toast.error(action.error);
                }
            }).addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true
            }).addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.deletedCartProduct = action.payload;
            }).addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true
            }).addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;

            }).addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;

            }).addCase(createAnOrder.pending, (state) => {
                state.isLoading = true
            }).addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.orderedProduct = action.payload;
            }).addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(getOrdersUser.pending, (state) => {
                state.isLoading = true
            }).addCase(getOrdersUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.listOrders = action.payload;
            }).addCase(getOrdersUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
})

export default authSlice.reducer;