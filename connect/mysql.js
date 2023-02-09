const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'containers-us-west-143.railway.app',
    port: 7293,
    user: 'root',
    password: 'FrNKuebtDRIu9uMg9bq9',
    database: 'railway'
})

exports.pool = pool;