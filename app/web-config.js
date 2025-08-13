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

// --- GitHub Pages navigation fix -------------------------------------------------
// We are using React Navigation route names (tabRoot/homeRoot/home, etc.) inside
// an Expo Router container. When React Navigation updates the URL on web it
// produces paths without the repository subdirectory (e.g. /tabRoot/homeRoot/home),
// which breaks refreshing on GitHub Pages (needs /Ecommerce/ prefix). Here we
// monkey‑patch history.pushState / replaceState so every internal navigation
// stays under /Ecommerce and the verbose home path collapses to the clean root.
if (typeof window !== 'undefined') {
  const BASE = '/Ecommerce';

  const normalize = url => {
    if (typeof url !== 'string') return url;
    // Strip any origin
    try {
      // If it's an absolute URL, convert to path
      const u = new URL(url, window.location.origin);
      if (u.origin === window.location.origin)
        url = u.pathname + u.search + u.hash;
    } catch (_) {}

    // Collapse internal verbose home route
    if (url === '/tabRoot/homeRoot/home' || url === '/tabRoot/homeRoot/home/') {
      url = '/';
    }

    // Ensure leading slash
    if (!url.startsWith('/')) url = '/' + url;

    // Ensure base prefix
    if (!url.startsWith(BASE)) {
      url = BASE + (url === '/' ? '/' : url);
    }

    // Always ensure trailing slash for the root only
    if (url === BASE) url = BASE + '/';

    return url;
  };

  ['pushState', 'replaceState'].forEach(method => {
    const original = history[method];
    history[method] = function (state, title, url) {
      const newUrl = normalize(url);
      return original.call(this, state, title, newUrl);
    };
  });

  // On initial load, normalize current URL if needed (e.g. /Ecommerce/tabRoot/homeRoot/home)
  const current =
    window.location.pathname + window.location.search + window.location.hash;
  const fixed = normalize(current);
  if (fixed !== current) {
    window.history.replaceState(null, '', fixed);
  }
}
// -------------------------------------------------------------------------------
