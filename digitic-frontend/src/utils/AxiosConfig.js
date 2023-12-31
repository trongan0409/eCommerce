export const API_SERVER = 'http://localhost:5000';
export const base_url = API_SERVER + '/api/';

export const getTokenFromLocalStorage = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

export const config = {
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage || ""}`,
        Accept: "application/json",
    },
};

export const userId = localStorage.getItem('customer')
    ? JSON.parse(localStorage.getItem('customer'))
    : null;