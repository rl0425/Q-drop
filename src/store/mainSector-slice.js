import { createSlice } from "@reduxjs/toolkit";

const mainSectorSlice = createSlice({
    name:'sector',
    initialState: {
        type:"home"
    },
    reducers: {
        changeSector(state,action){
            state.type = action.payload.type
        }
    }
})

export const mainSectorActions = mainSectorSlice.actions;
export default mainSectorSlice
