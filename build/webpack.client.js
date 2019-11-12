const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');

module.exports = merge(base, {
    entry: {
        client: path.resolve(__dirname, '../src/client.js')
    },
    output: {
        path: path.resolve(__dirname, "../dist"), // string
        filename: '[name].[hash].js', // string
        publicPath: "/", // string    // the url to the output directory resolved relative to the HTML page
        chunkFilename: "[name].[chunkhash:8].js",
    },
    devtool: "inline-source-map",
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '../', 'vendor1-manifest.json'))
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '..', 'vendor2-manifest.json'))
        }),
        new HtmlWebpackPlugin({
            title: '完美后台关系管理系统',
            filename: 'index.html',
            template: 'dist/html/template.html',
            inject: 'body'
        }),
    ]
});