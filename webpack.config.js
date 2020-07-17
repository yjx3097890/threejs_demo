const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'ThreeJS App',
      template: './public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/threejs/libs',
          to: path.resolve(__dirname, 'dist/libs')
        }
      ]
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,  // paths contain / on Unix systems and \ on Windows
          name: false, // webpack5 改了
          chunks: 'all',
        },
      },
    },
    moduleIds: 'hashed',
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(glb|gltf|png|svg|jpg|gif)$/i,
        use: [
          'file-loader',
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'Three': path.resolve(__dirname, 'src/threejs'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
