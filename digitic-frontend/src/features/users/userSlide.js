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
            if (state.isSuccess === true) {
                toast.info('User created successfully!');
            }
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isErr = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isErr === true) {
                toast.error(action.error);
            }
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    localStorage.setItem('token', action.payload.token);
                    toast.info('User Logged In successfully!');
                }
            }).addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isErr === true) {
                    toast.error(action.error);
                }
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
                if (state.isErr === true) {
                    toast.error(action.error);
                }
            }).addCase(addProductToCart.pending, (state) => {
                state.isLoading = true
            }).addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Product added to Cart!')
                }
            }).addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isErr === true) {
                    toast.error(action.error);
                }
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
            }).addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true
            }).addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.deletedCartProduct = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Product deleted from Cart successfully!');
                }
            }).addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.success('Something went wrong!');
                }
            }).addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true
            }).addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
                if (state.isSuccess === true) {
                    toast.success(`Product's Quantity updated from Cart successfully!`);
                }
            }).addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.success('Something went wrong!');
                }
            }).addCase(createAnOrder.pending, (state) => {
                state.isLoading = true
            }).addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isErr = false;
                state.isSuccess = true;
                state.orderedProduct = action.payload;
                if (state.isSuccess === true) {
                    toast.success(`Ordered successfully!`);
                }
            }).addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isErr = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.success('Something went wrong!');
                }
            })
    }
})

export default authSlice.reducer;