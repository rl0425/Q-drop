import { createSlice } from "@reduxjs/toolkit";

const myPageSlice = createSlice({
    name:'myPage',
    initialState: {
        termsOpen : false,
        category : []
    },
    reducers: {
        changeTermsOpen(state,action){
            state.termsOpen = action.payload.termsOpen
        },
        addCategory(state,action){
            state.category = [...state.category, {id:action.payload.id, data:action.payload.data}]
        }
    }
})

export const myPageActions = myPageSlice.actions;
export default myPageSlice
