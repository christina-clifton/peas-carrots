import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const signIn = (user) => {
        setUser(user)
    }

    const signOut = () => {
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, signIn, signOut }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}