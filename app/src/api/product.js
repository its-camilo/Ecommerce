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

async function getProductById(id) {
  try {
    const populateFilter = `populate=*`;

    // First try with the provided ID (could be numeric ID or documentId)
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}/${id}?${populateFilter}`;
    const response = await fetch(url);

    if (response.status === 200) {
      return await response.json();
    }

    // If that fails and the ID is numeric, try to find the product by numeric ID
    // and then fetch using its documentId
    if (response.status === 404 && !isNaN(id)) {
      // Get all products and find the one with matching numeric ID
      const allProductsUrl = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${populateFilter}`;
      const allProductsResponse = await fetch(allProductsUrl);

      if (allProductsResponse.status === 200) {
        const allProductsData = await allProductsResponse.json();
        const targetProduct = allProductsData.data.find(
          product => product.id === parseInt(id)
        );

        if (targetProduct) {
          // Return the product data directly since we already have it with populate
          return { data: targetProduct };
        }
      }
    }

    // If all attempts fail, throw the original error
    throw response;
  } catch (error) {
    throw error;
  }
}

export const productCtrl = {
  getLatestPublished,
  search: searchProduct,
  getById: getProductById,
};
