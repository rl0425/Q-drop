import { createSlice } from "@reduxjs/toolkit";

const writeSlice = createSlice({
    name:'write',
    initialState: {
        open: false,
        categoryOpen: false,
        id:null
    },
    reducers: {
        handleOpen(state,action){
            state.open = action.payload.open
        },
        handleCategoryOpen(state,action){
            state.categoryOpen = action.payload.categoryOpen
        },
        handleSetId(state,action){
            state.id = action.payload.id
        },
    }
})

export const writeActions = writeSlice.actions;
export default writeSlice
