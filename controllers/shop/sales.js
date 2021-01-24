
const mysql = require('mysql');
require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;

//get  sales history page
exports.getSalesHistory = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName
    });

    let count = "SELECT * " +
        " FROM `booking` " +
        " WHERE status = 1  AND `businessMail` = " + mysql.escape(req.session.mail)

    connectDB.query(count, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            let sum = 0;
            for (i in result) {
                sum += result[i].servicePrice;
                let a = result[i].day;
                let b = result[i].curDate
                result[i].day = a.toString().slice(0, 15);
                result[i].curDate = b.toString().slice(0, 15);
            }


            return res.render('shop/saleshistory', {
                data: result,
                totalSell: sum,
            })
        }
    })
}

//get getSalesList
exports.getSalesList = (req, res, next) => {
    return res.render('shop/salesList')
}

//post getSalesList
exports.postSalesList = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName
    });

    let data = "SELECT `businessMail`, `userMail`, `userPhone`, `userAddress`, `serviceName`, `servicePrice`, `day`, `curDate`, `timeSlotStart`, `timeSlotEnd`, `paymentType`, `bookingID` " +
        " FROM `booking` " +
        " WHERE userMail = " + mysql.escape(req.body.mail) + " AND bookingID =  " + mysql.escape(req.body.bookid)

    let userData = "SELECT `name`, `address` " +
        " FROM `userinfo` " +
        " WHERE email = " + mysql.escape(req.body.mail);

    let services = "SELECT * " +
        " FROM `shopservice` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    let giftCard = "SELECT * " +
        " FROM `egiftcard` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    let package = "SELECT * " +
        " FROM `package` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    let membership = "SELECT * " +
        " FROM `membership` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);


    //  console.log(req.body)
    //console.log(data)
    //console.log(services)

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result);
            let dataService = "SELECT   `img`, `description`, `businessName` " +
                " FROM `shopadmin` " +
                " WHERE  businessMail = " + mysql.escape(result[0].businessMail);
            connectDB.query(dataService, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    // console.log(result1);

                    connectDB.query(userData, (err2, result2) => {
                        if (err2) {
                            throw err2;
                        }
                        else {
                            //console.log(result2);
                            connectDB.query(services, (err3, result3) => {
                                if (err3) {
                                    throw err3;
                                }
                                else {
                                    //console.log(result3)

                                    connectDB.query(giftCard, (err4, result4) => {
                                        if (err4) {
                                            throw err4;
                                        }
                                        else {
                                            connectDB.query(package, (err5, result5) => {
                                                if (err5) {
                                                    throw err5;
                                                }
                                                else {
                                                    connectDB.query(membership, (err6, result6) => {
                                                        if (err6) {
                                                            throw err6;
                                                        }
                                                        else {

                                                            return res.render('shop/salesList', {
                                                                user: result,
                                                                shop: result1[0],
                                                                userInfo: result2[0],
                                                                services: result3,
                                                                giftCard: result4,
                                                                package: result5,
                                                                membership: result6
                                                            });
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })


                                }
                            })

                        }
                    })

                }
            })

        }
    })

}