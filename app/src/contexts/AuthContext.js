import {useState, useEffect, createContext} from 'react';
import {storageCtrl, userCtrl} from "../api"

export const AuthContext = createContext();

export function AuthProvider(props) {
    const {children} = props;

    useEffect(() => {
        retrieveSession();
    }, [])

    const retrieveSession = async () => {
        const token = await storageCtrl.getToken();
    }

    const login = async (token) => {
        try {
            console.log('login', token);
            await storageCtrl.setToken(token);
            const response = await userCtrl.getMe(token);
            console.log('response', response);
        } catch (error) {
            console.error(error);
        }
    }

    const data = {
        user : null,
        login,
        //login: () => console.log('login'),
        logout: () => console.log('logout'),
        updateUser: () => console.log('updateUser'),
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}