import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:'login',
    initialState: {
        msg:"",
        open:false
    },
    reducers: {
        handleOpen(state,action){
            state.open = action.payload.open
        }
    }
})

export const loginActions = loginSlice.actions;
export default loginSlice
