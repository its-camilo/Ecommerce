import { ENV } from '../utils';
import { authFetch } from '../lib';
import { safeResponseHandler, retryHandler } from '../utils';

async function getMe() {
  return await retryHandler.executeWithRetry(
    async () => {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;
      const response = await authFetch(url);

      // Usar el handler seguro de respuestas
      await safeResponseHandler.handleResponse(
        response,
        'obtener información del usuario'
      );

      return await safeResponseHandler.readJson(response);
    },
    'obtener información del usuario',
    retryHandler.getConfigForOperation('user')
  );
}

async function updateUser(userId, formData) {
  return await retryHandler.executeWithRetry(
    async () => {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;

      const params = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };

      const response = await authFetch(url, params);

      // Usar el handler seguro de respuestas
      await safeResponseHandler.handleResponse(
        response,
        'actualizar el usuario'
      );

      const result = await safeResponseHandler.readJson(response);
      return result;
    },
    'actualizar usuario',
    retryHandler.getConfigForOperation('user')
  );
}

export const userCtrl = {
  getMe,
  update: updateUser,
};
