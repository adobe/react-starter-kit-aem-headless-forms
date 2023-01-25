const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const path = require('path');
require('dotenv').config({ path: './.env' });

const basicAuthHeader = () => {
    if (process.env.AEM_USERNAME && process.env.AEM_PASSWORD) {
        const credentialsString = process.env.AEM_USERNAME + ":" + process.env.AEM_PASSWORD
        return {'authorization': 'Basic ' + Buffer.from(credentialsString).toString('base64')}
    } else {
        return {};
    }
}

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
                '/adobe': {
                    target: process.env.AEM_URL,
                    secure: false,
                    changeOrigin: true,
                    bypass: function (req, res, proxyOptions) {
                        req.headers = {
                            ...req.headers,
                            ...basicAuthHeader()
                        };
                    }
                },
                '/content': {
                    target: process.env.AEM_URL,
                    secure: false,
                    changeOrigin: true,
                    bypass: function (req, res, proxyOptions) {
                        req.headers = {
                            ...req.headers,
                            ...basicAuthHeader()
                        };
                    }
                }
            },
            headers : {
                ...basicAuthHeader()
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
