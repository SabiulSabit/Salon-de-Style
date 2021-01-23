var mysql = require('mysql');
require("dotenv").config();

//global const
const hostNameDB =  process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;

///postSearchpostSearch
exports.postSearch = (req, res, next) => {
    //console.log(req.body)
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });
    let data = "SELECT shop.*,ser.* ,COUNT(r.businessMail) as total,SUM(r.rating)/COUNT(r.businessMail) as rating  " +
        " FROM `shopservice` as ser " +
        " JOIN " +
        "shopadmin as shop " +
        "ON shop.businessMail= ser.businessMail " +
        "LEFT JOIN review as r " +
        "ON shop.businessMail = r.businessMail " +
        "WHERE name LIKE " + mysql.escape('%' + req.body.name + '%') + " AND shop.address LIKE " + mysql.escape('%' + req.body.location + '%') +
        " GROUP by ser.businessMail " +
        " ORDER BY rating desc";

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //  console.log(result)
            return res.render('user/searchResult', {
                shop: result,
                search: req.body.name,
            })
        }
    })

}

//getSearchByCategory
exports.getSearchByCategory = (req, res, next) => {
    //console.log(req.params);

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT shop.*,ser.* ,COUNT(r.businessMail) as total,SUM(r.rating)/COUNT(r.businessMail) as rating " +
        "FROM `category` ser " +
        " JOIN " +
        "shopadmin as shop " +
        "ON shop.businessMail= ser.businessMail " +
        "LEFT JOIN review as r " +
        "ON shop.businessMail = r.businessMail " +
        "WHERE  ser.name = " + mysql.escape(req.params.name) +
        " GROUP by ser.businessMail " +
        " ORDER BY rating desc";

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result)
            return res.render('user/searchResult', {
                shop: result,
                search: req.params.name,
            })
        }
    })
}
