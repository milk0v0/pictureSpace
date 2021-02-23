const path = require('path');
const model = require('./model');
const jwt = require('jsonwebtoken');

module.exports = {
    async registerCheckName(ctx, next) {
        const row = await model.queryUser(ctx.request.body.name);
        if (row.length) {
            ctx.body = {
                state: 2,
                data: '重复名字'
            }
        } else {
            ctx.body = {
                state: 1,
                data: '可以使用'
            }
            await next();
        }
    },
    async register(ctx) {
        const { name, pwd } = ctx.request.body;
        await model.register(name, pwd);
        ctx.body = {
            state: 1,
            data: '注册成功'
        }
    },
    async login(ctx) {
        console.log(1111);
        const { name, pwd } = ctx.request.body;
        const [row] = await model.queryUser(name);
        if (!row) {
            return ctx.body = {
                state: 2,
                data: '用户名错误'
            }
        }

        if (row.password !== pwd) {
            return ctx.body = {
                state: 2,
                data: '密码错误'
            }
        }

        ctx.set('Authorization', jwt.sign({ id: row.id }, 'milk'));
        ctx.body = {
            state: 1,
            data: row.name
        }
    },
    async getPhotos(ctx) {
        console.log('请求了');
        const { id } = ctx.state.user;

        if (!id) {
            return ctx.body = {
                state: 2,
                data: '非法密钥'
            }
        }

        let row = await model.getPhotos(id);
        row = row.map(item => 'upLoad/' + item.name)

        ctx.body = {
            state: 1,
            data: row
        }
    },
    async upLoad(ctx) {
        const { id } = ctx.state.user;

        if (!id) {
            return ctx.body = {
                state: 2,
                data: '非法密钥'
            }
        }

        const name = path.basename(ctx.request.files.file.path);
        await model.upLoad(name, id);

        ctx.body = {
            state: 1,
            data: 'upLoad/' + name
        }
    }
}