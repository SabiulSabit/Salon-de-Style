
//import model
const mysql = require('mysql');
require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;

//get Categories List getCategoriesList
exports.getCategoriesList = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName
    });
    data = "SELECT `name` " +
        " FROM `category` " +
        "  WHERE `businessMail` = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.render('shop/categoriesList', { data: result })
        }
    })

}

//postCategoriesList postCategoriesList
exports.postCategoriesList = (req, res, next) => {
    //console.log(req.body)

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true
    });

    let data = " ";
    let deleteData = "DELETE FROM `category` " +
        " WHERE `businessMail` = " + mysql.escape(req.session.mail);

    if (Array.isArray(req.body.cat) == false) {
        data = "INSERT INTO `category`(`name`, `businessMail`)  " +
            " VALUES ('" + req.body.cat + "','" + req.session.mail + "')"
    }
    else {
        for (let i = 0; i < req.body.cat.length; i++) {
            data += "INSERT INTO `category`(`name`, `businessMail`)  " +
                " VALUES ('" + req.body.cat[i] + "','" + req.session.mail + "'); "
        }
    }

    //console.log(data);

    connectDB.query(deleteData, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            connectDB.query(data, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    return res.redirect('/shop/categorieslist')
                }
            })
        }
    })

}