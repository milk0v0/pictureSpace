const Koa = require('koa');
const http = require('http');
const KoaStaticCache = require('koa-static-cache');
const app = new Koa();

app.use(KoaStaticCache('./public', {
    gzip: true,
    dynamic: true
}));

app.use(ctx => {
    // 如果由 /api 开头的，就走这里的逻辑
    const { url, method, headers } = ctx;
    if (url.startsWith('/api')) {
        let data;
        const options = {
            protocol: 'http:',
            hostname: '127.0.0.1',
            port: 3000,
            path: url.replace(/^\/api/, ''),
            method,
            headers,
        }
        const req = http.request(options, res => {
            console.log(1);
            res.on('data', chunk => {
                data += chunk;
                console.log(`BODY: ${chunk}`);
            })
            res.on('end', () => {
                console.log('完成');
            })
        })
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });
        req.end();
        // console.log(data);
        // ctx.body = data
    }
});

app.listen(8080);