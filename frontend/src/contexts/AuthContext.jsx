import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: "" });
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("auth"));
        if (data) {
            setAuth({ user: data?.user, token: data?.token });
        }
    }, []);
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };