var webpack = require("webpack");

module.exports = {
  devServer: {
    port: 4000,
    proxy: {
      "/spring": {
        target: "http://192.168.75.118:8080/v1",
        changeOrigin: true,
        pathRewrite: {
          "^/spring": "",
        },
      },
      "/express": {
        target: "https://192.168.75.118/game/api",
        changeOrigin: true,
        pathRewrite: {
          "^/express": "",
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
  },
  pwa: {
    name: "GP17 MIF13",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/sw.js",
      // ...other Workbox options...
    },
  },
};
