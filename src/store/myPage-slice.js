import { createSlice } from "@reduxjs/toolkit";

const myPageSlice = createSlice({
    name:'myPage',
    initialState: {
        termsOpen : false,
        writtenOpen : false,
        favoriteOpen : false,
        withdrawalOpen : false,
        withdrawalReason :{
            open: false,
            reason: ""
        },
        category : []
    },
    reducers: {
        changeTermsOpen(state,action){
            state.termsOpen = action.payload.termsOpen
        },
        changeWrittenOpen(state,action){
            state.writtenOpen = action.payload.writtenOpen
        },
        changeFavoriteOpen(state,action){
            state.favoriteOpen = action.payload.favoriteOpen
        },
        changeWithdrawalOpen(state,action){
            state.withdrawalOpen = action.payload.withdrawalOpen
        },
        changeWithdrawalReason(state,action){
            state.withdrawalReason = {
                open: action.payload.open,
                reason: action.payload.reason
            }
        },
        addCategory(state,action){
            state.category = [...state.category, {id:action.payload.id, data:action.payload.data}]
        }
    }
})

export const myPageActions = myPageSlice.actions;
export default myPageSlice
