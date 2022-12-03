const mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3308,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proj_management'
})

connection.connect((err) => {
    if (!err) {
        console.log("Connected");
    }
    else {
        console.log(err);
    }
})

module.exports = connection;