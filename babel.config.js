module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugins: ['babel-plugin-reanimated'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
