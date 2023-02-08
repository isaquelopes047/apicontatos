const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'chamadostb.online',
    port: 3306,
    user: 'u936282438_roottb2023',
    password: 'Tbtransben2023@',
    database: 'u936282438_contatostb'
})

exports.pool = pool;