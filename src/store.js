import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState : 'kim'
})

export const store = configureStore({
    reducer: {
        user : user.reducer
    },
});