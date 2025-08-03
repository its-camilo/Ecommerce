import { authFetch } from '../lib';
import { ENV } from '../utils';

async function getAllAddresses(userId) {
  try {
    const filters = `filters[user][id][$eq]=${userId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}?${filters}`;

    const response = await authFetch(url);

    if (response.status !== 200) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getAddressById(addressId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
    const response = await authFetch(url);
    if (response.status !== 200) throw response;
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
}

async function createAddress(userId, data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}`;

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          ...data,
          user: userId,
        },
      }),
    };

    const response = await authFetch(url, params);

    if (response.status !== 200 && response.status !== 201) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function updateAddress(address, data) {
  try {
    // En la nueva versión de Strapi, usar documentId si está disponible, sino usar id
    const addressId = address.documentId || address.id;
    if (!addressId) {
      throw new Error('No valid ID found for update');
    }
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    };
    const response = await authFetch(url, params);
    if (response.status !== 200 && response.status !== 201) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function deleteAddress(address) {
  try {
    // En la nueva versión de Strapi, usar documentId si está disponible, sino usar id
    const addressId = address.documentId || address.id;
    if (!addressId) {
      throw new Error('No valid ID found for deletion');
    }
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
    const params = {
      method: 'DELETE',
    };
    const response = await authFetch(url, params);
    if (response.ok) {
      // Verificar si la respuesta tiene contenido antes de parsear JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          return await response.json();
        } catch (jsonError) {
          // Si hay error al parsear JSON, pero la respuesta fue exitosa, devolver true
          return true;
        }
      } else {
        // No hay contenido JSON, operación exitosa
        return true;
      }
    } else if (response.status === 404) {
      // El item ya no existe, consideramos esto como éxito
      return true;
    } else {
      const errorText = await response.text();
      throw new Error(
        `Delete failed with status ${response.status}: ${errorText}`
      );
    }
  } catch (error) {
    throw error;
  }
}

export const addressCtrl = {
  getAll: getAllAddresses,
  get: getAddressById,
  create: createAddress,
  update: updateAddress,
  delete: deleteAddress,
};
