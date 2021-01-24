
const mysql = require('mysql');
require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;


//get Package 
exports.getPackage = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT `name` " +
        " FROM `shopservice` " +
        " WHERE `businessMail` = " + mysql.escape(req.session.mail);

    let dataPack = "SELECT  * " +
        " FROM `package` " +
        " WHERE `businessMail` =" + mysql.escape(req.session.mail);


    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            connectDB.query(dataPack, (err1, result1) => {
                if (err1) {
                    throw err;
                }
                else {
                    return res.render('shop/package', {
                        service: result,
                        pack: result1,
                    })
                }
            })

        }
    })

}

//post Package
exports.postPackage = (req, res, next) => {
    //console.log(req.body);

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let val = 45351;

    let c = "SELECT count(*) as count " +
        " FROM `package`"

    connectDB.query(c, (err1, result1) => {
        if (err1) {
            throw err1;
        }
        else {
            let data = "INSERT INTO `package` " +
                " (`businessMail`, `packageName`, `description`, `service`, `tax`, `amount`, `price`,`token`, `endDate`) " +
                " VALUES ('" + req.session.mail + "','" + req.body.name + "','" + req.body.des + "','" + req.body.service + "','" + parseFloat(req.body.tax) + "','" + parseInt(req.body.amount) + "','" + parseInt(req.body.price) + "','" + (parseInt(result1[0].count) + val) + "',DATE_ADD(CURDATE(), INTERVAL '" + parseInt(req.body.validity) + "' DAY))"

            connectDB.query(data, (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    return res.redirect('/shop/package');
                }
            })

        }
    })


}

//get Package Detail 
exports.getPackageDetail = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT *  " +
        " FROM `package` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result)
            for (i in result) {
                var a = result[i].endDate;
                result[i].endDate = a.toString().slice(0, 15);
            }
            return res.render('shop/packageDetail', {
                package: result,
            })
        }
    })

}

//postDeletePackage
exports.postDeletePackage = (req, res, next) => {
    //console.log("asd");
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "DELETE FROM `package` " +
        " WHERE token = " + mysql.escape(req.body.token);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect('/shop/packagedetail');
        }
    })
}


//approve packge order
exports.getApprovePackage = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = " UPDATE `packageorder` " +
        "  SET `status`= 1 " +
        " WHERE `tokenOrder` = " + mysql.escape(req.params.id)

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect('/shop/packageOrders')
        }
    })
}

//delete package order
exports.getDeletePackage = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = " UPDATE `packageorder` " +
        "  SET `status`= -1 " +
        " WHERE `tokenOrder` = " + mysql.escape(req.params.id)

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect('/shop/packageOrders')
        }
    })

}


//show package orders
exports.getPackageOrders = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });


    let data = "SELECT * " +
        " FROM `packageorder` as po " +
        " JOIN " +
        " package as p " +
        " on p.token = po.packageToken " +
        " JOIN " +
        "userinfo as u " +
        " on u.email  = po.userMail " +
        " WHERE p.businessMail  = " + mysql.escape(req.session.mail) + " AND po.status = 0 ";

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            // console.log(result);
            for (i in result) {
                let a = result[i].endDate
                let b = result[i].date
                a = a.toString()
                b = b.toString()

                result[i].endDate = a.slice(0, 15);
                result[i].date = b.slice(0, 15);
            }
            return res.render('shop/packageOrders', {
                data: result,
            });
        }
    })

}



//update package data
exports.postPackageUpdate = (req, res, next) => {
    //console.log(req.body);
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = " UPDATE `package` " +
        " SET `packageName`= '" + req.body.name + "' ,`description`= '" + req.body.des + "' ,`service`= '" + req.body.service + "' ,`tax`= '" + parseFloat(req.body.tax) + "' ,`amount`= '" + parseInt(req.body.amount) + "' ,`price`= '" + parseFloat(req.body.price) + "' ,`endDate`= " + " DATE_ADD(CURDATE(), INTERVAL '" + parseInt(req.body.validity) + "' DAY) " +
        " WHERE `businessMail` = " + mysql.escape(req.session.mail) + " AND `packageName` = " + mysql.escape(req.body.prevName)


    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect('/shop/package');
        }
    })
}

