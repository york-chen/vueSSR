const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let envType = process.env.ENV_TYPE;
module.exports = {
    context: path.resolve(__dirname, '..'),
    mode: envType === 'development'?'development':'production',
    entry: {
        vendor1: ['vue', 'vue-router','axios', 'vue-axios', 'vuex','qs','dayjs'],
        vendor2: ['element-ui'],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "static/js/[name].[chunkHash].js",
        library: "[name]",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(ttf|woff|eot)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(envType==='development'?'development':'production')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkHash].css'
        }),
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', "[name]-manifest.json"),
            name: "[name]"
        }),
        new HtmlWebpackPlugin({
            filename: 'html/template.html',
            template: 'index.html',
            inject: 'body'
        }),
    ]
};