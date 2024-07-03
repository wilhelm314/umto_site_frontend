import React, { createContext, useContext } from "react";
import { user } from '../components/strapi/strapi_entries'


export const AuthContext = createContext<{
    user: undefined | user,
    isLoading: boolean,
    setUser: any
}>({
    user: undefined,
    isLoading: false,
    setUser: (user: any) => { },
});

export const useAuthContext = () => useContext(AuthContext);