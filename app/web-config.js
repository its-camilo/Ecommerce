// This file configures Expo Router for web deployment
export const webConfig = {
  basePath:
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/Ecommerce')
      ? '/Ecommerce'
      : '',
};

// Set the base path for web routing
if (
  typeof window !== 'undefined' &&
  window.location.pathname === '/Ecommerce'
) {
  // Redirect to the app root if landing on just /Ecommerce
  window.history.replaceState(null, '', '/Ecommerce/');
}
