const Koa = require('koa');
const KoaRouter = require('koa-router');
const body = require('./middlewares/body');
const koaJwt = require('koa-jwt');
const contollers = require('./middlewares/contollers');

const app = new Koa();
const router = new KoaRouter();

// 跨域解决方案1: CORS
// app.use(async (ctx, next) => {
//     ctx.set({
//         'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
//         'Access-Control-Allow-Headers': 'Authorization',
//         'Access-Control-Expose-Headers': 'Authorization'
//     });
//     if(ctx.method === 'OPTIONS') {
//         ctx.set('Access-Control-Request-Method', 'POST');
//         return ctx.body = ''
//     }
//     await next();
// });

app.use(koaJwt({ secret: 'milk' }).unless({
    path: [/^\/register/, /^\/login/]
}));

router.post('/register/checkName', body(), contollers.registerCheckName);
router.post('/register', body(), contollers.registerCheckName, contollers.register);
router.post('/login', body(), contollers.login);

router.post('/getPhotos', contollers.getPhotos);
router.post('/upLoad', body('./public/upLoad'), contollers.upLoad);

app.use(router.routes());

app.listen(3000);