var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "myusername",
    password: "mypassword",
    database: "mydb"
});

exports.request = function (request) {
    return new Promise((r) => {
        con.connect(function (err) {
            request.query(request, function (err, recordset) {
                if (err) {
                    console.log(err)
                    r(err)
                } else {
                    console.log(recordset)
                    r(recordset)
                }
                con.end()
            });
        });
    });
}