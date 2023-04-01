import { createSlice } from "@reduxjs/toolkit";

const writeSlice = createSlice({
    name:'write',
    initialState: {
        open: false,
        categoryOpen: true
    },
    reducers: {
        handleOpen(state,action){
            state.open = action.payload.open
        },
        handleCategoryOpen(state,action){
            state.categoryOpen = action.payload.categoryOpen
        }
    }
})

export const writeActions = writeSlice.actions;
export default writeSlice
