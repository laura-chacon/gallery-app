const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    inject: 'body'
});

module.exports = (env) => {

    const envKeys = Object.keys(env).reduce((acc, key) => {
        acc[`process.env.${key}`] = JSON.stringify(env[key]);
        return acc;
    }, {});

    return {
        entry: {
            app: './src/index.js'
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve('./public'),
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                }]
            }]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        performance: { hints: false },
        plugins: [
            HtmlWebpackPluginConfig,
            new webpack.DefinePlugin(envKeys),
        ]
    };
};
