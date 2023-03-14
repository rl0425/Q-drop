import { configureStore } from '@reduxjs/toolkit';
import categorySlice from "./category-slice";
import modalSlice from "./modal-slice";
import mainDataSlice from "./mianData-slice";

const store = configureStore({
    reducer: { category: categorySlice.reducer , modal: modalSlice.reducer, main: mainDataSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export default store;
