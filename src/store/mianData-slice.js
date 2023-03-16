import { createSlice } from "@reduxjs/toolkit";

const mainDataSlice = createSlice({
    name:'mainData',
    initialState: {
        index:0,
        entry:true,
        categoryData:[],
        subCategoryList:[]
    },
    reducers: {
        changeIndex(state,action){
            state.index = action.payload.index
            state.entry = action.payload.entry
        },
        changeSubCategory(state,action){
            state.subCategoryList = action.payload.subCategoryList
        },
        addCategoryData(state,action){
            state.categoryData = action.payload.data
        }
    }
})

export const mainDataActions = mainDataSlice.actions;
export default mainDataSlice
