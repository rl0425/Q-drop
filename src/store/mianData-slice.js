import { createSlice } from "@reduxjs/toolkit";

const mainDataSlice = createSlice({
    name:'mainData',
    initialState: {
        index:0,
        entry:true
    },
    reducers: {
        changeIndex(state,action){
            state.index = action.payload.index
            state.entry = action.payload.entry
        },
        addCategory(state,action){
            state.category = [...state.category, {id:action.payload.id, data:action.payload.data}]
        }
    }
})

export const mainDataActions = mainDataSlice.actions;
export default mainDataSlice
