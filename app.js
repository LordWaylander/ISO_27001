var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');

// déclaration des fichiers contenant les routes
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
var relaisRouter = require('./routes/relais');
var userRouter = require('./routes/user');
var clientsRouter = require('./routes/clients');
var entreprisesRouter = require('./routes/entreprises');
var processusRouter = require('./routes/processus');
var plansActionRouter = require('./routes/plansAction');
var indicateursRouter = require('./routes/indicateurs');

var app = express();
var flash = require('connect-flash');
var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'azerty',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // A laisser a FALSE sinon les msg flash ne s'affichent pas
        maxAge: 60000
    }
}));

app.use(flash());
app.use((req,res,next)=> {
  res.locals.success = req.flash('success');
  res.locals.error  = req.flash('error');
next();
});

// Routes utilisables par l'admin
app.use('/', authRouter);
app.use('/admin', adminRouter);
app.use('/admin/processus', processusRouter);
app.use('/admin/indicateur', indicateursRouter);
app.use('/admin/plansAction', plansActionRouter);

// Routes du pilote et user "classique"
app.use('/relais', relaisRouter);
app.use('/user', userRouter);

// Routes non utilisées pour le moment
app.use('/clients', clientsRouter);
app.use('/entreprises', entreprisesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
