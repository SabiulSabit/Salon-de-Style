//import model
const mysql = require('mysql');
require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;

// get Client Detail
exports.getClientDetail = (req, res, next) => {
    return res.render('shop/clientDetail')
}
//save new client data
exports.postClientDetail = (req, res, next) => {
    //console.log(req.body);
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName
    });

    let count = "SELECT COUNT(*) as total " +
        " FROM `client` "

    connectDB.query(count, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            let total = parseInt(result[0].total) + 1 + 51000;

            let data = " INSERT INTO `client` " +
                " (`name`, `useremail`, `shopMail`, `phone`, `address`, `discount`,`description`, `id`) " +
                " VALUES ( '" + req.body.name + "', '" + req.body.email + "', '" + req.session.mail + "' , '" + req.body.phone + "', '" + req.body.address + "', '" + parseInt(req.body.discount) + "', '" + req.body.description + "', '" + total + "'  )"

            connectDB.query(data, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    return res.redirect('/shop/clientdetail');
                }
            })

        }
    })
}

//get Client Invoice 
exports.getClientInvoice = (req, res, next) => {
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT `name`, `useremail`,  `phone`, `address`, `discount`, `description`, `id` " +
        " FROM `client` " +
        " WHERE `shopMail` = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.render('shop/inventory', {
                data: result
            });
        }
    })
}

