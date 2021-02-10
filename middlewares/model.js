const connection = require('./connectSql')();

module.exports = {
    async queryUser(name, id='') {
        return new Promise((resolve, reject) => {
            connection.execute('SELECT * FROM `users` WHERE `name` = ? OR `id` = ? limit 1', [name, id], (err, res) => {
                res && resolve(res);
                err && reject(err);
            });
        })
    },
    async register(name, pwd) {
        return new Promise((resolve, reject) => {
            connection.execute('insert into `users` (`name`, `password`) values (?, ?)', [
                name,
                pwd
            ], (err, res) => {
                res && resolve(res);
                err && reject(err);
            });
        })
    }
}