const mysql = require('mysql');
let pool = null;

module.exports = {
    createDBPool: () => {
        pool = mysql.createPool({
            connectionLimit: 10,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PSWD,
            database: process.env.DB_NAME,
        });
    },
    getPool: () => {
        return pool;
    },
};
