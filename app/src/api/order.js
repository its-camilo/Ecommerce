import { authFetch } from '../lib';
import { ENV } from '../utils';

async function getAll(userId) {
  try {
    const userFilter = `filters[user][id][$eq]=${userId}`;
    const sortFiler = `sort[0]=createdAt:desc`;
    const filters = `${userFilter}&${sortFiler}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDERS}?${filters}`;
    const response = await authFetch(url);

    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function createOrder(orderData) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    };

    const response = await authFetch(url, params);
    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const orderCtrl = {
  getAll,
  create: createOrder,
};
