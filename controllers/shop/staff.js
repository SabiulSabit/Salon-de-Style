//import model
const mysql = require('mysql');
const formidable = require('formidable');
const fs = require('fs')
const path = require('path');

require("dotenv").config();

//global const
const hostNameDB = process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;

//show staff member
exports.getStaffMember = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName
    });

    data = "SELECT `stuffName`, `position`, `phone`, `email`, `img` " +
        " FROM `stuffinfo` " +
        " WHERE businessMail = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //console.log(result);
            return res.render('shop/staffMember', { data: result });
        }
    })

}



exports.addNewStaff = (req, res, next) => {
    //console.log("asdf");


    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName
    });

    let ename, email, occupation, phone, location;
    let wrong = 0;

    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {

            if (name === "name") {
                ename = field;

            }
            else if (name === "mail") {
                email = field;

            }
            else if (name === "position") {
                occupation = field;

            }
            //add new caregory 
            else if (name === "phone") {
                phone = field;

            }


        })
        .on('file', (name, file) => {
            // console.log('Uploaded file', name)
            // fs.rename(file.path,__dirname+"a")
        })
        .on('fileBegin', function (name, file) {

            var fileType = file.type.split('/').pop();

            if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {

                a = path.join(__dirname, '../../')

                if (name === "imgDP") {
                    imgPath = (email + "." + fileType);
                }
                imgPath = '/images/shop/employee/' + (email + "." + fileType)
                file.path = a + '/public/images/shop/employee/' + (email + "." + fileType); // __dirname

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

                data = "INSERT INTO `stuffinfo` (`businessMail`, `stuffName`, `position`, `phone`, `email`, `img`)  " +
                    " VALUES ('" + req.session.mail + "','" + ename + "','" + occupation + "','" + phone + "','" + email + "','" + imgPath + "')"

                //console.log(data);   

                connectDB.query(data, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        return res.redirect("/shop/staffMember");
                    }
                })

            }
        })

}


//delete employee data

exports.delelteEmployee = (req, res, next) => {
    //console.log("daad",req.body);

    var connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName
    });

    data = "DELETE FROM `stuffinfo` " +
        " WHERE email = " + mysql.escape(req.body.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            return res.redirect("/shop/staffMember");
        }
    })

}