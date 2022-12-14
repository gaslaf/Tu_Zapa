var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

const localUserCheck = require('./src/middlewares/localUserCheck')
const methodOverride = require('method-override');

var app = express();

/**manejo de formularios */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/*manejo de sesiones*/
app.use(session({
  secret: "Bienvenido a la página.",
  resave: false,
  saveUninitialized: true 
}));


//envio los datos de sesion
app.use(localUserCheck);

/* config métodos PUT y DELETE */

app.use(methodOverride('_method'))

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var productsRouter = require('./src/routes/products');
const exp = require('constants');



// view engine setup
app.set('views', path.join(__dirname,'src', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);

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
