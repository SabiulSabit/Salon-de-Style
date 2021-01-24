const mysql = require('mysql');
const formidable = require('formidable');
const fs = require('fs')
const path = require('path');
const bcrypt = require('bcrypt');

require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;




//check authentication 
exports.isAuthentic = (req, res, next) => {
    //console.log(req.session.mail)
    if (req.session.mail == undefined) {
        return res.redirect('/shop/login')
    }
    else if (req.session.mail) {
        req.session.err = "";
        req.session.success = "";
        next();
    }
}


//get login page
exports.getLogin = (req, res, next) => {
    // console.log(req.session.err);
    return res.render('shop/login');
}

//post request for login
exports.postLogin = (req, res, next) => {
    //console.log(req.body);
    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    // console.log(req.body.username)
    data = "SELECT password FROM `shopadmin` WHERE businessMail = " + mysql.escape(req.body.username);

    connectDB.query(data, (err, result) => {
        if (result.length > 0) {

            bcrypt.compare(req.body.password, result[0].password, function (err, isMatch) {
                if (err) {
                    throw err;
                }
                else if (!isMatch) {
                    req.session.err = "Password doesn't match!"
                    // console.log(req.session.err);
                    return res.redirect('/shop/login')
                }
                else {
                    req.session.mail = req.body.username;
                    return res.redirect('/shop/invoicedetail');
                }
            });
            // else if()
        }
        else {
            req.session.err = "Email is not Registered"
            return res.redirect('/shop/login')
        }
    })
}

// get the create account page
exports.getCreateAccount = (req, res, next) => {
    return res.render('shop/createAccount');
}

//post createAcccount
exports.postCreateAccount = (req, res, next) => {
    //db connection string
    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
        multipleStatements: true

    });

    let ownername, pass, conPass, category;
    let shopname, phone, address, lati, long;
    let s = ""
    let imgPath = ""
    let wrong = 0;

    //catche all data and save them
    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {
            if (name === "ownername") {
                ownername = field;
            }
            else if (name === "pass") {
                pass = bcrypt.hashSync(field, 10);
            }
            else if (name === "conPass") {
                conPass = field;
            }
            else if (name === "category") {
                category = field;
            }
            else if (name === "shopname") {
                shopname = field;
            }
            else if (name === "phone") {
                phone = field;
            }
            else if (name === "shopemail") {
                s = field;
            }
            else if (name === "address") {
                address = field;
            }
            else if (name === "lati") {
                lati = parseFloat(field);
            }
            else if (name === "long") {
                long = parseFloat(field);
            }
        })
        .on('file', (name, file) => {
            // console.log('Uploaded file', name)
            //   fs.rename(file.path,__dirname+"a")
        })
        .on('fileBegin', function (name, file) {

            var fileType = file.type.split('/').pop();

            if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {

                a = path.join(__dirname, '../')

                if (name === "img") {
                    imgPath = (s + "." + fileType);
                }
                //  console.log(s,shopname,phone,address);
                //console.log(imgPath);
                imgPath = '/images/shop/shopImg/' + (s + "." + fileType)
                file.path = a + '/public/images/shop/shopImg/' + (s + "." + fileType); // __dirname
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

                let data = "INSERT INTO `shopadmin` " +
                    " ( `businessName`, `ownerName`, `businessMail`, `businessNumber`, `password`, `img`, `address`, `lat`, `lon`) " +
                    " VALUES ('" + shopname + "','" + ownername + "','" + s + "','" + phone + "','" + pass + "','" + imgPath + "','" + address + "','" + address + "','" + address + "') "

                let data1 = " INSERT INTO `category` " +
                    " (`name`, `businessMail`)  " +
                    " VALUES ('" + category + "','" + s + "') "

                connectDB.query(data, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        connectDB.query(data1, (err1, resutl1) => {
                            if (err1) {
                                throw err1
                            }
                            else {
                                req.session.success = "Account Create Successfuly !!"
                                return res.redirect('/shop/login')
                            }
                        })
                    }
                })


            }
        })
}



//getLogout 
exports.getLogout = (req, res, next) => {

    req.session.destroy();
    return res.redirect('/shop/login')
}