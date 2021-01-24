const mysql = require('mysql');
require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;

//get add services page
exports.getAddServices = (req, res, next) => {
    //console.log("adf");

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = " SELECT `name` " +
        " FROM `category` " +
        " WHERE `businessMail` = " + mysql.escape(req.session.mail);

    let data1 = "SELECT  `name`, `hour`, `min`, `priceType`, `price`, `category` " +
        " FROM  `shopservice` " +
        " WHERE `businessMail` = " + mysql.escape(req.session.mail)

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            connectDB.query(data1, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    return res.render('shop/addServices', {
                        category: result,
                        data: result1
                    });
                }
            })

        }
    })
}

//post add service data
exports.postAddServices = (req, res, next) => {
    //console.log(req.body);

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = " INSERT INTO `shopservice` " +
        " (`businessMail`, `name`, `hour`, `min`, `priceType`, `price`, `category`) " +
        " VALUES ( '" + req.session.mail + "' , '" + req.body.name + "' ,'" + parseInt(req.body.hour) + "','" + parseInt(req.body.min) + "','" + req.body.priceType + "','" + parseFloat(req.body.price) + "','" + req.body.cat + "')"

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect('/shop/addservices');
        }
    })
}

//delete service
exports.getDeleteServices = (req, res, next) => {
    //   console.log("getDeleteServices");

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = " DELETE FROM `shopservice` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail) + " AND  name  = " + mysql.escape(req.params.name)

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect('/shop/addservices');
        }
    })
}