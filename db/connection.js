const mysql = require('mysql2');

require('dotenv').config();
// create connction to our db
const connection = mysql.createConnection({
    host:process.env.DB_HOST, 
    port:process.env.DB_PORT, 
    user:process.env.DB_USER, 
    password:process.env.DB_PW,
    database:process.env.DB_NAME
})



module.exports = connection ;