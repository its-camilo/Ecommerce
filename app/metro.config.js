const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración para todas las plataformas
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.assetExts.push('db');

// Configuración específica para web y GitHub Pages zi
if (process.env.NODE_ENV === 'production') {
  config.transformer.publicPath = '/Ecommerce/';
}

module.exports = config;
