import { createSlice } from "@reduxjs/toolkit";

const myPageSlice = createSlice({
    name:'myPage',
    initialState: {
        termsOpen : false,
        writtenOpen : false,
        category : []
    },
    reducers: {
        changeTermsOpen(state,action){
            state.termsOpen = action.payload.termsOpen
        },
        changeWrittenOpen(state,action){
            state.writtenOpen = action.payload.writtenOpen
        },
        addCategory(state,action){
            state.category = [...state.category, {id:action.payload.id, data:action.payload.data}]
        }
    }
})

export const myPageActions = myPageSlice.actions;
export default myPageSlice