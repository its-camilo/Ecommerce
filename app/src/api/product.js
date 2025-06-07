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

async function searchProduct(text) {
  try {
    const encodedText = encodeURIComponent(text);
    const orFilter = `filters[$or][0][title][$contains]=${encodedText}&filters[$or][1][tags][$contains]=${encodedText}&filters[$or][2][characteristics][$contains]=${encodedText}`;
    const pagination = `pagination[limit]=100`;
    const populate = `populate=*`;
    const filters = `${orFilter}&${pagination}&${populate}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${filters}`;

    const response = await fetch(url);
    if (response.status !== 200) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const productCtrl = {
  getLatestPublished,
  search: searchProduct,
};
