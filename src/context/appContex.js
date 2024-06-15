"use client"
import { createContext, useContext } from "react";

const defaultValues = {
    theme: "  "
}

// const appCtx = createContext(defaultValues)
const appCtx = createContext(defaultValues)

export const useAppCtx = ()=>{
    return useContext(appCtx)
}

// provide the value to the context
export const AppContextProvider = ({children}) =>{
    return <appCtx.Provider value={defaultValues}>
        {children}
    </appCtx.Provider>
}