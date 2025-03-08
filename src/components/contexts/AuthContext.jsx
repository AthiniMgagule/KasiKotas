import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        emailVerified: localStorage.getItem('emailVerified') === 'true',
        token: localStorage.getItem('authToken') || null
    });

    const updateAuthState = (updates) =>{
        setAuthState(prev=> ({
            ...prev,
            ...updates
        }));

        if(updates.emailVerified !== undefined){
            localStorage.setItem('emailVerified', updates.emailVerified);
        }
    };

    const value = {
        authState,
        updateAuthState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}