const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const app = new Koa();

app.use(KoaStaticCache('./public', {
    gzip: true,
    dynamic: true
}));

app.listen(8080);