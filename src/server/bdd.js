var mysql = require('mysql');

var config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

exports.request = function (request) {
    return new Promise((r, error) => {
        var con = mysql.createConnection(config);
        con.connect();

        con.query(request, function (err, result) {
            if (err){
                //console.log(err)
                error(err)
            }else{
                r(result)
            }
        });
        con.end()
    });
}

/*var config = {
    connectionLimit:5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

var pool = mysql.createPool(config);

exports.request = function (request) {
    return new Promise((r, error) => {
        pool.getConnection(function(err,connection){
            connection.query(request, function (err, result) {
                if (err){
                    //console.log(err)
                    error(err)
                }else{
                    r(result)
                }
            });
            connection.release();
        })

    });
}*/