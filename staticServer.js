const Koa = require('koa');
const http = require('http');
const proxy = require('koa-server-http-proxy');
const KoaStaticCache = require('koa-static-cache');
const app = new Koa();

app.use(KoaStaticCache('./public', {
    gzip: true,
    dynamic: true
}));

// 服务器代理转发
app.use(proxy('/api', {
    target: 'http://127.0.0.1:3000',
    pathRewrite: {
        '^/api': ''
    }
}))

app.listen(8080);