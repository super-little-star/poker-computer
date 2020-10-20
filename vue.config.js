const path = require("path");
module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/main.scss";'
      }
    }
  },
  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".json", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components"),
        "@v": path.resolve(__dirname, "./src/views"),
        "@s": path.resolve(__dirname, "./src/styles"),
        "@u": path.resolve(__dirname, "./src/utils"),
        // eslint-disable-next-line prettier/prettier
        "vue": "vue/dist/vue.js"
      }
    };
  }
};
