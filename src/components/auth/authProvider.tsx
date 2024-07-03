import React, { ReactElement, useEffect, useState, ReactNode } from "react";
import { getToken, BEARER, api_adress } from "../strapi/strapi_interface";
import { AuthContext } from "../../context/authContext";

interface AuthProverProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProverProps> = ({ children }) => {
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const authToken = getToken();

    const fetchLoggedInUser = async (token: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${api_adress}/api/users/me`, {
                headers: { Authorization: `${BEARER} ${token}` },
            });
            const data = await response.json();

            setUserData(data);
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
        if (authToken) {
            fetchLoggedInUser(authToken);
        }
    }, [authToken]);

    return (
        <AuthContext.Provider
            value={{ user: userData, setUser: handleUser, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;