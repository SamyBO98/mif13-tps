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
      //new MyAwesomeWebpackPlugin()
    ],
  },
};
