import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState: {
        postOpen : false,
        id:null
    },
    reducers: {
        changePostOpen(state,action){
            state.postOpen = action.payload.open
            state.id = action.payload.id
        }
    }
})

export const modalActions = modalSlice.actions;
export default modalSlice
