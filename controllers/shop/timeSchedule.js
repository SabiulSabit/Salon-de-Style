

const mysql = require('mysql');
require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;


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

