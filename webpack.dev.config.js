'use strict';

const config  = require('config');
const path    = require('path');
const url     = require('url');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin; // Hot reloading and inline style replacement

webpackConfig.devServer = {
    contentBase        : path.join(__dirname, 'dist'),
    hot                : true,
    compress           : true,
    port               : 8080
};

webpackConfig.devtool = 'inline-source-map';

webpackConfig.output = {
    filename   : '[name].min.js',
    path       : path.resolve(__dirname, 'dev'),
    publicPath : '/'
};

webpackConfig.plugins.push(new HotModuleReplacementPlugin());

module.exports = webpackConfig;