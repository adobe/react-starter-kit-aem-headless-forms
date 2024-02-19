const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')
require('dotenv').config({ path: './.env' });
module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'AEM Forms - Sample',
            template: "public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'dist/[name].css',
        }),
        new webpack.DefinePlugin({
            process: {
                browser: true,
                env: {
                    USE_LOCAL_JSON: `'${process.env.USE_LOCAL_JSON}'`,
                    AEM_FORM_PATH: `'${process.env.AEM_FORM_PATH}'`,
                    AEM_USERNAME: `'${process.env.AEM_USERNAME}'`,
                    AEM_PASSWORD: `'${process.env.AEM_PASSWORD}'`,
                    AEM_URL: `'${process.env.AEM_URL}'`,
                    FORM_API: `'${process.env.FORM_API}'`
                }
            }
        }),
    ],
    resolve: {
        // Instead of manually specifying aliases for each dependency, you can rely on Webpack's built-in module resolution.
        //alias: {
        //    ...alias
        //},
        modules: [
            path.resolve(__dirname, 'node_modules'),
            'node_modules',
        ],
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
        //sourceMapFilename: `clientlib-forms-react/resources/[name].map[ext]` // uncomment for debugging
    }
};
