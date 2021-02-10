const mysql = require('mysql2');

module.exports = options => {
    options = {
        ...{
            host: 'localhost',
            user: 'root',
            database: 'photo',
            password: 'milkPF711.'
        },
        ...options
    }
    return mysql.createConnection(options);
}