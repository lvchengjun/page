const proxy = require('http-proxy-middleware');
console.log(proxy)
module.exports = function(app) {
    app.use(
        '/api',
        proxy.createProxyMiddleware({
            target: 'https://radar.qq.com/fanya/dev/',
            changeOrigin: true,
            // headers: {
            //     Host: 'https://radar.qq.com/',
            //     staffname: 'yuntian'
            // }
        })
    ),
    app.use(
        '/funya',
        proxy.createProxyMiddleware({
            target: 'https://funya-serverless-1f98mnu6953da42.service.tcloudbase.com/',
            changeOrigin: true,
            // headers: {
            //     Host: 'https://radar.qq.com/',
            //     staffname: 'yuntian'
            // }
        })
    )
}