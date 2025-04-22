import {useState, useEffect, createContext} from 'react';
import {storageCtrl, userCtrl} from "../api"
import { finishScreenTransition } from 'react-native-reanimated';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const {children} = props;

    useEffect(() => {
        recoverySession();
    }, [])

    const recoverySession = async () => {
        try {
            const token = await storageCtrl.getToken();
            console.log('recoverySession', token);
        } catch (error) {
            console.error(error);
        }
    }

    const login = async (token) => {
        try {
            //console.log('login', token);
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