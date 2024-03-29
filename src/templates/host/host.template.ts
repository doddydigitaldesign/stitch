export const createHostWebpackConfig = (obj: {
  name: string;
  remotes: string;
}) => `
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
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
      remotes: {${obj.remotes.split(",").reduce((acc, curr) => {
        const [key, value] = curr.split("@");

        return `${acc}
        "${key}": "${key}@${value}/remoteEntry.js",
        `;
      }, "")}},
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
`;
