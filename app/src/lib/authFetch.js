import { storageCtrl } from '../api/storage';
import { fn } from '../utils';
import { serverErrorTracker } from '../utils/server-error-tracker';

export async function authFetch(url, params) {
  const token = await storageCtrl.getToken();

  const logout = async () => {
    await storageCtrl.removeToken();
  };

  if (!token) {
    logout();
    return Promise.reject('No token found');
  } else {
    if (fn.hasTokenExpired(token)) {
      logout();
      return Promise.reject('Token expired');
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, paramsTemp);
        // Si recibimos un 401 (Unauthorized), eliminar el token automáticamente
        if (response.status === 401) {
          await logout();
          throw new Error('Authentication expired - token removed');
        }
        // Si recibimos un 500, registrar el error pero no eliminar el token
        if (response.status === 500) {
          // Trackear el error para detectar problemas sistémicos
          const errorStatus = serverErrorTracker.trackError(500);
          if (errorStatus.isSystemicIssue) {
            // ...existing code...
          }
          // Clonar la respuesta para poder leer el error sin afectar el stream original
          try {
            const responseClone = response.clone();
            const errorText = await responseClone.text();
            // ...existing code...
          } catch (e) {
            // ...existing code...
          }
        } else {
          // Si no es un error 500, trackear para reiniciar contador si es necesario
          serverErrorTracker.trackError(response.status);
        }
        return response;
      } catch (error) {
        // ...existing code...
        // Si es un error de red y contiene 401, también limpiar
        if (error.message?.includes('401')) {
          await logout();
        }
        throw error;
      }
    }
  }
}
