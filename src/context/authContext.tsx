import React, { createContext, useContext } from "react";
import { user_entry } from '../components/strapi/strapi_entries'

export const AuthContext = createContext<{
    user: user_entry | undefined,
    token: string | null,
    isLoading: boolean,
    setToken: (token: null | string) => void
}>({
    user: undefined,
    token: null,
    isLoading: false,
    setToken: (token: null | string) => { }
});

export const useAuthContext = () => useContext(AuthContext);