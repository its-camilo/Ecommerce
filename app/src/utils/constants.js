export const ENV = {
  API_URL: 'https://organic-xylophone-w4x4p9v7q7xhgj9r-1337.app.github.dev/api',
  //http://127.0.0.1:1337/api (local)
  //http://172.18.0.2:1337/api (container)
  //http://168.176.25.36:1337/api u
  //http://192.168.10.32:1337/api casa
  //https://organic-xylophone-w4x4p9v7q7xhgj9r-1337.app.github.dev/api codespaces
  ENDPOINTS: {
    REGISTER: 'auth/local/register',
    LOGIN: 'auth/local',
    USERS_ME: 'users/me',
    USERS: 'users',
    ADDRESSES: 'addresses',
    HOME_BANNERS: 'home-banners',
    PRODUCTS: 'products',
  },
  STORAGE: {
    TOKEN: 'token',
    SEARCH_HISTORY: 'search-history',
  },
};
