const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración optimizada para web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.assetExts.push('db');

module.exports = config;
