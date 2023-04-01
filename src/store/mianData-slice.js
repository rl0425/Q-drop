import { createSlice } from "@reduxjs/toolkit";

const mainDataSlice = createSlice({
    name:'mainData',
    initialState: {
        index:0,
        entry:true,
        categoryData:[],
        subCategoryList:[],
        reloadSwitch:false,
        contentList:null,
        profile:{}
    },
    reducers: {
        handleIndex(state,action){
            state.index = action.payload.index
            state.entry = action.payload.entry
        },
        handleSubCategory(state,action){
            state.subCategoryList = action.payload.subCategoryList
        },
        handleContent(state,action){
            state.contentList = action.payload.contentList
        },
        handleProfile(state,action){
            state.profile = action.payload.profile
        },
        handleReload(state,action){
            state.reloadSwitch = !state.reloadSwitch
        },
        addCategoryData(state,action){
            state.categoryData = action.payload.data
        }
    }
})

export const mainDataActions = mainDataSlice.actions;
export default mainDataSlice
