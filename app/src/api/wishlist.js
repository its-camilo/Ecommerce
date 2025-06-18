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
    const populateFilter = `populate=*`;
    const filters = `${filterUser}&${filterProduct}&${populateFilter}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${filters}`;
    console.log('Check wishlist URL:', url);

    const response = await authFetch(url);
    if (!response.ok) throw response;

    const result = await response.json();
    console.log('Check wishlist result:', result);

    if (size(result.data) === 0) return false;

    const foundItem = result.data[0];
    console.log('Found wishlist item:', foundItem);
    return foundItem;
  } catch (error) {
    console.error('Error in checkWishlist:', error);
    throw error;
  }
}

async function deleteWishlist(userId, productId) {
  try {
    console.log('Attempting to delete from wishlist:', { userId, productId });
    const dataFound = await checkWishlist(userId, productId);
    console.log('Found wishlist item for deletion:', dataFound);

    if (dataFound) {
      // En la nueva versión de Strapi, usar documentId si está disponible, sino usar id
      const itemId = dataFound.documentId || dataFound.id;
      console.log('Using ID for deletion:', itemId);

      if (!itemId) {
        console.error('No valid ID found in wishlist item:', dataFound);
        throw new Error('No valid ID found for deletion');
      }

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${itemId}`;
      console.log('Delete URL:', url);

      const params = {
        method: 'DELETE',
      };

      const response = await authFetch(url, params);
      console.log('Delete response status:', response.status);

      if (response.ok) {
        console.log('Successfully deleted from wishlist');
        return true;
      } else if (response.status === 404) {
        // El item ya no existe, consideramos esto como éxito
        console.log('Item already deleted (404), considering as success');
        return true;
      } else {
        const errorText = await response.text();
        console.error('Delete response error:', response.status, errorText);
        throw new Error(
          `Delete failed with status ${response.status}: ${errorText}`
        );
      }
    } else {
      console.log('No wishlist item found to delete');
      return false;
    }
  } catch (error) {
    console.error('Error in deleteWishlist:', error);
    throw error;
  }
}

export const wishlistCtrl = {
  add: addWishlist,
  check: checkWishlist,
  delete: deleteWishlist,
};
