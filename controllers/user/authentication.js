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

exports.isAuthentic = (req, res, next) => {
    if (req.session.user == undefined) {
        //console.log("userController.isAuthentic")
        req.session.err = "";
        req.session.success = "";
        req.session.err = "Please Login First ! ";
        return res.redirect('/')
    }
    else if(req.session.user){
        req.session.err = "";
        req.session.success = "";
       // console.log("here");
        next();
    }
}
exports.isAuthentic1 = (req, res, next) =>{
    req.session.err = "";
    req.session.success = "";
   // console.log("here");
    next();
}

exports.setLocals = (req, res, next) => {

    res.locals.user = req.session.user
    res.locals.name = req.session.name
    res.locals.userAll = req.session.userAll;
    next();

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
                    req.session.err = ""
                    req.session.success = ""
                    req.session.err = "Password doesn't match!"
                    return res.redirect('/')
                }
                else {
                    req.session.user = req.body.username;
                    req.session.name = result[0].name;
                    req.session.userAll = result[0];
                    //console.log(req.body)
                    req.session.success = ""
                    req.session.err = ""
                    req.session.success = "Login Successful !"
                    return res.redirect('/');
                }
            });
        }
        else {
            req.session.err = ""
            req.session.success = ""
            req.session.err = "Email Is Not registered";
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


// getLogout getLogout
exports.getLogout = (req, res, next) => {

    req.session.destroy();
    return res.redirect('/')
}
