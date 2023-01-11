const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const path = require('path');
require('dotenv').config({ path: './.env' });

module.exports =
    merge(common, {
        mode: 'development',
        devtool: 'source-map',
        performance: {hints: 'warning'},
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            client: {
                overlay: false
            },
            open: true,
            hot: true,
            compress: true,
            port: 3000,
            proxy: {
                '/api': {
                    target: process.env.FORM_API,
                    pathRewrite: { '^/api': '' },
                },
            }
        },
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                generateStatsFile: true,
                openAnalyzer: false,
            })
        ],
    });
