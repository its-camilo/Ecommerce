const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración para todas las plataformas
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.assetExts.push('db');

module.exports = config;
