import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "https://growthx-9jmo.onrender.com"; // Render backend URL for local use port 4000

    // Initialize state from localStorage
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [email, setEmail] = useState(localStorage.getItem("email") || "");

    // Sync token with localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // Sync email with localStorage
    useEffect(() => {
        if (email) {
            localStorage.setItem("email", email);
        } else {
            localStorage.removeItem("email");
        }
    }, [email]);

    const contextValue = {
        url,
        token,
        setToken,
        email,
        setEmail
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;