// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: "node",
    mode: 'development',
    entry: {
        // Fichier d'entrée
        client: './app.js'
    },
    output: {
        // Fichier de sortie: sera utilisé pour la page
        path: path.resolve(__dirname, './dist'),
        filename: './index.js'
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        // jquery plugin
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, './node_modules')],
        /*fallback: {
            'path': false,
            'util': false,
            'stream': false,
            'buffer': false,
            'http': false,
            'net': false,
            'crypto': false,
            'zlib': false
        }*/
    }
};
