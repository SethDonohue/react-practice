require('dotenv').config();
const HTMLPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const { DefinePlugin, EnvironmentPlugin } =require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackConfig = module.exports = {};

webpackConfig.entry = `${__dirname}/src/main.js`;

webpackConfig.output = {
  filename: 'bundle.[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL, //TODO: ADD to .env
}

// TODO: ADD .env file

webpackConfig.plugins = [
  new HTMLPlugin({ //TODO: ADD to modules
    title: 'React Practice Setup',
  }),
  new EnvironmentPlugin(['NODE_ENV']),
  new DefinePlugin({
    API_URL: JSON.stringify(process.env.API_URL), //TODO: ADD to .env
  }),
  new ExtractTextPlugin({
    filename: 'bundle.[hash].css',
    disable: !PRODUCTION,
  })
]

webpackConfig.module = {
  rules: [
    {
      test: /\.(jpg|gif|png|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'image/[name].[hash].[ext]',
        },
      }],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader', //TODO: ADD babel-loader module
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({ //TODO: ADD extract-text-webpack-plugin
        fallback: 'style-loader',
        use: [
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [`${__dirname}/srcc/style`],
            },
          },
        ],
      }),
    },
  ],
};