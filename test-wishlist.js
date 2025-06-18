// Script de prueba para wishlist API
const ENV = {
  API_URL: "http://localhost:1337/api",
  ENDPOINTS: {
    WISHLIST: "wishlists",
    PRODUCTS: "products",
    AUTH: "auth/local",
  },
};

// Función auxiliar para hacer fetch con token
async function authFetch(url, params = {}) {
  // Para pruebas, necesitarías un token real
  // Por ahora solo probamos la estructura
  return fetch(url, {
    ...params,
    headers: {
      "Content-Type": "application/json",
      ...params.headers,
    },
  });
}

// Test de estructura de wishlist
async function testWishlistStructure() {
  try {
    console.log("Testing wishlist API structure...");

    // Solo probamos la estructura sin autenticación para ver el formato del error
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?populate=*`;
    console.log("Testing URL:", url);

    const response = await fetch(url);
    const result = await response.text();

    console.log("Response status:", response.status);
    console.log("Response:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Test de productos para verificar estructura de IDs
async function testProductStructure() {
  try {
    console.log("Testing product API structure...");

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?populate=*&pagination[limit]=1`;
    console.log("Testing URL:", url);

    const response = await fetch(url);
    const result = await response.json();

    console.log("Products response:", JSON.stringify(result, null, 2));

    if (result.data && result.data.length > 0) {
      const product = result.data[0];
      console.log("Sample product structure:");
      console.log("- ID:", product.id);
      console.log("- documentId:", product.documentId);
      console.log("- attributes:", Object.keys(product.attributes || {}));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Ejecutar pruebas
testProductStructure();
testWishlistStructure();
