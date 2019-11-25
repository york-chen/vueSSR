const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
module.exports = merge(base, {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, '../src/server.js')
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, "../dist"),
        filename: '[name].js'
    },
    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.(css|scss|vue)$/
    }),
    plugins: [
        new VueSSRServerPlugin()
    ]
});