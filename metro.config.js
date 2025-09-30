const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isEager: true, // acelera builds locales
});

// Transformador para SVG
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// Resolver SVG
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

// No incluir opciones obsoletas
// watcher.unstable_lazySha1, watcher.unstable_workerThreads, watcher.unstable_autoSaveCache, server.forwardClientLogs

module.exports = withNativeWind(config, { input: './app/globals.css' });
