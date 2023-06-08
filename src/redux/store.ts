import { configureStore } from '@reduxjs/toolkit';
import commonSlice from '@/redux/slices/commonSlice';

const store = configureStore({
    reducer: {
        common: commonSlice,
    },
});

export default store;
