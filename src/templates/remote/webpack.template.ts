import { camelCase } from "../../utils/camelCase";

export const createRemoteWebpackConfig = (obj: {name: string; entry: string, url: string}) => `
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  entry: '${obj.entry}',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: ${new URL(obj.url).port},
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: '${obj.name}',
      filename: 'remoteEntry.js',
      exposes: {
        './${camelCase(obj.name)}': './src/${camelCase(obj.name)}.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
`