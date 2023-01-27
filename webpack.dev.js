const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const path = require('path');
require('dotenv').config({ path: './.env' });

const getAEMBasicAuth = () => {
    if (process.env.AEM_USERNAME && process.env.AEM_PASSWORD) {
        const credentialsString = process.env.AEM_USERNAME + ":" + process.env.AEM_PASSWORD
        return 'Basic ' + Buffer.from(credentialsString).toString('base64');
    } else {
        return "";
    }
}

const aemProxyReq = (proxyReq) => {
    console.log("inside proxy req");
    if (process.env.AEM_URL && proxyReq.getHeader("origin")) {
        console.log("setting new origin header");
        proxyReq.setHeader("origin", process.env.AEM_URL);
    }
    const authValue = getAEMBasicAuth()
    if (authValue) {
        console.log("setting authorization header");
        proxyReq.setHeader("authorization", authValue);
    }
};

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
                '/adobe': {
                    target: process.env.AEM_URL,
                    secure: false,
                    changeOrigin: true,
                    onProxyReq: aemProxyReq
                },
                '/content': {
                    target: process.env.AEM_URL,
                    secure: false,
                    changeOrigin: true,
                    onProxyReq: aemProxyReq
                }
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
