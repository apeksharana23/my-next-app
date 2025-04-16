"use client";

import { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthTheme({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}
