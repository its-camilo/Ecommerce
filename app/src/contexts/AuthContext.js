import { useState, useEffect, createContext } from 'react';
import { storageCtrl, userCtrl } from '../api';
import { fn } from '../utils';

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveSession();
  }, []);

  const retrieveSession = async () => {
    try {
      const token = await storageCtrl.getToken();

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      if (fn.hasTokenExpired(token)) {
        logout();
        setLoading(false);
      } else {
        await login(token);
      }
    } catch (error) {
      // En caso de cualquier error, hacer logout por seguridad
      await logout();
      setLoading(false);
    }
  };

  const login = async token => {
    try {
      await storageCtrl.setToken(token);
      const response = await userCtrl.getMe();

      setUser(response);
      setLoading(false);
    } catch (error) {
      // Si hay error al obtener usuario (ej: 401), hacer logout automático
      if (
        error.message?.includes('Authentication expired') ||
        error.message?.includes('401')
      ) {
        await logout();
      }
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await storageCtrl.removeToken();
      setUser(null);
      if (
        typeof window === 'undefined' ||
        (typeof navigator !== 'undefined' &&
          navigator.product === 'ReactNative')
      ) {
        const Toast = require('react-native-root-toast');
        Toast.show('👋 Sesión cerrada', {
          position: Toast.positions.CENTER,
          backgroundColor: '#2196F3',
          textColor: '#fff',
        });
      }
    } catch (error) {}
  };

  const updateUser = (key, values) => {
    // setUser({
    //     ...user,
    //     [key]: values,
    // })

    setUser(prevState => ({
      ...prevState,
      [key]: values,
    }));
  };

  const data = {
    user,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
