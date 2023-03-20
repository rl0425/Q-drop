import { configureStore } from '@reduxjs/toolkit';
import categorySlice from "./category-slice";
import modalSlice from "./modal-slice";
import mainDataSlice from "./mianData-slice";
import mainSectorSlice from "./mainSector-slice";
import searchSlice from "./search-slice";
import myPageSlice from "./myPage-slice";

const store = configureStore({
    reducer: {
        category: categorySlice.reducer, 
        modal: modalSlice.reducer,
        main: mainDataSlice.reducer,
        sector: mainSectorSlice.reducer,
        search: searchSlice.reducer,
        myPage: myPageSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export default store;
