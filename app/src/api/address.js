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
    console.log('Getting address by ID:', addressId);

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
    console.log('Get address URL:', url);

    const response = await authFetch(url);

    if (response.status !== 200) throw response;
    const result = await response.json();
    console.log('Get address result:', result);

    return result.data;
  } catch (error) {
    console.error('Error in getAddressById:', error);
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
    console.log('Updating address:', address, 'with data:', data);

    // En la nueva versión de Strapi, usar documentId si está disponible, sino usar id
    const addressId = address.documentId || address.id;
    console.log('Using ID for update:', addressId);

    if (!addressId) {
      console.error('No valid ID found in address:', address);
      throw new Error('No valid ID found for update');
    }

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
    console.log('Update URL:', url);

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
    console.error('Error in updateAddress:', error);
    throw error;
  }
}

async function deleteAddress(address) {
  try {
    console.log('Attempting to delete address:', address);

    // En la nueva versión de Strapi, usar documentId si está disponible, sino usar id
    const addressId = address.documentId || address.id;
    console.log('Using ID for deletion:', addressId);

    if (!addressId) {
      console.error('No valid ID found in address:', address);
      throw new Error('No valid ID found for deletion');
    }

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
    console.log('Delete URL:', url);

    const params = {
      method: 'DELETE',
    };

    const response = await authFetch(url, params);
    console.log('Delete response status:', response.status);

    if (response.ok) {
      console.log('Successfully deleted address');
      // Verificar si la respuesta tiene contenido antes de parsear JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          return await response.json();
        } catch (jsonError) {
          // Si hay error al parsear JSON, pero la respuesta fue exitosa, devolver true
          console.log(
            'Response was successful but no valid JSON, returning success'
          );
          return true;
        }
      } else {
        // No hay contenido JSON, operación exitosa
        return true;
      }
    } else if (response.status === 404) {
      // El item ya no existe, consideramos esto como éxito
      console.log('Address already deleted (404), considering as success');
      return true;
    } else {
      const errorText = await response.text();
      console.error('Delete response error:', response.status, errorText);
      throw new Error(
        `Delete failed with status ${response.status}: ${errorText}`
      );
    }
  } catch (error) {
    console.error('Error in deleteAddress:', error);
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
