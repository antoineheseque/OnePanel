var mysql = require('mysql');

var config = {
    host: "remotemysql.com",
    user: "yaReSadaEn",
    password: "1yrM842enf",
    database: "yaReSadaEn"
}

exports.request = function (request) {
    return new Promise((r, error) => {
        var con = mysql.createConnection(config);
        con.connect();

        con.query(request, function (err, result) {
            if (err){
                console.log(err)
                error(err)
            }else{
                console.log(result)
                r(result)
            }
        });
        con.end()
    });
}