const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}
// vue.config.js
module.exports = {
  lintOnSave: true,
  configureWebpack: {
    chainWebpack: config => {
      config.plugin("copy").tap(([pathConfigs]) => {
        pathConfigs.unshift({
          from: "config",
          to: "config"
        });
        return [pathConfigs]})
    },
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        assets: resolveSrc('src/assets')
      }
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },
};
