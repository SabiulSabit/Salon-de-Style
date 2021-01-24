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

exports.getOpeningHours = (req, res, next) => {


    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    data = "SELECT * " +
        "FROM `shoptime` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    //console.log(req.session.mail)

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            sun = [], mon = [], tue = [], wed = [], thu = [], fri = [], sat = [];
            // console.log(result)
            for (i = 0; i < result.length; i++) {
                if (result[i].dayName == "sun") {
                    sun.push(result[i]);
                }
                if (result[i].dayName == "mon") {
                    mon.push(result[i]);
                }
                if (result[i].dayName == "tue") {
                    tue.push(result[i]);
                }
                if (result[i].dayName == "wed") {
                    wed.push(result[i]);
                }
                if (result[i].dayName == "thu") {
                    thu.push(result[i]);
                }
                if (result[i].dayName == "fri") {
                    fri.push(result[i]);
                }
                if (result[i].dayName == "sat") {
                    sat.push(result[i]);
                }
            }
            //  console.log(sun,mon,tue,wed,thu,fri, sat)
            res.render("shop/openinghour", {
                sun: sun,
                mon: mon,
                tue: tue,
                wed: wed,
                thu: thu,
                fri: fri,
                sat: sat
            });
        }
    })

}


//save new date
exports.saveNewDate = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true
    });

    let sunOpen = [], monOpen = [], tueOpen = [], wedOpen = [], thuOpen = [], friOpen = [], satOpen = [];
    let sunClose = [], monClose = [], tueClose = [], wedClose = [], thuClose = [], friClose = [], satClose = [];

    dataDelete = "DELETE FROM `shoptime` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    dataInsert = "";

    //get all data from the frontend and formate them
    if (req.body.sunChecked == "true") {
        sunOpen[0] = req.body.sunopen;
        sunClose[0] = req.body.sunclose;

        if (req.body.sunday1open != undefined) {
            let openTime = req.body.sunday1open;
            let closeTime = req.body.sunday1close;
            //console.log(Array.isArray(openTime))
            if (Array.isArray(openTime) == false) {
                sunOpen[1] = openTime;
                sunClose[1] = closeTime;
            }
            else {
                for (i = 0; i < openTime.length; i++) {
                    sunOpen.push(openTime[i]);
                    sunClose.push(closeTime[i]);
                }

            }
        }

        for (i in sunOpen) {
            dataInsert += " INSERT INTO `shoptime`(`dayName`, `open`, `close`, `businessMail`) " +
                " VALUES ('sun','" + sunOpen[i] + "','" + sunClose[i] + "','" + req.session.mail + "') ;"
        }

    }
    if (req.body.monChecked == "true") {

        monOpen[0] = req.body.monopen;
        monClose[0] = req.body.monclose;
        if (req.body.monday1open != undefined) {
            let openTime = req.body.monday1open;
            let closeTime = req.body.monday1close;
            //console.log(Array.isArray(openTime))
            if (Array.isArray(openTime) == false) {
                monOpen[1] = openTime;
                monClose[1] = closeTime;
            }
            else {
                for (i = 0; i < openTime.length; i++) {
                    monOpen.push(openTime[i]);
                    monClose.push(closeTime[i]);
                }

            }
        }
        for (i in monOpen) {
            dataInsert += " INSERT INTO `shoptime`(`dayName`, `open`, `close`, `businessMail`) " +
                " VALUES ('mon','" + monOpen[i] + "','" + monClose[i] + "','" + req.session.mail + "') ;"
        }
    }
    if (req.body.tueChecked == "true") {

        tueOpen[0] = req.body.tueopen;
        tueClose[0] = req.body.tueclose;
        if (req.body.tuesday1open != undefined) {
            let openTime = req.body.tuesday1open;
            let closeTime = req.body.tuesday1close;
            //console.log(Array.isArray(openTime))
            if (Array.isArray(openTime) == false) {
                tueOpen[1] = openTime;
                tueClose[1] = closeTime;
            }
            else {
                for (i = 0; i < openTime.length; i++) {
                    tueOpen.push(openTime[i]);
                    tueClose.push(closeTime[i]);
                }

            }
        }
        for (i in tueOpen) {
            dataInsert += " INSERT INTO `shoptime`(`dayName`, `open`, `close`, `businessMail`) " +
                " VALUES ('tue','" + tueOpen[i] + "','" + tueClose[i] + "','" + req.session.mail + "') ;"
        }
    }
    if (req.body.wedChecked == "true") {
        wedOpen[0] = req.body.wedopen;
        wedClose[0] = req.body.wedclose;
        if (req.body.wednesday1open != undefined) {
            let openTime = req.body.wednesday1open;
            let closeTime = req.body.wednesday1close;
            //console.log(Array.isArray(openTime))
            if (Array.isArray(openTime) == false) {
                wedOpen[1] = openTime;
                wedClose[1] = closeTime;
            }
            else {
                for (i = 0; i < openTime.length; i++) {
                    wedOpen.push(openTime[i]);
                    wedClose.push(closeTime[i]);
                }

            }
        }
        for (i in wedOpen) {
            dataInsert += " INSERT INTO `shoptime`(`dayName`, `open`, `close`, `businessMail`) " +
                " VALUES ('wed','" + wedOpen[i] + "','" + wedClose[i] + "','" + req.session.mail + "') ;"
        }
    }
    if (req.body.thuChecked == "true") {
        thuOpen[0] = req.body.thuopen;
        thuClose[0] = req.body.thuclose;
        if (req.body.thrusday1open != undefined) {
            let openTime = req.body.thrusday1open;
            let closeTime = req.body.thrusday1close;
            //console.log(Array.isArray(openTime))
            if (Array.isArray(openTime) == false) {
                thuOpen[1] = openTime;
                thuClose[1] = closeTime;
            }
            else {
                for (i = 0; i < openTime.length; i++) {
                    thuOpen.push(openTime[i]);
                    thuClose.push(closeTime[i]);
                }

            }
        }
        for (i in thuOpen) {
            dataInsert += " INSERT INTO `shoptime`(`dayName`, `open`, `close`, `businessMail`) " +
                " VALUES ('thu','" + thuOpen[i] + "','" + thuClose[i] + "','" + req.session.mail + "') ;"
        }

    }
    if (req.body.friChecked == "true") {
        friOpen[0] = req.body.friopen;
        friClose[0] = req.body.friclose;
        if (req.body.friday1open != undefined) {
            let openTime = req.body.friday1open;
            let closeTime = req.body.friday1close;
            //console.log(Array.isArray(openTime))
            if (Array.isArray(openTime) == false) {
                friOpen[1] = openTime;
                friClose[1] = closeTime;
            }
            else {
                for (i = 0; i < openTime.length; i++) {
                    friOpen.push(openTime[i]);
                    friClose.push(closeTime[i]);
                }

            }
        }
        for (i in friOpen) {
            dataInsert += " INSERT INTO `shoptime`(`dayName`, `open`, `close`, `businessMail`) " +
                " VALUES ('fri','" + friOpen[i] + "','" + friClose[i] + "','" + req.session.mail + "') ;"
        }
    }
    if (req.body.satChecked == "true") {
        satOpen[0] = req.body.satopen;
        satClose[0] = req.body.satclose;
        if (req.body.saturday1open != undefined) {
            let openTime = req.body.saturday1open;
            let closeTime = req.body.saturday1close;
            //console.log(Array.isArray(openTime))
            if (Array.isArray(openTime) == false) {
                satOpen[1] = openTime;
                satClose[1] = closeTime;
            }
            else {
                for (i = 0; i < openTime.length; i++) {
                    satOpen.push(openTime[i]);
                    satClose.push(closeTime[i]);
                }

            }
        }
        for (i in satOpen) {
            dataInsert += " INSERT INTO `shoptime`(`dayName`, `open`, `close`, `businessMail`) " +
                " VALUES ('sat','" + satOpen[i] + "','" + satClose[i] + "','" + req.session.mail + "') ;"
        }
    }


    //console.log(dataInsert);

    connectDB.query(dataDelete, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            connectDB.query(dataInsert, (err1, result1) => {
                if (err1) {
                    throw err1
                }
                else {
                    console.log('Done');
                    return res.redirect('/shop/openinghours')
                }
            })
        }
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

