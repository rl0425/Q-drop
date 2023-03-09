import { configureStore } from '@reduxjs/toolkit';
import categorySlice from "./category-slice";

const store = configureStore({
    reducer: { category: categorySlice.reducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export default store;
