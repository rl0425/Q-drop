import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'search',
    initialState: {
        open:false,
        type:"home"
    },
    reducers: {
        changeOpen(state,action){
            state.open = action.payload.open
        }
    }
})

export const searchActions = searchSlice.actions;
export default searchSlice
