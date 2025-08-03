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
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    // Usar filtros como en getAll en lugar de URL directa, y agregar populate
    const orderFilter = `filters[id][$eq]=${orderId}`;
    const populateFilter = `populate=*`;
    const filters = `${orderFilter}&${populateFilter}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDERS}?${filters}`;

    console.log('🔍 Fetching order with URL:', url);
    const response = await authFetch(url);
    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      // Handle 404 gracefully - order not found
      if (response.status === 404) {
        console.log('❌ Order not found (404)');
        return null;
      }
      throw response;
    }

    const result = await response.json();
    console.log('✅ Order data received:', result);

    // Strapi devuelve un array con filtros, tomar el primer elemento si existe
    if (result.data && Array.isArray(result.data)) {
      return result.data.length > 0 ? { data: result.data[0] } : null;
    }

    return result;
  } catch (error) {
    console.log('💥 Error fetching order:', error);
    throw error;
  }
}
export const orderCtrl = {
  getAll,
  create: createOrder,
  getById: getOrderById,
};
