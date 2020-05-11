const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://10.10.13.239:9090',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        })
    );
};