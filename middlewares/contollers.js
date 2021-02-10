const model = require('./model');

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
        const { name, pwd } = ctx.request.body;
        const [row] = await model.queryUser(name);
        if(!row) {
            return ctx.body = {
                state: 2,
                data: '用户名错误'
            }
        }

        if(row.password !== pwd) {
            return ctx.body = {
                state: 2,
                data: '密码错误'
            }
        }

        ctx.body = {
            state: 1,
            data: '登录成功'
        }
    }
}