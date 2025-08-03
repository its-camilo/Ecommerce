import { ENV } from '../utils';
import { retryHandler } from '../utils';

async function register(email, username, password) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REGISTER}`;

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    };

    const response = await fetch(url, params);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function login(email, password) {
  return await retryHandler.executeWithRetry(
    async () => {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOGIN}`;

      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      };

      const response = await fetch(url, params);

      // Obtener el texto de la respuesta para debugging
      const responseText = await response.text();

      if (response.status !== 200) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = {
            message: responseText || `Server error ${response.status}`,
          };
        }

        // ...existing code...

        // Crear mensaje específico para error 500
        let errorMessage =
          errorData.error?.message ||
          errorData.message ||
          `Server error ${response.status}`;

        if (response.status === 500) {
          errorMessage = `Error del servidor Strapi (500): ${errorMessage}. Verifica que el servidor esté funcionando correctamente.`;
        }

        // Agregar el status al error para que pueda ser usado en el frontend
        const error = new Error(errorMessage);
        error.status = response.status;
        error.details = errorData;
        throw error;
      }

      return JSON.parse(responseText);
    },
    'iniciar sesión',
    retryHandler.getConfigForOperation('auth')
  );
}

export const authCtrl = {
  register,
  login,
};
