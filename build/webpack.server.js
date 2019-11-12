const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

module.exports = merge(base, {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, '../src/server.js')
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, "../dist"),
        filename: '[name].js'
    }
});