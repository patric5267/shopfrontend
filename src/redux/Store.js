import { configureStore } from "@reduxjs/toolkit";
import { authreducers } from '../redux/authreducers'

export const store = configureStore({
    reducer:{
        auth:authreducers
    }
})