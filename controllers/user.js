//import model
var mysql = require('mysql');
var formidable = require('formidable');
const path = require('path');
const bcrypt = require('bcrypt');
const { time } = require('console');
const e = require('express');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');


//global const
const hostNameDB = "localhost";
const userNameDB = "root";
const passwordDB = "";
const databaseName = "rondvou";


exports.isAuthentic = (req, res, next) => {
    if (req.session.user == undefined) {
        return res.redirect('/')
    }
    else {
        next();
    }
}

exports.setLocals = (req, res, next) => {

    res.locals.user = req.session.user
    res.locals.name = req.session.name
    res.locals.userAll = req.session.userAll;
    next();

}


exports.getHome = (req, res, next) => {
    //console.log("User Home")

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    data = "SELECT s.* ,COUNT(r.businessMail) as total,SUM(r.rating)/COUNT(r.businessMail) as rating " +
        "FROM `shopadmin` as s " +
        "LEFT JOIN review as r " +
        "ON s.businessMail = r.businessMail " +
        "GROUP BY s.businessMail " +
        "LIMIT 15 "

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result)
            for (let i = 0; i < result.length; i++) {
                if (result[i].rating < 0 && result[i].rating > 5) {
                    result[i].rating = 0;
                }
            }
            // console.log(req.session.user
            //    ,req.session.name
            //     ,req.session.userAll)
            return res.render('user/index', { shop: result, });
        }
    })

}

//show shop ingo
exports.getShowShop = (req, res, next) => {

    // console.log(req.params.mail);
    // console.log(req.params)
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let dataShop = "SELECT * FROM `shopadmin` " +
        " WHERE businessMail = " + mysql.escape(req.params.mail) + " ; ";
    let dataService = "SELECT * FROM `shopservice` " +
        " WHERE businessMail = " + mysql.escape(req.params.mail) + " ; ";
    let dataTime = "SELECT * FROM `shoptime` " +
        " WHERE businessMail = " + mysql.escape(req.params.mail) + " ; ";

    let health = "SELECT *  " +
        " FROM `healthandsafety` " +
        " WHERE businessMail = " + mysql.escape(req.params.mail) + " ; ";

    let gift = "SELECT  `giftCardName`, `description`, `price`, `tax`, `serviceName`, `endDate` " +
        " FROM `egiftcard` " +
        " WHERE `businessMail` = " + mysql.escape(req.params.mail) + " ; ";

    let rating = "SELECT * ,count(*) as total" +
        " FROM `review` " +
        "WHERE businessMail = " + mysql.escape(req.params.mail);


    connectDB.query(dataShop, (err, resultShop) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(resultShop[0])
            connectDB.query(dataService, (err1, resultService) => {
                if (err1) {
                    throw err1;
                }
                else {
                    connectDB.query(dataTime, (err2, resultTime) => {
                        if (err2) {
                            throw err2;
                        }
                        else {

                            sat = [], sun = [], mon = [], tue = [], wed = [], thu = [], fri = []

                            for (i = 0; i < resultTime.length; i++) {
                                if (resultTime[i].dayName == 'sat') {
                                    sat.push(resultTime[i])
                                }
                                if (resultTime[i].dayName == 'sun') {
                                    sun.push(resultTime[i])
                                }
                                if (resultTime[i].dayName == 'mon') {
                                    mon.push(resultTime[i])
                                }
                                if (resultTime[i].dayName == 'tue') {
                                    tue.push(resultTime[i])
                                }
                                if (resultTime[i].dayName == 'wed') {
                                    wed.push(resultTime[i])
                                }
                                if (resultTime[i].dayName == 'thu') {
                                    thu.push(resultTime[i])
                                }
                                if (resultTime[i].dayName == 'fri') {
                                    fri.push(resultTime[i])
                                }
                            }

                            connectDB.query(health, (err3, result3) => {
                                if (err3) {
                                    throw err3;
                                }
                                else {
                                    //console.log(result3[0]);
                                    let arr;
                                    let hl = [];

                                    if (result3.length) {
                                        let arr = Object.values(result3[0]);
                                        //console.log(arr)
                                        hl = []
                                        for (j = 1; j < arr.length; j++) {
                                            if (arr[j].length > 0) {
                                                hl.push(arr[j])
                                            }
                                        }
                                        //console.log(hl)
                                    }

                                    connectDB.query(gift, (err4, result4) => {
                                        if (err4) {
                                            throw err4;
                                        }
                                        else {
                                            for (i in result4) {
                                                let a = result4[i].endDate
                                                a = a.toString()
                                                result4[i].endDate = a.slice(0, 15);
                                            }

                                            connectDB.query(rating, (err5, result5) => {
                                                if (err5) {
                                                    throw err5;
                                                }
                                                else {

                                                    //console.log(result5[0].total)
                                                    let s1 = 0, s2 = 0, s3 = 0, s4 = 0, s5 = 0;
                                                    let count = 0;
                                                    let avrg = 0;
                                                    // console.log(result5)
                                                    if (result5[0].total > 0) {
                                                        for (let j = 0; j < result5.length; j++) {
                                                            //console.log(result5[j].rating)
                                                            if (result5[j].rating == 1) {
                                                                count += 1
                                                                s1 += 1
                                                            }
                                                            else if (result5[j].rating == 2) {
                                                                count += 2
                                                                s2 += 1
                                                            }
                                                            else if (result5[j].rating == 3) {
                                                                count += 3
                                                                s3 += 1
                                                            }
                                                            else if (result5[j].rating == 4) {
                                                                count += 4
                                                                s4 += 1
                                                            }
                                                            else if (result5[j].rating == 5) {
                                                                count += 5
                                                                s5 += 1
                                                            }


                                                            let b = result5[j].date
                                                            b = b.toString()
                                                            result5[j].date = b.slice(0, 15);
                                                        }
                                                    }


                                                    avrg = count / parseInt(result5[0].total);
                                                    if (Number.isNaN(avrg)) {
                                                        avrg = 0
                                                    }
                                                    //console.log(avrg,count,parseInt(result5[0].total))
                                                    //console.log(resultShop)

                                                    return res.render('user/shop', {
                                                        shopInfo: resultShop[0],
                                                        service: resultService,
                                                        sat: sat,
                                                        sun: sun,
                                                        mon: mon,
                                                        tue: tue,
                                                        wed: wed,
                                                        thu: thu,
                                                        fri: fri,
                                                        health: hl,
                                                        gift: result4,
                                                        totalRating: result5[0].total,
                                                        avrgRating: avrg,
                                                        star1: s1,
                                                        star2: s2,
                                                        star3: s3,
                                                        star4: s4,
                                                        star5: s5,
                                                        allRating: result5
                                                    });

                                                }
                                            })


                                        }
                                    })
                                    //console.log(hl);

                                }
                            })


                        }
                    })
                }
            })



        }
    })

}
//login 
exports.postLogin = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });
    //console.log(req.body);


    let data = "SELECT * " +
        " FROM `userinfo` " +
        " WHERE email = " + mysql.escape(req.body.username)


    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else if (result.length > 0) {
            //console.log(req.body.password, result[0].pass)
            bcrypt.compare(req.body.password, result[0].pass, function (err1, isMatch) {
                if (err1) {
                    throw err1;
                }
                else if (!isMatch) {
                    res.locals.err = "Password doesn't match!"
                    return res.redirect('/')
                }
                else {
                    req.session.user = req.body.username;
                    req.session.name = result[0].name;
                    req.session.userAll = result[0];
                    //console.log(req.body)
                    return res.redirect('/');
                }
            });
        }
        else {
            console.log("Email Is Not registered");
            return res.redirect('/');
        }
    })
}

//post Create Account
exports.postCreateAccount = (req, res, next) => {

    //console.log("here",req.body)
    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });
    let ename, email, address, pass;
    let wrong = 0;


    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {

            if (name === "username") {
                ename = field;

            }
            else if (name === "email") {
                email = field;

            }
            else if (name === "address") {
                address = field;

            }
            //add new caregory 
            else if (name === "password1") {
                pass = bcrypt.hashSync(field, 10);

            }


        })
        .on('file', (name, file) => {
            // console.log('Uploaded file', name)
            // fs.rename(file.path,__dirname+"a")
        })
        .on('fileBegin', function (name, file) {

            var fileType = file.type.split('/').pop();

            if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {

                a = path.join(__dirname, '../')

                if (name === "image") {
                    imgPath = (email + "." + fileType);
                }
                imgPath = '/images/user/regUser/' + (email + "." + fileType)
                file.path = a + '/public/images/user/regUser/' + (email + "." + fileType); // __dirname

            } else {
                console.log("Wrong File type")
                wrong = 1;
                // res.render('admin/addhotel', { msg: "", err: "Wrong File type" });
            }
        })
        .on('aborted', () => {
            console.error('Request aborted by the user')
        })
        .on('error', (err) => {
            console.error('Error', err)
            throw err
        })
        .on('end', () => {

            // console.log(addCategory);
            if (wrong == 1) {
                console.log("Error")
                return;
            }
            else {

                let data = "INSERT INTO `userinfo`(`email`, `name`, `pass`, `img`, `address`) " +
                    "  VALUES ('" + email + "','" + ename + "','" + pass + "','" + imgPath + "','" + address + "')"

                //console.log(data);   

                connectDB.query(data, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        req.session.user = email;
                        let data1 = "SELECT * " +
                            " FROM `userinfo` " +
                            " WHERE email = " + mysql.escape(email)


                        connectDB.query(data1, (err1, result1) => {
                            if (err1) {
                                throw err1;
                            }
                            else {

                                req.session.user = email;
                                req.session.name = result1[0].name;
                                req.session.userAll = result1[0];
                                //console.log(req.body)
                                return res.redirect('/');
                            }

                        })

                    }
                })

            }
        })

}

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

//get Service (Booking page)
exports.getService = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    //console.log(req.params)
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

    console.log(req.body)

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

//get Payment 
exports.getPayment = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });


    let data = "SELECT b.serviceName,b.servicePrice,b.day,s.businessName " +
        " FROM `booking` as b " +
        "JOIN " +
        "shopadmin as s " +
        " on s.businessMail = b.businessMail " +
        " WHERE userMail = " + mysql.escape(req.session.user) + " AND status = 1 ";

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
           // console.log(result)
            for (i in result) {           
                let b = result[i].day
                b = b.toString()
                result[i].day = b.slice(0, 15);
            }

            return res.render('user/payment', {
                booking: result
            });
        }
    })


}

//get Profile 
exports.getProfile = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT * " +
        " FROM `userinfo` " +
        " WHERE email = " + mysql.escape(req.session.user);
    //console.log(result[0])
    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result[0])
            return res.render('user/profile', { user: result[0] });
        }
    })

}

//update profile
exports.updateProfile = (req, res, next) => {
    //console.log(req.body);

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let uname, phone, email, notes, twitter, facebook, google;
    let wrong = 0;
    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {

            if (name === "name") {
                uname = field;
            }
            else if (name === "email") {
                email = field;

            }
            else if (name === "phone") {
                phone = field;

            }
            else if (name === "notes") {
                notes = field;
            }
            else if (name === "twitter") {
                twitter = field;
            }
            else if (name === "facebook") {
                facebook = field;
            }
            else if (name === "google") {
                google = field;
            }
            //add new caregory 
            // else if (name === "password1") {
            //     pass = bcrypt.hashSync(field, 10);

            // }


        })
        .on('file', (name, file) => {
            // console.log('Uploaded file', name)
            // fs.rename(file.path,__dirname+"a")
        })
        .on('fileBegin', function (name, file) {

            var fileType = file.type.split('/').pop();
            //console.log(fileType);
            if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {

                a = path.join(__dirname, '../')

                if (name === "image") {
                    imgPath = (req.session.user + "." + fileType);
                }
                imgPath = '/images/user/regUser/' + (req.session.user + "." + fileType)
                file.path = a + '/public/images/user/regUser/' + (req.session.user + "." + fileType); // __dirname

            } else {
                console.log("Wrong File type")
                wrong = 1;
                // res.render('admin/addhotel', { msg: "", err: "Wrong File type" });
            }
        })
        .on('aborted', () => {
            console.error('Request aborted by the user')
        })
        .on('error', (err) => {
            console.error('Error', err)
            throw err
        })
        .on('end', () => {

            // console.log(addCategory);
            let data = "";
            if (wrong == 1) {
                //console.log("Error")

                data = "UPDATE `userinfo` " +
                    " SET `name`='" + uname + "',`phone`='" + phone + "',`fb`='" + facebook + "',`twitter`='" + twitter + "',`google`='" + google + "',`note`='" + notes + "' " +
                    " WHERE email = " + mysql.escape(req.session.user);

                //return;
            }
            else {

                data = "UPDATE `userinfo` " +
                    " SET `name`='" + uname + "',`phone`='" + phone + "',`fb`='" + facebook + "',`twitter`='" + twitter + "',`google`='" + google + "',`note`='" + notes + "',`img`='" + imgPath + "' " +
                    " WHERE email = " + mysql.escape(req.session.user);
            }

            connectDB.query(data, (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    return res.redirect('/profile')
                }
            })
        })
}

//postInvoice





//chnagePassword 
exports.chnagePassword = (req, res, next) => {
    console.log(req.body);

}

//postReport
exports.postReport = (req, res, next) => {
    //console.log(req.body);
    let reportData = []
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true
    });


    if (req.body.SexualContent != undefined) {
        reportData.push(req.body.SexualContent);
    }
    if (req.body.ViolentorRepulsiveContent != undefined) {
        reportData.push(req.body.ViolentorRepulsiveContent);
    }
    if (req.body.HatefulorAbusiveContent != undefined) {
        reportData.push(req.body.HatefulorAbusiveContent);
    }
    if (req.body.HarmfulDangerousActs != undefined) {
        reportData.push(req.body.HarmfulDangerousActs);
    }
    if (req.body.ChildAbuse != undefined) {
        reportData.push(req.body.ChildAbuse);
    }
    if (req.body.InfringesMyRights != undefined) {
        reportData.push(req.body.InfringesMyRights);
    }
    if (req.body.PromotesTerrorism != undefined) {
        reportData.push(req.body.PromotesTerrorism);
    }
    if (req.body.SpamorMisleading != undefined) {
        reportData.push(req.body.SpamorMisleading);
    }

    //console.log(reportData);
    //console.log(req.params.shopmail);
    let data = " "
    for (let i = 0; i < reportData.length; i++) {
        data += "INSERT INTO `report`(`businessMail`, `user`, `reports`) " +
            " VALUES ('" + req.params.shopmail + "','" + req.session.user + "','" + reportData[i] + "') ; "
    }

    let data1 = "SELECT `businessName` " +
        " FROM `shopadmin` " +
        " WHERE businessMail = " + mysql.escape(req.params.shopmail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            connectDB.query(data1, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    console.log('/details/' + result1[0].businessName + '/' + req.params.shopmail)
                    return res.redirect('/details/' + result1[0].businessName + '/' + req.params.shopmail)
                }
            })

        }
    })


}

exports.giftOrderForMe = (req, res, next) => {
    // console.log(req.body);

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true
    });

    let data = "INSERT INTO `egiftcardorder` " +
        " (`businessMail`, `userMail`, `giftName`, `date`) " +
        " VALUES ('" + req.body.shopemail[0] + "','" + req.session.user + "','" + req.body.giftCard + "',CURDATE() ) "

    let shopName = "SELECT `businessName` " +
        " FROM `shopadmin` " +
        " WHERE `businessMail` = " + mysql.escape(req.body.shopemail[0])

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            connectDB.query(shopName, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    //console.log('/details/' + result1[0].businessName + '/' + req.body.shopemail[0])
                    return res.redirect('/details/' + result1[0].businessName + '/' + req.body.shopemail[0])
                }
            })

        }
    })
}

//giftOrderForFriend
exports.giftOrderForFriend = (req, res, next) => {

    console.log(req.body);
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true
    });

    let data = "INSERT INTO `egiftcardorder` " +
        " (`businessMail`, `userMail`, `giftName`, `friendMail`, `friendName`,`date`) " +
        " VALUES ('" + req.body.shopemail[0] + "','" + req.session.user + "','" + req.body.giftCard + "','" + req.body.friendMail + "','" + req.body.name + "',CURDATE() ) "

    let shopName = "SELECT `businessName` " +
        " FROM `shopadmin` " +
        " WHERE `businessMail` = " + mysql.escape(req.body.shopemail[0])

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            connectDB.query(shopName, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    console.log('/details/' + result1[0].businessName + '/' + req.body.shopemail[0])
                    return res.redirect('/details/' + result1[0].businessName + '/' + req.body.shopemail[0])
                }
            })

        }
    })
}

//getDashbord

exports.getDashbord = (req, res, next) => {
    res.render('user/dashbord');
}

//getEGiftCard
exports.getEGiftCard = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });


    let data = "SELECT * " +
        " FROM `egiftcardorder` as eg " +
        " JOIN " +
        " egiftcard as e " +
        " on e.businessMail = eg.businessMail AND e.giftCardName = eg.giftName " +
        "JOIN " +
        "shopadmin as s " +
        " on s.businessMail = eg.businessMail " +
        " WHERE eg.userMail = " + mysql.escape(req.session.user);


    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result);
            for (i in result) {
                let a = result[i].endDate
                let b = result[i].date
                a = a.toString()
                b = b.toString()

                result[i].endDate = a.slice(0, 15);
                result[i].date = b.slice(0, 15);
            }

            return res.render('user/eGiftCard', {
                gift: result
            });
        }
    })

}

//getAppointment
exports.getAppointment = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT * " +
        " FROM `booking` as b " +
        "JOIN " +
        "shopadmin as s " +
        " on s.businessMail = b.businessMail " +
        " WHERE userMail = " + mysql.escape(req.session.user);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            // console.log(result)
            for (i in result) {
                let a = result[i].curDate
                let b = result[i].day
                a = a.toString()
                b = b.toString()
                result[i].curDate = a.slice(0, 15);
                result[i].day = b.slice(0, 15);
            }
            return res.render('user/appointment', {
                booking: result
            });
        }
    })


}

//getReviewFavourites
exports.getReviewFavourites = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT *  " +
        " FROM `review` as r " +
        "JOIN " +
        " shopadmin as s " +
        " ON s.businessMail = r.businessMail " +
        " WHERE reviewrMail = " + mysql.escape(req.session.user)

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result);
            for (i in result) {
                let b = result[i].date
                b = b.toString()
                result[i].date = b.slice(0, 15);
            }
            return res.render('user/reviewFavourites', {
                review: result
            });;
        }
    })
}

//getTermsServices 
exports.getTermsServices = (req, res, next) => {
    res.render('user/termsServices');
}

//getPrivacy
exports.getPrivacy = (req, res, next) => {
    res.render('user/privacy');
}


//postReview
exports.postReview = (req, res, next) => {
    //console.log(req.body);

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let shopMail, rating, review, imgPath;
    let wrong = 0, fileSize = 1;


    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {

            if (name === "shop") {
                shopMail = field;
            }
            else if (name === "rating") {
                rating = field;

            }
            else if (name === "riview") {
                review = field;

            }
            //add new caregory 



        })
        .on('file', (name, file) => {
            // console.log('Uploaded file', name)
            // fs.rename(file.path,__dirname+"a")
        })
        .on('fileBegin', function (name, file) {

            //console.log(file,name)
            if (file.name.length) {
                let fileType = file.type.split('/').pop();

                if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {

                    a = path.join(__dirname, '../')

                    if (name === "image") {
                        imgPath = (req.session.user + "." + fileType);
                    }
                    imgPath = '/images/user/review/' + (req.session.user + "." + fileType)
                    file.path = a + '/public/images/user/review/' + (req.session.user + "." + fileType); // __dirname

                } else {
                    console.log("Wrong File type")
                    wrong = 1;
                    // res.render('admin/addhotel', { msg: "", err: "Wrong File type" });
                }
            }
            else {
                fileSize = 0
            }

        })
        .on('aborted', () => {
            console.error('Request aborted by the user')
        })
        .on('error', (err) => {
            console.error('Error', err)
            throw err
        })
        .on('end', () => {

            // console.log(addCategory);
            if (wrong == 1) {
                console.log("Error")
                return;
            }

            let userName = "SELECT  `name`, `img` " +
                " FROM `userinfo` " +
                " WHERE email = " + mysql.escape(req.session.user);

            connectDB.query(userName, (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    let data = "";
                    if (fileSize == 0) {
                        //console.log("here 0,", shopMail, rating, review)
                        data = "INSERT INTO `review` " +
                            " (`businessMail`, `reviewrMail`, `reviewrName`,`reviewrDP`, `review`, `date`, `rating`) " +
                            " VALUES ('" + shopMail + "','" + req.session.user + "','" + result[0].name + "','" + result[0].img + "','" + review + "',CURDATE(),'" + rating + "')"
                    }
                    else if (fileSize == 1) {

                        // console.log("here 1", shopMail, rating, review)
                        data = "INSERT INTO `review` " +
                            " (`businessMail`, `reviewrMail`, `reviewrName`,`reviewrDP`, `review`, `date`, `rating`, `img`) " +
                            " VALUES ('" + shopMail + "','" + req.session.user + "','" + result[0].name + "','" + result[0].img + "','" + review + "',CURDATE(),'" + rating + "','" + imgPath + "')"

                    }

                    connectDB.query(data, (err1, result1) => {
                        if (err1) {
                            throw err1
                        }
                        else {
                            let shopName = "SELECT `businessName` " +
                                " FROM `shopadmin` " +
                                " WHERE businessMail = " + mysql.escape(shopMail)
                            connectDB.query(shopName, (err2, result2) => {
                                if (err2) {
                                    throw err2;
                                }
                                else {
                                    console.log('/details/' + result2[0].businessName + '/' + shopMail)
                                    return res.redirect('/details/' + result2[0].businessName + '/' + shopMail)
                                }
                            })

                        }
                    })
                }
            })

        })

}

//postDeleteAppoinment
exports.postDeleteAppoinment = (req, res, next) => {
    //console.log(req.body);
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "UPDATE `booking` " +
        "  SET `status`= -1 " +
        " WHERE businessMail =" + mysql.escape(req.body.shopMail) + " AND userMail = " + mysql.escape(req.session.user) + " AND bookingID = " + mysql.escape(req.body.id)

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect('/appointment');
        }
    })

}



///postSearchpostSearch
exports.postSearch = (req, res, next) => {
    //console.log(req.body)
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });
    let data = "SELECT shop.*,ser.* ,COUNT(r.businessMail) as total,SUM(r.rating)/COUNT(r.businessMail) as rating  " +
        " FROM `shopservice` as ser " +
        " JOIN " +
        "shopadmin as shop " +
        "ON shop.businessMail= ser.businessMail " +
        "LEFT JOIN review as r " +
        "ON shop.businessMail = r.businessMail " +
        "WHERE name LIKE " + mysql.escape('%' + req.body.name + '%') + " AND shop.address LIKE " + mysql.escape('%' + req.body.location + '%') +
        " GROUP by ser.businessMail " +
        " ORDER BY rating desc";

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            // console.log(result)
            return res.render('user/searchResult', {
                shop: result,
                search: req.body.name,
            })
        }
    })

}

//getSearchByCategory
exports.getSearchByCategory = (req, res, next) => {
    //console.log(req.params);

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT shop.*,ser.* ,COUNT(r.businessMail) as total,SUM(r.rating)/COUNT(r.businessMail) as rating " +
        "FROM `category` ser " +
        " JOIN " +
        "shopadmin as shop " +
        "ON shop.businessMail= ser.businessMail " +
        "LEFT JOIN review as r " +
        "ON shop.businessMail = r.businessMail " +
        "WHERE  ser.name = " + mysql.escape(req.params.name) +
        " GROUP by ser.businessMail " +
        " ORDER BY rating desc";

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result)
            return res.render('user/searchResult', {
                shop: result,
                search: req.params.name,
            })
        }
    })
}


// getLogout getLogout
exports.getLogout = (req, res, next) => {

    req.session.destroy();
    return res.redirect('/')
}
