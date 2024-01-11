import axios from "axios";
import { base_url, config, userId } from "../../utils/AxiosConfig";

const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
        return response.data;
    }
}

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data) {
        if (response.data) {
            localStorage.setItem("customer", JSON.stringify(response.data));
            setTimeout(() => {
                window.location.href = window.location.origin
            }, 500)
        }
        return response.data;
    }
}
const logOut = async () => {
    localStorage.setItem("customer", null);
    localStorage.setItem("token", null);
    return
}

const getUserWishlist = async (id) => {
    const response = await axios.get(`${base_url}user/wishlist/${id._id}`, { headers: config });
    if (response.data) {
        return response.data;
    }
}

const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}user/cart`, { cartData, userId }, { headers: config });
    if (response.data) {
        return response.data;
    }
}

const getCart = async () => {
    const response = await axios.get(`${base_url}user/cart/${userId._id}`, { headers: config });
    if (response.data) {
        return response.data;
    }
}

const removeCart = async () => {
    const response = await axios.delete(`${base_url}user/empty-cart/${userId._id}`, { headers: config });
    if (response.data) {
        return response.data;
    }
}

const removeProductFromCart = async (id) => {
    const response = await axios.delete(`${base_url}user/delete-product-cart/${userId._id}/${id}`, { headers: config });
    if (response.data) {
        return response.data;
    }
}

const updateProductFromCart = async (cartDetail) => {
    const response = await axios.delete(`${base_url}user/update-product-cart/${userId._id}/${cartDetail.cartItemId}/${cartDetail.quantity}`, { headers: config });
    if (response.data) {
        return response.data;
    }
}

const
    createOrder = async (orderDetail) => {
        const response = await axios.post(`${base_url}user/cart/create-order`, { orderDetail, userId }, { headers: config });
        if (response.data) {
            return response.data;
        }
    }

const getOrders = async () => {
    const response = await axios.get(`${base_url}user/get-orders/${userId._id}`, { headers: config });
    if (response.data) {
        return response.data;
    }
}

export const authService = {
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeCart,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    logOut,
    getOrders
}