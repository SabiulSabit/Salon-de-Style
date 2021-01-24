//import model
var mysql = require('mysql');
var formidable = require('formidable');
let fs = require('fs')
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

// get getWorkSchedule 
exports.getWorkSchedule = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName
    });

    data = "SELECT * " +
        "FROM `shoptime` " +
        " WHERE  businessMail  = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result);
            // d = []
            // for(i=0;i<result.length;i++){
            //     d.push(result[i]);
            // }
            // console.log(result);
            res.render('shop/workschedule', { data: result });
        }
    })

}


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
    return res.render('shop/clientInvoice')
}

//post Client Invoice 


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

//get Health Safety 
exports.getHealthSafety = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName
    });

    data = "SELECT * FROM `healthandsafety` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);


    connectDB.query(data, (err, result) => {
        if (err) {
            throw err
        }
        else {
            //console.log(result)
            // let a = result[0]
            return res.render('shop/healthSafety', {
                data: result[0],
                sz: result.length
            });
        }
    })

}
//post Health Safety 
exports.postHealthSafety = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true
    });

    //console.log(req.body.op+1);
    let op = [];

    for (i = 0; i < 20; i++) {
        op[i] = '';
    }

    if (req.body.op1 != undefined) {
        op[0] = "No waiting area";
    }
    if (req.body.op2 != undefined) {
        op[1] = "Employee wear masks";
    }
    if (req.body.op3 != undefined) {
        op[2] = "Employees wear disposable gloves";
    }
    if (req.body.op4 != undefined) {
        op[3] = "Employee temperature checks";
    }
    if (req.body.op5 != undefined) {
        op[4] = "Disinfection between clients";
    }
    if (req.body.op6 != undefined) {
        op[5] = "Must ware mask";
    }
    if (req.body.op7 != undefined) {
        op[6] = "Disinfection of all surfaces in the venue";
    }
    if (req.body.op8 != undefined) {
        op[7] = "Maintain social distancing";
    }
    if (req.body.op9 != undefined) {
        op[8] = "Venue provides masks for clients";
    }
    if (req.body.op10 != undefined) {
        op[9] = "Client temperature checks";
    }
    if (req.body.op11 != undefined) {
        op[10] = "Client screenings";
    }
    if (req.body.op12 != undefined) {
        op[11] = "Barbicide COVID-19 Certified";
    }
    if (req.body.op13 != undefined) {
        op[12] = "Contactless payment available";
    }
    if (req.body.op14 != undefined) {
        op[13] = "No interactions with other clients";
    }
    if (req.body.op15 != undefined) {
        op[14] = "Disposable supplies in use";
    }
    if (req.body.op16 != undefined) {
        op[15] = "Place to wash hands available";
    }
    if (req.body.op17 != undefined) {
        op[16] = "Masks available for purchase";
    }
    if (req.body.op18 != undefined) {
        op[17] = "Time gap between appointments";
    }
    if (req.body.op19 != undefined) {
        op[18] = "No walk-ins";
    }
    if (req.body.op20 != undefined) {
        op[19] = 1;
    }

    deleteData = "DELETE FROM `healthandsafety` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    data = "INSERT INTO `healthandsafety`(`businessMail`, `noWaitingArea`, `employeeWearMasks`, `employeesWearDisposableGloves`, `employeeTemperatureChecks`," +
        "  `disinfectionBetweenClients`, `mustWareMask`, `disinfectionofallSurfacesintheVenue`, `maintainSocialDistancing`, `venueProvidesMasksforClients`, " +
        " `clientTemperatureChecks`, `clientScreenings`, `barbicideCOVID_19Certified`, `contactlessPaymentAvailable`, `noInteractionsWithOtherClients`, " +
        " `disposableSuppliesinUse`, `placetoWashHandsAvailable`, `masksAvailableforPurchase`, `timeGapBetweenAppointments`, `noWalk_ins`, `describeMore`) " +
        " VALUES ('" + req.session.mail + "','" + op[0] + "','" + op[1] + "','" + op[2] + "','" + op[3] + "','" + op[4] + "','" + op[5] + "','" + op[6] + "','" + op[7] + "','" + op[8] + "','" + op[9] + "','" + op[10] + "','" + op[11] + "', " +
        " '" + op[12] + "','" + op[13] + "','" + op[14] + "','" + op[15] + "','" + op[16] + "','" + op[17] + "','" + op[18] + "','" + req.body.op20 + "') ";

    //console.log(data);   

    connectDB.query(deleteData, (err1, result1) => {
        if (err1) {
            throw err1;
        }
        else {
            connectDB.query(data, (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    return res.redirect('/shop/health&safety');
                }
            })
        }
    })

}





//getInventory 
exports.getInventory = (req, res, next) => {

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

