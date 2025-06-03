import { ENV } from '../utils';

async function getLatestPublished(limite = 20) {
  try {
    const sortFilter = `sort=publishedAt:desc`;

    const paginationFilter = `pagination[limit]=${limite}`;

    const populateFilter = `populate=*`;

    const filters = `${sortFilter}&${paginationFilter}&${populateFilter}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${filters}`;

    const response = await fetch(url);

    if (response.status !== 200) throw response;
    return await response.json();
  } catch (error) {
    console.error('Error fetching latest published products:', error);
    throw error;
  }
}

export const productCtrl = {
  getLatestPublished,
};
