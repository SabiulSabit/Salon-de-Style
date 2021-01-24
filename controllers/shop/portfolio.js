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




//get Portfolio  
exports.getPortfolio = (req, res, next) => {

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT `img`, `img1`, `img2`, `img3`, `img4` " +
        " FROM `shopadmin` " +
        " WHERE `businessMail` = " + mysql.escape(req.session.mail);

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            // console.log(result[0]);
            let total = 5;
            if (result[0].img == "") {
                result[0].img = "/images/shop/image.svg";
                total--;
            }
            if (result[0].img1 == "") {
                result[0].img1 = "/images/shop/image.svg";
                total--;
            }
            if (result[0].img2 == "") {
                result[0].img2 = "/images/shop/image.svg";
                total--;
            }
            if (result[0].img3 == "") {
                result[0].img3 = "/images/shop/image.svg";
                total--;
            }
            if (result[0].img4 == "") {
                result[0].img4 = "/images/shop/image.svg";
                total--;
            }


            return res.render('shop/portfolio', {
                data: result[0],
                total: total,
            })
        }
    })
}

//add img to portfolio
exports.postPortfolio = (req, res, next) => {
    // console.log("asdf");

    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT `img`, `img1`, `img2`, `img3`, `img4` " +
        " FROM `shopadmin` " +
        " WHERE `businessMail` = " + mysql.escape(req.session.mail);

    let i_0 = 0, i_1 = 0, i_2 = 0, i_3 = 0, i_4 = 0;

    let insertField = "";
    let imgPath = ""
    let wrong = 0;

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            if (result[0].img == "" && insertField == "") {
                insertField = "img";
                //  console.log("1");
            }
            if (result[0].img1 == "" && insertField == "") {
                insertField = "img1";
                //  console.log("2");
            }
            if (result[0].img2 == "" && insertField == "") {
                insertField = "img2";
                //console.log("3");
            }
            if (result[0].img3 == "" && insertField == "") {
                insertField = "img3";
                //console.log("4");
            }
            if (result[0].img4 == "" && insertField == "") {
                insertField = "img4";
                //  console.log("5");
            }
            //  console.log("dfsadf"+insertField);
            new formidable.IncomingForm().parse(req)
                .on('field', (name, field) => {

                    // if (name === "username") {
                    //     ename = field;
                    // }
                })
                .on('file', (name, file) => {
                    // console.log('Uploaded file', name)
                    // fs.rename(file.path,__dirname+"a")
                })
                .on('fileBegin', function (name, file) {

                    var fileType = file.type.split('/').pop();

                    if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {

                        a = path.join(__dirname, '../../')

                        if (name === "image") {
                            imgPath = (req.session.mail + insertField + "." + fileType);
                        }
                        imgPath = '/images/shop/shopImg/' + (req.session.mail + insertField + "." + fileType)
                        file.path = a + '/public/images/shop/shopImg/' + (req.session.mail + insertField + "." + fileType); // __dirname

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

                        let inserData = " UPDATE `shopadmin` " +
                            " SET " + insertField + " = '" + imgPath + "' " +
                            " WHERE `businessMail` = " + mysql.escape(req.session.mail)

                        connectDB.query(inserData, (err, result) => {
                            if (err) {
                                throw err;
                            }
                            else {
                                return res.redirect("/shop/portfolio");
                            }
                        })

                    }
                })

        }
    })

}

//delete portfolio image
exports.getDeletePortfolioImg = (req, res, next) => {
    // console.log("getDeletePortfolioImg");
    let connectDB = mysql.createConnection({
        host: hostNameDB,
        user: userNameDB,
        password: passwordDB,
        database: databaseName,
    });

    let data = "SELECT `" + req.params.img + "` as dlt " +
        " FROM `shopadmin` " +
        " WHERE `businessMail` = " + mysql.escape(req.session.mail)

    //console.log(data);         

    connectDB.query(data, (err, result) => {
        if (err) {
            throw err;
        }
        else {

            if (result[0].dlt != "") {
                let deleteFile = "public" + result[0].dlt
                //  console.log(deleteFile);
                fs.unlinkSync(deleteFile);
            }


            let data1 = "UPDATE `shopadmin` SET " +
                " `" + req.params.img + "` = '' " +
                " WHERE `businessMail` = " + mysql.escape(req.session.mail)

            connectDB.query(data1, (err1, result1) => {
                if (err1) {
                    throw err1;
                }
                else {
                    return res.redirect('/shop/portfolio');
                }
            })


        }
    })
    //fs.unlinkSync(filePath)
}