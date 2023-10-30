import React, { createContext, useState } from "react";

export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState('')

    const updateLoading = (newValue) => {
        setLoading(newValue)
    }
    const updateToken = (newValue) => {
        setToken(newValue)
    }
    return (
        <AppContext.Provider value={{ loading, updateLoading, token, updateToken }}>
            {children}
        </AppContext.Provider>
    )
}