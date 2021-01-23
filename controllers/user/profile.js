//import model
var mysql = require('mysql');
var formidable = require('formidable');
const path = require('path');
const bcrypt = require('bcrypt');

require("dotenv").config();

//global const
const hostNameDB =  process.env.hostNameDB;
const userNameDB = process.env.userNameDB;
const passwordDB = process.env.passwordDB;
const databaseName = process.env.databaseName;



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