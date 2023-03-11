import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:'subCategory',
    initialState: {
        activeCategory : []
    },
    reducers: {
        addCategory(state,action){
            state.activeCategory = [...state.category, {id:action.payload.id, data:action.payload.data}]
        },
        setCategory(state,action){
            state.activeCategory = action.payload.category
        },
    }
})

export const categoryActions = categorySlice.actions;
export default categorySlice
