'use strict';

// const ExtractTextPlugin             = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const HtmlWebpackPlugin             = require('html-webpack-plugin');
const path                          = require('path');
const preprocess                    = require('preprocess');
const webpack                       = require('webpack');
const WebpackFilePreprocessorPlugin = require('webpack-file-preprocessor-plugin');
const CopyWebpackPlugin             = require('copy-webpack-plugin');

const devtool            = 'source-map';
const preprocessContext  = {
    ts : Date.now()
};

const entry = {
    index : [
        'babel-polyfill',
        path.resolve(__dirname, 'src/app.module.js')
    ]
};

const modules = {
    rules : [
        {
            test : /src.*\.js$/,
            use  : [
                {
                    loader : 'ng-annotate-loader'
                },
                {
                    loader : 'babel-loader'
                }
            ]
        },
        {
            test : /src.*\.(scss|sass)$/,
            use : [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            // ASSET LOADER
            // Reference: https://github.com/webpack/file-loader
            // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
            // Rename the file using the asset hash
            // Pass along the updated reference to your code
            // You can add here any file extension you want to get copied to your output
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        }, {
            // HTML LOADER
            // Reference: https://github.com/webpack/raw-loader
            // Allow loading html through js
            test: /\.html$/,
            loader: 'raw-loader'
        }
    ]
};

const plugins = [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),

    new HtmlWebpackPlugin({
        hash     : true,
        inject   : 'body',
        template : './src/public/index.html'
    }),

    new WebpackFilePreprocessorPlugin({
        pattern : /index\.html$/,
        process : (source) => preprocess.preprocess(source.toString(), preprocessContext)
    }),

    new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
    }])
];

const resolve = {
    alias            : {
        common : path.resolve(__dirname, 'src/modules/common'),
        pages  : path.resolve(__dirname, 'src/pages')
    },
    descriptionFiles : ['package.json'],
    modules          : ['node_modules']
};

const optimization = {
    splitChunks: {
        cacheGroups: {
            // Automatically move all modules defined outside of application directory to vendor bundle.
            vendor: {
                chunks: "initial",
                test: path.resolve(__dirname, "node_modules"),
                name: "vendor",
                enforce: true
            }
        }
    }
};

module.exports = {
    devtool,
    entry,
    module : modules, // Set to not conflict with module from module.exports,
    plugins,
    resolve,
    optimization
};