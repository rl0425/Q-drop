import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name:'toast',
    initialState: {
        msg:"",
        open:false
    },
    reducers: {
        handleToastOpt(state,action){
            state.msg = action.payload.msg
            state.open = action.payload.open
        }
    }
})

export const toastActions = toastSlice.actions;
export default toastSlice
