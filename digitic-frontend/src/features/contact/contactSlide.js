import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from "react-toastify";

export const createQuery = createAsyncThunk('contact/post', async (contactData, thunkAPI) => {
    try {
        return await contactService.postQuery(contactData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const contactState = {
    contact: '',
    isErr: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState: contactState,
    extraReducers: (builder) => {
        builder.addCase(createQuery.pending, (state) => {
            state.isLoading = true
        }).addCase(createQuery.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isErr = false;
            state.isSuccess = true;
            state.contact = action.payload;
            if (state.isSuccess === true) {
                toast.success('Contact form submitted successfully!')
            }
        }).addCase(createQuery.rejected, (state, action) => {
            state.isLoading = false;
            state.isErr = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isErr === true) {
                toast.success('Something went wrong!')
            }
        })
    }
})

export default contactSlice.reducer;