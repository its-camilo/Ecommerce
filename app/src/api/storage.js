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
    console.log('🧹 Sesión de autenticación limpiada');
  } catch (error) {
    console.error('Error al limpiar sesión:', error);
  }
}

async function testServerConnection() {
  try {
    console.log('🔍 Probando conexión al servidor...');
    const response = await fetch(`${ENV.API_URL.replace('/api', '')}`);
    console.log('📡 Server response status:', response.status);

    if (response.ok) {
      console.log('✅ Servidor accesible');
      return { status: 'ok', message: 'Servidor accesible' };
    } else {
      console.log('❌ Servidor no disponible');
      return {
        status: 'error',
        message: `Servidor respondió con status ${response.status}`,
      };
    }
  } catch (error) {
    console.error('❌ Error de conectividad:', error);
    return { status: 'error', message: 'No se pudo conectar al servidor' };
  }
}

async function checkStrapiHealth() {
  try {
    console.log('🏥 Verificando salud del servidor Strapi...');
    const baseUrl = ENV.API_URL.replace('/api', '');

    // Intentar acceder a la raíz del servidor
    const response = await fetch(baseUrl);

    if (response.ok) {
      console.log('✅ Strapi está funcionando');
      return { status: 'healthy', message: 'Strapi está funcionando' };
    } else {
      console.log('⚠️ Strapi respondió con error:', response.status);
      return {
        status: 'unhealthy',
        message: `Strapi error: ${response.status}`,
      };
    }
  } catch (error) {
    console.error('❌ No se pudo verificar Strapi:', error);
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
