const mysql = require('mysql');
require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;


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
