const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const WebpackNotifierPlugin = require('webpack-notifier');

const srcPath = resolve(__dirname, 'src');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            resolve(__dirname, './src/js/index.js'),
        ],
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: '/',
        publicPath: '/',
        globalObject: 'this',
    },
    devServer: {
        hot: true,
        contentBase: '/',
        publicPath: '/',
        inline: true,
        port: 3000,
        historyApiFallback: true,
        stats: {
            colors: true,
        },
    },
    module: {
        rules: [
            {
                test: /(\.js$|\.jsx$)/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: './.eslintrc',
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: false,
                    },
                },
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg|mp4)$/i,
                loaders: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            gifsicle: {
                                interlaced: true,
                                optimizationLevel: 3,
                                colors: 256,
                            },
                            optipng: {
                                optimizationLevel: 1,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    mimetype: 'application/font-woff',
                    name: '[name].[ext]',
                },
            },
        ],
    },
    resolve: {
        alias: {
            Components: resolve(__dirname, 'src/js/components/'),
            SCSS: resolve(__dirname, 'src/scss/'),
            Icons: resolve(__dirname, 'public/icons/'),
            Images: resolve(__dirname, 'public/images/'),
            Fonts: resolve(__dirname, 'public/fonts/'),
            SVG: resolve(__dirname, 'public/svg/'),
        },
        modules: [
            'node_modules',
        ],
        extensions: ['.js', '.json', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'public/views/index.tmpl.html'),
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9',
                        ],
                    }),
                ],
                context: srcPath,
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackNotifierPlugin(),
    ],
    optimization: {
        nodeEnv: 'development',
        namedModules: true,
        concatenateModules: false,
        minimize: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                },
            },
        },
    },
};
