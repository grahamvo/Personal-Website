const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const jsPath = path.resolve(__dirname, 'src/js');
const buildPath = path.resolve(__dirname, 'build');
const srcPath = path.resolve(__dirname, 'src');

const plugins = [
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
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/views/index.tmpl.html'),
        path: buildPath,
        filename: 'index.html',
        chunksSortMode: 'none',
        favicon: path.resolve(__dirname, 'public/images/favicon.png'),
        minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
        },
        hash: true,
    }),
    new MiniCSSExtractPlugin({
        filename: 'style-[hash].css',
    }),
    new OptimizeCSSAssetsPlugin({}),
    new WebpackNotifierPlugin(),
];

module.exports = {
    mode: 'production',
    devtool: 'cheap-source-map',
    entry: {
        app: path.resolve(jsPath, './index.js'),
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: buildPath,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash:8].[ext]',
                        },
                    },
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
                                optimizationLevel: 3,
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
                    name: '[name].[hash].[ext]',
                },
            },
        ],
    },
    cache: false,
    bail: true,
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/js/components/'),
            SCSS: path.resolve(__dirname, 'src/scss/'),
            Icons: path.resolve(__dirname, 'public/icons/'),
            Images: path.resolve(__dirname, 'public/images/'),
            Fonts: path.resolve(__dirname, 'public/fonts/'),
            SVG: path.resolve(__dirname, 'public/svg/'),
        },
        extensions: ['.js', '.json', '.jsx'],
    },
    plugins,
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        noEmitOnErrors: true,
        concatenateModules: true,
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    ie8: false,
                    ecma: 8,
                    parallel: true,
                    compress: false,
                    mangle: true,
                },
                exclude: [/\.min\.js$/gi],
            }),
        ],
    },
};
