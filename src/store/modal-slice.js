import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState: {
        postOpen : false,
        id: null,
        detailOpen : false,
        dataId: null
    },
    reducers: {
        changePostOpen(state,action){
            state.postOpen = action.payload.open
            state.id = action.payload.id
        },
        changeDetailOpen(state,action){
            state.detailOpen = action.payload.open
            state.dataId = action.payload.dataId
        }
    }
})

export const modalActions = modalSlice.actions;
export default modalSlice
