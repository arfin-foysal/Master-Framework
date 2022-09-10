
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const productRouter = require('./routes/products');
const authRouter = require('./routes/authRouter');
const roleRouter = require('./routes/roleRouter');
const userRouter = require('./routes/userRouter');
const permissionRouter = require('./routes/permissionRouter');
const rolePermissionRouter = require('./routes/rolePermissionRouter');
const app = express();
require('dotenv').config();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//define middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//define routes
app.use('/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/permissions', permissionRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/rolepermissions', rolePermissionRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  next(createError(404, 'Requested resource not found!'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  if(res.headersSent){
    return next("There was an problem with the server!");
  } else {
    if(err.message){
      res.status(500).send(err.message);
    }
    else {
      res.send("There was an error!");
    }
  }

});


module.exports = app;
