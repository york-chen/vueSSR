const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const fs = require('fs');
let envType = process.env.ENV_TYPE;
let content = `let env = "${envType}";
export default env;`;
fs.writeFile('./src/config/env.js',content,function(err){
    if(err){
        throw err;
    }
});
module.exports = {
    mode: envType === 'development'?'development':'production', 
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.vue$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "vue-loader",
                // options for the loader
                options: {
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    },
                    loaders: {
                        js: 'happypack/loader?id=babel'
                    }
                }
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                // flags to apply these rules, even if they are overridden (advanced option)
                use: "happypack/loader?id=babel"
                // options for the loader
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                include: [
                    path.resolve(__dirname, "../src"),
                    path.resolve(__dirname, "../node_modules"),
                ],
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash].[ext]'
                }
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
        /* Advanced module configuration (click to show) */
        /*
        下面的配置只是为了让动态require 不报警告
         */
        // require
        // unknownContextRegExp: /$^/,
        unknownContextCritical: false,

        // require(expr)
        // exprContextRegExp: /$^/,
        exprContextCritical: false,

        // require("prefix" + expr + "surfix")
        // wrappedContextRegExp: /$^/,
        wrappedContextCritical: false
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            path.resolve(__dirname, "../src"),
            "node_modules"
        ],
        // directories where to look for modules
        extensions: [".js", ".vue"],
        // extensions that are used
        alias: {
            // a list of module name aliases
            "@": path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js',
            'element-ui$': 'element-ui/lib/index.js'
        }
        /* alternative alias syntax (click to show) */
        /* Advanced resolve configuration (click to show) */
    },
    devtool: "none", // enum  // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    context: path.resolve(__dirname, '../'), // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory
    target: "web", // enum  // the environment in which the bundle should run
    // lets you provide options for webpack-serve
    stats: "errors-only",  // lets you precisely control what bundle information gets displayed
    plugins: [
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['!static']}),
        // new BundleAnalyzerPlugin({analyzerPort: 8919}),
        new VueLoaderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'babel',
            //如何处理  用法和loader 的配置一样
            loaders: ['babel-loader?cacheDirectory=true'],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        })
    ]
};