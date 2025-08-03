import { size } from 'lodash';
import { authFetch } from '../lib';
import { ENV } from '../utils';

async function addWishlist(userId, productId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          user: userId,
          product: productId, // Usar productId directamente como string (documentId)
        },
      }),
    };
    const response = await authFetch(url, params);
    if (!response.ok) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function checkWishlist(userId, productId) {
  try {
    const filterUser = `filters[user][id][$eq]=${userId}`;
    const filterProduct = `filters[product][documentId][$eq]=${productId}`;
    const populateFilter = `populate=*`;
    const filters = `${filterUser}&${filterProduct}&${populateFilter}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${filters}`;
    const response = await authFetch(url);
    if (!response.ok) throw response;
    const result = await response.json();
    if (size(result.data) === 0) return false;
    const foundItem = result.data[0];
    return foundItem;
  } catch (error) {
    throw error;
  }
}

async function deleteWishlist(userId, productId) {
  try {
    const dataFound = await checkWishlist(userId, productId);
    if (dataFound) {
      // En la nueva versión de Strapi, usar documentId si está disponible, sino usar id
      const itemId = dataFound.documentId || dataFound.id;
      if (!itemId) {
        throw new Error('No valid ID found for deletion');
      }
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${itemId}`;
      const params = {
        method: 'DELETE',
      };
      const response = await authFetch(url, params);
      if (response.ok) {
        return true;
      } else if (response.status === 404) {
        // El item ya no existe, consideramos esto como éxito
        return true;
      } else {
        const errorText = await response.text();
        throw new Error(
          `Delete failed with status ${response.status}: ${errorText}`
        );
      }
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

async function getAllProductWishlist(userId) {
  try {
    const filterUser = `filters[user][id][$eq]=${userId}`;
    const populateFilter = `populate[0]=product&populate[1]=product.main_image`;
    const filters = `${filterUser}&${populateFilter}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${filters}`;
    const response = await authFetch(url);
    if (!response.ok) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const wishlistCtrl = {
  add: addWishlist,
  check: checkWishlist,
  delete: deleteWishlist,
  getAllProducts: getAllProductWishlist,
};
