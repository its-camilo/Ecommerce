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

      console.log('🔗 Intentando login en:', url);
      console.log('📤 Datos enviados:', { identifier: email, password: '***' });

      const response = await fetch(url, params);

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      // Obtener el texto de la respuesta para debugging
      const responseText = await response.text();
      console.log('📄 Response body:', responseText);

      if (response.status !== 200) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = {
            message: responseText || `Server error ${response.status}`,
          };
        }

        console.error('❌ Login error details:', errorData);

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
