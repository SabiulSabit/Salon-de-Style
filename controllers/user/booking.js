
var mysql = require('mysql');
require("dotenv").config();

//global const
const hostNameDB =  process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;


//get Cart 
exports.getCart = (req, res, next) => {
    //console.log(req.body);
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT `businessMail`, `userMail`, `userPhone`, `userAddress`, `serviceName`, `servicePrice`, `day`, `curDate`, `timeSlotStart`, `timeSlotEnd`, `paymentType`, `status`, `bookingID`, `discount` " +
        " FROM `booking` " +
        "WHERE `bookingID` = " + mysql.escape(req.body.token)


    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result)
            let totalCost = 0;
            for (i in result) {
                let a = result[i].day
                let b = result[i].curDate
                a = a.toString()
                b = b.toString()
                result[i].day = a.slice(0, 15);
                result[i].curDate = b.slice(0, 15);
                totalCost += (result[i].servicePrice - result[i].discount)
            }
            let user = "SELECT * " +
                " FROM `userinfo` " +
                "WHERE email = " + mysql.escape(result[0].userMail);

            let shop = "SELECT * " +
                " FROM `shopadmin` " +
                " WHERE businessMail = " + mysql.escape(result[0].businessMail);

            connectDB.query(user, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    connectDB.query(shop, (err2, result2) => {
                        if (err2) {
                            throw err2;
                        }
                        else {
                            return res.render('user/cart', {
                                orderInfo: result,
                                user: result1[0],
                                shop: result2[0],
                                cost: totalCost,
                            });
                        }
                    })
                }
            })

        }
    })

}

//order package
exports.postOrderPackage = (req, res, next) => {
    //console.log("postOrderPackage");
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = " INSERT INTO `packageorder`  " +
        " (`packageToken`, `userMail`, `date`) " +
        " VALUES ( '" + req.params.token + "' , '" + req.session.user + "' , CURDATE() )"

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect('/egiftcard')
        }
    })
}




//get Service (Booking page)
exports.getService = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });
   

   
    let userData = "SELECT `email`, `name`, `phone`, `address` " +
        " FROM `userinfo` " +
        " WHERE email = " + mysql.escape(req.session.user);

    let shopInfo = "SELECT * " +
        " FROM `shopadmin` " +
        " WHERE businessMail = " + mysql.escape(req.params.name)

    let timeSlot = "SELECT * " +
        " FROM `shoptime` " +
        " WHERE businessMail = " + mysql.escape(req.params.name)

    let allService = "SELECT `name`, `hour`, `min`, `price` " +
        " FROM `shopservice` " +
        " WHERE businessMail = " + mysql.escape(req.params.name)

    // console.log(userData)
    connectDB.query(userData, (err, result) => {
        if (err) {
            throw err;
        }
        else {

            connectDB.query(shopInfo, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    //console.log(result1[0])
                    connectDB.query(timeSlot, (err2, result2) => {
                        if (err2) {
                            throw err2;
                        }
                        else {
                            //console.log(result[0],result1[0],req.params, result2)

                            connectDB.query(allService, (err3, result3) => {
                                if (err3) {
                                    throw err3;
                                }
                                else {

                                    let ser = []
                                    // console.log(req.params.catName)
                                    for (i = 0; i < result3.length; i++) {
                                        if (req.params.catName != result3[i].name) {
                                            ser.push(result3[i]);
                                        }
                                    }
                                    // console.log(ser)
                                    req.session.shopInfo = req.params;
                                    req.session.extra = ser;
                                    return res.render('user/service', {
                                        user: result[0],
                                        selected: req.params,
                                        shop: result1[0],
                                        time: result2,
                                        otherService: ser,
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


//get Check Out 
exports.postCheckOut = (req, res, next) => {
    //console.log(req.body);
    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true
    });

    let countData = "SELECT COUNT(*) as c " +
        " FROM `booking` "

   // console.log(req.body)

    let ex = req.session.extra;
    //console.log(ex);
    let select = req.body.extra
    let sAll = []
    if (!Array.isArray(select)) {
        for (let i = 0; i < ex.length; i++) {
            if (ex[i].name === select) {
                sAll.push(ex[i])
            }
        }
    }
    else {
        for (let i = 0; i < select.length; i++) {
            for (let j = 0; j < ex.length; j++) {
                if (ex[j].name === select[i]) {
                    sAll.push(ex[j])
                }
            }
        }
    }

    //console.log(sAll);


    connectDB.query(countData, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result[0].c)
            //console.log(req.session.shopInfo);
            let rand = 45679 + parseInt(result[0].c);
            let data = "";
            let time = req.body.timeSlot;
            let date = req.body.date;

            time = time.split(' ');
            date = date.split('/');
            date = date[2] + '-' + date[0] + '-' + date[1]


            // console.log(date);

            if (req.body.handcash != undefined) {
                data = "INSERT INTO `booking`(`businessMail`, `userMail`, `userPhone`, `userAddress`, `serviceName`, `servicePrice`, `day`,`curDate`,`timeSlotStart`, `timeSlotEnd`, `paymentType`, `status`, `bookingID`) " +
                    " VALUES ('" + req.session.shopInfo.name + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.address + "','" + req.session.shopInfo.catName + "','" + req.session.shopInfo.price + "','" + date + "',CURDATE(),'" + time[0] + "','" + time[2] + "','" + req.body.handcash + "',0,'" + rand + "') ;";

                if (sAll.length) {
                    for (let j = 0; j < sAll.length; j++) {
                        data += "INSERT INTO `booking`(`businessMail`, `userMail`, `userPhone`, `userAddress`, `serviceName`, `servicePrice`, `day`,`curDate`,`timeSlotStart`, `timeSlotEnd`, `paymentType`, `status`, `bookingID`) " +
                            " VALUES ('" + req.session.shopInfo.name + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.address + "','" + sAll[j].name + "','" + sAll[j].price + "','" + date + "',CURDATE(),'" + time[0] + "','" + time[2] + "','" + req.body.handcash + "',0,'" + rand + "') ; ";
                    }
                }

            }
            //console.log(data);
            connectDB.query(data, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    return res.render('user/checkOut', {
                        toekn: rand,
                    });
                }
            })

        }
    })

}