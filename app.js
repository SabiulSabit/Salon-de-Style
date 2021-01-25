//required package
const express =  require('express');
const path    =  require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

//use express
const app = express();

//set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//own module
const shopRouter = require('./routes/shop');
const userRouter = require('./routes/user');

app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 1000*60*60*24}
    })
  );


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));


app.use(function(req, res, next) {
  res.locals.err = req.session.err;
  res.locals.success = req.session.success;
 // console.log(res.locals.err);
  next();
});

app.use(userRouter);
app.use("/shop" ,shopRouter);

app.use((req, res, next) => {
  res.status(404).render('user/404');
});


app.listen(3000, () => console.log("Server is Running..."));