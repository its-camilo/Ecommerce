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

async function getOrderById(orderId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDERS}/${orderId}`;
    console.log('🔍 Fetching order:', url);

    const response = await authFetch(url);
    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Order fetch error:', errorText);

      // Handle 404 gracefully
      if (response.status === 404) {
        return null;
      }

      throw new Error(errorText || 'Order not found');
    }

    const data = await response.json();
    console.log('✅ Order data received:', data);
    return data;
  } catch (error) {
    console.error('🚨 getOrderById error:', error);
    throw error;
  }
}

export const orderCtrl = {
  getAll,
  create: createOrder,
  getById: getOrderById,
};
