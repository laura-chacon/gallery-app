const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
 template: './public/index.html', // archivo de nuestra vista
 inject: 'body' // donde insertaremos nuestro script
})

const config = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('./public'),
  },

  module: {
    rules: [{
      test: /\.js$/, // include .js files
      exclude: /node_modules/, // exclude any and all files in the node_modules folder
      use: [{
        loader: "babel-loader",
      }]
    }]
  },
  resolve: {
      extensions: ['.js', '.jsx']
  },
  plugins: [HtmlWebpackPluginConfig] // configuración de nuestra vista
};

module.exports = config;
