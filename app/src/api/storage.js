import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../utils';

async function setToken(token) {
  await AsyncStorage.setItem(ENV.STORAGE.TOKEN, token);
}

async function getToken() {
  return await AsyncStorage.getItem(ENV.STORAGE.TOKEN);
}

async function removeToken() {
  await AsyncStorage.removeItem(ENV.STORAGE.TOKEN);
}

async function clearAuthSession() {
  try {
    await AsyncStorage.removeItem(ENV.STORAGE.TOKEN);
  } catch (error) {}
}

async function testServerConnection() {
  try {
    const response = await fetch(`${ENV.API_URL.replace('/api', '')}`);
    if (response.ok) {
      return { status: 'ok', message: 'Servidor accesible' };
    } else {
      return {
        status: 'error',
        message: `Servidor respondió con status ${response.status}`,
      };
    }
  } catch (error) {
    return { status: 'error', message: 'No se pudo conectar al servidor' };
  }
}

async function checkStrapiHealth() {
  try {
    const baseUrl = ENV.API_URL.replace('/api', '');
    // Intentar acceder a la raíz del servidor
    const response = await fetch(baseUrl);
    if (response.ok) {
      return { status: 'healthy', message: 'Strapi está funcionando' };
    } else {
      return {
        status: 'unhealthy',
        message: `Strapi error: ${response.status}`,
      };
    }
  } catch (error) {
    return { status: 'unreachable', message: 'No se pudo conectar con Strapi' };
  }
}

export const storageCtrl = {
  setToken,
  getToken,
  removeToken,
  clearAuthSession,
  testServerConnection,
  checkStrapiHealth,
};
