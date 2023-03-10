import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:'category',
    initialState: {
        open : false,
        category : []
    },
    reducers: {
        changeOpen(state,action){
            state.open = action.payload.open
        },
        addCategory(state,action){
            state.category = [...state.category, {id:action.payload.id, data:action.payload.data}]
        }
    }
})

export const categoryActions = categorySlice.actions;
export default categorySlice
