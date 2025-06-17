import { size } from 'lodash';
import { authFetch } from '../lib';
import { ENV } from '../utils';

async function addWishlist(userId, productId) {
  try {
    console.log('Adding to wishlist:', {
      userId,
      productId,
      userType: typeof userId,
      productType: typeof productId,
    });

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
    console.log('Request body:', params.body);
    const response = await authFetch(url, params);
    if (!response.ok) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function checkWishlist(userId, productId) {
  try {
    console.log('Checking wishlist:', { userId, productId });

    const filterUser = `filters[user][id][$eq]=${userId}`;
    const filterProduct = `filters[product][documentId][$eq]=${productId}`;
    const filters = `${filterUser}&${filterProduct}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${filters}`;
    console.log('Check wishlist URL:', url);
    const response = await authFetch(url);
    if (!response.ok) throw response;
    const result = await response.json();
    console.log('Check wishlist result:', result);
    if (size(result.data) === 0) return false;
    return result.data[0];
  } catch (error) {
    throw error;
  }
}

async function deleteWishlist(userId, productId) {
  try {
    const dataFound = await checkWishlist(userId, productId);
    if (dataFound) {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${dataFound.id}`;
      const params = {
        method: 'DELETE',
      };
      const response = await authFetch(url, params);
      if (!response.ok) throw response;
      return true;
    }
  } catch (error) {
    throw error;
  }
}

export const wishlistCtrl = {
  add: addWishlist,
  check: checkWishlist,
  delete: deleteWishlist,
};
