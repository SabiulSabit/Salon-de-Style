//import model
const mysql = require('mysql');
const formidable = require('formidable');
const fs = require('fs')
const path = require('path');
const bcrypt = require('bcrypt');
const { connect } = require('http2');
const { info } = require('console');
const { INSPECT_MAX_BYTES } = require('buffer');
///const { use, route } = require('../routes/shop');
require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;



//show company info
exports.getCompanyInfo = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    data = "SELECT * FROM `shopadmin` WHERE businessMail = " + mysql.escape(req.session.mail);

    data1 = "SELECT * " +
        " FROM `taxinfo` " +
        "WHERE businessMail = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result);
            connectDB.query(data1, (err, result1) => {
                if (err) {
                    throw err;
                }
                else {
                    //console.log();
                    if (result1[0] == undefined) {
                        result1[0] = {
                            businessMail: '',
                            companyName: '',
                            taxID: '',
                            invoicePrefix: '',
                            correctionPrefix: '',
                            prefixCashIn: '',
                            prefixCashOut: '',
                            address: '',
                            country: '',
                            city: '',
                            postCode: '',
                            bank: '',
                            accountNumber: ''
                        }
                    }
                    return res.render('shop/companyInfo', { data: result[0], tax: result1[0] });
                }
            })

        }
    })

}
//post method for postCompanyInfo

exports.postCompanyInfo = (req, res, next) => {
    // console.log(req.body);

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    data = "UPDATE `shopadmin` SET " +
        "`businessName` = '" + req.body.businessName + "' , `businessWebsite` = '" + req.body.businessWebsite + "' , `businessNumber` = '" + req.body.businessNumber + "' , `ecom` = '" + req.body.ecom + "', `fb`= '" + req.body.fb + "', `insta` ='" + req.body.insta + "', `officialName`='" + req.body.officialName + "', `description` = '" + req.body.description + "' ,`address`= '" + req.body.address + "', `lat`= '" + parseFloat(req.body.lat) + "' ,`lon`= '" + parseFloat(req.body.lon) + "' " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect('/shop/companyinfo');
        }
    })
}

//save tax data
exports.postSaveTax = (req, res, next) => {
    //console.log(req.body);

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    dataSearch = "SELECT * " +
        "FROM `taxinfo` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    connectDB.query(dataSearch, (errSearch, resultSearch) => {
        if (errSearch) {
            throw errSearch
        }
        else if (resultSearch.length) { //have previous data
            data = "UPDATE `taxinfo` " +
                " SET `companyName` = '" + req.body.companyName + "',`taxID`='" + req.body.taxID + "',`invoicePrefix`='" + req.body.invoicePrefix + "',`correctionPrefix`='" + req.body.correctionPrefix + "',`prefixCashIn`='" + req.body.prefixCashIn + "',`prefixCashOut`='" + req.body.prefixCashOut + "',`address`='" + req.body.address + "',`country`='" + req.body.country + "',`city`='" + req.body.city + "',`postCode`='" + req.body.postCode + "',`bank`='" + req.body.bank + "',`accountNumber`='" + req.body.accountNumber + "' " +
                " WHERE businessMail = " + mysql.escape(req.session.mail);
        }
        else { // for new data
            data = "INSERT INTO `taxinfo`(`businessMail`, `companyName`, `taxID`, `invoicePrefix`, `correctionPrefix`, `prefixCashIn`, `prefixCashOut`, `address`, `country`, `city`, `postCode`, `bank`, `accountNumber`) " +
                "VALUES ('" + req.session.mail + "','" + req.body.companyName + "','" + req.body.taxID + "','" + req.body.invoicePrefix + "','" + req.body.correctionPrefix + "','" + req.body.prefixCashIn + "','" + req.body.prefixCashOut + "','" + req.body.address + "','" + req.body.country + "','" + req.body.city + "','" + req.body.postCode + "','" + req.body.bank + "','" + req.body.accountNumber + "' )"

        }

        //console.log(data);
        connectDB.query(data, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                return res.redirect("/shop/companyinfo");
            }
        })

    })

}


// get Invoice Detail
exports.getInvoiceDetail = (req, res, next) => {
    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true
    });

    let data = "SELECT count(*) as total " +
        "FROM `booking` " +
        " WHERE  `businessMail` = " + mysql.escape(req.session.mail)
    let data1 = "SELECT count(*) as pending " +
        " FROM `booking` " +
        " WHERE status = 0 AND `businessMail` = " + mysql.escape(req.session.mail)
    let data2 = "SELECT count(*) as cancel " +
        " FROM `booking` " +
        " WHERE status = -1 AND `businessMail` = " + mysql.escape(req.session.mail)
    let data3 = "SELECT count(*) as complete " +
        " FROM `booking` " +
        " WHERE status = 1  AND `businessMail` = " + mysql.escape(req.session.mail)
    let data4 = "SELECT * " +
        "FROM `booking` " +
        " WHERE  `businessMail` = " + mysql.escape(req.session.mail)


    connectDB.query(data, (err, total) => {
        if (err) {
            throw err;
        }
        else {
            connectDB.query(data1, (err1, pending) => {
                if (err1) {
                    throw err1;
                }
                else {
                    connectDB.query(data2, (err2, cancel) => {
                        if (err2) {
                            throw err2;
                        }
                        else {
                            connectDB.query(data3, (err3, complete) => {
                                if (err3) {
                                    throw err3;
                                }
                                else {
                                    // console.log(total,pending,cancel,complete)
                                    connectDB.query(data4, (err4, allData) => {
                                        if (err4) {
                                            throw err;
                                        }
                                        else {
                                            //S console.log(allData)
                                            let pendingData = [], cacelData = [], completeData = [];
                                            for (i in allData) {
                                                var a = allData[i].day;
                                                allData[i].day = a.toString().slice(0, 15);
                                                if (allData[i].status == 0) {
                                                    pendingData.push(allData[i])
                                                }
                                                else if (allData[i].status == -1) {
                                                    cacelData.push(allData[i])
                                                }
                                                else if (allData[i].status == 1) {
                                                    completeData.push(allData[i])
                                                }
                                            }


                                            return res.render('shop/invoiceDetail', {
                                                total: total[0].total,
                                                pending: pending[0].pending,
                                                cancel: cancel[0].cancel,
                                                complete: complete[0].complete,
                                                data: allData,
                                                pendingData: pendingData,
                                                cacelData: cacelData,
                                                completeData: completeData,
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

//get Review and Rating 
exports.getReviewandRating = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = " SELECT  `reviewrMail`, `reviewrName`, `reviewrDP`, `review`, `date`, `rating`, `img` " +
        "  FROM `review` " +
        " WHERE `businessMail`  = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {

            for (let i = 0; i < result.length; i++) {
                let a = result[i].date;
                result[i].date = a.toString().slice(0, 15);
            }
            // console.log(result);
            return res.render('shop/reviewandRating', {
                data: result,
            })
        }
    })

}

//getReports

exports.getReports = (req, res, next) => {
    //console.log("Rpoets");
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT  `user`, `reports` " +
        " FROM `report` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            // console.log(result);
            return res.render('shop/reports', { data: result });
        }
    })

}

//post Processed
exports.postProcessed = (req, res, next) => {
    // console.log(req.body);

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true,
    });

    let data = ""
    let mailInfo = ""
    //console.log(req.body)
    if (req.body.paymentType === "Hand Cash") {
        let dis = req.body.discount;
        if (dis == undefined) {
            data = "UPDATE `booking` " +
                " SET `status`= 1  " +
                " WHERE bookingID =  " + mysql.escape(req.body.id) + " AND businessMail = " + mysql.escape(req.session.mail) + " AND userMail = " + mysql.escape(req.body.user);
        }
        else if (!Array.isArray(dis)) {
            data = "UPDATE `booking` " +
                " SET `status`= 1 ,`discount`= " + parseInt(req.body.discount) +
                " WHERE bookingID =  " + mysql.escape(req.body.id) + " AND businessMail = " + mysql.escape(req.session.mail) + " AND userMail = " + mysql.escape(req.body.user);


        }
        else {
            for (let i = 0; i < dis.length; i++) {
                data += "UPDATE `booking` " +
                    " SET `status`= 1 ,`discount`= " + parseInt(req.body.discount[i]) +
                    " WHERE bookingID =  " + mysql.escape(req.body.id) + " AND businessMail = " + mysql.escape(req.session.mail) + " AND userMail = " + mysql.escape(req.body.user) + " ; ";

            }

        }

        connectDB.query(data, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                return res.redirect('/shop/invoicedetail');
            }
        })


    }
}

