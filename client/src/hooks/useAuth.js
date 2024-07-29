import { useContext } from "react";

import { login, register } from "../api/auth-api.js";
import { AuthContext } from "../contexts/AuthContext.js";

export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        const { password: _, ...authData } = await login(email, password);

        changeAuthState(authData);

        return authData;
    }

    return loginHandler;
};

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (username, email, password) => {
        const { password: _, ...authData } = await register(username, email, password);

        changeAuthState(authData);

        return authData;
    };

    return registerHandler;
}