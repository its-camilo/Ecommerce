import {useState, useEffect, createContext} from 'react';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const {children} = props;

    const data = {
        user : null,
        login: () => console.log('login'),
        logout: () => console.log('logout'),
        updateUser: () => console.log('updateUser'),
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}