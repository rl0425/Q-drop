import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:'category',
    initialState: {
        open : false
    },
    reducers: {
        changeOpen(state,action){
            state.open = action.payload.open
        }
    }
})

export const categoryActions = categorySlice.actions;
export default categorySlice
