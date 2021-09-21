import { configureStore } from "@reduxjs/toolkit";


import { cryptoApi } from '../components/services/cryptoApi';
import { cryptoNewsApi } from '../components/services/cryptoNewsApi';


export default configureStore({
    reducer: {
        [cryptoApi.reducerPath] : cryptoApi.reducer,
        [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer,
    },
});