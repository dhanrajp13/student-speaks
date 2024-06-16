import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const Layout = () => {
    return (
        <div>
            <AuthProvider>
                <Header />
                <Outlet />
            </AuthProvider>
        </div>
    );
};

export default Layout;
