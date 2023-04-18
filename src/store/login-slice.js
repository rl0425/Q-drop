import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:'login',
    initialState: {
        msg:"",
        open:false,
        temp:""
    },
    reducers: {
        handleOpen(state,action){
            state.open = action.payload.open
        },
        handleTempData(state,action){
            state.temp = action.payload.data
        }
    }
})

export const loginActions = loginSlice.actions;
export default loginSlice
