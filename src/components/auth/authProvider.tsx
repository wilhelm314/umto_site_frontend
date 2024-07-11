import React, { ReactElement, useEffect, useState, ReactNode, useCallback } from "react";
import { BEARER, api_adress, AUTH_TOKEN } from "../strapi/strapi_interface";
import { AuthContext } from "../../context/authContext";
import { user_entry } from "../strapi/strapi_entries";

interface AuthProverProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProverProps> = ({ children }) => {
    const [userData, setUserData] = useState<user_entry | undefined>(undefined);
    const [token, setToken] = useState<string | null>(localStorage.getItem(AUTH_TOKEN));
    const [isLoading, setIsLoading] = useState(true);

    const fetchLoggedInUser = async (token: string) => {
        setIsLoading(true)
        try {
            const response = await fetch(`${api_adress}/api/users/me?populate[0]=profilePicture&populate[1]=projects&populate[2]=trophies`, {
                headers: { Authorization: `${BEARER} ${token}` },
            });
            const data = await response.json();
            //console.log(data);
            if (data.error) {
                setUserData(undefined)
            } else {
                setUserData(data);
            }


        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUser = (user: any) => {
        setUserData(user);
    };

    useEffect(() => {
        if (token)
            localStorage.setItem(AUTH_TOKEN, token);
        else
            localStorage.removeItem(AUTH_TOKEN);
        fetchLoggedInUser(token ?? '');
    }, [token]);



    return (
        <AuthContext.Provider value={{ token: token, user: userData, setToken: setToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;