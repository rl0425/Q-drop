import { createSlice } from "@reduxjs/toolkit";

const myPageSlice = createSlice({
    name:'myPage',
    initialState: {
        termsOpen : false,
        category : []
    },
    reducers: {
        changeOpen(state,action){
            state.open = action.payload.open
        },
        addCategory(state,action){
            state.category = [...state.category, {id:action.payload.id, data:action.payload.data}]
        }
    }
})

export const myPageActions = myPageSlice.actions;
export default myPageSlice
