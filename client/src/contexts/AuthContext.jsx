import { createContext, useContext } from "react";

import usePersistedState from "../hooks/usePersistedState.js";

export const AuthContext = createContext({
    userId: '',
    username: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    isAdmin: false,
    changeAuthState: (authState = {}) => null,
    logout: () => null
});

export function AuthContextProvider(props) {
    const [authState, setAuthState] = usePersistedState('auth', {});

    const changeAuthState = (state) => {
        setAuthState(state);
    };

    const logout = () => {
        setAuthState(null);
    }

    const contextData = {
        userId: authState?._id,
        username: authState?.username,
        email: authState?.email,
        accessToken: authState?.accessToken,
        isAuthenticated: !!authState?.email,
        isAdmin: authState?.isAdmin,
        changeAuthState,
        logout
    };

    return(
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
};

export function useAuthContext() {
    const authData = useContext(AuthContext);

    return authData;
}