import { createContext } from "react";

export const AuthContext = createContext({
    userId: '',
    username: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null
});