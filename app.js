const Koa = require('koa');
const KoaRouter = require('koa-router');
const body = require('./middlewares/body');
const KoaStaticCache = require('koa-static-cache');

const app = new Koa();
const router = new KoaRouter();

app.use(KoaStaticCache('./public', {
    gzip: true,
    dynamic: true
}));

router.post('/upLoad', body('./public/upLoad'), ctx => {
    ctx.body = {
        state: 1,
        data: '上传成功'
    }
});

app.use(router.routes());

app.listen(8080);