const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const KoaStaticCache = require('koa-static-cache');

const app = new Koa();
const router = new KoaRouter();

app.use(KoaStaticCache('./public', {
    gzip: true,
    dynamic: true
}));

router.get('/test', ctx => {
    ctx.body = {
        state: 1,
        data: '成功'
    }
})

app.use(router.routes());

app.listen(8080);