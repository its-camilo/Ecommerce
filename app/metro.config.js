const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración optimizada para web y GitHub Pages
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.assetExts.push('db');

// Configuración para GitHub Pages
if (process.env.NODE_ENV === 'production') {
  config.transformer.publicPath = '/Ecommerce/_expo/static/js/web/';
}

module.exports = config;
