
import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "../reducers2/reducers2"
import logger from "redux-logger";

export const appStore = configureStore(
    {
        reducer: {
            appReducer
        },
        
        middleware: () => {
            return [logger]
        }
    }
);