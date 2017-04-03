const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolveAPI = require('./config/resolveAPI');

module.exports = {
    context: path.resolve(__dirname, './client'),
    entry: {
        app: './client.jsx',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader?sourceMap',
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            __API__: JSON.stringify(resolveAPI())
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'client'),
            'node_modules'
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src')
    }
};
