const Koa = require('koa');
const KoaRouter = require('koa-router');
const body = require('./middlewares/body');
const koaJwt = require('koa-jwt');
const KoaStaticCache = require('koa-static-cache');
const contollers = require('./middlewares/contollers');

const app = new Koa();
const router = new KoaRouter();

app.use(KoaStaticCache('./public', {
    gzip: true,
    dynamic: true
}));

app.use(koaJwt({ secret: 'milk' }).unless({
    path: [/^\/register/, /^\/login/]
}));

router.post('/register/checkName', body(), contollers.registerCheckName);
router.post('/register', body(), contollers.registerCheckName, contollers.register);
router.post('/login', body(), contollers.login);

router.post('/getPhotos', contollers.getPhotos);
router.post('/upLoad', body('./public/upLoad'), contollers.upLoad);

app.use(router.routes());

app.listen(8080);